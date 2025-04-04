'use strict';
import { 
	getObjPath as get, 
	unionArrays as union, 
	uniqArray as uniq, 
	firstArray as first,
	dropArray as drop 
}  from '../utils/arrays.js';
import { orderBy } from 'lodash-es';
import mtaApi from '../svc/mta/subway/mta.api.js';
import { matchRegexString, matchRegexStation, replaceRegexString, convertArrayToRegexOr } from '../utils/regex.js';

// Data files.
import { routes as trainRoutes } from '../../data/static/mta.stations.train.js';
import { alternate_routes as trainRoutesAlternate } from '../../data/static/mta.stations.train.js';
import { local_routes as trainRoutesLocal } from '../../data/static/mta.stations.train.js';
import { express_routes as trainRoutesExpress } from '../../data/static/mta.stations.train.js';
import { night_routes as trainRoutesNight } from '../../data/static/mta.stations.train.js';
import { weekend_routes as trainRoutesWeekend } from '../../data/static/mta.stations.train.js';
import { name_problems as problem_stations } from '../../data/static/mta.stations.suppliment.js';
import stationSuppliment from '../../data/static/mta.stations.suppliment.js';
const mta_stations_file_path = './data/generated/mta.stations.compiled';

export async function getStations(ids) {
	try {
		let data = await mtaApi.getSubwayStations(mta_stations_file_path);
		if (!data || data.length <= 0) {
			throw new Error('No data loaded from file or endpoint.');
		}

		return data.stations;
	}
	catch(err) {
		throw new Error('Error fetching Stations File: ', err, 'file:', mta_stations_file_path);
	}
}

/**
 * Filter a list of stations by passed station IDs, preserving order of the passed IDs.
 *
 * @param  {object} data
 *   Response from getStations() (complete list of stations)
 * @param  {array} ids
 *   IDs, possibly with a secific order.
 *
 * @return {array(objects)}
 *   All station data, in order, from the passed array, if found.
 */
export function filterStations(data, ids) {
	if (data.stations) {	data = data.stations;	}

	if (data.length <= 0 || typeof data !== 'object') { return false; }
	let results = [];

	for (let i in ids) {

		/**
		 * 
		 * 
		 * @todo
		 *
		 * ALERT!
		 * 
		 *    This was not a nested loop before the refactor and Node 22 upgrade!
		 * 
		 *    This innner loop might be correcting for symptoms upstream of passing in a nested station array.
		 * 
		 * 
		 */
		if (Array.isArray(ids[i])) {
			for (let j in ids[i]) {
				if (Object.keys(data).indexOf(ids[i][j]) !== -1) {
					results.push(data[ids[i][j]]);
				}
			}
		} else if (Object.keys(data).indexOf(ids[i]) !== -1) {
			results.push(data[ids[i]]);
		}
		else {
			// console.log(" <!> ---- <filterStations> Problem getting results...");
		}
	}

	return results;
}


export async function getStationLines(boro, train, omitStations) {
	try {
		let data = await mtaApi.getSubwayStations(mta_stations_file_path);

		if (!data || data.length <= 0) {
			throw new Error('No data loaded from file or endpoint.');
		}

		let lines = [];

		for (let s in data.by_line) {
			if (boro && !data.by_line[s].boro[boro]) { continue; }
			if (train && !data.by_line[s].trains[train]) { continue; }

			if (omitStations) {
				delete data.by_line[s].stations;
			}
			else if (train){
				for (let t in data.by_line[s].stations) {
					if (data.by_line[s].stations[t].trains.indexOf(train) === -1) {
						delete data.by_line[s].stations[t];
					}
				}
			}
			lines.push(data.by_line[s]);
		}

		return lines;
	}
	catch(err) {
		return err;
	}
}

export async function getStationsByLine() {
	try {
		let data = await mtaApi.getSubwayStations(mta_stations_file_path);

		if (!data || data.length <= 0) {
			throw new Error('No data loaded from file or endpoint.');
		}

		return data.by_line;
	}
	catch(err) {
		throw new Error('Error geting stations by line: ' + err);
	}
}


