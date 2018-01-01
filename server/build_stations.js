const mtaApi = require('./svc/mta/subway/mta.api');

const mtaRegEx = require('./includes/regex');

// File where we'll store things. No extension, please.
const mta_stations_file = './data/static/mta.stations';
const stations_generated_filename = './data/generated/mta.stations.compiled.json';

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
			let all_alias = stationAliases(r.name, r.boro);
			all_alias = all_alias.map(value => {
				console.log(value);
				let res = mtaRegEx.prepareRexExNameString(value);

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
		mtaApi.saveStatusToFile(result, stations_generated_filename);
	}
	catch (err) {
		console.error('Error processing stations. ', err);	
	}
});


function stationAliases(name, boro) {
	const alias = {
		Mn: {
			'W 4 St': [
				'W 4th St',
				'West 4th St',
				'West 4 St',
				'W 4 St-Wash Sq',
				'W 4 St-Washington Sq',
				'W 4 St-Washington Square',
			],
			'Times Sq - 42 St':[
				'Times Square - 42 St',
				'42 Times Square',
				'Times Sq',
				'42 St',
			],
			'Grand Central - 42 St': [
				'Grand Central - 42 St',
				'Grand Central',
				'42 St',
			],
			'14 St - Union Sq': [
				'14 St - Union Sq',
				'Union Square',
				'Union Sq',
				'14 St',
			],
			'42 St - Port Authority Bus Terminal': [
				'42 St-Port Authority',
				'Port Authority',
				'PABT',
				'42 St',
			],
			'34 St - Penn Station': [
				'Penn Station',
				'34 St',
			],
			'World Trade Center': [
				'World Trade Ctr',
				'World Trade',
				'WTC',
			],
			'Lexington Av/53 St': [
				'Lex/53 St',
				'53/Lex',
			],
		},

		Qs: {

			'Jackson Hts - Roosevelt Av': [
				'Jackson Hts',
				'Jackson Heights',
				'Jackson Hts-Roosevelt Av',
				'Jackson Heights-Roosevelt Av',
				'74th',
			],
			'Briarwood - Van Wyck Blvd': [
				'Briarwood',
				'Van Wyck Blvd',
			],
			'Kew Gardens - Union Tpke': [
				'Kew Gardens',
				'Union Tpke',
			],
			'Forest Hills - 71 Av': [
				'71/Continental',
				'71 Av',
				'Forest Hills 71st',
			],
			'Queens Plaza': [
				'Qns Plza'
			],
			'Jamaica Center - Parsons/Archer': [
				'Jamaica Center',
				'Parsons Blvd/Archer Ave',
				'Parsons Blvd',
			],
			'Sutphin Blvd - Archer Av - JFK Airport': [
				'Sutphin Blvd - Archer Av',
				'Sutphin Blvd',
				'Sutphin/Archer',
			],
			'Jamaica - Van Wyck': [
				'Van Wyck',
			],
			'36 St': [
				'36 St (Qns)',
			],
		},


		Bk: {

			'Atlantic Av - Barclays Ctr': [
				'Atlantic Av-Barclays Center',
				'Barclays Center',
				'Barclays Ctr',
				'Atlantic Av-Barclays Ctr',
			],
			'Coney Island - Stillwell Av': [
				'Stillwell Av',
				'Coney Island',
			],
			'W 8 St - NY Aquarium': [
				'W 8 St',
				'NY Aquarium',
			],
			'36 St': [
				'36 St (Bklyn)',
			],
		},

		Bx: {},
		SI: {},
	};


	let results = [];

	if (alias[boro][name]) {
		results = alias[boro][name];
	} 

	// Include the name in the result.
	results.push(name);

	// Return the array of names, sorted by length of the name.
	// (longest names should be matched before shorter names).
	return results.sort( (a, b) => b.length - a.length );
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

