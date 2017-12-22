let assert = require('assert');
let expect = require('chai').expect;

let mtaStatus = require('../mta.status.xml');
let mtaStations = require('../mta.stations');


describe('Parse Stations', function() {

	let stations = {
		hyphen: {
			'Times Sq-42 St': 'Times Sq - 42 St',
			'57 St-7 Av': '57 St- 7 Av',
			'Bay Ridge-95 St': 'Bay Ridge- 95 St.',
			'5 Av-59 St': '5 Av   -59 St',
			'Lexington Av-63 St': 'Lexington Av-63 St.',
			'Jackson Heights-Roosevelt Av': 'Jackson Heights - Roosevelt Av.',
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
			'4Av-9th St': '4Av',
			'Queens Plaza': 'Queensboro Plaza',
		},
	};

	let r_train_msg = [
		{
			stations: ['DeKalb Av', 'Canal St'],
			station_ids: [],
			message: 'SIGNAL MAINTENANCE [R] Trains run via the [Q] in both directions between DeKalb Av and Canal St',
		},
		{
			stations: ['86 St', 'Bay Ridge - 95 St'],
			station_ids: ['Bk38', 'Bk39'],
			message: '[R] trains are running with delays in both directions because of signal problems between 86 St and Bay Ridge-95 St.',
		},
		{
			stations: ['57 St-7 Av', '5 Av-59 St', '96 St', 'Lexington Av-63 St', 'Jackson Heights-Roosevelt Av.'],
			station_ids: [],
			message: 'Some northbound [N] trains are stopping on the [Q] line from <STRONG>57 St-7 Av</STRONG> and end at <STRONG>96 St.</STRONG> Some northbound [R] trains are stopping on the [Q] line from <B>57 St-7 Av</B> to <B>Lexington Av-63 St</B>, then over the [F] line from <B>Lexington Av-63 St</B> to <B>Jackson Heights-Roosevelt Av.</B> This service change is because of a train with mechanical problems at <B>5 Av-59 St.</B> Expect delays in [F][N][Q][R] train service.',
		},
/*
		{
			stations: ['53 St', '45 St', '25 St', 'Prospect Av', '4 Av-9 St', 'Union St'],
			station_ids: ['Bk34', 'Bk33', 'Bk31', 'Bk30', 'Bk608', 'Bk28'],
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
						
						//assert.equal(arrayElementsEqual(results, event.stations), true);
						//(event.stations).should.equal(results);
						
						expect(Object.values(stations)).to.have.members(event.stations);

						// assert.members([3, 2]);
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
	});
});