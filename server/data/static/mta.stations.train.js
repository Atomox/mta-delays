import union from 'lodash';


export const routes = {
	1: [
		// "Broadway - 7Av" -- "Bx", "Mn"
		'Bx293-101',  // "Van Cortlandt Park - 242 St"
		'Bx294-103',  // "238 St"
		'Bx295-104',  // "231 St"
		'Mn296-106',  // "Marble Hill - 225 St"
		'Mn297-107',  // "215 St"
		'Mn298-108',  // "207 St"
		'Mn299-109',  // "Dyckman St"
		'Mn300-110',  // "191 St"
		'Mn301-111',  // "181 St"
		'Mn605-112',  // "168 St - Washington Hts"
		'Mn303-113',  // "157 St"
		'Mn304-114',  // "145 St"
		'Mn305-115',  // "137 St - City College"
		'Mn306-116',  // "125 St"
		'Mn307-117',  // "116 St - Columbia University"
		'Mn308-118',  // "Cathedral Pkwy"
		'Mn309-119',  // "103 St"
		'Mn310-120',  // "96 St"
		'Mn311-121',  // "86 St"
		'Mn312-122',  // "79 St"
		'Mn313-123',  // "72 St"
		'Mn314-124',  // "66 St - Lincoln Center"
		'Mn614-125',  // "59 St - Columbus Circle"
		'Mn316-126',  // "50 St"
		'Mn611-127',  // "Times Sq - 42 St"
		'Mn318-128',  // "34 St - Penn Station"
		'Mn319-129',  // "28 St"
		'Mn320-130',  // "23 St"
		'Mn321-131',  // "18 St"
		'Mn601-132',  // "14 St"
		'Mn323-133',  // "Christopher St - Sheridan Sq"
		'Mn324-134',  // "Houston St"
		'Mn325-135',  // "Canal St"
		'Mn326-136',  // "Franklin St"
		'Mn327-137',  // "Chambers St"
		'Mn328-138',  // "Cortlandt St"
		'Mn329-139',  // "Rector St"
		'Mn635-142',  // "South Ferry"

	],
	2: [
		// "Lenox - White Plains Rd" -- Bx: "Bx",Mn: "Mn"
		'Bx416-201',  // "Wakefield - 241 St"
		'Bx417-204',  // "Nereid Av"
		'Bx418-205',  // "Lenox - White Plains Rd"
		'Bx419-206',  // "225 St"
		'Bx420-207',  // "219 St"
		'Bx421-208',  // "Gun Hill Rd"
		'Bx422-209',  // "Burke Av"
		'Bx423-210',  // "Allerton Av"
		'Bx424-211',  // "Pelham Pkwy"
		'Bx425-212',  // "Bronx Park East"
		'Bx426-213',  // "E 180 St"
		'Bx427-214',  // "West Farms Sq - E Tremont Av"
		'Bx428-215',  // "174 St"
		'Bx429-216',  // "Freeman St"
		'Bx430-217',  // "Simpson St"
		'Bx431-218',  // "Intervale Av"
		'Bx432-219',  // "Prospect Av"
		'Bx433-220',  // "Jackson Av"
		'Bx434-221',  // "3 Av - 149 St"
		'Bx603-222',  // "149 St - Grand Concourse"
		'Mn438-224',  // "135 St"
		'Mn439-225',  // "125 St"
		'Mn440-226',  // "116 St"
		'Mn441-227',  // "Central Park North (110 St)"

		// "Broadway - 7Av" -- "Bx", "Mn"
		'Mn310-120',  // "96 St"
		'Mn313-123',  // "72 St"
		'Mn611-127',  // "Times Sq - 42 St"
		'Mn318-128',  // "34 St - Penn Station"
		'Mn601-132',  // "14 St"
		'Mn327-137',  // "Chambers St"

		// "Clark St" -- "Mn" "Bk"
		'Mn624-228',  // "Park Pl"
		'Mn628-229',  // "Fulton St"
		'Mn333-230',  // "Wall St"
		'Bk334-231',  // "Clark St"
		'Bk620-232',  // "Borough Hall"

		// "Eastern Pky" -- "Bk"
		'Bk336-233',  // "Hoyt St"
		'Bk337-234',  // "Nevins St"
		'Bk617-235',  // "Atlantic Av - Barclays Ctr"
		'Bk339-236',  // "Bergen St"
		'Bk340-237',  // "Grand Army Plaza"
		'Bk341-238',  // "Eastern Pkwy - Brooklyn Museum"
		'Bk626-239',  // "Franklin Av"

		// "Nostrand" -- "Bk"
		'Bk353-241',  // "President St"
		'Bk354-242',  // "Sterling St"
		'Bk355-243',  // "Winthrop St"
		'Bk356-244',  // "Church Av"
		'Bk357-245',  // "Beverly Rd"
		'Bk358-246',  // "Newkirk Av"
		'Bk359-247',  // "Flatbush Av - Brooklyn College"
	],
	3: [

		// "Lenox - White Plains Rd" -- "Bx", "Mn"
		'Mn436-301',  // "Harlem - 148 St"
		'Mn437-302',  // "145 St"
		'Mn438-224',  // "135 St",
		'Mn439-225',  // "125 St"
		'Mn440-226',  // "116 St"
		'Mn441-227',  // "Central Park North (110 St)"

		// "Broadway - 7Av" -- "Bx", "Mn"
		'Mn310-120',  // "96 St"
		'Mn313-123',  // "72 St"
		'Mn611-127',  // "Times Sq - 42 St"
		'Mn318-128',  // "34 St - Penn Station"
		'Mn601-132',  // "14 St"
		'Mn327-137',  // "Chambers St"

		// "Clark St" -- "Mn" "Bk"
		'Mn624-228',  // "Park Pl"
		'Mn628-229',  // "Fulton St"
		'Mn333-230',  // "Wall St"
		'Bk334-231',  // "Clark St"
		'Bk620-232',  // "Borough Hall"

		// "Eastern Pky" -- "Bk"
		'Bk336-233',  // "Hoyt St"
		'Bk337-234',  // "Nevins St"
		'Bk617-235',  // "Atlantic Av - Barclays Ctr"
		'Bk339-236',  // "Bergen St"
		'Bk340-237',  // "Grand Army Plaza"
		'Bk341-238',  // "Eastern Pkwy - Brooklyn Museum"
		'Bk626-239',  // "Franklin Av"
		'Bk343-248',  // "Nostrand Av"
		'Bk344-249',  // "Kingston Av"
		'Bk345-250',  // "Crown Hts - Utica Av"
		'Bk346-251',  // "Sutter Av - Rutland Rd"
		'Bk347-252',  // "Saratoga Av"
		'Bk348-253',  // "Rockaway Av"
		'Bk349-254',  // "Junius St"
		'Bk350-255',  // "Pennsylvania Av"
		'Bk351-256',  // "Van Siclen Av"
		'Bk352-257',  // "New Lots Av"

	],
	4: [

		// "Jerome Av" -- "Bx"
		'Bx378-401',  // "Woodlawn"
		'Bx379-402',  // "Mosholu Pkwy"
		'Bx380-405',  // "Bedford Park Blvd - Lehman College"
		'Bx381-406',  // "Kingsbridge Rd"
		'Bx382-407',  // "Fordham Rd"
		'Bx383-408',  // "183 St"
		'Bx384-409',  // "Burnside Av"
		'Bx385-410',  // "176 St"
		'Bx386-411',  // "Mt Eden Av"
		'Bx387-412',  // "170 St"
		'Bx388-413',  // "167 St"
		'Bx604-414',  // "161 St - Yankee Stadium"
		'Bx603-415',  // "149 St - Grand Concourse"
		'Bx391-416',  // "138 St - Grand Concourse"

		// "Lexington - Shuttle" -- "Mn"
		'Mn392-621',  // "125 St"
		'Mn397-626',  // "86 St"
		'Mn613-629',  // "59 St"
		'Mn610-631',  // "Grand Central - 42 St"
		'Mn602-635',  // "14 St - Union Sq"
		'Mn622-640',  // "Brooklyn Bridge - City Hall"
		'Mn628-418',  // "Fulton St"
		'Mn413-419',  // "Wall St"
		'Mn414-420',  // "Bowling Green"
		'Bk620-232',  // "Borough Hall"

		// "Eastern Pky" -- "Bk"
		'Bk337-234',  // "Nevins St"
		'Bk617-235',  // "Atlantic Av - Barclays Ctr"
		'Bk626-239',  // "Franklin Av"
		'Bk345-250',  // "Crown Hts - Utica Av"

	],
	5: [
		// "Dyre Av" -- "Bx"
		'Bx442-501',  // "Eastchester - Dyre Av"
		'Bx443-502',  // "Baychester Av"
		'Bx444-503',  // "Gun Hill Rd"
		'Bx445-504',  // "Pelham Pkwy"
		'Bx446-505',  // "Morris Park"

		// "Lenox - White Plains Rd" -- "Bx", "Mn"
		'Bx417-204',  // "Nereid Av"
		'Bx418-205',  // "233 St"
		'Bx419-206',  // "225 St"
		'Bx420-207',  // "219 St"
		'Bx421-208',  // "Gun Hill Rd"
		'Bx422-209',  // "Burke Av"
		'Bx423-210',  // "Allerton Av"
		'Bx424-211',  // "Pelham Pkwy"
		'Bx425-212',  // "Bronx Park East"

		// "Lenox - White Plains Rd" -- "Bx", "Mn"
		'Bx426-213',  // "E 180 St"
		'Bx427-214',  // "West Farms Sq - E Tremont Av"
		'Bx428-215',  // "174 St"
		'Bx429-216',  // "Freeman St"
		'Bx430-217',  // "Simpson St"
		'Bx431-218',  // "Intervale Av"
		'Bx432-219',  // "Prospect Av"
		'Bx433-220',  // "Jackson Av"
		'Bx434-221',  // "3 Av - 149 St"
		'Bx603-222',  // "149 St - Grand Concourse"

		// "Jerome Av" -- "Bx"
		'Bx391-416',  // "138 St - Grand Concourse"

		// "Lexington - Shuttle" -- "Mn"
		'Mn392-621',  // "125 St"
		'Mn397-626',  // "86 St"
		'Mn613-629',  // "59 St"
		'Mn610-631',  // "Grand Central - 42 St"
		'Mn602-635',  // "14 St - Union Sq"
		'Mn622-640',  // "Brooklyn Bridge - City Hall"
		'Mn628-418',  // "Fulton St"
		'Mn413-419',  // "Wall St"
		'Mn414-420',  // "Bowling Green"

		// "Eastern Pky" -- "Bk"
		'Bk620-423',  // "Borough Hall"
		'Bk337-234',  // "Nevins St"
		'Bk617-235',  // "Atlantic Av - Barclays Ctr"
		'Bk626-239',  // "Franklin Av"

		// "Nostrand" -- "Bk"
		'Bk353-241',  // "President St"
		'Bk354-242',  // "Sterling St"
		'Bk355-243',  // "Winthrop St"
		'Bk356-244',  // "Church Av"
		'Bk357-245',  // "Beverly Rd"
		'Bk358-246',  // "Newkirk Av"
		'Bk359-247',  // "Flatbush Av - Brooklyn College"

	],
	6: [

		// "Pelham" -- "Bx"
		'Bx360-601',  // "Pelham Bay Park",
		'Bx361-602',  // "Buhre Av"
		'Bx362-603',  // "Middletown Rd"
		'Bx363-604',  // "Westchester Sq - E Tremont Av"
		'Bx364-606',  // "Zerega Av"
		'Bx365-607',  // "Castle Hill Av"
		'Bx366-608',  // "Parkchester"
		'Bx367-609',  // "St Lawrence Av"
		'Bx368-610',  // "Morrison Av- Sound View"
		'Bx369-611',  // "Elder Av"
		'Bx370-612',  // "Whitlock Av"
		'Bx371-613',  // "Hunts Point Av"
		'Bx372-614',  // "Longwood Av"
		'Bx373-615',  // "E 149 St"
		'Bx374-616',  // "E 143 St - St Mary's St"
		'Bx375-617',  // "Cypress Av"
		'Bx376-618',  // "Brook Av"
		'Bx377-619',  // "3 Av - 138 St"

		// "Lexington - Shuttle" -- "Mn"
		'Mn392-621',  // "125 St"
		'Mn393-622',  // "116 St"
		'Mn394-623',  // "110 St"
		'Mn395-624',  // "103 St"
		'Mn396-625',  // "96 St"
		'Mn397-626',  // "86 St"
		'Mn398-627',  // "77 St"
		'Mn399-628',  // "68 St - Hunter College"
		'Mn613-629',  // "59 St"
		'Mn612-630',  // "51 St"
		'Mn610-631',  // "Grand Central - 42 St"
		'Mn403-632',  // "33 St"
		'Mn404-633',  // "28 St"
		'Mn405-634',  // "23 St"
		'Mn602-635',  // "14 St - Union Sq"
		'Mn407-636',  // "Astor Pl"
		'Mn619-637',  // "Bleecker St"
		'Mn409-638',  // "Spring St"
		'Mn623-639',  // "Canal St"
		'Mn622-640',  // "Brooklyn Bridge - City Hall"

	],
	'6X': [
			// "Pelham" -- "Bx"
			'Bx360-601',  // "Pelham Bay Park",
			'Bx361-602',  // "Buhre Av"
			'Bx362-603',  // "Middletown Rd"
			'Bx363-604',  // "Westchester Sq - E Tremont Av"
			'Bx364-606',  // "Zerega Av"
			'Bx365-607',  // "Castle Hill Av"
			'Bx366-608',  // "Parkchester"
			// Express Skips Stations
			'Bx371-613',  // "Hunts Point Av"
			// Express Skips Stations
			'Bx377-619',  // "3 Av - 138 St"

			// "Lexington - Shuttle" -- "Mn"
			'Mn392-621',  // "125 St"
			'Mn393-622',  // "116 St"
			'Mn394-623',  // "110 St"
			'Mn395-624',  // "103 St"
			'Mn396-625',  // "96 St"
			'Mn397-626',  // "86 St"
			'Mn398-627',  // "77 St"
			'Mn399-628',  // "68 St - Hunter College"
			'Mn613-629',  // "59 St"
			'Mn612-630',  // "51 St"
			'Mn610-631',  // "Grand Central - 42 St"
			'Mn403-632',  // "33 St"
			'Mn404-633',  // "28 St"
			'Mn405-634',  // "23 St"
			'Mn602-635',  // "14 St - Union Sq"
			'Mn407-636',  // "Astor Pl"
			'Mn619-637',  // "Bleecker St"
			'Mn409-638',  // "Spring St"
			'Mn623-639',  // "Canal St"
			'Mn622-640',  // "Brooklyn Bridge - City Hall"		
	],
	'6D': [
			// "Pelham" -- "Bx"
			'Bx360-601',  // "Pelham Bay Park",
			'Bx361-602',  // "Buhre Av"
			'Bx362-603',  // "Middletown Rd"
			'Bx363-604',  // "Westchester Sq - E Tremont Av"
			'Bx364-606',  // "Zerega Av"
			'Bx365-607',  // "Castle Hill Av"
			'Bx366-608',  // "Parkchester"
			// Express Skips Stations
			'Bx371-613',  // "Hunts Point Av"
			// Express Skips Stations
			'Bx377-619',  // "3 Av - 138 St"

			// "Lexington - Shuttle" -- "Mn"
			'Mn392-621',  // "125 St"
			'Mn393-622',  // "116 St"
			'Mn394-623',  // "110 St"
			'Mn395-624',  // "103 St"
			'Mn396-625',  // "96 St"
			'Mn397-626',  // "86 St"
			'Mn398-627',  // "77 St"
			'Mn399-628',  // "68 St - Hunter College"
			'Mn613-629',  // "59 St"
			'Mn612-630',  // "51 St"
			'Mn610-631',  // "Grand Central - 42 St"
			'Mn403-632',  // "33 St"
			'Mn404-633',  // "28 St"
			'Mn405-634',  // "23 St"
			'Mn602-635',  // "14 St - Union Sq"
			'Mn407-636',  // "Astor Pl"
			'Mn619-637',  // "Bleecker St"
			'Mn409-638',  // "Spring St"
			'Mn623-639',  // "Canal St"
			'Mn622-640',  // "Brooklyn Bridge - City Hall"
	],
	'7X': [
		// "Flushing" -- "Qs", "Mn"
		'Qs447-701',  // "Flushing - Main St"
		'Qs448-702',  // "Mets - Willets Point"
		'Qs451-707',  // "Junction Blvd"
		'Qs456-712',  // "Woodside - 61 St"

		'Qs461-718',  // "Queensboro Plaza"
		'Qs606-719',  // "Court Sq"
		'Qs463-720',  // "Hunters Point Av"
		'Qs464-721',  // "Vernon Blvd - Jackson Av"
		'Mn610-723',  // "Grand Central - 42 St"
		'Mn609-724',  // "5 Av"
		'Mn611-725',  // "Times Sq - 42 St"
		'Mn471-726',  // "34 St - 11 Av"
	],
	'7D': [
		// "Flushing" -- "Qs", "Mn"
		'Qs447-701',  // "Flushing - Main St"
		'Qs448-702',  // "Mets - Willets Point"
		'Qs451-707',  // "Junction Blvd"
		'Qs456-712',  // "Woodside - 61 St"

		'Qs461-718',  // "Queensboro Plaza"
		'Qs606-719',  // "Court Sq"
		'Qs463-720',  // "Hunters Point Av"
		'Qs464-721',  // "Vernon Blvd - Jackson Av"
		'Mn610-723',  // "Grand Central - 42 St"
		'Mn609-724',  // "5 Av"
		'Mn611-725',  // "Times Sq - 42 St"
		'Mn471-726',  // "34 St - 11 Av"

	],
	7: [

		// "Flushing" -- "Qs", "Mn"
		'Qs447-701',  // "Flushing - Main St"
		'Qs448-702',  // "Mets - Willets Point"
		'Qs449-705',  // "111 St"
		'Qs450-706',  // "103 St - Corona Plaza"
		'Qs451-707',  // "Junction Blvd"
		'Qs452-708',  // "90 St - Elmhurst Av"
		'Qs453-709',  // "82 St - Jackson Hts"
		'Qs616-710',  // "74 St - Broadway"
		'Qs455-711',  // "69 St"
		'Qs456-712',  // "Woodside - 61 St"
		'Qs457-713',  // "52 St"
		'Qs458-714',  // "46 St"
		'Qs459-715',  // "40 St"
		'Qs460-716',  // "33 St"
		'Qs461-718',  // "Queensboro Plaza"
		'Qs606-719',  // "Court Sq"
		'Qs463-720',  // "Hunters Point Av"
		'Qs464-721',  // "Vernon Blvd - Jackson Av"
		'Mn610-723',  // "Grand Central - 42 St"
		'Mn609-724',  // "5 Av"
		'Mn611-725',  // "Times Sq - 42 St"
		'Mn471-726',  // "34 St - 11 Av"

	],
	A: [

		// "8th Av - Fulton St" -- "Mn", "Bk"
		'Mn143-A02',  // "Inwood - 207 St"
		'Mn144-A03',  // "Dyckman St"
		'Mn145-A05',  // "190 St"
		'Mn146-A06',  // "181 St"
		'Mn147-A07',  // "175 St"
		'Mn605-A09',  // "168 St"
		'Mn151-A12',  // "145 St"
		'Mn153-A15',  // "125 St"
		'Mn614-A24',  // "59 St - Columbus Circle"

		'Mn611-A27',  // "42 St - Port Authority Bus Terminal"
		'Mn164-A28',  // "34 St - Penn Station"
		'Mn618-A31',  // "14 St"
		'Mn167-A32',  // "W 4 St"
		'Mn169-A34',  // "Canal St"
		'Mn624-A36',  // "Chambers St"
		'Mn628-A38',  // "Fulton St"

		'Bk173-A40',  // "High St"
		'Bk636-A41',  // "Jay St - MetroTech"
		'Bk175-A42',  // "Hoyt - Schermerhorn Sts"
		'Bk179-A46',  // "Nostrand Av"
		'Bk181-A48',  // "Utica Av"
		'Bk621-A51',  // "Broadway Jct"
		'Bk188-A55',  // "Euclid Av"

		// "Liberty Av" -- "Qs"
		'Bk189-A57',  // "Grant Av"
		'Qs190-A59',  // "80 St"
		'Qs191-A60',  // "88 St"
		'Qs192-A61',  // "Rockaway Blvd"

		//
		// @TODO:
		//   How do we split lines?
		//

		// A: Liberty Ave Branch
		'Qs193-A63',  // "104 St"
		'Qs194-A64',  // "111 St"
		'Qs195-A65',  // "Ozone Park - Lefferts Blvd"

		// B: "Rockaway" -- "Qs"
		'Qs196-H01',  // "Aqueduct Racetrack"
		'Qs197-H02',  // "Aqueduct - N Conduit Av"
		'Qs198-H03',  // "Howard Beach - JFK Airport"
		'Qs199-H04',  // "Broad Channel"

		// A Shuttle
		'Qs200-H12',  // "Beach 90 St"
		'Qs201-H13',  // "Beach 98 St"
		'Qs202-H14',  // "Beach 105 St"
		'Qs203-H15',  // "Rockaway Park - Beach 116 St"

		// A (B Rockaway branch)
		'Qs204-H06',  // "Beach 67 St"
		'Qs205-H07',  // "Beach 60 St"
		'Qs206-H08',  // "Beach 44 St"
		'Qs207-H09',  // "Beach 36 St"
		'Qs208-H10',  // "Beach 25 St"
		'Qs209-H11',  // "Far Rockaway - Mott Av"

	],
	B: [

		// "Concourse" -- "Bx", "Mn"
		'Bx211-D03',  // "Bedford Park Blvd"
		'Bx212-D04',  // "Kingsbridge Rd"
		'Bx213-D05',  // "Fordham Rd"
		'Bx214-D06',  // "182-183 Sts"
		'Bx215-D07',  // "Tremont Av"
		'Bx216-D08',  // "174-175 Sts"
		'Bx217-D09',  // "170 St"
		'Bx218-D10',  // "167 St"
		'Bx604-D11',  // "161 St - Yankee Stadium"
		'Mn220-D12',  // "155 St"

		// "8th Av - Fulton St" -- "Mn", "Bk"
		'Mn151-A12',  // "145 St"
		'Mn152-A14',  // "135 St"
		'Mn153-A15',  // "125 St"
		'Mn154-A16',  // "116 St"
		'Mn155-A17',  // "Cathedral Pkwy (110 St)"
		'Mn156-A18',  // "103 St"
		'Mn157-A19',  // "96 St"
		'Mn158-A20',  // "86 St"
		'Mn159-A21',  // "81 St - Museum of Natural History"
		'Mn160-A22',  // "72 St"
		'Mn614-A24',  // "59 St - Columbus Circle"

		// "Queens - Archer" -- "Qs", "Mn"
		'Mn277-D14',  // "7 Av"

		// "6th Av - Culver" -- "Mn", "Bk"
		'Mn225-D15',  // "47-50 Sts - Rockefeller Ctr"
		'Mn609-D16',  // "42 St - Bryant Pk"
		'Mn607-D17',  // "34 St - Herald Sq"

		// "8th Av - Fulton St" -- "Mn", "Bk"
		'Mn167-A32',  // "W 4 St"

		// "6th Av - Culver" -- "Mn", "Bk"
		'Mn619-D21',  // "Broadway-Lafayette St"
		'Mn231-D22',  // "Grand St"

		// "Broadway - Brighton" -- "Mn", "Bk"
		'Bk26-R30',	 // "DeKalb Av"
		'Bk617-D24', // "Atlantic Av - Barclays Ctr"
		'Bk41-D25',	 // "7 Av"
		'Bk42-D26',	 // "Prospect Park"
		'Bk43-D27',	 // "Parkside Av"
		'Bk44-D28',	 // "Church Av"
		'Bk45-D29',	 // "Beverley Rd"
		'Bk46-D30',	 // "Cortelyou Rd"
		'Bk47-D31',	 // "Newkirk Plaza"
		'Bk48-D32',	 // "Avenue H"
		'Bk49-D33',	 // "Avenue J"
		'Bk50-D34',	 // "Avenue M"
		'Bk51-D35',	 // "Kings Hwy"
		'Bk52-D37',	 // "Avenue U"
		'Bk53-D38',	 // "Neck Rd"
		'Bk54-D39',	 // "Sheepshead Bay"
		'Bk55-D40',	 // "Brighton Beach"

	],
	C: [

		// "8th Av - Fulton St" -- "Mn", "Bk"
		'Mn605-A09',  // "168 St"
		'Mn149-A10',  // "163 St - Amsterdam Av"
		'Mn150-A11',  // "155 St"
		'Mn151-A12',  // "145 St"
		'Mn152-A14',  // "135 St"
		'Mn153-A15',  // "125 St"
		'Mn154-A16',  // "116 St"
		'Mn155-A17',  // "Cathedral Pkwy (110 St)"
		'Mn156-A18',  // "103 St"
		'Mn157-A19',  // "96 St"
		'Mn158-A20',  // "86 St"
		'Mn159-A21',  // "81 St - Museum of Natural History"
		'Mn160-A22',  // "72 St"
		'Mn614-A24',  // "59 St - Columbus Circle"
		'Mn162-A25',  // "50 St"
		'Mn611-A27',  // "42 St - Port Authority Bus Terminal"
		'Mn164-A28',  // "34 St - Penn Station"
		'Mn165-A30',  // "23 St"
		'Mn618-A31',  // "14 St"
		'Mn167-A32',  // "W 4 St"
		'Mn168-A33',  // "Spring St"
		'Mn169-A34',  // "Canal St"
		'Mn624-A36',  // "Chambers St"
		'Mn628-A38',  // "Fulton St"
		'Bk173-A40',  // "High St"
		'Bk636-A41',  // "Jay St - MetroTech"
		'Bk175-A42',  // "Hoyt - Schermerhorn Sts"
		'Bk176-A43',  // "Lafayette Av"
		'Bk177-A44',  // "Clinton - Washington Avs"
		'Bk627-A45',  // "Franklin Av"
		'Bk179-A46',  // "Nostrand Av"
		'Bk180-A47',  // "Kingston - Throop Avs"
		'Bk181-A48',  // "Utica Av"
		'Bk182-A49',  // "Ralph Av"
		'Bk183-A50',  // "Rockaway Av"
		'Bk621-A51',  // "Broadway Jct"
		'Bk185-A52',  // "Liberty Av"
		'Bk186-A53',  // "Van Siclen Av"
		'Bk187-A54',  // "Shepherd Av"
		'Bk188-A55',  // "Euclid Av"

	],
	D: [

		// "Concourse" -- "Bx", "Mn"
		'Bx210-D01',  // "Norwood - 205 St"
		'Bx211-D03',  // "Bedford Park Blvd"
		'Bx212-D04',  // "Kingsbridge Rd"
		'Bx213-D05',  // "Fordham Rd"
		'Bx214-D06',  // "182-183 Sts"
		'Bx215-D07',  // "Tremont Av"
		'Bx216-D08',  // "174-175 Sts"
		'Bx217-D09',  // "170 St"
		'Bx218-D10',  // "167 St"
		'Bx604-D11',  // "161 St - Yankee Stadium"
		'Mn220-D12',  // "155 St"

		// "8th Av - Fulton St" -- "Mn", "Bk"
		'Mn151-A12',  // "145 St"
		'Mn153-A15',  // "125 St"
		'Mn614-A24',  // "59 St - Columbus Circle"

		// "Queens - Archer" --  "Qs", "Mn"
		'Mn277-D14',  // "7 Av",

		// "6th Av - Culver" -- "Mn", "Bk"
		'Mn225-D15',  // "47-50 Sts - Rockefeller Ctr"
		'Mn609-D16',  // "42 St - Bryant Pk"
		'Mn607-D17',  // "34 St - Herald Sq"

		// "8th Av - Fulton St" -- "Mn", "Bk"
		'Mn167-A32',  // "W 4 St"

		// "6th Av - Culver" -- "Mn", "Bk"
		'Mn619-D21',  // "Broadway-Lafayette St"
		'Mn231-D22',  // "Grand St"

		// "4th Av" -- "Bk"
		'Bk617-R31',  // "Atlantic Av - Barclays Ctr"
		'Bk32-R36',  // "36 St"

		// "West End" -- "Bk"
		'Bk59-B12',  // "9 Av"
		'Bk60-B13',  // "Fort Hamilton Pkwy"
		'Bk61-B14',  // "50 St"
		'Bk62-B15',  // "55 St"
		'Bk615-B16',  // "62 St"
		'Bk64-B17',  // "71 St"
		'Bk65-B18',  // "79 St"
		'Bk66-B19',  // "18 Av"
		'Bk67-B20',  // "20 Av"
		'Bk68-B21',  // "Bay Pkwy"
		'Bk69-B22',  // "25 Av"
		'Bk70-B23',  // "Bay 50 St"

		// "Sea Beach / West End / Culver / Brighton" -- "Bk"
		'Bk58-D43',  // "Coney Island - Stillwell Av"

	],
	E: [

		// "Queens - Archer" -- "Qs", "Mn"
		'Qs278-G05',  // "Jamaica Center - Parsons/Archer"
		'Qs279-G06',  // "Sutphin Blvd - Archer Av - JFK Airport"
		'Qs280-G07',  // "Jamaica - Van Wyck"
		'Qs258-F05',  // "Briarwood - Van Wyck Blvd"
		'Qs259-F06',
		'Qs260-F07',
		'Qs261-G08', // "Forest Hills - 71 Av"
		'Qs616-G14', // "Jackson Hts - Roosevelt Av"
		'Qs273-G21',  // "Queens Plaza"
		'Qs606-F09',  // "Court Sq"
		'Mn612-F11',  // "Lexington Av/53 St"
		'Mn276-F12',  // "5 Av/53 St"
		'Mn277-D14',  // "7 Av"


		// "8th Av - Fulton St" -- "Mn",  "Bk"
		'Mn162-A25',  // "50 St"
		'Mn611-A27',  // "42 St - Port Authority Bus Terminal"
		'Mn164-A28',  // "34 St - Penn Station"
		'Mn165-A30',  // "23 St"
		'Mn618-A31',  // "14 St"
		'Mn167-A32',  // "W 4 St"
		'Mn168-A33',  // "Spring St"
		'Mn169-A34',  // "Canal St"
		'Mn624-E01',  // "World Trade Center"

	],
	F: [

		// "Queens - Archer" -- boro: "Q" / "M"
		'Qs254-F01', // "Jamaica - 179 St",
		'Qs255-F02',
		'Qs256-F03',
		'Qs257-F04', // "Sutphin Blvd"
		'Qs258-F05',
		'Qs259-F06',
		'Qs260-F07',
		'Qs261-G08', // "Forest Hills - 71 Av"
		'Qs616-G14', // "Jackson Hts - Roosevelt Av"

		// "63rd St" -- boro: "Q", "M"
		'Qs221-B04', // "21 St - Queensbridge"
		'Mn222-B06', // "Roosevelt Island"
		'Mn223-B08', // "Lexington Av/63 St"

		// "6th Av - Culver" -- boro: "M", "Bk"
		'Mn224-B10', // "57 St"
		'Mn225-D15', // "47-50 Sts - Rockefeller Ctr"
		'Mn609-D16', // "42 St - Bryant Pk"
		'Mn607-D17', // "34 St - Herald Sq"
		'Mn228-D18', // "6th Av - Culver"
		'Mn601-D19', // "14 St"

		// "8th Av - Fulton St" -- boro: "M", "Bk"
		'Mn167-A32', //  "W 4 St"

		// "6th Av - Culver" -- boro: "M", "Bk"
		'Mn619-D21', // "Broadway-Lafayette St"
		'Mn232-F14', // "2 Av"
		'Mn625-F15', // "Delancey St"
		'Mn234-F16', // "East Broadway"
		'Bk235-F18', // "York St"

		// "8th Av - Fulton St" -- boro: "M", "Bk"
		'Bk636-A41', // "Jay St - MetroTech"

		// "6th Av - Culver" -- boro: "M", "Bk"
		'Bk236-F20', // "Bergen St"
		'Bk237-F21', // "Carroll St"
		'Bk238-F22', // "Smith - 9 Sts"
		'Bk608-F23', // "4 Av"
		'Bk240-F24', // "6th Av - Culver"
		'Bk241-F25', // "15 St - Prospect Park"
		'Bk242-F26', // "Fort Hamilton Pkwy"
		'Bk243-F27', // "Church Av"
		'Bk244-F29', // "Ditmas Av"
		'Bk245-F30', // "18 Av"
		'Bk246-F31', // "Avenue I"
		'Bk247-F32', // "Bay Pkwy"
		'Bk248-F33', // "Avenue N"
		'Bk249-F34', // "Avenue P"
		'Bk250-F35', // "Kings Hwy"
		'Bk251-F36', // "Avenue U"
		'Bk252-F38', // "Avenue X",
		'Bk253-F39', // "Neptune Av",

		// "Broadway - Brighton" -- boro: "M", "Bk"
		'Bk57-D42', // "W 8 St - NY Aquarium"

		// "Sea Beach / West End / Culver / Brighton" -- boro: "Bk"
		'Bk58-D43', // "Coney Island - Stillwell Av"
	],
	G: [
		// "Crosstown" // "Qs", "Bk"
		'Qs606-G22',  // "Court Sq"
		'Qs282-G24',  // "21 St"
		'Bk283-G26',  // "Greenpoint Av"
		'Bk284-G28',  // "Nassau Av"
		'Bk629-G29',  // "Metropolitan Av"
		'Bk286-G30',  // "Broadway"
		'Bk287-G31',  // "Flushing Av"
		'Bk288-G32',  // "Myrtle - Willoughby Avs"
		'Bk289-G33',  // "Bedford - Nostrand Avs"
		'Bk290-G34',  // "Classon Av"
		'Bk291-G35',  // "Clinton - Washington Avs"
		'Bk292-G36',  // "Fulton St"

		// "8th Av - Fulton St" -- "Mn", "Bk"
		'Bk175-A42',  // "Hoyt - Schermerhorn Sts"

		// "6th Av - Culver" -- "Mn", "Bk"
		'Bk236-F20',  // "Bergen St"
		'Bk237-F21',  // "Carroll St"
		'Bk238-F22',  // "Smith - 9 Sts"
		'Bk608-F23',  // "4 Av"
		'Bk240-F24',  // "7 Av"
		'Bk241-F25',  // "15 St - Prospect Park"
		'Bk242-F26',  //  "Fort Hamilton Pkwy"

		// Not on spreadsheet.
		'Bk243-F27', // "Church Av"
	],
	J: [
		// "Queens - Archer" -- "Qs", "Mn"
		'Qs278-G05',  // "Jamaica Center - Parsons/Archer"
		'Qs279-G06',  // "Sutphin Blvd - Archer Av - JFK Airport"

		// "Jamaica" -- "Qs", "Bk", "Mn"
		'Qs80-J12',   // "121 St"
		'Qs81-J13',   // "111 St"
		'Qs82-J14',   // "104 St"
		'Qs83-J15',   // "Woodhaven Blvd"
		'Qs84-J16',   // "85 St - Forest Pkwy"
		'Qs85-J17',   // "75 St"
		'Bk86-J19',   // "Cypress Hills"
		'Bk87-J20',   // "Crescent St"
		'Bk88-J21',   // "Norwood Av"
		'Bk89-J22',   // "Cleveland St"
		'Bk90-J23',   // "Van Siclen Av"
		'Bk91-J24',   // "Alabama Av"
		'Bk621-J27',  // "Broadway Jct"
		'Bk93-J28',   // "Chauncey St"
		'Bk94-J29',   // "Halsey St"
		'Bk95-J30',   // "Gates Av"
		'Bk96-J31',   // "Kosciuszko St"
		'Bk97-M11',   // "Myrtle Av"
		'Bk98-M12',   // "Flushing Av"
		'Bk99-M13',   // "Lorimer St"
		'Bk100-M14',  // "Hewes St"
		'Bk101-M16',  // "Marcy Av"
		'Mn625-M18',  // "Essex St"
		'Mn103-M19',  // "Bowery"
		'Mn623-M20',  // "Canal St"
		'Mn622-M21',  // "Chambers St"
		'Mn628-M22',  // "Fulton St"
		'Mn107-M23',  // "Broad St"

	],
	L: [

		// "Canarsie" -- "Mn", "Bk", "Qs"
		'Mn618-L01',  // "8 Av"
		'Mn601-L02',  // "6 Av"
		'Mn602-L03',  // "Union Sq - 14 St"
		'Mn118-L05',  // "3 Av"
		'Mn119-L06',  // "1 Av"
		'Bk120-L08',  // "Bedford Av"
		'Bk629-L10',  // "Lorimer St"
		'Bk122-L11',  // "Graham Av"
		'Bk123-L12',  // "Grand St"
		'Bk124-L13',  // "Montrose Av"
		'Bk125-L14',  // "Morgan Av"
		'Bk126-L15',  // "Jefferson St"
		'Bk127-L16',  // "DeKalb Av"
		'Bk630-L17',  // "Myrtle - Wyckoff Avs"
		'Qs129-L19',  // "Halsey St"
		'Bk130-L20',  // "Wilson Av"
		'Bk131-L21',  // "Bushwick Av - Aberdeen St"
		'Bk621-L22',  // "Broadway Jct"
		'Bk133-L24',  // "Atlantic Av"
		'Bk134-L25',  // "Sutter Av"
		'Bk135-L26',  // "Livonia Av"
		'Bk136-L27',  // "New Lots Av"
		'Bk137-L28',  // "E 105 St"
		'Bk138-L29',  // "Canarsie - Rockaway Pkwy"

	],

	M: [
		// 'Queens - Archer': -- "Qs", "Mn"
		'Qs261-G08', // Forest Hills 71st Ave
		'Qs262-G09',
		'Qs263-G10',
		'Qs264-G11',
		'Qs265-G12',
		'Qs266-G13',
		'Qs616-G14', // Jackson Hts - Roosevelt Jackson
		'Qs268-G15',
		'Qs269-G16',
		'Qs270-G18',
		'Qs271-G19', // Steinway
		'Qs272-G20',
		'Qs273-G21', // Queens Plaza

		'Qs606-F09',  // "Court Sq"
		'Mn612-F11',  // "Lexington Av/53 St"
		'Mn276-F12',  // "5 Av/53 St"

		// "6th Av - Culver" -- "Mn", "Bk"
		'Mn225-D15',  // "47-50 Sts - Rockefeller Ctr"
		'Mn609-D16',  // "42 St - Bryant Pk"
		'Mn607-D17',  // "34 St - Herald Sq"
		'Mn228-D18',  // "23 St"
		'Mn601-D19',  // "14 St"

		// "8th Av - Fulton St" -- "Mn", "Bk"
		'Mn167-A32',  // "W 4 St"

		// "6th Av - Culver" -- "Mn", "Bk"
		'Mn619-D21',  // "Broadway-Lafayette St"

		// "Jamaica" -- "Qs", "Bk", "Mn"
		'Mn625-M18',  // "Essex St"

		'Bk101-M16',  // "Marcy Av"
		'Bk100-M14',  // "Hewes St"
		'Bk99-M13',   // "Lorimer St"
		'Bk98-M12',   // "Flushing Av"
		'Bk97-M11',   // "Myrtle Av"

		// "Myrtle Av" -- "Qs", "Bk"
		'Bk114-M10',  // "Central Av"
		'Bk113-M09',  // "Knickerbocker Av"
		'Bk630-M08',  // "Myrtle - Wyckoff Avs"
		'Qs111-M06',  // "Seneca Av"
		'Qs110-M05',  // "Forest Av"
		'Qs109-M04',  // "Fresh Pond Rd"
		'Qs108-M01',  // "Middle Village - Metropolitan Av"
	],
	N: [

		// "Astoria" -- "Qs", "Mn"
		'Qs1-R01',  // "Astoria - Ditmars Blvd"
		'Qs2-R03',  // "Astoria Blvd"
		'Qs3-R04',  // "30 Av"
		'Qs4-R05',  // "Broadway"
		'Qs5-R06',  // "36 Av"
		'Qs6-R08',  // "39 Av"

		// "Flushing" -- "Qs","Mn"
		'Qs461-718',  // "Queensboro Plaza"

		// "Astoria" -- "Qs", "Mn"
		'Mn613-R11',  // "Lexington Av/59 St"
		'Mn8-R13',  // "5 Av/59 St"

		// Broadway - Brighton
		'Mn9-R14',	 // 57th St
		'Mn10-R15',  // "49 St"
		'Mn611-R16', // Times Square
		'Mn607-R17', // 34th
		'Mn602-R20', // Union Square

		// Manhattan Bridge (Canal)
		'Mn623-R23', // Canal Street

		// "4th Av" -- "Bk"
		'Bk617-R31',  // "Atlantic Av - Barclays Ctr"
		'Bk32-R36',  // "36 St"
		'Bk35-R41',  // "59 St"

		// "Sea Beach" -- "Bk"
		'Bk71-N02',  // "8 Av"
		'Bk72-N03',  // "Fort Hamilton Pkwy"
		'Bk615-N04',  // "New Utrecht Av"
		'Bk74-N05',  // "18 Av"
		'Bk75-N06',  // "20 Av"
		'Bk76-N07',  // "Bay Pkwy"
		'Bk77-N08',  // "Kings Hwy"
		'Bk78-N09',  // "Avenue U"
		'Bk79-N10',  // "86 St"

		// "Sea Beach / West End / Culver / Brighton" -- "Bk"
		'Bk58-D43',  // "Coney Island - Stillwell Av"

	],
	Q: [
		// Second Ave
		'Mn475-Q05',
		'Mn476-Q04',
		'Mn477-Q03',

		// 63rd Lex
		'Mn223-B08',

		//Broadway - Brighton
		'Mn9-R14',	 // 57th St
		'Mn611-R16', // Times Square
		'Mn607-R17', // 34th
		'Mn602-R20', // Union Square

		// Manhattan Bridge (Canal)
		'Mn623-R23', // Canal Street

		// Broadway - Brighton
		'Bk26-R30', // DeKalb Av
		'Bk617-D24', // (Barklays)
		'Bk41-D25', // "7 Av"
		'Bk42-D26', // "Prospect Park"
		'Bk43-D27', // "Parkside Av"
		'Bk44-D28', // "Church Av"
		'Bk45-D29', // "Beverley Rd"
		'Bk46-D30', // "Cortelyou Rd"
		'Bk47-D31', // "Newkirk Plaza"
		'Bk48-D32', // "Avenue H"
		'Bk49-D33', // "Avenue J"
		'Bk50-D34', // "Avenue M"
		'Bk51-D35', // "Kings Hwy"
		'Bk52-D37', // "Avenue U"
		'Bk53-D38', // "Neck Rd"
		'Bk54-D39', // "Sheepshead Bay"
		'Bk55-D40', // "Brighton Beach"
		'Bk56-D41', // "Ocean Pkwy"
		'Bk57-D42', // "W 8 St - NY Aquarium"

		// Sea Beach / West End / Culver / Brighton (Cony Island)
		'Bk58-D43', // Cony Island
	],
	R: [
		// 'Queens - Archer':
		'Qs261-G08', // Forest Hills 71st Ave
		'Qs262-G09',
		'Qs263-G10',
		'Qs264-G11',
		'Qs265-G12',
		'Qs266-G13',
		'Qs616-G14', // Jackson Hts - Roosevelt Ave
		'Qs268-G15',
		'Qs269-G16',
		'Qs270-G18',
		'Qs271-G19', // Steinway St
		'Qs272-G20',
		'Qs273-G21', // Queens Plaza

		// 'Astoria':
		'Mn613-R11', // Lexington Av/59 St
		'Mn8-R13',

		// 'Broadway - Brighton':
		'Mn9-R14',
		'Mn10-R15',
		'Mn611-R16',
		'Mn607-R17',
		'Mn13-R18',
		'Mn14-R19',
		'Mn602-R20', 	// 14 St - Union Sq
		'Mn16-R21', 	// 8 St - NYU
		'Mn17-R22', 	// Prince St


		// 'Broadway':
		'Mn623-R23', 	// Canal St
		"Mn20-R24", 	// City Hall
		"Mn21-R25", 	// Cortlandt St
		"Mn22-R26",		// Rector St
		"Mn635-R27", 	// Whitehall St
		"Bk620-R28", 	// Court St
		"Bk636-R29", 	// Jay St - MetroTech

		//'Broadway - Brighton':
		'Bk26-R30', 	// DeKalb Av

		// '4th Av':
		'Bk617-235', 	// Atlantic Av - Barclays Ctr
		"Bk28-R32", 	// Union St
		"Bk608-R33", 	// 9 St
		"Bk30-R34", 	// Prospect Av
		"Bk31-R35", 	// 25 St
		"Bk32-R36", 	// 36 St
		"Bk33-R39", 	// 45 St
		"Bk34-R40", 	// 53 St
		"Bk35-R41", 	// 59 St
		"Bk36-R42", 	// Bay Ridge Av
		"Bk37-R43", 	// 77 St
		"Bk38-R44", 	// 86 St
		"Bk39-R45", 	// Bay Ridge - 95 St
	],
	W: [

		// "Astoria" -- "Qs", "Mn"
		'Qs1-R01',  // "Astoria - Ditmars Blvd"
		'Qs2-R03',  // "Astoria Blvd"
		'Qs3-R04',  // "30 Av"
		'Qs4-R05',  // "Broadway"
		'Qs5-R06',  // "36 Av"
		'Qs6-R08',  // "39 Av"

		// "Flushing" -- "Qs","Mn"
		'Qs461-718',  // "Queensboro Plaza"

		// "Astoria" -- "Qs", "Mn"
		'Mn613-R11',  // "Lexington Av/59 St"
		'Mn8-R13',  // "5 Av/59 St"

		// 'Broadway - Brighton':
		'Mn9-R14',
		'Mn10-R15',
		'Mn611-R16',
		'Mn607-R17',
		'Mn13-R18',
		'Mn14-R19',
		'Mn602-R20', 	// 14 St - Union Sq
		'Mn16-R21', 	// 8 St - NYU
		'Mn17-R22', 	// Prince St

		// 'Broadway':
		'Mn623-R23', 	// Canal St
		"Mn20-R24", 	// City Hall
		"Mn21-R25", 	// Cortlandt St
		"Mn22-R26",		// Rector St
		"Mn635-R27", 	// Whitehall St
	],
	Z: [
		// "Queens - Archer" -- "Qs", "Mn"
		'Qs278-G05',  // "Jamaica Center - Parsons/Archer"
		'Qs279-G06',  // "Sutphin Blvd - Archer Av - JFK Airport"

		// "Jamaica" -- "Qs", "Bk", "Mn"
		'Qs80-J12',   // "121 St"
		'Qs82-J14',   // "104 St"
		'Qs83-J15',   // "Woodhaven Blvd"
		'Qs85-J17',   // "75 St"
		'Bk87-J20',   // "Crescent St"
		'Bk88-J21',   // "Norwood Av"
		'Bk90-J23',   // "Van Siclen Av"
		'Bk91-J24',   // "Alabama Av"
		'Bk621-J27',  // "Broadway Jct"
		'Bk93-J28',   // "Chauncey St"
		'Bk95-J30',   // "Gates Av"
		'Bk97-M11',   // "Myrtle Av"
		'Bk101-M16',  // "Marcy Av"
		'Mn625-M18',  // "Essex St"
		'Mn103-M19',  // "Bowery"
		'Mn623-M20',  // "Canal St"
		'Mn622-M21',  // "Chambers St"
		'Mn628-M22',  // "Fulton St"
		'Mn107-M23',  // "Broad St"

	],
	GS: [
		// "Lexington - Shuttle" -- "Mn"
		'Mn611-902',  // "Times Sq - 42 St"
		'Mn610-901',  // "Grand Central - 42 St"
	],
	H: [
		// "Rockaway" -- "Qs"
		'Qs199-H04',  // "Broad Channel"
		'Qs200-H12',  // "Beach 90 St"
		'Qs201-H13',  // "Beach 98 St"
		'Qs202-H14',  // "Beach 105 St"
		'Qs203-H15',  // "Rockaway Park - Beach 116 St"
	],
	FS: [
		// "Franklin Shuttle" -- "Bk"
		'Bk627-S01',  // "Franklin Av"
		'Bk141-S03',  // "Park Pl"
		'Bk626-S04',  // "Botanic Garden"
	],
	S: [
		// "Lexington - Shuttle" -- "Mn"
		'Mn611-902',  // "Times Sq - 42 St"
		'Mn610-901',  // "Grand Central - 42 St"

		// "Rockaway" -- "Qs"
		'Qs199-H04',  // "Broad Channel"
		'Qs200-H12',  // "Beach 90 St"
		'Qs201-H13',  // "Beach 98 St"
		'Qs202-H14',  // "Beach 105 St"
		'Qs203-H15',  // "Rockaway Park - Beach 116 St"

		// "Franklin Shuttle" -- "Bk"
		'Bk627-S01',  // "Franklin Av"
		'Bk141-S03',  // "Park Pl"
		'Bk626-S04',  // "Botanic Garden"
	],
	SIR: [
		'SI501-S31', // "St George"
		'SI502-S30', // "Tompkinsville"
		'SI503-S29', // "Stapleton"
		'SI504-S28', // "Clifton"
		'SI505-S27', // "Grasmere"
		'SI506-S26', // "Old Town"
		'SI507-S25', // "Dongan Hills"
		'SI508-S24', // "Jefferson Av"
		'SI509-S23', // "Grant City"
		'SI510-S22', // "New Dorp"
		'SI511-S21', // "Oakwood Heights"
		'SI512-S20', // "Bay Terrace"
		'SI513-S19', // "Great Kills"
		'SI514-S18', // "Eltingville"
		'SI515-S17', // "Annadale"
		'SI516-S16', // "Huguenot"
		'SI517-S15', // "Prince's Bay"
		'SI518-S14', // "Pleasant Plains"
		'SI519-S13', // "Richmond Valley"
		'SI523-S11', // "Arthur Kill", Replaces Nasseau & Atlantic
		'SI522-S09', // "Tottenville"
	],
	SI: [
		'SI501-S31', // "St George"
		'SI502-S30', // "Tompkinsville"
		'SI503-S29', // "Stapleton"
		'SI504-S28', // "Clifton"
		'SI505-S27', // "Grasmere"
		'SI506-S26', // "Old Town"
		'SI507-S25', // "Dongan Hills"
		'SI508-S24', // "Jefferson Av"
		'SI509-S23', // "Grant City"
		'SI510-S22', // "New Dorp"
		'SI511-S21', // "Oakwood Heights"
		'SI512-S20', // "Bay Terrace"
		'SI513-S19', // "Great Kills"
		'SI514-S18', // "Eltingville"
		'SI515-S17', // "Annadale"
		'SI516-S16', // "Huguenot"
		'SI517-S15', // "Prince's Bay"
		'SI518-S14', // "Pleasant Plains"
		'SI519-S13', // "Richmond Valley"
		'SI523-S11', // "Arthur Kill", Replaces Nasseau & Atlantic
		'SI522-S09', // "Tottenville"
	],
};

