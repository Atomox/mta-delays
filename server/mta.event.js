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
			my_body.events.push(await parseSingleEvent(t[o]));
		}
	}



	return my_body;
}


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


	e.detail = await parseDetailMessage(e.detail, e.summary, e.line);

	return e;
}


async function parseDetailMessage(status, summary, lines) {

	// Clean it up.
	status = cleanStatusText(decode(status));

	status = await formatSingleStatusEvent(status, lines, summary);

	return status;
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
 * @param  {string} event
 *   The text for a single event.
 *
 * @return {object}
 *   An event object.
 */
async function formatSingleStatusEvent(event, lines, summary) {

	event = event.trim();

	let  e = null;

	if (event) {
		e = {
			type: null,
			type_detail: null,
			time: null,
			durration: null,
			message: event,
			message_raw: event,
			message_station_parse: event,
			stations: {},
			trains: [],
			train_context: [],
		};

		// Determine if the event type has more detail.
		e.type_detail = getMessageAction(event);

		// Get an interruption time
		e.time = getMessageDateTime(event);

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
		let station_result = await getStationsInEventMessage(e.train_context, e.message, e.message_station_parse);
		e.stations = station_result.stations;
		e.message_station_parse = station_result.parsed_message;


		e.route_change = await getRouteChange(e.message_station_parse, e.trains, true);

		e.message_formula = prepareEventMessage(e.message, e, true, summary);
		e.message = prepareEventMessage(e.message, e, false);
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
	let result = {
		stations: {},
		parsed_message: (parsed_message) ? parsed_message : message,
	};


	for (let l in lines) {
		try {
			let my_l = (lines[l].line) ? lines[l].line : lines[l];

			// Get an stations related to this line.
			result.stations[my_l] = await mtaStations.matchRouteStationsMessage(my_l, message, result.parsed_message);
			result.parsed_message = result.stations[my_l].processed_message;

//			console.log('\n\n', my_l,'---', result.stations[my_l].stations);
		}
		catch (err) {
			console.warn('Error while fetching stations in event msg: ', err);
			continue;
		}
	}

	return result;
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


function prepareEventMessage(message, status, use_placeholder, summary) {

//	console.log('\n\n Handling Message Cleanup\n', message);

	// Pull the original message out of there.
	if (summary) {
//		console.log(' > Replacing summary message...\n', summary);
		message = message.replace(summary, (use_placeholder) ? '[-SUMMARY-]' : '');
	}

	// Remove the original message out of there.
	if (status.durration !== null) {
//		console.log(' > Replacing Durration message...\n', status.durration);
		message = message.replace(status.durration, (use_placeholder) ? '[-DATES-]' : '');
	}

	// Remove the alternate directions.
	if (status.alt_instructions !== null) {
//		console.log(' > Replacing Alt Instructions message...\n', status.alt_instructions);
		message = message.replace(status.alt_instructions, (use_placeholder) ? '[-ALT-INSTRUCT-]' : '');
	}

	if (status.ad_message !== null) {
//		console.log(' > Replacing AD message...\n', status.ad_message);
		message = message.replace(status.ad_message, (use_placeholder) ? '[-AD-MESSAGE-]' : '');
	}


	return message.trim();
}


function getMessageDateTime(text) {
	let DatePattern = /(?=<span\s*class="DateStyle"\s*>(.*)<\/span>)/gi;
	let dateResults = text.split(DatePattern);
	return (dateResults[1]) ? dateResults[1].trim() : null;
}


function getMessageAlternateInstructions(text) {

	// In Progress -- Reduction For service to these stations
//	let alternateInstructionPattern = /((\[TP\]|(\b(For\s*service\s*(to|from)|use\s*(nearby)?|take\s*the|Transfer\s*(to|between)?|Travel\s*Alternatives|As\s*an\s*alternative\s*(?:customers\s*may\s*)take\s*the)\b))+((\s*((stations|these stations|trains|transfer\s*to)?(\s|,|and|or|instead|at|\;|\|)?)*|((\s*[a-zA-Z0-9\-\.\/\:\;&\(\)\*]*)*)?)*(\s*\[(A|B|C|D|E|F|G|M|L|J|Z|N|Q|R|W|S|SIR|[1-7]|SB|TP)\])*\s*)*)+/i;

	let alternateInstructionPattern = /((\[TP\]|(\b(For\s*service\s*(to|from)|use\s*(nearby)?|take\s*the|Transfer\s*(to|between)?|Travel\s*Alternatives|As\s*an\s*alternative\s*(?:customers\s*may\s*)take\s*the)\b))+((\s*((stations|these stations|trains|transfer\s*to)?(\s|,|and|or|instead|at|\;|\|)?)*|((\s*[a-zA-Z0-9\-\'\.\/\:\;&\(\)\*]*)*)?)*(\s*\[(A|B|C|D|E|F|G|M|L|J|Z|N|Q|R|W|S|SIR|[1-7]|SB|TP)\]|(\[(ad)\]))*\s*)*)+/i;

	// We must remove the Ad note suppliment before we can perform a TP match.
	let ad_message = getMessageADNote(text);
	if (ad_message !== null) {
		text = text.replace(ad_message, '');
	}

	let results = text.match(alternateInstructionPattern);

	if (results && results[0]) {
		return results[0].trim();
	}

//	console.warn('Can\'t parse alternate instructions in ---', text);
	return null;
}


function getMessageADNote(text) {

	// let adPattern = /\[ad\](\s*[a-zA-Z0-9\-\.\/\:\;&\(\)\*\,]*)*/i;
	let adPattern = /\[ad\](\s*This\s*service\s*change\s*affects)\s*(\s*[\'\|a-zA-Z0-9\-\.\/\:\;&\(\)\*\,]+)+/i;
	let results = text.match(adPattern);

	if (results && results[0]) {
		return results[0].trim();
	}

	return null;
}


function getMessagePlannedWorkDate(text) {
	// In Progress -- Reduction
	let workDatePattern = /(\b(Weekend[s]?|Late Night[s]?|Night[s]?|Day[s]?|Late Evening[s]?|Evening[s]?|All times|Until)\b\s*,?(\s*((([0-9]{1,2}|[0-9]{1,2}:[0-9]{1,2})\s*(AM|PM)\s*)|([0-9]{1,2}\s*(-\s*[0-9]{1,2})?\s*(20[0-9]{2})?)?|(20[0-9]{2}))?\s*[,-]?\s*((Saturday|Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Sat|Sun|Mon|Tue|Wed|Thur|Thu|Fri|to|until|beginning(\sat)?|further\snotice|and|including)|(Jan|Feb|Mar|Apr|May|June|July|Aug|Sept|Oct|Nov|Dec|Spring|Summer|Fall|Winter|Holiday[s]?))?\s*(\,|&bull\;|&|\*|\;)?\s*)*\s*)+/i;

	let dateResults = text.match(workDatePattern);

	if (dateResults && dateResults[0]) {
		return dateResults[0].trim();
	}

//	console.warn('Can\'t parse event dates in ---', text);
	return null;
}


async function getRouteChange(text, lines, station_ids_in_text) {
	let c = await getMessageRouteChange(text, lines, station_ids_in_text);

	let reroute_pattern = /(Some\s)?(Northbound|Southbound)?\s*\[([A-Z0-9])\](?:(?:\s|and|\*)*\[([A-Z0-9])\])?\s*(?:(?:trains(?:\sare\srerouted\s)?)|(?:[^\[\]]*(service operates between|No service between)\s*(\[[A-Z]{2}[A-Z0-9]{1,4}\-[A-Z0-9]{2,5}\])[^\[\]]*(\[[A-Z]{2}[A-Z0-9]{1,4}\-[A-Z0-9]{2,5}\]))?)[^\[\]]*(?:(?:and|then)? (?:via|along|over)+ the|\s)+\[([A-Z0-9])\][^\[\]]*(\[[A-Z]{2}[A-Z0-9]{1,4}\-[A-Z0-9]{2,5}\]|to\/from|to)[^\[\]]*(\[[A-Z]{2}[A-Z0-9]{1,4}\-[A-Z0-9]{2,5}\])(?:[,\s]*)(?:(?:(?:and|then)? (?:via|along|over)+ the|\s)+(\[(?!\3\4)[A-Z0-9]\])?[^\[\]]*(\[[A-Z]{2}[A-Z0-9]{1,4}\-[A-Z0-9]{2,5}\]|to\/from|to)(?:[^\[\]]*(?:(\[[A-Z]{2}[A-Z0-9]{1,4}\-[A-Z0-9]{2,5}\])))?)?/i;

	// /\[([A-Z0-9])\](?:\s|[^\[\]])*(?:\[([A-Z0-9])\](?:\s)*)?(?:\s|[^\[\]])*\[([A-Z0-9])\](?:\s|[^\[\]])*(\[[A-Z]{2}[A-Z0-9]{1,4}\-[A-Z0-9]{2,5}\])(?:\s|[^\[\]])*(\[[A-Z]{2}[A-Z0-9]{1,4}\-[A-Z0-9]{2,5}\])(?:\s|[^\[\]])*(?:(\[(?!\1\2)[A-Z0-9]\])?(?:\s|[^\[\]])*(\[[A-Z]{2}[A-Z0-9]{1,4}\-[A-Z0-9]{2,5}\])(?:(?:\s|[^\[\]])*((\[[A-Z]{2}[A-Z0-9]{1,4}\-[A-Z0-9]{2,5}\])))?)?/i;

	function unwrapTrain(train) {
		if (!train) { return train; };
		train = train.replace('[', '');
		train = train.replace(']', '');
		return train.trim();
	}

	if (c) {
		c = {
			message: c,
			message_mod: c,
			re: null,
			trains: [],
			route: [],
			new_stations: [],
		};

		for (let passes = 0; passes < 6; passes++) {

			c.results = mtaRegEx.matchRegexString(reroute_pattern, c.message_mod, true);

			// Only makes passes until our regex comes up blank.
			if (c.results === false) {	break;	}


			// Replace the pattern.
			if (c.results[0] && c.results[3]) {
				// First line in message == second reroute line, then we might be overreaching our SINGLE MESSAGE.
				if (c.results[1] === c.results[11]) {
					console.warn('\n\n\n\nWe should replace part of this message! We may be stealing part of another message!\n\n\n\n\n');
				}

				c.message_mod = c.message_mod.replace(c.results[0],'[-- route-match --]');
			}

			// Positions:
			// 0: FULL Match
			// 1: All/Some
			// 2: Northbound/Southbound
			// 3,4: Affected Lines
			// 5: Message (unimportant)
			// 6,7: Operating between these stations (own line)
			// 8: Reroute Line 1
			// 9, 10: Rereoute 1 stations
			// 11: Reroute line 2
			// 12, 13: Rereoute 2 stations.

			// Did we have at least one train match?
			if (c.results[3] !== undefined) {

				let route_pair = {
					route: [],
				};

				// Possible Routes Start at:
				// Operates: 6,7
				// First: 8-10
				// Second: 11-13

				c.results.map((item, i) => {
					if (i == 0 || !item) { return; };
					let j = (i <= 7 ) ? 0 : (i <= 10) ? 1 : 2;

					if (!route_pair.route[j]) {
						route_pair.route.push({
							allTrains: (c.results[1]) ? false : true,
							dir: (c.results[2] ? c.results[2] : null),
							lines: [],
							along: null,
							from: null,
							to: null,
						});
					}
					switch (i) {
						case 1:
							// Some trains? We chekc for SOME, so if matched, then FALSE.
							route_pair.route[j].allTrains == (item) ? false : true;
							break;
						case 2:
							// Direction of trains?
							route_pair.route[j].dir == item;
							break;
						case 3:  // Operates between, so along = self
						case 4:
							// Affected Lines.
							c.trains.push(unwrapTrain(item));
							route_pair.route[j].lines.push(unwrapTrain(item));
							break;

						case 6: // from
						case 9:
						case 12:
							route_pair.route[j].from = unwrapTrain(item);

							// Possible structures:
							// 1. A over B  from [station] to [station] then C to [station],
							// 2. A over B  from [station] to [station] then C from [station] to [station],
							// 3. A over B  from [station] to [station] then C (to/from) [station],
							// If 1 or 3, then set [0].to as [1].from.
							// If this is not a station, then it is a (to || to/from),
							// which means only 1 line. (scenario #3)
/**							if (item.indexOf('to') !== -1) {
								route_pair.route[j].from = route_pair.route[j-1].to;
								route_pair.route[j].to = unwrapTrain(item);
							}
	*/
							if (!c.results[i+1]) {
								route_pair.route[j].from = route_pair.route[j-1].to;
								route_pair.route[j].to = unwrapTrain(item);
							}
							break;

						case 8:  // First reroute
						case 11: // Second reroute
							route_pair.route[j].along = unwrapTrain(item);
							route_pair.route[j].lines = route_pair.route[j-1].lines;
							break;

						case 7:
						case 10:
						case 13:
							route_pair.route[j].to = unwrapTrain(item);
							route_pair.route[j].to = unwrapTrain(item);
							break;
					}
				});

				// Push the results onto our final guy.
				route_pair.route.map(r => {
					if (r.from && r.to) {
						c.route.push(r);
					}
				});
			}
		}
	}

	return c;
}


/**
 * Given a string status update, find any route change messaging.
 *
 * @param  {string} text
 *   The haystack.
 * @param  {array} lines
 *   The train lines, by original ID.
 * @param  {boolean} station_ids_in_text
 *   TRUE if the find sations function was run against this message,
 *   and all station names have been replaces by ID placeholders,
 *   like: [Qs123-ID]. This prevents us from running heavier regex with
 *   all stations in the lines.
 *
 * @return {text | false}
 *   If found, we return the matched rout change message.
 */
async function getMessageRouteChange(text, lines, station_ids_in_text) {

	// Get stations in each line, as a giant regex.
	let stations = await mtaStations.getStationLinesRegex(lines, station_ids_in_text);

	// Parse Route Changes ([R] trains are running along the [F] line from...)
//	let workDatePattern = /(((((Some|northbound|southbound|and)\s*)*\[(A|B|C|D|E|F|G|M|L|J|Z|N|Q|R|W|S|SIR|[1-7]|SB|TP)\]\s*)*(trains(\s*are)?\s*(reroute[d]?|stopping|run(ning)? via (the)?)|(then)?\s*(stopping)?\s*(over|along)\s*(the)?)){1}(\s*(trains|both\s*directions|line(s)?|travel(ing)?|are|(on|in|between|along|long|from|to|via)\s*(the)?|then|end at|\,|\.)*\s*(\[(A|B|C|D|E|F|G|M|L|J|Z|N|Q|R|W|S|SIR|[1-7]|SB|TP)\])*)*)+/;

	let workDatePattern = /((?:(?:(?:(?:Some|northbound|southbound|and)\s*)*\[(?:A|B|C|D|E|F|G|M|L|J|Z|N|Q|R|W|S|SIR|[1-7]|SB|TP)\]\s*)*(?:trains(?:\s|are)*(?:reroute[d]?|stopping|run(?:ning)? via (?:the)?)|(?:then)?\s*(?:stopping)?\s*\b(?:over|along)\b\s*(?:the)?|(?:then|trains)\s*end\s*(?:at)?))(?:\s*(?:trains|both\s*directions|line[s]?|travel(?:ing)?|are|(?:on|in|between|along|long|from|to|via)\s*(?:the)?|then|end\s*(?:at)|\,|\.)*\s*(?:\[(?:A|B|C|D|E|F|G|M|L|J|Z|N|Q|R|W|S|SIR|[1-7]|SB|TP)\])*)*)+/;

	// The regex suffix, where the stations regex should be inserted before.
	let suffix_wrapper = ')*)+';

	// Convert the main regex, then remove the suffix, insert the stations,
	// and reapply the suffix. This should compelte the regex as a string,
	// ready to be passed the RegEx String Match function.
	workDatePattern = mtaRegEx.convertRegExpToString(workDatePattern);
	workDatePattern = workDatePattern.slice(0, -(suffix_wrapper.length));
	workDatePattern += stations + '*' + suffix_wrapper;

	let results = [];
	let message_raw = text;
	for (let i = 0; i < 5; i++) {
		let match = mtaRegEx.matchRegexString(workDatePattern, text);
		if (!match) {	break; }

		results.push(match);
		text = text.replace(match, ' --M' + 1 + '-- ');
	}

	return results.join(' ');
}


function getMessageAction(text) {

	let my_status = [];

	text = text.toUpperCase();

	for (type in mtaTaxonomy.incident_types) {
		for (variation in mtaTaxonomy.incident_types[type]) {
			if (text.indexOf(mtaTaxonomy.incident_types[type][variation].toUpperCase()) !== -1) {
				my_status.push(type);
				break;
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
	getMessageDateTime,
	getMessageRouteChange,
	getRouteChange,
	getStationsInEventMessage,
}
