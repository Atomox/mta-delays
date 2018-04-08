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
const _ = require('lodash');

const mtaStations = require('./mta.stations');
const mtaRegEx = require('./includes/regex');
const mtaTaxonomy = require('./data/static/mta.taxonomy');


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
	let allowed_tags = ['strong', 'span'];
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
			e.type_detail = getMessageAction(event);

			// Get an interruption time
			e.time = null;

			// Get a scheduled time from the body. (Planned Work)
			e.durration = getMessagePlannedWorkDate(event);

			// Get AD note (always at the bottom).
			// <!> Must run before Travel Alt, which WILL match this.
			e.ad_message = getMessageADNote(event);

			// Break out any alternate route information from the body.
			e.alt_instructions = getMessageAlternateInstructions(event);

			// Get a train lines in main message.
			// Add them to the lines set for station parsing.
			e.train_context = getMessageTrainLines(event);

			// Get all line names, then filter a distinct set.
			e.trains = _.union(lines
				.map((val) => val.line)
				.filter((value, index, self) => self.indexOf(value) === index));
			e.train_context = _.union(e.trains,e.train_context);

			// Get all stations per line. Also get a formatted message, with station names
			// substituted with their IDs, for easier parsing of line and route changes.
			let station_result = await getStationsInEventMessage(e.train_context, e.message);
			e.stations = station_result.stations;
			e.message_station_parse = station_result.parsed_message;

			// Route Change Processing.
			e.route_change = await getRouteChange(e.message_station_parse, e.trains, id);

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

	let train_pattern = /\[(A|B|C|D|E|F|G|M|L|J|Z|N|Q|R|W|S|SIR|[1-7]|SH)\]/ig;

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
	if (status.durration !== null) { message = message.replace(status.durration, (use_placeholder) ? '[-DATES-]' : ''); }
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
	let alternateInstructionPattern = /((\[TP\]|(\b(For\s*service\s*(to|from)|use\s*(nearby)?|take\s*the|Transfer\s*(to|between)?|Travel\s*Alternatives|As\s*an\s*alternative\s*(?:customers\s*may\s*)take\s*the)\b))+((\s*((stations|these stations|trains|transfer\s*to)?(\s|,|and|or|instead|at|\;|\|)?)*|((\s*[a-zA-Z0-9\-\'\.\/\:\;&\(\)\*]*)*)?)*(\s*\[(A|B|C|D|E|F|G|M|L|J|Z|N|Q|R|W|S|SIR|[1-7]|SB|TP)\]|(\[(ad)\]))*\s*)*)+/i;

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
	let adPattern = /\[ad\](\s*This\s*service\s*change\s*affects)\s*(\s*[\'\|a-zA-Z0-9\-\.\/\:\;&\(\)\*\,]+)+/i;
	let results = text.match(adPattern);

	return (results && results[0])
 		? results[0].trim()
		: null;
}


/**
 * Find any work dates in planned work messaging.
 *
 * @param [string] text
 *   The event message.
 *
 * @return [string|null]
 *   A work-date string. Otherwise, [null].
 */
function getMessagePlannedWorkDate(text) {
	let workDatePattern = /(?:\b(Weekend[s]?|Late\s*Night[s]?|Night[s]?|Day[s]?|Late\s*Evening[s]?|Evening[s]?|Rush\s*Hour[s]?|All\s*times|Until)\b\s*,?(\s*((?:(?:[0-9]{1,2}|[0-9]{1,2}:[0-9]{1,2})\s*(?:AM|PM)\s*)|([0-9]{1,2}\s*(-\s*[0-9]{1,2})?\s*(20[0-9]{2})?)?|(20[0-9]{2}))?\s*[,-]?\s*((Saturday|Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Sat|Sun|Mon|Tue|Wed|Thur|Thu|Fri|to|until|beginning(?:\s*at)?|further\snotice|and|including)|(Jan|Feb|Mar|Apr|May|June|July|Aug|Sept|Oct|Nov|Dec|Spring|Summer|Fall|Winter|Holiday[s]?))?\s*(?:\,|&bull\;|&|\*|\;)?\s*)*\s*)+/i;

	let dateResults = text.match(workDatePattern);

	return (dateResults && dateResults[0])
		? dateResults[0].trim()
		: null;
}


function unwrapTrain(train) {
	if (!train) { return train; };
	train = train.replace('[', '');
	train = train.replace(']', '');
	return train.trim();
}


/**
 * Prepare a message with an "Operates in 2 Sections" to be more
 * easily readable in the matching algorythm.
 *
 * @param  {string} text
 *   The message we're planning to parse for route changes.
 *
 * @return {string}
 *   The message, modified to be more easily readible to route change parsers.
 */
function prepareRouteOperatesSections(text) {

	// [D] Service operates in two sections and is rerouted in Manhattan[F] [N] [Q] [R] ``` [D] service operates in two sections: 1. Between [Bx210-D01] and [Mn619-D21], and via the [F] to/from [Mn232-F14], the last stop Trains run via the [A] local in both directions between [Mn153-A15] and [Mn167-A32]. 2. Between [Bk617-R31] and [Bk58-D43]. Trains skip [Bk28-R32], [Bk608-F23], [Bk30-R34] and [Bk31-R35] in both directions.
	// [4] service operates in two sections: 1. Between [Bx603-222|Bx603-415] and [Bx378-401] . 2. Between [Bk345-250]/[Bk352-257] and [Mn439-225] and via the [6] to/from [Bx377-619].
	// [M] service operates in two sections: 1. Between [Mn625-M18] and [Bk97-M11], and via the [J] to/from [Bk621-J27], days/evenings*. 2. Between [Qs108-M01] and [Bk630-M08]
	// [4] Service operates in two sections: 1. Between [Bx378-401] and [Mn392-621] 2. Between [Mn392-621] and [Bk352-257]

	let msg = text.split('```'),
		result = [];

	for (let i in msg) {
		// Only process relevant results. Keep others in our results, as-is.
		if (! getMessageAction(msg[i], ['operate_sections'])
			|| msg[i].indexOf('1.') === -1) {
				result.push(msg[i]);
				continue;
		}

		let t = mtaRegEx.matchRegexString(/\[([A-Z0-9])\]/i, msg[i], false);

		let one, two, tmp;

		// Remove everything before section 1. begins.
		tmp = '1.' + msg[i].split('1.')[1];

		// Split at 2, so we have the section seperated.
		tmp = tmp.split('2.');

		// Format Sections 1 and 2 into something parsable.
		one = tmp[0].replace('1.', t + ' [__operates-section-1__]');
		two = ('2.' + tmp[1]).replace('2.', t + ' [__operates-section-2__]');

		// Trains skip -- Add line before generic trains skip message.
		if (two.toLowerCase().indexOf('trains skip')) {
			two = two.replace(/trains\s*(?:are\s*)?skip(?:ping)?/i, t + ' trains skip');
		}

		// Trains skip -- Add line before generic trains skip message.
		if (one.toLowerCase().indexOf('trains skip')) {
			one = one.replace(/trains\s*(?:are\s*)?skip(?:ping)?/i, t + ' trains skip');
		}

		// Add to our final result array.
		result.push(one);
		result.push(two);
	}

	text = result.join('```');

	return text;
}


/**
 * Given a message, find any route change messaging in there,
 * and break it out into a route object.
 *
 * @param [string] text
 *   An string with event messaging. All stations should have been converted to
 *   station tokens, like [Qs-10-R23].
 * @param [array] lines
 *   @depricated
 * @param [string] id
 *   ID of current event, for debugging purposes.
 *
 * @return [object]
 *   A route change object, including parsed message, lines and rotue objects.
 */
async function getRouteChange(text, lines, id) {

	if (!text) { console.error('\n\n\n <!> NO TEXT PASSED TO ROUTE CHANGE!!!\n\n\n');}

	let c = await getMessageRouteChange(text),
			op,
			operate_sections = false,
			reroute_pattern = /((Some)?\s*(Northbound|Southbound|Uptown|Downtown|(?:\[(?:Qs|Mn|Bx|Bk|SI)[0-9]{1,5}\-[A-z0-9]{1,5}\])\s*[\s-]\s*bound|\b.*\b[\s-]bound)?\s*\[([A-Z0-9]{1,2})\](?:\*|\s)*(?:(?:\s|and)*\[([A-Z0-9]{1,2})\])?\s*(Northbound|Southbound|Uptown|Downtown|(?:\[(?:Qs|Mn|Bx|Bk|SI)[0-9]{1,5}\-[A-z0-9]{1,5}\])\s*[\s-]\s*bound|\b.*\b[\s-]bound)?\s*(?:(?:(?:trains)?(?:\s*are\s*(?:rerouted)?)?)|(?:([^`\[\]]*service\s*operates\s*b\s*etween|[^`\[\]]*No\s*service\s*b\s*etween|\[__operates-section-[0-9]__\]\s*(?:between)?)\s*(\[(?:[A-Z]{2}[A-Z0-9]{1,4}\-[A-Z0-9]{2,5}[|]?)+\])[^\[\]`]*(\[(?:[A-Z]{2}[A-Z0-9]{1,4}\-[A-Z0-9]{2,5}[|]?)+\])))[^\[\]`]*)((?:(?:and|then)?\s(?:stopping|run)?\s*(on|via|along|long|over|replace)+\s*(?:the)?\s*\[((?!\3\4)[A-Z0-9])\]| run(?:ning)?\s*(express|local))[^\/\[\]`]*(express|local|to\/from|to|\[(?:[A-Z]{2}[A-Z0-9]{1,4}\-[A-Z0-9]{2,5}[|]?)+\])[^\[\]`]*(Manhattan|Queens|Brooklyn|the\s* Bronx|\[(?:[A-Z]{2}[A-Z0-9]{1,4}\-[A-Z0-9]{2,5}[|]?)+\])(?:\s*\(skipping.*\)\s*|\,\s*the\s*last\s*stop|\,\s*then\s*end)?[\.,\s]*)((?:(?:(?:and|then)?\s*(?:trains\s*(?:run)\s*)?(?:stopping|run|operat(?:e|ing))?\s*(via|along|over|replace|on)+ the)\s*(\[(?!\3\4)[A-Z0-9]\])?[^\[\]`]*(\[(?:[A-Z]{2}[A-Z0-9]{1,4}\-[A-Z0-9]{2,5}[|]?)+\]|to\/from|to)(?:[^\[\]`]*(?:(\[(?:[A-Z]{2}[A-Z0-9]{1,4}\-[A-Z0-9]{2,5}[|]?)+\])[\.]?))?)?)/i,
			no_trains_between_pattern = /(?:Service\s*is\s*(suspended)\s*(?:in\s*both\s*directions\s*)(?:on\s*the\s*)|(No)\s*)?\[([A-Z0-9]{1,2})\](?:\*|\s)*(?:(?:\s|and|or)*\[([A-Z0-9]{1,2})\])?\s*(?:train[s]?\s*(?:service)?\s*)?(?:(No)?\s*(?:trains|service)\s*between|(?:line\s*)?between)\s*(?:(\[(?:[A-Z]{2}[A-Z0-9]{1,4}\-[A-Z0-9]{2,5}[|]?)+\])\s*(?:and)?\s*(\[(?:[A-Z]{2}[A-Z0-9]{1,4}\-[A-Z0-9]{2,5}[|]?)+\]))/i,
			bypass_pattern = /(Some)?\s*(Northbound|Southbound|Uptown|Downtown|(?:\[(?:Qs|Mn|Bx|Bk|SI)[0-9]{1,5}\-[A-z0-9]{1,5}\])\s*[\s-]\s*bound|\b.*\b[\s-]bound)?\s*\[([A-Z0-9]{1,2})\](?:\*|\s)*(?:(?:\s|and)*\[([A-Z0-9]{1,2})\])?\s*(Some)?\s*(Northbound|Southbound|Uptown|Downtown|(?:\[(?:Qs|Mn|Bx|Bk|SI)[0-9]{1,5}\-[A-z0-9]{1,5}\])\s*[\s-]\s*bound|\b.*\b[\s-]bound)?\s*(?:trains\s*(?:are\s*)?(?:skip(?:ping)?|bypass(?:ing)?))\s*((?:\[(?:(?:Qs|Mn|Bx|Bk|SI)[0-9]{1,5}\-[A-z0-9]{1,5}[|]?)+\]\s*(?:,|and)*\s*)+)/i,
			operate_sections_pattern = /\[([A-Z0-9])\](?:(?:\s|and|\*)*\[([A-Z0-9])\])?\s*(?:(?:(?:\[__operates-section-([0-9])__\]|(?:(?:shuttle)?\s*(?:service|trains))\s*(?:operate(?:s)?|(?:are)?\s*run(?:ning)?))\s*(?:(?:(?:at)?\s*all\s*times)|weekend(?:s)?\s*(?:service)?)?\s*(?:between)?)\s*(\[(?:[A-Z]{2}[A-Z0-9]{1,4}\-[A-Z0-9]{2,5}[|]?)+\])(?:[^\[\]`]|\[[a-z0-9]\])*(\[(?:[A-Z]{2}[A-Z0-9]{1,4}\-[A-Z0-9]{2,5}[|]?)+\]))+/i,
			module = [
				{
					id: 'bypass_stations',
					check: (msg) => (msg.indexOf('skip') !== -1	|| msg.indexOf('bypass') !== -1),
					pattern: bypass_pattern,
					callback: processRouteChangeBypassResult
				},
				{
					id: 'reroute_general',
					check: (msg) => true,
					pattern: reroute_pattern,
					callback: processRouteChangeResults
				},
				{
					id: 'operate_sections',
					check: (msg) => true,
					pattern: operate_sections_pattern,
					callback: processRouteChangeSectionsResult,
				},
				{
					id: 'no_svc_between',
					check: (msg) => (getMessageAction(msg, ['no_trains_partial', 'no_trains']) !== null),
					pattern: no_trains_between_pattern,
					callback: processRouteChangeNoServiceBetweenResult
				},
			];

	if (id == GLOBAL_DEBUG_ID) { console.log('\n\n -- Parse 1st Pass --', c, '\n\n'); }

	// @TODO -- Prepare Message
	if (op = getMessageAction(c, ['operate_sections'])) {
		if (op.indexOf('operate_sections' !== -1)) {
			operate_sections = true;
			c = prepareRouteOperatesSections(c);
		}
	}


	/**
	 *
	 *
	 * @TODO
	 *
	 *  We're enabling this so that "trains operate between" simplified messaging
	 *   can be processed inside the same regex as operates_sections.
	 *
	 *
	 */
	operate_sections = true;

	try {

		if (c) {
			c = {
				message: c,
				message_mod: c,
				re: null,
				trains: [],
				route: [],
				new_stations: [],
			};

			let p = 0;

			for (let passes = 0; passes < 12; passes++) {

				// If the current pattern doesn't detect more keywords, move on.
				if (module[p] && module[p].check(c.message_mod) !== true) {
					p = p + 1;
				}

				// Make sure we're not off the end of the module array.
				if (!module[p]) {	break;	}

				c.results = mtaRegEx.matchRegexString(module[p].pattern, c.message_mod, true);

				// Operate In Section Mode -- Only after we've exhausted normal matches.
				if (c.results !== false) {

					// Check the results, and add them if we find anything valid.
					let my_results = await module[p].callback(c.results, c.message_mod);

					// If we had results, process them.
					if (my_results.route && my_results.route.length > 0) {
						my_results.route.map(m => c.route.push(m) );
						c.trains = _.uniq(c.trains.concat(my_results.trains));
					}

					// Normal Route Change Pattern only does this if there is a match. (inside the above if)
					// Removed the match from the picture, so we can move on in the next iteration.
					c.message_mod = my_results.message_mod;
				}

				// If there are no results, move on to the next pattern.
				else {
					p = p + 1;
				}
			}



			if (c.route.length > 1) {
				// c.route.map()
				//
				// @TODO -- Order results by line.
				//
				//    If we have multiple results, order them by:
				//    	1. c.route[i].lines,
				//    	2. c.route[i].section
				//
			}

		}

		return c;
	}
	catch (err) {
		console.error('\n\n\n <!> --- Route Change Detect > Error: ', err, ' --- <!>\n\n\n');
	}

	return false;
}


/**
 * Handle a single result of a route change regex for normal patterns...
 *
 * @param  {array} regex_results
 *   an array of regex results, where 0 is the entire match,
 *   and 1...n are capture groups for a single match.
 *
 * @return {object}
 *   2 arrays: route (all matches as route_objects),
 *   and trains (all lines found).
 */
async function processRouteChangeResults(regex_match, message_mod) {

//	console.log('\n -- ', regex_match, '\n\n');

	// First line in message == second reroute line, then we might be overreaching our SINGLE MESSAGE.
	if (regex_match[4] === regex_match[16]) {
		console.warn('\n\n\n\nWe should replace part of this message! We may be stealing part of another message!',regex_match ,'\n\n\n\n\n');
	}

	let results = {
		route: [],
		trains: [],
		message_mod: message_mod
	};

	// Did we have at least one train match? (Normal)
	if (regex_match[4] !== undefined) {

		let section = null,
			route_pair = {
				route: [],
			};

		// Positions:
		// 0: FULL Match
		// 1: Pattern 1 Match
		// 2: All/Some
		// 3: Northbound/Southbound
		// 4,5: Affected Lines
		// 6. Direction
		// 7: Message (unimportant)
		// 8,9: Operating between these stations (own line)
		// 10: Pattern 2 Match
		// 11:
		// 12: Reroute Line 1
		// 13: express/local
		// 14,15: Rereoute 1 stations
		// 16: Pattern 3 Match
		// 17:
		// 18: Reroute line 2
		// 19, 20: Rereoute 2 stations.

		// Possible Routes Start at:
		// Operates: 8,9
		// First: 10-14
		// Second: 15-18

		regex_match.map((item, i) => {

			// When we have express, 9 will be empty, but we need to execute logic in 9.
			if (i == 12 && !item && regex_match[13]) {
				/**
				 *
				 * @TODO....
				 *
				 */
			}
			else if (i == 0 || !item) { return; };
			let j = (i <= 9 ) ? 0 : (i <= 15) ? 1 : 2;

			if (!route_pair.route[j]) {
				route_pair.route.push({
					allTrains: (regex_match[2]) ? false : true,
					dir: (regex_match[3] ? regex_match[3].toLowerCase() : null),
					exp_lcl: null,
					lines: [],
					along: null,
					from: null,
					to: null,
					section: section,
				});
			}
			switch (i) {
				case 1:
				case 10:
				case 16:
					// Full pattern route matches.
					route_pair.route[j].parsed = item.trim();
					break;

				case 2:
					// Some trains? We check for SOME, so if matched, then FALSE.
					route_pair.route[j].allTrains = (item) ? false : true;
					break;

				case 3:
				case 6:
					// Direction of trains?
					route_pair.route[j].dir = item;
					break;

				case 4:  // Operates between, so along = self
				case 5:
					// Affected Lines.
					results.trains.push(unwrapTrain(item));
					route_pair.route[j].lines.push(unwrapTrain(item));
					break;

				case 7:
					if (item.indexOf('[__operates-section-') !== -1) {
						section = item.split('[__operates-section-')[1].substring(0,1);
						route_pair.route[j].section = section;
					}
					break;

				case 11:
				case 17:
					route_pair.route[j].action = item;
					break;

				case 8: // from
				case 14:
				case 19:

					// Possible structures:
					// 1. A over B  from [station] to [station] then C to [station],
					// 2. A over B  from [station] to [station] then C from [station] to [station],
					// 3. A over B  from [station] to [station] then C (to/from) [station],
					// If 1 or 3, then set [0].to as [1].from.
					// If this is not a station, then it is a (to || to/from),
					// which means only 1 line. (scenario #3)
					if (item.indexOf('to') !== -1) {
						route_pair.route[j].from = route_pair.route[j-1].to;
						route_pair.route[j].to = unwrapTrain(item);
					}
					else if (item.indexOf('express') !== -1
						|| item.indexOf('local') !== -1) {
						route_pair.route[j].exp_lcl = (item) ? item : null;
					}
					else {
						route_pair.route[j].from = unwrapTrain(item);
					}

					if (!regex_match[i+1]) {
						route_pair.route[j].from = route_pair.route[j-1].to;
						route_pair.route[j].to = unwrapTrain(item);
					}
					break;

				case 12:  // First reroute
				case 18: // Second reroute
					route_pair.route[j].along = (item) ? unwrapTrain(item) : null;
					route_pair.route[j].lines = route_pair.route[j-1].lines;
					break;

				case 9:
				case 15:
				case 20:
					if (item.indexOf('Manhattan') !== -1
						|| item.indexOf('Queens') !== -1
						|| item.indexOf('Brooklyn') !== -1
						|| item.indexOf('the Bronx') !== -1) {
						route_pair.route[j].in = item;
					}
					else {
						route_pair.route[j].to = unwrapTrain(item);
					}
					break;

				case 13:
					// Express/Local inside a non-reroute route change object.
					// e.g. A runs express from... to ...
					route_pair.route[j].exp_lcl = (item) ? item : null;
					break;

			}
		});

		let match_flag_last = false;

		// Push the results onto our final guy.
		for (let t in route_pair.route) {
			let r = route_pair.route[t];

			if (((r.from && r.to) || r.in) && r.lines.length > 0) {
				let res = await analyzeStationArray(r);

				// Removed the match from the picture, so we can move on in the next iteration.
				results.message_mod = results.message_mod.replace(r.parsed,'[-- route-match ' + t + ' --]');

				// Sometimes the first match will not have enough info to be saved,
				// because the next route object contains the rest of it. In this case,
				// when we hit a match in t = 1, go back to t = 0,
				// and replace the match.
				if (t === '1' && match_flag_last === false) {
					// Removed the match from the picture, so we can move on in the next iteration.
					results.message_mod = results.message_mod.replace(route_pair.route[t-1].parsed,'[-- route-match ' + (t-1) + ' --]');

					res.parsed = route_pair.route[t-1].parsed + res.parsed;
				}

				results.route.push(res);
				match_flag_last = true;
			}
			else {
				match_flag_last = false;
			}
		};
	}

	return results;
}


/**
 * Uniform way to replace a regex match string with a placeholder in message_mod.
 *
 * @TODO
 *   Refactor later.
 */
function replaceSimpleMessagePattern(message, replace_text) {
	// Removed the match from the picture, so we can move on in the next iteration.
	message = message.replace(replace_text,'[-- route-match --]');

	return message;
}


async function processRouteChangeBypassResult(regex_results, message_mod) {

		let results = {
			route: [],
			trains: [],
			message_mod: message_mod,
		};

		if (regex_results[3] !== undefined) {

			let j = 0,
				route_pair = {
					route: [
					 	{
							allTrains: true,
							dir: null,
							lines: [],
							along: null,
							bypass: [],
		 					section: null,
							parsed: null,
					 	}
				 	]
				};

			regex_results.map( (item, i) => {
				switch(i) {

					case 0:
						route_pair.route[j].parsed = item.trim();
						break;

					case 1:
					case 5:
						// Some trains? We check for SOME, so if matched, then FALSE.
						route_pair.route[j].allTrains = (item) ? false : true;
						break;

					case 2:
					case 6:
						// Direction of trains?
						route_pair.route[j].dir = item;
						break;

					case 3:  // Operates between, so along = self
					case 4:
						if (item) {
							// Affected Lines.
							results.trains.push(unwrapTrain(item));
							route_pair.route[j].lines.push(unwrapTrain(item));
						}
						break;

					case 7:	 // Stations

						let conjunction_pattern = /\,?\s*\b(?:and|or)\b\s*/i,
							stations = item.replace('');
						// Remove any conjunctions, and treat like a comma.
						if (item.search(conjunction_pattern) !== -1) {
							item = item.replace(conjunction_pattern, ',');
						}

						route_pair.route[j].bypass = item.split(',')
							.map( s => unwrapTrain(s.trim()) );
						break;
				}
			});

			if (route_pair.route[j].bypass && route_pair.route[j].lines.length > 0) {
				results.route.push(route_pair.route[j]);
			}

		}

		results.message_mod = replaceSimpleMessagePattern(message_mod, regex_results[0]);

		return results;
}


async function processRouteChangeNoServiceBetweenResult(regex_results, message_mod) {

		let results = {
			route: [],
			trains: [],
			message_mod: message_mod,
		};

		if (regex_results[1] !== undefined
			|| regex_results[2] !== undefined
			|| regex_results[5] !== undefined) {

			let j = 0,
				route_pair = {
					route: [
					 	{
							noTrains: true,
							allTrains: true,
							dir: null,
							lines: [],
							along: null,
							from: null,
							to: null,
		 					section: null,
							action: null,
							parsed: null,
					 	}
				 	]
				};

			/**
			 * 1. suspended (pattern #1)
			 * 2. No
			 * 3. Train
			 * 4. Train
			 * 5. No (pattern #2)
			 * 6. from
			 * 7. to
			 */

			regex_results.map( (item, i) => {
				if (!item) {
					return;
				}

				switch(i) {

					case 0:
						route_pair.route[j].parsed = item.trim();
						break;

					case 1:
					case 2:
					case 5:
						// Confirm NO TRAINS BETWEEN Pattern was match
						route_pair.route[j].action = item;
						break;

					case 3:
					case 4:
						results.trains.push(unwrapTrain(item));
						route_pair.route[j].lines.push(unwrapTrain(item));
						break;

					case 6:	 // Stations
						route_pair.route[j].from = unwrapTrain(item);
						break;

					case 7:
						route_pair.route[j].to = unwrapTrain(item);
						break;
				}
			});

			if (route_pair.route[j].to && route_pair.route[j].from && route_pair.route[j].lines.length > 0) {
				results.route.push(route_pair.route[j]);
			}
		}

		results.message_mod = replaceSimpleMessagePattern(message_mod, regex_results[0]);

		return results;
}


/**
 * Handle a single result of a route change regex for OperatesInSections...
 *
 * @param  {array} regex_results
 *   an array of regex results, where 0 is the entire match,
 *   and 1...n are capture groups for a single match.
 *
 * @return {object}
 *   2 arrays: route (all matches as route_objects),
 *   and trains (all lines found).
 */
async function processRouteChangeSectionsResult(regex_results, message_mod) {

	let results = {
		route: [],
		trains: [],
		message_mod: message_mod
	};

	if (regex_results[1] !== undefined) {

		let route_pair = {
			route: [
			 	{
					allTrains: true,
					dir: null,
					exp_lcl: null,
					lines: [],
					along: null,
					from: null,
					to: null,
 					section: null,
					parsed: null,
			 	}
		 	]
		};

		regex_results.map((item, i) => {
			if (i == 0 || !item) { return; };

		 	switch (i) {
				case 0:
					route_pair.route[0].parsed = item.trim();
					break;

			 	case 1:
			 	case 2:
					// Affected Lines.
					results.trains.push(unwrapTrain(item));
					route_pair.route[0].lines.push(unwrapTrain(item));
					break;

			 	case 3:
				 	route_pair.route[0].section = item;
				 	break;

			 	case 4: // from
				 	route_pair.route[0].from = unwrapTrain(item);
				 	break;

			 	case 5: // to
				 	route_pair.route[0].to = unwrapTrain(item);
				 	break;
		 	}
		});

		// Push the results onto our final guy.
		let r = route_pair.route[0];
		if (r.from && r.to && r.lines.length > 0) {
			let res = await analyzeStationArray(r);
			results.route.push(res);
		}
	}

	results.message_mod = replaceSimpleMessagePattern(message_mod, regex_results[0]);

	return results;
}


/**
 * Check each route change match array,
 * and when a station field (to/from) has multiple stations,
 * pick the appropriate one a single station when multiple exist.
 *
 * @param {object} r
 *   A route change object.
 *
 * @return {object}
 *   The updated route change object.
 */
async function analyzeStationArray(r) {
	let keys = ['from', 'to'];

	for (let i in keys) {
		if (!r[keys[i]]) { continue; }
		// Analyze stations with multiples
		if (r[keys[i]].indexOf('|') !== -1) {
			r[keys[i]] = r[keys[i]].split('|');

			let along = (r.along !== null)
				? r.along
				: r.lines[0];

			let line = await mtaStations.getTrainRoute(along);

			let result = line.filter((v) => (r[keys[i]].indexOf(v.key) !== -1)
				? true
				: false);

			if (result.length > 0) {
				r[keys[i]] = result[0].key;
			}
		}
	}
	return r;
}


/**
 * Given a string status update, find any route change messaging.
 *
 * @param  {string} text
 *   The haystack.
 * @param  {array} lines
 *   The train lines, by original ID.
 *
 * @return {text | false}
 *   If found, we return the matched rout change message.
 */
async function getMessageRouteChange(text) {

	// Get stations in each line, as a giant regex.
	let stations = await mtaStations.getStationLinesRegex();

	let routeChangePattern = /((?:(?:(?:(?:Some|northbound|southbound|(?:down|up)town|and|\b.*\b[\s-]bound|(?:\[(?:Qs|Mn|Bx|Bk|SI)[0-9]{1,5}\-[A-z0-9]{1,5}\])\s*[\s-]\s*bound)\s*)*\[(?:A|B|C|D|E|F|G|M|L|J|Z|N|Q|R|W|S|SIR|[1-7]|SB|TP)\][\*\s]*(?:(?:Some|northbound|southbound|(?:down|up)town|and|\b.*\b[\s-]bound|(?:\[(?:Qs|Mn|Bx|Bk|SI)[0-9]{1,5}\-[A-z0-9]{1,5}\])\s*[\s-]\s*bound)\s*)*)*(?:(?:express|local|shuttle)?\s*(?:trains)?\s*(?:(?:No\s*(?:\[[A-Z0-9]{1,2}\]\s*(?:train[s]?)?)?\s*(?:service|trains)|\bService\b\s*is\s*suspended\s*(?:in\s*both\s*directions\s*)?\s*(?:on\s*the\s*)?(?:\[[A-Z0-9]{1,2}\])?\s*line)\s*between\s*(?:\[(?:(?:Qs|Mn|Bx|Bk|SI)[0-9]{1,5}\-[A-z0-9]{1,5}[|]?)+\](?:\s*|\,|and)*)+|(?:(?:make|run)\s*local(?:\s*stops)?\s*and)?(?:\s*are)?\s*(?:reroute[d]?(?:(?:\s*in\s*both\s*directions)?)?|\breplace\b|stopping|operate\s*(?:weekday|weekend|evening|overnight)\s*(?:service)?|run(?:ning)?\s*(?:(?:via|along)\s*(?:the)?|traveling|express|local|between))|(?:(?:(?:\[SB\]\s*)?\wbus(?:es)?\w|service operates|operate(?:s)?)\s*(?:(?:at\s*)?all\s*times)?(?:\s*in\s*two\s*sections[\s0-9\:\.]*|\s*b\s*etween)?)|(?:are\s*)?(?:skip(?:ping)?|bypass(?:ing)?)\s*(?:\[(?:(?:Qs|Mn|Bx|Bk|SI)[0-9]{1,5}\-[A-z0-9]{1,5}[|]?)+\](?:\s*|\,|and)*)+)|(?:then)?\s*(?:stopping)?\s*\b(?:over|along)\b\s*the|(?:then|trains)\s*end\s*(?:at)?))(?:(?:\s*|[1-9]\.)*(?:(?:and)?\s*is\s*rerouted|both\s*directions|(?:express|local)?\s*in\s*(?:Manhattan|Brooklyn|Queens|the Bronx|staten Island)?|as follows\:|line[s]?|travel(?:ing)?|are|(?:and\s*)?(?:on|in|b\s*etween|along|long|from|to|via|\breplace\b)\s*(?:the)?|then(?:\s*end)?|end\s*(?:at)|\,|\.|\(\s*skipping[^\(\)]*\))*\s*(?:\[(?:A|B|C|D|E|F|G|M|L|J|Z|N|Q|R|W|S|SIR|[1-7]|SB|TP)\])*(?:[\*\s]*)(?:(?:(?:[\*\s]*|between|and|\/|or|until|to(?:\s*\/from\s*)?|end\s(?:at)?|express|local|in\s*both\s*directions|train(s)?)*\s*(?:\[(?:(?:Qs|Mn|Bx|Bk|SI)[0-9]{1,5}\-[A-z0-9]{1,5}[|]?)+\])(?:\,?\s*the last stop|\,|\s*days(?:\s*(?:and|\/)\s*)?evenings|\*?)*\.?)*)*)*)+/;
/**
	 /((?:(?:(?:(?:Some|northbound|southbound|(?:down|up)town|and|\b.*\b[\s-]bound|(?:\[(?:Qs|Mn|Bx|Bk|SI)[0-9]{1,5}\-[A-z0-9]{1,5}\])\s*[\s-]\s*bound)\s*)*\[(?:A|B|C|D|E|F|G|M|L|J|Z|N|Q|R|W|S|SIR|[1-7]|SB|TP)\][\*\s]*(?:(?:Some|northbound|southbound|(?:down|up)town|and|\b.*\b[\s-]bound|(?:\[(?:Qs|Mn|Bx|Bk|SI)[0-9]{1,5}\-[A-z0-9]{1,5}\])\s*[\s-]\s*bound)\s*)*)*(?:(?:express|local|shuttle)?\s*(?:trains)?\s*(?:(?:(?:make|run)\s*local(?:\s*stops)?\s*and)?(?:\s*are)?\s*(?:reroute[d]?(?:(?:\s*in\s*both\s*directions)?)?|replace|stopping|operate\s*(?:weekday|weekend|evening|overnight)\s*(?:service)?|run(?:ning)?\s*(?:(?:via|along)\s*(?:the)?|traveling|express|local|between))|(?:(?:(?:\[SB\]\s*)?\wbus(?:es)?\w|service operates|operate(?:s)?)\s*(?:(?:at\s*)?all\s*times)?(?:\s*in\s*two\s*sections[\s0-9\:\.]*|\s*b\s*etween)?)|(?:are\s*)?(?:skip(?:ping)?|bypass(?:ing)?)\s*(?:\[(?:(?:Qs|Mn|Bx|Bk|SI)[0-9]{1,5}\-[A-z0-9]{1,5}[|]?)+\](?:\s*|\,|and)*)+)|(?:then)?\s*(?:stopping)?\s*\b(?:over|along)\b\s*the|(?:then|trains)\s*end\s*(?:at)?))(?:(?:\s*|[1-9]\.)*(?:(?:and)?\s*is\s*rerouted|both\s*directions|(express|local)?\s*in\s*(?:Manhattan|Brooklyn|Queens|the Bronx|staten Island)?|as follows\:|line[s]?|travel(?:ing)?|are|(?:and\s*)?(?:on|in|b\s*etween|along|long|from|to|via|replace)\s*(?:the)?|then(?:\s*end)?|end\s*(?:at)|\,|\.|\(\s*skipping[^\(\)]*\))*\s*(?:\[(?:A|B|C|D|E|F|G|M|L|J|Z|N|Q|R|W|S|SIR|[1-7]|SB|TP)\])*(?:[\*\s]*)(?:(?:(?:[\*\s]*|between|and|\/|or|until|to(?:\s*\/from\s*)?|end\s(?:at)?|express|local|in\s*both\s*directions|train(s)?)*\s*(?:\[(?:(?:Qs|Mn|Bx|Bk|SI)[0-9]{1,5}\-[A-z0-9]{1,5}[|]?)+\])(?:\,?\s*the last stop|\,|\s*days(?:\s*(?:and|\/)\s*)?evenings|\*?)*\.?)*)*)*)+/;
*/

	// @TODO -- Route Change ONLY -- /((?:(?:(?:(?:Some|northbound|southbound|and)\s*)*\[(?:A|B|C|D|E|F|G|M|L|J|Z|N|Q|R|W|S|SIR|[1-7]|SB|TP)\]\s*)*(?:trains(?:\s*(?:make|run)\s*local(?:\s*stops)?\s*and)?(?:\s*are)?\s*(?:reroute[d]?(?:(?:\s*in\s*both\s*directions)?)?|stopping|run(?:ning)?\s*via (?:the)?|traveling)|(?:then)?\s*(?:stopping)?\s*\b(?:over|along)\b\s*the|(?:then|trains)\s*end\s*(?:at)?|(?:(?:shuttle\s*)?service operates(?:\sin\stwo\ssections[\s0-9\:\.]*|\s*b\s*etween)?)))(?:(\s|[1-9]\.)*(?:(?:and)?\sis\srerouted|both\s*directions|in\s*(?:Manhattan|Brooklyn|Queens|the Bronx|staten Island)?|as follows\:|line[s]?|travel(?:ing)?|are|(?:and\s)?(?:on|in|b\s*etween|along|long|from|to|via)\s*(?:the)?|then(?:\send)?|end\s*(?:at)|\,|\.|\(\s*skipping[^\(\)]*\))*\s*(?:\[(?:A|B|C|D|E|F|G|M|L|J|Z|N|Q|R|W|S|SIR|[1-7]|SB|TP)\])*(?:(?:(?:\s|between|and|until|to(?:\s*\/from\s*)?|end\s(?:at)?|express|local|in\s*both\s*directions)*\s*(?:\[(?:Qs|Mn|Bx|Bk|SI)[0-9]{1,5}\-[A-z0-9]{1,5}\])(?:\,?\sthe last stop)?\.?)*)*)*)+/;

	// The regex suffix, where the stations regex should be inserted before.
	let suffix_wrapper = ')*)+';

	// Convert the main regex, then remove the suffix, insert the stations,
	// and reapply the suffix. This should compelte the regex as a string,
	// ready to be passed the RegEx String Match function.
	routeChangePattern = mtaRegEx.convertRegExpToString(routeChangePattern);
	routeChangePattern = routeChangePattern.slice(0, -(suffix_wrapper.length));
	routeChangePattern += stations + '*' + suffix_wrapper;

	let results = [];
	let message_raw = text;
	for (let i = 0; i < 12; i++) {
		let match = mtaRegEx.matchRegexString(routeChangePattern, text);
		if (!match) {	break; }

		results.push(match);
		text = text.replace(match, ' --M' + 1 + '-- ');
	}

	return results.join(' ``` ');
}


/**
 * Parse the event message for any keywords we can use to tag the event.
 *
 * @param [string] text
 *   The event message.
 * @param [string] action
 * 	 If present, we'll only check for these actions
 *
 * @return [array|null]
 *   An array of matched tags (DISTINCT). Otherwise, [null].
 */
function getMessageAction(text, action) {

	let my_status = [];

	text = text.toUpperCase();

	for (type in mtaTaxonomy.incident_types) {
		if (action && action.indexOf(type) === -1) { continue; }

		for (variation in mtaTaxonomy.incident_types[type]) {
			if (!mtaTaxonomy.incident_types[type][variation]) {
				continue;
			}

			if (mtaTaxonomy.incident_types[type][variation] instanceof RegExp) {
				try {
					if (text.match(mtaTaxonomy.incident_types[type][variation])) {
						my_status.push(type);
						break;
					}
				}
				catch (err) {
					console.log('getMessageAction(): failed to execute a regex taxonomy. -- ', err);
				}
			}
			else if (typeof mtaTaxonomy.incident_types[type][variation] == 'string') {
				if (text.indexOf(mtaTaxonomy.incident_types[type][variation].toUpperCase()) !== -1) {
					my_status.push(type);
					break;
				}
			}
		}
	}

	return (my_status.length > 0) ? my_status : null;
}


module.exports = {
	checkReports,
	parseStatusFeed,
	getMessageAlternateInstructions,
	getMessagePlannedWorkDate,
	getMessageTrainLines,
	getMessageAction,
	getMessageRouteChange,
	getRouteChange,
	getStationsInEventMessage,
}
