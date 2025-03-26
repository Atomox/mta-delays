import assert from 'assert';
import { expect } from 'chai';
import { getObjPath as get } from '../src/utils/arrays.js';
import { isEqual } from 'lodash-es';

export function basicTestByTag(repository, callback, description, main_tags, omit_tags, route_tags) {
  let counter = 0;
	let total = repository.length;
	let m = [];

	// Get tests to run:
	let my_tests = repository.map( event => {
		if (filterTest(event, 'basic',	main_tags, omit_tags)) {
			if (!route_tags || filterTestSubsection(event, 'message', route_tags)) {
				counter++;
				m.push(event);
			}
		}
	});

  return setupTest(description, counter, total, m, callback);
}

export function adMessageTestByTag(repository, callback, description, main_tags, omit_tags, date_tags) {
  let counter = 0;
	let total = repository.length;
	let m = [];

	// Get tests to run:
	let my_tests = repository.map( event => {
		if (filterTest(event, 'ad_message',	main_tags, omit_tags)) {
			if (!date_tags || filterTestSubsection(event, 'message', date_tags, null, false)) {
				counter++;
				m.push(event);
			}
		}
	});

  return setupTest(description, counter, total, m, callback);
}

export function altInstrTestByTag(repository, callback, description, main_tags, omit_tags, date_tags) {
  let counter = 0;
	let total = repository.length;
	let m = [];

	// Get tests to run:
	let my_tests = repository.map( event => {
		if (filterTest(event, 'alt_instructions',	main_tags, omit_tags)) {
			if (!date_tags || filterTestSubsection(event, 'message', date_tags, null, false)) {
				counter++;
				m.push(event);
			}
		}
	});

  return setupTest(description, counter, total, m, callback);
}

export function plannedWorkDurrationTestByTag(repository, callback, description, main_tags, omit_tags, tags) {
  let counter = 0;
	let total = repository.length;
	let m = [];

	// Get tests to run:
	let my_tests = repository.map( event => {
		if (filterTest(event, 'planned_work_durration',	main_tags, omit_tags)) {
			if (!tags || filterTestSubsection(event, 'type', 'PlannedWork', null, false)) {
				counter++;
				m.push(event);
			}
		}
	});

  return setupTest(description, counter, total, m, callback);
}

export function dateTestByTag(repository, callback, description, main_tags, omit_tags, date_tags, expect_date_tag) {
  let counter = 0;
	let total = repository.length;
	let m = [];

	// Get tests to run:
	let my_tests = repository.map( event => {
		if (filterTest(event, 'basic',	main_tags, omit_tags)) {

			if (date_tags && filterTestSubsection(event, 'expect.durration.tags', date_tags, null, false)) {
        counter++;
				m.push(event);
			}
      else if (expect_date_tag && filterTestSubsection(event, 'expect.durration.tag', expect_date_tag, null, false)) {
        counter++;
				m.push(event);
			}
      else if (!date_tags && !expect_date_tag) {
        counter++;
				m.push(event);
      }
		}
	});

  return setupTest(description, counter, total, m, callback);
}

export function routeTestByTag(repository, callback, description, main_tags, omit_tags, route_tags) {
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


export function bypassTestByTag(repository, callback, description, main_tags, omit_tags, route_tags) {
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


export function multiStationTokenTestByTag(repository, callback, description, main_tags, omit_tags, route_tags) {
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


export function stationMessageTestByTag(repository, callback, description, main_tags, omit_tags, route_tags) {
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

export function boundStationTestByTag(repository, callback, description, main_tags, omit_tags, route_tags) {
  let counter = 0;
	let total = repository.length;
	let m = [];

	// Get tests to run:
	let my_tests = repository.map( event => {
		if (filterTest(event, 'boundStations',	main_tags, omit_tags)) {
			if (!route_tags || filterTestSubsection(event, 'boundStations', route_tags)) {
				counter++;
				m.push(event);
			}
		}
	});

  return setupTest(description, counter, total, m, callback);
}

export function affectedBoroTestByTag(repository, callback, description, main_tags, omit_tags, route_tags) {
  let counter = 0;
	let total = repository.length;
	let m = [];

	// Get tests to run:
	let my_tests = repository.map( event => {
		if (filterTest(event, 'affectedBoro',	main_tags, omit_tags)) {
			if (!route_tags || filterTestSubsection(event, 'affectedBoro', route_tags)) {
				counter++;
				m.push(event);
			}
		}
	});

  return setupTest(description, counter, total, m, callback);
}

export function stationTestByTag(repository, callback, description, main_tags, omit_tags, route_tags) {
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

/**
 * 
 * @todo
 *   Breaking due to missing repository as undefined. 
 */
export function basicTest(repository, callback, description) {
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


function filterTestSubsection(obj, property, tags, omit, tag_extend = true) {
  if (!get(obj, property, false)) {
    return false;
  }
  if (tag_extend && !get(obj,property, {}).hasOwnProperty('tag')) {
    return false;
  }

  return (tag_extend)
		? filterTags(get(obj, property, {}).tag, tags, omit)
		: filterTags(get(obj, property, {}), tags, omit);
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
	if (Array.isArray(tags) && tags.length > 0 && !event.tag) {
    	console.log("\n\n", '<!> Test Filter ERROR -- Test Message Data Integrity ERROR -- Event missing <tag> property, and will be omitted.', "\n Event: ", event.message, "\n");
			return false;
	}

	switch (type) {

		case 'basic':
			if (!event.type_detail
				|| !event.message) {
					return false;
				}
				break;

    case 'planned_work_durration':
      if (!event.message
        || !event.type
        || !event.durration) {
          return false;
        }
        break;

    case 'ad_message':
      if (!event.message
        || !event.ad_message) {
          return false;
        }
        break;

    case 'alt_instructions':
      if (!event.message
        || !event.alt_instructions) {
          return false;
        }
        break;

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

		case 'boundStations':
      if (!event.bound
        || !event.line) { return false; }
        break;

		case 'affectedBoro':
      if (!event.boro
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
export function diffObjectsLeft(a,b) {
 		let missed = [],
 			missed_match = [];

 		Object.keys(a).map( k => {
 			if (b[k] === undefined) {
 				missed.push(k);
 			}
       else if (typeof a[k] == 'object' && a[k]) {
       	if (isEqual(a[k], b[k])) {
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
