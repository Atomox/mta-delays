/**
 * Parse status from the MTA xml status feed.
 *
 * There are two feeds. This one is for the .xml endpoint from the MTA,
 * at:
 *
 * http://web.mta.info/status/ServiceStatusSubway.xml
 *
 * This is a cleaner API, which requires less cleanup.
 */
const striptags = require('striptags');
const decode = require('unescape');
const _union = require('lodash').union;
const _uniq = require('lodash').uniq;
const moment = require('moment');

const mtaStations = require('./mta.stations');
const mtaRegEx = require('./includes/regex');
const mtaDates = require('./mta.dates');
const mtaRouteChange = require('./mta.route_change');
const mtaTags = require('./mta.taxonomy');

const GLOBAL_DEBUG_ID = 'MTA NYCT_176407';


function checkReports(response) {

	let timestamp = response.Siri.ServiceDelivery[0].ResponseTimestamp[0];
	let situations = response.Siri.ServiceDelivery[0].SituationExchangeDelivery[0].Situations;

	let data = {
		status: true,
		timestamp: timestamp,
		events: false
	}

	if (situations && situations[0] && typeof situations[0] == 'object') {
		if (situations[0].PtSituationElement && typeof situations[0].PtSituationElement == 'object') {
			data.events = situations[0].PtSituationElement;
		}
	}

	return data;
}

async function parseStatusFeed(feedObject) {

	let my_body = {
		status: true,
		message: null,
		timestamp: feedObject.timestamp,
		events: []
	};

	if (feedObject.events === false) {
		my_body.status = true;
		my_body.message = 'No incidents reported.';
	}
	else {
		let t = feedObject.events;

		for (let o in t) {
			try {
				my_body.events.push(await parseSingleEvent(t[o]));
			}
			catch (err)  {
				console.error('\n\n', '<!> ERROR Parsing event, ', err, '\n\n')
			}
		}
	}

	return my_body;
}


/**
 * Given an event message, prepare a single event's complete structure.
 */
async function parseSingleEvent(event) {

	let e = {
		id: null,
		type: null,
		planned: false,
		date: {
			fetched: null,
			start: null,
			end: null,
		},
		summary: null,
		detail: null,
		line: [],
		effects: null,
		severity: null,
		source: null,
	};
	try {
		e.id = event.SituationNumber[0].trim();
		e.type = event.ReasonName[0].trim();
		e.planned = (event.Planned[0] === 'true') ? true : false;
		e.summary = event.Summary[0]._;
		e.detail = cleanStatusText(event.LongDescription[0]);
		e.type_detail = event.Consequences[0].Consequence[0].Condition[0];
		e.severity = event.Consequences[0].Consequence[0].Severity[0];

		e.date.fetched = event.CreationTime[0];
		e.date.start = event.PublicationWindow[0].StartTime[0];
		e.date.end = (event.PublicationWindow[0].EndTime) ? event.PublicationWindow[0].EndTime[0] : null;

		// Parse out lines.
		let k = event.Affects[0].VehicleJourneys[0].AffectedVehicleJourney;
		for (let j in k) {
			e.line.push({ line: k[j].LineRef[0].trim(), dir: k[j].DirectionRef[0].trim()});
		}

		if (event.Source[0].SourceType[0] != 'directReport') {
			e.source = event.Source[0].SourceType[0];
			console.warn('NEW SOURCE TYPE:', event.Source[0].SourceType[0]);
		}

		e.detail = await parseDetailMessage(e.detail, e.summary, e.line, e.id);

	}
	catch (err) {
		console.error('\n\n <!> Error during Message Assembly: ', err ,'\n\n');
	}

	return e;
}


/**
 * Decode, prepare and parse the event.
 */
async function parseDetailMessage(status, summary, lines, id) {
	status = cleanStatusText(decode(status));
	return await formatSingleStatusEvent(status, lines, summary, id);
}


/**
 * Cleanup first pass: Strip garbage characters and tags from a joint line status message.
 *
 * @param  {string} text
 *   A status message string, maybe container extra html and stuff.
 *
 * @return {string}
 *   A cleaner string.
 */