export function getTrainRoute(line, include_all_times, tags) {
	if (!trainRoutes[line]) {	return Promise.reject(line + ' Line unavailable'); }

	let routeList = {
		day: get(trainRoutes, line, []),
		night: get(trainRoutesNight, line + '-LN', []),
		weekend: get(trainRoutesWeekend, line + '-WKND', []),
		alternate: get(trainRoutesAlternate, line, []),
		express: get(trainRoutesExpress, line + '-EXP', []),
		local: get(trainRoutesLocal, line + '-LCL', []),
	};

	return new Promise( (resolve, reject) => {
		getStations()
		.then(data => {
			let results = {};
			Object.keys(routeList).map( key => {
				results[key] = (Object.keys(routeList[key]).length > 0)
					? filterStations(data, routeList[key])
					: [];
			});
			return results;
		})
		.then(data => resolve(data))
		.catch(err => reject('Error fetching train route... ' + err) );
	});
}


export function getTrainRouteBasic(line) {
	return getTrainRoute(line)
		.then(data => union(data['day'], data['alternate']));
}


/**
 * Get and assemble a train route of stations, optionally modified
 * depending upon passed tags, such as running_local or late_night.
 *
 * @param  {string} line
 *   The line in question.
 * @param  {boolean} include_stats
 *   Include the entire station object, or just key => name.
 * @param  {boolean} include_late_night
 *   (@DEPRICATED) Include late night stations?
 * @param  {array} tags
 *   (optional) a list of tags applying to this line,
 *   which can determine how the line is assembled.
 *
 * @return {object}
 *   A list of stations associated with this line,
 *   dependant upon the passed params.
 */
export async function getRouteStationsArray(line, include_stats, include_late_night, tags) {
	try {
		if (!tags || typeof tags !== 'object') {
			tags = [];
		}

		let routes = await getTrainRoute(line, true, tags);

		// If all lines are to be included,
		// then merge in any found alternate time routes for this line.
		// Include alternate route (MTAD-030), trains run past normal line.
		let data = union(routes['day'], routes['alternate']);

		let my_data_log = [];
		data.map(e => {
			my_data_log.push({
				key: e.key,
				name: e.name
			});
		});

		if (include_late_night === true || tags.indexOf('late_night') !== -1) {
			data = union(data, routes['night']);
		}

		if (tags.indexOf('weekend') !== -1) {
			data = union(data, routes['weekend']);
		}

		if (tags.indexOf('running_local') !== -1) {
			data = union(data, routes['local']);
		}

		if (tags.indexOf('running_express') !== -1) {
			data = union(data, routes['express']);
		}

		let my_result = {};
		data.map( value => my_result[value.key] = (include_stats === true)
			? value
			: value.name );

		return my_result;
	}
	catch(err) {
		throw new Error('Error getRouteStationsArray: ' + err);
	}
}


/**
 * Look for a list of stations with the same street type, like Sts, Avs,
 * and break them up into individual names.
 *
 * E.G. "125, 116, 110 Sts" becomes "125 St, 116 St, 110 St"
 *
 * @param  {String} txt
 *
 * @return {String}
 *   The passed string, with any patterns of streets normalized.
 */
