let assert = require('assert');
let expect = require('chai').expect;
let _ = require('lodash');

// Project files & test data.
const tests = require('./mta.test');
const mtaStatus = require('../mta.event');
const mtaStations = require('../mta.stations');
const mtaRouteChange = require('../mta.route_change');

let event_messages = require('../data/test/test.messages').event_messages.structured;


describe ('Detect Train Lines', () => {

	let m = event_messages.normal;
	let c = testStationLineRerouteObject;

	describe('MTAD-001 -- Line Changes', () => {

		tests.routeTestByTag(m,c,'[Basic Route Changes] Should Map', ['MTAD-001'], ['MTAD-004', 'MTAD-006', 'MTAD-009', 'MTAD-011', 'MTAD-014']);

		describe('Route Patterns', () => {
			tests.routeTestByTag(m,c,'A-overC', ['MTAD-001'], null, ['A-overC']);
			tests.routeTestByTag(m,c,'A-overC-thenD', ['MTAD-001'], null, ['A-overC-thenD']);
			tests.routeTestByTag(m,c,'AB-overC', ['MTAD-001'], null, ['AB-overC']);
			tests.routeTestByTag(m,c,'A-overC-D-overE', ['MTAD-001'], null, ['A-overC-D-overE']);
			tests.routeTestByTag(m,c,'AB-overC-D-overE', ['MTAD-001'], null, ['AB-overC-D-overE']);
			tests.routeTestByTag(m,c,'After1-A-over-C', ['MTAD-168'], null, ['After1-A-overC'])
//		tests.routeTestByTag(m,c,'Multiple Patterns', ['MTAD-001'], null, '#any-two');

		});
	});

	describe('MTAD-002/159 -- Running Local / Express', () => {
		tests.routeTestByTag(m,c,'[Running Express/Local] Should Map', ['MTAD-002']);
		tests.routeTestByTag(m,c,'[Running on the Express/Local Track] Should Map', ['MTAD-159']);
	});

	describe('MTAD-003 -- Map Stations from Route Change', () => {
		it ('Route Change -- New Stations', () => {});
		it ('Route Change -- Bypassed Stations', () => { });
	});

	describe('MTAD-006 -- Detect Stations from Alternate Line', () => {
		tests.routeTestByTag(m,c,'Off-Line Stations Should Map', ['MTAD-006'], ['MTAD-014']);
	});
	describe('MTAD-009 -- Split Service Route Change', () => {
		tests.routeTestByTag(m,c,'A-1-operates-2-operates', ['MTAD-009'], null, ['A-1-operates-2-operates']);
		tests.routeTestByTag(m,c,'A-1-operates-then-viaC-2-operates', ['MTAD-009'], null, ['A-1-operates-then-viaC-2-operates']);
		tests.routeTestByTag(m,c,'A-1-operates-then-viaC-viaD-2-operates', ['MTAD-009'], null, ['A-1-operates-then-viaC-viaD-2-operates']);
		tests.routeTestByTag(m,c,'A-1-operates-2-operates-then-viaC', ['MTAD-009'], ['MTAD-032'], ['A-1-operates-2-operates-then-viaC']);
	});
	describe('MTAD-010 -- Route Change, then end.', () => {
		tests.routeTestByTag(m,c,'A-overC-end', ['MTAD-010'], null, ['A-overC-end']);
		tests.routeTestByTag(m,c,'AB-overC-end', ['MTAD-001'], null, ['AB-overC-end']);
		tests.routeTestByTag(m,c,'A-overC-thenD-end', ['MTAD-001'], null, ['A-overC-thenD-end']);
		tests.routeTestByTag(m,c,'AB-endAt-1-or-2', ['MTAD-010'], null, ['AB-endAt-1-or-2']);
		tests.routeTestByTag(m,c,'A-endAt-1-or-2', ['MTAD-010'], null, ['A-endAt-1-or-2']);
		tests.routeTestByTag(m,c,'A-endAt-1', ['MTAD-010'], null, ['A-endAt-1']);
	});


	describe('MTAD-014 -- Line Operate Between, then Route Change', () => {
		tests.routeTestByTag(m,c,'A-operates-then-overC', ['MTAD-014'], null, ['A-operates-then-overC']);
		tests.routeTestByTag(m,c,'A-operates-then-overC-thenD', ['MTAD-014'], null, ['A-operates-then-overC-thenD']);
	});

	describe('MTAD-034 -- Line Operates Between', () => {
		tests.bypassTestByTag(m,c,'[Trains Operate Between (No Route Change)] Should Map', ['MTAD-034']);
	});
	describe('MTAD-035 -- No Trains Between / Service Suspended', () => {
		tests.bypassTestByTag(m,c,'[No Trains Partial] Should Map', ['MTAD-035']);
	});

	describe('MTAD-047 -- Trains Bypass Stations', () => {
		tests.bypassTestByTag(m,c,'[Bypass Stations -- Simple] Should Map', ['MTAD-047']);
	});

	describe('MTAD-107 -- A over C in Boro', () => {
		tests.bypassTestByTag(m,c,'[Over line in Boro] Should Map', ['MTAD-107'], null, ['A-overC-inBoro']);
	});
});






