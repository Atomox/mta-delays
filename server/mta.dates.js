const _union = require('lodash').union;
const moment = require('moment');

const mtaRegEx = require('./includes/regex');
const mtaTaxonomy = require('./data/static/mta.taxonomy');


/**
 * Find any work dates in planned work messaging.
 *
 * @param [string] text
 *   The event message.
 *
 * @return [string|null]
 *   A work-date string. Otherwise, [null].
 */
function getMessagePlannedWorkDate(text) {
	let workDatePattern = /(?:\b(?:(?:Weekend[s]?|Late\s*Night[s]?|Night[s]?|Day[s]?|Late\s*Evening[s]?|Evening[s]?|Rush\s*Hour[s]?|All\s*times|Until|Except|(?:Jan|January|Feb|February|Mar|March|Apr|April|May|Jun|June|Jul|July|Aug|August|Sept|September|Oct|October|Nov|November|Dec|December)\s*[0-9]*(?:to|until)*\s*|(?:\b[0-9]{1,2}(?:\:[0-9]{1,2})?\s*(?:AM|PM)\s*\b))\b\s*[-,\(\)\|]*\s*)+(?:\s*(?:(?:(?:[0-9]{1,2}|[0-9]{1,2}:[0-9]{1,2})\s*(?:AM|PM)\s*)|(?:[0-9]{1,2}\s*(?:-\s*[0-9]{1,2})?\s*(?:20[0-9]{2})?)?|(?:20[0-9]{2}))?\s*[-,\(\)]?\s*(?:(?:Saturday|Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Sat|Sun|Mon|Tue|Wed|Thur|Thu|Fri|to|until|from|beginning(?:\s*at)?|further\s*notice|and|including|each)|(?:Jan|January|Feb|February|Mar|March|Apr|April|May|Jun|June|Jul|July|Aug|August|Sept|September|Oct|October|Nov|November|Dec|December|Spring|Summer|Fall|Winter|Holiday[s]?))?\s*(?:\,|&bull\;|&|\*|\;)?\s*)*\s*)+/i;

	let dateResults = text.match(workDatePattern);

	return (dateResults && dateResults[0])
		? dateResults[0].trim()
		: null;
}


/**
 * Parse text for any date/time strings, and analyze/convert them to
 * machine-interperatable data.
 *
 * Also add classification tags, and break out date/time ranges.
 *
 * @param  {string} text
 *   Our haystack.
 *
 * @return {object}
 *   A durration object, including original parsed text, tokanized versions,
 *   and classification tags.
 */
function getMessageDates(text) {
	let result = {
		parsed: null,
		tokenized: null,
		tags: [],
	};

	result.parsed = getMessagePlannedWorkDate(text);

	if (result.parsed) {
		let parsed_upper = markDates(markTimes(result.parsed.toUpperCase()));

		result.tokenized = parsed_upper;

		// Analyze date & time tokens for any identifiable tags,
		// such as weekend, week_day, latnight, etc.
		result.tags = _union(result.tags, analyzeTokenizedDates(result.tokenized));
		analyzeTokenizedTimes(result.tokenized).map(t => result.tags = _union(result.tags, t.tags));

		Object.keys(mtaTaxonomy.date_tags).map(tag => {

			mtaTaxonomy.date_tags[tag].map(variation => {
				let exists = ((variation instanceof RegExp))
					? result.parsed.match(variation)
					: (parsed_upper.indexOf(variation.toUpperCase()) !== -1);

				if (exists && result.tags.indexOf(tag) === -1) {
					result.tags.push(tag);
				}
			});
		});
	}

	return result;
}


/**
 * Parse a string for times, and replace with a time token.
 *
 * @param  {string} txt
 *   Our haystack, where we'll parse for any times.
 *
 * @return {string}
 *   Our parsed haystack, with al times replaced with time tokens.
 */
function markTimes(txt) {
	if (typeof txt === 'string') {
		txt = txt.replace(/(?:[0-9]{1,2}(?:\:[0-9]{2})?\s*(?:AM|PM))/gi,
			(x) => {
				if (!x) {
					return x;
				}

				x = x.trim();

				// Enforce full time (include :00),
				// which moment requires for a valid date/time.
				if (x.indexOf(':') === -1) {
					x = x.trim().split(' ');
					x = x[0] + ':00 ' + x[1];
				}

				x = x.split(':');
				x = (x[0] < 10)
					? '0' + x[0] + ':' + x[1]
					: x[0] + ':' + x[1];

				let date = '05-31-2018 ' + x;

				try {
					let res = moment(date, 'MM-DD-YYYY hh:mm A');
					if (!res.isValid()) {
						throw new Error('Invalid date format detected: ' + date);
					}
					res = res.format('kk:mm');
					return '[T--' + res + ']';
				}
				catch(err) {
					console.log(' <!> ', err, date);
				}
				return null;
			});
	}
	return txt;
}


