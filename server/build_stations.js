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

	console.log(' > Stations Fetched....');
	if (!data || data.length <= 0) {
		return Promise.reject('No data loaded from file or endpoint.');
	}

	console.log(' > Preparing Stations....');

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


			/**
			 *
			 *
			 *   @TODO
			 *
			 *     *
			 *     *  Given this list, add the unfiltered regex list, with key, to an array.
			 *     *
			 *     *  Then pass the array somehow to a list, which we can run
			 *     *  during station identification,
			 *     *  before the normal station check.
			 *     *
			 *     *
			 *     *
			 *     *
			 *     *
			 *     +
			 *
			 */

			// The regEx part of the quiz.
			// Get any aliases, and build a giant regex (alias|station name).
			let all_alias = stationAliases(r.name, r.boro);
			all_alias = all_alias.map(value => {
				let res = mtaRegEx.prepareRexExNameString(value);
				return res;
			});

			r.regex = mtaRegEx.convertArrayToRegexOr(all_alias);
			r.common = stationCommonName(r.name, r.boro);

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

//		console.log('lines - - - - - - ', lines);

		let result = {
			stations: results,
			by_line: lines,
		}

		result = JSON.stringify(result);
		console.log(' > Saving to file....');
		mtaApi.saveStatusToFile(result, stations_generated_filename);
		console.log(' > Complete.');
	}
	catch (err) {
		console.error('Error processing stations. ', err);
	}
});


function stationCommonName(name, boro) {
	const alias = {
		Mn: {

			// 110
			'Cathedral Pkwy': '110 St',
			'Cathedral Pkwy (110 St)': '110 St',

			// 96
			'96 St': '96 St',

			// 86

			// 72

			// 59
			'59 St - Columbus Circle': '59 St',

			// 57
			'57 St - 7 Av': '57 St',

			// 42
			'Times Sq - 42 St': '42 St',
			'Grand Central - 42 St': '42 St',
			'42 St - Port Authority Bus Terminal': '42 St',
			'42 St - Bryant Pk': '42 St',

			// 34
			'34 St - Herald Sq': '34 St',
			'34 St - Penn Station': '34 St',

			// 14
			'14 St - Union Sq': '14 St',
			'Lexington Av/63 St': '63 St',
			'Lexington Av/53 St': '53 St',
		},

		Qs: {
			'Astoria - Ditmars Blvd': 'Ditmars Blvd',
			'Jackson Hts - Roosevelt Av': '74th',
			'Briarwood - Van Wyck Blvd': 'Briarwood',
			'Kew Gardens - Union Tpke': 'Union Tpke',
			'Forest Hills - 71 Av': '71 Av',
			'Jamaica Center - Parsons/Archer': 'Parsons Blvd',
			'Sutphin Blvd - Archer Av - JFK Airport': 'Sutphin Blvd',
			'Jamaica - Van Wyck': 'Van Wyck',
			'Jamaica - 179 St': '179 St',
			'Court Sq': '23rd St',
		},


		Bk: {
			'Atlantic Av - Barclays Ctr': 'Barclays Center',
			'Broadway Jct': 'Broadway',
			'Coney Island - Stillwell Av': 'Stillwell Av',
			'36 St': '36 St',
			'Crown Hts - Utica Av': 'Utica Av',
		},

		Bx: {
			'Wakefield - 241 St': '241 St',
			'Norwood - 205 St': '205 St',
			'161 St - Yankee Stadium': '161 St',
			'149 St - Grand Concourse': '149 St',
			'E 149 St': '149 St',
			'138 St - Grand Concourse': '138 St',
			'3 Av - 138 St': '138 St',
		},
		SI: {

		}
	};

	// Either the common name, otherwise, use the proper name.
	return (alias[boro][name]) ? alias[boro][name] : name;
}


