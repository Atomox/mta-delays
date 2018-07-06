let assert = require('assert');
let expect = require('chai').expect;

let tests = require('./mta.test');
let mtaStatus = require('../mta.event');

// Test data.
let status_dates = require('../data/test/test.dates').dateMessages;
let event_messages = require('../data/test/test.messages').event_messages.structured;

let s = status_dates;
let f = mtaStatus.getMessagePlannedWorkDate;


describe('Parse Service Messages', function() {

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

		tests.basicTest(s.weekdays.simple, testParseDate, 'Should find basic [weekdays] planned work dates.');
		tests.basicTest(s.weekend.simple, testParseDate, 'Should find basic [weekend] planned work dates.');
		tests.basicTest(s.weekend.multiweekend, testParseDate, 'Should find [multi-weekend] planned work dates.');
		tests.basicTest(s.weekend.complex, testParseDate, 'Should find [complex] planned work dates.');
		tests.basicTest(s.weekdays.multiweek, testParseDate, 'Should find [multi-weekday] planned work dates.');
		tests.basicTest(s.longterm.simple, testParseDate, 'Should find [long-term] planned work dates.');


		tests.basicTest(s.weekend.unique, testParseDate, 'Should find [unique] planned work dates, like Holidays.');


		tests.basicTest(s.updated_2018.simple, testParseDate, 'MTAD-072 -- Should find 2018 updated dates, by Month/Day');
	});

	describe('MTAD-118 -- Tag messages by Date Tag', () => {
		tests.dateTestByTag(event_messages.normal, testTimeTag, 'Should Parse Weekends', ['MTAD-118'], null, ['weekend']);
		tests.dateTestByTag(event_messages.normal, testTimeTag, 'Should Parse Weekdays', ['MTAD-118'], null, ['week_day']);
		tests.dateTestByTag(event_messages.normal, testTimeTag, 'Should Parse All Times', ['MTAD-118'], null, ['all_times']);
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

	/**
	 * Test a string that contains only a date, and make sure the Date Regex catches the entire thing.
	 * @param  {string} desc
	 *   Description for the Test Heading
	 * @param  {Array} DateArr
	 *   Array of date strings we should test.
	 */
	function testDates(desc, DateArr) {

		let count = DateArr.length,
			description = desc + ' ' + '(' + count + '/' + count + ')';

		it (description, function() {
			for (let x in DateArr) {
				let result = f(DateArr[x]);
				assert.equal(DateArr[x], result);
			}
		});
	}

	function testParseDate(txt) {
		let result = f(txt);
		assert.equal(txt, result);
	}

	function testTimeTag(event) {

		let txt = (event.message_raw) ? event.message_raw : event.message;
		let date = mtaStatus.getMessageDates(txt);

		expect(event).to.have.property('expect');

		if (event.expect
			&& event.expect.durration
			&& event.expect.durration.tags) {

			expect(date).to.have.property('tags');
			expect(date.tags).to.be.an('array');
			expect(event.expect.durration.tags).to.be.an('array');
			expect(date.tags, txt).to.have.members(event.expect.durration.tags);
		}

	}


	describe('Taxonomy', () => {
		it ('MTAD-053 -- Taxonomy Should Handle Regex', function() {

			let text = [
					{
						txt: 'signal problems',
						expect: {
							text: ['signal_problems'],
							regex: ['signal_problems'],
							mixed: ['signal_problems'],
						},
					},
					{
						txt: 'route change',
						expect: {
							text: ['route_change'],
							regex: ['route_change'],
							mixed: ['route_change'],
						},
					},
					{
						txt: 'routechange',
						expect: {
							text: [],
							regex: ['route_change'],
							mixed: ['route_change'],
						},
					},
					{
						txt: 'some [A] running over the [F] from ... to ...',
						expect: {
							text: [],
							regex: ['route_change'],
							mixed: ['route_change'],
						},
					},
				],
				library = {
					text: {
						wrapper: {
							'signal_problems': ['signal problems'],
							'route_change': ['route change']
						}
					},
					regex: {
						wrapper: {
							'signal_problems': [/signal\s*problems/i],
							'route_change': [
								/route\s*change/i,
								/running\s*over\s*the\s*\[[A-Z0-9]\]/i,
							]
						}
					},
					mixed: {
						'wrapper': {
							'signal_problems': ['signal problems', /signal\s*problems/i],
							'route_change': [
								'route change',
								/route\s*change/i,
								/running\s*over\s*the\s*\[[A-Z0-9]\]/i,
							]
						}
					},
				};
			Object.keys(library).map( (l) => {
				text.map( o => {
					let tmp = mtaStatus.getMessageAction(o.txt, null, library[l]),
						msg = o.txt + ' should contain ' + o.expect + ', but found ' + tmp;

					expect(tmp, l + ' (type) : ' + msg).to.be.an('array');
					expect(o.expect[l]).to.be.an('array');
					expect(tmp, 'For method ' + l).to.have.members(o.expect[l]);
				});
			});
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