/**
 * Parse a string for dates, and replace them with a date token.
 *
 * @param  {string} txt
 *   Our haystack.
 * @param  {string} year
 *   The expected year for date-making. Otherwise, we'll
 *   assume the current year.
 *
 * @return {string}
 *   Our passed haystack, with all parsed dates replaced
 *   with their tokens.
 */
function markDates(txt, year) {

	year = (year) ? year : moment().format('YYYY');

	if (typeof txt === 'string') {

		// Identify date ranges, like Jun 18 - 23,
		// and conver them to proper ranges.
		// Do this before normal dates, so we don't have false positives.
		txt = txt.replace(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s*([0-9]+)\s*-\s*([0-9]+)/gi,
			(x) => {
				let month = x.split(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/i),
					dates = month[2].split('-');

				// Since we split on month, there will always be a value
				// before month, even if it is empty.
				month = month[1];

				let date_range = dates.map(z => makeDateStamp(year, month, z));

				return date_range[0] + ' - ' + date_range[1];
			});

		// Identify standard dates, like: Fri, Jun 23.
		txt = txt.replace(/(?:Mon|Tue|Wed|Thu|Thur|Fri|Sat|Sun)[,-]*\s*(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s*[0-9]*/gi,
			(x) => {

				let dateStamp = makeDateStamp(year, x);

				return dateStamp;
			});
	}
	return txt;
}


/**
 * Given a year/month/day, assemble a date token.
 *
 * @param  {string} year
 *   A 4-digit year.
 * @param  {string} month
 *   Either a month, or mont/day pair.
 * @param  {string} day
 *   (optional) A numeric day, if not passed with the month.
 *
 * @return {string}
 *   A date token, like: [D--2018-12-07--Fri], for use
 *   within date/time strings.
 */
function makeDateStamp(year, month, day) {

	month = month.replace(/(?:Jan|January|Feb|February|Mar|March|Apr|April|May|Jun|June|Jul|July|Aug|August|Sept|September|Oct|October|Nov|November|Dec|December)/gi, (x) => {
		switch(x.toLowerCase()) {
			case 'jan':
			case 'january':
				return '01';

			case 'feb':
			case 'february':
				return '02';

			case 'mar':
			case 'march':
				return '03';

			case 'apr':
			case 'april':
				return '04';

			case 'may':
				return '05';

			case 'jun':
			case 'june':
				return '06';

			case 'jul':
			case 'july':
				return '07';

			case 'aug':
			case 'august':
				return '08';

			case 'sep':
			case 'sept':
			case 'september':
				return '09';

			case 'oct':
			case 'october':
				return '10';

			case 'nov':
			case 'november':
				return '11';

			case 'dec':
			case 'december':
				return '12';

			default:
				return x;
		}
	});

	if (!day) {
		month = month.split(/\s+/);
		day = (month.length > 2) ? month[month.length -1] : month[1];
		month = (month.length > 2) ? month[month.length - 2] : month[0];
	}

	day = (day < 10)
		? '0' + day.trim()
		: day.trim();
	month = month.trim();

	let dateObj = moment(year + '-' + month + '-' + day);
	let date = dateObj.format('YYYY-MM-DD');
	let dayOfWeek = dateObj.format('ddd');
	return '[D--' + date + '--' + dayOfWeek + ']';
}


/**
 * Analyze a tokenized string for any time ranges, and
 * assign classifications to those times, if applicable.
 *
 * @param  {string} txt
 *   A tokenized string, where times and dates have
 *   already been tokenized. Our haystack.
 *
 * @return {array}
 *   Array of 0 or more objects representing time pairs,
 *   and any possible classification.
 */
function analyzeTokenizedTimes(txt) {

	let time_pattern = /\[T--([0-9]{1,2}:[0-9]{2})\]\s*TO\s*\[T--([0-9]{1,2}:[0-9]{2})\]\s*/i;
	let result = [];

	let results = mtaRegEx.matchRegexString(time_pattern, txt, true);

	/**
	 * @TODO
	 *  *
	 *  * Handle non-pairs?
	 *  *
	 *  *
	 *  *
	 *
	 *
	 *
	 *
	 *
	 *
	 */
	if (results[1] && results[2]) {

		let start = analyzeTime(results[1]),
			end = analyzeTime(results[2]);

		result.push({
			start: start,
			end: end,
			tags: analyzeTimeObjectPair(start, end),
		});
	}

	return result;
}


/**
 * Determine a tag for a pair of times.
 *
 * @param  {timeObj} start
 * @param  {timeObj} end
 *
 * @return {array}
 *   An array of time-themed tags, like DAY, EVENING, LATE_NIGHT.
 *   Empty if invalide params were passed, or none could be assigned.
 */
function analyzeTimeObjectPair(start, end) {
	if (!start || !end) {
		return [];
	}
	let result = [];

	if (start.day && end.day) {
		// 9:45AM - 3:30PM -- Days
		result.push(end.tag);
	}
	else if (start.day && end.night) {
		// 5PM - 10PM
		result.push('day');
		result.push(end.tag);
	}
	else if (start.night && end.day) {
		// 9:45PM - 5AM
		result.push('late_night');
		result.push(start.tag);
	}
	else if (start.night && end.night) {
		// 8:30PM - 11PM
		// 8:30PM - 2AM
		// 8:30PM - 11:59PM -- Evening
		// 9:45PM - 11:45PM -- LATE EVENINGS
		result.push(start.tag);
	}

	return result;
}


/**
 * Given a single time, build a time object (timeObj).
 *
 * @param  {string} time
 *   A standard 24-hour time string, like: 19:45.
 *
 * @return {timeObj}
 *   A time object, containing the original time,
 *   and classification about that time.
 */
function analyzeTime(time) {

	let start = time.split(':')[0],
		day = false,
		night = false,
		result = {
			time: time,
			hour: start,
			day: false,
			night: false,
			tag: null,
		};

	if (start >= 23 || start < 3) {
		// LATE NIGHT
		result.night = true;
		result.tag = 'late_night';
	}
	else if (start > 22) {
		// LATE EVENING
		result.night = true;
		result.tag = 'late_evening';
	}
	else if (start > 18) {
		// EVENING
		result.night = true;
		result.tag = 'evening';
	}
	else if (start > 10) {
		// DAY
		result.day = true;
		result.tag = 'day';
	}
	else if (start > 5) {
		// MORNING
		result.day = true;
		result.tag = 'morning';
	}
	else {
		// EARLY MORNING
		result.day = true;
		result.tag = 'early_morning';
	}

	return result;
}


/**
 * Given a token-formatted date/time string, parse and classify that
 * date range with tags, like Weekday or Weekend.
 *
 * @param {string} txt
 *   A string we should parse for days/dates, like:
 *   [D--2018-06-19--Tue] - [D--2018-06-22--Fri]
 *
 * @returns {array}
 *   An array of zero or more tags describing the analyzed dates.
 */
function analyzeTokenizedDates(txt) {
	// [D--2018-06-19--Tue] - [D--2018-06-22--Fri]
	// [T--23:45] [D--2018-05-25--Fri] TO [T--5:00] [D--2018-05-29--Tue]

	let result = [];

	let day_range_pattern = /(?:\[T--[0-9]{1,2}\:[0-9]{1,2}\]\s*)*\[D--[0-9]{4}\-[0-9]{2}\-[0-9]{1,2}--([a-z]{3})\]\s*(-|TO)\s*(?:\[T--[0-9]{1,2}\:[0-9]{1,2}\]\s*)*\[D--[0-9]{4}\-[0-9]{2}\-[0-9]{1,2}--([a-z]{3})\]/gi;

	let results = mtaRegEx.matchRegexString(day_range_pattern, txt, true);

	if (results[1] && results[3]) {
		results[1] = results[1].toUpperCase();
		results[3] = results[3].toUpperCase();

		switch(results[1]) {
			case 'MON':
			case 'TUE':
			case 'WED':
				if (['TUE', 'WED', 'THU', 'FRI'].indexOf(results[3]) !== -1) {
					result.push('week_day');
				}
				break;

			case 'THU':
			case 'FRI':
			case 'SAT':
			case 'SUN':
				if (['SAT', 'SUN', 'MON', 'TUE'].indexOf(results[3]) !== -1) {
					result.push('weekend');
				}
				break;
		}
	}

	return result;
}



module.exports = {
	getMessagePlannedWorkDate,
	getMessageDates,
}
