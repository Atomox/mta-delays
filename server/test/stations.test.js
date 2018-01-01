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

	describe('Parse Stations on the [R Line]', () => {

		it ('Should Identify stations in a message on the R Line.', () => {
			
			let promises = r_train_msg.map( event => {
				return mtaStations.matchRouteStationsMessage('R', event.message)
					.then( stations => {
//						console.log(' --> ', event.stations, '...', stations);
			
						expect(Object.values(stations.stations)).to.have.members(event.stations);
					});
			});
			
			return Promise.all(promises);
		});
	});

	describe('Build Stations Object', () => {
		it ('Should match the Stations Object', () => {

			let promises = event_messages.normal.map( event => {
				// Only process Route Changes.
				if (!event.type_detail || !event.stations || !event.line) { return;}

				return mtaStatus.
					getStationsInEventMessage(event.line, event.message)
					.then( data => {
						
						let results = false;
						let mocha_msg = event.message;


//						console.log('----------- [', event.message ,'] -----------');
						
						for (let l in event.stations) {
//							console.log('Stations :::', l , ':::', data.stations[l]); 
							results = true;

							let msg = '[' + l + '] ' + event.message;

//							expect(data, my_mocha_msg).to.have.property('stations');
//							expect(data, my_mocha_msg).to.have.property('parsed_message');
//							expect(data.stations, my_mocha_msg).to.have.property(l);
							let stations_expected = Object.keys(event.stations[l].stations);
							let stations_found = Object.keys(data.stations[l].stations);

							expect(stations_found, 
								msg + stations_found.join(','))
								.to.have.members(stations_expected);
						}

						expect(results, 'Event should have at least one station -- ' + mocha_msg).to.equal(true);
					})
					.catch(err => {
						throw new Error(err);
					});
			});
			
			return Promise.all(promises);
		});
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
				expect(res).to.equal(i);
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