// 'Southbound [Q] trains are stopping along the [R] line from [Mn623-R23] to [Bk26-R30]',
// 'Southbound [D] trains are stopping along the [C] line from [Mn614-A24] to [Mn167-A32] then along the [F] line to [Bk58-D43].',
// 'Some northbound [A] and [C] trains are stopping along the [F] line from [Bk636-A41] to [Mn167-A32]',
// 'Northbound [F] trains are stopping along the [A] line from [Bk636-A41] to [Mn611-A27], then stopping along the [E] line to [Qs616-G14].',


function testStationLineRerouteObject(event) {

	// Make sure the parsed message matches the expected.
	expect(event, 'Test data missing a message').to.have.property('message');

	// Get a train lines in main message.
	// Add them to the lines set for station parsing.
	let lines = mtaStatus.getMessageTrainLines(event.message);
	lines = _.union(event.line,lines);

	return mtaStatus.getStationsInEventMessage(lines, event.message)
		.then( data => (data.parsed_message) ? data : Promise.reject(event.message + 'has no stations!!!') )
		.then( data => {
			// Debug Parse Stations Message.
//			console.log('\n\n', data, '\n\n');

			let m = mtaRouteChange.getRouteChange(data.parsed_message, event.line, true);
			m.original_data = data;
			return m;
		})
		.then( data => {
			if (!data) {
				console.error('\n\n\nNO ROUTE, but expected: ', event);
			}


//			console.log('\n\n', data, '\n\n');

			// Make sure the parsed message matches the expected.
			expect(data).to.have.property('message');
			expect(event, 'Malformed Test Data for: "' + event.message + '"').to.have.property('route_change');
			expect(event.route_change).to.have.property('message');

			// Find a route in the first place.
			expect(data, event.message).to.have.property('route');

			if (data.message !== event.route_change.message) {
				console.error('\n\n\n', data,'\n\n');
			}

// console.log('\n\n', data, '\n\n');

			// Make sure the parsed message matches the expected.
			expect(data.message).to.equal(event.route_change.message);

			event.route_change.route.map( (change, i) => {
				let matches = false;

				data.route.map( (e, i) => {

					if (_.isEqual(e.lines, change.lines)) {

						if (_.isEqual(e.along, change.along)
							&& _.isEqual(e.from, change.from)
							&& _.isEqual(e.to, change.to)) {
							matches = true;
						}

						if (!matches) {
							let diff = tests.diffObjectsLeft(change, e);
							if (diff === true) {
								matches = true;
							}
						}
					}
				});

				if (!matches) {

					console.log('\n', '<!> MATCH FAILED -- (message -- actual/expected)', '\n',
						data.message, '\n',
						'returned: ', data.route, '\n',
						'expected: ', event.route_change.route, '\n\n');

					expect(data.route, data.message).to.contain(change);
				}
			});
		});
}
