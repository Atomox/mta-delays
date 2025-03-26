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
import striptags from 'striptags';
import decode from 'unescape';
import { unionArrays as union } from './arrays.js';
import config from 'config';
import { getBorosFromStations, matchAllLinesRouteStationsMessage } from './mta.stations.js';
import { getMessageDates } from './mta.dates.js';
import { getRouteChange } from './mta.route_change.js';
import { getWeightedMessageTaxonomy, getPrimaryTag } from './mta.taxonomy.js';

const GLOBAL_DEBUG_ID = config.get("global_debug_id");

/**
 * Verify valid payload from MTA, and prepare events to be parsed.
 */
export function checkReports(response) {

	let timestamp = response.header.timestamp; // response.Siri.ServiceDelivery[0].ResponseTimestamp[0];
	let situations = response.entity // response.Siri.ServiceDelivery[0].SituationExchangeDelivery[0].Situations;

	let data = {
		status: true,
		timestamp: timestamp,
		events: false
	}

	if (situations && situations[0] && typeof situations[0] == 'object') {
		data.events = situations;
	}

	return data;
}

/**
 * Process events.
 */
export async function parseStatusFeed(feedObject) {

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
		station: [],
		effects: null,
		severity: null,
		source: null,
	};
	try {
		e.id = event.id.trim();
		e.type = event.alert["transit_realtime.mercury_alert"].alert_type;
		e.planned = (e.type !== "Delays") ? true : false;

		if (!event.alert.header_text && !event.alert.description_text) {
			console.warn(event.alert);
			throw new Error("Event ID# " + event.id + " missing Header & Description Text. Skipping.");
		}

		let title = (event.alert.header_text) ? event.alert.header_text.translation[0].text : "";
		let description = (event.alert.description_text) ? event.alert.description_text.translation[0].text : "";

		e.summary = event.alert.header_text.translation[0].text;
		e.detail = title + " " + description;
		e.type_detail = null;
		e.severity = null;

		e.date.fetched = event.alert.active_period.start;
		e.date.start =event.alert.active_period.start;
		e.date.end = (event.alert.active_period.end) ? event.alert.active_period.end : null;

		// Parse out lines.
		let k = event.alert.informed_entity; // event.Affects[0].VehicleJourneys[0].AffectedVehicleJourney;
		for (let j in k) {
			if (k[j].route_id){
				e.line.push({ line: k[j].route_id.trim(), dir: null, entity: k[j]["transit_realtime.mercury_entity_selector"].sort_order});
			}
			else if (k[j].stop_id) {
				e.station.push({ station: k[j].stop_id })
			}
			else {
				console.warn("New type of informed_entity: ");
				console.warn(k[j]);
			}
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
		return text;
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
	text = text.trim();

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
				alt_instructions: {
					raw: null,
					parsed: null,
					stations_bound: [],
					stations: []
				},
				stations: {},
				trains: [],
				train_context: [],
			};

			// Determine if the event type has more detail.
			let tags = getWeightedMessageTaxonomy(event);
			e.type = getPrimaryTag(tags['tags_detailed']);
			e.type_detail = tags['tags'];
			e.tags = tags['tags_detailed'];

			// Get a scheduled time from the body. (Planned Work)
			e.durration = getMessageDates(event);

			// Get AD note (always at the bottom).
			// <!> Must run before Travel Alt, which WILL match this.
			e.ad_message = getMessageADNote(event);

			// Break out any alternate route information from the body.
			e.alt_instructions.raw = getMessageAlternateInstructions(event);

			// Get a train lines in main message.
			// Add them to the lines set for station parsing.
			e.train_context = getMessageTrainLines(event);

			// Get all line names, then filter a distinct set.
			e.trains = union(lines
				.map((val) => val.line)
				.filter((value, index, self) => self.indexOf(value) === index));
			e.train_context = union(e.trains,e.train_context);

			// Remove alt instructions before gathering affected stations,
			// for accuracy of event over unaffected stations listed only for
			// alternate service. This also affects the accuracy of affected boros.
			let trim_message = (e.alt_instructions.raw !== null)
				? e.message.replace(e.alt_instructions.raw, '[-ALT-INSTRUCT-]')
				: e.message;

			// Get all stations per line. Also get a formatted message, with station names
			// substituted with their IDs, for easier parsing of line and route changes.
			let station_result = await getStationsInEventMessage(e.train_context, trim_message, null, union(e.type_detail, e.durration.tags));
			e.stations = station_result.stations;
			e.stations_bound = station_result.bound;
			e.message_station_parse = station_result.parsed_message;

			// Get a formatted alt instructions message, with station names
			// substituted with their IDs.
			let station_result_alt = await getStationsInEventMessage(e.train_context, e.alt_instructions.raw, null, union(e.type_detail, e.durration.tags));

			e.alt_instructions.stations = station_result_alt.stations;
			e.alt_instructions.stations_bound = station_result_alt.bound;
			e.alt_instructions.parsed = station_result_alt.parsed_message;

			// Determine affected boros using affected station list.
			e.boros = getBorosFromStations(e.stations);

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
export async function getStationsInEventMessage(lines, message, parsed_message, tags) {
	return await matchAllLinesRouteStationsMessage(lines, message, parsed_message, tags);
}

/**
 * Find all train lines in passed text,
 * and return a distinct list of results, in train key format (MTA NYCT_2)
 */
export function getMessageTrainLines(text) {

	let train_pattern = /\[(A|B|C|D|E|F|G|M|L|J|Z|N|Q|R|W|S|SI|SIR|[1-7]|6D|7D|SH|SF)\]/ig;

	let results = {};
	let m;
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
	if (status.alt_instructions.raw !== null) { message = message.replace(status.alt_instructions.raw, (use_placeholder) ? '[-ALT-INSTRUCT-]' : ''); }
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
export function getMessageAlternateInstructions(text) {
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
export function getMessageADNote(text) {
	let adPattern = /\[ad[0-9]?\]\s*(?:(?:This|These)\s*service\s*change[s]*\s*affect[s]?|For\s*an accessible\s*connection)\s*(\s*(?:[\'\|a-zA-Z0-9\-\.\/\:\;&\(\)\*\,]+|\[(S[a-z]?|[a-z0-9]{1,2})\]))+/i;
	let results = text.match(adPattern);

	return (results && results[0])
 		? results[0].trim()
		: null;
}
