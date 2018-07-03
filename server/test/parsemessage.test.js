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

		testDates('Should find basic [weekdays] planned work dates.', s.weekdays.simple);
		testDates('Should find basic [weekend] planned work dates.', s.weekend.simple);
		testDates('Should find [multi-weekend] planned work dates.', s.weekend.multiweekend);
		testDates('Should find [complex] planned work dates.', s.weekend.complex);
		testDates('Should find [multi-weekday] planned work dates.', s.weekdays.multiweek);
		testDates('Should find [long-term] planned work dates.', s.longterm.simple);
		testDates('Should find [unique] planned work dates, like Holidays.', s.weekend.unique);

		testDates('MTAD-072 -- Should find 2018 updated dates, by Month/Day', s.updated_2018.simple);
	});

	describe('MTAD-118 -- Tag messages by Time Tag', () => {
		tests.basicTestByTag(event_messages.normal, testTimeTag, 'Should Parse Weekends', ['MTAD-118']);
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

	function testTimeTag(event) {
		/**
		 *
		 * Filter messages....
		 */
		// console.log(' >>> ', event.message, '\n');

		let date = mtaStatus.getMessageDates(event.message);

		console.log(' ... ', date, '\n');

		/**
		 *
		 *
		 *
		 *
		 *   *
		 *   *
		 *   *
		 *   *
		 *   *
		 *   *
		 *   *
		 * @TODO
		 *   * 1. Pass message to time tag in mta.events,
		 *   * 2. Assert results are contained within the event object.
		 *   *
		 *   *
		 *   *
		 *   *
		 *   *
		 *   *
		 *   *
		 *   *
		 *
		 *
		 *
		 */

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
