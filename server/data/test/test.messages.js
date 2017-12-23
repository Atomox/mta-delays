
let event_messages = {

	structured: {
		normal: [
			{
				type: 'ServiceChange',
				type_detail: null,
				time: 'Posted: 11/25/2017 7:12PM',
				durration: null,
				message: 'Some northbound [N] trains are stopping on the [Q] line from <STRONG>57 St-7 Av</STRONG> and end at <STRONG>96 St.</STRONG> Some northbound [R] trains are stopping on the [Q] line from <B>57 St-7 Av</B> to <B>Lexington Av-63 St</B>, then over the [F] line from <B>Lexington Av-63 St</B> to <B>Jackson Heights-Roosevelt Av.</B> This service change is because of a train with mechanical problems at <B>5 Av-59 St.</B> Expect delays in [F][N][Q][R] train service.',
				message_raw: '<span class="TitleDelay">Delays</span> <span class="DateStyle">Posted: 11/25/2017 7:12PM</span> Some northbound [N] trains are stopping on the [Q] line from <STRONG>57 St-7 Av</STRONG> and end at <STRONG>96 St.</STRONG> Some northbound [R] trains are stopping on the [Q] line from <B>57 St-7 Av</B> to <B>Lexington Av-63 St</B>, then over the [F] line from <B>Lexington Av-63 St</B> to <B>Jackson Heights-Roosevelt Av.</B> This service change is because of a train with mechanical problems at <B>5 Av-59 St.</B> Expect delays in [F][N][Q][R] train service.',
			},
			{
				type: 'Delays',
				type_detail: null,
				time: 'Posted: 11/15/2017 12:22PM',
				durration: null,
				message: ' [2], [3], [4] and [5] trains are running with delays in both directions because of signal maintenance at <STRONG>Eastern Pkwy-Brooklyn Museum.</STRONG>',
				message_raw: '<span class="TitleDelay">Delays</span> <span class="DateStyle"> Posted: 11/15/2017 12:22PM  </span> [2], [3], [4] and [5] trains are running with delays in both directions because of signal maintenance at <STRONG>Eastern Pkwy-Brooklyn Museum.</STRONG>',
			},
			{
				type: 'PlannedWork',
				type_detail: null,
				time: '',
				durration: 'All times, Monday to Friday, Dec 4 - 8 Dec 11 - 15',
				message: 'TRACK & TRACK PLATE INSTALLATION, REPLACEMENT OF POWER & COMMUNICATION CABLES [2] [3] Trains run at reduced speed through the Clark St Tunnel between Manhattan and Brooklyn All times, Monday to Friday, Dec 4 - 8 Dec 11 - 15 The slower speed will keep everyone safe as our crews make critical repairs to the tunnel. Please allow additional travel time.',
				message_raw: '<b>TUNNEL RECONSTRUCTION</b> Weekend [2] [3] station closures and route changes Until Summer 2018 -- No service at Park Place, Wall St, Clark St and Hoyt St; use nearby [4] [5] stations No [2] [3] service between Manhattan and Brooklyn; take the [4] or [5] instead. Weekend service map for Lower Manhattan and Downtown Brooklyn New timetables with Weekend Route Changes | [2] pdf | [3] pdf | [4] pdf | [5] pdf',
			},
			{
				type: 'PlannedWork',
				type_detail: null,
				time: null,
				durration: 'Days, 9:30 AM to 4 PM, Mon to Fri, Dec 11 - 15    Dec 18 - 22',
				message: 'TRACK REPLACEMENT  [A] Trains replace the [S] Rockaway Park Shuttle Days, 9:30 AM to 4 PM, Mon to Fri, Dec 11 - 15    Dec 18 - 22    [A]  trains make all  [S]  stops between Broad Channel and Beach 116 St.',
			},
			{
				type: 'PlannedWork',
				type_detail: null,
				time: null,
				durration: 'Days, 9 AM to 3 PM, Mon to Fri, Nov 27 - Dec 1',
				message: 'SCHEDULED MAINTENANCE  [SIR] Trains board at the Tottenville-bound platform from Arthur Kill to Prince\'s Bay Stations Days, 9 AM to 3 PM, Mon to Fri, Nov 27 - Dec 1   Boarding change includes  Arthur Kill ,  Richmond Valley ,  Pleasant Plains  and     Prince\'s Bay Stations .',
			},
		],

		complex: [
			{
				type: 'PlannedWork',
				type_detail: null,
				time: '',
				durration: 'Weekend Until Summer 2018',
				message: 'Weekend [2] [3] station closures and route changes Until Summer 2018 -- No service at Park Place, Wall St, Clark St and Hoyt St; use nearby [4] [5] stations No [2] [3] service between Manhattan and Brooklyn; take the [4] or [5] instead.',
			},
		],
	},


	message: {
		unplanned: {
			simple: [
				// Police Activity
				'Southbound [1] trains are running express from 72 St to 42 St because of an investigation at 42 St.',
				'[1] train service has resumed following an earlier investigation at Times Sq-42 Sq.',
				'Southbound [1] trains are running express from 96 St to 42 St because of NYPD activity 86 St.',

				// Fire Activity
				'[2], [3], [4] and [5] train service has resumed following earlier FDNY activity at Hoyt St.',
				'Southbound [2], [3], [4] and [5] train service changes and delays because of FDNY activity at Hoyt St. See mta.info',

				// Running Local // Signal Problems
				'Southbound [E] and [F] trains are running local from Forest Hills-71 Av to Jackson Hts-Roosevelt Av because of signal problems at Forest Hills-71 Av.',
				'[R] trains are running with delays in both directions because of signal problems between 86 St and Bay Ridge-95 St.',

				// Diversions
				'Southbound [Q] trains are stopping along the [R] line from Canal St to DeKalb Av because of a sick passenger at Canal St.',
				'Southbound [N] trains are stopping along the [D] line from 36 St (Bklyn) to Coney Island-Stillwell Av because of signal problems between 8 Av and Bay Parkway.',
				'Northbound [F] trains are stopping along the [A] line from Jay St-MetroTech to 42 St-Port Authority, then stopping along the [E] line to Jackson Heights-Roosevelt Av. These service changes are because of switch problems at Broadway-Lafayette St. Expect delays on the [A], [E], and [F] lines.',
				
				// Rail Condition
				'There is limited [A] train service between 168 St and Inwood-207 St in both directions because of a rail condition at 190 St.',
				'[7D] and [7] trains are running with delays in both directions because of an ongoing track condition at Grand Central-42 St.',

				// Terrorism / Incident
				'[1] [2] [3] [N] [R] [Q] [W] and [7] trains are bypassing Times Sq-42 St in both directions, [A] [C] and [E] trains are bypassing 42 St/Port Authotiy.',
				'Northbound [2] trains are running with delays because of an unruly passenger at Sterling St.',
			],
			complex: [
				'Some southbound [2] and [3] trains end at Chambers St or Wall St. Some southbound [2] and [3] trains are stopping along the [1] line from Chambers St to South Ferry then end. Southbound [4] and [5] trains end at Bowling Green or Brooklyn Bridge-City Hall. These service changes are because of a person struck by a train at Atlantic Av-Barclays Ctr.',
				"Some 34 St bound [7] trains are running express from 74 St-Broadway to Queensboro Plaza because of signal problems at 61 St-Woodside. Our crews are on site trying to fix it ASAP and we'll follow up soon. Stay tuned for updates.",
			],
		},

		planned: {
			simple: [
				'SIGNAL MAINTENANCE [A] Trains make local stops in both directions at 23 St and 50 St',

				// Skip Stations
				'TRACK REPLACEMENT [1] South Ferry-bound trains skip 66 St, 59 St and 50 St',
				'TRACK MAINTENANCE [A] Ozone Park/Far Rockaway-bound trains skip 163, 155, 135, 116, 110, 103, 96, 86, 81 and 72 Sts',
				'TRACK MAINTENANCE [D] Norwood-bound trains skip 170 St, 174-175 Sts and 182-183 Sts',
				'TRACK MAINTENANCE [F] Jamaica-bound trains skip 14 St and 23 St. Weekend, 9:45 PM Fri to 7 AM Sun , Dec 22 - 24 For service to these stations, take the [F] to 34 St-Herald Sq and transfer to a Coney Island-bound [F]. For service from these stations, take the [F] to W 4 St and transfer to a Jamaica-bound [F].',

				// Service Ends Early
				'TRACK MAINTENANCE [5] Service ends early between E 180 St and Bowling Green [2] [4] trains provide alternate service',

				// Rerouted
				'SIGNAL MAINTENANCE [A] Trains run via the [F] in both directions between W 4 St and Jay St-MetroTech [E] and [J] trains provide alternate service',
				'SIGNAL MAINTENANCE [C] Trains run via the [F] in both directions between W 4 St and Jay St-MetroTech [E] and [J] trains provide alternate service',
				'PRIORITY REPAIRS [R] Manhattan-bound trains skip 53 St, 45 St, 25 St, Prospect Av, 4 Av-9 St and Union St',

				// No Service Parital
				'SIGNAL MAINTENANCE [J] No trains between Essex St and Broad St [4] [6] [N] [F] [R] and [W] trains provide alternate service',
				'TRACK MAINTENANCE [G] No trains between Bedford-Nostrand Avs and Church Av [F] trains and [SB] free shuttle buses provide alternate service',
				'FASTRACK PROGRAM [N] No trains in Manhattan [Q] Trains are rerouted in Manhattan [R] Service ends early in Manhattan and Queens',
				'TRACK MAINTENANCE [R] No trains running [4] [E] [M] [N] trains and [SB] free shuttle buses provide alternate service',

				// Special
				'TRACK REPLACEMENT  [A] Trains replace the [S] Rockaway Park Shuttle Days, 9:30 AM to 4 PM, Mon to Fri, Dec 11 - 15    Dec 18 - 22    [A]  trains make all  [S]  stops between Broad Channel and Beach 116 St.',
				],
			complex: [
				// Train Swap
				'SERVICE INFORMATION [2] trains replace [5] service between Dyre Av and E 180 St [5] trains replace [2] service between Wakefield-241 St and E 180 St',
			],
		},
	},
};

