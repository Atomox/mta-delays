/**
 * Parse status from the MTA xml status feed.
 *
 * There are two feeds. This one is for the .xml endpoint from the MTA, 
 * at: 
 * 
 * http://web.mta.info/status/ServiceStatusSubway.xml
 *
 * This is a cleaner API, which requires less cleanup.
 */

const striptags = require('striptags');
const decode = require('unescape');

const mtaStations = require('./mta.stations');

function checkReports(response) {

	let timestamp = response.Siri.ServiceDelivery[0].ResponseTimestamp[0];
	let situations = response.Siri.ServiceDelivery[0].SituationExchangeDelivery[0].Situations;

	let data = {
		status: true,
		timestamp: timestamp,
		events: false
	}

	if (situations && situations[0] && typeof situations[0] == 'object') {
		if (situations[0].PtSituationElement && typeof situations[0].PtSituationElement == 'object') {
			data.events = situations[0].PtSituationElement;
		}
	}

	return data;
}

async function parseStatusFeed(feedObject) {

	let my_body = {
		status: true,
		message: null,
		timestamp: feedObject.timestamp,
		events: []
	};

	if (feedObject.events === false) {
		my_body.status = true;
		my_body.message = 'No incidents reported.';
	}
	else {
		let t = feedObject.events;

		for (let o in t) {
			my_body.events.push(await parseSingleEvent(t[o])); 
		} 
	}

	

	return my_body;
}


async function parseSingleEvent(event) {

	let e = {
		
		id: null,
		type: null,
		planned: false,
		date: {
			fetched: null,
			start: null,
			end: null,
		},
		summary: null,
		detail: null,
		line: [],
		effects: null,
		severity: null,
		source: null,
	};

	e.id = event.SituationNumber[0].trim();
	e.type = event.ReasonName[0].trim();
	e.planned = (event.Planned[0] === 'true') ? true : false;
	e.summary = event.Summary[0]._;
	e.detail = cleanStatusText(event.LongDescription[0]);
	e.type_detail = event.Consequences[0].Consequence[0].Condition[0];
	e.severity = event.Consequences[0].Consequence[0].Severity[0];

	e.date.fetched = event.CreationTime[0];
	e.date.start = event.PublicationWindow[0].StartTime[0];
	e.date.end = (event.PublicationWindow[0].EndTime) ? event.PublicationWindow[0].EndTime[0] : null;

	// Parse out lines.
	let k = event.Affects[0].VehicleJourneys[0].AffectedVehicleJourney;
	for (let j in k) {
		e.line.push({ line: k[j].LineRef[0].trim(), dir: k[j].DirectionRef[0].trim()});
	}

	if (event.Source[0].SourceType[0] != 'directReport') {
		e.source = event.Source[0].SourceType[0];
		console.warn('NEW SOURCE TYPE:', event.Source[0].SourceType[0]);
	}


	e.detail = await parseDetailMessage(e.detail, e.summary, e.line);

	return e;
}


async function parseDetailMessage(status, summary, lines) {

	// Clean it up.
	status = cleanStatusText(decode(status));

	status = await formatSingleStatusEvent(status, lines, summary);

	return status;
}


/**
 * Cleanup first pass: Strip garbage characters and tags from a joint line status message.
 * 
 * @param  {string} text
 *   A status message string, maybe container extra html and stuff.
 *   
 * @return {string}
 *   A cleaner string.
 */
function cleanStatusText(text) {
	
	// Clean up the tags and newlines.
	text = text.replace(/(?:\r\n|\r|\n)/g, '');
	text = text.trim();
	text = text.replace(/\&nbsp;/g, ' ');
	text = text.replace(/\&bull;/g, " -- ");
	text = text.replace(/\&mdash;/g, " -- ");
	text = unescape(text);

	// Strip tags (minus strong and spans)
	let allowed_tags = ['strong', 'span'];
	text = striptags(text, allowed_tags, ' ');

	for (t in text) {
		text[t] = text[t].trim();
	}

	return text;
}


