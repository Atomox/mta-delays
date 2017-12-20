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


module.exports = {
	getStations,
	getStationLines,
	getStationsByLine,
	getTrainRoute,
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


