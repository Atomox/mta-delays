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


function parseStatusFeed(feedObject) {

	let my_status = [];

	let t = feedObject;

	for (let o in t) {
		my_status.push(parseSingleEvent(t[o])); 
	}

	console.log(my_status);

	return my_status;
}


function parseSingleEvent(event) {

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


	e.detail = parseDetailMessage(e.detail, e.summary);

	return e;

		/**
		 	2017-07-08T00:00:00-04:00  -- # MTA NYCT_162679
			PublicationWindow { 
				StartTime: [ '2017-07-08T00:00:00-04:00' ],
			  	EndTime: [ '2018-08-26T23:59:00-04:00' ] }
			Summary { 
				_: 'TUNNEL RECONSTRUCTION', 
				'$': { 'xml:lang': 'EN' } }
			Description { 
				_: 'TUNNEL RECONSTRUCTION', '$': { 'xml:lang': 'EN' } }
			Long Desc 
				&lt;b&gt;&lt;i&gt;TUNNEL RECONSTRUCTION&lt;/i&gt; &lt;/b&gt; &lt;br clear=left&gt;&lt;b&gt;Weekend [2] [3] station closures and route changes&lt;/b&gt;Until Summer 2018&lt;br&gt;&lt;br&gt;No service at Park Place, Wall St, Clark St and Hoyt St; use nearby [4] [5] stations&lt;br&gt;&lt;br&gt;No [2] [3] service between Manhattan and Brooklyn; take the [4] or [5] instead.&lt;br&gt;&lt;br&gt;Weekend service map for &lt;a href=http://web.mta.info/nyct/service/pdf/FF_Clark_St_web_map.pdf target=_blank&gt;&lt;font color=#0000FF&gt;Lower Manhattan and Downtown Brooklyn&lt;/font&gt;&lt;/a&gt;&lt;br&gt;&lt;br&gt;&lt;/font&gt;New timetables with Weekend Route Changes | [2] &lt;a href=http://web.mta.info/nyct/service/pdf/t2cur.pdf target=_blank&gt;&lt;font color=#0000FF&gt;pdf&lt;/font&gt;&lt;/a&gt; | [3] &lt;a href=http://web.mta.info/nyct/service/pdf/t3cur.pdf target=_blank&gt;&lt;font color=#0000FF&gt;pdf&lt;/font&gt;&lt;/a&gt; | [4] &lt;a href=http://web.mta.info/nyct/service/pdf/t4cur.pdf target=_blank&gt;&lt;font color=#0000FF&gt;pdf&lt;/font&gt;&lt;/a&gt; | [5] &lt;a href=http://web.mta.info/nyct/service/pdf/t5cur.pdf target=_blank&gt;&lt;font color=#0000FF&gt;pdf&lt;/font&gt;&lt;/a&gt;&lt;br&gt;&lt;b&gt;&lt;br&gt;
			Source { SourceType: [ 'directReport' ] }
			Affects [ 
				{ 
					LineRef: [ '\r\n                      MTA NYCT_2' ],
			    	DirectionRef: [ '1' ] },
			  	{ 	
			  		LineRef: [ '\r\n                      MTA NYCT_2' ],
			    	DirectionRef: [ '0' ] },
			  	{ 
			  		LineRef: [ '\r\n                      MTA NYCT_3' ],
			    	DirectionRef: [ '1' ] },
			  	{ 
			  		LineRef: [ '\r\n                      MTA NYCT_3' ],
			    	DirectionRef: [ '0' ] } ]
			Consequences { 
				Consequence: [ { 
					Condition: [Array],
					Severity: [Array] } ] }
		 */

		/*
		{ 
			CreationTime: [ '2017-11-26T20:36:22.85-05:00' ],
		    SituationNumber: [ '\r\n                  MTA NYCT_2f6099d7-5dec-4e84-a699-d361868b8feb' ],
		    PublicationWindow: [ [Object] ],
		    Summary: [ [Object] ],
		    Description: [ [Object] ],
		    LongDescription:
		     [ 'Southbound [2]and [5] trains are running with delays because of signal problems at 149 St-Grand Concourse.' ],
		    Planned: [ 'false' ],
		    ReasonName: [ 'Delays' ],
		    MessagePriority: [ '2' ],
		    Source: [ [Object] ],
		    Affects: [ [Object] ],
		    Consequences: [ [Object] ] 
		},


		console.log("\n", '--------------------------------');

		let lines = [];
		let k = t[o].Affects[0].VehicleJourneys[0].AffectedVehicleJourney;
		for (let j in k) {
			lines.push({ line: k[j].LineRef[0].trim(), dir: k[j].DirectionRef[0].trim()});
		}

		console.log(lines);
		console.log("\n", ' - - - ', t[o].ReasonName, '', t[o].Consequences[0].Consequence[0].Condition[0], ' - - - (', t[o].Consequences[0].Consequence[0].Severity[0], ')');
		console.log(t[o].Summary[0]._);
		console.log('--------------------------------');

		
		console.log(t[o].CreationTime[0], ' -- #', t[o].SituationNumber[0].trim());
		console.log('PublicationWindow', t[o].PublicationWindow[0]);
		
		console.log('Description', t[o].Description[0]._);
//		console.log('Long Desc', t[o].LongDescription[0]);

		console.log('--------------------------------');

		*/

}


