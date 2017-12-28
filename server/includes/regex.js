


function replaceSpace(word) {
	return word.replace(/(\s)+/gi, (match, offset, string) => {
  	return '(\\s)*';
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

function matchStringsWithSpecialChars(needle, haystack) {
	let v = needle;

	// Detect numbers.	
	v = wrapNumberBounds(needle);

	// Wrap Separators.
	v = wrapSeperatorBounds(v);

	v = replaceSpace(v);

	let re = new RegExp(v,"gi");
	let result = haystack.match(re);

//	console.log('Match:', v, ' ~~~ ', haystack, ' . . . ', result);

	return (result !== null && result[0]) 
		? needle
		: false;
}



module.exports = {
	replaceSpace,
	wrapNumberBounds,
	wrapSeperatorBounds,
	matchStringsWithSpecialChars
};