export function prepareBunchedStationNames(txt) {
	if (!txt || typeof txt !== 'string'
	|| (txt.indexOf('Sts') === -1 && txt.indexOf('Avs') === -1)) {
		return txt;
	}

	let bunch_pattern = /(?:(?:(?:\b[A-Z0-9\-]+\b\s*){1,2})(?:,|\band\b|\bor\b)\s*)+(?:(?:\b[A-Z0-9\-]*\b\s*){1,2})\s*(Sts|Avs)/i,
		conjunction_pattern = /\,?\s*\b(?:and|or)\b\s*/i,
		replace_holder = txt;

	for (let i = 0; i < 6; i++) {

		let matches = matchRegexString(bunch_pattern, replace_holder, true),
			original_match = matches[0],
			target = (matches[1]) ? matches[1] : null,
			found_conjunction = false;

		if (!target) {
			break;
		}

		let results = [];

		matches = matches[0];

		// Remove any conjunctions, and treat like a comma.
		if (matches.search(conjunction_pattern) !== -1) {
			found_conjunction = true;
			matches = matches.replace(conjunction_pattern, ', ');
		}

//		console.log('\n >> ', original_match);
//		console.log('\n >> ', matches, '\n');

		let previous_word = '',
			match_split = matches.split(','),
			road_abbreviations = stationSuppliment.road_abbreviations,
			sts_exceptions = stationSuppliment.hyphen_station_sts,
			avs_exceptions = stationSuppliment.hyphen_station_avs,
			order,
			first_match = false,
			found_match = false;

		function getLastWord(txt) {
			txt = txt.trim().split(' ');
			let result = txt.pop();
			if (result !== undefined) {
				result = result.toLowerCase();
			}
			return result;
		}

		// Determine if we have multiple street types, and which order the appear in.
		order = match_split
			.map( s => getLastWord(s) )
			.filter( s => (['avs', 'sts'].indexOf(s) !== -1) ? true : false );

//		console.log('\n\n >> << >> Target Order: ', order, '\n\n');

		results = match_split.map( (s, i) => {
			s = s.trim();

			// Problematic sample.
			// Park East , Pelham Pkwy , Allerton , Burke Avs , 219 , 225 , 233 Sts

			let lastWord = getLastWord(s);

//			console.log('>> ', s, 'Last Word:', lastWord);

			// If we haven't hit a match yet, check the next element.
			// If it doesn't qualify, then this won't either. Return as-is.
			if (!first_match && match_split[i+1]) {
				let next = getLastWord(match_split[i+1]);

				if ((road_abbreviations.indexOf(next) !== -1 )
				|| (sts_exceptions.indexOf(next) !== -1 )
				|| (avs_exceptions.indexOf(next) !== -1 ) ) {

//					console.log('>> Next: ', next, 'does not qualify, so neither do we.');
					return s;
				}
			}

			// If we snipped a piece of another station at the beginning,
			// include it, but do not change it.
			if (!s) {
//				console.log('\n <!> "' + s + '" is empty. Skipping.');
			}
			else if (road_abbreviations.indexOf(lastWord.toLowerCase()) !== -1 ) {
				return s;
			}
			// Sts in normal name.
			else if (sts_exceptions.indexOf(s.toLowerCase()) !== -1 ) {
				return s + ' ' + 'Sts';
			}
			// Avs in normal name
			else if (avs_exceptions.indexOf(s.toLowerCase()) !== -1 ) {
				return s + ' ' + 'Avs';
			}
			else {
				if (!first_match) {
					// Get our next match.
					if (order && order.length > 0 && first(order)) {
//						console.log(' >> <!> New Target: ', first(order), 'old: ', target);
						target = first(order);
						order = drop(order, 1);
					}
				}
				// Flag that we've found a match.
				first_match = true;

				// Flag at least one match in message.
				found_match = true;

				if (typeof target === "string") {
					if (target.toLowerCase() === 'sts') { s = s + ' ' + 'St'; }
					if (target.toLowerCase() === 'avs') { s = s + ' ' + 'Av'; }
				}

				if (s.toLowerCase().indexOf(target) !== -1) {
//					console.log(' >> <!> Reached Target:', target, 'in:', s);
					let re = new RegExp('\\s*' + target + '\\s*','i');
					s = s.replace(re, ' ');
					first_match = false;

					// Set the next target, if any.
				}
				return s;
			}
		});

//		console.log('>> List After: ', results);

		// Filter empty items.
		results = results.filter(val => (!val) ? false : true );

		results = results.join(', ');

//		console.log('>> Final: ', results);

		if (found_match) {
			txt = txt.replace(original_match, results);
			replace_holder = replace_holder.replace(original_match, '[--match-' + i + '--]');
		}
	}

	return txt;
}


/**
 * Match a single line's stations against the text of an event message.
 *
 * @param [string] line
 *   The ID of a single line. Should be in the form: MTA NYCT_4.
 * @param [string] message
 *   The haystack where we'll search for our stations.
 * @param [string] processed_message
 *   The alternate (preferred) haystack, already partially processed.
 * @param [object][array] problems
 *   Our result set of problem stations. We accumulate problem matches
 *   over subsiquent calls for all lines before finalizing them,
 *   so we may make the correct match. These are any previous results,
 *   which we can append to. They generate here,
 *   but are not finalized in this function.
 * @tags [array] tags
 *   Any tags related to this message. When certain tags are present, we may
 *   parse messages differently. For example, running_local will trigger local
 *   stations to be checked for express lines.
 *
 * @return [object]
 *   List of found stations, a list of found problems (including any passed in),
 *   and a parsed message with matches replaced with station tokens.
 */