/**
 * Gather info on a single status event.
 * 
 * @param  {string} event
 *   The text for a single event.
 *   
 * @return {object}
 *   An event object.
 */
async function formatSingleStatusEvent(event, lines, summary) {

	event = event.trim();

	let  e = null;

	if (event) {
		e = {
			type: null,
			type_detail: null,
			time: null,
			durration: null,
			message: null,
			message_raw: null,
			stations: {},
		};

		// Store the original message.
		e.message = event;
		e.message_raw = event;

		// Determine if the event type has more detail.
		e.type_detail = getMessageAction(event);

		// Get an interruption time
		e.time = getMessageDateTime(event);

		// Get a scheduled time from the body. (Planned Work)
		e.durration = getMessagePlannedWorkDate(event);	

		// Break out any alternate route information from the body.
		e.alt_instructions = getMessageAlternateInstructions(event);

		e.ad_message = getMessageADNote(event);

		e.message_formula = prepareEventMessage(e.message, e, true, summary);
		e.message = prepareEventMessage(e.message, e, false);


		for (let l in lines) {
			try {
				// Get an stations related to this line.
				e.stations[lines[l].line] = await mtaStations.matchRouteStationsMessage(lines[l].line, e.message);
			}
			catch(err) {
				continue;
			}
		}
	}

	return e;
}


function prepareEventMessage(message, status, use_placeholder, summary) {

	// Pull the original message out of there.
	if (summary) {
		message = message.replace(summary, (use_placeholder) ? '[-SUMMARY-]' : '');
	}

	// Remove the original message out of there.
	if (status.durration !== null) {
		message = message.replace(status.durration, (use_placeholder) ? '[-DATES-]' : '');
	}

	// Remove the alternate directions.
	if (status.alt_instructions !== null) {
		message = message.replace(status.alt_instructions, (use_placeholder) ? '[-ALT-INSTRUCT-]' : '');
	}

	if (status.ad_message !== null) {
		message = message.replace(status.ad_message, (use_placeholder) ? '[-AD-MESSAGE-]' : '');
	}

	return message.trim();
}


function getMessageDateTime(text) {
	let DatePattern = /(?=<span\s*class="DateStyle"\s*>(.*)<\/span>)/gi;
	let dateResults = text.split(DatePattern);
	return (dateResults[1]) ? dateResults[1].trim() : null;
}


function getMessageAlternateInstructions(text) {

	// In Progress -- Reduction For service to these stations
	let alternateInstructionPattern = /((\b(For\s*service\s*(to|from)|use\s*(nearby)?|take\s*the|Transfer\s*(to|between)?|Travel\s*Alternatives)\b)+((\s*((stations|these stations|trains|transfer\s*to)?(\s|,|and|or|instead|at|\;|\|)?)*|((\s*[a-zA-Z0-9\-\.\/\:\;&\(\)\*]*)*)?)*(\s*\[(A|B|C|D|E|F|G|M|L|J|Z|N|Q|R|W|S|SIR|[1-7]|SB|TP)\])*\s*)*)+/i;

	let results = text.match(alternateInstructionPattern);

	if (results && results[0]) {
		return results[0].trim();
	}

	console.warn('Can\'t parse alternate instructions in ---', text);
	return null;
}


function getMessageADNote(text) {

	let adPattern = /\[ad\](\s*[a-zA-Z0-9\-\.\/\:\;&\(\)\*\,]*)*/i;
	let results = text.match(adPattern);

	if (results && results[0]) {
		return results[0].trim();
	}

	return null;
}


