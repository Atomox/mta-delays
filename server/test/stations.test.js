'use strict';

const _ = require('lodash');

// Chai
const assert = require('assert');
const expect = require('chai').expect;

// App Files
const mtaStatus = require('../mta.event');
const mtaStations = require('../mta.stations');
const mtaRegEx = require('../includes/regex');
const mtaRouteChange = require('../mta.route_change');

// Test Data
const tests = require('./mta.test');
const stations = require('../data/test/test.stations').stations.names;
const r_train_msg = require('../data/test/test.messages').train_line.R;
const event_messages = require('../data/test/test.messages').event_messages.structured;


describe('Parse Stations', function() {

	describe('General Station Tests', () => {

		tests.stationTestByTag(event_messages.normal, CheckStationsListForExpected, 'Basic Stations Check', [], ['MTAD-026']);


		describe('Special Character Names', () => {

			tests.basicTest(stations.simple, checkStationWithSpecialChar, 'Should match [simple names]');

			tests.basicTest(stations.hyphen, checkStationWithSpecialChar, 'Should match [names] with [mismatched-whitespace]');

			tests.basicTest(stations.mistaken_identity, checkStationWithSpecialCharNegative, 'Should *not* match [shorter names] with [longer ones].');
		});
	});
	describe('MTAD-005 -- Test Individual Lines', () => {

		tests.stationTestByTag(r_train_msg, checkIndividualLine, 'R Line -- General', [], ['MTAD-004']);

	});

	describe('MTAD-013 -- Multiple Lines Mistaken Identity Occurs', () => {

		tests.stationTestByTag(event_messages.normal, CheckStationsListForExpected, 'Common roots cause mistaken station identity.', ['MTAD-013']);

	});

	describe('MTAD-024 -- Multiple Spellings for a Station', () => {

		tests.stationMessageTestByTag(event_messages.normal, CheckStationsParseMessageForExpected, 'Multiple Spellings Check', ['MTAD-024']);
	});

	describe('MTAD-026 -- Stations for Multiple Lines', () => {

		tests.stationTestByTag(stations.sharedStation, CheckStationsListForExpected, 'Lines share Station');
	});

	describe('MTAD-027 -- Match Abreviations with Original Stations', () => {

		tests.stationTestByTag(stations.nomDePlume, CheckStationsListForExpected, 'Alternate/Alias Names');
	});

	describe('MTAD-033 -- [Qs101-A22|Bk37-R49|Bx22-B342]', () => {
		tests.multiStationTokenTestByTag(event_messages.normal, checkMultiStationTokenForSingle, 'Choose [single station] from multi-station token', ['MTAD-033']);

		tests.multiStationTokenTestByTag(event_messages.normal, checkMultiStationTokenForExpected, 'Choose [correct station] from multi-station token', ['MTAD-033']);
	});

	describe('MTAD-040 -- 34, 42, 50, 59 and 66 Sts', () => {

		tests.stationTestByTag(event_messages.normal, CheckStationsListForExpected, 'Basic Bunched Stations Check', ['MTAD-040']);

		tests.stationTestByTag(event_messages.normal, CheckStationPrep, 'Basic Bunched Stations Prep', ['MTAD-040']);
	});

	describe('MTAD-046 -- Affected Boro', () => {

		tests.affectedBoroTestByTag(event_messages.normal, CheckAffectedBoroListForExpected, 'Detect Affected Boro using Stations', ['MTAD-046']);
	});

	describe('MTAD-056 -- Do not match only the second half on a hyphen-ed station', () => {

		tests.stationTestByTag(stations.false_positive, CheckStationsListForExpected, ' [-,/] 57 St-7 Av, Lexington Av/59 St');
	});

	describe('MTAD-060 -- Direction-bound stations should be added to a separate array.', () => {

		tests.boundStationTestByTag(event_messages.normal, CheckBoundStationsListForExpected, 'Detect Direction-Bound Stations', ['MTAD-060']);
	});

	describe('MTAD-090 -- Stations exclude Turtiary Copy', () => {
		tests.stationTestByTag(event_messages.normal, CheckStationsListExcludeAltInstructions, 'Detect only Stations in Main Message.', ['MTAD-090']);
	});

	describe('MTAD-098 -- Stations Followed by Boro Names should Provide Context', () => {
		tests.stationTestByTag(stations['MTAD-098'], CheckStationsListForExpected, 'Detect Direction-Bound Stations');
	});

	describe.skip('MTAD-004 -- Identify Multiple Stations with the same name.', () => {
		it('36 St', () => { });
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

	describe.skip('MTAD-032 -- Split Destination Stations', () => {
		tests.stationTestByTag(stations.splitDestinations, CheckStationsListForExpected, 'Alternate/Alias Names');
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


function CheckStationPrep (event) {
		let data = mtaStations.prepareBunchedStationNames(event.message);

		let results = false;
		let mocha_msg = event.message;

		expect(event).to.have.property('station_prep');

		// Make sure our results had an entry for this line before
		// we access that property, and a general error is thrown.
		expect(data).to.equal(event['station_prep']);

}


function CheckStationsListExcludeAltInstructions (event) {

		// Handle existing, old-style message data.
		if (typeof event.alt_instructions === 'string') {
			let alt_msg = event.alt_instructions;
			event.alt_instructions = {};
			event.alt_instructions.raw = alt_msg;
		}

		if (!event.alt_instructions) {
			event.alt_instructions = {};
		}

		// Break out any alternate route information from the body.
		event.alt_instructions.raw = mtaStatus.getMessageAlternateInstructions(event.message);

		event.message = (event.alt_instructions.raw !== null)
			? event.message.replace(event.alt_instructions.raw, '[-ALT-INSTRUCT-]')
			: event.message;

		return CheckStationsListForExpected(event, 'expect.stations_no_alt');
}


function CheckStationsListForExpected (event, data_path) {

	data_path = (!data_path)
		? 'stations' : data_path;

	let e_stations = _.get(event, data_path, false);

	if (e_stations === false) {
		expect(event, 'TEST MESSING path:' + data_path + '--' + event.message).to.not.equal(false);
	}

//	console.log(' >>> ', data_path, ' | ',  e_stations);

	return mtaStations.
		matchAllLinesRouteStationsMessage(event.line, event.message)
		.then( data => {

			let results = false;
			let mocha_msg = event.message;

//			console.log('\n\n V)', event.message);

			for (let l in e_stations) {
				results = true;

				if (Object.keys(e_stations[l].stations).length > 0) {
//					console.log(' >>> ', event.stations[l]);
//					console.log(' >>> . . . ', data.stations);
					// Make sure our results had an entry for this line before
					// we access that property, and a general error is thrown.
					expect(e_stations, event.message).to.have.property(l);
				}
				else {
//					expect(e_stations, event.message).not.to.have.property(l);
					continue;
				}

				let msg = '[' + l + '] -- ' + event.message;
				let stations_expected = Object.keys(_.get(event, data_path, {})[l].stations);
				let stations_found = Object.keys(data.stations[l].stations);

				// Message to help find data culprate.
				msg = '[' +stations_found.join(',') + '] <--> [' + stations_expected.join(',') + '] -- ' + msg;

				expect(stations_found, msg).to.have.members(stations_expected);
			}

			expect(results, 'Event should have at least one station -- ' + mocha_msg + event.line).to.equal(true);
		});
}


function CheckAffectedBoroListForExpected (event) {
	return mtaStations.
		matchAllLinesRouteStationsMessage(event.line, event.message)
		.then( data => {

			let boros = mtaStations.getBorosFromStations(data.stations);

			let results = false;
			let mocha_msg = event.message;

			for (let l in event.boro) {
				results = true;

				if (l !== 'global') {
					continue;
				}

				if (event.boro[l].length > 0) {
					// Make sure our results had an entry for this line before
					// we access that property, and a general error is thrown.
					expect(boros, event.message).to.have.property(l);
				}
				else {
					expect(boros, event.message).not.to.have.property(l);
					continue;
				}

				let msg = '[' + l + '] -- ' + event.message;
				let boros_expected = event.boro[l];
				let boros_found = boros[l];

				// Message to help find data culprate.
				msg = '[' + boros_found.join(',') + '] <--> [' + boros_expected.join(',') + '] -- ' + msg;

				expect(boros_found, msg).to.have.members(boros_expected);
			}

			expect(results, 'Event should have at least one affected boro -- ' + mocha_msg + event.line).to.equal(true);
		});
}


function CheckBoundStationsListForExpected (event) {
	return mtaStations.
		matchAllLinesRouteStationsMessage(event.line, event.message)
		.then( data => {

			let results = false;
			let mocha_msg = event.message;

			for (let l in event.bound) {
				results = true;

				if (Object.keys(event.bound[l].stations).length > 0) {
					// console.log(' >>> ', event.stations[l]);
					// Make sure our results had an entry for this line before
					// we access that property, and a general error is thrown.
					expect(data.bound, event.message).to.have.property(l);
				}
				else {
					expect(data.bound, event.message).not.to.have.property(l);
					continue;
				}

				let msg = '[' + l + '] -- ' + event.message;
				let stations_expected = Object.keys(event.bound[l].stations);
				let stations_found = Object.keys(data.bound[l].stations);

				// Message to help find data culprate.
				msg = '[' +stations_found.join(',') + '] <--> [' + stations_expected.join(',') + '] -- ' + msg;

				expect(stations_found, msg).to.have.members(stations_expected);
			}

			expect(results, 'Event should have at least one station -- ' + mocha_msg + event.line).to.equal(true);
		});
}


function multistationPrep(event) {
	expect(event, event.message).to.have.property('line');
	expect(event, 'Malformed Test Data for: "' + event.message + '"').to.have.property('route_change');
	expect(event.route_change, event.message).to.have.property('route');
}

function checkMultiStationTokenForExpected(event) {

	// Make sure the event is properly formatted.
	multistationPrep(event);

	// Get a train lines in main message.
	// Add them to the lines set for station parsing.
	let lines = mtaStatus.getMessageTrainLines(event.message);
	lines = _.union(event.line,lines);

	return mtaStatus.getStationsInEventMessage(lines, event.message)
		.then( data => {
			let m = mtaRouteChange.getRouteChange(data.parsed_message, event.line, true);
			m.original_data = data;
			return m;
		})
		.then( data => {
			if (!data) {
				console.error('\n\n\nNO ROUTE, but expected: ', event);
			}

			// Make sure the parsed message matches the expected.
			expect(data).to.have.property('message');
			expect(event.route_change).to.have.property('message');
			expect(data, event.message).to.have.property('route');
			expect(data.message).to.equal(event.route_change.message);

			event.route_change.route.map( (change, i) => {
				if (!change.test || !change.test.expected) {
					return;
				}

				let matches = false;

				let exp = change.test.expected;

				data.route.map( (e, i) => {

					if (_.isEqual(e.lines, change.lines)
						&& _.isEqual(e.along, change.along)
						&& _.isEqual(e.parsed, change.parsed)) {

						Object.keys(exp).map(ex => {

							switch(ex) {
								case 'bypass':
									let msg = 'bypass -- ' + data.message;
									expect(exp[ex], 'Bypass should be an array --- ' + event.message).to.be.an('array');
									exp[ex].map( val => {
										if (e.bypass.indexOf(val) === -1) {
											console.log('<!> ', data.message, '\n\n',
												'Expected to include:', val, ' -in- ', e.bypass);
										}
										expect(e.bypass, msg).to.contain(val);
									});
									break;

								case 'from':
								case 'to':
									expect(e.from, ex + ' -- ' + data.message).to.equal(exp[ex]);
									break;
							}
						});
					}
				});
			});
		});
}

function checkMultiStationTokenForSingle(event) {

	// Make sure the event is properly formatted.
	multistationPrep(event);

	let all_promises = event.route_change.route.map(r => mtaRouteChange.analyzeStationArray(r));

	return Promise.all(all_promises)
		.then( data => {

				for (let index in data) {
					let types = [
							{f: 'from', type: 'string'},
							{f: 'to', type: 'string'},
							{f: 'bypass', type: 'object'}
						],
						r = data[index];

					// Ensure all involved station fields are strings.
					for (let t in types) {
						if (r[t.f] === undefined) {
							continue;
						}

					  expect( (typeof r[t.f]), 'Field "' + t.f + '" should be a ' + t.type + ' type.').to.equal(t.type);

						// Bypass should be an array of strings.
						if (t.f === 'bypass' && r['bypass'].length > 0) {
							r[t.f].map(item => {
								expect( (typeof item), 'Bypass item "' + item + '" should be a string.').to.equal('string');
							});
						}
					};

			};
		});
}