export const express_routes = {
	'6-EXP': routes['6D'],
	'6X': routes['6D'],
	'7-EXP': routes['7D']
};

export const local_routes = {
	'2-LCL': union(routes[2], [
		// "Broadway - 7Av" -- "Bx", "Mn"
		'Mn311-121',  // "86 St"
		'Mn312-122',  // "79 St"
		//'Mn313-123',  // "72 St"
		'Mn314-124',  // "66 St - Lincoln Center"
		'Mn614-125',  // "59 St - Columbus Circle"
		'Mn316-126',  // "50 St"
		//'Mn611-127',  // "Times Sq - 42 St"
		//'Mn318-128',  // "34 St - Penn Station"
		'Mn319-129',  // "28 St"
		'Mn320-130',  // "23 St"
		'Mn321-131',  // "18 St"
		//'Mn601-132',  // "14 St"
		'Mn323-133',  // "Christopher St - Sheridan Sq"
		'Mn324-134',  // "Houston St"
		'Mn325-135',  // "Canal St"
		'Mn326-136',  // "Franklin St"
		//'Mn327-137',  // "Chambers St"
	]),
	'3-LCL': union(routes[3], [
		// "Broadway - 7Av" -- "Bx", "Mn"
		'Mn311-121',  // "86 St"
		'Mn312-122',  // "79 St"
		//'Mn313-123',  // "72 St"
		'Mn314-124',  // "66 St - Lincoln Center"
		'Mn614-125',  // "59 St - Columbus Circle"
		'Mn316-126',  // "50 St"
		//'Mn611-127',  // "Times Sq - 42 St"
		//'Mn318-128',  // "34 St - Penn Station"
		'Mn319-129',  // "28 St"
		'Mn320-130',  // "23 St"
		'Mn321-131',  // "18 St"
		//'Mn601-132',  // "14 St"
		'Mn323-133',  // "Christopher St - Sheridan Sq"
		'Mn324-134',  // "Houston St"
		'Mn325-135',  // "Canal St"
		'Mn326-136',  // "Franklin St"
		//'Mn327-137',  // "Chambers St"
	]),
	'4-LCL': [
		// "Jerome Av" -- "Bx"
		'Bx378-401',  // "Woodlawn"
		'Bx379-402',  // "Mosholu Pkwy"
		'Bx380-405',  // "Bedford Park Blvd - Lehman College"
		'Bx381-406',  // "Kingsbridge Rd"
		'Bx382-407',  // "Fordham Rd"
		'Bx383-408',  // "183 St"
		'Bx384-409',  // "Burnside Av"
		'Bx385-410',  // "176 St"
		'Bx386-411',  // "Mt Eden Av"
		'Bx387-412',  // "170 St"
		'Bx388-413',  // "167 St"
		'Bx604-414',  // "161 St - Yankee Stadium"
		'Bx603-415',  // "149 St - Grand Concourse"
		'Bx391-416',  // "138 St - Grand Concourse"

		// "Lexington - Shuttle" -- "Mn"
		'Mn392-621',  // "125 St"
		'Mn393-622',  // "116 St"
		'Mn394-623',  // "110 St"
		'Mn395-624',  // "103 St"
		'Mn396-625',  // "96 St"
		'Mn397-626',  // "86 St"
		'Mn398-627',  // "77 St"
		'Mn399-628',  // "68 St - Hunter College"
		'Mn613-629',  // "59 St"
		'Mn612-630',  // "51 St"
		'Mn610-631',  // "Grand Central - 42 St"
		'Mn403-632',  // "33 St"
		'Mn404-633',  // "28 St"
		'Mn405-634',  // "23 St"
		'Mn602-635',  // "14 St - Union Sq"
		'Mn407-636',  // "Astor Pl"
		'Mn619-637',  // "Bleecker St"
		'Mn409-638',  // "Spring St"
		'Mn623-639',  // "Canal St"
		'Mn622-640',  // "Brooklyn Bridge - City Hall"

		// "Eastern Pky" -- "Bk"
		'Bk336-233',  // "Hoyt St"
		'Bk337-234',  // "Nevins St"
		'Bk617-235',  // "Atlantic Av - Barclays Ctr"
		'Bk339-236',  // "Bergen St"
		'Bk340-237',  // "Grand Army Plaza"
		'Bk341-238',  // "Eastern Pkwy - Brooklyn Museum"
		'Bk626-239',  // "Franklin Av"
		'Bk343-248',  // "Nostrand Av"
		'Bk344-249',  // "Kingston Av"
		'Bk345-250',  // "Crown Hts - Utica Av"
		'Bk346-251',  // "Sutter Av - Rutland Rd"
		'Bk347-252',  // "Saratoga Av"
		'Bk348-253',  // "Rockaway Av"
		'Bk349-254',  // "Junius St"
		'Bk350-255',  // "Pennsylvania Av"
		'Bk351-256',  // "Van Siclen Av"
		'Bk352-257',  // "New Lots Av"
	],
	'5-LCL': [
		// "Dyre Av" -- "Bx"
		'Bx442-501',  // "Eastchester - Dyre Av"
		'Bx443-502',  // "Baychester Av"
		'Bx444-503',  // "Gun Hill Rd"
		'Bx445-504',  // "Pelham Pkwy"
		'Bx446-505',  // "Morris Park"

		// "Lenox - White Plains Rd" -- "Bx", "Mn"
		'Bx417-204',  // "Nereid Av"
		'Bx418-205',  // "233 St"
		'Bx419-206',  // "225 St"
		'Bx420-207',  // "219 St"
		'Bx421-208',  // "Gun Hill Rd"
		'Bx422-209',  // "Burke Av"
		'Bx423-210',  // "Allerton Av"
		'Bx424-211',  // "Pelham Pkwy"
		'Bx425-212',  // "Bronx Park East"

		// "Lenox - White Plains Rd" -- "Bx", "Mn"
		'Bx426-213',  // "E 180 St"
		'Bx427-214',  // "West Farms Sq - E Tremont Av"
		'Bx428-215',  // "174 St"
		'Bx429-216',  // "Freeman St"
		'Bx430-217',  // "Simpson St"
		'Bx431-218',  // "Intervale Av"
		'Bx432-219',  // "Prospect Av"
		'Bx433-220',  // "Jackson Av"
		'Bx434-221',  // "3 Av - 149 St"
		'Bx603-222',  // "149 St - Grand Concourse"

		// "Jerome Av" -- "Bx"
		'Bx391-416',  // "138 St - Grand Concourse"

		// "Lexington - Shuttle" -- "Mn"
		'Mn392-621',  // "125 St"
		'Mn393-622',  // "116 St"
		'Mn394-623',  // "110 St"
		'Mn395-624',  // "103 St"
		'Mn396-625',  // "96 St"
		'Mn397-626',  // "86 St"
		'Mn398-627',  // "77 St"
		'Mn399-628',  // "68 St - Hunter College"
		'Mn613-629',  // "59 St"
		'Mn612-630',  // "51 St"
		'Mn610-631',  // "Grand Central - 42 St"
		'Mn403-632',  // "33 St"
		'Mn404-633',  // "28 St"
		'Mn405-634',  // "23 St"
		'Mn602-635',  // "14 St - Union Sq"
		'Mn407-636',  // "Astor Pl"
		'Mn619-637',  // "Bleecker St"
		'Mn409-638',  // "Spring St"
		'Mn623-639',  // "Canal St"
		'Mn622-640',  // "Brooklyn Bridge - City Hall"

		// "Nostrand" -- "Bk"
		'Bk353-241',  // "President St"
		'Bk354-242',  // "Sterling St"
		'Bk355-243',  // "Winthrop St"
		'Bk356-244',  // "Church Av"
		'Bk357-245',  // "Beverly Rd"
		'Bk358-246',  // "Newkirk Av"
		'Bk359-247',  // "Flatbush Av - Brooklyn College"
	],
	'6D-LCL': routes[6],
	'7D-LCL': routes[7],
	'A-LCL': union(routes['C'], routes['A']),
	'B-LCL': union(routes['B'], [

		'Mn228-D18', // "6th Av - Culver"
		'Mn601-D19', // "14 St"

		// Broadway - Brighton
		'Bk26-R30', // DeKalb Av
		'Bk617-D24', // (Barklays)
		'Bk41-D25', // "7 Av"
		'Bk42-D26', // "Prospect Park"
		'Bk43-D27', // "Parkside Av"
		'Bk44-D28', // "Church Av"
		'Bk45-D29', // "Beverley Rd"
		'Bk46-D30', // "Cortelyou Rd"
		'Bk47-D31', // "Newkirk Plaza"
		'Bk48-D32', // "Avenue H"
		'Bk49-D33', // "Avenue J"
		'Bk50-D34', // "Avenue M"
		'Bk51-D35', // "Kings Hwy"
		'Bk52-D37', // "Avenue U"
		'Bk53-D38', // "Neck Rd"
		'Bk54-D39', // "Sheepshead Bay"
		'Bk55-D40', // "Brighton Beach"
	]),
	'D-LCL': union(routes['D'], [
		//'Broadway - Brighton':
		'Bk26-R30', 	// DeKalb Av

		// '4th Av':
		'Bk617-235', 	// Atlantic Av - Barclays Ctr
		"Bk28-R32", 	// Union St
		"Bk608-R33", 	// 9 St
		"Bk30-R34", 	// Prospect Av
		"Bk31-R35", 	// 25 St
		"Bk32-R36", 	// 36 St
	]),

	/**
	 * @TODO
	 *   We should merge these in order.
	 */
	'E-LCL': union(routes['E'], [
		'Qs258-F05',
		'Qs260-F07',

		// 'Queens - Archer': -- "Qs", "Mn"
		'Qs261-G08', // Forest Hills 71st Ave
		'Qs262-G09',
		'Qs263-G10',
		'Qs264-G11',
		'Qs265-G12',
		'Qs266-G13',
		'Qs616-G14', // Jackson Hts - Roosevelt Jackson
		'Qs268-G15',
		'Qs269-G16',
		'Qs270-G18',
		'Qs271-G19', // Steinway
		'Qs272-G20',
		'Qs273-G21', // Queens Plaza
	]),
	'F-LCL': union(routes['F'], [
		// 'Queens - Archer': -- "Qs", "Mn"
		'Qs261-G08', // Forest Hills 71st Ave
		'Qs262-G09',
		'Qs263-G10',
		'Qs264-G11',
		'Qs265-G12',
		'Qs266-G13',
		'Qs616-G14', // Jackson Hts - Roosevelt Jackson
		'Qs268-G15',
		'Qs269-G16',
		'Qs270-G18',
		'Qs271-G19', // Steinway
		'Qs272-G20',
	]),
	'N-LCL': union(routes['N'] ,[
		// Queens Stations...

		// 'Broadway - Brighton':
		'Mn9-R14',
		'Mn10-R15',
		'Mn611-R16',
		'Mn607-R17',
		'Mn13-R18',
		'Mn14-R19',
		'Mn602-R20', 	// 14 St - Union Sq
		'Mn16-R21', 	// 8 St - NYU
		'Mn17-R22', 	// Prince St

		// Canal...

		// 'Broadway - Brighton':
		'Bk26-R30', 	// DeKalb Av

		// '4th Av':
		'Bk617-235', 	// Atlantic Av - Barclays Ctr
		"Bk28-R32", 	// Union St
		"Bk608-R33", 	// 9 St
		"Bk30-R34", 	// Prospect Av
		"Bk31-R35", 	// 25 St
		"Bk32-R36", 	// 36 St

		"Bk33-R39", 	// 45 St
		"Bk34-R40", 	// 53 St
		"Bk35-R41", 	// 59 St

		// N branch in Brooklyn...
	]),
	'Q-LCL': union(routes['Q'], [
		// 'Broadway - Brighton':
		'Mn9-R14',
		'Mn10-R15',
		'Mn611-R16',
		'Mn607-R17',
		'Mn13-R18',
		'Mn14-R19',
		'Mn602-R20', 	// 14 St - Union Sq
		'Mn16-R21', 	// 8 St - NYU
		'Mn17-R22', 	// Prince St

		// Manhattan Bridge (Canal)
		'Mn623-R23', // Canal Street
	]),
	'Z-LCL': routes['J'],
};

