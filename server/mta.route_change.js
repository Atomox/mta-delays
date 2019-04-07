const _union = require('lodash').union;
const _uniq = require('lodash').uniq;

const mtaStations = require('./mta.stations');
const mtaTags = require('./mta.taxonomy');
const mtaStatus = require('./mta.event');
const mtaRegEx = require('./includes/regex');


function unwrapTrain(train) {
	if (!train) { return train; };
	train = train.replace('[', '');
	train = train.replace(']', '');
	return train.trim();
}


function unwrapStation(token) {
	token = unwrapTrain(token);
	return (token.indexOf('|') !== -1)
		? token.split('|')
		: token;
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
		if (! mtaTags.getMessageAction(msg[i], ['operate_sections'])
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
			reroute_pattern = /((?:after\s*(?:\[(?:Qs|Mn|Bx|Bk|SI)[0-9]{1,5}\-[A-z0-9]{1,5}\])\s*,?\s*)?(Some)?\s*(Northbound|Southbound|Uptown|Downtown|(?:\[(?:Qs|Mn|Bx|Bk|SI)[0-9]{1,5}\-[A-z0-9]{1,5}\])\s*[\s-]\s*bound|\b[^\[\]\`]*\b[\s-]bound)?\s*\[([A-Z0-9]{1,2})\](?:\*|\s)*(?:(?:\s|and)*\[([A-Z0-9]{1,2})\])?\s*(Northbound|Southbound|Uptown|Downtown|(?:\[(?:Qs|Mn|Bx|Bk|SI)[0-9]{1,5}\-[A-z0-9]{1,5}\])\s*[\s-]\s*(?:bound)?|\b[^\[\]\`]*\b[\s-]bound)?\s*(?:(?:([^`\[\]]*\b(?:No|service|trains)\s*(?:service|operates?|run)\s*b\s*etween\b|\[__operates-section-[0-9]__\]\s*(?:between)?)\s*(\[(?:[A-Z]{2}[A-Z0-9]{1,4}\-[A-Z0-9]{2,5}[|]?)+\])[^\[\]`]*(\[(?:[A-Z]{2}[A-Z0-9]{1,4}\-[A-Z0-9]{2,5}[|]?)+\])\,?)|(?:trains)?\s*(?:are\s*rerouted)?)?[^\[\]`]*?)((?:\s*(?:(?:and|then|run(?:ning)?|make|making|stopping)?\s*)+(?:(?:(on|via|a?long|over|replace)+\s*(?:the)?\s*\[((?!\3\4)[A-Z0-9])\]|(?:on\s*the\s*)?(express|local)(?:\s*track)?)[^\/\[\]`]*(express|local|to\s*\/\s*from|to|in|\[(?:[A-Z]{2}[A-Z0-9]{1,4}\-[A-Z0-9]{2,5}[|]?)+\])[^\[\]`]*(Manhattan|Queens|Brooklyn|the\s* Bronx|\[(?:[A-Z]{2}[A-Z0-9]{1,4}\-[A-Z0-9]{2,5}[|]?)+\])|to\s*\/\s*from\s*(?:the)?\s*(\[(?:[A-Z]{2}[A-Z0-9]{1,4}\-[A-Z0-9]{2,5}[|]?)+\])\s*\[([A-Z0-9]{1,2})\]\s*(?:station)?\s*(?:after\s*(\[(?:[A-Z]{2}[A-Z0-9]{1,4}\-[A-Z0-9]{2,5}[|]?)+\]))?))\s*(?:\s*\(skipping.*\)\s*|\,\s*the\s*last\s*stop|\,\s*then\s*end)?[\.,\s]*)((?:(?:(?:and|then)?\s*(?:trains\s*(?:run)\s*)?(?:stopping|run|operat(?:e|ing))?\s*(via|along|over|replace|on)+ the)\s*(\[(?!\3\4)[A-Z0-9]\])?[^\[\]`]*?((?:and\s*)?end(?:ing)?\s*at|to\s*\/\s*from|\bto\b|\[(?:[A-Z]{2}[A-Z0-9]{1,4}\-[A-Z0-9]{2,5}[|]?)+\])(?:[^\[\]`]*?(?:(\[(?:[A-Z]{2}[A-Z0-9]{1,4}\-[A-Z0-9]{2,5}[|]?)+\])[\.]?))?)?)/i,
			no_trains_between_pattern = /(?:Service\s*is\s*(suspended)\s*(?:in\s*both\s*directions\s*)(?:on\s*the\s*)|(No)\s*)?\[([A-Z0-9]{1,2})\](?:\*|\s)*(?:(?:\s|and|or)*\[([A-Z0-9]{1,2})\])?\s*(?:train[s]?\s*(?:service)?\s*)?(?:(No)?\s*(?:trains|service)\s*between|(?:line\s*)?between)\s*(?:(\[(?:[A-Z]{2}[A-Z0-9]{1,4}\-[A-Z0-9]{2,5}[|]?)+\])\s*(?:and)?\s*(\[(?:[A-Z]{2}[A-Z0-9]{1,4}\-[A-Z0-9]{2,5}[|]?)+\]))/i,
			bypass_pattern = /((Some)?\s*(Northbound|Southbound|Uptown|Downtown|(?:\[(?:Qs|Mn|Bx|Bk|SI)[0-9]{1,5}\-[A-z0-9]{1,5}\])\s*[\s-]\s*bound|\b[^\[\[\`]*\b[\s-]bound)?\s*\[([A-Z0-9]{1,2})\](?:\*|\s)*(?:(?:\s|and)*\[([A-Z0-9]{1,2})\])?\s*(Some)?\s*(Northbound|Southbound|Uptown|Downtown|(?:\[(?:Qs|Mn|Bx|Bk|SI)[0-9]{1,5}\-[A-z0-9]{1,5}\])\s*[\s-]\s*bound|\b[^\[\]\`]\b[\s-]bound)?\s*(?:(?:trains|service)\s*(?:are|is)?\s*(skip(?:ping|s)?|bypass(?:ing|es)?)|(No\s*(?:trains|service))\s*at)\s*((?:\[(?:(?:Qs|Mn|Bx|Bk|SI)[0-9]{1,5}\-[A-z0-9]{1,5}[|]?)+\]\s*(?:,|and)*\s*)+))\s*((?:(?:trains|service)\s*(?:are|is)?\s*(skip(?:ping|s)?|bypass(?:ing|es)?)|(No\s*(?:trains|service))\s*at)\s*((?:\[(?:(?:Qs|Mn|Bx|Bk|SI)[0-9]{1,5}\-[A-z0-9]{1,5}[|]?)+\]\s*(?:,|and)*\s*)+))?/i,
			operate_sections_pattern = /\[([A-Z0-9])\](?:(?:\s|and|\*)*\[([A-Z0-9])\])?\s*(?:(?:(?:\[__operates-section-([0-9])__\]|(?:(?:shuttle)?\s*(?:service|trains))\s*(?:operate(?:s)?|(?:are)?\s*run(?:ning)?))\s*(?:(?:(?:at)?\s*all\s*times)|weekend(?:s)?\s*(?:service)?)?\s*(?:(?:in)?\s*(?:Manhattan|Brooklyn|Queens|(?:the\s*)?Bronx))?\s*(?:between)?)\s*(\[(?:[A-Z]{2}[A-Z0-9]{1,4}\-[A-Z0-9]{2,5}[|]?)+\])(?:[^\[\]`]|\[[a-z0-9]\])*(\[(?:[A-Z]{2}[A-Z0-9]{1,4}\-[A-Z0-9]{2,5}[|]?)+\]))+/i,
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
					check: (msg) => (mtaTags.getMessageAction(msg, ['no_trains_partial', 'no_trains']) !== null),
					pattern: no_trains_between_pattern,
					callback: processRouteChangeNoServiceBetweenResult
				},
			];

	// @TODO -- Prepare Message
	if (op = mtaTags.getMessageAction(c, ['operate_sections'])) {
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
				if (!module[p]) {
					break;	}

				c.results = mtaRegEx.matchRegexString(module[p].pattern, c.message_mod, true);

				// Operate In Section Mode -- Only after we've exhausted normal matches.
				if (c.results !== false) {

					// Check the results, and add them if we find anything valid.
					let my_results = await module[p].callback(c.results, c.message_mod);

					// If we had results, process them.
					if (my_results.route && my_results.route.length > 0) {
						my_results.route.map(m => c.route.push(m) );
						c.trains = _uniq(c.trains.concat(my_results.trains));
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

	// First [line] in message == second reroute [line], then we might be overreaching our SINGLE MESSAGE.
	if (regex_match[4] === regex_match[21]) {
		console.warn('\n\n\n\nWe should replace part of this message! We may be stealing part of another message!',regex_match ,'\n\n\n\n\n');
	}


	let afterStationPrefix = undefined;
	if (regex_match[1]) {
		// Check for match of after (station) at start.
		let afterStationPattern = /(?:after\s*(\[(?:Qs|Mn|Bx|Bk|SI)[0-9]{1,5}\-[A-z0-9]{1,5}\])\s*,?\s*)?/gi;
		let myMatch = mtaRegEx.matchRegexString(afterStationPattern, regex_match[1], true);

		if (myMatch[1]) {
			afterStationPrefix = unwrapTrain(myMatch[1]);
		}
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
		// 6: Direction
		// 7: Message (unimportant)
		// 8,9: Operating between these stations (own line)
		// 10: Pattern 2 Match
		// 11: Action
		// 12: Reroute Line 1
		// 13: express/local
		// 14,15: Rereoute 1 stations
		// 16,18: After to/from station (matches #2 or #19) (line matches #17)
		// 17: Line (when After to/from)
		// 18: (optional) station matching #17 (if no #2 present)
		// 19: Pattern 3 Match
		// 20: Action
		// 21: Reroute line 2
		// 22, 23: Reroute 2 stations.

		// Possible Routes Start at:
		// Operates: 8,9
		// First: 10-15 -or- afterStationPrefix, 10, 16-18 -or- 10, 16-18
		// Second: 19-23

		regex_match.map((item, i) => {

			// When we have express in the first reroute group,
			// 10 will be empty, but we need to execute logic in 10.
			// 12: Action
			// 13: Reroute Line 1
			// 14: express/local
			if (i == 12 && !item && regex_match[13]) {
				/**
				 *
				 * @TODO....
				 *
				 */
			}
			else if (i == 0 || !item) { return; };

			// Which Reroute Group are we on?
			let j = (i <= 9 ) ? 0 : (i <= 18) ? 1 : 2;

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
					process: 'RouteChangeStandard'
				});
			}
			switch (i) {
				case 1:
				case 10:
				case 19:
					/**
					 * @TODO
					 *   If 10, and afterStationPrefix exists, append to the front of 10.
					 */
					// Full pattern route matches.
					route_pair.route[j].parsed = item.trim();

					// Since this pattern is parsed outside of the initial match,
					// we can't account for it as one of the matches in i.
					// We parse it from match i=1.
					// After 1, run to/from 2.
					if (i === 1 && afterStationPrefix) {
						route_pair.route[j].from = afterStationPrefix;
					}
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
				case 20:
					route_pair.route[j].action = item;
					break;

				// case 1: After [from]...
				//         Now a conditional in i=1 (first message)
				case 18: // ..., after [from]
				case 8: // from
				case 14:
				case 22:

					// Possible structures:
					// 1. After [station 1] A, from [station 2] [B] ... to [station 1].
					// If 2 or 4, then set [0].to as [1].from.
					// 2. A over B  from [station] to [station] then C to [station],
					// 3. A over B  from [station] to [station] then C from [station] to [station],
					// 4. A over B  from [station] to [station] then C (to/from) [station],
					// If this is not a station, then it is a (to || to/from),
					// which means only 1 line. (scenario #3)
					if (i == 18) {
						// Either:
						// After 1, run to/from 2.
						// -or-
						// Run to/from 2, after 1.
						route_pair.route[j].from = unwrapTrain(item);
					}
					// to:  stopping along the [A] line from [Bk636-A41] to [Mn611-A27],
					//      then stopping along the [E] line to [Qs616-G14].
					// end: along the [R] line from [Mn635-R27] to [Bk26-R30]
					//      then via the [D] line and end at [Bk59-B12].
					else if (item.indexOf('to') !== -1 || item.indexOf('end') !== -1) {
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

					// If we have a standard station pair, but we did not hit a
					// result for the second part of this pair, then use the
					// previous route match's 'to' as our from.
					// If this is case 1, this is special, and we should be
					// looking in a different spot for a match.
					if (!regex_match[i+1] && i !== 18) {
						route_pair.route[j].from = route_pair.route[j-1].to;
						route_pair.route[j].to = unwrapTrain(item);
					}
					break;

				case 12: // First reroute LINE
				case 17: // First reroute Alternate (run to/from station [line])
				case 21: // Second reroute LINE
					route_pair.route[j].along = (item) ? unwrapTrain(item) : null;
					route_pair.route[j].lines = route_pair.route[j-1].lines;
					break;

				case 9:
				case 15:
				case 16:
				case 23:
					// Special Case: In addition to the "to" station, when we hit this
					// special situation, we must also handle the "from" station,
					// which can be abnormal.
					//
					// In this scenario (i = 16), we should have an "after" station.
					// Sometimes it's before this station, and sometiems after.
					// When before, this item should be the from instead of to.
					// Since this item will always exist, but (i = 18) won't
					// (and scenario A, below, is outside of the i), we must handle this
					// in this 'to' section, instead of the normal 'from' section.
					//
					// i.e.
					// A: after [station], trains run to/from [F] [station]
					// B: trains run to/from [F] [station] after [station i = 18]
					if (i == 16 && !regex_match[18]) {
						route_pair.route[j].from = (afterStationPrefix)
							? afterStationPrefix
							: route_pair.route[j-1].to;
					}

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

//		console.log('\n\n\n >>> ', route_pair.route);

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


async function processRouteChangeBypassResult(regex_results, message_mod) {

		let results = {
			route: [],
			trains: [],
			message_mod: message_mod,
		};

		if (regex_results[4] !== undefined) {

			let route_pair = {
					route: []
				};

			regex_results.map( (item, i) => {

				if (!item) { return; };

				let j = (i <= 10 ) ? 0 : 1;

				if (!route_pair.route[j]) {
					route_pair.route.push({
						allTrains: true,
						dir: null,
						lines: [],
						along: null,
						bypass: [],
						action: null,
						section: null,
						parsed: null,
						process: 'RouteChangeBypass'
					});
				}

				switch(i) {

					case 0:
						// route_pair.route[j].parsed = item.trim();
						break;

					case 1:
					case 11:
						route_pair.route[j].parsed = item;
						break;

					case 2:
					case 6:
						// Some trains? We check for SOME, so if matched, then FALSE.
						route_pair.route[j].allTrains = (item) ? false : true;
						break;

					case 3:
					case 7:
						// Direction of trains?
						route_pair.route[j].dir = item;
						break;

					case 4:  // Operates between, so along = self
					case 5:
						if (item) {
							// Affected Lines.
							results.trains.push(unwrapTrain(item));
							route_pair.route[j].lines.push(unwrapTrain(item));
						}
						break;

					case 8:
					case 12:
						route_pair.route[j].action = 'bypass';
						break;

					case 9:
					case 13:
						route_pair.route[j].action = 'no_service';
						break;

					case 14:
						// For second route_change, import the line from the first.
						route_pair.route[j].lines = route_pair.route[j-1].lines;
						// Continue to logic below (no break)

					case 10:	 // Stations

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

			let r = route_pair.route;
			for (let j in r) {
				if (r[j].bypass && r[j].lines.length > 0) {
					let res = await analyzeStationArray(r[j]);
					results.route.push(res);
				}
			}
		}

		results.message_mod = replaceSimpleMessagePattern(message_mod, regex_results[0], 'bypass_stations');

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
							process: 'NoServiceBetween'
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

			let r = route_pair.route[j];
			if (r.to && r.from && r.lines.length > 0) {
				let res = await analyzeStationArray(r);
				results.route.push(res);
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
					process: 'RouteChangeSections'
			 	}
		 	]
		};

		regex_results.map((item, i) => {
			if (!item) { return; };

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
	try {

		let keys = ['from', 'to', 'bypass'],
			along = (r.along && typeof r.along === 'string')
				? r.along
				: (Array.isArray(r.lines) && r.lines.length > 0)
					? r.lines[0]
					: false;

		if (!along) {
			throw new Error('Analyze station expects a line ID on either -lines- or -along-, but found none.');
		}

		let line = await mtaStations.getTrainRouteBasic(along);

		for (let i in keys) {
			if (!r[keys[i]]) {	continue; }

				r[keys[i]] = (keys[i] === 'bypass')
					// Bypass is an array of stations.
					? r[keys[i]].map( s => resolveToken(s) )
					: resolveToken(r[keys[i]]);
		}

		function resolveToken(item) {
			// Only Analyze stations with multiples
			if (item.indexOf('|') === -1) { return item; }

			item = item.split('|');
			let result = line.filter((v) => (item.indexOf(v.key) !== -1) ? true : false);

			if (result.length <= 0) {
				console.warn('\n<!> Could not evaluation Station Multi-Token (', item, ') for line: ', along, '\n');
			}

			return (result.length > 0)
				? result[0].key
				: item;
		}
	}
	catch (err) {
		console.warn('\n\n<!> Error: ', err, '\n for: \n', r.lines, '|', r.along, '\n');
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

	let routeChangePattern = /((?:(?:(?:(?:Some|northbound|southbound|(?:down|up)town|and|\b.*\b[\s-]bound|(?:(?:after\s*)?\[(?:Qs|Mn|Bx|Bk|SI)[0-9]{1,5}\-[A-z0-9]{1,5}\])\s*[,\s-]\s*(?:bound)?)\s*)*\[(?:A|B|C|D|E|F|G|M|L|J|Z|N|Q|R|W|S|SIR|6D|7D|HS|FS|H|FS|[1-7]|SB|TP)\][\*\s]*(?:(?:Some|northbound|southbound|(?:down|up)town|and|\b.*\b[\s-]bound|(?:\[(?:Qs|Mn|Bx|Bk|SI)[0-9]{1,5}\-[A-z0-9]{1,5}\])\s*[\s-]\s*(?:bound)?)\s*)*)*(?:(?:express|local|shuttle)?\s*(?:trains)?\s*(?:(?:No\s*(?:\[[A-Z0-9]{1,2}\]\s*)?\s*(?:service|train[s]?(?:\s*service)?)|\bService\b\s*is\s*suspended\s*(?:in\s*both\s*directions\s*)?\s*(?:on\s*the\s*)?(?:\[[A-Z0-9]{1,2}\])?\s*line|are\s*making\s*(?:express|local|shuttle)\s*stops)\s*(?:(?:in)?\s*(?:Manhattan|Brooklyn|Queens|(?:the\s*)?Bronx)\s*)?(?:between|at)\s*(?:\[(?:(?:Qs|Mn|Bx|Bk|SI)[0-9]{1,5}\-[A-z0-9]{1,5}[|]?)+\](?:(?:,\s*)?(?:Manhattan|Brooklyn|Queens|(?:The\s*)?Bronx)|\s*|\,|and|or)*)+|(?:(?:make|run)\s*local(?:\s*stops)?\s*and)?(?:\s*(?:are|will))?\s*(?:reroute[d]?(?:(?:\s*in\s*both\s*directions)?)?|\breplace\b|stopping|operate\s*(?:weekday|weekend|evening|overnight)\s*(?:service)?|run(?:ning)?\s*(?:(?:via|along|on)\s*(?:the)?\s*(?:(?:express|local)\s*track)?|traveling|express|local|between))|(?:(?:(?:\[SB\]\s*)?\wbus(?:es)?\w|service operates|operate(?:s)?|\btrains\s*run\b)\s*(?:(?:at\s*)?all\s*times)?(?:\s*in\s*two\s*sections[\s0-9\:\.]*|\s*b\s*etween)?)|(?:are\s*)?(?:skip(?:ping)?|bypass(?:ing)?)\s*(?:\[(?:(?:Qs|Mn|Bx|Bk|SI)[0-9]{1,5}\-[A-z0-9]{1,5}[|]?)+\](?:\s*|\,|and)*)+)|(?:then)?\s*(?:stopping)?\s*\b(?:over|along)\b\s*the|(?:then|trains)\s*end\s*(?:at)?))(?:(?:\s*|[1-9]\.)*(?:(?:and)?\s*is\s*rerouted|both\s*directions|(?:express|local)?\s*in\s*(?:Manhattan|Brooklyn|Queens|the Bronx|staten Island)?|as follows\:|line[s]?|travel(?:ing)?|are|(?:and\s*)?(?:on|in|b\s*etween|along|long|from|to(?:\s*\/\s*from)?|via|\breplace\b)\s*(?:the)?|then(?:\s*end)?|end\s*(?:at)|\,|\.|\(\s*skipping[^\(\)]*\))*\s*(?:\[(?:A|B|C|D|E|F|G|M|L|J|Z|N|Q|R|W|S|SIR|6D|7D|HS|FS|H|FS|[1-7]|SB|TP)\])*(?:station|[\*\s]*)*(?:(?:(?:[\*\s]*|between|and|\/|or|until|to(?:\s*\/\s*from\s*)?|end\s(?:at)?|express|local|in\s*both\s*directions|train(s)?|station|after)*\s*(?:\[(?:(?:Qs|Mn|Bx|Bk|SI)[0-9]{1,5}\-[A-z0-9]{1,5}[|]?)+\])(?:(?:,\s*)?(?:Manhattan|Brooklyn|Queens|(?:The\s*)?Bronx)|\,?\s*the last stop|\,|\s*days(?:\s*(?:and|\/)\s*)?evenings|\*?)*\.?)*)*)*)+/;
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
 * Uniform way to replace a regex match string with a placeholder in message_mod.
 *
 * @TODO
 *   Refactor later.
 */
function replaceSimpleMessagePattern(message, replace_text, token) {

	if (!token) {
		token = '[-- route-match --]';
	}
	else {
		token = '[-- ' + token + ' --]';
	}

	// Removed the match from the picture, so we can move on in the next iteration.
	message = message.replace(replace_text,token);

	return message;
}


module.exports = {
  analyzeStationArray,
	getRouteChange,
  getMessageRouteChange,
};
