const striptags = require('striptags');


function parseLineStatus(line, status, text) {

	let my_status = {};

	if (text[0]) {
		text[0] = cleanStatusText(text[0]);
	}

	if (['DELAYS', 'PLANNED WORK'].indexOf(status) >= 0) {
		my_status = parseDelayStatus(line, text[0]);
		my_status.text = formatStatusText(my_status.text);
	}
	else {
		my_status.text = formatStatusText(text[0]);
	}

	return my_status;	
}

function parseDelayStatus(line, text) {

	text = text.trim();

	let status = {
		lines: {},
		otherLines: {},
		text: text,
	};


	if (!text) {
		status.text = null;
	}

	if (line == 'SIR') {
		status.text = text;
		status.lines = ['SIR'];
	}
	else if (text) {
		// Look for line
		const linePattern = /\[[ABCDEFGLMNQRSW1234567]\]/g;
		let lines = text.match(linePattern);

		status.lines = getTrainsInLine(line, lines);

		// Look for other affected lines
		status.otherLines = getTrainsNotInLine(line, lines);

		// Look for direction
		// southbound, northbound, brooklyn-bound, queens-bound, manhattan-bound, in both directions
	}
	
	// Look for time
	return status;
}


function findTrainsInText (text) {
	// Look for line
	const linePattern = /\[[ABCDEFGLMNQRSW1234567]\]/g;
	let lines = text.match(linePattern);

	status.lines = getTrainsInLine(line, lines);

	// Look for other affected lines
	status.otherLines = getTrainsNotInLine(line, lines);

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
	text = unescape(text);

	// Strip tags (minus strong and spans)
	let allowed_tags = ['strong', 'span'];
	text = striptags(text, allowed_tags, ' ');

	for (t in text) {
		text[t] = text[t].trim();
	}

	return text;
}


function getStatusTypes() {
	return [
		'TitleDelay',
		'TitlePlannedWork',
		'TitleServiceChange',
	];
}


/**
 * Break status into multiple messages, and pull out related data for each message.
 * 
 * @param  {string} text
 *   A full status for a line, which we will try to split inot multiple messages.
 *   
 * @return {array}
 *   An array of status message objects.
 */
function formatStatusText(text) {

	// Explode on each span with a class of TitleDelay or TitlePlannedWork
	let spanPattern = /<\/\w*span\w*>/gi;
	let positiveSpanPattern = /(?=<span\s*class="(TitleDelay|TitlePlannedWork|TitleServiceChange)"\s*>)/gi;
	text = text.split(positiveSpanPattern);
	let result = [];

	for (t in text) {
		if (getStatusTypes().indexOf(text[t]) === -1) {
			if (typeof text[t] === 'string') {

				let e = formatSingleStatusEvent(text[t]);

				// Convert each status into an object.
				if (e !== null) {
					result.push(e);
				}
			}
		}
	}

	return result;
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
function formatSingleStatusEvent(event) {

	event = event.trim();

	let  e = null;

	if (event) {
		e = {
			type: null,
			type_detail: null,
			time: null,
			durration: null,
			message: null,
		};

		// Determine the event type. 
		// note: adding /g breaks this regex!
		let spanEventPattern = /(?=<span\s*class="Title(Delay|PlannedWork|ServiceChange)"\s*>(.*)<\/span>)/i;
		let results = event.match(spanEventPattern);

		if (results && results[1]) {
			e.type = results[1].trim();
		}
		else {
			console.warn('  <!> Cannot determine event type using current pattern. Parsing message:', results);
		}


		// Determine if the event type has more detail.
		e.type_detail = getMessageAction(event);



		// If delay, pull up report time.
		if (['Delay', 'ServiceChange'].indexOf(e.type) >= 0) {
			let DatePattern = /(?=<span\s*class="DateStyle"\s*>(.*)<\/span>)/gi;
			let dateResults = event.split(DatePattern);

			e.time = (dateResults[1]) ? dateResults[1].trim() : null;
		}


		// Pull out the message.
		let MessageSplitPattern = /<\/span>/gi;
		let messageResults = event.split(MessageSplitPattern);	
		e.message = (messageResults) ? messageResults[messageResults.length-1].trim() : null;

		// if planned work, the durration
		/*
		  
		  @todo

		 */


		// pull out affected lines
	}

	return e;
}


function getMessageAction(text) {

	// [Q] train service has resumed following an earlier incident involving a train with mechanical problems at <STRONG>Avenue H.</STRONG>
	// Northbound [N],[R] and [W] trains are running with delays because of signal problems at <STRONG>57 St-7 Av.</STRONG>
	// Northbound [6] trains will end at <STRONG>Westchester Square-East Tremont Av</STRONG> because of a loss of power between <STRONG>Buhre Av</STRONG> and <STRONG>Pelham Bay Park</STRONG>.

	// Some northbound [E] trains are running local from <STRONG>Queens Plaza</STRONG> to <STRONG>Jackson Hts-Roosevelt Av</STRONG>.  Some northbound [E] trains are stopping long the [C] line from <STRONG>50 St</STRONG> to <STRONG>168 St</STRONG>.   Some northbound [F] trains are running local from <STRONG>21 St-Queensbridge</STRONG> to <STRONG>Jackson Hts-Roosevelt Av</STRONG>.  [M] trains no service between <STRONG>Essex St</STRONG> and <STRONG>Forest Hills-71 Av.</STRONG>   These service changes are because of signal problems at <STRONG>36 St (Queens).</STRONG>  Expect delays on [E], [F], [M] and [R] trains.
	
	const incident_types = {
		// Incidents
		'service_resumed': [
			'service has resumed',
			'following an earlier incident',
			'resumed service',
		],
		'signal_problems': ['signal problems'],
		'power_loss': ['loss of power'],
		'unautherized_person': [
			'unauthorized person on the tracks',
		],
		'mechanical_problems': [
			'mechanical problems',
		],

		// Diversions.
		'skip_stations': ['trains skip'],
		'service_ends_early': ['end early'],
		'running_local': [
			'trains are running local',
			'running local',
		],
		'running_slow': ['running with slower speeds'],

		// Construction
		'station_improvements': [
			'STATION IMPROVEMENTS',
			'STATION ENHANCEMENTS',
		],
		'electrical_improvements': ['ELECTRICAL IMPROVEMENTS'],
		'track_maintenance': [
			'TRACK MAINTENANCE',
			'TRACK REPLACEMENT',
		],
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
	parseLineStatus
}