export const night_routes = {
	'2-LN': local_routes['2-LCL'],
	'3-LN': [
		// "Lenox - White Plains Rd" -- "Bx", "Mn"
		'Mn436-301',  // "Harlem - 148 St"
		'Mn437-302',  // "145 St"
		'Mn438-224',  // "135 St",
		'Mn439-225',  // "125 St"
		'Mn440-226',  // "116 St"
		'Mn441-227',  // "Central Park North (110 St)"

		// "Broadway - 7Av" -- "Bx", "Mn"
		'Mn310-120',  // "96 St"
		'Mn313-123',  // "72 St"
		'Mn611-127',  // "Times Sq - 42 St"
	],
	// 4 -- Late Night
	'4-LN': local_routes['4-LCL'],
	'5-LN': [
		// "Dyre Av" -- "Bx"
		'Bx442-501',  // "Eastchester - Dyre Av"
		'Bx443-502',  // "Baychester Av"
		'Bx444-503',  // "Gun Hill Rd"
		'Bx445-504',  // "Pelham Pkwy"
		'Bx446-505',  // "Morris Park"

		// "Lenox - White Plains Rd" -- "Bx", "Mn"
		'Bx417-204',  // "Nereid Av"
		'Bx418-205',  // "233 St"
		'Bx419-206',  // "225 St"
		'Bx420-207',  // "219 St"
		'Bx421-208',  // "Gun Hill Rd"
		'Bx422-209',  // "Burke Av"
		'Bx423-210',  // "Allerton Av"
		'Bx424-211',  // "Pelham Pkwy"
		'Bx425-212',  // "Bronx Park East"

		// "Lenox - White Plains Rd" -- "Bx", "Mn"
		'Bx426-213',  // "E 180 St"
	],
	'B-LN': [
		// No Service
	],
	'D-LN': local_routes['D-LCL'],
	'E-LN': local_routes['E-LCL'],
	'M-LN': [
		// "Jamaica" -- "Qs", "Bk", "Mn"
		'Mn625-M18',  // "Essex St"

		'Bk101-M16',  // "Marcy Av"
		'Bk100-M14',  // "Hewes St"
		'Bk99-M13',   // "Lorimer St"
		'Bk98-M12',   // "Flushing Av"
		'Bk97-M11',   // "Myrtle Av"

		// "Myrtle Av" -- "Qs", "Bk"
		'Bk114-M10',  // "Central Av"
		'Bk113-M09',  // "Knickerbocker Av"
		'Bk630-M08',  // "Myrtle - Wyckoff Avs"
		'Qs111-M06',  // "Seneca Av"
		'Qs110-M05',  // "Forest Av"
		'Qs109-M04',  // "Fresh Pond Rd"
		'Qs108-M01',  // "Middle Village - Metropolitan Av"
	],
	'Q-LN': local_routes['Q-LCL'],
	'S-LN': [
		// No Service
	],
};