let train_line = {
	R: [

		{
			stations: ['DeKalb Av', 'Canal St'],
			station_ids: [],
			stationsOtherLines: [],
			message: 'SIGNAL MAINTENANCE [R] Trains run via the [Q] in both directions between DeKalb Av and Canal St',
		},
		{
			stations: ['86 St', 'Bay Ridge - 95 St'],
			station_ids: ['Bk38', 'Bk39'],
			message: '[R] trains are running with delays in both directions because of signal problems between 86 St and Bay Ridge-95 St.',
		},
		{
			stations: ['65 St', 'Northern Blvd', '46 St', 'Steinway St', '36 St', 'Queens Plaza'],
			station_ids: ['Q268', 'Q269', 'Q270', 'Q271', 'Q272'],
			problem: '36 St exists in Queens and Brooklyn',
			message: 'TRACK MAINTENANCE [R] Bay Ridge-bound trains skip 65 St, Northern Blvd, 46 St, Steinway St and 36 St. Late Evenng, 9:45 PM to 11 PM, Friday, Dec 22. For service to these stations, take the [R] to Queens Plaza and transfer to a Forest Hills-bound. For service from these stations, take the [R] to Roosevelt Av and transfer to a Bay Ridge-bound [R].',
		},

/*
		{
			stations: ['57 St - 7 Av', '5 Av/59 St', 'Jackson Heights-Roosevelt Av'],
			stationsOtherLines: ['96 St', 'Lexington Av-63 St'],
			stationIds: [],
			problem: '59 St exists in Manhattan and Brooklyn',
			message: 'Some northbound [N] trains are stopping on the [Q] line from 57 St-7 Av and end at 96 St. Some northbound [R] trains are stopping on the [Q] line from 57 St-7 Av to Lexington Av-63 St, then over the [F] line from Lexington Av-63 St to Jackson Heights-Roosevelt Av. This service change is because of a train with mechanical problems at 5 Av-59 St. Expect delays in [F][N][Q][R] train service.',
		},
 
		{
			stations: ['53 St', '45 St', '25 St', 'Prospect Av', '4 Av-9 St', 'Union St'],
			station_ids: ['Bk34', 'Bk33', 'Bk31', 'Bk30', 'Bk608', 'Bk28'],
			problem: '9th St is listed as Line-Station (4 Av-9 St)',
			message: 'PRIORITY REPAIRS [R] Manhattan-bound trains skip 53 St, 45 St, 25 St, Prospect Av, 4 Av-9 St and Union St',
		},
		
*/

/*
		{
			stations: ['Jackson Hts-Roosevelt Av', 'Forest Hills-71 Av'],
			station_ids: ['Canal St','57 St-7 Av'],
			message: 'Some Forest Hills-bound [M] and [R] trains are running express from Jackson Hts-Roosevelt Av to Forest Hills-71 Av because of signal problems at Jackson Hts-Roosevelt Av.',
		},
		{
			stations: [],
			message: 'Northbound [N] trains are running local from Canal St to 57 St-7 Av.Northbound [Q] trains will end at Times Sq-42 St.Northbound [Q] trains are running local from Canal St to Times Sq-42 St.These service changes are because of a train with mechanical problems at 57 St-7 Av.Expect delays on the [N], [Q], [R] and [W] trains.',
		},
*/
	],
}



module.exports = {
	event_messages,
	train_line,
};