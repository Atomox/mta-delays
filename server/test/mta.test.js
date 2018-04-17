let assert = require('assert');
let expect = require('chai').expect;
let _ = require('lodash');

function routeTestByTag(repository, callback, description, main_tags, omit_tags, route_tags) {
	let counter = 0;
	let total = repository.length;
	let m = [];

	// Get tests to run:
	let my_tests = repository.map( event => {
		if (filterTest(event, 'route_change',	main_tags, omit_tags)) {
			if (!route_tags || filterTestSubsection(event, 'route_change', route_tags)) {
				counter++;
				m.push(event);
			}
		}
	});

  return setupTest(description, counter, total, m, callback);
}


function bypassTestByTag(repository, callback, description, main_tags, omit_tags, route_tags) {
	let counter = 0;
	let total = repository.length;
	let m = [];

	// Get tests to run:
	let my_tests = repository.map( event => {
		if (filterTest(event, 'skip_stations',	main_tags, omit_tags)) {
			if (!route_tags || filterTestSubsection(event, 'route_change', route_tags)) {
				counter++;
				m.push(event);
			}
		}
	});

  return setupTest(description, counter, total, m, callback);
}


function multiStationTokenTestByTag(repository, callback, description, main_tags, omit_tags, route_tags) {
	let counter = 0;
	let total = repository.length;
	let m = [];

	// Get tests to run:
	let my_tests = repository.map( event => {
		if (filterTest(event, 'multi_station_token',	main_tags, omit_tags)) {
			if (!route_tags || filterTestSubsection(event, 'route_change', route_tags)) {
				counter++;
				m.push(event);
			}
		}
	});

  return setupTest(description, counter, total, m, callback);
}


function stationMessageTestByTag(repository, callback, description, main_tags, omit_tags, route_tags) {
  let counter = 0;
	let total = repository.length;
	let m = [];

	// Get tests to run:
	let my_tests = repository.map( event => {
		if (filterTest(event, 'station_msg',	main_tags, omit_tags)) {
			if (!route_tags || filterTestSubsection(event, 'stations', route_tags)) {
				counter++;
				m.push(event);
			}
		}
	});

  return setupTest(description, counter, total, m, callback);
}


function stationTestByTag(repository, callback, description, main_tags, omit_tags, route_tags) {
  let counter = 0;
	let total = repository.length;
	let m = [];

	// Get tests to run:
	let my_tests = repository.map( event => {
		if (filterTest(event, 'stations',	main_tags, omit_tags)) {
			if (!route_tags || filterTestSubsection(event, 'stations', route_tags)) {
				counter++;
				m.push(event);
			}
		}
	});

  return setupTest(description, counter, total, m, callback);
}


function basicTest(repository, callback, description) {
  let count = Array.isArray(repository)
    ? repository.length
    : Object.keys(repository).length;

  return setupTest(description, count, count, repository, callback);
}


function setupTest(description, num_tests, total, data, callback) {
  // Add the # of events to the description.
  description = description + '  ' + '(' + num_tests + '/' + total + ')';

  it (description, () => {
    let promises = (Array.isArray(data))
      ? data.map( event => callback(event) )
      : Object.keys(data).map( i => callback(i, data) );

    return Promise.all(promises);
  });
}


function filterTestSubsection(obj, property, tags, omit) {
	return (obj[property] && obj[property].hasOwnProperty('tag'))
		? filterTags(obj[property].tag, tags, omit)
		: false;
}

function filterTags(tags, include, exclude) {
	// If tags, make sure all exist.
	if (Array.isArray(include)) {
		for (let t in include) {
			if (tags.indexOf(include[t]) === -1) {	return false; }
		}
	}
	else if (typeof include == 'String' && include.indexOf('#' === 0)) {
		if (include == '#any-two' && tags.length < 2) {	return false;	}
	}

	// If omit tags, make sure none exist.
	if (Array.isArray(exclude)) {
		for (let t in exclude) {
			if (tags.indexOf(exclude[t]) !== -1) {	return false; }
		}
	}

	return true;
}

function filterTest(event, type, tags, omit) {

	// event must be an object.
	if (!event) {	return false;	}

	// If filters by tag, we must have a non-empty tags property.
	if (typeof tags == 'object' && tags && tags.length > 0 && !event.tag) {
			return false;
	}

	switch (type) {
		case 'route_change':
			if (!event.type_detail
				|| event.type_detail.indexOf('route_change') === -1
				|| !event.route_change) {
					return false;
				}
				break;

		case 'station_msg':
      if (!event.message_station_parse
        || !event.line) { return false; }
        break;

    case 'stations':
      if (!event.stations
        || !event.line) { return false; }
        break;

		case 'multi_station_token':
			if (!event.type_detail
				|| (event.type_detail.indexOf('route_change') === -1
				&& event.type_detail.indexOf('skip_stations') === -1)
				|| !event.route_change) {
					return false;
				}
				break;

		default:
				// skip
				break;
	}

	if (event.tag && filterTags(event.tag, tags, omit) === false) {	return false;	}

	return true;
}


/**
 * Compare object b against object a.  Return all parts of a that are missing from b.
 * Note: b can have more properties than a, so long as it is not missing any of a.
 *
 * @param  {[type]} a        [description]
 * @param  {[type]} b        [description]
 * @param  {[type]} priority [description]
 * @return {[type]}          [description]
 */
 function diffObjectsLeft(a,b) {
 		let missed = [],
 			missed_match = [];

 		Object.keys(a).map( k => {
 			if (b[k] === undefined) {
 				missed.push(k);
 			}
       else if (typeof a[k] == 'object' && a[k]) {
       	if (_.isEqual(a[k], b[k])) {
           missed_match.push(k);
       	}
       }
 			else if (b[k] != a[k]) {
 				missed_match.push(k);
 			}
 		});

     if (missed.length > 0 || missed_match.length > 0) {
       return {
         missing: missed,
         diff: missed_match
       };
     }

 		return true;
 }


module.exports = {
  routeTestByTag,
	bypassTestByTag,
  stationTestByTag,
	stationMessageTestByTag,
	multiStationTokenTestByTag,
  basicTest,
	diffObjectsLeft,
};