export const alternate_routes = {
	2: [
		// Along 1, downtown
		'Mn328-138',  // "Cortlandt St"
		'Mn329-139',  // "Rector St"
		'Mn635-142',  // "South Ferry"
	],
	3: [
		// Along 1, downtown
		'Mn328-138',  // "Cortlandt St"
		'Mn329-139',  // "Rector St"
		'Mn635-142',  // "South Ferry"
	],
	D: [
		// Common Station for local on weekends.
		'Bk26-R30', 	// DeKalb Av
	],
	M: [
		// Via J
		'Qs80-J12',   // "121 St"
		'Qs81-J13',   // "111 St"
		'Qs82-J14',   // "104 St"
		'Qs83-J15',   // "Woodhaven Blvd"
		'Qs84-J16',   // "85 St - Forest Pkwy"
		'Qs85-J17',   // "75 St"
		'Bk86-J19',   // "Cypress Hills"
		'Bk87-J20',   // "Crescent St"
		'Bk88-J21',   // "Norwood Av"
		'Bk89-J22',   // "Cleveland St"
		'Bk90-J23',   // "Van Siclen Av"
		'Bk91-J24',   // "Alabama Av"
		'Bk621-J27',  // "Broadway Jct"
		'Bk93-J28',   // "Chauncey St"
		'Bk94-J29',   // "Halsey St"
		'Bk95-J30',   // "Gates Av"
		'Bk96-J31',   // "Kosciuszko St"
	],
	N: [
		// Common Station for local on weekends.
		'Bk26-R30', 	// DeKalb Av
	],
	R: [
		// "Queens - Archer" -- boro: "Q" / "M"
		'Qs254-F01', // "Jamaica - 179 St",
		'Qs255-F02',
		'Qs256-F03',
		'Qs257-F04', // "Sutphin Blvd"
		'Qs258-F05',
		'Qs259-F06',
		'Qs260-F07',
	],
};

