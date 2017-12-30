const mtaApi = require('./mta.api');

const mtaRegEx = require('./includes/regex');

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

			// The regEx part of the quiz.
			// Get any aliases, and build a giant regex (alias|station name).
			let all_alias = stationAliases(r.name);
			all_alias.push(r.name);
			all_alias = all_alias.map(value => {
				let res = mtaRegEx.wrapNumberBounds(value);
				res = mtaRegEx.wrapSeperatorBounds(res);
				res = mtaRegEx.replaceSpace(res);

				return res;
			});
			
			r.regex = mtaRegEx.convertArrayToRegexOr(all_alias);

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


function stationAliases(key) {
	const alias = {
		'W 4 St': [
			'W 4th St',
			'West 4th St',
			'West 4 St',
			'W 4 St-Wash Sq',
			'W 4 St-Washington Sq',
			'W 4 St-Washington Square',
		],
		'Jackson Hts - Roosevelt Av': [
			'Jackson Hts',
			'Jackson Heights',
			'Jackson Hts-Roosevelt Av',
			'Jackson Heights-Roosevelt Av',
			'74th',
		],
	};

	return (alias[key]) 
		? alias[key].sort(function(a, b){
			  // ASC  -> a.length - b.length
			  // DESC -> b.length - a.length
			  return b.length - a.length;
			})
		: [];
}


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

