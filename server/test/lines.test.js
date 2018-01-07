let assert = require('assert');
let expect = require('chai').expect;
let _ = require('lodash');

// Project files & test data.
let mtaStatus = require('../mta.event');
let mtaStations = require('../mta.stations');
let event_messages = require('../data/test/test.messages').event_messages.structured;


describe ('Detect Train Lines', () => {

	describe('MTAD-001 -- Line Changes', () => {

		routeTestByTag('[Basic Route Changes] Should Map', ['MTAD-001'], ['MTAD-004', 'MTAD-006', 'MTAD-011', "MTAD-014"]);

		describe('Route Patterns', () => {

			routeTestByTag('A-overC', ['MTAD-001'], null, ['A-overC']);
			routeTestByTag('A-overC-thenD', ['MTAD-001'], null, ['A-overC-thenD']);
			routeTestByTag('AB-overC', ['MTAD-001'], null, ['AB-overC']);
			routeTestByTag('AB-overC-end', ['MTAD-001'], null, ['AB-overC-end']);
			routeTestByTag('A-overC-D-overE', ['MTAD-001'], null, ['A-overC-D-overE']);
			routeTestByTag('AB-overC-D-overE', ['MTAD-001'], null, ['AB-overC-D-overE']);
			routeTestByTag('A-operates-then-overC-thenD', ['MTAD-001'], null, ['A-operates-then-overC-thenD']);
//			routeTestByTag('Multiple', ['MTAD-001'], null,null);

		});
		it ('Line Changes -- Patterns', () => {});
	});

	describe('MTAD-002 -- Running Local', () => {	});
	describe('MTAD-003 -- Map Stations from Route Change', () => {
		it ('Route Change -- New Stations', () => {});
		it ('Route Change -- Bypassed Stations', () => { });
	});

	describe('MTAD-006 -- Detect Stations from Alternate Line', () => {});
	describe('MTAD-009 -- Split Service Route Change', () => {});
	describe('MTAD-010 -- Route Change, then end.', () => { });

	describe('MTAD-014 -- Line Changes, Complex', () => {
		it.skip ('Line Changes -- Operates Between A & B, then via [line] from C to D', () => {
			let promises = event_messages.normal.map( event => {
				// Only process Route Changes.
				if (filterTest(event, 'route_change', ['MTAD-014'])) {
					return testStationLineRerouteObject(event);
				}
			});
			return Promise.all(promises);
		});
	});
});




// 'Southbound [Q] trains are stopping along the [R] line from [Mn623-R23] to [Bk26-R30]',
// 'Southbound [D] trains are stopping along the [C] line from [Mn614-A24] to [Mn167-A32] then along the [F] line to [Bk58-D43].',
// 'Some northbound [A] and [C] trains are stopping along the [F] line from [Bk636-A41] to [Mn167-A32]',
// 'Northbound [F] trains are stopping along the [A] line from [Bk636-A41] to [Mn611-A27], then stopping along the [E] line to [Qs616-G14].',


function testStationLineRerouteObject(event) {
	return mtaStatus.getStationsInEventMessage(event.line, event.message)

		.then( data => mtaStatus.getRouteChange(data.parsed_message, event.line, true))
		.then( data => {
			expect(data).to.have.property('route');
			expect(data.message).to.equal(event.route_change.message);

			event.route_change.route.map( (change, i) => {
				let matches = false;

				data.route.map( (e, i) => {
	//								console.log('Checking: ', e.lines, 'against', change.lines);
					if (_.isEqual(e.lines, change.lines)) {
//						console.log('MATCH', e, 'with', change);
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
}

function routeTestByTag(description, main_tags, omit_tags, route_tags) {
	let counter = 0;
	let total = event_messages.normal.length;
	let m = [];

	// Get tests to run:
	let my_tests = event_messages.normal.map( event => {
		if (filterTest(event, 'route_change',	main_tags, omit_tags)) {
			if (!route_tags || filterTestSubsection(event, 'route_change', route_tags)) {
				counter++;
				m.push(event);
			}
		}
	});

	// Add the # of events to the description.
	description = description + '  ' + '(' + counter + '/' + total + ')';

	it (description, () => {
		let promises = m.map( event => testStationLineRerouteObject(event) );
		return Promise.all(promises);
	});
}

function filterTestSubsection(obj, property, tags, omit) {
	return (obj[property] && obj[property].hasOwnProperty('tag'))
		? filterTags(obj[property].tag, tags, omit)
		: false;
}

function filterTags(tags, include, exclude) {
	// If tags, make sure all exist.
	if (Array.isArray(include)) {
		for (let t in include) {
			if (tags.indexOf(include[t]) === -1) {	return false; }
		}
	}
	// If omit tags, make sure none exist.
	if (Array.isArray(exclude)) {
		for (let t in exclude) {
			if (tags.indexOf(exclude[t]) !== -1) {	return false; }
		}
	}

	return true;
}

function filterTest(event, type, tags, omit) {

	// event must be an object.
	if (!event) {	return false;	}

	// If filters by tag, we must have a non-empty tags property.
	if (typeof tags == 'object' && tags && tags.length > 0 && !event.tag) {
			return false;
	}

	switch (type) {
		case 'route_change':
			if (!event.type_detail
				|| event.type_detail.indexOf('route_change') === -1
				|| !event.route_change) {
					return false;
				}
				break;

		default:
				// skip
				break;
	}

	if (filterTags(event.tag, tags, omit) === false) {	return false;	}

//	console.log(' <!!!!> ', 'Message found without ', omit ,' and with', tags, '\nActual tags:', event.tag);
	return true;
}