function parseDetailMessage(status, short_msg) {

	// Clean it up.
	status = cleanStatusText(decode(status));


	status = formatSingleStatusEvent(status);

	// Pull the original message out of there.
	status.message = status.message.replace(short_msg, '[- - -]');

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

		// Store the original message.
		e.message = event;

		// Determine if the event type has more detail.
		e.type_detail = getMessageAction(event);

		// Get an interruption time
		e.time = getMessageDateTime(event);

		// Get a scheduled time.
		e.durration = getMessagePlannedWorkDate(event);	

		// TUNNEL RECONSTRUCTION Weekend [2] [3] 
		// 
		// station closures and route changes
		// 
		// Until Summer 2018
		// 
		// No service at Park Place, Wall St, Clark St and Hoyt St; use nearby [4] [5] stations No [2] [3] service between Manhattan and Brooklyn; take the [4] or [5] instead. Weekend service map for Lower Manhattan and Downtown Brooklyn New timetables with Weekend Route Changes | [2] pdf | [3] pdf | [4] pdf | [5] pdf


		// TRACK REPLACEMENT [C] 168 St-bound trains skip
		// 
		// Spring St, 23 St and 50 St
		// 
		// Weekend , Saturday and Sunday, Nov 25 - 26
		// 
		// For service to Spring St, take the [C] to W 4 St and transfer to a Euclid Av-bound [C]. For service from this station, take the [C] to Canal St and transfer to a 168 St-bound [C]. For service to 23 and 50 Sts, transfer to the [E] at 14 St or 42 St/Port Authority. For service from 23 or 50 Sts, take the [E] to 42 St/Port Authority and transfer to a 168 St-bound [C].


		// TRACK REPLACEMENT [A] No trains between
		// 
		// Broad Channel and Mott Av
		// 
		// [SB] Free shuttle buses provide alternate service
		// 
		// Weekends, 11:15 PM Fri to 5 AM Mon, Nov 24 - 27 &bull; Dec 1 - 4
		// 
		// [A] service operates between 207 St and Broad Channel , and replace the [S] to/from Beach 116 St .
		// 
		// [SB] Buses make stops at Beach 90 , Beach 67 , Beach 60 , Beach 44 , Beach 36 , Beach 25 Sts and Mott Av .
		// 
		// &bull; Transfer between [A] trains and [SB] buses at Beach 90 St . Show Shuttle Bus Stops Station Shuttle Bus Stop Bus Mott Av Beach 22 St at Station Entrance &mdash; Beach 25 St Beach Channel Dr at Beach 25 St &mdash; Beach 36 St Beach Channel Dr at Beach 35 St (to Mott Av) Q22 Beach Channel Dr at 36 St (to Beach 90 St) Q22 Beach 44 St Beach Channel Dr at Beach 44 St Q22 Beach 60 St Beach Channel Dr at Beach 59 St Q22 Beach 67 St Beach Channel Dr at Beach 67 St Q22 Beach 90 St [A] Rockaway Beach Blvd at Beach 88 St Q22 Note: Service to/from Lefferts Blvd is not affected.
		// 
		// [ad] This service change affects one or more ADA accessible stations. Please call 511 for help with planning your trip. If you are deaf or hard of hearing, use your preferred relay service provider or the free 711 relay.


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
	}

	return e;
}


function getMessageDateTime(text) {
	let DatePattern = /(?=<span\s*class="DateStyle"\s*>(.*)<\/span>)/gi;
	let dateResults = text.split(DatePattern);
	return (dateResults[1]) ? dateResults[1].trim() : null;
}


