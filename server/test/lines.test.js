let assert = require('assert');
let expect = require('chai').expect;

let mtaStatus = require('../mta.event');
let mtaStations = require('../mta.stations');


describe.skip ('Detect Train Lines', function() {
	describe('Determine which line trains are on.', () => {

		it.skip ('Detect a train on its normal lines.', () => {
			expect(line).to.equal(otherLine);
		});
		it ('Detect diversions to other lines.', () => {
			for (let x in event_messages.normal) {
				if (event_messages.normal[x].type_detail.indexOf('route_change') === -1) { continue; }

				let result = mtaStatus.getMessageRouteChange(event_messages.normal[x].message, line);

				expect(result).to.equal(false);
			}
		});
	});
});