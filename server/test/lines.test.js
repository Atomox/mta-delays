let assert = require('assert');
let expect = require('chai').expect;

let mtaStatus = require('../mta.event');
let mtaStations = require('../mta.stations');

let event_messages = require('../data/test/test.messages').event_messages.structured;


describe ('Detect Train Lines', function() {
	describe('Detect line changes in a status message', () => {
		
		it ('Detect diversions to other lines', () => {
			
			let promises = event_messages.normal.map( event => {
				// Only process Route Changes.
				if (event.type_detail && event.type_detail.indexOf('route_change') !== -1) { 
		

					return mtaStatus.
						getMessageRouteChange(event.message, event.line)
						.then( data => expect(data).to.equal(event.route_change.message));
				}
			});
			
			return Promise.all(promises);
		});
	});
	describe('Detect line change specifics', () => {
		it ('Determine the rerouted line, start and end stations', () => {
			let promises = event_messages.normal.map( event => {
				// Only process Route Changes.
				if (event.type_detail && event.type_detail.indexOf('route_change') !== -1) { 

					return mtaStatus.getStationsInEventMessage(event.line, event.message)

						.then( data => mtaStatus.getRouteChange(data.parsed_message, event.line, true) )
						.then( data => expect(data.message).to.equal(event.route_change.message))


// 'Southbound [Q] trains are stopping along the [R] line from [Mn623-R23] to [Bk26-R30]',
// 'Southbound [D] trains are stopping along the [C] line from [Mn614-A24] to [Mn167-A32] then along the [F] line to [Bk58-D43].',
// 'Some northbound [A] and [C] trains are stopping along the [F] line from [Bk636-A41] to [Mn167-A32]',
// 'Northbound [F] trains are stopping along the [A] line from [Bk636-A41] to [Mn611-A27], then stopping along the [E] line to [Qs616-G14].',


						/**
						 *
						 *  @TODO
						 *    *
						 *    * IN PROGRESS -- 
						 *    *
						 *    *
						 *    *
						 *    *
						 *    *
						 * 
						 */


				}
			});
			return Promise.all(promises);
		});
	});
	describe('Determine which line trains are on.', () => {

	});
});