function getMessagePlannedWorkDate(text) {
	// In Progress -- Reduction
	let workDatePattern = /(\b(Weekend[s]?|Late Night[s]?|Night[s]?|Day[s]?|Late Evening[s]?|Evening[s]?|All times|Until)\b\s*,?(\s*((([0-9]{1,2}|[0-9]{1,2}:[0-9]{1,2})\s*(AM|PM)\s*)|([0-9]{1,2}\s*(-\s*[0-9]{1,2})?\s*(20[0-9]{2})?)?|(20[0-9]{2}))?\s*[,-]?\s*((Saturday|Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Sat|Sun|Mon|Tue|Wed|Thur|Thu|Fri|to|until|beginning(\sat)?|further\snotice|and|including)|(Jan|Feb|Mar|Apr|May|June|July|Aug|Sept|Oct|Nov|Dec|Spring|Summer|Fall|Winter|Holiday[s]?))?\s*(\,|&bull\;|&)?\s*)*\s*)+/i;

	let dateResults = text.match(workDatePattern);

	if (dateResults && dateResults[0]) {
		return dateResults[0].trim();
	}

	console.warn('Can\'t parse event dates in ---', text);
	return null;
}


function getMessageAction(text) {

	const incident_types = {
		// Incidents
		'service_resumed': [
			'service has resumed',
			'following an earlier incident',
			'resumed service',
			'service resumed',
		],
		'delays': [
			'delays',
			'running with delays',
		],
		'illness': [
			'sick passenger',
			'medical attention',
			'medical assistance',
		],
		'injury': [
			'person struck by a train',
			'customer injury',
		],
		'signal_problems': ['signal problems'],
		'power_loss': ['loss of power'],
		'unautherized_person': [
			'unauthorized person on the tracks',
		],
		'unruly passenger': [
			'unruly passenger',
		],
		'police activity': [
			'NYPD activity',
			'police activity',
			'investigation',
		],
		'fire activity': [
			'FDNY activity',
		],
		'mechanical_problems': [
			'mechanical problems',
		],
		'rail_condition': [
			'rail condition',
			'track condition',
		],
		'switch_problems': ['switch problems'],
		

		// Diversions.
		'shuttle_bus': [
			'[SB]',
			'Shuttle Bus',
		],
		'skip_stations': [
			'trains skip',
			'station closures',
			'trains are bypassing',
		],
		'service_ends_early': [
			'end early',
			'Service ends early',
			'service ends early',
		],
		'running_local': [
			'trains run local',
			'trains are running local',
			'trains make local stops',
			'local stops',
			'running local',
			'run local',
		],
		'route_change': [
			'route changes',
			'Trains are rerouted',
		],
		'alternate_trains': [
			'alternate trains',
			'some trains',
		],
		'no_trains': [
			'No trains running',
		],
		'no_trains_partial': [
			'The last stop',
			'trains end at',
			'No trains in',
			'No trains between',
			'No trains running between',
			'No service between',
			'No weekday service between',
		],
		'platform_change' :[
			'trains board at',
			'trains baord on',
		],
		'running_express': [
			'running express',
			'trains run express',
		],
		'running_slow': [
			'running with slower speeds',
			'run at reduced speed',
			'run with reduced speed',
		],

		// Misc
		'additional_service': ['Additional service'],


		// Construction
		'general_maintenance': [
			'PRIORITY REPAIRS',
			'SCHEDULED MAINTENANCE',
			'PREVENTIVE MAINTENANCE',
			'STRUCTURAL IMPROVEMENTS',
		],
		'signal_maintenance':['SIGNAL MAINTENANCE'],
		'station_improvements': [
			'STATION IMPROVEMENTS',
			'STATION ENHANCEMENTS',
		],
		'electrical_improvements': ['ELECTRICAL IMPROVEMENTS'],
		'track_maintenance': [
			'TRACK MAINTENANCE',
			'TRACK REPLACEMENT',
			'TRACK PLATE INSTALLATION',
			'TRACK INSTALLATION',
			'REPLACEMENT OF POWER & COMMUNICATION CABLES',
		],
		'tunnel_maintenance': ['TUNNEL RECONSTRUCTION'],
	};

	let my_status = [];

	for (type in incident_types) {
		for (variation in incident_types[type]) {
			if (text.indexOf(incident_types[type][variation]) !== -1) {
				// console.log(type, ' >>>>>>> ', text);
				my_status.push(type);
				break;
			}
		}	
	}

	return (my_status.length > 0) ? my_status : null;
}


