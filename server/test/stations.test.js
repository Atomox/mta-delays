let assert = require('assert');
let expect = require('chai').expect;

let mtaStatus = require('../mta.status.xml');
let mtaStations = require('../mta.stations');


describe('Parse Stations', function() {

	let stations = {
		hyphen: {
			'Times Sq-42 St': 'Times Sq - 42 St',
			'Bay Ridge-95 St': 'Bay Ridge- 95 St.',
			'Lexington Av-63 St': 'Lexington Av-63 St.',
			'Jackson Heights-Roosevelt Av': 'Jackson Heights - Roosevelt Av.',
			'5 Av-59 St': '5 Av/59 St',
			'57 St-7 Av': '57 St- 7 Av',
			'4 Av-9 St': '4 Av-9 St',
		},
		simple: {
			'96 St':'96 St',
			'53 St':'53 St', 
			'45 St':'45 St', 
			'25 St':'25 St', 
			'Prospect Av': 'Prospect Av', 
			'Union St': 'Union St',
		},
		mistaken_identity: {
			'96 St':'196 St',
			'18 St':'181 St', 
			'45 St':'145 St', 
			'25 St':'125 St', 
			'59 St':'5 Av/59 St',
			'4Av-9th St': '4Av',
			'Queens Plaza': 'Queensboro Plaza',
		},
		nomDePlume: {
			'Jackson Hts - Roosevelt Av': 'Jackson Heights-Roosevelt Av',
		},
	};

	let r_train_msg = [

		{
			stations: ['DeKalb Av', 'Canal St'],
			station_ids: [],
			stationsOtherLines: [],
			message: 'SIGNAL MAINTENANCE [R] Trains run via the [Q] in both directions between DeKalb Av and Canal St',
		},
		{
			stations: ['86 St', 'Bay Ridge - 95 St'],
			station_ids: ['Bk38', 'Bk39'],
			message: '[R] trains are running with delays in both directions because of signal problems between 86 St and Bay Ridge-95 St.',
		},
		{
			stations: ['65 St', 'Northern Blvd', '46 St', 'Steinway St', '36 St', 'Queens Plaza'],
			station_ids: ['Q268', 'Q269', 'Q270', 'Q271', 'Q272'],
			problem: '36 St exists in Queens and Brooklyn',
			message: 'TRACK MAINTENANCE [R] Bay Ridge-bound trains skip 65 St, Northern Blvd, 46 St, Steinway St and 36 St. Late Evenng, 9:45 PM to 11 PM, Friday, Dec 22. For service to these stations, take the [R] to Queens Plaza and transfer to a Forest Hills-bound. For service from these stations, take the [R] to Roosevelt Av and transfer to a Bay Ridge-bound [R].',
		},
/*
		{
			stations: ['57 St - 7 Av', '5 Av/59 St', 'Jackson Heights-Roosevelt Av'],
			stationsOtherLines: ['96 St', 'Lexington Av-63 St'],
			stationIds: [],
			problem: '59 St exists in Manhattan and Brooklyn',
			message: 'Some northbound [N] trains are stopping on the [Q] line from 57 St-7 Av and end at 96 St. Some northbound [R] trains are stopping on the [Q] line from 57 St-7 Av to Lexington Av-63 St, then over the [F] line from Lexington Av-63 St to Jackson Heights-Roosevelt Av. This service change is because of a train with mechanical problems at 5 Av-59 St. Expect delays in [F][N][Q][R] train service.',
		},
 
		{
			stations: ['53 St', '45 St', '25 St', 'Prospect Av', '4 Av-9 St', 'Union St'],
			station_ids: ['Bk34', 'Bk33', 'Bk31', 'Bk30', 'Bk608', 'Bk28'],
			problem: '9th St is listed as Line-Station (4 Av-9 St)',
			message: 'PRIORITY REPAIRS [R] Manhattan-bound trains skip 53 St, 45 St, 25 St, Prospect Av, 4 Av-9 St and Union St',
		},
		
*/

/*
		{
			stations: ['Jackson Hts-Roosevelt Av', 'Forest Hills-71 Av'],
			station_ids: ['Canal St','57 St-7 Av'],
			message: 'Some Forest Hills-bound [M] and [R] trains are running express from Jackson Hts-Roosevelt Av to Forest Hills-71 Av because of signal problems at Jackson Hts-Roosevelt Av.',
		},
		{
			stations: [],
			message: 'Northbound [N] trains are running local from Canal St to 57 St-7 Av.Northbound [Q] trains will end at Times Sq-42 St.Northbound [Q] trains are running local from Canal St to Times Sq-42 St.These service changes are because of a train with mechanical problems at 57 St-7 Av.Expect delays on the [N], [Q], [R] and [W] trains.',
		},
*/
	];

	describe('Parse Stations in R Line', () => {

		it ('Should Identify stations in a message on the R Line.', () => {
			
			let promises = r_train_msg.map( event => {
				return mtaStations.matchRouteStationsMessage('R', event.message)
					.then( stations => {			
						console.log(' --> ', event.stations, '...', stations);
			
						expect(Object.values(stations)).to.have.members(event.stations);
					});
			});
			
			return Promise.all(promises);
		});
	});

	describe('Parse Strings with Special Characters', () => {
		it ('Should match simple names', () => {
			Object.keys(stations.simple).map( i => {
				let res = mtaStations.regexMatchStringsWithSpecialChars(i, stations.simple[i]);
				expect(res).to.equal(i);
			});
		});
		it ('Should match names with mismatched-whitespace', () => {
			Object.keys(stations.hyphen).map( i => {
				let res = mtaStations.regexMatchStringsWithSpecialChars(i, stations.hyphen[i]);
				expect(res).to.equal(i);
			});
		});
		it ('Should not match shorter names with longer ones', () => {
			Object.keys(stations.mistaken_identity).map( i => {
				let res = mtaStations.regexMatchStringsWithSpecialChars(i, stations.mistaken_identity[i]);
				expect(res).to.not.equal(i);
			});
		});
		it ('Should match abreviated names with full station names.', () => {
			Object.keys(stations.nomDePlume).map( i => {
				let res = mtaStations.regexMatchStringsWithSpecialChars(i, stations.nomDePlume[i]);
				expect(res).to.equal(i);
			});
		});
	});
});