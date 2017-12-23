const mtaApi = require('./mta.api');
const trainRoutes = require('./data/mta.stations.train');

const mta_stations_file = './data/mta.stations.final';


async function getStations(ids) {
	try {
		let data = await mtaApi.getSubwayStations(mta_stations_file);
		
		if (!data || data.length <= 0) {
			throw new Error('No data loaded from file or endpoint.');
		}

		return data.stations;
	}
	catch(err) {
		return err;
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
		let data = await mtaApi.getSubwayStations(mta_stations_file);

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
		let data = await mtaApi.getSubwayStations(mta_stations_file);

		if (!data || data.length <= 0) {
			throw new Error('No data loaded from file or endpoint.');
		}

		return data.by_line;
	}
	catch(err) {
		return err;
	}
}


function getTrainRoute(line) {
	if (!trainRoutes[line]) {	return Promise.reject(line + ' Line unavailable'); }

	return new Promise( (resolve, reject) => {
		getStations(trainRoutes[line])
		.then(data => Promise.resolve(filterStations(data, trainRoutes[line])) )
		.then(data => resolve(data))
		.catch(err => reject('Error fetching train route... ' + err));
	});
}


async function getRouteStationsArray(line) {
	try {
		let data = await getTrainRoute(line);
		let my_result = {};
		data.map( (value, i) => my_result[value.boro + value.cid] = value.name);		
		return my_result;
	}
	catch(err) {
		throw new Error(err);
	}
}


function regexReplaceSpace(word) {
	return word.replace(/(\s)+/gi, (match, offset, string) => {
  	return '(\\s)*';
  });	
}

function regexWrapNumberBounds(word) {
  return word.replace(/\s*[0-9]+\s*/gi, (match, offset, string) => {
  	return '\\s*\\b' + match.trim() + '\\b\\s*';
  });
}

function regexWrapSeperatorBounds(word) {
  return word.replace(/(\s)*[-/]+(\s)*/gi, (match, offset, string) => {
  	return '\\s*' + '[-/]{0,2}' + '\\s*';
  });
}

function regexMatchStringsWithSpecialChars(needle, haystack) {
	let v = needle;

	// Detect numbers.	
	v = regexWrapNumberBounds(needle);

	// Wrap Separators.
	v = regexWrapSeperatorBounds(v);

	v = regexReplaceSpace(v);

	let re = new RegExp(v,"gi");
	let result = haystack.match(re);

//	console.log('Match:', v, ' ~~~ ', haystack, ' . . . ', result);

	return (result !== null && result[0]) 
		? needle
		: false;
}


async function matchRouteStationsMessage(line, message) {
	try { 
		line = getTrainById(line);

		let stations = await getRouteStationsArray(line)
		let results = {};

		for (let s in stations) {
			let res = regexMatchStringsWithSpecialChars(stations[s], message);
			if (res !== false) {	results[s] = res;	}
		}

		return results;
	}
	catch(err) {
		throw new Error('Error parsing message for stations: ' + err);
	}
}



function getTrainById (id) {
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

		case 'MTA NYCT_H':
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
	getRouteStationsArray,
	matchRouteStationsMessage,
	regexMatchStringsWithSpecialChars,
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