export const weekend_routes = {
	'5-WKND': [
		// "Dyre Av" -- "Bx"
		'Bx442-501',  // "Eastchester - Dyre Av"
		'Bx443-502',  // "Baychester Av"
		'Bx444-503',  // "Gun Hill Rd"
		'Bx445-504',  // "Pelham Pkwy"
		'Bx446-505',  // "Morris Park"

		// "Lenox - White Plains Rd" -- "Bx", "Mn"
		'Bx417-204',  // "Nereid Av"
		'Bx418-205',  // "233 St"
		'Bx419-206',  // "225 St"
		'Bx420-207',  // "219 St"
		'Bx421-208',  // "Gun Hill Rd"
		'Bx422-209',  // "Burke Av"
		'Bx423-210',  // "Allerton Av"
		'Bx424-211',  // "Pelham Pkwy"
		'Bx425-212',  // "Bronx Park East"

		// "Lenox - White Plains Rd" -- "Bx", "Mn"
		'Bx426-213',  // "E 180 St"
		'Bx427-214',  // "West Farms Sq - E Tremont Av"
		'Bx428-215',  // "174 St"
		'Bx429-216',  // "Freeman St"
		'Bx430-217',  // "Simpson St"
		'Bx431-218',  // "Intervale Av"
		'Bx432-219',  // "Prospect Av"
		'Bx433-220',  // "Jackson Av"
		'Bx434-221',  // "3 Av - 149 St"
		'Bx603-222',  // "149 St - Grand Concourse"

		// "Jerome Av" -- "Bx"
		'Bx391-416',  // "138 St - Grand Concourse"

		// "Lexington - Shuttle" -- "Mn"
		'Mn392-621',  // "125 St"
		'Mn397-626',  // "86 St"
		'Mn613-629',  // "59 St"
		'Mn610-631',  // "Grand Central - 42 St"
		'Mn602-635',  // "14 St - Union Sq"
		'Mn622-640',  // "Brooklyn Bridge - City Hall"
		'Mn628-418',  // "Fulton St"
		'Mn413-419',  // "Wall St"
		'Mn414-420',  // "Bowling Green"
	],
	'A-WKND': local_routes['A-LCL'],
	'B-WKND': [
		// NO WEEKEND SERVICE.
	],
	'M-WKND': night_routes['M-LN'],
	'N-WKND': [
		// "Astoria" -- "Qs", "Mn"
		'Qs1-R01',  // "Astoria - Ditmars Blvd"
		'Qs2-R03',  // "Astoria Blvd"
		'Qs3-R04',  // "30 Av"
		'Qs4-R05',  // "Broadway"
		'Qs5-R06',  // "36 Av"
		'Qs6-R08',  // "39 Av"

		// "Flushing" -- "Qs","Mn"
		'Qs461-718',  // "Queensboro Plaza"

		// "Astoria" -- "Qs", "Mn"
		'Mn613-R11',  // "Lexington Av/59 St"
		'Mn8-R13',  // "5 Av/59 St"

		// 'Broadway - Brighton':
		'Mn9-R14',
		'Mn10-R15',
		'Mn611-R16',
		'Mn607-R17',
		'Mn13-R18',
		'Mn14-R19',
		'Mn602-R20', 	// 14 St - Union Sq
		'Mn16-R21', 	// 8 St - NYU
		'Mn17-R22', 	// Prince St

		// Manhattan Bridge (Canal)
		'Mn623-R23', // Canal Street

		// "4th Av" -- "Bk"
		'Bk617-R31',  // "Atlantic Av - Barclays Ctr"
		'Bk32-R36',  // "36 St"
		'Bk35-R41',  // "59 St"

		// "Sea Beach" -- "Bk"
		'Bk71-N02',  // "8 Av"
		'Bk72-N03',  // "Fort Hamilton Pkwy"
		'Bk615-N04',  // "New Utrecht Av"
		'Bk74-N05',  // "18 Av"
		'Bk75-N06',  // "20 Av"
		'Bk76-N07',  // "Bay Pkwy"
		'Bk77-N08',  // "Kings Hwy"
		'Bk78-N09',  // "Avenue U"
		'Bk79-N10',  // "86 St"

		// "Sea Beach / West End / Culver / Brighton" -- "Bk"
		'Bk58-D43',  // "Coney Island - Stillwell Av"
	],
	'W-WKND': [
		// No Weekend Service
	],
};


