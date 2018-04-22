const stationSuppliment = require('../data/static/mta.stations.suppliment');



function replaceSpace(word) {
	return word.replace(/(?:\s)+/gi, (match, offset, string) => {
  	return '\\s*';
  });
}

function wrapNumberBounds(word) {
  return word.replace(/\s*[0-9]+\s*/gi, (match, offset, string) => {
  	return '\\s*\\b' + match.trim() + '\\b\\s*';
  });
}

function wrapSeperatorBounds(word) {
  return word.replace(/(?:\s)*[-/]+(?:\s)*/gi, (match, offset, string) => {
  	return '\\s*' + '[-/]{0,2}' + '\\s*';
  });
}

/**
 * Include leading and trailing hyphens, so we can detect when we might be
 * grabing partial stations with hyphens.
 */
function preventPartials(regex) {
//	return '[-]?\\s*' + regex + '\\s*[-]?\\s*(?:bound)?';
	return '[-/]?\\s*' + regex + '\\s*(?:[-/]\\s*(\\b[A-Z0-9]*\\b)?)?';
}

function wrapWrappers(word) {
	word = word.replace(')', '\\)');
	word = word.replace('(', '\\(');
	word = word.replace('[', '\\[');
	word = word.replace(']', '\\]');
	return word;
}

function convertArrayToRegexOr(list) {
	return '(' + list.join('|') + ')';
}

function convertRegExpToString(exp) {
	exp = exp.toString();

	// Trip leading and trailing '/', so new string can be run through new RegExp().
	exp = exp.slice(1);
	exp = exp.slice(0, -1);

	return exp;
}

function prepareRegExpString(exp) {
	console.log(exp);
//	return exp.replace(/[\\\-\/\{\}\?\.\^\$\|]/g, "\\\$&");
	return exp.replace(/[\\\-\/\{\}\?\.\^\$\|]/g, (match) => {

		console.log('Our match....', match);
		return match;
	});
}


function prepareRegexStationString(name) {

		let v = prepareRexExNameString(name);

		// Make sure we're not parsing part of a station
		v = preventPartials(v);

		return v;
}


function prepareRexExNameString(name) {
	let v = name;

	// Wrap text/word parens () -- DO THIS FIRST!
	v = wrapWrappers(v);

	// Detect numbers.
	v = wrapNumberBounds(v);

	// Wrap Separators.
	v = wrapSeperatorBounds(v);

	// Replace all spaces.
	v = replaceSpace(v);

	return v;
}


function matchStringsWithSpecialChars(needle, haystack) {
	let v = needle;

	// Detect numbers.
	v = wrapNumberBounds(v);

	// Wrap Separators.
	v = wrapSeperatorBounds(v);

	// Replace all spaces.
	v = replaceSpace(v);

	return matchRegexString(v, haystack);
}

function replaceRegexString(pattern, match, haystack, token) {

		if (!haystack) {
			return false;
		}

		let flags = 'i';

		match = prepareRexExNameString(match.trim());
		if(match.indexOf('\\s*') === 0) {
			match = match.substr(3);
		}

		let re = new RegExp(match,flags);

		// Old method.
		// result_message = result_message.split(m).join('[' + s +']');

		return haystack.split(re).join('[' + token +']')
}

function matchRegexString(pattern, haystack, return_all, greedy) {

	if (!haystack) {
		return false;
	}

	let flags = 'i';
	if (greedy === true) {
		flags = flags + 'g';
	}

	let re = new RegExp(pattern,flags);
	let result = haystack.match(re);

	if (return_all === true && result !== null) {
		return result;
	}

	return (result !== null && result[0])
		? result[0].trim()
		: false;
}

function matchRegexStation(pattern, haystack, return_all, greedy) {
	if (!haystack) {
		return false;
	}

	let flags = 'i';
	if (greedy === true) {
		flags = flags + 'g';
	}

	let re = new RegExp(pattern,flags),
		match = true,
		results = [],
		count = 0;

	while (match !== null) {

		// Using the regex object, the index of the last match is preserved.
		// This allows us to continue where we left off.
		match = re.exec(haystack);

		if (match === null) {
			continue;
		}
		else if (match[0].trim().substr(0,1) === '-') {
			continue;
		}
		else if (match[0].trim().substr(0,1) === '/') {
			continue;
		}
		/**
		 * @TODO
		 *   Might not be necessary, since we handle problem stations differently.
		 *
		else if (match[2] && stationSuppliment.hyphen_station_suffix
			.indexOf(match[2]
			.toLowerCase()
			.trim()) !== -1) {
			console.log('\n>> Nope. Trailing Station name: ', match[0], '\n');
			continue;
		}*/

		let bound_pattern = /[-]\s*(?:bound)/i;

		if (match[2] == 'bound' || match[0].indexOf('bound') !== -1) {
			let m = match[0];
			match[0] = match[0].replace(bound_pattern, '');
		}

		results.push(match[0].trim());
	}

	if (return_all === true && results.length > 0) {
		return results;
	}

	return (results.length > 0 && result[0])
		? results[0].trim()
		: false;
}


module.exports = {
	replaceSpace,
	wrapNumberBounds,
	wrapSeperatorBounds,
	matchStringsWithSpecialChars,
	matchRegexString,
	matchRegexStation,
	replaceRegexString,
	prepareRegExpString,
	convertRegExpToString,
	convertArrayToRegexOr,
	prepareRexExNameString,
	prepareRegexStationString,
};
