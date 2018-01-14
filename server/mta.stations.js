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


async function matchRouteStationsMessage(line, message, processed_message) {
	try {

		line = getTrainById(line);

		let stations = await getRouteStationsArray(line, true);

		// Get problem stations we should replace first.
		let stations_first = problem_stations;

		let results = {};
		let result_message = (processed_message) ? processed_message : message;

		// Dump problem stations here.  We'll determine the best match after the loop.
		let problem_st_lengths = {};

		// Search each station.
		for (let s in stations) {

			// Check station name regex against the message.
			let res_re = mtaRegEx.matchRegexString(stations[s].regex, message);

			// Problem stations get stored and compared after this process finishes. Until then, we don't count them as a final match.
			if (problem_stations[stations[s].name]) {
				if (res_re !== false) {
					if (!problem_st_lengths[stations[s].name]) {
						problem_st_lengths[stations[s].name] = [];
					}

					problem_st_lengths[stations[s].name].push(
						{
							name: stations[s].name,
							found: res_re,
							sid: s,
						}
					);
				}
			}
			else {
				// Check station ID against message.
				if (res_re !== false) {
					results[s] = res_re;
					result_message = result_message.replace(res_re, (match) => '[' + s +']' );
				}
			}
		}

		if (Object.keys(problem_st_lengths).length > 0 ) {

			Object.keys(problem_st_lengths).map( (key, i) => {

				let st_length = 0;
				let st_obj = null;

				// Find the longest match, and choose that one.
				problem_st_lengths[key].map( ps => {

					if (ps.found.length > st_length) {
//						console.log(' . . matched', ps.found, ' [', ps.sid, ']');
						st_length = ps.found.length;
						st_obj = ps;
					}
					else {
//						console.log(' . . [no] mas', ps.found, ' [', ps.sid, ']');
					}
					/**
					 * @TODO
					 *   If the length is ==, include multiple.
					 *
					 *
					 *
					 *
					 *
					 */
				});

				if (st_obj !== null) {
					results[st_obj.sid] = st_obj.found;
					result_message = result_message.replace(st_obj.found, (match) => '[' + st_obj.sid +']' );

//					console.log('\n <!> ~~~~~~~~ PROBLEM REPORT: \'', key, '\'on ', line, 'line Matched:', st_obj, '\n', 'in: ', message);


				}
			});
		}

		let analysis = groupStationsByLocation(stations, results);

		return {
			processed_message: result_message,
			stations: results,
			analysis: analysis,
		};
	}
	catch(err) {
		throw new Error('Error parsing message for stations: ' + err);
		return results;
	}
}


async function getStationLinesRegex(lines, station_id_regex_only) {
	let regexSpace = '\\s*';
	let stations = {};
						// (\s*( |between|and|until|to|end (at)?)*\s)
	let conjunctions = [' ', 'between', 'and', 'until', 'to(\s*\\/\s*from)?', 'end (at)?', '\\((QNS|BKLYN)\\)', 'express'];
	let stationregex = [];
	let boros = ['Qs', 'Mn', 'Bx', 'Bk', 'SI'];
	let station_id_regex = '(\\['
		+ mtaRegEx.convertArrayToRegexOr(boros)
		+ '[0-9]{1,5}\\-[A-z0-9]{1,5}\\])';

	// (?:(?:(?:\s|between|and|until|to(\s*\/from\s*)?|end\s(?:at)?|express)*\s*(?:\[(?:Qs|Mn|Bx|Bk|SI)[0-9]{1,5}\-[A-z0-9]{1,5}\]))*)*

	//	/(?:(?:\s|between|and|until|to|end\s(?:at)?)*\s*(?:\[(?:Qs|Mn|Bx|Bk|SI)[0-9]{1,5}\-[A-z0-9]{1,5}\]))*)*/

	// Assemble line
	stationregex.push(station_id_regex);

	if (station_id_regex_only !== true) {
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