export default {
	routes,
	express_routes,
	local_routes,
	night_routes,
	weekend_routes,
	alternate_routes
};


/**
[
	{id: 261,	cpx: 261,	gtfs: "G08",	origin: "ind",	branch: "Qns Archer",			name: "Forest Hills - 71 Av", 			boro: "Q", lines: ['E','F','M', 'R'], switch: [['E', 'F']: ['M', 'R'],['M','R']: 'eol'],},
	{id: 262,	cpx: 262,	gtfs: "G09",	origin: "ind",	branch: "Qns Archer",			name: "67 Av", 							boro: "Q", lines: ['E','F','M', 'R'], switch: [['E', 'F']: ['M', 'R'],['M','R']: 'eol'],}
	{id: 263,	cpx: 263,	gtfs: "G10",	origin: "ind",	branch: "Qns Archer",			name: "63 Dr - Rego Park", 				boro: "Q", lines: ['M', 'R'], switch: [],}
	{id: 264,	cpx: 264,	gtfs: "G11",	origin: "ind",	branch: "Qns Archer",			name: "Woodhaven Blvd", 				boro: "Q", lines: ['M', 'R'], switch: [],}
	{id: 265,	cpx: 265,	gtfs: "G12",	origin: "ind",	branch: "Qns Archer",			name: "Elmhurst Av", 					boro: "Q", lines: ['M', 'R'], switch: [],}
	{id: 266,	cpx: 266,	gtfs: "G13",	origin: "ind",	branch: "Qns Archer",			name: "Grand Av - Newtown", 			boro: "Q", lines: ['M', 'R'], switch: [],}
	{id: 267,	cpx: 616,	gtfs: "G14",	origin: "ind",	branch: "Qns Archer",			name: "Jackson Hts - Roosevelt Av", 	boro: "Q", lines: ['E', 'F', 'M', 'R'], switch: [['E', 'F']:['M', 'R']],}
	{id: 268,	cpx: 268,	gtfs: "G15",	origin: "ind",	branch: "Qns Archer",			name: "65 St", 							boro: "Q", lines: ['M', 'R'], switch: [],}
	{id: 269,	cpx: 269,	gtfs: "G16",	origin: "ind",	branch: "Qns Archer",			name: "Northern Blvd", 					boro: "Q", lines: ['M', 'R'], switch: [],}
	{id: 270,	cpx: 270,	gtfs: "G18",	origin: "ind",	branch: "Qns Archer",			name: "46 St", 							boro: "Q", lines: ['M', 'R'], switch: [],}
	{id: 271,	cpx: 271,	gtfs: "G19",	origin: "ind",	branch: "Qns Archer",			name: "Steinway St", 					boro: "Q", lines: ['M', 'R'], switch: [],}
	{id: 272,	cpx: 272,	gtfs: "G20",	origin: "ind",	branch: "Qns Archer",			name: "36 St", 							boro: "Q", lines: ['M', 'R'], switch: [],}
	{id: 273,	cpx: 273,	gtfs: "G21",	origin: "ind",	branch: "Qns Archer",			name: "Queens Plaza", 					boro: "Q", lines: ['M', 'R'], switch: [['E']:['M','R']],}

	{id: 7,		cpx: 613,	gtfs: "R11",	origin: "BMT",	branch:	"Astoria",				name: "Lexington Av/59 St",				boro: "M",	lines: "N W R", 	switch: [],},
	{id: 8,		cpx: 8,		gtfs: "R13",	origin: "BMT",	branch: "Astoria",				name: "5 Av/59 St",						boro: "M",	lines: "N W R", 	switch: [],},
	{id: 9,		cpx: 9,		gtfs: "R14",	origin: "BMT",	branch: "Broadway - Brighton",	name: "57 St - 7 Av",					boro: "M",	lines: "N Q R W", 	switch: [],},
	{id: 10,	cpx: 10,	gtfs: "R15",	origin: "BMT",	branch: "Broadway - Brighton",	name: "49 St",							boro: "M",	lines: "N R W", 	switch: [],},
	{id: 11,	cpx: 611,	gtfs: "R16",	origin: "BMT",	branch:	"Broadway - Brighton",	name: "Times Sq - 42 St",				boro: "M",	lines: "N Q R W", 	switch: [],},
	{id: 12,	cpx: 607,	gtfs: "R17",	origin: "BMT",	branch:	"Broadway - Brighton",	name: "34 St - Herald Sq",				boro: "M",	lines: "N Q R W", 	switch: [],},
	{id: 13,	cpx: 13,	gtfs: "R18",	origin: "BMT",	branch: "Broadway - Brighton",	name: "28 St",							boro: "M",	lines: "R W", 		switch: [],},
	{id: 14,	cpx: 14,	gtfs: "R19",	origin: "BMT",	branch: "Broadway - Brighton",	name: "23 St",							boro: "M",	lines: "R W", 		switch: [],},
	{id: 15,	cpx: 602,	gtfs: "R20",	origin: "BMT",	branch:	"Broadway - Brighton",	name: "14 St - Union Sq",				boro: "M",	lines: "N Q R W", 	switch: [],},
	{id: 16,	cpx: 16,	gtfs: "R21",	origin: "BMT",	branch: "Broadway - Brighton",	name: "8 St - NYU",						boro: "M",	lines: "R W", 		switch: [],},
	{id: 17,	cpx: 17,	gtfs: "R22",	origin: "BMT",	branch: "Broadway - Brighton",	name: "Prince St",						boro: "M",	lines: "R W", 		switch: [],},
	{id: 18,	cpx: 623,	gtfs: "R23",	origin: "BMT",	branch:	"Broadway",				name: "Canal St",						boro: "M",	lines: "R W", 		switch: [['N', 'Q']: ['R', 'W']],},
	{id: 20,	cpx: 20,	gtfs: "R24",	origin: "BMT",	branch: "Broadway",				name: "City Hall",						boro: "M",	lines: "R W", 		switch: [],},
	{id: 21,	cpx: 21,	gtfs: "R25",	origin: "BMT",	branch: "Broadway",				name: "Cortlandt St",					boro: "M",	lines: "R W", 		switch: [],},
	{id: 22,	cpx: 22,	gtfs: "R26",	origin: "BMT",	branch: "Broadway",				name: "Rector St",						boro: "M",	lines: "R W", 		switch: [],},
	{id: 23,	cpx: 635,	gtfs: "R27",	origin: "BMT",	branch:	"Broadway",				name: "Whitehall St",					boro: "M",	lines: "R W", 		switch: [],},

	{id: 24,	cpx: 620,	gtfs: "R28",	origin: "BMT",	branch: "Broadway",				name: "Court St", 						boro: "Bk",	lines: "R", 	switch: [],},
	{id: 25,	cpx: 636,	gtfs: "R29",	origin: "BMT",	branch: "Broadway",				name: "Jay St - MetroTech", 			boro: "Bk",	lines: "R", 	switch: [],},
	{id: 26,	cpx: 26,	gtfs: "R30",	origin: "BMT",	branch: "Broadway - Brighton",	name: "DeKalb Av", 						boro: "Bk",	lines: "B Q R", switch: [],},
	{id: 27,	cpx: 617,	gtfs: "R31",	origin: "BMT",	branch: "4th Av",				name: "Atlantic Av - Barclays Ctr", 	boro: "Bk",	lines: "D N R", switch: [],},
	{id: 28,	cpx: 28,	gtfs: "R32",	origin: "BMT",	branch: "4th Av",				name: "Union St", 						boro: "Bk",	lines: "R", 	switch: [],},
	{id: 29,	cpx: 608,	gtfs: "R33",	origin: "BMT",	branch: "4th Av",				name: "9 St", 							boro: "Bk",	lines: "R", 	switch: [],},
	{id: 30,	cpx: 30,	gtfs: "R34",	origin: "BMT",	branch: "4th Av",				name: "Prospect Av", 					boro: "Bk",	lines: "R", 	switch: [],},
	{id: 31,	cpx: 31,	gtfs: "R35",	origin: "BMT",	branch: "4th Av",				name: "25 St", 							boro: "Bk",	lines: "R", 	switch: [],},
	{id: 32,	cpx: 32,	gtfs: "R36",	origin: "BMT",	branch: "4th Av",				name: "36 St", 							boro: "Bk",	lines: "D N R", switch: [],},
	{id: 33,	cpx: 33,	gtfs: "R39",	origin: "BMT",	branch: "4th Av",				name: "45 St", 							boro: "Bk",	lines: "R", 	switch: [],},
	{id: 34,	cpx: 34,	gtfs: "R40",	origin: "BMT",	branch: "4th Av",				name: "53 St", 							boro: "Bk",	lines: "R", 	switch: [],},
	{id: 35,	cpx: 35,	gtfs: "R41",	origin: "BMT",	branch: "4th Av",				name: "59 St", 							boro: "Bk",	lines: "N R", 	switch: [],},
	{id: 36,	cpx: 36,	gtfs: "R42",	origin: "BMT",	branch: "4th Av",				name: "Bay Ridge Av", 					boro: "Bk",	lines: "R", 	switch: [],},
	{id: 37,	cpx: 37,	gtfs: "R43",	origin: "BMT",	branch: "4th Av",				name: "77 St", 							boro: "Bk",	lines: "R", 	switch: [],},
	{id: 38,	cpx: 38,	gtfs: "R44",	origin: "BMT",	branch: "4th Av",				name: "86 St", 							boro: "Bk",	lines: "R", 	switch: [],},
	{id: 39,	cpx: 39,	gtfs: "R45",	origin: "BMT",	branch: "4th Av",				name: "Bay Ridge - 95 St", 				boro: "Bk",	lines: "R", 	switch: [],},

]
*/

