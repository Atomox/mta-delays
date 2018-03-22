


function replaceSpace(word) {
	return word.replace(/(\s)+/gi, (match, offset, string) => {
  	return '\\s*';
  });
}

function wrapNumberBounds(word) {
  return word.replace(/\s*[0-9]+\s*/gi, (match, offset, string) => {
  	return '\\s*\\b' + match.trim() + '\\b\\s*';
  });
}

function wrapSeperatorBounds(word) {
  return word.replace(/(\s)*[-/]+(\s)*/gi, (match, offset, string) => {
  	return '\\s*' + '[-/]{0,2}' + '\\s*';
  });
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



module.exports = {
	replaceSpace,
	wrapNumberBounds,
	wrapSeperatorBounds,
	matchStringsWithSpecialChars,
	matchRegexString,
	replaceRegexString,
	prepareRegExpString,
	convertRegExpToString,
	convertArrayToRegexOr,
	prepareRexExNameString,
};