function cleanStatusText(text) {

	if (!text) {
		console.error('\n\n', '<!> Expecting text to clean.');
	}

	// Clean up the tags and newlines.
	text = text.replace(/(?:\r\n|\r|\n)/g, '');
	text = text.trim();
	text = text.replace(/\&nbsp;/g, ' ');
	text = text.replace(/\&bull;/g, " -- ");
	text = text.replace(/\&mdash;/g, " -- ");
	text = unescape(text);

	// Strip tags (minus strong and spans)
	let allowed_tags = [];
	text = striptags(text, allowed_tags, ' ');

	for (t in text) {
		text[t] = text[t].trim();
	}

	return text;
}


/**
 * Gather info on a single status event.
 *
 * @param [string] event
 *   The text for a single event.
 *
 * @return [object|null]
 *   An event object, or [null].
 */
async function formatSingleStatusEvent(event, lines, summary, id) {

	let e = null;

	try {
		if (!event) {
			throw new Error('Expecting an event, but found none!');
		}

		event = event.trim();

		if (event) {
			e = {
				type: null,
				type_detail: null,
				tags: [],
				boros: [],
				time: null,
				durration: null,
				message: event,
				message_raw: event,
				message_station_parse: null,
				stations: {},
				trains: [],
				train_context: [],
			};

			// Determine if the event type has more detail.
			let tags = mtaTags.getWeightedMessageTaxonomy(event);
			e.type = mtaTags.getPrimaryTag(tags['tags_detailed']);
			e.type_detail = tags['tags'];
			e.tags = tags['tags_detailed'];

			// Get a scheduled time from the body. (Planned Work)
			e.durration = mtaDates.getMessageDates(event);

			// Get AD note (always at the bottom).
			// <!> Must run before Travel Alt, which WILL match this.
			e.ad_message = getMessageADNote(event);

			// Break out any alternate route information from the body.
			e.alt_instructions = getMessageAlternateInstructions(event);

			// Get a train lines in main message.
			// Add them to the lines set for station parsing.
			e.train_context = getMessageTrainLines(event);

			// Get all line names, then filter a distinct set.
			e.trains = _union(lines
				.map((val) => val.line)
				.filter((value, index, self) => self.indexOf(value) === index));
			e.train_context = _union(e.trains,e.train_context);

			// Get all stations per line. Also get a formatted message, with station names
			// substituted with their IDs, for easier parsing of line and route changes.
			let station_result = await getStationsInEventMessage(e.train_context, e.message);
			e.stations = station_result.stations;
			e.stations_bound = station_result.bound;

			e.boros = mtaStations.getBorosFromStations(e.stations);
			e.message_station_parse = station_result.parsed_message;

			// Route Change Processing.
			e.route_change = await mtaRouteChange.getRouteChange(e.message_station_parse, e.trains, id);

			// Debug Message.
			if (id == GLOBAL_DEBUG_ID) {
				console.log('\n\n', event);
				console.log('\n\n', e.message_station_parse);
				console.log('\n\n', e.route_change, '\n\n');
			}

			// Finalize main message.
			e.message_formula = prepareEventMessage(e.message, e, true, summary);
			e.message = prepareEventMessage(e.message, e, false);
		}
	}
	catch (err) {
		console.log('\n\n', '<!> Error During Format Single Event: ', err, '\n\n');
	}

	return e;
}


/**
 * Get all stations per line. Also get a formatted message, with station names
 * substituted with their IDs, for easier parsing of line and route changes.
 *
 * @param  {array(string)} lines
 *   An array of original MTA Subway tokens.
 * @param  {string} message
 *   Our haystack.
 *
 * @return {Object}
 *   [stations] contains all the station results
 *   [parsed_message] contains the original message, with all stations matches replaced by their ID, wrapped in [].
 */
async function getStationsInEventMessage(lines, message, parsed_message) {
	return await mtaStations.matchAllLinesRouteStationsMessage(lines, message, parsed_message);
}


