let assert = require('assert');
let expect = require('chai').expect;

let mtaStatus = require('../mta.status.xml');
let mtaStations = require('../mta.stations');

// Test Data
let stations = require('../data/test/test.stations').stations.names;
let r_train_msg = require('../data/test/test.messages').train_line.R;

describe('Parse Stations', function() {

	describe('Parse Stations on the [R Line]', () => {

		it ('Should Identify stations in a message on the R Line.', () => {
			
			let promises = r_train_msg.map( event => {
				return mtaStations.matchRouteStationsMessage('R', event.message)
					.then( stations => {
//						console.log(' --> ', event.stations, '...', stations);
			
						expect(Object.values(stations)).to.have.members(event.stations);
					});
			});
			
			return Promise.all(promises);
		});
	});

	describe('Parse Strings with Special Characters', () => {
		it ('Should match [simple names]', () => {
			Object.keys(stations.simple).map( i => {
				let res = mtaStations.regexMatchStringsWithSpecialChars(i, stations.simple[i]);
				expect(res).to.equal(i);
			});
		});
		it ('Should match [names] with [mismatched-whitespace]', () => {
			Object.keys(stations.hyphen).map( i => {
				let res = mtaStations.regexMatchStringsWithSpecialChars(i, stations.hyphen[i]);
				expect(res).to.equal(i);
			});
		});
		it.skip ('Should *not* match [shorter names] with [longer ones].', () => {
			Object.keys(stations.mistaken_identity).map( i => {
				let res = mtaStations.regexMatchStringsWithSpecialChars(i, stations.mistaken_identity[i]);
				expect(res).to.not.equal(i);
			});
		});
		it.skip ('Should match [abreviated names] with [full station names].', () => {
			Object.keys(stations.nomDePlume).map( i => {
				let res = mtaStations.regexMatchStringsWithSpecialChars(i, stations.nomDePlume[i]);
				expect(res).to.equal(i);
			});
		});
	});
});