function stationAliases(name, boro) {
	const alias = {
		Mn: {

			'Marble Hill - 225 St': [
				'Marble Hill',
				'225 St',
			],
			'Inwood - 207 St': [
				'Inwood',
				'207 St',
			],
			'168 St - Washington Hts': [
				'168 St'
			],
			'163 St - Amsterdam Av': [
				'163 St',
			],
			'Harlem - 148 St': [
				'148 St',
			],
			'137 St - City College': [
				'137 St',
			],
			'116 St - Columbia University': [
				'Columbia University',
				'116 St',
			],
			// 1
			'Cathedral Pkwy': [
				'110 St - Cathedral Pkwy',
				'110 St',
				'Cathedral Pkwy',
			],
			'Central Park North (110 St)': [
				'Central Park North',
				'Central Park North - 110 St',
				'110 St'
			],
			// C
			'Cathedral Pkwy (110 St)': [
				'110 St - Cathedral Pkwy',
				'110 St',
				'Cathedral Pkwy',
			],
			'96 St': [
				'96 At-2 Av',
				'96 St-2 Av',
			],
			'81 St - Museum of Natural History': [
				'81 St',
				'Museum of Natural History',
			],
			'68 St - Hunter College': [
				'68 St',
				'Hunter College',
			],
			'66 St - Lincoln Center': [
				'66 St',
			],
			'Roosevelt Island': [
				'Roosevelt Is',
			],
			'Lexington Av/63 St': [
				'Lexington/63 St',
				'63 St/Lex',
				'63/Lexington Av'
			],
			'Lexington Av/59 St': [
				'Lexington Av/59 St',
				'59 St-Lex Av',
				'59/Lex',
				'59 St-Lexington Av',
			],
			'59 St': [
				// 4/5/6 Line
			],
			'59 St - Columbus Circle': [
				'59 St',
				'Columbus Circle',
			],
			'Lexington Av/53 St': [
				'Lex/53 St',
				'53/Lex',
			],
			'47-50 Sts - Rockefeller Ctr': [
				'47-50 St-Rockefeller Ctr',
				'47-50 Sts/Rockefeller Ctr',
				'47-50 Sts',
				'Rockefeller Ctr',
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
			'42 St - Bryant Pk': [
				'Bryant Pk',
			],
			'42 St - Port Authority Bus Terminal': [
				'42 St/Port Authority-Bus Terminal',
				'42 St-Port Authority',
				'Port Authority',
				'PABT',
				'42 St',
			],
			'34 St - 11 Av': [
				'34 St-Hudson Yards',
				'Hudson Yards',
			],
			'34 St - Herald Sq': [
				'Herald Square',
				'Herald Sq',
				'34 St',
			],
			'34 St - Penn Station': [
//				'34 St - Penn Station (8 Av)',
//				'34 St - Penn Station (7 Av)',
				'Penn Station',
				'34 St',
			],
			'14 St - Union Sq': [
				'14 St - Union Sq',
				'Union Square',
				'Union Sq',
				'14 St',
			],
			'8 St - NYU': [
				'8 St',
			],
			'W 4 St': [
				'W 4',
				'W 4 St',
				'W 4th St',
				'West 4th St',
				'West 4 St',
				'W 4 St-Wash Sq',
				'W 4 St-Washington Sq',
				'W 4 St-Washington Square',
				'West 4 St-Washington Square',
			],
			'Christopher St - Sheridan Sq': [
				'Christopher St',
				'Sheridan Sq',
			],
			'Broadway-Lafayette St': [
				'B\'way-Lafayette St',
				'Broadway-Lafayette',
				'B\'way-Lafayette',
			],
			'Brooklyn Bridge - City Hall': [
				'Brooklyn Bridge',
			],
			'Essex St': [
				'Delancy St/Essex St',
				'Delancey-Essex Sts',
				'Delancey-Essex St',
			],
			'World Trade Center': [
				'World Trade Ctr',
				'World Trade',
				'WTC',
			],
			'Whitehall St': [
				'Whitehall St-South Ferry',
			],
			'Park Pl': [
				'Park Place'
			],
		},

		Qs: {
			'21 St - Queensbridge': [
				'Queensbridge',
			],
			'Astoria - Ditmars Blvd': [
				'Ditmars Blvd',
			],
			'Jackson Hts - Roosevelt Av': [
				'Roosevelt Av',
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
			'63 Dr - Rego Park': [
				'63 Dr',
				'Rego Park',
			],
			'Grand Av - Newtown': [
				'Grand Av',
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
			'85 St - Forest Pkwy': [
				'85 St',
				'Forest Pkwy',
			],
			'Jamaica - Van Wyck': [
				'Van Wyck',
			],
			'Jamaica - 179 St': [
				'179 St',
			],
			'36 St': [
				'36 St (Queens)',
				'36 St (Qns)',
			],
			'Flushing - Main St': [
				'Flushing',
				'Main St'
			],
			'Mets - Willets Point': [
				'Willets Point',
				'Willets Pt',
			],
			'103 St - Corona Plaza': [
				'103 St',
			],
			'90 St - Elmhurst Av': [
				'90 St'
			],
			'82 St - Jackson Hts': [
				'82 St',
			],
			'74 St - Broadway': [
				'74 St',
			],
			'Woodside - 61 St': [
				'61 St',
				'61 St-Woodside',
			],
			'33 St': [
				'33 St-Rawson St',
				'33 St',
			],
			'Court Sq': [
				'Court Sq/23rd St',
			],
			'Vernon Blvd - Jackson Av': [
				'Vernon - Jackson',
				'Vernon Blvd',
				'Jackson Av' // Also in Bx
			],
			'Ozone Park - Lefferts Blvd': [
				'Ozone Park',
				'Lefferts Blvd',
			],
			'Aqueduct - N Conduit Av': [
				'N Conduit Av',
			],
			'Howard Beach - JFK Airport': [
				'Howard Beach',
			],
			'Rockaway Park - Beach 116 St': [
				'Beach 116 St',
			],
		 	'Far Rockaway - Mott Av': [
				'Far Rockaway',
				'Mott Av',
			],
			'Middle Village - Metropolitan Av': [
				'Metropolitan Av',
				'Middle Village',
			],
		},


		Bk: {
			'4 Av': [
				'4 Av-9 St',
			],
			'9 St': [
				'4 Av-9 St',
			],
			'Smith - 9 Sts': [
				'Smith St',
				'Smith St - 9 St',
			],
			'Jay St - MetroTech': [
				'Jay St - Metro Tech',
				'MatroTech',
			],
			'Atlantic Av - Barclays Ctr': [
				'Atlantic Av-Barclays Center',
				'Barclays Center',
				'Barclays Ctr',
				'Atlantic Av-Barclays Ctr',
			],
			'15 St - Prospect Park': [
				'15 St',
			],
			'Broadway Jct': [
				'Broadway Junction',
			],
			'Myrtle - Wyckoff Avs': [
				'Myrtle-Wyckoff Av',
			],
			'Myrtle - Willoughby Avs': [
				'Myrtle - Willoughby Av',
				'Willoughby Av',
			],
			'Bedford - Nostrand Avs': [

			],
			'Botanic Garden': [
				'Botanical Garden',
			],
			'Kingston - Throop Avs': [
				'Throop Av',
			],
			'Sutter Av - Rutland Rd': [
				'Rutland Rd',
			],
			'Hoyt - Schermerhorn Sts': [
				'Hoyt-Schermerhorn',
			],
			'Eastern Pkwy - Brooklyn Museum': [
				'Eastern Pkwy',
				'Brooklyn Museum',
			],
			'Flatbush Av - Brooklyn College': [
				'Flatbush Av',
				'Brooklyn College',
			],
			'W 8 St - NY Aquarium': [
				'W 8 St',
				'NY Aquarium',
			],
			'Coney Island - Stillwell Av': [
				'Stillwell Av',
				'Coney Island',
			],
			'36 St': [
				'36 St (Bklyn)',
				'36 St , Brooklyn',
			],
			'59 St': [
				'59 St , Brooklyn',
				'59 St (Bklyn)',
			],
			'Crown Hts - Utica Av': [
				'Crown Hts - Utica Av',
				'Utica Av',
				'Crown Hts',
				'Crown Heights',
			],
			'Canarsie - Rockaway Pkwy': [
				'Rockaway Pkwy',
			],
			'Bay Ridge - 95 St': [
				'95 St-Bay Ridge',
				'95 St',
			],
		},

		Bx: {
			'Van Cortlandt Park - 242 St': [
				'Van Cortlandt Park',
				'242 St',
			],
			'Wakefield - 241 St': [
				'241 St',
				'Wakefield',
			],
			'Norwood - 205 St': [
				'Norwood',
				'205 St',
			],
			'Allerton Av': [
				'Allerton'
			],
			'West Farms Sq - E Tremont Av': [
				'West Farms Sq'
			],
			'Eastchester - Dyre Av': [
				'Dyre Av',
				'Eastchester',
			],
			'Bedford Park Blvd - Lehman College': [
				'Bedford Park Blvd',
				'Lehman College'
			],
			'161 St - Yankee Stadium': [
				'161 St',
				'Yankee Stadium',
			],
			'149 St - Grand Concourse': [
				'149 St',
			],
			'138 St - Grand Concourse': [
				'138 St',
			],
			'E 143 St - St Mary\'s St': [
				'E 143 St',
			],
			'Westchester Sq - E Tremont Av': [
				'Westchester Sq',
			],
			'Morrison Av- Sound View': [
				'Morrison Av - Sound View',
				'Morrison Av',
				'SOund View',
			],
			'Bedford Park Blvd': [
				'Bedford Pk Blvd',
			],
		},
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