function getStations(text) {

	/*
	  @TODO
	    Get all sations here:

	    http://web.mta.info/developers/data/nyct/subway/Stations.csv
	 */
	const stations = [
		// Queens
		'Roosevelt Av',
		'71 Av',
		
		// Queens -- 7 Train
		'61 St-Woodside',
		'74 St-Broadway',
		'Queensboro Plaza',

		// Brooklyn
		'Euclid Av.',
		'Fulton St.',
		'Atlantic Av-Barclays Ctr.',
		
		// Manhattan
		'5 Av/53 St.',
		'125 St.',
		'66 St', 
		'59 St', 
		'50 St',

		// The Bronx


		// SIR
		'Arthur Kill',
		'Prince\'s Bay Stations',
	];

	const tunnels = [
		'Clark St Tunnel',
	];
}


function getAffectedStations(text, actionList, line) {

// TRACK MAINTENANCE [R] Forest Hills-bound trains skip 
// 
// 36 St, Steinway St, 46 St, Northern Blvd and 65 St 
// 
// Weekend , Saturday and Sunday , Nov 25 - 26
// 
// For service to these stations, take the [R] to Roosevelt Av and transfer to a Bay Ridge-bound [R]. For service from these stations, take the [R] to Queens Plaza and transfer to a Forest Hills-bound [R].

// [type] [line] [direction] [action] [stations]


// TRACK REPLACEMENT [R] Bay Ridge-bound trains skip
// 
// 67 Av, 63 Dr, Woodhaven Blvd, Grand Av and Elmhurst Av
// 
// Weekend , Saturday and Sunday, Nov 25 - 26
// 
// For service to these stations, take the [R] to Roosevelt Av and transfer to a Forest Hills-bound [R]. For service from these stations, take the [R] to 71 Av and transfer to a Bay Ridge-bound [R].

	if (line == 'R') {

		const directions = {
			'southbound': [
				'Bay Ridge-bound',
				'Brooklyn-bound',
			],
			'northbound': [
				'Forest Hills-bound',
				'Queens-bound',
			],
			'mixed': [
				'Manhattan-bound',
			],
		};
	}
}



function findTrainsInText (text) {
	// Look for line
	const linePattern = /\[[ABCDEFGLMNQRSW1234567]\]/g;
	let lines = text.match(linePattern);

	status.lines = getTrainsInLine(line, lines);

	// Look for other affected lines
	status.otherLines = getTrainsNotInLine(line, lines);
}


function getTrainsNotInLine(line, trains) {
	return getTrains(line, trains, false);
}

function getTrainsInLine(line, trains) {
	return getTrains(line, trains, true);
}

function getTrains(line, trains, in_line) {
	in_line = (!in_line) ? false : true;

	let my_lines = {};

	for (t in trains) {
		let my_train = stripTrainWrapper(trains[t]);
		
		if (getTrainLine(my_train) == line && in_line === true) {
			my_lines[my_train] = my_train;
		}
		else if (getTrainLine(my_train) !== line && in_line === false) {
			my_lines[my_train] = my_train;
		}
	}

	return (my_lines) ? my_lines : null;
}

function stripTrainWrapper(train) {
	return (train.charAt(0) == '[') ? train.substr(1, train.length-2) : train;
}

function getTrainLine(train) {
	// Strip any [line] wrappers, so we only see the raw train name.
	train = stripTrainWrapper(train);

	switch (train) {
		case 'A':
		case 'C':
		case 'E':
			return 'ACE';

		case 'B':
		case 'D':
		case 'F':
		case 'M':
			return 'BDFM';

		case 'N':
		case 'Q':
		case 'R':
		case 'W':
			return 'NQRW';

		case 'L':
			return 'L';

		case 'J':
		case 'Z':
			return 'JZ';

		case '1':
		case '2':
		case '3':
			return '123';
		
		case '4':
		case '5':
		case '6':
			return '456';

		case '7':
			return '7';

		case 'S':
			return 'S';
	}

	return false;
}

module.exports = {
	checkReports,
	parseStatusFeed,
	getMessageAlternateInstructions,
	getMessagePlannedWorkDate,
	getMessageAction,
	getMessageDateTime,
}