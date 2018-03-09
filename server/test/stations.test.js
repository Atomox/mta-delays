'use strict';

// Chai
let assert = require('assert');
let expect = require('chai').expect;

// App Files
let mtaStatus = require('../mta.event');
let mtaStations = require('../mta.stations');
let mtaRegEx = require('../includes/regex');

// Test Data
let tests = require('./mta.test');
let stations = require('../data/test/test.stations').stations.names;
let r_train_msg = require('../data/test/test.messages').train_line.R;
let event_messages = require('../data/test/test.messages').event_messages.structured;


describe('Parse Stations', function() {

	describe('General Station Tests', () => {

		tests.stationTestByTag(event_messages.normal, CheckStationsListForExpected, 'Basic Stations Check', [], ['MTAD-026']);


		describe('Special Character Names', () => {

			tests.basicTest(stations.simple, checkStationWithSpecialChar, 'Should match [simple names]');

			tests.basicTest(stations.hyphen, checkStationWithSpecialChar, 'Should match [names] with [mismatched-whitespace]');

			tests.basicTest(stations.mistaken_identity, checkStationWithSpecialCharNegative, 'Should *not* match [shorter names] with [longer ones].');
		});
	});

	describe('MTAD-013 -- Multiple Lines Mistaken Identity Occurs', () => {

		tests.stationTestByTag(event_messages.normal, CheckStationsListForExpected, 'Common roots cause mistaken station identity.', ['MTAD-013']);

	});

	describe('MTAD-027 -- Match Abreviations with Original Stations', () => {

		tests.stationTestByTag(stations.nomDePlume, CheckStationsListForExpected, 'Alternate/Alias Names');
	});

	describe('MTAD-026 -- Stations for Multiple Lines', () => {

		tests.stationTestByTag(stations.sharedStation, CheckStationsListForExpected, 'Lines share Station');
	});

	describe('MTAD-024 -- Multiple Spellings for a Station', () => {

		tests.stationMessageTestByTag(event_messages.normal, CheckStationsParseMessageForExpected, 'Multiple Spellings Check', ['MTAD-024']);
	});

	describe('MTAD-040 -- 34, 42, 50, 59 and 66 Sts', () => {

		tests.stationTestByTag(event_messages.normal, CheckStationsListForExpected, 'Basic Bunched Stations Check', ['MTAD-040']);
	});

	describe.skip('MTAD-004 -- Identify Multiple Stations with the same name.', () => {
		it('36 St', () => { });
	});


	describe('MTAD-005 -- Test Individual Lines', () => {

		tests.stationTestByTag(r_train_msg, checkIndividualLine, 'R Line -- General', [], ['MTAD-004']);

	});

	describe.skip('MTAD-029 -- 36 St Stations', () => {
		/**
		 *
		 * @TODO -- Need to write proper Tests.
		 *   *
		 *   * 1. Comb through data in stations.
		 *   * 2. Write proper test to make sure we:
		 *   *    a. match the right stations
		 *   *    b. Replace all instances with tokens.
		 *   *
		 *   *
		 *   *
		 *   *
		 *
		 *
		 *
		 */
		tests.basicTest(stations['36st'], checkStationWithSpecialChar, 'Should match proper 36 St.');
	});
});


function checkStationWithSpecialChar(i, data) {
	let res = mtaRegEx.matchStringsWithSpecialChars(i, data[i]);
	expect(res).to.equal(data[i]);
}


function checkStationWithSpecialCharNegative(i, data) {
	let res = mtaRegEx.matchStringsWithSpecialChars(i, data[i]);
	expect(res).to.not.equal(data[i]);
}


// Object.keys(stations.hyphen).map( i => {
// 	let res = mtaRegEx.matchStringsWithSpecialChars(i, stations.hyphen[i]);
// 	expect(res).to.equal(stations.hyphen[i]);
// });


function checkIndividualLine(event) {
	return mtaStations.matchAllLinesRouteStationsMessage(['R'], event.message)
		.then( stations => {
			expect(Object.values(stations.stations['R'].stations)).to.have.members(event.stations);
		});
}


function CheckStationsParseMessageForExpected (event) {
	return mtaStations.
		matchAllLinesRouteStationsMessage(event.line, event.message)
		.then( data => {

			let results = false;
			let mocha_msg = event.message;

			data.parsed_message = data.parsed_message.replace(/\s/g, " ").trim();
			event.message_station_parse = event.message_station_parse.replace(/\s/g, " ").trim();
			expect(data.parsed_message.length, 'Lengths should be the same').to.equal(event.message_station_parse.length);
			expect(data.parsed_message).to.equal(event.message_station_parse);
		})
		.catch(err => {
			throw new Error(err);
		});
}


function CheckStationsListForExpected (event) {
	return mtaStations.
		matchAllLinesRouteStationsMessage(event.line, event.message)
		.then( data => {

			console.log('\n\n', event, '\n', '.....................', data, '\n\n');

			let results = false;
			let mocha_msg = event.message;

			for (let l in event.stations) {
				results = true;

				// Make sure our results had an entry for this line before
				// we access that property, and a general error is thrown.
				expect(data.stations).to.have.property(l);

				let msg = '[' + l + '] -- ' + event.message;
				let stations_expected = Object.keys(event.stations[l].stations);
				let stations_found = Object.keys(data.stations[l].stations);

				// Message to help find data culprate.
				msg = '[' +stations_found.join(',') + '] <--> [' + stations_expected.join(',') + '] -- ' + msg;

				expect(stations_found, msg).to.have.members(stations_expected);
			}

			expect(results, 'Event should have at least one station -- ' + mocha_msg + event.line).to.equal(true);
		})
		.catch(err => {
			throw new Error(err);
		});
}