//	261,	261,	G08,	IND,	Queens - Archer,		Forest Hills - 71 Av		Q	E F M R,
//	262,	262,	G09,	IND,	Queens - Archer,		67 Av						Q	M R,
//	263,	263,	G10,	IND,	Queens - Archer,		63 Dr - Rego Park			Q	M R,
//	264,	264,	G11,	IND,	Queens - Archer,		Woodhaven Blvd				Q	M R,
//	265,	265,	G12,	IND,	Queens - Archer,		Grand Av - Newtown			Q	M R,
//	266,	266,	G13,	IND,	Queens - Archer,		Elmhurst Av					Q	M R,
//	267,	616,	G14,	IND,	Queens - Archer,		Jackson Hts - Roosevelt Av	Q	E F M R,
//	268,	268,	G15,	IND,	Queens - Archer,		65 St						Q	M R,
//	269,	269,	G16,	IND,	Queens - Archer,		Northern Blvd				Q	M R,
//	270,	270,	G18,	IND,	Queens - Archer,		46 St						Q	M R,
//	271,	271,	G19,	IND,	Queens - Archer,		Steinway St					Q	M R,
//	272,	272,	G20,	IND,	Queens - Archer,		36 St						Q	M R,
//	273,	273,	G21,	IND,	Queens - Archer,		Queens Plaza				Q	E M R,
//	7,		613,	R11,	BMT,	Astoria,				Lexington Av/59 St			M	N W R,
//	8,		8,		R13,	BMT,	Astoria,				5 Av/59 St					M	N W R,
//	9,		9,		R14,	BMT,	Broadway - Brighton,	57 St - 7 Av				M	N Q R W,
//	10,		10,		R15,	BMT,	Broadway - Brighton,	49 St						M	N R W,
//	11,		611,	R16,	BMT,	Broadway - Brighton,	Times Sq - 42 St			M	N Q R W,
//	12,		607,	R17,	BMT,	Broadway - Brighton,	34 St - Herald Sq			M	N Q R W,
//	13,		13,		R18,	BMT,	Broadway - Brighton,	28 St						M	R W,
//	14,		14,		R19,	BMT,	Broadway - Brighton,	23 St						M	R W,
//	15,		602,	R20,	BMT,	Broadway - Brighton,	14 St - Union Sq			M	N Q R W,
//	16,		16,		R21,	BMT,	Broadway - Brighton,	8 St - NYU					M	R W,
//	17,		17,		R22,	BMT,	Broadway - Brighton,	Prince St					M	R W,
//	18,		623,	R23,	BMT,	Broadway,				Canal St					M	R W,
//	20,		20,		R24,	BMT,	Broadway,				City Hall					M	R W,
//	21,		21,		R25,	BMT,	Broadway,				Cortlandt St				M	R W,
//	22,		22,		R26,	BMT,	Broadway,				Rector St					M	R W,
//	23,		635,	R27,	BMT,	Broadway,				Whitehall St				M	R W,
//	24,		620,	R28,	BMT,	Broadway,				Court St					Bk	R,
//	25,		636,	R29,	BMT,	Broadway,				Jay St - MetroTech			Bk	R,
//	26,		26,		R30,	BMT,	Broadway - Brighton,	DeKalb Av					Bk	B Q R,
//	27,		617,	R31,	BMT,	4th Av,					Atlantic Av - Barclays Ctr	Bk	D N R,
//	28,		28,		R32,	BMT,	4th Av,					Union St					Bk	R,
//	29,		608,	R33,	BMT,	4th Av,					9 St						Bk	R,
//	30,		30,		R34,	BMT,	4th Av,					Prospect Av					Bk	R,
//	31,		31,		R35,	BMT,	4th Av,					25 St						Bk	R,
//	32,		32,		R36,	BMT,	4th Av,					36 St						Bk	D N R,
//	33,		33,		R39,	BMT,	4th Av,					45 St						Bk	R,
//	34,		34,		R40,	BMT,	4th Av,					53 St						Bk	R,
//	35,		35,		R41,	BMT,	4th Av,					59 St						Bk	N R,
//	36,		36,		R42,	BMT,	4th Av,					Bay Ridge Av				Bk	R,
//	37,		37,		R43,	BMT,	4th Av,					77 St						Bk	R,
//	38,		38,		R44,	BMT,	4th Av,					86 St						Bk	R,
//	39,		39,		R45,	BMT,	4th Av,					Bay Ridge - 95 St			Bk	R,
