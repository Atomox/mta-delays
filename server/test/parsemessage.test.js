let assert = require('assert');
let expect = require('chai').expect;

let tests = require('./mta.test');
let mtaStatus = require('../mta.event');
let mtaDates = require('../mta.dates');

// Test data.
let status_dates = require('../data/test/test.dates').dateMessages;
let event_messages = require('../data/test/test.messages').event_messages.structured;
let taxonomy = require('../data/test/test.taxonomy').taxonomy;

let s = status_dates;
let f = mtaDates.getMessagePlannedWorkDate;
let e = event_messages;
let t = taxonomy;


describe('Parse Service Messages', function() {

	describe('Parse Planned Work Dates inside messages.', function() {

		tests.plannedWorkDurrationTestByTag(e.normal, testParsePlannedWorkDates, 'Should Parse [basic] Planned Work Posted dates from messages.');

/**
 * @TODO
 */
//		tests.plannedWorkTestByTag(e.complex, testParsePlannedWorkDates, 'Should Parse [complex] Planned Work Posted dates from messages.');
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
		tests.dateTestByTag(e.normal, testTimeTag, 'Should Parse Weekends', ['MTAD-118'], null, ['weekend']);
		tests.dateTestByTag(e.normal, testTimeTag, 'Should Parse Weekdays', ['MTAD-118'], null, ['week_day']);
		tests.dateTestByTag(e.normal, testTimeTag, 'Should Parse All Times', ['MTAD-118'], null, ['all_times']);
	});


	describe('Should Separate messages', () => {

		tests.altInstrTestByTag(e.normal, testAltInstructions, 'Should split simple message [alternate travel]');

		tests.adMessageTestByTag(e.normal, testAdMessage, 'MTAD-012 -- Should split simple acessability messages [AD]', ['MTAD-012']);

//		tests.altInstrTestByTag(e.complex, testAltInstructions, 'Should split complex messages [alternate travel].');
	});


	describe('Taxonomy', () => {
		testTaxonomy(t.text, t.library, 'MTAD-053 -- Taxonomy Should Handle Regex');
	});




	/**
	 * Test a string that contains only a date, and make sure the Date Regex catches the entire thing.
	 * @param  {string} desc
	 *   Description for the Test Heading
	 * @param  {Array} DateArr
	 *   Array of date strings we should test.
	 */
	function testParsePlannedWorkDates(event) {

		let result = mtaDates.getMessagePlannedWorkDate(event.message);

		// @TODO
		//   Until we convert all old date to an object,
		//   we need to handle durration objects vs depricated strings.
		(typeof event.durration === 'object')
			? expect(result, event.message).to.equal(event.durration.parsed)
			: expect(result, event.message).to.equal(event.durration);
	}


	/**
	 * Parse non-event simple text,
	 * and assert planned work dates parse the entire text.
	 */
	function testParseDate(txt) {
		let result = f(txt);
		assert.equal(txt, result);
	}


	/**
	 * Check parsed durrations to be tagged with expected date tags.
	 */
	function testTimeTag(event) {

		let txt = (event.message_raw) ? event.message_raw : event.message;
		let date = mtaDates.getMessageDates(txt);

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


	/**
	 * Check that alternate travel instructions are parsed from the event message.
	 */
	function testAltInstructions(event) {

		if (!event.alt_instructions) { return; }
		let result = mtaStatus.getMessageAlternateInstructions(event.message);

		expect(result).to.equal(event.alt_instructions);
	}


	/**
	 * Check that AD (accessability messaging) tags are parsed from the message.
	 */
	function testAdMessage(event) {

		let result = mtaStatus.getMessageADNote(event.message);
		expect(result, event.message).to.equal(event.ad_message);
	}


	/**
	 * Test taxonomy regex evaluates the matched text.
	 *
	 * @param  {array} text
	 *   Text array from the taxonomy test data.
	 * @param  {array} library
	 *   Library array from the taxonomy test data.
	 */
	function testTaxonomy(text, library, desc) {

		it (desc, function() {
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
	}

});
