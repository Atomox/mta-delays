let assert = require('assert');
let expect = require('chai').expect;

let _ = require('lodash');

let mtaStatus = require('../mta.event');
let mtaStations = require('../mta.stations');

let event_messages = require('../data/test/test.messages').event_messages.structured;


describe ('Detect Train Lines', function() {
	describe.skip('Detect line changes in a status message', () => {
		
		it ('Detect diversions to other lines', () => {
			
			let promises = event_messages.normal.map( event => {
				// Only process Route Changes.
				if (!event.type_detail
					|| event.type_detail.indexOf('route_change') === -1
					|| !event.route_change) { 
					return; }
		
				return mtaStatus.
					getMessageRouteChange(event.message, event.line)
					.then( data => expect(data).to.equal(event.route_change.message_raw));
			});
			
			return Promise.all(promises);
		});
	});
	describe('Detect line change specifics', () => {
		it ('Determine the rerouted line, start and end stations', () => {
			let promises = event_messages.normal.map( event => {
				// Only process Route Changes.
				if (!event.type_detail
					|| event.type_detail.indexOf('route_change') === -1
					|| !event.route_change) { return; } 

				return mtaStatus.getStationsInEventMessage(event.line, event.message)

					.then( data => mtaStatus.getRouteChange(data.parsed_message, event.line, true) )
					.then( data => {
						expect(data).to.have.property('route');
						expect(data.message).to.equal(event.route_change.message);

//						console.log('\n\n', data.route);
						event.route_change.route.map( (change, i) => {
							// expect(data.route).to.deep.contain(change);
							let matches = false;

							data.route.map( (e, i) => {
//								console.log('Checking: ', e.lines, 'against', change.lines);
								if (_.isEqual(e.lines, change.lines)) {
									console.log('MATCH', e, 'with', change);
									if (e.along == change.along
										&& e.from == change.from
										&& e.to == change.to) {
										matches = true;
									}
								}

							});
							if (!matches) {
								console.log('\n', '<!> MATCH FAILED -- (message -- actual/expected)', '\n', 
									data.message, '\n',
									'returned: ', data.route, '\n', 
									'expected: ', event.route_change.route, '\n\n');
								expect(data.route, data.message).to.have.contain(change);
							}
						});
					});

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
			});
			return Promise.all(promises);
		});
	});
	describe('Determine which line trains are on.', () => {

	});
});