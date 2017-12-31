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
					return mtaStatus.getMessageRouteChange(event.message, event.line)
						.then( data => expect(data).to.equal(event.route_change));
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

					return mtaStatus.getRouteChange(event.message, event.line)
						.then( data => console.log(event.line, '----->' ,data));
				}
			});
			return Promise.all(promises);
		});
	});
	describe('Determine which line trains are on.', () => {

	});
});