export async function matchRouteStationsMessage(line, message, processed_message, problems, tags) {
	try {
		let line_id = line;
		line = getTrainById(line_id);

		let testForA = (line === 'Q'); //  && [].indexOf(stations[s].cid) !== -1);
		let testFor7 = false; // ([7, '7D'].indexOf(line) !== -1 && stations[s].cid === 471);

		// Get all stations for this line.
		let stations = await getRouteStationsArray(line, true, true, tags);

		// Get problem stations we should replace first.
		let stations_first = problem_stations;

		let results = {};
		let bound = {};
		let result_message = (processed_message) ? processed_message : message;
		let problem_results = (problems) ? problems : {};

		// Search each station.
		for (let s in stations) {

			// Check station name regex against the message.
			// let res_re = matchRegexString(stations[s].regex, message, true, true);


//			if (testForA || testFor7) {
//				console.log(' --> ', stations[s]);
//			}

//			if (testForA && stations[s].cid == 617) {
//				console.log('\n\n\n', ' . . . --> (Regex) ', stations[s].regex, '\n\n\n');
//			}

			let res_re = matchRegexStation(stations[s].regex, message, true, true, true);

			// If there were no results, move on.
			if (res_re === false ) {
//				if (testForA || testFor7) {
//					console.log(' . . . --> ', line, '<!> No Match, ', stations[s].name, '(', stations[s].cid, ')');
//				}
				continue; }

//			if (testForA || testFor7) {
//				console.log(' . . . --> ', line, '', res_re);
//			}

			// Order the matches with the longest matches first.
			// If we match 36 st, Brooklyn, and 36 St, we should replace Brooklyn first,
			// or we might replace part of the match, and have artifacts remaning,
			// causing mis-parsing.
			res_re = res_re.map( m => {
				m.length = m.station.length;
				return m;
			});
			res_re = orderBy(res_re, 'length', 'desc');

			res_re.map( m => {

//				if (testForA || testFor7) {
//					console.log(' . . . --> ', line, '', m);
//				}

				let name = (typeof m === 'object') ? m.station : m;

				// Problem stations get stored and compared after this process finishes. Until then, we don't count them as a final match.
				if (problem_stations[stations[s].common]) {
					// Init empty station common name in array.
					if (!problem_results[stations[s].common]) {
						problem_results[stations[s].common] = [];
					}

					// Push onto the problem list.
					problem_results[stations[s].common].push(
						{
							name: stations[s].name,
							found: name,
							sid: s,
							sid_boro: stations[s].boro,
							line: line_id,
							bound: (typeof m === 'object' && m.bound) ? true : false,
							boro: (m.boro && m.boro === stations[s].boro) ? m.boro : undefined
						}
					);
				}
				else {
					// Check station ID against message.
					// Only include station if this was not a direction
					// !(Euclid Av-bound trains...)
					(typeof m === 'object' && m.bound)
						? bound[s] = name
						: results[s] = name;

//					if (testForA && stations[s].cid == 617) {
//						console.log(' . . . --> (BEFORE) ', result_message);
//					}

					result_message = replaceRegexString(stations[s].regex, name, result_message, s);

//					if (testForA && stations[s].cid == 617) {
//						console.log(' . . . --> (AFTER) ', result_message, '\n\n');
//					}
				}
			});
		}

//		if (testForA || testFor7) {
//			console.log('\n\n <FINAL> ', result_message, '\n\n\n');
//		}

		return {
			processed_message: result_message,
			stations: results,
			bound: bound,
			problems: problem_results,
		};
	}
	catch(err) {
		throw new Error('Error parsing message for stations: ' + err);
		return results;
	}
}


/**
 * Find all stations in the passed message, in context of passed lines.
 *
 * @param [array] lines
 *   Stations from these lines will be included within the station search.
 * @param [string] message
 *   The haystack string where we'll search for these lines' stations.
 *   We'll also replace each result with a station token within the message,
 *   and include this in our results.
 * @param [string] processed_message
 *   An existing message with placeholders/processing already done.
 *   We'll default to this haystack, if present. Otherwise, we'll make our own,
 *   using [message] as a starter.
 *
 * @return object
 *   A list of stations, keyed by line, that we found. Also, a parsed message
 *   with station tolkens replacing the names of any we could find.
 */
