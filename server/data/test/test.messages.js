
let event_messages = {

	structured: {
		normal: [
			{
				type: 'ServiceChange',
				type_detail: [
					'route_change',
				],
				time: 'Posted: 11/25/2017 7:12PM',
				durration: null,
				message: 'Some northbound [N] trains are stopping on the [Q] line from 57 St-7 Av and end at 96 St. Some northbound [R] trains are stopping on the [Q] line from 57 St-7 Av to Lexington Av-63 St, then over the [F] line from Lexington Av-63 St to Jackson Heights-Roosevelt Av. This service change is because of a train with mechanical problems at 5 Av-59 St. Expect delays in [F][N][Q][R] train service.',
				alt_instructions: null,
			},
			{
				type: 'Delays',
				type_detail: null,
				time: 'Posted: 11/15/2017 12:22PM',
				durration: null,
				message: ' [2], [3], [4] and [5] trains are running with delays in both directions because of signal maintenance at <STRONG>Eastern Pkwy-Brooklyn Museum.</STRONG>',
				message_raw: '<span class="TitleDelay">Delays</span> <span class="DateStyle"> Posted: 11/15/2017 12:22PM  </span> [2], [3], [4] and [5] trains are running with delays in both directions because of signal maintenance at <STRONG>Eastern Pkwy-Brooklyn Museum.</STRONG>',
				alt_instructions: null,
			},
			{
				type: 'Delays',
				type_detail: null,
				time: null,
				durration: null,
				message: 'Some northbound [E] trains are running local from Queens Plaza to Jackson Hts-Roosevelt Av. Some northbound [E] trains are stopping long the [C] line from 50 St to 168 St.   Some northbound [F] trains are running local from 21 St-Queensbridge to Jackson Hts-Roosevelt Av.  [M] trains no service between Essex St and Forest Hills-71 Av. These service changes are because of signal problems at 36 St (Queens). Expect delays on [E], [F], [M] and [R] trains.',
			},
			{
				type: 'PlannedWork',
				type_detail: null,
				time: '',
				durration: 'All times, Monday to Friday, Dec 4 - 8 Dec 11 - 15',
				message: 'TRACK & TRACK PLATE INSTALLATION, REPLACEMENT OF POWER & COMMUNICATION CABLES [2] [3] Trains run at reduced speed through the Clark St Tunnel between Manhattan and Brooklyn All times, Monday to Friday, Dec 4 - 8 Dec 11 - 15 The slower speed will keep everyone safe as our crews make critical repairs to the tunnel. Please allow additional travel time.',
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
				type_detail: null,
				time: '',
				durration: 'Late Nights, 9:30 PM to 5 AM, Mon to Fri, Dec 11 - 15',
				message: 'TRACK MAINTENANCE [2] No trains between Franklin Av and Flatbush Av [SB] Free shuttle buses provide alternate service Late Nights, 9:30 PM to 5 AM, Mon to Fri, Dec 11 - 15 [2] service operates between 241 St and Franklin Av, and via the [4] to/from Utica Av. [SB] Buses operate between Franklin Av and Flatbush Av, making stops at Nostrand Av, President St, Sterling St, Winthrop St, Church Av, Beverly Rd and Newkirk Av. Transfer between trains and [SB] buses at Franklin Av. Travel Alternatives [TP] Show Shuttle Bus Stops Station Shuttle Bus Stop Franklin Av  [2] [4] Eastern Pkwy at Franklin Av Nostrand Av [4] Nostrand Av at Eastern Pkwy (to Flatbush Av) Eastern Pkwy at Nostrand Av (to Franklin Av) President St Nostrand Av at Carroll St (to Flatbush Av) New York Av at Carroll St (to Franklin Av) Sterling St Nostrand Av at Lefferts Av (to Flatbush Av) New York Av at Empire Blvd (to Franklin Av) Winthrop St Nostrand Av at Winthrop St (to Flatbush Av) New York Av at Winthrop St (to Franklin Av) Church Av Nostrand Av at Church Av (to Flatbush Av) New York Av at Church Av (to Franklin Av) Beverly Rd Nostrand Av at Beverly Rd (to Flatbush Av) New York Av at Beverly Rd (to Franklin Av) Newkirk Av Nostrand Av at Newkirk Av (to Flatbush Av) New York Av at Avenue D (to Franklin Av) Flatbush Av Nostrand Av at Flatbush Av [ad]  This service change affects one or more ADA accessible stations. Please call 511 for help with planning your trip. If you are deaf or hard of hearing, use your preferred relay service provider or the free 711 relay.',
				alt_instructions: 'Transfer between trains and [SB] buses at Franklin Av. Travel Alternatives [TP] Show Shuttle Bus Stops Station Shuttle Bus Stop Franklin Av  [2] [4] Eastern Pkwy at Franklin Av Nostrand Av [4] Nostrand Av at Eastern Pkwy (to Flatbush Av) Eastern Pkwy at Nostrand Av (to Franklin Av) President St Nostrand Av at Carroll St (to Flatbush Av) New York Av at Carroll St (to Franklin Av) Sterling St Nostrand Av at Lefferts Av (to Flatbush Av) New York Av at Empire Blvd (to Franklin Av) Winthrop St Nostrand Av at Winthrop St (to Flatbush Av) New York Av at Winthrop St (to Franklin Av) Church Av Nostrand Av at Church Av (to Flatbush Av) New York Av at Church Av (to Franklin Av) Beverly Rd Nostrand Av at Beverly Rd (to Flatbush Av) New York Av at Beverly Rd (to Franklin Av) Newkirk Av Nostrand Av at Newkirk Av (to Flatbush Av) New York Av at Avenue D (to Franklin Av) Flatbush Av Nostrand Av at Flatbush Av',
			},
			{
				type: 'PlannedWork',
				type_detail: null,
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
				type_detail: null,
				time: 'Transfer between [A] trains and [SB] buses at Beach 90 St .',
				durration: 'Weekends, 11:15 PM Fri to 5 AM Mon, Nov 24 - 27 &bull; Dec 1 - 4',
				message: 'TRACK REPLACEMENT [A] No trains between Broad Channel and Mott Av [SB] Free shuttle buses provide alternate service Weekends, 11:15 PM Fri to 5 AM Mon, Nov 24 - 27 &bull; Dec 1 - 4 [A] service operates between 207 St and Broad Channel , and replace the [S] to/from Beach 116 St . [SB] Buses make stops at Beach 90 , Beach 67 , Beach 60 , Beach 44 , Beach 36 , Beach 25 Sts and Mott Av . &bull; Transfer between [A] trains and [SB] buses at Beach 90 St . Show Shuttle Bus Stops Station Shuttle Bus Stop Bus Mott Av Beach 22 St at Station Entrance &mdash; Beach 25 St Beach Channel Dr at Beach 25 St &mdash; Beach 36 St Beach Channel Dr at Beach 35 St (to Mott Av) Q22 Beach Channel Dr at 36 St (to Beach 90 St) Q22 Beach 44 St Beach Channel Dr at Beach 44 St Q22 Beach 60 St Beach Channel Dr at Beach 59 St Q22 Beach 67 St Beach Channel Dr at Beach 67 St Q22 Beach 90 St [A] Rockaway Beach Blvd at Beach 88 St Q22 Note: Service to/from Lefferts Blvd is not affected. [ad] This service change affects one or more ADA accessible stations. Please call 511 for help with planning your trip. If you are deaf or hard of hearing, use your preferred relay service provider or the free 711 relay.',
				alt_instructions: 'Transfer between [A] trains and [SB] buses at Beach 90 St . Show Shuttle Bus Stops Station Shuttle Bus Stop Bus Mott Av Beach 22 St at Station Entrance &mdash; Beach 25 St Beach Channel Dr at Beach 25 St &mdash; Beach 36 St Beach Channel Dr at Beach 35 St (to Mott Av) Q22 Beach Channel Dr at 36 St (to Beach 90 St) Q22 Beach 44 St Beach Channel Dr at Beach 44 St Q22 Beach 60 St Beach Channel Dr at Beach 59 St Q22 Beach 67 St Beach Channel Dr at Beach 67 St Q22 Beach 90 St [A] Rockaway Beach Blvd at Beach 88 St Q22 Note: Service to/from Lefferts Blvd is not affected.',
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
				time: null,
				durration: "All Times, 5 AM Tue, Dec 26 until 8 AM Sun, Dec 31",
				message: "SUBWAY ACTION PLAN: We're improving: Signals, Cables, Tracks and Drainage [E] No service between Jackson Hts-Roosevelt Av and West 4 St [M] No weekday service between Broadway Junction and 71 Av All Times, 5 AM Tue, Dec 26 until 8 AM Sun, Dec 31 [E] trains are rerouted in both directions via the [F] between Jackson Hts-Roosevelt Av and West 4 St * [E] trains run local between 71 Av and 21 St-Queensbridge overnight. [M] Shuttle trains operate all times between Metropolitan Av and Myrtle-Wyckoff Avs . [M] trains operate weekend service between Broadway Junction [J] and Essex St . Overnight [SB] free shuttle buses connect Queens Plaza and Court Sq-23 St [7] stopping at 21 St-Queensbridge [E] [F]. Travel Alternatives [TP] For JFK Airport , take the Far Rockaway-bound [A] to Howard Beach-JFK Airport. For LaGuardia Airport , take the [7] or [E] (from 6 Av) to 74 St-Roosevelt Av, for the LaGuardia Link Q70 SBS . For Port Authority Bus Terminal , all 8 Av [E] stations and overnight service between W 4 St and World Trade Center , take the [A] or [C]. For 53 St [E] stations , use the nearby 51 St [6] or 7 Av [B] [D] Stations. For [M] stations , take the [E] [F] [R] and/or [J]. Take the [7] for Court Sq-23 St [G] , and the [R] ( days/evenings ) for Queens Plaza or free overnight shuttle buses. Click here for details about this Subway Action Plan. *9:45 PM to 5 AM, Tue to Fri, Dec 26 - 29 [E] trains run to/from 2 Av [F] station after W 4 St. [ad] This service change affects one or more ADA accessible stations. Please call 511 for help with planning your trip. If you are deaf or hard of hearing, use your preferred relay service provider or the free 711 relay.",
				alt_instructions: "Travel Alternatives [TP] For JFK Airport , take the Far Rockaway-bound [A] to Howard Beach-JFK Airport. For LaGuardia Airport , take the [7] or [E] (from 6 Av) to 74 St-Roosevelt Av, for the LaGuardia Link Q70 SBS . For Port Authority Bus Terminal , all 8 Av [E] stations and overnight service between W 4 St and World Trade Center , take the [A] or [C]. For 53 St [E] stations , use the nearby 51 St [6] or 7 Av [B] [D] Stations. For [M] stations , take the [E] [F] [R] and/or [J]. Take the [7] for Court Sq-23 St [G] , and the [R] ( days/evenings ) for Queens Plaza or free overnight shuttle buses. Click here for details about this Subway Action Plan. *9:45 PM to 5 AM, Tue to Fri, Dec 26 - 29 [E] trains run to/from 2 Av [F] station after W 4 St.",
				ad_message: "[ad] This service change affects one or more ADA accessible stations. Please call 511 for help with planning your trip. If you are deaf or hard of hearing, use your preferred relay service provider or the free 711 relay.",
			},
			{
				type: null,
				type_detail: [
				"shuttle_bus",
				"no_trains_partial",
				"electrical_improvements"
				],
				time: null,
				durration: "Late Nights, 9:30 PM to 5 AM, Wed to Fri, Dec 27 - 29",
				message: "ELECTRICAL IMPROVEMENTS [4] No trains between 149 St-Grand Concourse and 125 St[SB] Free shuttle buses provide alternate service Late Nights, 9:30 PM to 5 AM, Wed to Fri, Dec 27 - 29 [TP] [4] service operates in two sections: 1. Between 149 St-Grand Concourse and Woodlawn . 2. Between Crown Hts/New Lots Av and 125 St and via the [6] to/from 3 Av-138 St. [SB] Buses operate between 149 St-Grand Concourse and 3 Av-138 St , stopping at 138 St-Grand Concourse. Transfer between trains and [SB] buses at 149 St-Grand Concourse and/or 3 Av-138 St. Station Shuttle Bus Stop 149 St-Grand Concourse [2] [4] Grand Concourse at 149 St 138 St-Grand Concourse Grand Concourse at 138 St 3 Av-138 St [4] [6] Lincoln Av at 138 St [ad] This service change affects one or more ADA accessible stations. Please call 511 for help with planning your trip. If you are deaf or hard of hearing, use your preferred relay service provider or the free 711 relay.",
				alt_instructions: "[TP] [4] service operates in two sections: 1. Between 149 St-Grand Concourse and Woodlawn . 2. Between Crown Hts/New Lots Av and 125 St and via the [6] to/from 3 Av-138 St. [SB] Buses operate between 149 St-Grand Concourse and 3 Av-138 St , stopping at 138 St-Grand Concourse. Transfer between trains and [SB] buses at 149 St-Grand Concourse and/or 3 Av-138 St. Station Shuttle Bus Stop 149 St-Grand Concourse [2] [4] Grand Concourse at 149 St 138 St-Grand Concourse Grand Concourse at 138 St 3 Av-138 St [4] [6] Lincoln Av at 138 St",
				ad_message: "[ad] This service change affects one or more ADA accessible stations. Please call 511 for help with planning your trip. If you are deaf or hard of hearing, use your preferred relay service provider or the free 711 relay.",
			},
			{
				type: null,
				type_detail: [
				"delays",
				"rail_condition",
				"running_local"
				],
				time: null,
				durration: null,
				message: "Southbound [D] trains are stopping along the [C] line from 59 St-Columbus Circle to W 4 St-Wash Sq then along the [F] line to Coney Island-Stillwell Av.Southbound [A] trains are running local from 59 St-Columbus Circle to W 4 St-Wash Sq.Expect delays on [A] [C] [D] and [F] trains.These service changes are because of a rail condition at 59 St-Columbus Circle.",
				alt_instructions: null,
				ad_message: null,
				message_formula: "Southbound [D] trains are stopping along the [C] line from 59 St-Columbus Circle to W 4 St-Wash Sq then along the [F] line to Coney Island-Stillwell Av.Southbound [A] trains are running local from 59 St-Columbus Circle to W 4 St-Wash Sq.Expect delays on [A] [C] [D] and [F] trains.These service changes are because of a rail condition at 59 St-Columbus Circle."
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
/*
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