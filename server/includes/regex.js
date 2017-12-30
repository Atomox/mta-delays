


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

function matchRegexString(pattern, haystack) {
	let re = new RegExp(pattern,"gi");
	let result = haystack.match(re);

//	console.log(result);

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
	prepareRegExpString,
	convertRegExpToString,
	convertArrayToRegexOr,
	prepareRexExNameString,
};