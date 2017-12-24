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
	
	try {
		let results = {};
		let lines = {};

		for (let d in data) {
			
			let r = prepStationFormat(data[d]);
			let boro = '';
			switch(r.boro){
				case 'Bx':
				case 'Bk':
				case 'SI':
					boro = r.boro;
					break;
				case 'M':
					boro = r.boro + 'n';
					break;
				case 'Q':
					boro = r.boro + 's';
					break;
			}

			let key = boro + r.cid + '-' + r.gid;
			r.boro = boro;

			// Assign our new key to the station.
			r.key = key;

			if (!lines[r.line]) {
				lines[r.line] = {
					name: r.line,
					boro: {},
					trains: {},
					stations: {},
				};
			}

			if (r.trains) {
				for (let t in r.trains) {
					lines[r.line].trains[r.trains[t]] = r.trains[t];	
				}
			}
			lines[r.line].boro[boro] = boro;
			lines[r.line].stations[key] = r;
				

			results[key] = r;
		}

		console.log('lines - - - - - - ', lines);

		let result = {
			stations: results,
			by_line: lines,
		}

		result = JSON.stringify(result);
		mtaApi.saveStatusToFile(result, './data/mta.stations.final.json');
	}
	catch (err) {
		console.error('Error processing stations. ', err);	
	}
});


function prepStationFormat (row) {

	let r = {
		cid: row['Complex ID'],
		gid: row['GTFS Stop ID'],
		div: row['Division'],
  		line: row['Line'],
  		name: row['Stop Name'],
  		boro: row['Borough'],
 	 	type: row['Structure'],
 	 	trains: row['Daytime Routes'].split(' '),
	};

	return r;
}

