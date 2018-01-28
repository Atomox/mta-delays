'use strict';

const mtaApi = require('./svc/mta/subway/mta.api');
const mtaRegEx = require('./includes/regex');

// Date files.
const trainRoutes = require('./data/static/mta.stations.train');
const mta_stations_file_path = './data/generated/mta.stations.compiled';
const problem_stations = require('./data/static/mta.stations.suppliment').name_problems;

async function getStations(ids) {
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
function filterStations(data, ids) {
	if (data.stations) {	data = data.stations;	}

	if (data.length <= 0 || typeof data !== 'object') { return false; }

	let results = [];

	for (let i in ids) {
		if (Object.keys(data).indexOf(ids[i]) !== -1) {
			results.push(data[ids[i]]);
		}
	}

	return results;
}


async function getStationLines(boro, train, omitStations) {
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

async function getStationsByLine() {
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


function getTrainRoute(line) {
	if (!trainRoutes[line]) {	return Promise.reject(line + ' Line unavailable'); }

	return new Promise( (resolve, reject) => {
		getStations(trainRoutes[line])
		.then(data => Promise.resolve(filterStations(data, trainRoutes[line])) )
		.then(data => resolve(data))
		.catch(err => reject('Error fetching train route... ' + err) );
	});
}


async function getRouteStationsArray(line, include_stats) {
	try {
		let data = await getTrainRoute(line);
		let my_result = {};
		data.map( value => my_result[value.key] = (include_stats === true)
			? value
			: value.name );
		return my_result;
	}
	catch(err) {
		throw new Error(err);
	}
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
 *
 * @return [object]
 *   List of found stations, a list of found problems (including any passed in),
 *   and a parsed message with matches replaced with station tokens.
 */
async function matchRouteStationsMessage(line, message, processed_message, problems) {
	try {
		let line_id = line;
		line = getTrainById(line_id);

		// Get all stations for this line.
		let stations = await getRouteStationsArray(line, true);

		// Get problem stations we should replace first.
		let stations_first = problem_stations;

		let results = {};
		let result_message = (processed_message) ? processed_message : message;
		let problem_results = (problems) ? problems : {};

		// Search each station.
		for (let s in stations) {

			// Check station name regex against the message.
			let res_re = mtaRegEx.matchRegexString(stations[s].regex, message);

			// Problem stations get stored and compared after this process finishes. Until then, we don't count them as a final match.
			if (problem_stations[stations[s].common]) {
				if (res_re !== false) {

					// Init empty station common name in array.
					if (!problem_results[stations[s].common]) { problem_results[stations[s].common] = []; }

					// Push onto the problem list.
					problem_results[stations[s].common].push(
						{
							name: stations[s].name,
							found: res_re,
							sid: s,
							line: line_id
						}
					);
				}
			}
			else {
				// Check station ID against message.
				if (res_re !== false) {
					results[s] = res_re;
					// Str.split().join() will replace all occurances, unlike str.replace().
					result_message = result_message.split(res_re).join('[' + s +']');
				}
			}
		}

		return {
			processed_message: result_message,
			stations: results,
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
async function matchAllLinesRouteStationsMessage(lines, message, processed_message) {

	if (!processed_message) { processed_message = message; }

	let result = {
		stations: {},
		parsed_message: (processed_message) ? processed_message : message,
		problems: {},
	};
	let problems = {};
	let debugLines = lines.map(l => getTrainById(unwrapLineObject(l, false)));

//	console.log('\n', '1.', '[', debugLines.join(','), '] -- ', message);

	for (let l in lines) {
		try {
			let line = unwrapLineObject(lines[l], false);

			// Match normal stations, and collect matched problem stations.
			let rs = await matchRouteStationsMessage(line, message, result.parsed_message, problems);

			// Keep track of accumulating problem stations.
			// We won't process until all lines have completed.
			problems = rs.problems;
			result.parsed_message = rs.processed_message;

			// Get an stations related to this line.
			result.stations[line] = {stations: rs.stations};
		}
		catch (err) {
			console.warn('\n\n', '<!> Error while fetching stations in event msg: ', err, '\n\n');
			continue;
		}
	}

//	console.log('2.', '[', debugLines.join(','), ']',
//		result.stations, ' --- Problems: ', (problems) ? 'yes': 'no', '\n',
//		'Prob: ', problems);

	// Now, examine any problem stations, and include them in the results.
	return processProblemStations (problems, result.stations, result.parsed_message);
}


/**
 * Unwrap a train from any object syntax, if necessary.
 *
 * E.G. {line: 'MTA NYCT_6', dir: 0} becomes 'MTA NYCT_6'.
 */
function unwrapLineObject (line, translate_ids) {
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
function processProblemStations (problem_results, results, message) {

	if (Object.keys(problem_results).length > 0 ) {

//		console.log('\n >>> ', problem_results, '\n');

		Object.keys(problem_results).map( (key, i) => {

			let st_length = 0,
					st_obj = [];

			// Find the longest match, and choose that one.
			problem_results[key].map( ps => {

				if (ps.found.length >= st_length) {
					st_length = ps.found.length;
					if (!st_obj[st_length]) { st_obj[st_length] = []; }
					st_obj[st_length].push(ps);
				}
			});

			if (st_obj[st_length]) {

				st_obj[st_length].map(stObj => {
					// Make sure there is a place to put the result, if not already set.
					if (!results[stObj.line]) { results[stObj.line] = {stations: []}; }

					// Push the winner back into it's line's stations list.
					results[stObj.line].stations[stObj.sid] = stObj.found;

					// Add station tokens to the already parsed message.
					message = message.split(stObj.found).join('[' + stObj.sid +']');
				});
			}
		});

//		console.log('\nFinal: ', results, '\n', message, '\n\n');
	}

	return {
		stations: results,
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
async function getStationLinesRegex(lines) {
	let regexSpace = '\\s*';
	let stations = {};
						// (\s*( |between|and|until|to|end (at)?)*\s)
	let conjunctions = [' ', 'between', 'and', 'until', 'to(\s*\\/\s*from)?', 'end (at)?', '\\((QNS|BKLYN)\\)', 'express'];
	let stationregex = [];
	let boros = ['Qs', 'Mn', 'Bx', 'Bk', 'SI'];
	let station_id_regex = '(\\['
		+ mtaRegEx.convertArrayToRegexOr(boros)
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
				let m = await getTrainRoute(n);
				stations[n] = m.map( (item, key) => item.regex);

				// Assemble line
				stationregex.push(
					mtaRegEx.convertArrayToRegexOr(stations[n]));
			}
			catch (err) {
				console.warn('[', n, '] line info unavailable.','--', err);
				continue;
			}
		}
	}

	let results = mtaRegEx.convertArrayToRegexOr(stationregex);
	conjunctions = mtaRegEx.convertArrayToRegexOr(conjunctions) + '*';
	return '(' + regexSpace + conjunctions + regexSpace + results + '+)';
}


function groupStationsByLocation(line, stations) {

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



function getTrainById (id) {

	// Allow both raw line {line, direction}
	// -or- string formats.
	id = (id && id.line) ? id.line : id;


	switch (id) {
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
			return 'SIR';

		default:
			return id;
	}
}


module.exports = {
	getStations,
	getStationLines,
	getStationsByLine,
	getTrainRoute,
	getTrainById,
	getRouteStationsArray,
	matchAllLinesRouteStationsMessage,
	matchRouteStationsMessage,
	groupStationsByLocation,
	getStationLinesRegex,
};

// Branch

// Get Station
// 	- Get location of interruption
// 	- Get borough of interruption
// 	- Determine if station is in normal line
// 	- Determine next station
// 		- If going Express
// 		- If going local
// 	- Determine switch points
