let assert = require('assert');
let expect = require('chai').expect;

var mtaStatus = mtaStatus || require('../mta.event');

// Test data.
let status_dates = require('../data/test/test.dates').dateMessages;
let event_messages = require('../data/test/test.messages').event_messages.structured;



describe('Parse Service Messages', function() {

	describe('Parse Interruption Dates', () => {

		it.skip ('Should Parse basic Posted dates from service interruptions.', () => {
			for (let x in event_messages.normal) {
				if (event_messages.normal[x].type === 'PlannedWork') { continue; }

				let result = mtaStatus.getMessageDateTime(event_messages.normal[x].message);

				expect(result).to.equal(event_messages.normal[x].time);
			}
		});
	});

	describe('Parse Planned Work Dates inside messages.', function() {
		
		it ('Should Parse [basic] Planned Work Posted dates from messages.', () => {
			for (let x in event_messages.normal) {
				if (event_messages.normal[x].type !== 'PlannedWork') { continue; }

				let result = mtaStatus.getMessagePlannedWorkDate(event_messages.normal[x].message);

				expect(result).to.equal(event_messages.normal[x].durration);
			}
		});
		it.skip ('Should Parse [complex] Planned Work Posted dates from messages.', () => {
			for (let x in event_messages.complex) {
				if (event_messages.complex[x].type !== 'PlannedWork') { continue; }

				let result = mtaStatus.getMessagePlannedWorkDate(event_messages.complex[x].message);

				expect(result).to.equal(event_messages.complex[x].durration);
			}
		});
	});

	describe('Parse Planned Work Dates', () => {
		
		let s = status_dates;
		let f = mtaStatus.getMessagePlannedWorkDate;

		it ('Should find basic [weekdays] planned work dates.', function() {
			for (let x in s.weekdays.simple) {
				let result = f(s.weekdays.simple[x]);
				assert.equal(s.weekdays.simple[x], result);
			}
		});

		it ('Should find basic [weekend] planned work dates.', function() {
			for (let x in s.weekend.simple) {
				let result = f(s.weekend.simple[x]); 
				assert.equal(s.weekend.simple[x], result);
			}
		});

		it ('Should find [multi-weekend] planned work dates.', function() {
			for (let x in s.weekend.multiweekend) {
				let result = f(s.weekend.multiweekend[x]); 
				assert.equal(s.weekend.multiweekend[x], result);
			}
		});

		it ('Should find [complex] planned work dates.', function() {
			for (let x in s.weekend.complex) {
				let result = f(s.weekend.complex[x]); 
				assert.equal(s.weekend.complex[x], result);
			}
		});

		it ('Should find [multi-weekday] planned work dates.', function() {
			for (let x in s.weekdays.multiweek) {
				let result = f(s.weekdays.multiweek[x]); 
				assert.equal(s.weekdays.multiweek[x], result);
			}
		});

		it ('Should find [long-term] planned work dates.', function() {
			for (let x in s.longterm.simple) {
				let result = f(s.longterm.simple[x]); 
				assert.equal(s.longterm.simple[x], result);
			}
		});

		it ('Should find [unique] planned work dates, like Holidays.', function() {
			for (let x in s.weekend.unique) {
				let result = f(s.weekend.unique[x]);
				expect(s.weekend.unique[x]).to.equal(result);
			}
		});

	});


	describe('Should Separate messages', () => {
		it ('Should split simple message [alternate travel].', function() {
			for (let x in event_messages.normal) {
				if (!event_messages.normal[x].alt_instructions) { continue; }
				let result = mtaStatus.getMessageAlternateInstructions(event_messages.normal[x].message);

				expect(result).to.equal(event_messages.normal[x].alt_instructions);
			}
		});
		it.skip ('Should split complex messages [alternate travel].', function() {
			for (let x in event_messages.complex) {
				if (!event_messages.complex[x].alt_instructions) { continue; }
				let result = mtaStatus.getMessageAlternateInstructions(event_messages.complex[x].message);

				expect(result).to.equal(event_messages.complex[x].alt_instructions);
			}
		});
	});


	describe('Parse Event Messages', () => {

		it ('Should Parse simple planned event messages.', function() {
//			assert.equal(status_dates.longterm.simple[x], result);
		});

		it ('Should Parse complex planned event messages.', function() {
//			assert.equal(status_dates.longterm.simple[x], result);
		});

		it ('Should Parse service change event messages.', function() {
//			assert.equal(status_dates.longterm.simple[x], result);
		});

	});
});