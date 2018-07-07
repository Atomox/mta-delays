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
	let workDatePattern = /(?:\b(?:(?:Weekend[s]?|Late\s*Night[s]?|Night[s]?|Day[s]?|Late\s*Evening[s]?|Evening[s]?|Rush\s*Hour[s]?|All\s*times|Until|Except|(?:Jan|January|Feb|February|Mar|March|Apr|April|May|Jun|June|Jul|July|Aug|August|Sept|September|Oct|October|Nov|November|Dec|December)\s*[0-9]*(?:to|until)*\s*|(?:\b[0-9]{1,2}(?:\:[0-9]{1,2})?\s*(?:AM|PM)\s*\b))\b\s*[-,\(\)]*\s*)+(?:\s*(?:(?:(?:[0-9]{1,2}|[0-9]{1,2}:[0-9]{1,2})\s*(?:AM|PM)\s*)|(?:[0-9]{1,2}\s*(?:-\s*[0-9]{1,2})?\s*(?:20[0-9]{2})?)?|(?:20[0-9]{2}))?\s*[-,\(\)]?\s*(?:(?:Saturday|Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Sat|Sun|Mon|Tue|Wed|Thur|Thu|Fri|to|until|from|beginning(?:\s*at)?|further\s*notice|and|including|each)|(?:Jan|January|Feb|February|Mar|March|Apr|April|May|Jun|June|Jul|July|Aug|August|Sept|September|Oct|October|Nov|November|Dec|December|Spring|Summer|Fall|Winter|Holiday[s]?))?\s*(?:\,|&bull\;|&|\*|\;)?\s*)*\s*)+/i;

	let dateResults = text.match(workDatePattern);

	return (dateResults && dateResults[0])
		? dateResults[0].trim()
		: null;
}


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

		// Analyze date tokens for any identifiable tags, such as weekend, week_day, etc.
		result.tags = _union(result.tags, analyzeTokenizedDates(result.tokenized));

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

function markTimes(txt) {
	if (typeof txt === 'string') {
//		console.log('<BEFORE>', txt);
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

//				if (x.indexOf('PM') !== -1 || x.indexOf('AM') !== -1) {
//					x = x.slice(0, -1);
//					console.log('>>', x);
//				}

				let date = '05-31-2018 ' + x;

				try {
					let res = moment(date, 'MM-DD-YYYY hh:mm');
					if (!res.isValid()) {
						throw new Error('Invalid date format detected: ' + date);
					}
					res = res.format('H:mm');
					return '[T--' + res + ']';
				}
				catch(err) {
					console.log(' <!> ', err, date);
				}
				return null;
			});
//		console.log('<AFTER>', txt);
	}
	return txt;
}

function markDates(txt, year) {

	year = (year) ? year : moment().format('YYYY');

	if (typeof txt === 'string') {
//		console.log('<BEFORE>', txt);

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

//				console.log(' . + + . ', x, ' | ', date_range);

				return date_range[0] + ' - ' + date_range[1];
			});

		// Identify standard dates, like: Fri, Jun 23.
		txt = txt.replace(/(?:Mon|Tue|Wed|Thu|Thur|Fri|Sat|Sun)[,-]*\s*(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s*[0-9]*/gi,
			(x) => {
//				console.log(' . . . (B) ', x, year);

				let dateStamp = makeDateStamp(year, x);

//				console.log(' . . . (A) ', dateStamp);
				return dateStamp;
			});
//		console.log('<AFTER>', txt);
	}
	return txt;
}

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

//	console.log('+++ M:', month, '   D:', day);

	let dateObj = moment(year + '-' + month + '-' + day);
	let date = dateObj.format('YYYY-MM-DD');
	let dayOfWeek = dateObj.format('ddd');
	return '[D--' + date + '--' + dayOfWeek + ']';
}

function analyzeTokenizedDates(txt) {
	// [D--2018-06-19--Tue] - [D--2018-06-22--Fri]
	// [T--23:45] [D--2018-05-25--Fri] TO [T--5:00] [D--2018-05-29--Tue]

	let result = [];

	let day_range_pattern = /(?:\[T--[0-9]{1,2}\:[0-9]{1,2}\]\s*)*\[D--[0-9]{4}\-[0-9]{2}\-[0-9]{1,2}--([a-z]{3})\]\s*(-|TO)\s*(?:\[T--[0-9]{1,2}\:[0-9]{1,2}\]\s*)*\[D--[0-9]{4}\-[0-9]{2}\-[0-9]{1,2}--([a-z]{3})\]/gi;

	let results = mtaRegEx.matchRegexString(day_range_pattern, txt, true);

//	console.log('<><><>', results);

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

//	console.log('<><><> ->', result);

	return result;
}



module.exports = {
	getMessagePlannedWorkDate,
	getMessageDates,
}
