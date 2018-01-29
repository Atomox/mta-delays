
let event_messages = {

	"structured": {
		"normal": [
			{
				"type": "Delays",
				"type_detail": [
					"service_resumed",
					"mechanical_problems",
				],
				time: null,
				durration: null,
				message: "[4] and [5] train service has resumed following an earlier train with mechanical problems at Bowling Green.",
				stations: {
					"MTA NYCT_4": {
						"stations": {
							"Mn414-420": "Bowling Green"
						}
					},
					"MTA NYCT_5": {
						"stations": {
							"Mn414-420": "Bowling Green"
						}
					}
				},
				line: [
					"MTA NYCT_4",
					"MTA NYCT_5",
				],
			},
			{
				type: null,
				type_detail: [
					"route_change",
				],
				tag: ["MTAD-014", "MTAD-001"],
				time: null,
				durration: '9:45 PM to 11:45 PM, Mon to Thu, Jan 15 - 18',
				message: '9:45 PM to 11:45 PM, Mon to Thu, Jan 15 - 18 No [R] trains between Bay Ridge-95 St and 36 St, Brooklyn, due to track maintenance. Take free shuttle buses and the [N]. [R] service operates between 71 Av and 36 St, and via the [D] to/from 9 Av, the last stop. For 45 St, 53 St, and 59 St, take the [N] via transfer at 36 St. Free shuttle buses make all [R] stops between 59 St and Bay Ridge-95 St. Transfer between the [N] and shuttle buses at 59 St. 11:45 PM to 5 AM, Mon to Fri, Jan 15 - 19 No [R] trains running, due to track maintenance. Take free shuttle buses and the [N]. For service between Whitehall St and 59 St, take the [N]. Free shuttle buses make all [R] stops between 59 St and Bay Ridge-95 St. Transfer between the [N] and shuttle buses at 59 St. [AD] These service changes affect one or more ADA accessible stations. Please call 511 for help with planning your trip. If you are deaf or hard of hearing, use your preferred relay service provider or the free 711 relay. For more information, click on the mta.info link in this email and read station signs.',
				route_change: {
					tag: ['A-operates-then-overC'],
					message: "[R] service operates between [Qs261-G08] and [Qs272-G20], and via the [D] to/from [Bk59-B12], the last stop.",
					trains: ['R'],
					route: [
						{
							lines: ["R"],
							along: null,
							from: 'Qs261-G08',
							to: 'Qs272-G20',
						},
						{
							lines: ["R"],
							along: "D",
							from: 'Qs272-G20',
							to: 'Bk59-B12',
						},
					],
				},
				line: [
					'MTA NYCT_R',
				],
			},
			{
				type: null,
				type_detail: [
					"route_change",
				],
				tag: ["MTAD-014", "MTAD-001", 'MTAD-013'],
				time: null,
				durration: 'WEEKEND 6:15 AM to 11:45 PM, Sat, Jan 13 8 AM to 10 PM, Sun, Jan 14',
				message: 'WEEKEND 6:15 AM to 11:45 PM, Sat, Jan 13 8 AM to 10 PM, Sun, Jan 14 No [M] trains between Essex St and Broadway Junction, due to track replacement. Take the [J] instead. NIGHTS 9 PM to 12 midnight, Friday, Jan 12 No [M] trains between 71 Av and Essex St, due to signal improvements. Take the [E][R]. [M] service operates between Broadway Junction and Essex St, and is rerouted via the [J] to/from Chambers St. Trains stop at Bowery and Canal St. For B\'way-Lafayette St and stations along 6 Av, use nearby [N][Q][R] stations on Broadway. Transfer at Roosevelt Av [E]/[R], Times Sq-42 St/Port Authority [E]/[R], and/or Canal St M/R. All times until April 30, 2018 No [M] trains between Myrtle-Wyckoff Avs and Myrtle Av (Broadway), due to viaduct reconstruction. Take free shuttle buses. [M] service operates in two sections: 1. Between Essex St and Myrtle Av, and via the [J] to/from Broadway Junction, days/evenings*. 2. Between Metropolitan Av and Myrtle-Wyckoff Avs (trains run every 20 minutes, Sat and Sun, from 7:30 AM to 9:30 AM). Free shuttle buses operate between Myrtle-Wyckoff Avs and Myrtle Av. *Suspended this weekend. [AD] This service change affects one or more ADA accessible stations. Please call 511 for help with planning your trip. If you are deaf or hard of hearing, use your preferred relay service provider or the free 711 relay. For more information, click on the mta.info link in this email and read station signs.',
				parsed_message: 'WEEKEND 6:15 AM to 11:45 PM, Sat, Jan 13 8 AM to 10 PM, Sun, Jan 14 No [M] trains between [Mn625-M18] and [Bk621-J27], due to track replacement. Take the [J] instead. NIGHTS 9 PM to 12 midnight, Friday, Jan 12 No [M] trains between [Qs261-G08] and [Mn625-M18], due to signal improvements. Take the [E][R]. [M] service operates between [Qs4-R05] Junction and Essex St, and is rerouted via the [J] to/from [Mn622-M21]. Trains stop at [Mn103-M19] and [Mn623-M20]. For [Mn619-D21] and stations along 6 Av, use nearby [N]/[Q]/[R] stations on Broadway. Transfer at [Qs616-G14] [E]/[R], Times Sq-[Mn611-A27] [E]/[R], and/or [Mn169-A34] M/R. All times until April 30, 2018 No [M] trains between [Bk630-M08] and [Bk97-M11] (Broadway), due to viaduct reconstruction. Take free shuttle buses. [M] service operates in two sections: 1. Between Essex St and [Bk97-M11], and via the [J] to/from Broadway Junction, days/evenings*. 2. Between Metropolitan Av and Myrtle-Wyckoff Avs (trains run every 20 minutes, Sat and Sun, from 7:30 AM to 9:30 AM). Free shuttle buses operate between Myrtle-Wyckoff Avs and Myrtle Av. *Suspended this weekend. [AD] This service change affects one or more ADA accessible stations. Please call 511 for help with planning your trip. If you are deaf or hard of hearing, use your preferred relay service provider or the free 711 relay. For more information, click on the mta.info link in this email and read station signs.',
				route_change: {
					tag: ['A-operates-then-overC'],
					message: "[M] service operates between [Bk621-J27] and [Mn625-M18], and is rerouted via the [J] to/from [Mn622-M21]. ``` [M] service operates in two sections: 1. Between [Mn625-M18] and [Bk97-M11], and via the [J] to/from [Bk621-J27],",
					trains: ['M'],
					route: [
						{
							lines: ["M"],
							along: null,
							from: 'Bk621-J27',
							to: 'Mn625-M18',
						},
						{
							lines: ["M"],
							along: "J",
							from: 'Mn625-M18',
							to: 'Mn622-M21',
						},
					],
				},
				line: [
					'MTA NYCT_M',
				],
			},
			{
				type: null,
				type_detail: [
					"injury",
					"route_change",
					"no_trains_partial"
				],
				tag: ["MTAD-006", "MTAD-001"],
				time: null,
				durration: null,
				message: "Some southbound [2] and [3] trains end at Chambers St or Wall St. Some southbound [2] and [3] trains are stopping along the [1] line from Chambers St to South Ferry then end. Southbound [4] and [5] trains end at Bowling Green or Brooklyn Bridge-City Hall. These service changes are because of a person struck by a train at Atlantic Av-Barclays Ctr.",
				message_station_parse: "Some southbound [2] and [3] trains end at [Mn327-137] or [Mn333-230]. Some southbound [2] and [3] trains are stopping along the [1] line from [Mn327-137] to South Ferry then end. Southbound [4] and [5] trains end at [Mn414-420] or [Mn622-640]. These service changes are because of a person struck by a train at [Bk617-235].",
				line: [
					'MTA NYCT_2',
					'MTA NYCT_3',
					'MTA NYCT_4',
					'MTA NYCT_5',
				],
				alt_instructions: null,
				ad_message: null,
				route_change: {
					tag: ['AB-overC-end'],
					message: "Some southbound [2] and [3] trains end at [Mn327-137] ``` Some southbound [2] and [3] trains are stopping along the [1] line from [Mn327-137] to [Mn635-142] then end. Southbound [4] and [5] trains end at [Mn414-420]",
					trains: ['2','3'],
					route: [
						{
							lines: ["2","3"],
							along: "1",
							from: "Mn327-137",
							to: "Mn635-142",
						},
					],
				new_stations: [ ],
				},
			},
			{
				type: null,
				type_detail: [
					"delays",
					"signal_problems"
				],
				time: null,
				durration: null,
				message: "Southbound [E] and [F] trains are running with delays because of signal problems at Woodhaven Blvd.",
				stations: {
					'MTA NYCT_E': {
						processed_message: "Southbound [E] and [F] trains are running with delays because of signal problems at Woodhaven Blvd.",
						stations: { },
						analysis: [ ]
					},
					'MTA NYCT_F': {
						processed_message: "Southbound [E] and [F] trains are running with delays because of signal problems at Woodhaven Blvd.",
						stations: { },
						analysis: [ ]
					}
				},
				trains: [
				"MTA NYCT_E",
				"MTA NYCT_F"
				],
				alt_instructions: null,
				ad_message: null,
				route_change: false,
				TEST_NOTE: 'This tests ensuring that stations mentioned on a train route, but that they do not stop at normally, are not included inthe stations list.',
			},
			{
				type: null,
				type_detail: [
					"running_local"
				],
				time: null,
				durration: "Late Evenings, beginning 10 PM, Mon to Thu, Dec 4 - 7",
				message: "[E] Trains run local in both directions between Roosevelt Av and 71 Av Trains stop at Elmhurst, Grand Avs, Woodhaven Blvd, 63 Dr, and 67 Av. Please allow additional travel time.",
				message_raw: "[E] Trains run local in both directions between Roosevelt Av and 71 Av Late Evenings, beginning 10 PM, Mon to Thu, Dec 4 - 7 Trains stop at Elmhurst, Grand Avs, Woodhaven Blvd, 63 Dr, and 67 Av. Please allow additional travel time.",
				message_station_parse: "[E] Trains run local in both directions between Roosevelt Av and [Qs261-G08] Late Evenings, beginning 10 PM, Mon to Thu, Dec 4 - 7 Trains stop at Elmhurst, Grand Avs, Woodhaven Blvd, 63 Dr, and 67 Av. Please allow additional travel time.",
				stations: {
					'MTA NYCT_E': {
						processed_message: "[E] Trains run local in both directions between Roosevelt Av and [Qs261-G08] Late Evenings, beginning 10 PM, Mon to Thu, Dec 4 - 7 Trains stop at Elmhurst, Grand Avs, Woodhaven Blvd, 63 Dr, and 67 Av. Please allow additional travel time.",
						stations: {
							'Qs261-G08': "71 Av",
							'Qs616-G14': "Roosevelt Av"
						},
					},
				},
				trains: [
					"MTA NYCT_E"
				],
			},
			{
				type: 'ServiceChange',
				type_detail: [
					'route_change',
				],
				tag: ["MTAD-001", "MTAD-004"],
				time: "Posted: 11/25/2017 7:12PM",
				durration: null,
				message: "Some northbound [N] trains are stopping on the [Q] line from 57 St-7 Av and end at 96 St. Some northbound [R] trains are stopping on the [Q] line from 57 St-7 Av to Lexington Av-63 St, then over the [F] line from Lexington Av-63 St to Jackson Heights-Roosevelt Av. This service change is because of a train with mechanical problems at 5 Av-59 St. Expect delays in [F][N][Q][R] train service.",
				alt_instructions: null,
				route_change: {
					tag: ['AB-overC-end', 'A-overC-thenD'],
					message: "Some northbound [N] trains are stopping on the [Q] line from [Mn9-R14] and end at [Mn475-Q05]. Some northbound [R] trains are stopping on the [Q] line from [Mn9-R14] to [Mn223-B08], then over the [F] line from [Mn223-B08] to [Qs616-G14].",
					trains: ['N', 'R'],
					route: [
						{
							lines: ['N'],
							along: "Q",
							from: 'Mn9-R14',
							to: 'Mn475-Q05',
						},
						{
							lines: ['R'],
							along: 'Q',
							from: 'Mn9-R14',
							to: 'Mn223-B08',
						},
						{
							lines: ['R'],
							along: 'F',
							from: 'Mn223-B08',
							to: 'Qs616-G14',
						},
					],
				},
/**
				stations: {
					'MTA NYCT_N': {
						stations: {
							'Mn9-R14': '57 St-7 Av',
							'Mn8-R13': '5 Av-59 St',
						}
					},
					'MTA NYCT_Q': {
						stations: {
							'Mn9-R14': '57 St-7 Av',
							'Mn475-Q05': '96 St',
							'Mn223-B08': 'Lexington Av-63 St'
						}
					},

					'MTA NYCT_R': {
						stations: {
							'Mn9-R14': '57 St-7 Av',
							'Qs616-G14': 'Jackson Heights-Roosevelt Av',
							'Mn8-R13': '5 Av-59 St',
						}
					},
					'MTA NYCT_F': {
						stations: {
							'Qs616-G14': 'Jackson Heights-Roosevelt Av',
							'Mn223-B08': 'Lexington Av-63 St'
						}
					},
				},
*/
				line: [
					{ line: 'MTA NYCT_N'},
					{ line: 'MTA NYCT_Q'},
					{ line: 'MTA NYCT_R'},
					{ line: 'MTA NYCT_F'},
				],
			},
			{
				type: 'Delays',
				type_detail: null,
				time: 'Posted: 11/15/2017 12:22PM',
				durration: null,
				message: " [2], [3], [4] and [5] trains are running with delays in both directions because of signal maintenance at Eastern Pkwy-Brooklyn Museum.",
				message_raw: "<span class=\"TitleDelay\">Delays</span> <span class=\"DateStyle\"> Posted: 11/15/2017 12:22PM  </span> [2], [3], [4] and [5] trains are running with delays in both directions because of signal maintenance at Eastern Pkwy-Brooklyn Museum.",
				alt_instructions: null,
				stations: {
					'MTA NYCT_2': {
						stations: {
							'Bk341-238': 'Eastern Pkwy-Brooklyn Museum',
						}
					},
					'MTA NYCT_3': {
						stations: {
							'Bk341-238': 'Eastern Pkwy-Brooklyn Museum',
						}
					},
					'MTA NYCT_4': {
						stations: {}
					},
					'MTA NYCT_5': {
						stations: {}
					},
				},
				line: [
					{ line: 'MTA NYCT_2'},
					{ line: 'MTA NYCT_3'},
					{ line: 'MTA NYCT_4'},
					{ line: 'MTA NYCT_5'},
				],
			},
			{
				type: 'Delays',
				type_detail: [
					'route_change',
				],
				tag: [
					// Route Change - General
					"MTAD-001",
					// Stations can exist in multiple lines
					"MTAD-026"
				],
				time: null,
				durration: null,
				message: "Some northbound [E] trains are running local from Queens Plaza to Jackson Hts-Roosevelt Av. Some northbound [E] trains are stopping long the [C] line from 50 St to 168 St.   Some northbound [F] trains are running local from 21 St-Queensbridge to Jackson Hts-Roosevelt Av.  [M] trains no service between Essex St and Forest Hills-71 Av. These service changes are because of signal problems at 36 St (Queens). Expect delays on [E], [F], [M] and [R] trains.",
				route_change: {
					tag: ['A-overC'],
					message: "Some northbound [E] trains are stopping long the [C] line from [Mn162-A25] to [Mn605-A09].",
					trains: ["E"],
					route: [
						{
							lines: ["E"],
							along: "C",
							from: "Mn162-A25",
							to: "Mn605-A09"
						},
					],
				},
				stations: {
					'MTA NYCT_C': {
						stations: {
							'Mn162-A25': '50 St',
							'Mn605-A09': '168 St',
						}
					},
					'MTA NYCT_E': {
						stations: {
							'Mn162-A25': '50 St',
							'Qs273-G21': 'Queens Plaza',
							'Qs616-G14': 'Jackson Hts-Roosevelt Av',
							'Qs261-G08': 'Forest Hills-71 Av.',
						}
					},
					'MTA NYCT_F': {
						stations: {
							'Qs616-G14': 'Jackson Hts-Roosevelt Av. ',
							'Qs221-B04': '21 St-Queensbridge',
							'Qs261-G08': 'Forest Hills-71 Av.',
						}
					},
					'MTA NYCT_M': {
						stations: {
							'Mn625-M18': 'Essex St',
							'Qs273-G21': 'Queens Plaza',
							'Qs616-G14': 'Jackson Hts-Roosevelt Av. ',
							'Qs261-G08': 'Forest Hills-71 Av.',
							'Qs272-G20': '36 St (Queens)',
						}
					},
					'MTA NYCT_R': {
						stations: {
							'Qs273-G21': 'Queens Plaza',
							'Qs616-G14': 'Jackson Hts-Roosevelt Av. ',
							'Qs261-G08': 'Forest Hills-71 Av.',
							'Qs272-G20': '36 St (Queens)',
						}
					},
				},
				line: [
					{ line: 'MTA NYCT_C'},
					{ line: 'MTA NYCT_E'},
					{ line: 'MTA NYCT_F'},
					{ line: 'MTA NYCT_M'},
					{ line: 'MTA NYCT_R'},
				],
			},
			{
				type: 'PlannedWork',
				type_detail: null,
				time: null,
				durration: 'All times, Monday to Friday, Dec 4 - 8 Dec 11 - 15',
				message: "TRACK & TRACK PLATE INSTALLATION, REPLACEMENT OF POWER & COMMUNICATION CABLES [2] [3] Trains run at reduced speed through the Clark St Tunnel between Manhattan and Brooklyn All times, Monday to Friday, Dec 4 - 8 Dec 11 - 15 The slower speed will keep everyone safe as our crews make critical repairs to the tunnel. Please allow additional travel time.",
				alt_instructions: null,
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
			{
				type: 'PlannedWork',
				type_detail: null,
				time: null,
				durration: 'Weekend , Saturday, Dec 23',
				message: 'TRACK MAINTENANCE [C] 168 St-bound trains skip Spring St, 23 St and 50 St. Weekend , Saturday, Dec 23 For service to Spring and 23 Sts, take the [C] to W 4 or 34 St-Penn Station and transfer to a downtown [C] or [E]. For service to 50 St, transfer to the [E] at 42 St/Port Authority. For service from these stations, take the [C] or [E] to 42 St/Port Authority, 14 or Canal Sts and transfer to a 168 St-bound [C].',
			},
			{
				type: "PlannedWork",
				type_detail: null,
				time: null,
				durration: 'Weekend, 11:45 PM Fri to 7 AM Sun , Dec 22 - 24',
				message: 'TRACK MAINTENANCE New Lots Av-bound [4] and Flatbush Av-bound [5] trains skip Bergen St, Grand Army Plaza and Eastern Pkwy Weekend, 11:45 PM Fri to 7 AM Sun , Dec 22 - 24 For service to these stations, take the [4] or [5] to Franklin Av and transfer to a Manhattan-bound [4] or [5]. For service from these stations, take the [4] or [5] to Atlantic Av-Barclays Ctr and transfer to a New Lots Av-bound [4] or Flatbush Av-bound [5].',
				alt_instructions: 'For service to these stations, take the [4] or [5] to Franklin Av and transfer to a Manhattan-bound [4] or [5]. For service from these stations, take the [4] or [5] to Atlantic Av-Barclays Ctr and transfer to a New Lots Av-bound [4] or Flatbush Av-bound [5].',
			},
			{
				type: "PlannedWork",
				type_detail: null,
				time: null,
				durration: 'Late Nights, 9:45 PM to 5 AM, Mon to Fri, Dec 4 - 8    Dec 11 - 15    Dec 18 - 22',
				message: 'TRACK REPLACEMENT [1] South Ferry-bound trains skip 66 St, 59 St and 50 St Late Nights, 9:45 PM to 5 AM, Mon to Fri, Dec 4 - 8    Dec 11 - 15    Dec 18 - 22   For service to these stations, take the [1] to Times Sq-42 St and transfer to an uptown [1] or [2] local. For service from these stations, take the [1] or [2] to 72 St and transfer to a South Ferry-bound [1].',
				alt_instructions: 'For service to these stations, take the [1] to Times Sq-42 St and transfer to an uptown [1] or [2] local. For service from these stations, take the [1] or [2] to 72 St and transfer to a South Ferry-bound [1].',
			},
			{
				type: "PlannedWork",
				type_detail: null,
				time: null,
				durration: 'Evenings, Mon to Thu, Dec 4 - 7',
				message: 'SIGNAL MAINTENANCE [5] Service ends early between E 180 St and Bowling Green [2] [4] trains provide alternate service Evenings, Mon to Thu, Dec 4 - 7 [5] service operates between Dyre Av  and E 180 St. Travel Alternatives [TP] Transfer between [5] and [2] trains at E 180 St. Transfer between [2] and [4] trains at 149 St-Grand Concourse. Reminder: Late Night [5] service operates as scheduled in the Bronx.  [ad]  This service change affects one or more ADA accessible stations. Please call 511 for help with planning your trip. If you are deaf or hard of hearing, use your preferred relay service provider or the free 711 relay.',
				alt_instructions: 'Travel Alternatives [TP] Transfer between [5] and [2] trains at E 180 St. Transfer between [2] and [4] trains at 149 St-Grand Concourse. Reminder: Late Night [5] service operates as scheduled in the Bronx.',
			},
			{
				type: "PlannedWork",
				type_detail: null,
				time: null,
				durration: 'Late Nights, 9:45 PM Tue to 5 AM Wed, Dec 5 - 6                     9:45 PM Thu to 5 AM Fri, Dec 7 - 8',
				message: 'SIGNAL MAINTENANCE [6] Brooklyn Bridge-bound trains skip 33, 28, 23 Sts, Astor Pl, Bleecker, Spring and Canal Sts Late Nights, 9:45 PM Tue to 5 AM Wed, Dec 5 - 6                     9:45 PM Thu to 5 AM Fri, Dec 7 - 8 For service to these stations, take the [6] to 14 St-Union Sq or Brooklyn Bridge and transfer to an uptown [4] local or [6]. For service from these stations, take the [4] or [6] to 14 St-Union Sq or Grand Central-42 St and transfer to a Brooklyn Bridge-bound [6]. Alternate travel note: For service from Canal St, take the [J] to Chambers St-Brooklyn Bridge.   [ad]  This service change affects one or more ADA accessible stations. Please call 511 for help with planning<br>your trip. If you are deaf or hard of hearing, use your preferred relay service provider or the free 711 relay.',
				alt_instructions: 'For service to these stations, take the [6] to 14 St-Union Sq or Brooklyn Bridge and transfer to an uptown [4] local or [6]. For service from these stations, take the [4] or [6] to 14 St-Union Sq or Grand Central-42 St and transfer to a Brooklyn Bridge-bound [6]. Alternate travel note: For service from Canal St, take the [J] to Chambers St-Brooklyn Bridge.',
			},
			{
				type: "PlannedWork",
				type_detail: null,
				time: null,
				durration: 'Days, 9:45 AM to 3:30 PM, Mon and Tue, Dec 11 - 12    Mon to Fri, Dec 18 - 22    Tue to Fri, Dec 26 - 29',
				message: 'TRACK MAINTENANCE [2] Flatbush Av-bound trains skip Burke Av, Allerton Av, Pelham Pkwy and Bronx Park East Days, 9:45 AM to 3:30 PM, Mon and Tue, Dec 11 - 12    Mon to Fri, Dec 18 - 22    Tue to Fri, Dec 26 - 29 For service to these stations, take the [2] to E 180 St and transfer to a Wakefield-bound [2]. For service from these stations, take the [2] to Gun Hill Rd and transfer to a Flatbush Av-bound [2]. Alternate travel note: For service to these stations, transfer to the Bx39 bus at Gun Hill Rd.',
				alt_instructions: 'For service to these stations, take the [2] to E 180 St and transfer to a Wakefield-bound [2]. For service from these stations, take the [2] to Gun Hill Rd and transfer to a Flatbush Av-bound [2]. Alternate travel note: For service to these stations, transfer to the Bx39 bus at Gun Hill Rd.',
			},
			{
				type: 'PlannedWork',
				type_detail: [
					'route_change',
				],
				time: '',
				tag: ["MTAD-014", "MTAD-001", "MTAD-027"],
				durration: 'Late Nights, 9:30 PM to 5 AM, Mon to Fri, Dec 11 - 15',
				message: 'TRACK MAINTENANCE [2] No trains between Franklin Av and Flatbush Av [SB] Free shuttle buses provide alternate service Late Nights, 9:30 PM to 5 AM, Mon to Fri, Dec 11 - 15 [2] service operates between 241 St and Franklin Av, and via the [4] to/from Utica Av. [SB] Buses operate between Franklin Av and Flatbush Av, making stops at Nostrand Av, President St, Sterling St, Winthrop St, Church Av, Beverly Rd and Newkirk Av. Transfer between trains and [SB] buses at Franklin Av. Travel Alternatives [TP] Show Shuttle Bus Stops Station Shuttle Bus Stop Franklin Av  [2] [4] Eastern Pkwy at Franklin Av Nostrand Av [4] Nostrand Av at Eastern Pkwy (to Flatbush Av) Eastern Pkwy at Nostrand Av (to Franklin Av) President St Nostrand Av at Carroll St (to Flatbush Av) New York Av at Carroll St (to Franklin Av) Sterling St Nostrand Av at Lefferts Av (to Flatbush Av) New York Av at Empire Blvd (to Franklin Av) Winthrop St Nostrand Av at Winthrop St (to Flatbush Av) New York Av at Winthrop St (to Franklin Av) Church Av Nostrand Av at Church Av (to Flatbush Av) New York Av at Church Av (to Franklin Av) Beverly Rd Nostrand Av at Beverly Rd (to Flatbush Av) New York Av at Beverly Rd (to Franklin Av) Newkirk Av Nostrand Av at Newkirk Av (to Flatbush Av) New York Av at Avenue D (to Franklin Av) Flatbush Av Nostrand Av at Flatbush Av [ad]  This service change affects one or more ADA accessible stations. Please call 511 for help with planning your trip. If you are deaf or hard of hearing, use your preferred relay service provider or the free 711 relay.',
				alt_instructions: 'Transfer between trains and [SB] buses at Franklin Av. Travel Alternatives [TP] Show Shuttle Bus Stops Station Shuttle Bus Stop Franklin Av  [2] [4] Eastern Pkwy at Franklin Av Nostrand Av [4] Nostrand Av at Eastern Pkwy (to Flatbush Av) Eastern Pkwy at Nostrand Av (to Franklin Av) President St Nostrand Av at Carroll St (to Flatbush Av) New York Av at Carroll St (to Franklin Av) Sterling St Nostrand Av at Lefferts Av (to Flatbush Av) New York Av at Empire Blvd (to Franklin Av) Winthrop St Nostrand Av at Winthrop St (to Flatbush Av) New York Av at Winthrop St (to Franklin Av) Church Av Nostrand Av at Church Av (to Flatbush Av) New York Av at Church Av (to Franklin Av) Beverly Rd Nostrand Av at Beverly Rd (to Flatbush Av) New York Av at Beverly Rd (to Franklin Av) Newkirk Av Nostrand Av at Newkirk Av (to Flatbush Av) New York Av at Avenue D (to Franklin Av) Flatbush Av Nostrand Av at Flatbush Av',
				route_change: {
					tag: ['A-operates-then-overC'],
					message: "[2] service operates between [Bx416-201] and [Bk626-239], and via the [4] to/from [Bk345-250]. [SB]",
					trains: [	"2"	],
					route: [
						{
							lines: ["2"],
							along: null,
							from: 'Bx416-201',
							to: 'Bk626-239',
						},
						{
							lines: ["2"],
							along: "4",
							from: 'Bk626-239',
							to: 'Bk345-250',
						}
					],
				},
				line: [
					{ line: 'MTA NYCT_2'},
					{ line: 'MTA NYCT_4'},
				],
			},
			{
				type: 'PlannedWork',
				type_detail: [
					'skip_stations',
				],
				tag: ["MTAD-027"],
				time: '',
				durration: 'Late Nights, 12:01 AM to 5 AM, Tue to Fri, Dec 12 - 15    Dec 19 - 22',
				message: 'TRACK REPLACEMENT [2] Downtown trains skip 66 St, 59 St and 50 St Late Nights, 12:01 AM to 5 AM, Tue to Fri, Dec 12 - 15    Dec 19 - 22      For service to these stations, take the [2] to Times Sq-42 St and transfer to an uptown [1] or [2] local. For service from these stations, take the [1] or [2] to 72 St and transfer to a downtown [2].',
				alt_instructions: 'For service to these stations, take the [2] to Times Sq-42 St and transfer to an uptown [1] or [2] local. For service from these stations, take the [1] or [2] to 72 St and transfer to a downtown [2].',
			},
			{
				type: 'PlannedWork',
				type_detail: null,
				time: '',
				durration: 'Late Nights, 12:01 AM to 5 AM, Tue to Fri, Dec 12 - 15',
				message: 'TRACK MAINTENANCE [4] Woodlawn-bound trains skip 138 St-Grand Concourse Late Nights, 12:01 AM to 5 AM, Tue to Fri, Dec 12 - 15 For service to this station, take the [4] to 149 St-Grand Concourse and transfer to a Manhattan-bound [4]. For service from this station, take the [4] to 125 St where it will become a Woodlawn-bound [4].',
				alt_instructions: 'For service to this station, take the [4] to 149 St-Grand Concourse and transfer to a Manhattan-bound [4]. For service from this station, take the [4] to 125 St where it will become a Woodlawn-bound [4].',
			},
			{
				type: 'PlannedWork',
				type_detail: [
					'route_change',
				],
				tag: ["MTAD-014", "MTAD-001"],
				time: 'Transfer between [A] trains and [SB] buses at Beach 90 St .',
				durration: 'Weekends, 11:15 PM Fri to 5 AM Mon, Nov 24 - 27 &bull; Dec 1 - 4',
				message: 'TRACK REPLACEMENT [A] No trains between Broad Channel and Mott Av [SB] Free shuttle buses provide alternate service Weekends, 11:15 PM Fri to 5 AM Mon, Nov 24 - 27 &bull; Dec 1 - 4 [A] service operates between 207 St and Broad Channel , and replace the [S] to/from Beach 116 St . [SB] Buses make stops at Beach 90 , Beach 67 , Beach 60 , Beach 44 , Beach 36 , Beach 25 Sts and Mott Av . &bull; Transfer between [A] trains and [SB] buses at Beach 90 St . Show Shuttle Bus Stops Station Shuttle Bus Stop Bus Mott Av Beach 22 St at Station Entrance &mdash; Beach 25 St Beach Channel Dr at Beach 25 St &mdash; Beach 36 St Beach Channel Dr at Beach 35 St (to Mott Av) Q22 Beach Channel Dr at 36 St (to Beach 90 St) Q22 Beach 44 St Beach Channel Dr at Beach 44 St Q22 Beach 60 St Beach Channel Dr at Beach 59 St Q22 Beach 67 St Beach Channel Dr at Beach 67 St Q22 Beach 90 St [A] Rockaway Beach Blvd at Beach 88 St Q22 Note: Service to/from Lefferts Blvd is not affected. [ad] This service change affects one or more ADA accessible stations. Please call 511 for help with planning your trip. If you are deaf or hard of hearing, use your preferred relay service provider or the free 711 relay.',
				alt_instructions: 'Transfer between [A] trains and [SB] buses at Beach 90 St . Show Shuttle Bus Stops Station Shuttle Bus Stop Bus Mott Av Beach 22 St at Station Entrance &mdash; Beach 25 St Beach Channel Dr at Beach 25 St &mdash; Beach 36 St Beach Channel Dr at Beach 35 St (to Mott Av) Q22 Beach Channel Dr at 36 St (to Beach 90 St) Q22 Beach 44 St Beach Channel Dr at Beach 44 St Q22 Beach 60 St Beach Channel Dr at Beach 59 St Q22 Beach 67 St Beach Channel Dr at Beach 67 St Q22 Beach 90 St [A] Rockaway Beach Blvd at Beach 88 St Q22 Note: Service to/from Lefferts Blvd is not affected.',
/**
				route_change: {
					tag: ['A-operates-then-overC'],
					message: "[A] service operates between 207 St and Broad Channel , and replace the [S] to/from Beach 116 St",
					trains: [
						"A"
					],
					route: [
						{
							lines: [
								"A"
							],
							along: null,
							from: '',
							to: '',
						},
						{
							lines: [
							"A"
							],
							along: "S",
							from: "",
							to: ""
						}
					],
				},
*/
				lines: [
					'MTA NYCT_A',
					'MTA NYCT_S'
				],
			},
			{
				type: 'PlannedWork',
				type_detail: null,
				time: null,
				durration: 'Weekend , Saturday and Sunday, Nov 25 - 26',
				message: 'TRACK REPLACEMENT [R] Bay Ridge-bound trains skip 67 Av, 63 Dr, Woodhaven Blvd, Grand Av and Elmhurst Av Weekend , Saturday and Sunday, Nov 25 - 26 For service to these stations, take the [R] to Roosevelt Av and transfer to a Forest Hills-bound [R]. For service from these stations, take the [R] to 71 Av and transfer to a Bay Ridge-bound [R].',
				alt_instructions: 'For service to these stations, take the [R] to Roosevelt Av and transfer to a Forest Hills-bound [R]. For service from these stations, take the [R] to 71 Av and transfer to a Bay Ridge-bound [R].',
			},
			{
				type: 'PlannedWork',
				type_detail: null,
				time: '',
				durration: 'Weekend , Saturday and Sunday, Nov 25 - 26',
				message: 'TRACK REPLACEMENT [C] 168 St-bound trains skip Spring St, 23 St and 50 St  Weekend , Saturday and Sunday, Nov 25 - 26 For service to Spring St, take the [C] to W 4 St and transfer to a Euclid Av-bound [C]. For service from this station, take the [C] to Canal St and transfer to a 168 St-bound [C]. For service to 23 and 50 Sts, transfer to the [E] at 14 St or 42 St/Port Authority. For service from 23 or 50 Sts, take the [E] to 42 St/Port Authority and transfer to a 168 St-bound [C].',
				alt_instructions: 'For service to Spring St, take the [C] to W 4 St and transfer to a Euclid Av-bound [C]. For service from this station, take the [C] to Canal St and transfer to a 168 St-bound [C]. For service to 23 and 50 Sts, transfer to the [E] at 14 St or 42 St/Port Authority. For service from 23 or 50 Sts, take the [E] to 42 St/Port Authority and transfer to a 168 St-bound [C].',
			},
			{
				type: 'PlannedWork',
				type_detail: null,
				time: null,
				durration: 'Days, 9 AM to 3 PM, Mon to Fri, Nov 27 - Dec 1',
				message: 'SCHEDULED MAINTENANCE  [SIR] Trains board at the Tottenville-bound platform from Arthur Kill to Prince\'s Bay Stations Days, 9 AM to 3 PM, Mon to Fri, Nov 27 - Dec 1   Boarding change includes  Arthur Kill ,  Richmond Valley ,  Pleasant Plains  and     Prince\'s Bay Stations .',
				alt_instructions: null,
			},
			{
				type: 'PlannedWork',
				type_detail: null,
				time: null,
				durration: 'Days, 9:30 AM to 4 PM, Mon  and  Tue, Nov 27 - 28',
				message: 'SIGNAL MAINTENANCE  [S] Rockaway Park Shuttle - No trains running [A] trains and [SB] free shuttle buses provide alternate service  Days, 9:30 AM to 4 PM, Mon  and  Tue, Nov 27 - 28     [SB] Buses operate between  Beach 67 St [A]  and  Beach 116 St , stopping at Beach 90,  Beach 98 and Beach 105 Sts.   Transfer between [A] trains and [SB] buses at Beach 67 St.     Show Shuttle Bus Stops        Station   Shuttle Bus Stop',
				alt_instructions: 'Transfer between [A] trains and [SB] buses at Beach 67 St.     Show Shuttle Bus Stops        Station   Shuttle Bus Stop',
			},

			{
				type: 'PlannedWork',
				type_detail: null,
				time: null,
				durration: 'Days, 9:45 AM to 3:30 PM, Tue to Fri, Dec 26 - 29',
				message: 'ELECTRICAL IMPROVEMENTS [1] South Ferry-bound trains skip 238, 231, 225, 215 and 207 Sts Days, 9:45 AM to 3:30 PM, Tue to Fri, Dec 26 - 29 For service to these stations, take the [1] to Dyckman St and transfer to a 242 St-bound [1]. For service from 238 St , walk or take the Bx9 bus to 242 St and transfer to a South Ferry-bound [1]. For service from 231 , 225 and 215 Sts , take the [1] to 242 St and transfer to a South Ferry-bound [1]. For service from 207 St , take the [A] at nearby 207 St-Broadway. Transfer to the [1] at 168 St. [ad] This service change affects one or more ADA accessible stations. Please call 511 for help with planning your trip. If you are deaf or hard of hearing, use your preferred relay service provider or the free 711 relay.',
				alt_instructions: 'For service to these stations, take the [1] to Dyckman St and transfer to a 242 St-bound [1]. For service from 238 St , walk or take the Bx9 bus to 242 St and transfer to a South Ferry-bound [1]. For service from 231 , 225 and 215 Sts , take the [1] to 242 St and transfer to a South Ferry-bound [1]. For service from 207 St , take the [A] at nearby 207 St-Broadway. Transfer to the [1] at 168 St.',
			},
			{
				type: 'PlannedWork',
				type_detail: null,
				time: null,
				durration: 'Late Nights, 9:45 PM to 5 AM, Tue to Fri, Dec 26 - 29',
				message: 'ELECTRICAL IMPROVEMENTS [1] South Ferry-bound trains skip 137, 125, 116, 110 and 103 Sts Late Nights, 9:45 PM to 5 AM, Tue to Fri, Dec 26 - 29 For service to these stations, take the [1] to 96 St and transfer to a Van Cortlandt Park-bound [1]. For service from these stations, take the [1] to 168 St* and transfer to a South Ferry-bound [1]. *Transfer at 145 St with Unlimited Ride MetroCard .',
				alt_instructions: 'For service to these stations, take the [1] to 96 St and transfer to a Van Cortlandt Park-bound [1]. For service from these stations, take the [1] to 168 St* and transfer to a South Ferry-bound [1]. *Transfer at 145 St with Unlimited Ride MetroCard .',
			},
			{
				type: 'PlannedWork',
				type_detail: [
					"signal_problems",
					"shuttle_bus",
					"no_trains_partial"
				],
				time: null,
				durration: null,
				message: '[5] There is no service between Eastchester-Dyre Av and E 180 St in both directions because of ongoing signal problems at Eastchester-Dyre Av.Our crews are on scene working to fix it, we will follow up soon. There are free [SB] shuttle buses at the following bus stops:Toward Eastchester-Dyre Av:On Morris Park Av at E180 St - Bx21 StopOn Morris Park Av at Hone Av - Bx21 StopOn Williamsbridge Rd at Lydig AvOn Williamsbridge Rd at Pelham Pkwy S - Bx8 StopOn Williamsbridge Rd at Pelham Pkwy N - Bx8 StopOn E Gunhill Rd at Knapp St - Bx28 StopOn Boston Rd at Baychester Av - Bx30 StopOn Dyre Av at Light St - Bx18 StopToward E 180 St:On Dyre Av at Light St - Bx18 StopOn Boston Rd at Baychester Av - Bx30 StopOn E Gunhill Rd at DeWitt Pl - Bx28 StopOn Williamsbridge Rd at Pelham Pkwy N - Bx8 StopOn Williamsbridge Rd at Pelham Pkwy S - Bx8 StopOn Williamsbridge Rd at Lydig AvOn Morris Park Av at Hone Av - Bx21 StopOn Morris Park Av at E180 St - Bx21 Stop',
				alt_instructions: null,
			},
			{
				type: null,
				type_detail: [
					"shuttle_bus",
					"running_local",
					"route_change",
					"no_trains_partial"
				],
				tag: ["MTAD-001", "MTAD-027"],
				time: null,
				durration: "All Times, 5 AM Tue, Dec 26 until 8 AM Sun, Dec 31",
				message: "SUBWAY ACTION PLAN: We're improving: Signals, Cables, Tracks and Drainage [E] No service between Jackson Hts-Roosevelt Av and West 4 St [M] No weekday service between Broadway Junction and 71 Av All Times, 5 AM Tue, Dec 26 until 8 AM Sun, Dec 31 [E] trains are rerouted in both directions via the [F] between Jackson Hts-Roosevelt Av and West 4 St * [E] trains run local between 71 Av and 21 St-Queensbridge overnight. [M] Shuttle trains operate all times between Metropolitan Av and Myrtle-Wyckoff Avs . [M] trains operate weekend service between Broadway Junction [J] and Essex St . Overnight [SB] free shuttle buses connect Queens Plaza and Court Sq-23 St [7] stopping at 21 St-Queensbridge [E] [F]. Travel Alternatives [TP] For JFK Airport , take the Far Rockaway-bound [A] to Howard Beach-JFK Airport. For LaGuardia Airport , take the [7] or [E] (from 6 Av) to 74 St-Roosevelt Av, for the LaGuardia Link Q70 SBS . For Port Authority Bus Terminal , all 8 Av [E] stations and overnight service between W 4 St and World Trade Center , take the [A] or [C]. For 53 St [E] stations , use the nearby 51 St [6] or 7 Av [B] [D] Stations. For [M] stations , take the [E] [F] [R] and/or [J]. Take the [7] for Court Sq-23 St [G] , and the [R] ( days/evenings ) for Queens Plaza or free overnight shuttle buses. Click here for details about this Subway Action Plan. *9:45 PM to 5 AM, Tue to Fri, Dec 26 - 29 [E] trains run to/from 2 Av [F] station after W 4 St. [ad] This service change affects one or more ADA accessible stations. Please call 511 for help with planning your trip. If you are deaf or hard of hearing, use your preferred relay service provider or the free 711 relay.",
				alt_instructions: "Travel Alternatives [TP] For JFK Airport , take the Far Rockaway-bound [A] to Howard Beach-JFK Airport. For LaGuardia Airport , take the [7] or [E] (from 6 Av) to 74 St-Roosevelt Av, for the LaGuardia Link Q70 SBS . For Port Authority Bus Terminal , all 8 Av [E] stations and overnight service between W 4 St and World Trade Center , take the [A] or [C]. For 53 St [E] stations , use the nearby 51 St [6] or 7 Av [B] [D] Stations. For [M] stations , take the [E] [F] [R] and/or [J]. Take the [7] for Court Sq-23 St [G] , and the [R] ( days/evenings ) for Queens Plaza or free overnight shuttle buses. Click here for details about this Subway Action Plan. *9:45 PM to 5 AM, Tue to Fri, Dec 26 - 29 [E] trains run to/from 2 Av [F] station after W 4 St.",
				ad_message: "[ad] This service change affects one or more ADA accessible stations. Please call 511 for help with planning your trip. If you are deaf or hard of hearing, use your preferred relay service provider or the free 711 relay.",
				route_change: {
					tag: ['A-overC'],
					message_raw: "[E] trains are rerouted in both directions via the [F] between Jackson Hts-Roosevelt Av and West 4 St",
					message: "[E] trains are rerouted in both directions via the [F] between [Qs616-G14] and [Mn167-A32]",
					trains: ["E"],
					route: [
						{
							lines: ['E'],
							along: "F",
							from: 'Qs616-G14',
							to: 'Mn167-A32',
						},
					],
				},
				line: [
					{ line: 'MTA NYCT_E'},
					{ line: 'MTA NYCT_M'},
				],
			},
			{
				type: null,
				type_detail: [
					"shuttle_bus",
					"no_trains_partial",
					"electrical_improvements"
				],
				tag: ["MTAD-001", "MTAD-011"],
				time: null,
				durration: "Late Nights, 9:30 PM to 5 AM, Wed to Fri, Dec 27 - 29",
				message: "ELECTRICAL IMPROVEMENTS [4] No trains between 149 St-Grand Concourse and 125 St[SB] Free shuttle buses provide alternate service Late Nights, 9:30 PM to 5 AM, Wed to Fri, Dec 27 - 29 [TP] [4] service operates in two sections: 1. Between 149 St-Grand Concourse and Woodlawn . 2. Between Crown Hts/New Lots Av and 125 St and via the [6] to/from 3 Av-138 St. [SB] Buses operate between 149 St-Grand Concourse and 3 Av-138 St , stopping at 138 St-Grand Concourse. Transfer between trains and [SB] buses at 149 St-Grand Concourse and/or 3 Av-138 St. Station Shuttle Bus Stop 149 St-Grand Concourse [2] [4] Grand Concourse at 149 St 138 St-Grand Concourse Grand Concourse at 138 St 3 Av-138 St [4] [6] Lincoln Av at 138 St [ad] This service change affects one or more ADA accessible stations. Please call 511 for help with planning your trip. If you are deaf or hard of hearing, use your preferred relay service provider or the free 711 relay.",
				alt_instructions: "[TP] [4] service operates in two sections: 1. Between 149 St-Grand Concourse and Woodlawn . 2. Between Crown Hts/New Lots Av and 125 St and via the [6] to/from 3 Av-138 St. [SB] Buses operate between 149 St-Grand Concourse and 3 Av-138 St , stopping at 138 St-Grand Concourse. Transfer between trains and [SB] buses at 149 St-Grand Concourse and/or 3 Av-138 St. Station Shuttle Bus Stop 149 St-Grand Concourse [2] [4] Grand Concourse at 149 St 138 St-Grand Concourse Grand Concourse at 138 St 3 Av-138 St [4] [6] Lincoln Av at 138 St",
				ad_message: "[ad] This service change affects one or more ADA accessible stations. Please call 511 for help with planning your trip. If you are deaf or hard of hearing, use your preferred relay service provider or the free 711 relay.",
			},
			{
				type: 'ServiceChange',
				type_detail: [
					"delays",
					"signal_problems",
					"route_change"
				],
				tag: ["MTAD-001"],
				time: null,
				durration: null,
				message: "Southbound [D] trains are stopping along the [C] line from 59 St-Columbus Circle to W 4 St-Wash Sq then along the [F] line to Coney Island-Stillwell Av.Southbound [A] trains are running local from 59 St-Columbus Circle to W 4 St-Wash Sq.Expect delays on [A] [C] [D] and [F] trains.These service changes are because of a rail condition at 59 St-Columbus Circle.",
				alt_instructions: null,
				ad_message: null,
				route_change: {
					tag: ['A-overC-thenD'],
					message_raw: "Southbound [D] trains are stopping along the [C] line from 59 St-Columbus Circle to W 4 St-Wash Sq then along the [F] line to Coney Island-Stillwell Av.",
					message: "Southbound [D] trains are stopping along the [C] line from [Mn614-A24] to [Mn167-A32] then along the [F] line to [Bk58-D43].",
					trains: ["D"],
					route: [
						{
							lines: ['D'],
							along: "C",
							from: 'Mn614-A24',
							to: 'Mn167-A32',
						},
						{
							lines: ['D'],
							along: "F",
							from: 'Mn167-A32',
							to: 'Bk58-D43',
						},
					],
				},
				line: [
					{ line: 'MTA NYCT_A'},
					{ line: 'MTA NYCT_C'},
					{ line: 'MTA NYCT_D'},
					{ line: 'MTA NYCT_F'},
				],
			},
			{
				type: 'ServiceChange',
				type_detail: [
					"delays",
					"signal_problems",
					"route_change"
				],
				tag: ["MTAD-001", "MTAD-012"],
				time: null,
				durration: null,
				message: "Some northbound [A] and [C] trains are stopping along the [F] line from Jay St-MetroTech to W 4 St-Washington Sq because of signal problems at High St.Expect delays on the [A], [C] and [F] trains.",
				route_change: {
					tag: ['AB-overC'],
					message_raw: "Some northbound [A] and [C] trains are stopping along the [F] line from Jay St-MetroTech to W 4 St-Washington Sq",
					message: "Some northbound [A] and [C] trains are stopping along the [F] line from [Bk636-A41] to [Mn167-A32]",
					trains: ['A','C'],
					route: [
						{
							lines: ['A', 'C'],
							along: "F",
							from: 'Bk636-A41',
							to: 'Mn167-A32',
						},
					],
				},
				line: [
					{ line: 'MTA NYCT_A'},
					{ line: 'MTA NYCT_C'},
					{ line: 'MTA NYCT_F'},
				],
			},
			{
				type: 'ServiceChange',
				type_detail: [
					"delays",
					"sick_passenger",
					"route_change"
				],
				tag: ["MTAD-001"],
				time: null,
				durration: null,
				message: "Southbound [Q] trains are stopping along the [R] line from Canal St to DeKalb Av because of a sick passenger at Canal St.",
				route_change: {
					tag: ['A-overC'],
					message_raw: "Southbound [Q] trains are stopping along the [R] line from Canal St to DeKalb Av",
					message: "Southbound [Q] trains are stopping along the [R] line from [Mn623-R23] to [Bk26-R30]",
					trains: ['Q'],
					route: [
						{
							lines: ['Q'],
							along: "R",
							from: 'Mn623-R23',
							to: 'Bk26-R30',
						},
					],
				},
				line: [
					{ line: 'MTA NYCT_Q'},
					{ line: 'MTA NYCT_R'},
				],
			},
			{
				type: 'ServiceChange',
				type_detail: [
					"delays",
					"signal_problems",
					"route_change"
				],
				tag: ["MTAD-004", "MTAD-001"],
				time: null,
				durration: null,
				message: "Southbound [N] trains are stopping along the [D] line from 36 St (Bklyn) to Coney Island-Stillwell Av because of signal problems between 8 Av and Bay Parkway.",
				route_change: {
					tag: ['A-overC'],
					message_raw: "Southbound [N] trains are stopping along the [D] line from 36 St (Bklyn) to Coney Island-Stillwell Av",
					message: "Southbound [N] trains are stopping along the [D] line from [Bk32-R36] to [Bk58-D43]",
					trains: ['N'],
					route: [
						{
							lines: ['N'],
							along: "D",
							from: 'Bk32-R36',
							to: 'Bk58-D43',
						},
					],
				},
				line: [
					{ line: 'MTA NYCT_N'},
					{ line: 'MTA NYCT_D'},
				],
			},
			{
				type: 'ServiceChange',
				type_detail: [
					"delays",
					"switch_problems",
					"route_change"
				],
				tag: ["MTAD-001", "MTAD-027"],
				time: null,
				durration: null,
				message: "Northbound [F] trains are stopping along the [A] line from Jay St-MetroTech to 42 St-Port Authority, then stopping along the [E] line to Jackson Heights-Roosevelt Av. These service changes are because of switch problems at Broadway-Lafayette St. Expect delays on the [A], [E], and [F] lines.",
				route_change: {
					tag: ['A-overC-thenD'],
					message_raw: "Northbound [F] trains are stopping along the [A] line from Jay St-MetroTech to 42 St-Port Authority, then stopping along the [E] line to Jackson Heights-Roosevelt Av.",
					message: "Northbound [F] trains are stopping along the [A] line from [Bk636-A41] to [Mn611-A27], then stopping along the [E] line to [Qs616-G14].",
					trains: ['F'],
					route: [
						{
							lines: ['F'],
							along: "A",
							from: 'Bk636-A41',
							to: 'Mn611-A27',
						},
						{
							lines: ['F'],
							along: "E",
							from: 'Mn611-A27',
							to: 'Qs616-G14',
						},
					],
				},
				stations: {
					'MTA NYCT_F': {
						stations: {
							'Bk636-A41': "Jay St-MetroTech",
							'Qs616-G14': 'Jackson Heights-Roosevelt Av',
							'Mn619-D21': 'Broadway-Lafayette St',
						}
					},
					'MTA NYCT_E': {
						stations: {
							'Mn611-A27': '42 St-Port Authority',
							'Qs616-G14': 'Jackson Heights-Roosevelt Av',
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_A'},
					{ line: 'MTA NYCT_E'},
					{ line: 'MTA NYCT_F'},
				],
			},
			{
				type: null,
				type_detail: [
					"shuttle_bus",
					"route_change",
					"running_express"
				],
				tag: ["MTAD-006", "MTAD-001", "MTAD-011", "MTAD-014", "MTAD-027"],
				time: null,
				durration: "Weekends, 9:30 PM Fri to 5 AM Mon, Jan 5 - 8 Jan 12 - 15",
				message: "SIGNAL IMPROVEMENTS [F] Service is rerouted in Manhattan and Brooklyn[A] [C] [D] [N] [R] trains and [SB] free shuttle buses provide alternate service Weekends, 9:30 PM Fri to 5 AM Mon, Jan 5 - 8 Jan 12 - 15 No [F] service at 57 St , 47-50 Sts , 42 St-Bryant Pk , 23 St , 14 St , W 4 St , B'way-Lafayette St , 2 Av , Delancey St/Essex St , East Broadway , and York St . [F] service operates b etween Jamaica-179 St and Lexington Av-63 St, and via the [Q] to/from Atlantic Av-Barclays Ctr (skipping DeKalb Av, days and evenings), and via the [D] to/from Stillwell Av . Trains run express in Manhattan all weekend . [D]* trains are rerouted via the [A] in Manhattan and replace the [F] in Brooklyn between Jay St-MetroTech and Stillwell Av . [SB] Buses operate along two routes: 1. Between W 4 St and East Broadway , stopping at B'way-Lafayette St, 2 Av and Delancey St/Essex St. 2. Between Jay St-MetroTech and York St . Show Shuttle Bus Stops Station Bus Stop Bus W 4 St [ad] [A] [C] [D] [E] 6 Av at W 3 St M55 B'way-Lafayette St Houston St at Lafayette St (to East Broadway) M21 Houston St at Broadway (to W 4 St) M21 2 Av Houston St at 1 Av M21 Delancey St/Essex St [J] Delancey St at Essex St (to East Broadway) B39 Essex St at Delancey St (to W 4 St) M9 East Broadway Essex St at Straus Square M9 York St Jay St at York St B67 Jay St-MetroTech [ad] [A] [C] [D] [N] [R] Jay St at Willoughby St B26 Travel Alternatives [TP] For service between Manhattan and Brooklyn , take the [A] [C] [D] [N] or [R]. Transfer between [F] ([Q] platform) and [A] [C] [D] [N] or [R] trains at 42 St-Port Authority/Times Sq-42 St. Transfer between [F] ([Q] platform) and [N] [R] trains at Canal St. Transfer between [D] and [N] [R] trains at Jay St-MetroTech. Affected Station Alternate Station/Service 57 St 7 Av or 5 Av/53 St [E] 47-50 Sts 7 Av or 5 Av/53 St [E] 49 St [N] [Q] local , [R] | [ad] uptown only 50 St (B'way) [1] [2] local 50 St (8 Av) [A] local , [C] [E] | [ad] downtown only 42 St-Bryant Pk [7] (5 Av) Times Sq-42 St [1] [2] [3] [7] [F] [N] [Q] [R] [S] | [ad] 42 St/Port Authority [A] [C] [D] [E] | [ad] 34 St-Herald Sq [ad] [F] [N] [Q] [R] 34 St-Penn Station [1] [2] [3] | [ad] 23 St 23 St [N] [Q] local , [R] 23 St [1] [2] local 14 St [1] [2] [3] (7 Av) or [L] (8 Av) | [ad] B'way-Lafayette St [ad] [SB] and Bleecker St [4] local , [6] | [ad] 2 Av [SB] Delancey St/Essex St [J] and [SB] East Broadway [SB] York St [SB] and nearby High St [A] [C] [D] Jay St MetroTech [ad] [SB] and [D] [N] [R] For Brooklyn [F] stations between Jay St-MetroTech and Stillwell Av , take the [D] instead. Key Transfer Stations 59 St-Columbus Circle [ad] [A] [C] [D] and [1] [2] local Times Sq-42 St/42 St-Port Authority [ad] (Passageway not accessible) [1] [2] [3] [7] [F] [N] [Q] [R] [S] [A] [C] [D] [E] 14 St-Union Sq [ad] (L, N, F, Q, R only) [4] [6] and [F] [N] [Q] [R] Canal St [ad] (4, 6 only) [4] local , [6] [J] [F] [N] [Q] [R] Jay St-MetroTech [ad] [A] [C] [D] [N] [R] and [SB] 4 Av-9 St [D] [G] [N] [R] | [F] late night only *This detour has taken into account additional planned service changes. Reminder: During late nights, all alternate stations are served, though not all lines run. [ad] This service change affects one or more ADA accessible stations. Please call 511 for help with planning your trip. If you are deaf or hard of hearing, use your preferred relay service provider or the free 711 relay.",
				message_station_parse: "SIGNAL IMPROVEMENTS [F] Service is rerouted in Manhattan and Brooklyn[A] [C] [D] [N] [R] trains and [SB] free shuttle buses provide alternate service Weekends, 9:30 PM Fri to 5 AM Mon, Jan 5 - 8 Jan 12 - 15 No [F] service at [Mn224-B10] , [Mn225-D15] , [Mn609-D16] , [Mn228-D18] , [Mn601-D19] , [Mn167-A32] , [Mn619-D21] , [Mn232-F14] , [Mn625-F15]/Essex St , [Mn234-F16] , and [Bk235-F18] . [F] service operates b etween [Qs254-F01] and [Mn223-B08], and via the [Q] to/from Atlantic Av-Barclays Ctr (skipping DeKalb Av, days and evenings), and via the [D] to/from [Bk58-D43] . Trains run express in Manhattan all weekend . [D]* trains are rerouted via the [A] in Manhattan and replace the [F] in Brooklyn between [Bk636-A41] and [Bk58-D43] . [SB] Buses operate along two routes: 1. Between [Mn167-A32] and [Mn234-F16] , stopping at [Mn619-D21], [Mn232-F14] and [Mn625-F15]/Essex St. 2. Between [Bk636-A41] and [Bk235-F18] . Show Shuttle Bus Stops Station Bus Stop Bus W 4 St [ad] [A] [C] [D] [E] 6 Av at W 3 St M55 B'way-Lafayette St Houston St at Lafayette St (to East Broadway) M21 Houston St at Broadway (to W 4 St) M21 2 Av Houston St at 1 Av M21 Delancey St/Essex St [J] Delancey St at Essex St (to East Broadway) B39 Essex St at Delancey St (to W 4 St) M9 East Broadway Essex St at Straus Square M9 York St Jay St at York St B67 Jay St-MetroTech [ad] [A] [C] [D] [N] [R] Jay St at Willoughby St B26 Travel Alternatives [TP] For service between Manhattan and Brooklyn , take the [A] [C] [D] [N] or [R]. Transfer between [F] ([Q] platform) and [A] [C] [D] [N] or [R] trains at 42 St-Port Authority/Times Sq-42 St. Transfer between [F] ([Q] platform) and [N] [R] trains at Canal St. Transfer between [D] and [N] [R] trains at Jay St-MetroTech. Affected Station Alternate Station/Service [Mn224-B10] [Bk240-F24] or 5 Av/53 St [E] [Mn225-D15] [Bk240-F24] or 5 Av/53 St [E] 49 St [N] [Q] local , [R] | [ad] uptown only 50 St (B'way) [1] [2] local 50 St (8 Av) [A] local , [C] [E] | [ad] downtown only [Mn609-D16] [7] (5 Av) Times Sq-42 St [1] [2] [3] [7] [F] [N] [Q] [R] [S] | [ad] 42 St/Port Authority [A] [C] [D] [E] | [ad] [Mn607-D17] [ad] [F] [N] [Q] [R] 34 St-Penn Station [1] [2] [3] | [ad] [Mn228-D18] 23 St [N] [Q] local , [R] 23 St [1] [2] local [Mn601-D19] [1] [2] [3] (7 Av) or [L] (8 Av) | [ad] B'way-Lafayette St [ad] [SB] and Bleecker St [4] local , [6] | [ad] 2 Av [SB] Delancey St/Essex St [J] and [SB] East Broadway [SB] York St [SB] and nearby High St [A] [C] [D] Jay St MetroTech [ad] [SB] and [D] [N] [R] For Brooklyn [F] stations between Jay St-MetroTech and Stillwell Av , take the [D] instead. Key Transfer Stations 59 St-Columbus Circle [ad] [A] [C] [D] and [1] [2] local Times Sq-42 St/42 St-Port Authority [ad] (Passageway not accessible) [1] [2] [3] [7] [F] [N] [Q] [R] [S] [A] [C] [D] [E] 14 St-Union Sq [ad] (L, N, F, Q, R only) [4] [6] and [F] [N] [Q] [R] Canal St [ad] (4, 6 only) [4] local , [6] [J] [F] [N] [Q] [R] Jay St-MetroTech [ad] [A] [C] [D] [N] [R] and [SB] [Bk608-F23]-9 St [D] [G] [N] [R] | [F] late night only *This detour has taken into account additional planned service changes. Reminder: During late nights, all alternate stations are served, though not all lines run. [ad] This service change affects one or more ADA accessible stations. Please call 511 for help with planning your trip. If you are deaf or hard of hearing, use your preferred relay service provider or the free 711 relay.",
				route_change: {
					tag: ['A-operates-then-overC-thenD'],
					message: "[F] service operates b etween [Qs254-F01] and [Mn223-B08], and via the [Q] to/from [Bk617-235] (skipping [Bk26-R30], days and evenings), and via the [D] to/from [Bk58-D43] . ``` trains are rerouted via the [A] in Manhattan",
					trains: ['F'],
					route: [
						{
							lines: ['F'],
							along: null,
							from: 'Qs254-F01',
							to: 'Mn223-B08',
						},
						{
							lines: ['F'],
							along: "Q",
							from: 'Mn223-B08',
							to: 'Bk617-235',
						},
						{
							lines: ['F'],
							along: "D",
							from: 'Bk617-235',
							to: 'Bk58-D43',
						},
					],
				},
				line: [
					{	line: "MTA NYCT_F",	dir: "1" },
					{	line: "MTA NYCT_F",	dir: "0" }
				],
			},
			{
				type: null,
				type_detail: [
					"no_trains_partial",
					"route_change",
					"track_maintenance"
				],
				tag: ["MTAD-001", "MTAD-014", "MTAD-027"],
				durration: "Late Nights, 9:45 PM to 5 AM, Mon to Fri, Dec 4 - 8",
				message: "TRACK MAINTENANCE [E] No trains between W 4 St and World Trade Center [A] [C] trains provide alternate service Late Nights, 9:45 PM to 5 AM, Mon to Fri, Dec 4 - 8 [E] service operates between Jamaica Center and W 4 St , and via the [F] to/from 2 Av . For Spring St*, Canal St and World Trade Center (Chambers St), take the [A] or [C] instead. Transfer between trains at W 4 St. *Please review [A] [C] advisories for additional information that may affect your trip.",
				message_station_parse: "TRACK MAINTENANCE [E] No trains between [Mn167-A32] and [Mn624-E01] [A] [C] trains provide alternate service Late Nights, 9:45 PM to 5 AM, Mon to Fri, Dec 4 - 8 [E] service operates between [Qs278-G05] and [Mn167-A32], and via the [F] to/from [Mn232-F14] . For [Mn168-A33]*, [Mn169-A34] and [Mn624-E01] ([Mn624-A36]), take the [A] or [C] instead. Transfer between trains at [Mn167-A32]. *Please review [A] [C] advisories for additional information that may affect your trip.",
				route_change: {
					tag: ['A-operates-then-overC'],
					message: "[E] service operates between [Qs278-G05] and [Mn167-A32] , and via the [F] to/from [Mn232-F14] .",
					trains: ['E'],
					route: [
						{
							lines: ['E'],
							along: null,
							from: 'Qs278-G05',
							to: 'Mn167-A32',
						},
						{
							lines: ['E'],
							along: "F",
							from: 'Mn167-A32',
							to: 'Mn232-F14',
						},
					],
				},
				line: [
					{ line: "MTA NYCT_E", dir: "0" },
					{ line: "MTA NYCT_E", dir: "1" }
				],
			},
			{
				archive: { id: "MTA NYCT_176407", archive: 38},
				type: null,
				type_detail: [
					"service_ends_early",
					"running_local",
					"route_change"
				],
				tag: ["MTAD-001", "MTAD-004", "MTAD-010", "MTAD-013"],
				time: null,
				durration: "Late Nights, 9:30 PM to 5 AM, Mon to Fri, Jan 15 - 19 Jan 22 - 26",
				message: "FASTRACK PROGRAM [A] Trains run local and are rerouted between 59 St-Columbus Circle and Jay St-MetroTech [C] Service ends early - Take the [A] instead [E] Trains are rerouted in Manhattan Late Nights, 9:30 PM to 5 AM, Mon to Fri, Jan 15 - 19 Jan 22 - 26 [A] Trains make local stops and are rerouted in both directions as follows: Via the [D] between 59 St-Columbus Circle and 34 St-Herald Sq. Via the [F] between 34 St-Herald Sq and Jay St-MetroTech. [E] Trains are rerouted in both directions in Manhattan as follows: Via the [M] between 5 Av/53 St and 34 St-Herald Sq. Via the [F] between 34 St-Herald Sq and 2 Av, the last stop. Travel Alternatives [TP] Use nearby [1] [2] stations on 7 Av or [D] [F] stations on 6 Av. Affected Station Alternate Station/Service 7 Av [A] [D] 50 St [1] [2]* 57 St-7 Av [N] [Q] [R] [W] 50 St 50 St [1] [2]* 49 St [ad] (northbound) [N] [Q]* [R] [W] 47-50 Sts [ad] [A] [D] [E] [F] 42 St/Port Authority Times Sq-42 St [ad] [1] [2] [3] [7] [N] [Q] [R][W] 34 St-Penn Station (8 Av) 34 St-Penn Station (7 Av) [ad] [1] [2] [3] 34 St-Herald Sq [ad] [A] [D] [E] [F] [N] [Q] [R] [W] 23 St 23 St [1] [2]* 23 St (6 Av) [A] [E] [F] 14 St [ad] [L] (8 Av) -- Connect with [A] [D] [E] [F] at 6 Av or [4] [6] [N] [Q] [R] at 14 St-Union Sq [ad] W 4 St [ad] [A] [D] [E] [F] Christopher St [1] [2]* Spring St Houston St [1] [2]* Prince St [N] [Q]* [R] [W] W 4 St [ad] [A] [D] [E] [F] Canal St Canal St [1] [2]* Canal St [ad] [4] local [6] | [J] [N] [Q] [R] Chambers St Chambers St [ad] [1] [2] [3] Park Place [2] [3] City Hall [R] [W] World Trade Center Park Place [2] [3] Cortlandt St [ad] [R] [W] nearby Fulton St [ad] [2] [3] [4] [J] Fulton St [ad] [2] [3] [4] [J] Cortlandt St [ad] [R] [W] High St York St [A] [F] Key Transfer Stations 59 St-Columbus Circle [ad] [A] [D] and [1] [2]* 47-50 Sts [ad] [A] [D] and [E] [F] 34 St-Herald Sq [ad] [A] [D] [E] [F] and [N] [Q] [R] [W] 14 St [F] [1] [2] [3] (7 Av) and [A] [E] [F] (6 Av)",
				message_station_parse: "FASTRACK PROGRAM [A] Trains run local and are rerouted between [Mn614-A24] and [Bk636-A41] [C] Service ends early - Take the [A] instead [E] Trains are rerouted in Manhattan Late Nights, 9:30 PM to 5 AM, Mon to Fri, Jan 15 - 19 Jan 22 - 26 [A] Trains make local stops and are rerouted in both directions as follows: Via the [D] between [Mn614-A24] and [Mn607-D17]. Via the [F] between [Mn607-D17] and [Bk636-A41]. [E] Trains are rerouted in both directions in Manhattan as follows: Via the [M] between [Mn276-F12] and [Mn607-D17]. Via the [F] between [Mn607-D17] and [Mn232-F14], the last stop. Travel Alternatives [TP] Use nearby [1] [2] stations on [Mn277-D14] or [D] [F] stations on [Mn601-L02]. Affected Station Alternate Station/Service [Mn277-D14] [A] [D] [Mn162-A25] [1] [2]* [Mn224-B10]-[Mn277-D14] [N] [Q] [R] [W] [Mn162-A25] [Mn162-A25] [1] [2]* [Mn10-R15] [ad] (northbound) [N] [Q]* [R] [W] 47-[Mn162-A25]s [ad] [A] [D] [E] [F] [Mn611-A27] Times Sq-42 St [ad] [1] [2] [3] [7] [N] [Q] [R][W] 34 St-Penn Station ([Bk71-N02]) 34 St-Penn Station ([Mn277-D14]) [ad] [1] [2] [3] [Mn607-D17] [ad] [A] [D] [E] [F] [N] [Q] [R] [W] [Mn165-A30] [Mn165-A30] [1] [2]* [Mn165-A30] ([Mn601-L02]) [A] [E] [F] [Mn618-A31] [ad] [L] ([Bk71-N02]) -- Connect with [A] [D] [E] [F] at [Mn601-L02] or [4] [6] [N] [Q] [R] at [Mn618-A31]-Union Sq [ad] [Mn167-A32] [ad] [A] [D] [E] [F] [Mn323-133] [1] [2]* [Mn168-A33] [Mn324-134] [1] [2]* [Mn17-R22] [N] [Q]* [R] [W] [Mn167-A32] [ad] [A] [D] [E] [F] [Mn169-A34] [Mn169-A34] [1] [2]* [Mn169-A34] [ad] [4] local [6] | [J] [N] [Q] [R] [Mn624-A36] [Mn624-A36] [ad] [1] [2] [3] [Mn624-228] [2] [3] [Mn20-R24] [R] [W] [Mn624-E01] [Mn624-228] [2] [3] [Mn328-138] [ad] [R] [W] nearby [Mn628-A38] [ad] [2] [3] [4] [J] [Mn628-A38] [ad] [2] [3] [4] [J] [Mn328-138] [ad] [R] [W] [Bk173-A40] [Bk235-F18] [A] [F] Key Transfer Stations [Mn614-A24] [ad] [A] [D] and [1] [2]* 47-[Mn162-A25]s [ad] [A] [D] and [E] [F] [Mn607-D17] [ad] [A] [D] [E] [F] and [N] [Q] [R] [W] [Mn618-A31] [F] [1] [2] [3] ([Mn277-D14]) and [A] [E] [F] ([Mn601-L02])",
				stations: {
					"MTA NYCT_A": {
						'stations': {
							'Mn614-A24': '59 St - Columbus Circle',
							'Mn611-A27': '42 St - Port Authority Bus Terminal',
							'Mn164-A28': '34 St - Penn Station',
							'Mn618-A31': '14 St',
							'Mn167-A32': 'W 4 St',
							'Mn169-A34': 'Canal St // last E stop',
							'Mn624-A36': 'Chambers',
							'Mn628-A38': 'Fulton St',
							'Bk173-A40': 'High St',
							'Bk636-A41': 'Jay St - Metro Tech',
						},
					},
					"MTA NYCT_C": {
						stations: {
							'Mn614-A24': '59 St - Columbus Circle',
							'Mn162-A25': '50 St',
							'Mn165-A30': '23 St',
							'Mn618-A31': '14 St',
							'Mn167-A32': 'W 4 St',
							'Mn168-A33': 'Spring St',
							'Mn169-A34': 'Canal St',
							'Mn624-A36': 'Chambers',
							'Mn628-A38': 'Fulton St',
							'Bk173-A40': 'High St',
							'Bk636-A41': 'Jay St - Metro Tech',
							'Mn611-A27': '42 St - Port Authority Bus Terminal',
							'Mn164-A28': '34 St - Penn Station',
						},
					},
					"MTA NYCT_E":{
						stations: {
							'Mn276-F12': '5 Av/53 St',
							'Mn277-D14': '7 Av',
							'Mn162-A25': '50 St',
							'Mn611-A27': '42 St - Port Authority Bus Terminal',
							'Mn164-A28': '34 St - Penn Station',
							'Mn165-A30': '23 St',
							'Mn618-A31': '14 St',
							'Mn167-A32': 'W 4 St',
							'Mn168-A33': 'Spring St',
							'Mn169-A34': 'Canal St',
							'Mn624-E01': 'World Trade Center',
						},
					},
				},
				route_change: {
					tag: ['A-overC-thenD', 'A-overC-thenD-end'],
					message: "[A] Trains run local and are rerouted between [Mn614-A24] and [Bk636-A41] [C] ``` [E] Trains are rerouted in Manhattan ``` [A] Trains make local stops and are rerouted in both directions as follows: Via the [D] between [Mn614-A24] and [Mn607-D17]. Via the [F] between [Mn607-D17] and [Bk636-A41]. [E] Trains are rerouted in both directions in Manhattan as follows: Via the [M] between [Mn276-F12] and [Mn607-D17]. Via the [F] between [Mn607-D17] and [Mn232-F14], the last stop. Travel",
					trains: ["E", "A"],
					route: [
						{
							allTrains: true,
							dir: null,
							lines: ["A"],
							along: "D",
							from: "Mn614-A24",
							to: "Mn607-D17"
						},
						{
							allTrains: true,
							dir: null,
							lines: ["A"],
							along: "F",
							from: "Mn607-D17",
							to: "Bk636-A41"
						},
						{
							allTrains: true,
							dir: null,
							lines: ["E"],
							along: "M",
							from: "Mn276-F12",
							to: "Mn607-D17"
						},
						{
							allTrains: true,
							dir: null,
							lines: ["E"],
							along: "F",
							from: "Mn607-D17",
							to: "Mn232-F14"
						}
					],
				},
				line: [
					{ line: "MTA NYCT_A", dir: "0"},
					{	line: "MTA NYCT_A",	dir: "1"},
					{	line: "MTA NYCT_C",	dir: "0"},
					{	line: "MTA NYCT_C", dir: "1"},
					{	line: "MTA NYCT_E",	dir: "1"},
					{	line: "MTA NYCT_E",	dir: "0"},
					{	line: "MTA NYCT_D",	dir: "1"},
					{	line: "MTA NYCT_F",	dir: "0"}
				],
			},
			{
				type: 'ServiceChange',
				type_detail: [
					"delays",
					"switch_problems",
					"route_change"
				],
				tag: ["MTAD-001"],
				time: null,
				durration: null,
				message: "[1] [2] [3] [N] [Q] [R] [W] and [7] trains are bypassing Times Sq-42 St in both directions.[A] [C] and [E] trains are bypassing 42 St/Port Authority-Bus Terminal in both directions.There is no [S] 42 St shuttle service in both directions.[A] and [C] trains are stopping along the [D] line between W 4 St-Washington Sq and 59 St-Columbus Circle in both directions.There is no [B] train service between Bedford Park Blvd and Brighton Beach in both directions.[E] Trains are stopping along the [F] line between Jackson Hts-Roosevelt Av and W 4 St-Washington Sq in both directions.No [L] train service between 8 Av and 6 Av in both directions.[M] Trains are running between Delancey-Essex St and Forest Hills-71 Av.These service changes are because of an NYPD investigation at 42 St/Port Authority-Bus Terminal.",
				route_change: {
					tag: ['AB-overC-D-overE'],
					message: "[A] and [C] trains are stopping along the [D] line between [Mn167-A32] and [Mn614-125] in both directions. ``` [E] Trains are stopping along the [F] line between [Qs616-G14] and [Mn167-A32] in both directions.",
					trains: ['F'],
					route: [
						{
							lines: ['A', 'C'],
							along: "D",
							from: 'Mn167-A32',
							to: 'Mn614-125',
						},
						{
							lines: ['E'],
							along: "F",
							from: 'Qs616-G14',
							to: 'Mn167-A32',
						},
					],
				},
				line: [
					{ line: 'MTA NYCT_1'},
					{ line: 'MTA NYCT_2'},
					{ line: 'MTA NYCT_3'},
					{ line: 'MTA NYCT_7'},
					{ line: 'MTA NYCT_A'},
					{ line: 'MTA NYCT_B'},
					{ line: 'MTA NYCT_C'},
					{ line: 'MTA NYCT_D'},
					{ line: 'MTA NYCT_E'},
					{ line: 'MTA NYCT_F'},
					{ line: 'MTA NYCT_N'},
					{ line: 'MTA NYCT_Q'},
					{ line: 'MTA NYCT_R'},
					{ line: 'MTA NYCT_W'},
				],
			},

			{
				type: null,
				type_detail: [
					"shuttle_bus",
					"route_change"
				],
				tag: ["MTAD-001", "MTAD-012", "MTAD-011", "MTAD-014", "MTAD-027"],
				time: null,
				durration: "Weekends, 9:30 PM Fri to 5 AM Mon, Jan 5 - 8 Jan 12 - 15",
				message: "SIGNAL IMPROVEMENTS [D] Service is rerouted in Manhattan and Brooklyn[F] [N] [Q] [R] trains and [SB] free shuttle buses provide alternate service Weekends, 9:30 PM Fri to 5 AM Mon, Jan 5 - 8 Jan 12 - 15 No [D] service at 7 Av , 47-50 Sts , 42 St-Bryant Pk , 34 St-Herald Sq , B\'way-Lafayette St and Grand St . [D] service operates b etween 205 St and 59 St-Columbus Circle, and via the [A] express to/from Jay St-MetroTech , and via the [F] to/from Stillwell Av . [F]* trains are rerouted via the [Q] express in Manhattan and replace the [D] in Brooklyn between Atlantic Av-Barclays Ctr and Stillwell Av . [SB] Buses operate between W 4 St and Grand St , stopping at B\'way-Lafayette St . Show Shuttle Bus Stops Station Bus Stop Bus W 4 St [ad] [A] [C] [D] [E] 6 Av at W 3 St M55 B\'way-Lafayette St Houston St at Broadway M21 Grand St Grand St at Chrystie St -- Travel Alternatives [TP] For service between Manhattan and Brooklyn , take the [F] [N] [Q] or [R]. Transfer between [D] and [F] [N] [Q] [R] trains at 42 St-Port Authority/Times Sq-42 St. Transfer between [D] and [N]* [R] trains at Jay St-MetroTech and 4 Av-9 St. Affected Station Alternate Station/Service 7 Av [E] 47-50 Sts 7 Av or 5 Av/53 St [E] 49 St [N] [Q] local , [R] | [ad] uptown only 50 St (B\'way) [1] [2] local 50 St (8 Av) [A] local , [C] [E] | [ad] downtown only 42 St-Bryant Pk [7] (5 Av) Times Sq-42 St [1] [2] [3] [7] [F] [N] [Q] [R] [S] | [ad] 42 St/Port Authority [A] [C] [D] [E] | [ad] 34 St-Herald Sq [ad] [F] [N] [Q] [R] 34 St-Penn Station [1] [2] [3] | [ad] B\'way-Lafayette St [SB] Grand St [SB], nearby Bowery [J] Station For Brooklyn [D] stations between Atlantic Av-Barclays Ctr and Stillwell Av , take the [F] instead. Key Transfer Stations 59 St-Columbus Circle [ad] [A] [C] [D] and [1] [2] local Times Sq-42 St/42 St-Port Authority [ad] ( Passageway not accessible ) [1] [2] [3] [7] [F] [N] [Q] [R] [S] [A] [C] [D] [E] W 4 St-Wash Sq [ad] [A] [C] [D] [E] and [SB] Fulton St [ad] [4] [5] [A] [C] [D] [J] Jay St-MetroTech [ad] [A] [C] [D] [N] [R] and [SB] 4 Av-9 St [D] [G] [N] [R] | [F] late night only *This detour has taken into account additional planned service changes. Reminders: During late night, all alternate stations are served, though not all lines run. Manhattan-bound [F] platforms at Avenue X, Avenue U, Avenue P, Avenue N, Bay Pkwy and Avenue I are closed for renovation. [ad] This service change affects one or more ADA accessible stations. Please call 511 for help with planning your trip. If you are deaf or hard of hearing, use your preferred relay service provider or the free 711 relay.",
				route_change: {
					tag: ['A-operates-then-overC-thenD', 'A-viaC-inBoro-replaceD', 'A-operates-then-overC'],
					message: '[D] service operates b etween [Bx210-D01] and [Mn614-A24], and via the [A] express to/from [Bk636-A41] , and via the [F] to/from [Bk58-D43] . [F] ``` trains are rerouted via the [Q]', // express in Manhattan and replace the [D] in Brooklyn between [Bk617-R31] and [Bk58-D43] .
					trains: ['D'],
					route: [
						{
							allTrains: true,
							dir: null,
							lines: ['D'],
							along: null,
							from: 'Bx210-D01',
							to: 'Mn614-A24',
						},
						{
							allTrains: true,
							dir: null,
							lines: ['D'],
							along: "A",
							from: 'Mn614-A24',
							to: 'Bk636-A41',
						},
						{
							allTrains: true,
							dir: null,
							lines: ['D'],
							along: "F",
							from: 'Bk636-A41',
							to: 'Bk58-D43',
						},
					],
				},
				line: [
					{
						line: "MTA NYCT_D",
						dir: "1"
					},
				],
			},


			{
				type: null,
				type_detail: [
					"delays",
					"police_activity",
					"skip_stations",
					"route_change"
				],
				tag: ["MTAD-001", "MTAD-004", "MTAD-013"],
				time: null,
				durration: null,
				message: "Northbound [R] trains are bypassing Jay St-MetroTech.Southbound [R] trains are stopping along the [Q] line from Canal St to DeKalb Av. Some southbound [R] trains are stopping along the [F] line from 36 St (Qns) to W 4 St-Washington Sq then via the [D] line to DeKalb Av. Expect delays to [B], [D], [N], [Q] and [R] train service. These service changes are because of NYPD activity at Jay St-MetroTech.",
				trains: [
					"MTA NYCT_B",
					"MTA NYCT_D",
					"MTA NYCT_N",
					"MTA NYCT_Q",
					"MTA NYCT_R"
				],

//  Disabled Reason:
//		Parsing 36 St (Bklyn) on D line before R line, so only 36 Bklyn is available.
/**
				route_change: {
					tag: ['A-overC-D-overE'],
					message: "Southbound [R] trains are stopping along the [Q] line from [Mn623-R23] to [Bk26-R30]. Some southbound [R] trains are stopping along the [F] line from [Qs272-G20] to [Mn167-A32] then via the [D] line to [Bk26-R30]",
					trains: ["R"],
					route: [
						{
							lines: ["R"],
							along: "Q",
							from: "Mn623-R23",   // Canal
							to: "Bk26-R30",		 // DeKalb
						},
						{
							lines: ["R"],
							along: "F",
							from: 'Qs272-G20',  // 36 St (Qns)
							to: 'Mn167-A32',  	// W 4th
						},
						{
							lines: ['R'],
							along: 'D',
							from: 'Mn167-A32',  // W 4th
							to: 'Mn167-A32',	// DeKalb
						},
					],
				},
*/
				line: [
					{
						line: "MTA NYCT_B",
						dir: "1"
					},
					{
						line: "MTA NYCT_D",
						dir: "1"
					},
					{
						line: "MTA NYCT_N",
						dir: "1"
					},
					{
						line: "MTA NYCT_Q",
						dir: "1"
					},
					{
						line: "MTA NYCT_R",
						dir: "0"
					},
					{
						line: "MTA NYCT_R",
						dir: "1"
					}
				],
			},
			{
				type: null,
				type_detail: [
					"delays",
					"mechanical_problems",
					"route_change",
					"no_trains_partial"
				],
				tag: ['MTAD-001'],
				time: null,
				durration: null,
				message: "Southbound [2] trains are stopping along the [5] line from 149 St-Grand Concourse to Nevins St. Some northbound [3] trains are stopping along the [1] line from 96 St to 137 St-City College then end. Some northbound [3] trains end at Times Sq-42 St. Some southbound [3] trains end at Central Park North (110 St). Expect delays to [1], [2], [3], [4] and [5] train service. These service changes are because of a train with mechanical problems at 96 St.",
				line: [
					"MTA NYCT_1",
					"MTA NYCT_2",
					"MTA NYCT_3",
					"MTA NYCT_4",
					"MTA NYCT_5",
				],
				route_change: {
					tag: ['A-overC-D-overE'],
					message: "Southbound [2] trains are stopping along the [5] line from [Bx603-222] to [Bk337-234]. Some northbound [3] trains are stopping along the [1] line from [Mn310-120] to [Mn305-115] then end. Some northbound [3] trains end at [Mn611-127]. Some southbound [3] trains end at [Mn441-227].",
					trains: [
						"2",
						"3"
					],
					route: [
						{
							lines: ["2"],
							along: "5",
							from: "Bx603-222",
							to: "Bk337-234"
						},
						{
							lines: ["3"],
							along: "1",
							from: "Mn310-120",
							to: "Mn305-115"
						}
						]
					}
				},
				{
					type: null,
					type_detail: [
						"delays",
						"police_activity",
						"skip_stations",
						"route_change"
					],
					tag: ['MTAD-001'],
					time: null,
					durration: null,
					message: "Northbound [R] trains are bypassing Jay St-MetroTech.Southbound [R] trains are stopping along the [Q] line from Canal St to DeKalb Av. Some southbound [R] trains are stopping along the [F] line from 36 St (Qns) to W 4 St-Washington Sq then via the [D] line to DeKalb Av. Expect delays to [B], [D], [N], [Q] and [R] train service. These service changes are because of NYPD activity at Jay St-MetroTech.",
					line: [
						"MTA NYCT_B",
						"MTA NYCT_D",
						"MTA NYCT_N",
						"MTA NYCT_Q",
						"MTA NYCT_R"
					],
					route_change: {
						tag: ['A-overC','A-overC-thenD'],
						message: "Southbound [R] trains are stopping along the [Q] line from [Mn623-R23] to [Bk26-R30]. Some southbound [R] trains are stopping along the [F] line from [Qs272-G20] to [Mn167-A32] then via the [D] line to [Bk26-R30].",
						trains: [
							"R",
							"R"
						],
						route: [
							{
								lines: [
								"R"
								],
								along: "Q",
								from: "Mn623-R23",
								to: "Bk26-R30"
							},
							{
								lines: [
								"R"
								],
								along: "F",
								from: "Qs272-G20",
								to: "Mn167-A32"
							},
							{
								lines: [
								"R"
								],
								along: "D",
								from: "Mn167-A32",
								to: "Bk26-R30"
							}
						],
					}
				},
				{
					type: null,
					type_detail: [
						"shuttle_bus",
						"no_trains_partial",
						"route_change",
					],
					tag: ["MTAD-014", "MTAD-001", "MTAD-027"],
					time: null,
					durration: "Late Evenings, 9:30 PM to 11:30 PM, Mon and Tue, Jan 8 - 9",
					message: "[C] No trains between W 4 St and Euclid Av [A] [E] trains and [SB] buses provide alternate service Late Evenings, 9:30 PM to 11:30 PM, Mon and Tue, Jan 8 - 9 [C] service operates between 168 St and W 4 St , and via the [F] to/from 2 Av , the last stop . [A] trains make all [C] stops between Utica Av and Euclid Av. [SB] Buses make all [C] stops between Jay St-MetroTech and Utica Av. Travel Alternatives [TP] For Spring, Canal, and Chambers Sts , take the [E] instead. Transfer between trains at W 4 St. For Fulton St , use the nearby World Trade Center [E] Station . Transfer between trains at W 4 St. For High St , use the nearby York St [F] station instead. [SB] Buses make all stops between Jay St-MetroTech and Utica Av . Transfer between [A] and [C] trains at W 4 St. Transfer between [A] trains and shuttle buses at Jay St-MetroTech and/or Utica Av . Show Shuttle Bus Stops Station Shuttle Bus Stop Jay St-MetroTech [ad] [A] [F] [R] Jay St at Willoughby St Hoyt-Schermerhorn Sts [G] Schermerhorn St at Bond St Lafayette Av Lafayette Av at Ft Greene Pl (to Utica Av) Fulton St at S Portland Av (to Utica Av) Fulton St at Ft Greene Pl (to Jay St-MetroTech) Fulton St at Greene Av (to Jay St-MetroTech) Clinton-Washington Avs Fulton St at Clinton Av Franklin Av [ad] [S] Fulton St at Franklin Av Nostrand Av Fulton St at Nostrand Av Kingston-Throop Avs Fulton St at Kingston Av Utica Av [ad] [A] Fulton St at Stuyvesant Av Note: Late night Lefferts Shuttle replaced by [A] service between Utica Av and Lefferts Blvd.",
					message_station_parse: "[C] No trains between [Mn167-A32] and [Bk188-A55] [A] [E] trains and [SB] buses provide alternate service Late Evenings, 9:30 PM to 11:30 PM, Mon and Tue, Jan 8 - 9 [C] service operates between [Mn605-A09] and [Mn167-A32] , and via the [F] to/from 2 Av , the last stop . [A] trains make all [C] stops between [Bk181-A48] and [Bk188-A55]. [SB] Buses make all [C] stops between [Bk636-A41] and [Bk181-A48]. Travel Alternatives [TP] For Spring, Canal, and [Mn624-A36]s , take the [E] instead. Transfer between trains at W 4 St. For [Mn628-A38] , use the nearby World Trade Center [E] Station . Transfer between trains at W 4 St. For [Bk173-A40] , use the nearby York St [F] station instead. [SB] Buses make all stops between [Bk636-A41] and Utica Av . Transfer between [A] and [C] trains at W 4 St. Transfer between [A] trains and shuttle buses at Jay St-MetroTech and/or Utica Av . Show Shuttle Bus Stops Station Shuttle Bus Stop Jay St-MetroTech [ad] [A] [F] [R] Jay St at Willoughby St [Bk175-A42] [G] Schermerhorn St at Bond St [Bk176-A43] [Bk176-A43] at Ft Greene Pl (to Utica Av) [Mn628-A38] at S Portland Av (to Utica Av) Fulton St at Ft Greene Pl (to Jay St-MetroTech) Fulton St at Greene Av (to Jay St-MetroTech) [Bk177-A44] Fulton St at Clinton Av [Bk627-A45] [ad] [S] Fulton St at [Bk627-A45] [Bk179-A46] Fulton St at [Bk179-A46] [Bk180-A47] Fulton St at Kingston Av Utica Av [ad] [A] Fulton St at Stuyvesant Av Note: Late night Lefferts Shuttle replaced by [A] service between Utica Av and Lefferts Blvd.",
					stations: {
						'MTA NYCT_C': {
							stations: {
								'Mn605-A09': '168 St',
				        'Mn167-A32': 'W 4 St',
				        'Mn624-A36': 'Chambers St',
				        'Mn628-A38': 'Fulton St',
				        'Bk173-A40': 'High St',
				        'Bk636-A41': 'Jay St-MetroTech',
				        'Bk175-A42': 'Hoyt-Schermerhorn Sts',
				        'Bk176-A43': 'Lafayette Av',
				        'Bk177-A44': 'Clinton-Washington Avs',
				        'Bk627-A45': 'Franklin Av',
				        'Bk179-A46': 'Nostrand Av',
				        'Bk180-A47': 'Kingston-Throop Avs',
				        'Bk181-A48': 'Utica Av',
				        'Bk188-A55': 'Euclid Av'
							}
						}
					},
					route_change: {
						tag: ['A-operates-then-overC'],
						message: '[C] service operates between [Mn605-A09] and [Mn167-A32] , and via the [F] to/from [Mn232-F14] ,',
						trains: [
							"C"
						],
						route: [
							{
								lines: [
									"C"
								],
								along: null,
								from: 'Mn605-A09',
								to: 'Mn167-A32',
							},
							{
								lines: [
								"C"
								],
								along: "F",
								from: "Mn167-A32",
								to: "Mn232-F14"
							}
						],
					},
					line: [
						{
							line: "MTA NYCT_C",
							dir: "1"
						},
						{
							line: "MTA NYCT_C",
							dir: "0"
						}
					],
					message_formula: "[-SUMMARY-] [-DATES-] [C] service operates between 168 St and W 4 St , and via the [F] to/from 2 Av , the last stop . [A] trains make all [C] stops between Utica Av and Euclid Av. [SB] Buses make all [C] stops between Jay St-MetroTech and Utica Av. [-ALT-INSTRUCT-]"
				},
				{
					type: null,
					type_detail: [
						"service_ends_early",
						"running_local",
						"route_change",
						"track_maintenance"
					],
					tag: ["MTAD-014", "MTAD-001"],
					time: null,
					durration: "Evenings, 8:30 PM to 11:59 PM, Mon to Thu, Jan 15 - 18 Jan 22 - 25",
					message: "TRACK MAINTENANCE [M] Service ends early between 71 Av and Essex St [E] [F] [R] trains provide alternate service Evenings, 8:30 PM to 11:59 PM, Mon to Thu, Jan 15 - 18 Jan 22 - 25 [M] service operates between Essex St and Myrtle Av and via the [J] to/from Broadway Junction. [M] shuttle service operates between Metropolitan Av and Myrtle Wyckoff Avs . Travel Alternatives [TP] [R] trains make all [M] stops between 71 Av and Queens Plaza. [E] trains make all [M] stops between Queens Plaza and Broadway-Lafayette St*. [F] trains make all [M] stops between 47-50 Sts and Delancey St/Essex St. Transfer between [E] [F] and [R] trains at Roosevelt Av or 34 St-Herald Sq. Transfer between [F] and [M] trains at Delancey St/Essex St. *This detour has taken into account additional planned service changes. Note: [E] and [F] trains run local in both directions in Queens after 10 PM. Please use the following guide to arrive at your station before end of service. To 71 Av: To Broadway Junction: Broadway Junction 8:43 PM 71 Av 8:30 PM Myrtle Av 8:53 PM Roosevelt Av 8:40 PM Essex St 9:05 PM Queens Plaza 8:51 PM W 4 St 9:11 PM 47-50 Sts 8:59 PM 47-50 Sts 9:19 PM B'way-Lafayette St 9:09 PM Reminder: No [M] service between Myrtle-Wyckoff Avs and Myrtle Av. [ad] This service change affects one or more ADA accessible stations. Please call 511 for help with planning your trip. If you are deaf or hard of hearing, use your preferred relay service provider or the free 711 relay.",
					message_station_parse: "TRACK MAINTENANCE [M] Service ends early between [Qs261-G08] and [Mn625-M18] [E] [F] [R] trains provide alternate service Evenings, 8:30 PM to 11:59 PM, Mon to Thu, Jan 15 - 18 Jan 22 - 25 [M] service operates between [Mn625-M18] and [Bk97-M11] and via the [J] to/from [Bk621-J27]. [M] shuttle service operates between Metropolitan Av and [Bk630-M08] . Travel Alternatives [TP] [R] trains make all [M] stops between [Qs261-G08] and [Qs273-G21]. [E] trains make all [M] stops between [Qs273-G21] and [Mn619-D21]*. [F] trains make all [M] stops between [Mn225-D15] and [Mn625-F15]/Essex St. Transfer between [E] [F] and [R] trains at [Qs616-G14] or [Mn607-D17]. Transfer between [F] and [M] trains at Delancey St/Essex St. *This detour has taken into account additional planned service changes. Note: [E] and [F] trains run local in both directions in Queens after 10 PM. Please use the following guide to arrive at your station before end of service. To [Qs261-G08]: To Broadway Junction: Broadway Junction 8:43 PM [Qs261-G08] 8:30 PM [Bk97-M11] 8:53 PM [Qs616-G14] 8:40 PM Essex St 9:05 PM [Qs273-G21] 8:51 PM [Mn167-A32] 9:11 PM 47-[Mn162-A25]s 8:59 PM [Mn225-D15] 9:19 PM B'way-Lafayette St 9:09 PM Reminder: No [M] service between Myrtle-Wyckoff Avs and Myrtle Av. [ad] This service change affects one or more ADA accessible stations. Please call 511 for help with planning your trip. If you are deaf or hard of hearing, use your preferred relay service provider or the free 711 relay.",
					trains: [
						"MTA NYCT_M"
					],
					ad_message: "[ad] This service change affects one or more ADA accessible stations. Please call 511 for help with planning your trip. If you are deaf or hard of hearing, use your preferred relay service provider or the free 711 relay.",
					alt_instructions: "Travel Alternatives [TP] [R] trains make all [M] stops between 71 Av and Queens Plaza. [E] trains make all [M] stops between Queens Plaza and Broadway-Lafayette St*. [F] trains make all [M] stops between 47-50 Sts and Delancey St/Essex St. Transfer between [E] [F] and [R] trains at Roosevelt Av or 34 St-Herald Sq. Transfer between [F] and [M] trains at Delancey St/Essex St. *This detour has taken into account additional planned service changes. Note: [E] and [F] trains run local in both directions in Queens after 10 PM. Please use the following guide to arrive at your station before end of service. To 71 Av: To Broadway Junction: Broadway Junction 8:43 PM 71 Av 8:30 PM Myrtle Av 8:53 PM Roosevelt Av 8:40 PM Essex St 9:05 PM Queens Plaza 8:51 PM W 4 St 9:11 PM 47-50 Sts 8:59 PM 47-50 Sts 9:19 PM B'way-Lafayette St 9:09 PM Reminder: No [M] service between Myrtle-Wyckoff Avs and Myrtle Av.",
					route_change: {
						tag: ['A-operates-then-overC'],
						message: "[M] service operates between [Mn625-M18] and [Bk97-M11] and via the [J] to/from [Bk621-J27]. [M] shuttle service operates between [Qs108-M01] and [Bk630-M08] . Travel",
						trains: ["M"],
						route: [
							{
								allTrains: true,
								dir: null,
								lines: ["M"],
								along: null,
								from: "Mn625-M18",
								to: "Bk97-M11"
							},
							{
								allTrains: true,
								dir: null,
								lines: ["M"],
								along: "J",
								from: "Bk97-M11",
								to: "Bk621-J27"
							}
						],
					},
					line: [
						{ line: "MTA NYCT_M", dir: "1" },
						{	line: "MTA NYCT_M", dir: "0" }
					],
				},
				{
					id: "MTA NYCT_177051",
					type: null,
					type_detail: [
						"shuttle_bus",
						"route_change",
						"skip_stations",
						"no_trains_partial",
						"signal_maintenance"
					],
					tag: ['MTAD-001', 'MTAD-009'],
					time: null,
					durration: "Weekend, 11:30 PM Fri to 5 AM Mon, Jan 26 - 29",
					message: "SIGNAL MAINTENANCE [D] Service operates in two sections and is rerouted in Manhattan[F] [N] [Q] [R] trains and [SB] free shuttle buses provide alternate service Weekend, 11:30 PM Fri to 5 AM Mon, Jan 26 - 29 No [D] service at 7 Av , 47-50 Sts , 42 St-Bryant Pk , 34 St-Herald Sq , Grand St and DeKalb Av . [D] service operates in two sections: 1. Between 205 St and B'way-Lafayette St, and via the [F] to/from 2 Av, the last stop Trains run via the [A] local in both directions between 125 St and W 4 St. 2. Between Atlantic Av-Barclays Ctr and Stillwell Av Trains skip Union St, 4 Av-9 St, Prospect Av and 25 St in both directions. [SB] Buses operate between W 4 St and Grand St , stopping at B'way-Lafayette St . Show Shuttle Bus Stops Station Bus Stop Bus W 4 St [ad] [A] [C] [D] [E] [F] 6 Av at W 3 St M55 B'way-Lafayette St [ad] [D] [F] Houston St at Broadway M21 Grand St Grand St at Chrystie St -- Travel Alternatives [TP] For service between Manhattan and Brooklyn , take the [N] or [Q]. Transfer between [D] and [N] [Q] trains via the passageway at Times Sq-42 St/Port Authority. In Brooklyn, transfer between [D] and [N] [Q] trains at Atlantic Av-Barclays Ctr. Transfer between [N] [Q] and [F] at 34 St-Herald Sq. For 7 Av , take the [E] via transfer at Times Sq-42 St/Port Authority. For 47-50 Sts , 42 St-Bryant Pk and 34 St-Herald Sq take the [F]. Transfer between [D] and [F] trains at W 4 St. Transfer between [N] [Q] and [F] trains at 34 St-Herald Sq. For Grand St , take a [SB] bus via transfer at W 4 St or B'way-Lafayette St. For DeKalb Av , take the [N] [Q] or [R] instead via transfer at Atlantic Av-Barclays Ctr or Times Sq-42 St/Port Authority. For Union St , 4 Av-9 St, Prospect Av and 25 St , take the [N] or [R] instead. Transfer between [D] and [N] [R] trains at 36 St. [ad] This service change affects one or more ADA accessible stations. Please call 511 for help with planning your trip. If you are deaf or hard of hearing, use your preferred relay service provider or the free 711 relay.",
					message_station_parse: "SIGNAL MAINTENANCE [D] Service operates in two sections and is rerouted in Manhattan[F] [N] [Q] [R] trains and [SB] free shuttle buses provide alternate service Weekend, 11:30 PM Fri to 5 AM Mon, Jan 26 - 29 No [D] service at [Mn277-D14] , [Mn225-D15] , [Mn609-D16] , [Mn607-D17] , [Mn231-D22] and [Bk26-R30] . [D] service operates in two sections: 1. Between [Bx210-D01] and [Mn619-D21], and via the [F] to/from [Mn232-F14], the last stop Trains run via the [A] local in both directions between [Mn153-A15] and [Mn167-A32]. 2. Between [Bk617-R31] and [Bk58-D43] Trains skip [Bk28-R32], [Bk608-F23], [Bk30-R34] and [Bk31-R35] in both directions. [SB] Buses operate between [Mn167-A32] and [Mn231-D22] , stopping at [Mn619-D21] . Show Shuttle Bus Stops Station Bus Stop Bus [Mn167-A32] [ad] [A] [C] [D] [E] [F] 6 Av at W 3 St M55 [Mn619-D21] [ad] [D] [F] Houston St at [Qs4-R05] M21 [Mn231-D22] [Mn231-D22] at Chrystie St -- Travel Alternatives [TP] For service between Manhattan and Brooklyn , take the [N] or [Q]. Transfer between [D] and [N] [Q] trains via the passageway at Times Sq-42 St/Port Authority. In Brooklyn, transfer between [D] and [N] [Q] trains at [Bk617-R31]. Transfer between [N] [Q] and [F] at [Mn607-D17]. For [Mn277-D14] , take the [E] via transfer at Times Sq-42 St/Port Authority. For [Mn225-D15] , [Mn609-D16] and [Mn607-D17] take the [F]. Transfer between [D] and [F] trains at [Mn167-A32]. Transfer between [N] [Q] and [F] trains at [Mn607-D17]. For [Mn231-D22] , take a [SB] bus via transfer at [Mn167-A32] or [Mn619-D21]. For [Bk26-R30] , take the [N] [Q] or [R] instead via transfer at [Bk617-R31] or Times Sq-42 St/Port Authority. For [Bk28-R32] , [Bk608-F23], [Bk30-R34] and [Bk31-R35] , take the [N] or [R] instead. Transfer between [D] and [N] [R] trains at [Bk32-R36]. [ad] This service change affects one or more ADA accessible stations. Please call 511 for help with planning your trip. If you are deaf or hard of hearing, use your preferred relay service provider or the free 711 relay.",
					route_change: {
						tag: ['A-operates-then-overC'],
						message: "[D] Service operates in two sections and is rerouted in Manhattan[F] [N] [Q] [R] ``` [D] service operates in two sections: 1. Between [Bx210-D01] and [Mn619-D21], and via the [F] to/from [Mn232-F14], the last stop Trains run via the [A] local in both directions between [Mn153-A15] and [Mn167-A32]. 2. Between [Bk617-R31] and [Bk58-D43]",
						trains:["D"],
						route: [
							{
								allTrains: true,
								dir: null,
								lines: ["D"],
								along: null,
								from: "Bx210-D01",
								to: "Mn619-D21"
							},
							{
								allTrains: true,
								dir: null,
								lines: ["D"],
								along: "F",
								from: "Mn619-D21",
								to: "Mn232-F14"
							}
						]
					},
					line: [
						{line: "MTA NYCT_D",dir: "0"},
						{line: "MTA NYCT_D",dir: "1"}
					],
				},
		],

		complex: [
			{
				type: 'PlannedWork',
				type_detail: null,
				time: null,
				durration: 'Weekend Until Summer 2018',
				message: 'Weekend [2] [3] station closures and route changes Until Summer 2018 -- No service at Park Place, Wall St, Clark St and Hoyt St; use nearby [4] [5] stations No [2] [3] service between Manhattan and Brooklyn; take the [4] or [5] instead.',
			},
			{
				type: 'PlannedWork',
				type_detail: null,
				time: '',
				durration: 'Weekend Until Summer 2018 including Dec 25, 2017 and Jan 1, 2018',
				message: 'TUNNEL RECONSTRUCTION Weekend [2] [3] station closures and route changes Until Summer 2018 including Dec 25, 2017 and Jan 1, 2018 No service at Park Place, Wall St, Clark St and Hoyt St; use nearby [4] [5] stations No [2] [3] service between Manhattan and Brooklyn; take the [4] or [5] instead. Weekend service map for Lower Manhattan and Downtown Brooklyn New timetables with Weekend Route Changes | [2] pdf | [3] pdf | [4] pdf | [5] pdf',
				alt_instructions: 'use nearby [4] [5] stations No [2] [3] service between Manhattan and Brooklyn; take the [4] or [5] instead. Weekend service map for Lower Manhattan and Downtown Brooklyn New timetables with Weekend Route Changes | [2] pdf | [3] pdf | [4] pdf | [5] pdf',
			},
			{
				type: 'ServiceChange',
				type_detail: null,
				time: null,
				durration: null,
				message: '[5] There is no service between Eastchester-Dyre Av and E 180 St in both directions because of ongoing signal problems at Eastchester-Dyre Av.Our crews are on scene working to fix it, we will follow up soon. There are free [SB] shuttle buses at the following bus stops:Toward Eastchester-Dyre Av:On Morris Park Av at E180 St - Bx21 StopOn Morris Park Av at Hone Av - Bx21 StopOn Williamsbridge Rd at Lydig AvOn Williamsbridge Rd at Pelham Pkwy S - Bx8 StopOn Williamsbridge Rd at Pelham Pkwy N - Bx8 StopOn E Gunhill Rd at Knapp St - Bx28 StopOn Boston Rd at Baychester Av - Bx30 StopOn Dyre Av at Light St - Bx18 StopToward E 180 St:On Dyre Av at Light St - Bx18 StopOn Boston Rd at Baychester Av - Bx30 StopOn E Gunhill Rd at DeWitt Pl - Bx28 StopOn Williamsbridge Rd at Pelham Pkwy N - Bx8 StopOn Williamsbridge Rd at Pelham Pkwy S - Bx8 StopOn Williamsbridge Rd at Lydig AvOn Morris Park Av at Hone Av - Bx21 StopOn Morris Park Av at E180 St - Bx21 Stop',
				alt_instructions: 'There are free [SB] shuttle buses at the following bus stops:Toward Eastchester-Dyre Av:On Morris Park Av at E180 St - Bx21 StopOn Morris Park Av at Hone Av - Bx21 StopOn Williamsbridge Rd at Lydig AvOn Williamsbridge Rd at Pelham Pkwy S - Bx8 StopOn Williamsbridge Rd at Pelham Pkwy N - Bx8 StopOn E Gunhill Rd at Knapp St - Bx28 StopOn Boston Rd at Baychester Av - Bx30 StopOn Dyre Av at Light St - Bx18 StopToward E 180 St:On Dyre Av at Light St - Bx18 StopOn Boston Rd at Baychester Av - Bx30 StopOn E Gunhill Rd at DeWitt Pl - Bx28 StopOn Williamsbridge Rd at Pelham Pkwy N - Bx8 StopOn Williamsbridge Rd at Pelham Pkwy S - Bx8 StopOn Williamsbridge Rd at Lydig AvOn Morris Park Av at Hone Av - Bx21 StopOn Morris Park Av at E180 St - Bx21 Stop',
			},
		],
	},


	message: {
		unplanned: {
			simple: [
				// Signal Problems
				'Northbound [N],[R] and [W] trains are running with delays because of signal problems at 57 St-7 Av.',

				// Police Activity
				'Southbound [1] trains are running express from 72 St to 42 St because of an investigation at 42 St.',
				'[1] train service has resumed following an earlier investigation at Times Sq-42 Sq.',
				'Southbound [1] trains are running express from 96 St to 42 St because of NYPD activity 86 St.',
				"[E] and [F] train service has resumed following an earlier investigation at Jackson Hts-Roosevelt Av.",

				// Fire Activity
				'[2], [3], [4] and [5] train service has resumed following earlier FDNY activity at Hoyt St.',
				'Southbound [2], [3], [4] and [5] train service changes and delays because of FDNY activity at Hoyt St. See mta.info',

				// Service resumed
				'[4] and [5] train service has resumed following an earlier train with mechanical problems at Bowling Green.',

				// Running Local // Signal Problems
				'Southbound [E] and [F] trains are running local from Forest Hills-71 Av to Jackson Hts-Roosevelt Av because of signal problems at Forest Hills-71 Av.',
				'[R] trains are running with delays in both directions because of signal problems between 86 St and Bay Ridge-95 St.',
				'Southbound [E] and [F] trains are running local from Forest Hills-71 Av to 36 St (Qns) because of an investigation at Jackson Heights-Roosevelt Av. Expect delays on [E], [F] and [R] trains.',

				// Diversions
				'Southbound [Q] trains are stopping along the [R] line from Canal St to DeKalb Av because of a sick passenger at Canal St.',
				'Southbound [N] trains are stopping along the [D] line from 36 St (Bklyn) to Coney Island-Stillwell Av because of signal problems between 8 Av and Bay Parkway.',
				'Northbound [F] trains are stopping along the [A] line from Jay St-MetroTech to 42 St-Port Authority, then stopping along the [E] line to Jackson Heights-Roosevelt Av. These service changes are because of switch problems at Broadway-Lafayette St. Expect delays on the [A], [E], and [F] lines.',

				// Rail Condition
				'There is limited [A] train service between 168 St and Inwood-207 St in both directions because of a rail condition at 190 St.',
				'[7D] and [7] trains are running with delays in both directions because of an ongoing track condition at Grand Central-42 St.',

				// Mechanical Problems
				'[Q] train service has resumed following an earlier incident involving a train with mechanical problems at Avenue H.',

				// Power Loss
				'Northbound [6] trains will end at Westchester Square-East Tremont Av because of a loss of power between Buhre Av and Pelham Bay Park',

				// Terrorism / Incident
				'[1] [2] [3] [N] [R] [Q] [W] and [7] trains are bypassing Times Sq-42 St in both directions, [A] [C] and [E] trains are bypassing 42 St/Port Authotiy.',
				'Northbound [2] trains are running with delays because of an unruly passenger at Sterling St.',
				'[4] and [5] train service has resumed following an earlier incident involving an unruly passenger at 14 St-Union Sq.',
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
	"R": [

		{
			type_detail: [],
			line: [{line: 'MTA NYCT_R'}],
			stations: ["DeKalb Av", "Canal St"],
			station_ids: [],
			stationsOtherLines: [],
			message: "SIGNAL MAINTENANCE [R] Trains run via the [Q] in both directions between DeKalb Av and Canal St",
		},
		{
			type_detail: [],
			line: [{line: 'MTA NYCT_R'}],
			stations: ['86 St', 'Bay Ridge-95 St'],
			station_ids: ['Bk38', 'Bk39'],
			message: "[R] trains are running with delays in both directions because of signal problems between 86 St and Bay Ridge-95 St.",
		},
		{
			type_detail: [],
			line: [{line: 'MTA NYCT_R'}],
			known_problems: 'Stations: 36th St (Bkyn)',
			stations: ['65 St', 'Northern Blvd', '46 St', 'Steinway St', '36 St (Qns)', 'Queens Plaza', 'Roosevelt Av'],
			station_ids: ['Q268', 'Q269', 'Q270', 'Q271', 'Q272'],
			problem: '36 St exists in Queens and Brooklyn',
			message: "'TRACK MAINTENANCE [R] Bay Ridge-bound trains skip 65 St, Northern Blvd, 46 St, Steinway St and 36 St (Qns). Late Evenng, 9:45 PM to 11 PM, Friday, Dec 22. For service to these stations, take the [R] to Queens Plaza and transfer to a Forest Hills-bound. For service from these stations, take the [R] to Roosevelt Av and transfer to a Bay Ridge-bound [R].",
		},
		{
			tag: ['MTAD-004'],
			type_detail: [],
			line: [{line: 'MTA NYCT_R'}],
			known_problems: 'Stations: 59th St (Bkyn)',
			stations: ['57 St-7 Av', '5 Av-59 St', 'Jackson Heights-Roosevelt Av'],
			stationsOtherLines: ['96 St', 'Lexington Av-63 St'],
			stationIds: [],
			problem: '59 St exists in Manhattan and Brooklyn',
			message: "Some northbound [N] trains are stopping on the [Q] line from 57 St-7 Av and end at 96 St. Some northbound [R] trains are stopping on the [Q] line from 57 St-7 Av to Lexington Av-63 St, then over the [F] line from Lexington Av-63 St to Jackson Heights-Roosevelt Av. This service change is because of a train with mechanical problems at 5 Av-59 St. Expect delays in [F][N][Q][R] train service.",
		},
		{
			type_detail: [],
			line: [{line: 'MTA NYCT_R'}],
			stations: ['53 St', '45 St', '25 St', 'Prospect Av', '4 Av-9 St', 'Union St'],
			station_ids: ['Bk34', 'Bk33', 'Bk31', 'Bk30', 'Bk608', 'Bk28'],
			problem: '9th St is listed as Line-Station (4 Av-9 St)',
			message: "PRIORITY REPAIRS [R] Manhattan-bound trains skip 53 St, 45 St, 25 St, Prospect Av, 4 Av-9 St and Union St",
		},
		{
			type_detail: [],
			line: [{line: 'MTA NYCT_R'}],
			stations: ['Jackson Hts-Roosevelt Av', 'Forest Hills-71 Av'],
			station_ids: ['Canal St','57 St-7 Av'],
			message: "Some Forest Hills-bound [M] and [R] trains are running express from Jackson Hts-Roosevelt Av to Forest Hills-71 Av because of signal problems at Jackson Hts-Roosevelt Av.",
		},

		{
			type_detail: [],
			line: [{line: 'MTA NYCT_R'}],
			stations: ['Canal St','57 St-7 Av', 'Times Sq-42 St'],
			message: "Northbound [N] trains are running local from Canal St to 57 St-7 Av.Northbound [Q] trains will end at Times Sq-42 St.Northbound [Q] trains are running local from Canal St to Times Sq-42 St.These service changes are because of a train with mechanical problems at 57 St-7 Av.Expect delays on the [N], [Q], [R] and [W] trains.",
		},
	],
}



module.exports = {
	event_messages,
	train_line,
};
