
let routes = {
	F: [

		// "Queens - Archer" -- boro: "Q" / "M"
		'Q254-F01', // "Jamaica - 179 St",
		'Q255-F02', 
		'Q256-F03',
		'Q257-F04', // "Sutphin Blvd"
		'Q258-F05',
		'Q259-F06',
		'Q260-F07',
		'Q261-G08', // "Forest Hills - 71 Av"
		'Q616-G14', // "Jackson Hts - Roosevelt Av"

		// "63rd St" -- boro: "Q", "M"
		'Q221-B04', // "21 St - Queensbridge"
		'M222-B06', // "Roosevelt Island"
		'M223-B08', // "Lexington Av/63 St"

		// "6th Av - Culver" -- boro: "M", "Bk"
		'M224-B10', // "57 St"
		'M225-D15', // "47-50 Sts - Rockefeller Ctr"
		'M609-D16', // "42 St - Bryant Pk"
		'M607-D17', // "34 St - Herald Sq"
		'M228-D18', // "6th Av - Culver"
		'M601-D19', // "14 St"

		// "8th Av - Fulton St" -- boro: "M", "Bk"
		'M167-A32', //  "W 4 St"

		// "6th Av - Culver" -- boro: "M", "Bk"
		'M619-D21', // "Broadway-Lafayette St"
		'M232-F14', // "2 Av"
		'M625-F15', // "Delancey St"
		'M234-F16', // "East Broadway"
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
	Q: [
		// Second Ave
		'M475-Q05',
		'M476-Q04',
		'M477-Q03',
		
		// 63rd Lex
		'M223-B08',

		//Broadway - Brighton
		'M9-R14',
		'M611-R16', // Times Square
		'M607-R17',
		'M602-R20',

		// Manhattan Bridge (Canal)
		'M623-R23',

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
		'Q261-G08', // Forest Hills 71st Ave
		'Q262-G09',
		'Q263-G10',
		'Q264-G11',
		'Q265-G12',
		'Q266-G13',
		'Q616-G14', // Jackson Hts - Roosevelt Jackson
		'Q268-G15',
		'Q269-G16',
		'Q270-G18',
		'Q271-G19',
		'Q272-G20',
		'Q273-G21',

		// 'Astoria': 
		'M613-629',
		'M8-R13',

		// 'Broadway - Brighton': 
		'M9-R14',
		'M10-R15',
		'M611-R16',
		'M607-R17',
		'M13-R18',
		'M14-R19',
		'M602-R20', 	// 14 St - Union Sq
		'M16-R21', 		// 8 St - NYU
		'M17-R22', 		// Prince St


		// 'Broadway': 
		'M623-R23', 	// Canal St
		"M20-R24", 		// City Hall
		"M21-R25", 		// Cortlandt St
		"M22-R26",		// Rector St
		"M635-R27", 	// Whitehall St
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
};


module.exports = routes;


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