export async function matchAllLinesRouteStationsMessage(lines, message, processed_message, tags) {

	if (!tags) {
		tags = [];
	}

	// Do any prep to unravel bunched station/street names,
	// like '42, 33, 23, and 14 Sts'.
	message = prepareBunchedStationNames(message);

	if (!processed_message) { processed_message = message; }

	let result = {
		stations: {},
		bound: {},
		parsed_message: (processed_message) ? processed_message : message,
		problems: {},
	};
	let problems = {};
	let debugLines = lines.map(l => getTrainById(unwrapLineObject(l, false)));

	/**
	 * @TODO
	 *    Check for "run_local". If present, get lines associated with
	 *    this line's local counterpart.
	 *
	 * 		A -> C
	 * 		C -> n/a
	 * 		E -> R, F
	 * 		B -> Q
	 * 		D -> B, R
	 * 		F -> R
	 * 		M -> n/a
	 * 		N -> R
	 * 		Q -> N
	 * 		R -> n/a
	 * 		W -> n/a
	 * 		L -> n/a
	 * 		G -> n/a
	 * 		S -> n/a
	 * 		FS -> n/a
	 * 		HS -> n/a
	 * 		1 -> n/a
	 * 		2 -> 1
	 * 		3 -> 1
	 * 		4 -> 6, 3
	 * 		5 -> 2, 6
	 */

	for (let l in lines) {
		try {
			let line = unwrapLineObject(lines[l], false);

			// Lines may have multiple directions, but only 1 pass is needed.
			if (result.stations[line]) { continue; }

			// Match normal stations, and collect matched problem stations.
			let rs = await matchRouteStationsMessage(line, message, result.parsed_message, problems, tags);

			// Keep track of accumulating problem stations.
			// We won't process until all lines have completed.
			problems = rs.problems;
			result.parsed_message = rs.processed_message;

			// Get an stations related to this line.
			result.stations[line] = {stations: rs.stations};
			result.bound[line] = {stations: rs.bound};

		}
		catch (err) {
			console.warn('\n\n', '<!> Error while fetching stations in event msg: ', err, '\n\n');
			continue;
		}
	}

	// Now, examine any problem stations, and include them in the results.
	return processProblemStations (problems, result.stations, result.parsed_message, result.bound);
}


/**
 * Unwrap a train from any object syntax, if necessary.
 *
 * E.G. {line: 'MTA NYCT_6', dir: 0} becomes 'MTA NYCT_6'.
 */
export function unwrapLineObject (line, translate_ids) {

	line = (line.line) ? line.line : line;
	if (line.indexOf('MTA NYCT' !== -1) && translate_ids == true) {
		line = getTrainById(line);
	}
	return line;
}


/**
 * Given a list of matched stations known to cause problems,
 * evaluate the matched stations, and determine the most complete match.
 *
 * @param [object][arrays] problem_results
 *   A list of problem stations, keyed by common name.
 *   Each entry has a regex match, name, station ID and line ID.
 * @param [object] results
 *   Results of a prior station message parse. This should be the
 *   complete set of stations, keyed by [line].stations => []. Winning problem
 *   stations will be appended to the winning line's list of stations.
 * @param [string] message
 *   Our haystack, the message, where we should replace any matches
 *   with a station token, and return alongside the results.
 *
 * @return [object]
 *   All resulting winning stations (including passed in non-problem results),
 *   along with the parsed messages.
 */
