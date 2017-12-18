const mtaApi = require('./mta.api');

// File where we'll store things. No extension, please.
const mta_stations_file = './data/mta.stations';


//{ 
//  'Complex ID': 1,
//  'GTFS Stop ID': 'R01',
//  Division: 'BMT',
//  Line: 'Astoria',
//  'Stop Name': 'Astoria - Ditmars Blvd',
//  Borough: 'Q',
//  'Daytime Routes': 'N W',
//  Structure: 'Elevated',
//  'GTFS Latitude': 40.775036,
//  'GTFS Longitude': -73.912034
//}



console.log('Compile Stations List...');

mtaApi.getSubwayStations(mta_stations_file)

.then(data => {
	if (!data || data.length <= 0) {
		return Promise.reject('No data loaded from file or endpoint.');
	}
	
	let results = {};

	for (let d in data) {
		
		let r = prepStationFormat(data[d]);

		results[r.boro + r.cid] = r;
	}

	results = JSON.stringify(results);
	mtaApi.saveStatusToFile(results, './data/mta.stations.final.json');
});


function prepStationFormat (row) {

	let r = {
		cid: row['Complex ID'],
		gid: row['Complex ID'],
		div: row['Division'],
  		line: row['Line'],
  		name: row['Stop Name'],
  		boro: row['Borough'],
 	 	type: row['Structure'],
 	 	trains: row['Daytime Routes'].split(' '),
	};

	return r;
}