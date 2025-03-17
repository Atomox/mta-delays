export const name_problems = {

	'36 St': [
		'Qs272-G20',
		'Bk32-R36',
	],
	'34 St': [
		'Mn607-R17', // Herald Square
		'Mn164-A28', // Penn Station
		'Mn471-726', // 11 Av Hudson Yards
		'Mn318-128', // 1/2/3 Penn Station (7 Ave)
	],
	'42 St': [
		'Mn611-A27', // Port Authority
		'Mn611-R16', // Times Square
		'Mn609-D16', // Bryant Park
		'Mn611-127', // Times Sq 1/2/3
		'Mn611-725', // Times Square 7
		'Mn611-902', // Times Square S
		'Mn610-631', // Grand Central
		'Mn610-723', // Grand Central 7
		'Mn610-901', // Grand Central S
	],
	'50 St': [
		'Mn225-D15', // 47-50 Sts - Rockefeller Ctr
		'Mn162-A25', // 50 St C/E
		'Mn316-126', // 50 St 1
		'Bk61-B14', // 50 St BK D
		'Bk70-B23', // Bay 50 St
	],
	'57 St' : [
			'Mn9-R14', // 57 St - 7 Av
			'Mn224-B10',  // 57 St F
	],
	'59 St - Columbus Circle': [
		'Mn614-A24',
		'Mn614-125',
	],
	'59 St': [
		'Bk35-R41', // 59 St (Bklyn)
		'Mn613-R11',// Lexington Av/59 St
		'Mn8-R13', // 5th Av/59 St
		'Mn613-629', // 59th 4/5/6
		'Mn614-A24', // Columbus Circle
		'Mn614-125', // Columbus Circle
		/**
		 * @TODO
		 *
		 *   59 St (Bklyn)
		 *   59 St/Lexington Av
		 */
	],
	'110 St': [
		'Mn155-A17',
		'Mn308-118',
		'Mn394-623',
		'Mn441-227'
	],
	'125 St': [
		'Mn306-116',
		'Mn153-A15',
		'Mn392-621',
		'Mn439-225',
	],
	'138 St': [
		'Bx377-619',
		'Bx391-416',
	],
	'149 St': [
		'Bx603-415',
		'Bx373-615',
		'Bx434-221',
		'Bx603-222',
	],
	'Broadway': [
		'Bk621-J27', // Broadway Jct
		'Bk621-L22',
		'Bk621-A51',
		'Qs4-R05',   // Broadway (Astoria)
		'Mn619-D21', // Broadway-Lafayette St
		'Bk286-G30', // Broadway
	],
	'Canal St': [
		'Mn623-R23',
		'Mn623-M20',
		'Mn169-A34',
		'Mn325-135',
		'Mn623-639',
	],
	'Delancey St-Essex St': [
		'Mn625-M18',
		'Mn625-F15'
	],
	'Bay Ridge': [
		'Bk36-R42', // Bay Ridge Av
		'Bk39-R45' // Bay Ridge - 95 St
	],

//	'Clinton - Washington Avs': [
//		'Bk177-A44',
//		'Bk291-G35',
//	],

// '59 St':

// "59 St"
// "5 Av-59 St"
// "57 St-7 Av"
// "59 St"

//	'4 Av-9 St':
	//'9 St':
};

const hyphen_station_suffix = [
	'7', // 57 St - 7 Av
	'50 sts', // 47 - 50 sts
	'essex sts', // delancey-essex sts
	'wyckoff avs', // myrtle-wyckoff avs
	'willoughby avs', // myrtle-willoughby avs
	'nostrand avs', // bedford-nostrand avs
	'Lafayette St',
	'42 St',
	'Broadway',
	'Roosevelt Av',
	'71 Av',
	'9 St',
	'95', //  Bay Ridge - 95 St
];

const hyphen_station_avs = [
	'myrtle-wyckoff avs',
	'clinton-washington avs',
	'kingston-throop avs',
	'myrtle-willoughby avs',
	'bedford-nostrand avs'
];

const hyphen_station_sts = [
	'47-50 sts',
	'174-175 sts',
	'182-183 sts',
	'delancey-essex sts',
	'hoyt-schermerhorn sts',
	'smith-9 sts'
];

const road_abbreviations = [
	'st', 'sq', 'av', 'pl', 'pkwy', 'blvd', 'authority'
];

export default {
	name_problems,
	hyphen_station_suffix,
	hyphen_station_avs,
	hyphen_station_sts,
	road_abbreviations,
};