export function processProblemStations (problem_results, results, message, bound) {

	if (Object.keys(problem_results).length > 0 ) {

	//	console.log(
	//		'\n\n ~~~~~~~~~~~~~~~~~~~~~~~~~~~',
	//		'\n', problem_results, '\n',
	//		'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n\n');

		Object.keys(problem_results).map( (key, i) => {

			let st_length = 0,
					st_obj = [],
					st_lines = {},
					boro = undefined;

			// Find the longest match, and choose that one.
			problem_results[key].map( ps => {

				// Sort matches by length, and add a list of train lines.
				if (ps.found.length > 2) {

					if (ps.boro) {
						boro = ps.boro;
					}

					st_length = ps.found.length;
					if (!st_obj[st_length]) { st_obj[st_length] = []; }
					st_lines[ps.line] = ps;
					st_obj[st_length].push(ps);
				}
			});

			if (st_obj.length > 0) {
				let lines_found = {};

//				console.log('>>>', st_obj);

				// Loop through in reverse order.
				Object.keys(st_obj).reverse().map( i => {

					// Could be empty elements.
					if (!Array.isArray(st_obj[i]) || st_obj[i].length <= 0) {
						console.log(i, ' <!> COULD BE EMPTY.');
						return; }


					let isTargetMatch = ['34 St - Penn Station', '34 St - Herald Sq'].indexOf(st_obj[i][0].name) !== -1;

					if (isTargetMatch){
//						console.log('~~~ ', '[' + i + ']', st_obj[i]);
					}


					let length_found_stations = [],
						length_token_found = '';

					// Check the next longest results for matches.
					st_obj[i].map( (stObj, j) => {
						/**
						 * @TODO -- If a single line matches MULTIPLE station names, we shouldn't bail early!
						 *
						 * PROBLEM:
						 * 'No [R] trains between Bay Ridge-95 St and 36 St, Brooklyn, due to track maintenance.
						 * Take free shuttle buses and the [N]. [R] service operates between 71 Av and 36 St,
						 * and via the [D] to/from 9 Av, the last stop.',
						 */
						// Only allow one station per line, but allow multiple variations of that line.
						if (lines_found[stObj.line]
							&& lines_found[stObj.line].sid !== stObj.sid) {
								return;
						}

						// If a boro was associated with this station, make sure that only
						// found stations (for this common name) from that boro are included.
						// Make sure that we allow stations without a found Boro in the name
						// to be included, if their station's boro is still the found boro.
						//
						// E.G. if we find '36 St, Brooklyn', allow other 36 St (Bk32-R36 IDs)
						// to be replaced elsewhere in the message. In the below message,
						// both should be matched, now that we have a context for 36 St.
						//
						// E.G. [R] trains reroutes at 36 St, Brooklyn. [R] trains run from
						// 71st Av to 36 St, then via the D to Coney Island.
						if (boro && stObj.boro !== boro && stObj.sid_boro !== boro) {
							return;
						}

						// Make sure there is a place to put the result, if not already set.
						if (!results[stObj.line]) { results[stObj.line] = {stations: []}; }

						// Push the winner back into it's line's stations (or bound) list.
						(stObj.bound)
							? bound[stObj.line].stations[stObj.sid] = stObj.found
							:	results[stObj.line].stations[stObj.sid] = stObj.found;

						// Store these until after we parse all of the same length.
						length_found_stations.push(stObj.sid);

						/**
						 * @TODO -- What happens if this doesn't match the previous.
						 *
						 * Is that possible?
						 */
						length_token_found = stObj.found;
						if (isTargetMatch) {
//							console.log('(' + i + ') ...', length_token_found);
						}

						// Mark this line as found.
						lines_found[stObj.line] = stObj;
					});

					if (length_found_stations.length > 0) {
						// Did we have one or more results?
						// Assemble a token to replace the found station.
						let length_token = '[' + uniq(length_found_stations).join('|') + ']';

//						if (isTargetMatch) {
//							console.log('(' + i + ') Replace...', length_token_found, ' ... with', length_token);
//						}

						// Add station tokens to the already parsed message.
						message = message.split(length_token_found).join(length_token);

//						if (isTargetMatch) {
//							console.log('(' + i + ') Replace...', length_token_found, ' ... with', length_token, '\n\n', message);
//						}
					}

				});
			}
		});
	}

	function filterObj(Obj) {
		return Object.keys(Obj)
			.filter(s => (Object.keys(Obj[s].stations).length > 0))
			.reduce((res, key) => (res[key] = Obj[key], res), {});
	}

	// Filter out any lines without stations.
	results = filterObj(results);
	bound = filterObj(bound);

	return {
		stations: results,
		bound: bound,
		parsed_message: message,
	}
}


/**
 * Get regex for matching station tokens and suppliment structure.
 *
 * This is for use with the route_change regex.
 *
 * @params [array] lines
 *   If passed, we'll include all station ID regex in our results.
 *
 * @return [regex]
 *   A regex with station token matching, (optional) station names,
 *   and some supplimentary search regex to go along with station tokens.
 */
