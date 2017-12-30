let assert = require('assert');
let expect = require('chai').expect;

let mtaStatus = require('../mta.event');
let mtaStations = require('../mta.stations');

const mtaRegEx = require('../includes/regex');


describe ('Test Regex Functions', function() {
	
	it ('Regex String should allow a normal pattern to be escaped and run as a string.', () => {

		let str_ptns = [
			{
				re: '((\\[(E\|F)\\])+\\s*(trains are rerouted in both directions via the)?\\s*)*',
				expect: '[E] trains are rerouted in both directions via the [F]',
			},
		];


		for (let x in str_ptns) {
			let result = mtaRegEx.matchRegexString(str_ptns[x].re, str_ptns[x].expect);

			expect(result).to.equal(str_ptns[x].expect);
		}
	});

	it ('convertArrayToRegexOr -- Convert stations to RegEx [OR List]', () => {
		
		let lines = {
			'E': {
				expected: '(Jamaica Center - Parsons/Archer|Sutphin Blvd - Archer Av - JFK Airport|Jamaica - Van Wyck|Briarwood - Van Wyck Blvd|Briarwood - Van Wyck Blvd|Kew Gardens - Union Tpke|75 Av|Forest Hills - 71 Av|Jackson Hts - Roosevelt Av|Queens Plaza|Court Sq|Lexington Av/53 St|5 Av/53 St|7 Av|50 St|42 St - Port Authority Bus Terminal|34 St - Penn Station|23 St|14 St|W 4 St|Spring St|Canal St|World Trade Center)',
				stations: [ 
					'Jamaica Center - Parsons/Archer',
	     			'Sutphin Blvd - Archer Av - JFK Airport',
	     			'Jamaica - Van Wyck',
	     			'Briarwood - Van Wyck Blvd',
	     			'Briarwood - Van Wyck Blvd',
	     			'Kew Gardens - Union Tpke',
	     			'75 Av',
	     			'Forest Hills - 71 Av',
	     			'Jackson Hts - Roosevelt Av',
	     			'Queens Plaza',
	     			'Court Sq',
	     			'Lexington Av/53 St',
	     			'5 Av/53 St',
	     			'7 Av',
	     			'50 St',
	     			'42 St - Port Authority Bus Terminal',
	     			'34 St - Penn Station',
	     			'23 St',
	     			'14 St',
	     			'W 4 St',
	     			'Spring St',
	     			'Canal St',
	     			'World Trade Center',
	     			],
	     		},
			'M': {
				expected: '(Forest Hills - 71 Av|67 Av|63 Dr - Rego Park|Woodhaven Blvd|Grand Av - Newtown|Elmhurst Av|Jackson Hts - Roosevelt Av|65 St|Northern Blvd|46 St|Steinway St|36 St|Queens Plaza|Court Sq|Lexington Av/53 St|5 Av/53 St|47-50 Sts - Rockefeller Ctr|42 St - Bryant Pk|34 St - Herald Sq|23 St|14 St|W 4 St|Broadway-Lafayette St|Essex St|Marcy Av|Hewes St|Lorimer St|Flushing Av|Myrtle Av|Central Av|Knickerbocker Av|Myrtle - Wyckoff Avs|Seneca Av|Forest Av|Fresh Pond Rd|Middle Village - Metropolitan Av)',
				stations: [ 
					'Forest Hills - 71 Av',
					'67 Av',
					'63 Dr - Rego Park',
					'Woodhaven Blvd',
					'Grand Av - Newtown',
					'Elmhurst Av',
					'Jackson Hts - Roosevelt Av',
					'65 St',
					'Northern Blvd',
					'46 St',
					'Steinway St',
					'36 St',
					'Queens Plaza',
					'Court Sq',
					'Lexington Av/53 St',
					'5 Av/53 St',
					'47-50 Sts - Rockefeller Ctr',
					'42 St - Bryant Pk',
					'34 St - Herald Sq',
					'23 St',
					'14 St',
					'W 4 St',
					'Broadway-Lafayette St',
					'Essex St',
					'Marcy Av',
					'Hewes St',
					'Lorimer St',
					'Flushing Av',
					'Myrtle Av',
					'Central Av',
					'Knickerbocker Av',
					'Myrtle - Wyckoff Avs',
					'Seneca Av',
					'Forest Av',
					'Fresh Pond Rd',
					'Middle Village - Metropolitan Av',
				],
			},
		};

		let stations_e = mtaRegEx.convertArrayToRegexOr(lines.E.stations);
		let stations_m = mtaRegEx.convertArrayToRegexOr(lines.M.stations);
		let joined_em = mtaRegEx.convertArrayToRegexOr([stations_e,stations_m]);

		expect(stations_e).to.equal(lines.E.expected);
		expect(stations_m).to.equal(lines.M.expected);
		expect(joined_em).to.equal('(' + stations_e + '|' + stations_m + ')');
	});


	it ('Should convert a stations array into executable Regex', () => {

		let line_tests = [
			{
				lines: ['E','M'],
				expect: 'between Jackson Hts-Roosevelt Av and West 4 St',
				message: "SUBWAY ACTION PLAN: We're improving: Signals, Cables, Tracks and Drainage [E] No service between Jackson Hts-Roosevelt Av and West 4 St [M] No weekday service between Broadway Junction and 71 Av All Times, 5 AM Tue, Dec 26 until 8 AM Sun, Dec 31 [E] trains are rerouted in both directions via the [F] between Jackson Hts-Roosevelt Av and West 4 St * [E] trains run local between 71 Av and 21 St-Queensbridge overnight. [M] Shuttle trains operate all times between Metropolitan Av and Myrtle-Wyckoff Avs . [M] trains operate weekend service between Broadway Junction [J] and Essex St . Overnight [SB] free shuttle buses connect Queens Plaza and Court Sq-23 St [7] stopping at 21 St-Queensbridge [E] [F]. Travel Alternatives [TP] For JFK Airport , take the Far Rockaway-bound [A] to Howard Beach-JFK Airport. For LaGuardia Airport , take the [7] or [E] (from 6 Av) to 74 St-Roosevelt Av, for the LaGuardia Link Q70 SBS . For Port Authority Bus Terminal , all 8 Av [E] stations and overnight service between W 4 St and World Trade Center , take the [A] or [C]. For 53 St [E] stations , use the nearby 51 St [6] or 7 Av [B] [D] Stations. For [M] stations , take the [E] [F] [R] and/or [J]. Take the [7] for Court Sq-23 St [G] , and the [R] ( days/evenings ) for Queens Plaza or free overnight shuttle buses. Click here for details about this Subway Action Plan. *9:45 PM to 5 AM, Tue to Fri, Dec 26 - 29 [E] trains run to/from 2 Av [F] station after W 4 St. [ad] This service change affects one or more ADA accessible stations. Please call 511 for help with planning your trip. If you are deaf or hard of hearing, use your preferred relay service provider or the free 711 relay.",
			},
		];

		let promises = line_tests.map( line => {
			return mtaStations.getStationLinesRegex(line.lines)
				.then( station_regex => station_regex + '+')
				.then( station_regex => mtaRegEx.matchRegexString(station_regex, line.message).trim())
				.then( station_regex => expect(station_regex).to.equal(line.expect));
		});
		
		return Promise.all(promises);
	});


	it ('prepareRegExpString should allow a normal pattern to be escaped and run as a string.', () => {

		let str_ptns = [
			{
				re: /((\[(E|F)\])+\s*(trains are rerouted in both directions via the)?\s*)*/,
				escaped_re: '((\\[(E\|F)\\])+\\s*(trains are rerouted in both directions via the)?\\s*)*',
				expect: '[E] trains are rerouted in both directions via the [F]',
			},
		];


		for (let x in str_ptns) {
			let exp = mtaRegEx.convertRegExpToString(str_ptns[x].re);

			expect(exp).to.equal(str_ptns[x].escaped_re);
		}
	});

	it ('Regex converted to string and back should still return expected results. ', () => {

		let str_ptns = [
			{
				re: /((((some|northbound|southbound)+\s*)*\[(A|B|C|D|E|F|G|M|L|J|Z|N|Q|R|W|S|SIR|[1-7]|SB|TP)\])*\s*(trains are (rerout(ed)+|stopping)|over the))+(\s*(trains|both directions|line|via|along\s*(the)+|travel(ing)+|are|the|on|the|in|between|from|to|then|end at|\,)*\s*(\[(A|B|C|D|E|F|G|M|L|J|Z|N|Q|R|W|S|SIR|[1-7]|SB|TP)\])*)+/,
				escaped_re: '((\\[(E\|F)\\])+\\s*(trains are rerouted in both directions via the)?\\s*)*',
				string: "SUBWAY ACTION PLAN: We're improving: Signals, Cables, Tracks and Drainage [E] No service between Jackson Hts-Roosevelt Av and West 4 St [M] No weekday service between Broadway Junction and 71 Av All Times, 5 AM Tue, Dec 26 until 8 AM Sun, Dec 31 [E] trains are rerouted in both directions via the [F] between Jackson Hts-Roosevelt Av and West 4 St * [E] trains run local between 71 Av and 21 St-Queensbridge overnight. [M] Shuttle trains operate all times between Metropolitan Av and Myrtle-Wyckoff Avs . [M] trains operate weekend service between Broadway Junction [J] and Essex St . Overnight [SB] free shuttle buses connect Queens Plaza and Court Sq-23 St [7] stopping at 21 St-Queensbridge [E] [F]. Travel Alternatives [TP] For JFK Airport , take the Far Rockaway-bound [A] to Howard Beach-JFK Airport. For LaGuardia Airport , take the [7] or [E] (from 6 Av) to 74 St-Roosevelt Av, for the LaGuardia Link Q70 SBS . For Port Authority Bus Terminal , all 8 Av [E] stations and overnight service between W 4 St and World Trade Center , take the [A] or [C]. For 53 St [E] stations , use the nearby 51 St [6] or 7 Av [B] [D] Stations. For [M] stations , take the [E] [F] [R] and/or [J]. Take the [7] for Court Sq-23 St [G] , and the [R] ( days/evenings ) for Queens Plaza or free overnight shuttle buses. Click here for details about this Subway Action Plan. *9:45 PM to 5 AM, Tue to Fri, Dec 26 - 29 [E] trains run to/from 2 Av [F] station after W 4 St. [ad] This service change affects one or more ADA accessible stations. Please call 511 for help with planning your trip. If you are deaf or hard of hearing, use your preferred relay service provider or the free 711 relay.",
				expect: '[E] trains are rerouted in both directions via the [F] between',
			},
		];


		for (let x in str_ptns) {

			let exp = mtaRegEx.convertRegExpToString(str_ptns[x].re);
			let result = mtaRegEx.matchRegexString(exp, str_ptns[x].string);

			expect(result.trim()).to.equal(str_ptns[x].expect);
		}
	});
});