/**
 * Find all train lines in passed text,
 * and return a distinct list of results, in train key format (MTA NYCT_2)
 */
function getMessageTrainLines(text) {

	let train_pattern = /\[(A|B|C|D|E|F|G|M|L|J|Z|N|Q|R|W|S|SI|SIR|[1-7]|SH)\]/ig;

	let results = {};
	do {
    m = train_pattern.exec(text);
    if (m) {	results[m[1]] = m[1]; }
	} while (m);

	return Object.keys(results).map( i => 'MTA NYCT_' + results[i] );
}


/**
 * Strip out supplimentary messaging from the main message text.
 *
 * @params [string] message
 *   The message.
 * @params [object] status
 *   The object with all the data to replace.
 * @params [boolean] use_placeholder
 *   Should we put a token in place of the removed item?
 * @params [string] summary
 *   The summary from the event, which often is repeated in the message body.
 *
 * @returns [string]
 *   The original message, sans any removed items.
 */
function prepareEventMessage(message, status, use_placeholder, summary) {
	if (summary) {	message = message.replace(summary, (use_placeholder) ? '[-SUMMARY-]' : ''); }
	if (status.durration.parsed !== null) { message = message.replace(status.durration.parsed, (use_placeholder) ? '[-DATES-]' : ''); }
	if (status.alt_instructions !== null) { message = message.replace(status.alt_instructions, (use_placeholder) ? '[-ALT-INSTRUCT-]' : ''); }
	if (status.ad_message !== null) {	message = message.replace(status.ad_message, (use_placeholder) ? '[-AD-MESSAGE-]' : ''); }

	return message.trim();
}


/**
 * Find any alternate directions messaging.
 *
 * E.G. "As an alternative, take..."
 *
 * @param [string] text
 *   The event message.
 *
 * @return [string|null]
 *   A matched [TP]/Travel Alternative string. Otherwise, [null].
 */
function getMessageAlternateInstructions(text) {
	let alternateInstructionPattern = /(((?:--\s*)?\[(?:TP|AS)\]|Show\s*Alternate\s*Service|(\b(For\s*service\s*(to|from)|use\s*(nearby)?|take\s*the|Transfer\s*(to|between)?|Travel\s*Alternatives|As\s*an\s*alternative\s*(?:customers\s*may\s*)take\s*the)\b))+((\s*((stations|these stations|trains|transfer\s*to)?(\s|,|and|or|instead|at|\;|\|)?)*|((\s*[a-zA-Z0-9\-\'\.\/\:\;&\(\)\*]*)*)?)*(\s*\[(A|B|C|D|E|F|G|M|L|J|Z|N|Q|R|W|S|SIR|[1-7]|SB|TP)\]|(\[(ad)\]))*\s*)*)+/i;

	// We must remove the Ad note suppliment before we can perform a TP match.
	let ad_message = getMessageADNote(text);
	if (ad_message !== null) {	text = text.replace(ad_message, ''); }

	let results = text.match(alternateInstructionPattern);

	return (results && results[0])
		? results[0].trim()
		: null;
}


/**
 * Find any Accessability/ADA [AD] messaging.
 *
 * This is messaging about disruptions to stations that comply to the
 * Americans with Disabilities Act. (ramps and elevators, mostly)
 *
 * @param [string] text
 *   The event message.
 *
 * @return [string|null]
 *   A matched [AD] string. Otherwise, [null].
 */
function getMessageADNote(text) {
	let adPattern = /\[ad[0-9]?\]\s*(?:(?:This|These)\s*service\s*change[s]*\s*affect[s]?|For\s*an accessible\s*connection)\s*(\s*(?:[\'\|a-zA-Z0-9\-\.\/\:\;&\(\)\*\,]+|\[(S[a-z]?|[a-z0-9]{1,2})\]))+/i;
	let results = text.match(adPattern);

	return (results && results[0])
 		? results[0].trim()
		: null;
}


module.exports = {
	checkReports,
	parseStatusFeed,
	getMessageAlternateInstructions,
	getMessageADNote,
	getMessageTrainLines,
	getStationsInEventMessage,
}