export async function getStationLinesRegex(lines) {
	let regexSpace = '\\s*';
	let stations = {};
						// (\s*( |between|and|until|to|end (at)?)*\s)
	let conjunctions = [' ', 'between', 'and', 'until', 'to(\s*\\/\s*from)?', 'end (at)?', '\\((QNS|BKLYN)\\)', 'express'];
	let stationregex = [];
	let boros = ['Qs', 'Mn', 'Bx', 'Bk', 'SI'];
	let station_id_regex = '(\\['
		+ convertArrayToRegexOr(boros)
		+ '[0-9]{1,5}\\-[A-z0-9]{1,5}\\])(?:\\,?\\sthe\\slast\\sstop)?\\.?';

	// (?:(?:(?:\s|between|and|until|to(?:\s*\/from\s*)?|end\s(?:at)?|express)*\s*(?:\[(?:Qs|Mn|Bx|Bk|SI)[0-9]{1,5}\-[A-z0-9]{1,5}\])(?:\,?\sthe last stop)?\.?)*)*

	// Assemble line
	stationregex.push(station_id_regex);

	// @TODO -- Only used by mocha, so we should kill this.
	// @DEPRICATED
	if (lines) {
		for (let l in lines) {
			// Convert ID to line letter/number
			let n = getTrainById(lines[l]);

			try {
				let m = await getTrainRouteBasic(n);
				stations[n] = m.map( (item, key) => item.regex);

				// Assemble line
				stationregex.push(
					convertArrayToRegexOr(stations[n]));
			}
			catch (err) {
				console.warn('[', n, '] line info unavailable.','--', err);
				continue;
			}
		}
	}

	let results = convertArrayToRegexOr(stationregex);
	conjunctions = convertArrayToRegexOr(conjunctions) + '*';
	return '(' + regexSpace + conjunctions + regexSpace + results + '+)';
}


export function groupStationsByLocation(line, stations) {

	let results = [];

	for (let i in stations) {

		results.push({
			key: i,
			line_distance: Object.keys(line).indexOf(i),
			name: line[i],
			boro: i.substr(0,2),
		});

		/**
		 *
		 * Get distance to line[i]
		 *
		 *   - Distance
		 *   - Boro
		 *   - Distance from other stations
		 *
		 */
	};


	return results;
}


export function getBorosFromStationsArray(stations) {
	return (Array.isArray(stations))
		? uniq(stations.map(s => (s) ? s.substring(0,2) : null))
		: uniq(Object.keys(stations).map((j) => (j) ? j.substring(0,2): null ));
}


/**
 * Given a stations array, determine the affected boros for each line, and for the entire set.
 */
export function getBorosFromStations (stations) {

	try {
		if (!stations) {
			throw new Error('No stations passed.');
		}
		let lines = {
			global: []
		};
		Object.keys(stations).map( (i) => {
			if (stations[i].stations) {

				lines[i] = getBorosFromStationsArray(stations[i].stations);
				lines['global'] = union(lines['global'],lines[i]);
			}
		});

		return lines;
	}
	catch (err) {
		console.log('Error finding Station Boros: ', err);
	}

	return false;
}



export function getTrainById (id) {

	// Allow both raw line {line, direction}
	// -or- string formats.
	id = (id && id.line) ? id.line : id;


	switch (id) {
		case 'MTA NYCT_6D':
			return '6D';
		case 'MTA NYCT_6':
			return 6;
		case 'MTA NYCT_5':
			return 5;
		case 'MTA NYCT_4':
			return 4;

		case 'MTA NYCT_1':
			return 1;
		case 'MTA NYCT_2':
			return 2;
		case 'MTA NYCT_3':
			return 3;

		case 'MTA NYCT_7D':
			return '7D';
		case 'MTA NYCT_7':
			return 7;

		case 'MTA NYCT_A':
			return 'A';
		case 'MTA NYCT_C':
			return 'C';
		case 'MTA NYCT_E':
			return 'E';

		case 'MTA NYCT_N':
			return 'N';
		case 'MTA NYCT_Q':
			return 'Q';
		case 'MTA NYCT_R':
			return 'R';
		case 'MTA NYCT_W':
			return 'W';


		case 'MTA NYCT_B':
			return 'B';
		case 'MTA NYCT_D':
			return 'D';
		case 'MTA NYCT_F':
			return 'F';
		case 'MTA NYCT_M':
			return 'M';

		case 'MTA NYCT_G':
			return 'G';
		case 'MTA NYCT_L':
			return 'L';

		case 'MTA NYCT_J':
			return 'J';
		case 'MTA NYCT_Z':
			return 'Z';

		case 'MTA NYCT_S':
		case 'MTA NYCT_H':
		case 'MTA NYCT_FS':
		case 'MTA NYCT_GS':
			return 'S';

		case 'MTA NYCT_SI':
		case 'MTA NYCT_SIR':
			return 'SIR';

		default:
			return id;
	}
}

// Branch

// Get Station
// 	- Get location of interruption
// 	- Get borough of interruption
// 	- Determine if station is in normal line
// 	- Determine next station
// 		- If going Express
// 		- If going local
// 	- Determine switch points