function getMessagePlannedWorkDate(text) {

	// let workDatePattern = /((Weekend|Weekends|Late Nights|Days|Late Evenings|All times|Until)\s*,?(\s*([0-9]{0,2}:?[0-9]{0,2}\s*[APM]{0,2}\s*)(Saturday|Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Mon|Tue|Wed|Thur|Thu|Fri|Sat|Sun|to|until|and|\s)*,?){09},?\s((Jan|Feb|Mar|Apr|May|June|July|Aug|Sept|Oct|Nov|Dec|Spring|Summer|Fall|Winter)\s*[0-9]{0,2}\s*-?\s*[0-9]{0,2}\s*(20[0-9]{2})?\s*(\,|&bull\;)?\s*)*)+/i;

	// In Progress -- Reduction
	let workDatePattern = /((Weekends|Weekend|Late Nights|Nights|Days|Late Evenings|Evenings|All times|Until)\s*,?(\s*((([0-9]{1,2}|[0-9]{1,2}:[0-9]{1,2})\s*(AM|PM)\s*)|([0-9]{1,2}\s*(-\s*[0-9]{1,2})?\s*(20[0-9]{2})?)?|(20[0-9]{2}))?\s*[,-]?\s*((Saturday|Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Sat|Sun|Mon|Tue|Wed|Thur|Thu|Fri|to|until|beginning(\sat)?|further\snotice|and)|(Jan|Feb|Mar|Apr|May|June|July|Aug|Sept|Oct|Nov|Dec|Spring|Summer|Fall|Winter))?\s*(\,|&bull\;)?\s*)*\s*)+/i;

	let dateResults = text.match(workDatePattern);

	if (dateResults && dateResults[0]) {
		return dateResults[0].trim();
	}

	console.warn('Can\'t find event dates.');
	return null;
}


function getMessageAction(text) {

	// [Q] train service has resumed following an earlier incident involving a train with mechanical problems at <STRONG>Avenue H.</STRONG>
	// Northbound [N],[R] and [W] trains are running with delays because of signal problems at <STRONG>57 St-7 Av.</STRONG>
	// Northbound [6] trains will end at <STRONG>Westchester Square-East Tremont Av</STRONG> because of a loss of power between <STRONG>Buhre Av</STRONG> and <STRONG>Pelham Bay Park</STRONG>.

	// Some northbound [E] trains are running local from <STRONG>Queens Plaza</STRONG> to <STRONG>Jackson Hts-Roosevelt Av</STRONG>.  Some northbound [E] trains are stopping long the [C] line from <STRONG>50 St</STRONG> to <STRONG>168 St</STRONG>.   Some northbound [F] trains are running local from <STRONG>21 St-Queensbridge</STRONG> to <STRONG>Jackson Hts-Roosevelt Av</STRONG>.  [M] trains no service between <STRONG>Essex St</STRONG> and <STRONG>Forest Hills-71 Av.</STRONG>   These service changes are because of signal problems at <STRONG>36 St (Queens).</STRONG>  Expect delays on [E], [F], [M] and [R] trains.
	// SIGNAL MAINTENANCE  [S] Rockaway Park Shuttle - No trains running[A] trains and [SB] free shuttle buses provide alternate service  Days, 9:30 AM to 4 PM, Mon  and  Tue, Nov 27 - 28     [SB] Buses operate between  Beach 67 St [A]  and  Beach 116 St , stopping at Beach 90,  Beach 98 and Beach 105 Sts.   Transfer between [A] trains and [SB] buses at Beach 67 St.     Show Shuttle Bus Stops        Station   Shuttle Bus Stop
	// SCHEDULED MAINTENANCE  [SIR] Trains board at the Tottenville-bound platform from Arthur Kill to Prince\'s Bay Stations Days, 9 AM to 3 PM, Mon to Fri, Nov 27 - Dec 1   Boarding change includes  Arthur Kill ,  Richmond Valley ,  Pleasant Plains  and     Prince\'s Bay Stations .
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
		'mechanical_problems': [
			'mechanical problems',
		],
		'rail_condition': ['rail condition'],

		


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
		],
		'running_local': [
			'trains run local',
			'trains are running local',
			'trains make local stops',
			'local stops',
			'running local',
			'run local',
		],
		'route_change': ['route changes'],
		'no_trains': [
			'No trains between',
			'No trains running'
		],
		'no_trains_partial': [
			'No trains between',
			'No trains running between',
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
	parseStatusFeed,
	getMessagePlannedWorkDate,
	getMessageDateTime,
}