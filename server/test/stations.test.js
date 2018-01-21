'use strict';

// Chai
let assert = require('assert');
let expect = require('chai').expect;

// App Files
let mtaStatus = require('../mta.event');
let mtaStations = require('../mta.stations');
let mtaRegEx = require('../includes/regex');

// Test Data
let stations = require('../data/test/test.stations').stations.names;
let r_train_msg = require('../data/test/test.messages').train_line.R;
let event_messages = require('../data/test/test.messages').event_messages.structured;


describe('Parse Stations', function() {

	describe('MTAD-005 -- Test Individual Lines', () => {

		it('R Line', () => {

			/**
			 * Restructure data using the tag system. This way,
			 * we get properly formatted messaging, and reusability.
			 *
			 *
			 * routeTestByTag(r_train_msg, callback, 'R', ['MTAD-001']);
			 * routeTestByTag(f_train_msg, callback, 'F', ['MTAD-001']);
			 *
			 * callback: ()
			 */

			let promises = r_train_msg.map( event => {
				return mtaStations.matchAllLinesRouteStationsMessage(['R'], event.message)
					.then( stations => {
						expect(Object.values(stations.stations['R'].stations)).to.have.members(event.stations);
					});
			});

			return Promise.all(promises);
		});
	});

	describe('MTAD-025 -- General Station Tests', () => {
		it ('Should match the Stations Object', () => {

			let promises = event_messages.normal.map( event => {
				// Only process Route Changes.
				if (!event.type_detail || !event.stations || !event.line) { return;}

				return mtaStations.
					matchAllLinesRouteStationsMessage(event.line, event.message)
					.then( data => {

						let results = false;
						let mocha_msg = event.message;

						for (let l in event.stations) {
							results = true;

							// Make sure our results had an entry for this line before
							// we access that property, and a general error is thrown.
							expect(data.stations).to.have.property(l);

							let msg = '[' + l + '] ' + event.message;
							let stations_expected = Object.keys(event.stations[l].stations);
							let stations_found = Object.keys(data.stations[l].stations);

							// Message to help find data culprate.
							msg = '[' +stations_found.join(',') + '] <--> [' + stations_expected.join(',') + '] ' + msg;

							expect(stations_found, msg).to.have.members(stations_expected);
						}

						expect(results, 'Event should have at least one station -- ' + mocha_msg + event.line).to.equal(true);
					})
					.catch(err => {
						throw new Error(err);
					});
			});

			return Promise.all(promises);
		});

		describe('Parse Strings with Special Characters', () => {
			it ('Should match [simple names]', () => {
				Object.keys(stations.simple).map( i => {
					let res = mtaRegEx.matchStringsWithSpecialChars(i, stations.simple[i]);
					expect(res).to.equal(i);
				});
			});
			it ('Should match [names] with [mismatched-whitespace]', () => {
				Object.keys(stations.hyphen).map( i => {
					let res = mtaRegEx.matchStringsWithSpecialChars(i, stations.hyphen[i]);
					expect(res).to.equal(stations.hyphen[i]);
				});
			});
			it.skip ('Should *not* match [shorter names] with [longer ones].', () => {
				Object.keys(stations.mistaken_identity).map( i => {
					let res = mtaRegEx.matchStringsWithSpecialChars(i, stations.mistaken_identity[i]);
					expect(res).to.not.equal(i);
				});
			});
			it.skip ('Should match [abreviated names] with [full station names].', () => {
				Object.keys(stations.nomDePlume).map( i => {
					let res = mtaRegEx.matchStringsWithSpecialChars(i, stations.nomDePlume[i]);
					expect(res).to.equal(i);
				});
			});
		});
	});

	describe.skip('MTAD-013 -- Multiple Lines Mistaken Identity Occurs', () => {
		it('Common Roots cause Mistaken Identity of Stations.', () => {
			// 34 St -- Herald Square / Penn Station / Hundson Yards
			// 42 St -- Times Square / Port Authority / Bryant Park / Grand Central
		});
	});

	describe.skip('MTAD-026 -- Stations for Multiple Lines', () => {
		it('Lines share Station', () => { });
	});

	describe.skip('MTAD-004 -- Identify Multiple Stations with the same name.', () => {
		it('36 St', () => { });
	});
});
