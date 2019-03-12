let stations = {
	names: {
		hyphen: {
			'Times Sq-42 St': 'Times Sq - 42 St',
			'Bay Ridge-95 St': 'Bay Ridge- 95 St',
			'Lexington Av-63 St': 'Lexington Av-63 St',
			'Jackson Heights-Roosevelt Av': 'Jackson Heights - Roosevelt Av',
			'5 Av-59 St': '5 Av/59 St',
			'57 St-7 Av': '57 St- 7 Av',
			'4 Av-9 St': '4 Av-9 St',
		},
		simple: {
			'96 St':'96 St',
			'53 St':'53 St',
			'45 St':'45 St',
			'25 St':'25 St',
			'Prospect Av': 'Prospect Av',
			'Union St': 'Union St',
		},
		mistaken_identity: {
			'96 St':'196 St',
			'18 St':'181 St',
			'45 St':'145 St',
			'25 St':'125 St',
			'7 Av':'57 St-7 Av',
			'36 St (Qns)': '36 St',
			'59 St':'5 Av/59 St',
			'4Av-9th St': '4Av',
			'Queens Plaza': 'Queensboro Plaza',
		},
		false_positive: [
			{
				message: 'TRACK MAINTENANCE [W] No trains between 57 St-7 Av and Ditmars Blvd - Take the',
				stations: {
					'MTA NYCT_W': {
						stations: {
							'Mn9-R14': '57 St-7 Av',
							'Qs1-R01': 'Ditmars Blvd'
						}
					}
				},
				line: [
					{line: 'MTA NYCT_W'}
				],
			},
			{
				message: "Some northbound [N] trains are stopping on the [Q] line from 57 St-7 Av and end at 96 St. Some northbound [R] trains are stopping on the [Q] line from 57 St-7 Av to Lexington Av-63 St, then over the [F] line from Lexington Av-63 St to Jackson Heights-Roosevelt Av. This service change is because of a train with mechanical problems at 5 Av-59 St. Expect delays in [F][N][Q][R] train service.",
				stations: {
					'MTA NYCT_F': {
						stations: {
							'Qs616-G14': 'Jackson Heights-Roosevelt Av',
							'Mn223-B08': 'Lexington Av-63 St',
						}
					},
					'MTA NYCT_Q': {
						stations: {
							'Mn9-R14': '57 St-7 Av',
							'Mn475-Q05': '96 St',
							'Mn223-B08': 'Lexington Av-63 St',
						}
					},
					'MTA NYCT_N': {
						stations: {
							'Mn9-R14': '57 St-7 Av',
							'Mn8-R13': '5 Av-59 St',
						}
					},
					'MTA NYCT_R': {
						stations: {
							'Mn9-R14': '57 St-7 Av',
							'Mn8-R13': '5 Av-59 St',
							'Qs616-G14': 'Jackson Heights-Roosevelt Av',
						}
					},
					'MTA NYCT_W': {
						stations: {
							'Mn9-R14': '57 St-7 Av',
							'Mn8-R13': '5 Av-59 St',
						}
					},
				},
				line: [
					{line: 'MTA NYCT_F'},
					{line: 'MTA NYCT_Q'},
					{line: 'MTA NYCT_N'},
					{line: 'MTA NYCT_W'},
					{line: 'MTA NYCT_R'},
				],
			},
			{
				message: '[D] trains are running local from 145 St to 59 St-Columbus Circle in both directions.[N] trains are stopping along the [R] line from DeKalb Av to Lexington Av/59 St.',
				message_station_parse: "[D] trains are running local from [Mn151-A12] to [Mn614-A24] in both directions.[N] trains are stopping along the [R] line from [Bk26-R30] to [Mn613-R11].",
				stations: {
					'MTA NYCT_D': {
						stations: {
							'Mn151-A12': '145 St',
							'Mn614-A24': '59 St-Columbus Circle',
							'Bk26-R30': 'DeKalb Av',
						}
					},
					'MTA NYCT_N': {
						stations: {
							'Mn613-R11': 'Lexington Av/59 St',
							'Bk26-R30': 'DeKalb Av',
						}
					},
					'MTA NYCT_R': {
						stations: {
							'Bk26-R30': 'DeKalb Av',
							'Mn613-R11': 'Lexington Av/59 St',
						}
					}
				},
				line: [
					{line: 'MTA NYCT_D'},
					{line: 'MTA NYCT_N'},
					{line: 'MTA NYCT_R'}
				],
			},

			{
				message: '[N] [Q] [R] [W] Some Bay Ridge-bound trains skip Queens Plaza, Lexington Av/59 St and 5 Av/59 St',
				message_station_parse: '[N] [Q] [R] [W] Some Bay Ridge-bound trains skip [Qs273-G21], [Mn613-R11] and [Mn8-R13]',
				stations: {
					'MTA NYCT_N': {
						stations: {
							'Mn613-R11': 'Lexington Av/59 St',
							'Mn8-R13': '5 Av/59 St',
						}
					},
					'MTA NYCT_Q': {
						stations: {
							// Nothing.
						}
					},
					'MTA NYCT_R': {
						stations: {
							'Qs273-G21': 'Queens Plaza',
							'Mn613-R11': 'Lexington Av/59 St',
							'Mn8-R13': '5 Av/59 St',
						}
					},
					'MTA NYCT_W': {
						stations: {
							'Mn613-R11': 'Lexington Av/59 St',
							'Mn8-R13': '5 Av/59 St',
						}
					},
				},
				line: [
					{line: 'MTA NYCT_N'},
					{line: 'MTA NYCT_Q'},
					{line: 'MTA NYCT_R'},
					{line: 'MTA NYCT_W'},
				],
			},
			{
				message: '[E] [M] [R] trains are experiencing delays because of ... at Lexington Av/53 St.',
				stations: {
					'MTA NYCT_E': {
						stations: {
							'Mn612-F11': 'Lexington Av/59 St',
						}
					},
					'MTA NYCT_M': {
						stations: {
							'Mn612-F11': 'Lexington Av/59 St',
						}
					},
					'MTA NYCT_R': {
						stations: {
							// Do not select [R] 53 St (BKLYN) station.
						}
					},
				},
				line: [
					{line: 'MTA NYCT_E'},
					{line: 'MTA NYCT_M'},
					{line: 'MTA NYCT_R'},
				],
			},
		],
		nomDePlume: [
			{
				message: 'Jackson Heights-Roosevelt Av',
				stations: {
					'MTA NYCT_F': {
						stations: {
							'Qs616-G14': 'Jackson Hts - Roosevelt Av'
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_F' }
				],
			},
			{
				message: 'Roosevelt Av',
				stations: {
					'MTA NYCT_E': {
						stations: {
							'Qs616-G14': 'Jackson Hts - Roosevelt Av'
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_E' }
				],
			},
			{
				message: '241 St',
				stations: {
					'MTA NYCT_2': {
						stations: {
							'Bx416-201': 'Wakefield - 241 St'
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_2' }
				],
			},
			{
				message: '[E] trains run local between 71 Av and',
				stations: {
					'MTA NYCT_E': {
						stations: {
							'Qs261-G08': 'Forest Hills - 71 Av'
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_E' }
				],
			},
			{
				message: 'No [F] service at 47-50 Sts',
				stations: {
					'MTA NYCT_F': {
						stations: {
							'Mn225-D15': '47-50 Sts - Rockefeller Ctr'
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_F' }
				],
			},
			{
				message: '[E] service operates between Jamaica Center',
				stations: {
					'MTA NYCT_E': {
						stations: {
							'Qs278-G05': 'Jamaica Center - Parsons/Archer'
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_E' }
				],
			},
			{
				message: 'B\'way-Lafayette St',
				stations: {
					'MTA NYCT_D': {
						stations: {
							'Mn619-D21': 'Broadway-Lafayette St'
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_D' }
				],
			},
			{
				message: 'and via the [F] to/from Stillwell Av',
				stations: {
					'MTA NYCT_F': {
						stations: {
							'Bk58-D43': 'Coney Island - Stillwell Av'
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_F' }
				],
			},
			{
				message: '[5] service operates between Dyre Av and E 180 St.',
				stations: {
					'MTA NYCT_5': {
						stations: {
							'Bx442-501': 'Eastchester - Dyre Av',
							'Bx426-213': 'E 180 St',
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_5' }
				],
			},
			{
				source: { id: 'MTA NYCT_173402', archive: 0 },
				message: 'take the [6] to [Mn602-635] or Brooklyn Bridge and transfer to an uptown [4] local or [6].',
				stations: {
					'MTA NYCT_6': {
						stations: {
							'Mn622-640': 'Brooklyn Bridge - City Hall',
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_6' }
				],
			},
			{
				source: { id: 'MTA NYCT_174579', archive: 0 },
				message: '[L] service operates between Rockaway Pkwy and Myrtle-Wyckoff Avs.',
				stations: {
					'MTA NYCT_L': {
						stations: {
							'Bk138-L29': 'Canarsie - Rockaway Pkwy',
							'Bk630-L17': 'Myrtle - Wyckoff Avs',
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_L' }
				],
			},
			{
				source: { id: 'MTA NYCT_173257', archive: 0 },
				message: '[M] shuttle service operates between Metropolitan Av and Myrtle Wyckoff Avs.',
				stations: {
					'MTA NYCT_M': {
						stations: {
							'Qs108-M01': 'Middle Village - Metropolitan Av',
							'Bk630-M08': 'Myrtle - Wyckoff Avs',
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_M' }
				],
			},
			{
				source: { id: 'MTA NYCT_fdb2c0f8-5931-4f1a-983f-a15fd69a93e1', archive: 1 },
				message: 'signal problems at 61 St-Woodside.',
				stations: {
					'MTA NYCT_7': {
						stations: {
							'Qs456-712': 'Woodside - 61 St'
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_7' }
				],
			},
			{
				source: { id: 'MTA NYCT_d0283bcc-95e1-47e8-9e44-e2628314fdcd', archive: 2 },
				message: '[A] [C] and [E] trains are bypassing 42 St/Port Authority-Bus Terminal in both directions.',
				stations: {
					'MTA NYCT_E': {
						stations: {
							'Mn611-A27': '42 St - Port Authority Bus Terminal'
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_E' }
				],
			},
			{
				source: { id: 'MTA NYCT_173983', archive: 3 },
				message: 'E 143 St, Westchester Sq - E Tremont Av',
				stations: {
					'MTA NYCT_6': {
						stations: {
							'Bx374-616': 'E 143 St - St Mary\'s St',
							'Bx363-604': 'Westchester Sq - E Tremont Av',
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_6' }
				],
			},
			{
				source: { id: 'MTA NYCT_173363', archive: 3 },
				message: 'For service to these stations, take the [7] to Willets Point and transfer to',
				stations: {
					'MTA NYCT_7': {
						stations: {
							'Qs448-702': 'Mets - Willets Point'
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_7' }
				],
			},
			{
				source: { id: 'MTA NYCT_174679', archive: 3 },
				message: '[A] service operates between 207 St ... and via the [S] to/from Beach 116 St',
				stations: {
					'MTA NYCT_A': {
						stations: {
							'Mn143-A02': 'Inwood - 207 St',
							'Qs203-H15': 'Rockaway Park - Beach 116 St',
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_A' }
				],
			},
			{
				source: { id: 'MTA NYCT_173350', archive: 4 },
				message: 'TRACK MAINTENANCE [2] Flatbush Av-bound trains skip',
				stations: {
					'MTA NYCT_2': {
						stations: {
//							'Bk359-247': 'Flatbush Av - Brooklyn College'   No direction-bound stations in main stations array.
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_2' }
				],
			},
			{
				source: { id: 'MTA NYCT_173333', archive: 6 },
				message: 'trains skip 66 St, 59 St and 50 St Late Nights',
				stations: {
					'MTA NYCT_1': {
						stations: {
							'Mn314-124': '66 St - Lincoln Center',
							'Mn614-125': '59 St - Columbus Circle',
							'Mn316-126': '50 St',
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_1' }
				],
			},
			{
				source: { id: 'MTA NYCT_173336', archive: 6 },
				message: 'TRACK MAINTENANCE [3] Service operates between 148 St and 34 St-Penn Station.',
				stations: {
					'MTA NYCT_3': {
						stations: {
							'Mn318-128': '34 St - Penn Station',
							'Mn436-301': 'Harlem - 148 St',
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_3' }
				],
			},
			{
				source: { id: 'MTA NYCT_174565', archive: 6 },
				message: 'TRACK MAINTENANCE [A] Inwood-bound trains run express from Broadway Junction to Hoyt-Schermerhorn',
				stations: {
					'MTA NYCT_A': {
						stations: {
//							'Mn143-A02': 'Inwood - 207 St',   No direction-bound stations in main array.
							'Bk175-A42': 'Hoyt - Schermerhorn Sts',
							'Bk621-A51': 'Broadway Junction',
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_A' }
				],
			},
			{
				source: { id: 'MTA NYCT_175372', archive: 6 },
				message: 'Jamaica-bound trains skip Fort Hamilton Pkwy , 15 St-Prospect Park and 4 Av-9 St',
				stations: {
					'MTA NYCT_F': {
						stations: {
							'Bk241-F25': '15 St-Prospect Park',
							'Bk242-F26': 'Fort Hamilton Pkwy',
							'Bk608-F23': '4 Av',
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_F' }
				],
			},
			{
				source: { id: 'MTA NYCT_173660', archive: 6 },
				message: 'Buses make all stops in Brooklyn, between ... and 95 St-Bay Ridge.',
				stations: {
					'MTA NYCT_R': {
						stations: {
							'Bk39-R45': 'Bay Ridge - 95 St',
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_R' }
				],
			},
			{
				source: { id: 'MTA NYCT_175347', archive: 51 },
				message: 'free shuttle buses operate between Myrtle-Wyckoff Av and Myrtle Av',
				stations: {
					'MTA NYCT_M': {
						stations: {
							'Bk97-M11': 'Myrtle Av',
							'Bk630-M08': 'Myrtle-Wyckoff Avs',
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_M' }
				],
			},
			{
				source: { id: 'MTA NYCT_177077', archive: 51 },
				message: 'For service to 67 Av, 63 Dr, Woodhaven Blvd, Grand Av and Elmhurst Av, take the [R] to Roosevelt Av and transfer to a Forest Hills-bound [R].',
				stations: {
					'MTA NYCT_R': {
						stations: {
							'Qs262-G09': '67 Av',
							'Qs263-G10': '63 Dr - Rego Park',
							'Qs264-G11': 'Woodhaven Blvd',
							'Qs265-G12': 'Grand Av - Newtown',
							'Qs266-G13': 'Elmhurst Av',
							'Qs616-G14': 'Roosevelt Av',
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_R' }
				],
			},
			{
				source: { id: '', archive: 'test_messages' },
				message: '[2] service operates between 241 St and Franklin Av, and via the [4] to/from Utica Av.',
				stations: {
					'MTA NYCT_2': {
						stations: {
							'Bx416-201': 'Wakefield - 241 St',
							'Bk626-239': 'Franklin Av',
						}
					},
					'MTA NYCT_4': {
						stations: {
							'Bk626-239': 'Franklin Av',
							'Bk345-250': 'Crown Hts - Utica Av',
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_2' },
					{ line: 'MTA NYCT_4' }
				],
			},
			{
				message: '[1] Downtown trains skip 59 St',
				stations: {
					'MTA NYCT_1': {
						stations: {
							'Mn614-125': '59 St - Columbus Circle'
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_1' }
				],
			},
/**
			{
				source: { id: '', archive: 0 },
				message: '',
				stations: {
					'MTA NYCT_': {
						stations: {
							'': ''
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_' }
				],
			},
*/
		],
		splitDestinations: [
			{
				source: { id: 'MTA NYCT_173239', archive: 0 },
				message: 'TRACK MAINTENANCE [A] Ozone Park/Far Rockaway-bound trains skip',
				stations: {
					'MTA NYCT_A': {
						stations: {
							'Qs195-A65': 'Ozone Park - Lefferts Blvd',
							'Qs209-H11': 'Far Rockaway - Mott Av',
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_A' }
				],
			},
		],
		sharedStation: [
			{
				message: 'Jackson Heights-Roosevelt Av',
				stations: {
					'MTA NYCT_F': {
						stations: {
							'Qs616-G14': 'Jackson Hts - Roosevelt Av'
						}
					},
					'MTA NYCT_E': {
						stations: {
							'Qs616-G14': 'Jackson Hts - Roosevelt Av'
						}
					},
					'MTA NYCT_R': {
						stations: {
							'Qs616-G14': 'Jackson Hts - Roosevelt Av'
						}
					},
					'MTA NYCT_M': {
						stations: {
							'Qs616-G14': 'Jackson Hts - Roosevelt Av'
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_F' },
					{ line: 'MTA NYCT_E' },
					{ line: 'MTA NYCT_R' },
					{ line: 'MTA NYCT_M' },
				],
			},
			{
				source: { id: 'MTA NYCT_d0283bcc-95e1-47e8-9e44-e2628314fdcd', archive: 2 },
				message: '[A] [C] and [E] trains are bypassing 42 St/Port Authority-Bus Terminal in both directions.',
				stations: {
					'MTA NYCT_A': {
						stations: {
							'Mn611-A27': '42 St - Port Authority Bus Terminal'
						}
					},
					'MTA NYCT_C': {
						stations: {
							'Mn611-A27': '42 St - Port Authority Bus Terminal'
						}
					},
					'MTA NYCT_E': {
						stations: {
							'Mn611-A27': '42 St - Port Authority Bus Terminal'
						}
					},
				},
				line: [
					{ line: 'MTA NYCT_A' },
					{ line: 'MTA NYCT_C' },
					{ line: 'MTA NYCT_E' },
				],
			},
			{
				source: { id: '', archive: 0 },
				message: '[1] [2] [3] [N] [R] [Q] [W] and [7] trains are bypassing Times Sq-42 St in both directions, [A] [C] and [E] trains are bypassing 42 St/Port Authotiy.',
				stations: {
					'MTA NYCT_1': {
						stations: {
							'Mn611-127': 'Times Sq - 42 St'
						}
					},
					'MTA NYCT_2': {
						stations: {
							'Mn611-127': 'Times Sq - 42 St'
						}
					},
					'MTA NYCT_3': {
						stations: {
							'Mn611-127': 'Times Sq - 42 St'
						}
					},
					'MTA NYCT_7': {
						stations: {
							'Mn611-725': 'Times Sq - 42 St'
						}
					},
					'MTA NYCT_N': {
						stations: {
							'Mn611-R16': 'Times Sq - 42 St',
						}
					},
					'MTA NYCT_Q': {
						stations: {
							'Mn611-R16': 'Times Sq - 42 St',
						}
					},
					'MTA NYCT_R': {
						stations: {
							'Mn611-R16': 'Times Sq - 42 St',
						}
					},
					'MTA NYCT_W': {
						stations: {
							'Mn611-R16': 'Times Sq - 42 St',
						}
					},
					'MTA NYCT_S': {
						stations: {
							'Mn611-902': 'Times Sq - 42 St',
						}
					},
/**
					'MTA NYCT_C': {
						stations: {
							// Should not match.
						}
					},
*/
				},
				line: [
					{ line: 'MTA NYCT_1' },
					{ line: 'MTA NYCT_2' },
					{ line: 'MTA NYCT_3' },
					{ line: 'MTA NYCT_N' },
					{ line: 'MTA NYCT_Q' },
					{ line: 'MTA NYCT_R' },
					{ line: 'MTA NYCT_W' },
					{ line: 'MTA NYCT_7' },
					{ line: 'MTA NYCT_S' },
					{ line: 'MTA NYCT_C' }
				],
			},
			{
				source: { id: null, archive: null },
				message: 'Because of some candy on the tracks at Broadway Junction',
				stations: {
					'MTA NYCT_A': {
						stations: {
							'Bk621-A51': 'Broadway Jct',
						}
					},
					'MTA NYCT_C': {
						stations: {
							'Bk621-A51': 'Broadway Jct',
						}
					},
					'MTA NYCT_J': {
						stations: {
							'Bk621-J27': 'Broadway Jct',
						}
					},
					'MTA NYCT_Z': {
						stations: {
							'Bk621-J27': 'Broadway Jct',
						}
					},
					'MTA NYCT_L': {
						stations: {
							'Bk621-L22': 'Broadway Jct',
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_A' },
					{ line: 'MTA NYCT_C' },
					{ line: 'MTA NYCT_J' },
					{ line: 'MTA NYCT_Z' },
					{ line: 'MTA NYCT_L' },
				],
			},
			{
				source: { id: '', archive: 0 },
				message: '[2],[4],[5] No trains between 149 St-Grand Concourse',
				stations: {
					'MTA NYCT_4': {
						stations: {
							'Bx603-415': '149 St - Grand Concourse',
						}
					},
					'MTA NYCT_2': {
						stations: {
							'Bx603-222': '149 St - Grand Concourse',
						}
					},
					'MTA NYCT_5': {
						stations: {
							'Bx603-222': '149 St - Grand Concourse',
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_4' },
					{ line: 'MTA NYCT_2' },
					{ line: 'MTA NYCT_5' },
				],
			},
			{
				message: 'Delancey St/Essex St',
				stations: {
					'MTA NYCT_F': {
						stations: {
							'Mn625-F15': 'Delancey St/Essex St'
						}
					},
					'MTA NYCT_M': {
						stations: {
							'Mn625-M18': 'Delancey St/Essex St'
						}
					},
				},
				line: [
					{ line: 'MTA NYCT_F' },
					{ line: 'MTA NYCT_M' },
				],
			},
/**
			{
				source: { id: '', archive: 0 },
				message: '',
				stations: {
					'MTA NYCT_': {
						stations: {
							'': ''
						}
					},
					'MTA NYCT_': {
						stations: {
							'': ''
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_' },
					{ line: 'MTA NYCT_' },
				],
			},
*/
		],
		'MTAD-098': [
			{
				source: { id: 'MTA NYCT_184927', archive: 125 },
				message: 'TRACK REPLACEMENT | No [2] trains between Chambers St, Manhattan and Atlantic Av-Barclays Ctr, Brooklyn.',
				stations: {
					'MTA NYCT_2': {
						stations: {
							'Mn327-137': "Chambers St",
							'Bk617-235': "Atlantic Av-Barclays Ctr",
						}
					},
					'MTA NYCT_3': {
						stations: {
							'Mn327-137': "Chambers St",
							'Bk617-235': "Atlantic Av-Barclays Ctr",
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_2' },
					{ line: 'MTA NYCT_3' },
				],
			},
			{
				ticket: 'MTAD-166',
				source: { id: '', archive: 189 },
				message: 'Southbound [D], [N] and [R] trains are running with delays because of signal problems at 36 St (Brooklyn). Some southbound [N] trains are running on the [D] line from 36 St (Brooklyn) to Coney Island-Stillwell Av. Some southbound [N] trains are making local stops between Atlantic Av-Barclays Ctr to 36 St (Brooklyn).',
				stations: {
					'MTA NYCT_D': {
						stations: {
							'Bk32-R36': "36 St (Brooklyn)",
							'Bk617-R31': "",
							'Bk58-D43': "",
							'Bk617-235': "Atlantic Av-Barclays Ctr",
						}
					},
					'MTA NYCT_N': {
						stations: {
							'Bk32-R36': "36 St (Brooklyn)",
							'Bk617-R31': '',
							'Bk58-D43': '',
						}
					},
					'MTA NYCT_R': {
						stations: {
							'Bk32-R36': "36 St (Brooklyn)",
							'Bk617-235': "Atlantic Av-Barclays Ctr"
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_D' },
					{ line: 'MTA NYCT_N' },
					{ line: 'MTA NYCT_R' },
				],
			},
			{
				source: { id: '', archive: 0 },
				message: 'No [R] trains between Bay Ridge-95 St and 36 St, Brooklyn, due to track maintenance. Take free shuttle buses and the [N]. [R] service operates between 71 Av and 36 St, and via the [D] to/from 9 Av, the last stop.',
				stations: {
					'MTA NYCT_R': {
						stations: {
							'Qs261-G08': '71 Av',
			        'Bk32-R36': '36 St',
			        'Bk39-R45': 'Bay Ridge-95 St'
						}
					},
				},
				line: [
					{ line: 'MTA NYCT_R' },
				],
			},
			{
				source: { id: 'MTA NYCT_185458', archive: 126 },
				message: 'No [1] trains between 137 St, Manhattan and 242 St, Bronx [A] [C] trains, M3, M100 and [SB] free shuttle buses provide alternate service [1] Service operates in Manhattan between South Ferry and 137 St .',
				stations: {
					'MTA NYCT_1': {
						stations: {
							'Bx293-101': '242 St, Bronx',
	        		'Mn305-115': '137 St',
	        		'Mn635-142': 'South Ferry'
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_1' },
				],
			},
			{
				source: { id: '', archive: 126 },
				message: 'No [7] trains between Queensboro Plaza, Queens and 34 St-Hudson Yards, Manhattan',
				stations: {
					'MTA NYCT_7':{
						stations: {
							'Qs461-718': 'Queensboro Plaza, Queens',
				      'Mn471-726': '34 St-Hudson Yards, Manhattan'
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_7' },
				],
			},
			{
				source: { id: '', archive: 126 },
				message: 'Inwood-bound [A] trains run via the [F] from Jay St-MetroTech, Brooklyn to W 4 St, Manhattan',
				stations: {
					'MTA NYCT_A': {
			 			stations: {
							'Mn167-A32': 'W 4 St, Manhattan',
			        'Bk636-A41': 'Jay St-MetroTech, Brooklyn'
						}
					},
				  'MTA NYCT_F': {
						stations: {
							'Mn167-A32': 'W 4 St, Manhattan',
			        'Bk636-A41': 'Jay St-MetroTech, Brooklyn'
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_A' },
					{ line: 'MTA NYCT_F' },
				],
			},
			{
				source: { id: '', archive: 126 },
				message: '[F] Brooklyn-bound trains run via the [E] from Roosevelt Av, Queens to Canal St, Manhattan and via the [A] to Jay St-MetroTech, Brooklyn',
				stations: {
					'MTA NYCT_F': {
						stations: {
							'Qs616-G14': 'Roosevelt Av, Queens',
        			'Bk636-A41': 'Jay St-MetroTech, Brooklyn'
						}
					},
  				'MTA NYCT_E': {
						stations: {
							'Qs616-G14': 'Roosevelt Av, Queens',
        			'Mn169-A34': 'Canal St, Manhattan'
						}
					},
					'MTA NYCT_A': {
						stations: {
							'Bk636-A41': 'Jay St-MetroTech, Brooklyn',
        			'Mn169-A34': 'Canal St, Manhattan'
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_F' },
					{ line: 'MTA NYCT_E' },
					{ line: 'MTA NYCT_A' },
				],
			},
			{
				source: { id: '', archive: 126 },
				message: '[N] Astoria-bound trains run via the [Q] from DeKalb Av, Brooklyn to Canal St, Manhattan',
				stations: {
					'MTA NYCT_N': {
						stations: {
							'Bk26-R30': 'DeKalb Av, Brooklyn',
        			'Mn623-R23': 'Canal St, Manhattan'
						}
					},
  				'MTA NYCT_Q': {
						stations: {
							'Bk26-R30': 'DeKalb Av, Brooklyn',
        			'Mn623-R23': 'Canal St, Manhattan'
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_N' },
					{ line: 'MTA NYCT_Q' },
				],
			},
			{
				source: { id: '', archive: 127 },
				message: 'No [D] trains between 59 St-Columbus Circle, Manhattan and 161 St-Yankee Stadium, Bronx',
				stations: {
					'MTA NYCT_D': {
						stations: {
							'Bx604-D11': '161 St-Yankee Stadium, Bronx',
        			'Mn614-A24': '59 St-Columbus Circle, Manhattan'
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_D' },
				],
			},
			{
				source: { id: '', archive: 127 },
				message: 'Jamaica-bound [F] trains are rerouted via the [E] after 47-50 Sts in Manhattan to Roosevelt Av in Queens',
				stations: {
					'MTA NYCT_F': {
						stations: {
							'Qs616-G14': 'Roosevelt Av',
							'Mn225-D15': '47-50 Sts'
						}
					},
  				'MTA NYCT_E': {
						stations: {
							'Qs616-G14': 'Roosevelt Av'
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_E' },
					{ line: 'MTA NYCT_F' },
				],
			},
			{
				source: { id: '', archive: 127 },
				message: 'Astoria-bound [N] trains run via the [Q] from DeKalb Av in Brooklyn to Canal St in Manhattan',
				stations: {
					'MTA NYCT_N': {
						stations: {
							'Bk26-R30': 'DeKalb Av',
							'Mn623-R23': 'Canal St'
						}
					},
  				'MTA NYCT_Q': {
						stations: {
							'Bk26-R30': 'DeKalb Av',
							'Mn623-R23': 'Canal St'
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_N' },
					{ line: 'MTA NYCT_Q' },
				],
			},
		],
		'36st': [
			{
				source: { id: '', archive: 0 },

				// Should replace 36 St, Brooklyn AND 36 St
				message: 'No [R] trains between ... 36 St, Brooklyn, due to track maintenance. [R] service operates between 71 Av and 36 St, and via the [D] ...',
				stations: {
					'MTA NYCT_R': {
						stations: {
							'Bk32-R36': '36 St',
						}
					}
				},
				line: [
					 	{ line: 'MTA NYCT_R', },
				],
			},
			{
				source: { id: 'MTA NYCT_a3749ab2-cb3e-48c6-a58a-f74726aa2936', archive: 6 },

				// Should replace 36 St, Brooklyn AND 36 St
				message: 'Southbound [E] and [F] trains are running with delays because of a rail condition at 36 St (Queens).',
				stations: {
					'MTA NYCT_R': {
						stations: {
							'Bk32-R36': '36 St',
						}
					}
				},
				line: [
					 	{ line: 'MTA NYCT_R', },
				],
			},
			{
				source: { id: 'MTA NYCT_380e324e-31ab-4890-aa90-47f7e7e60677', archive: 15 },

				// Should replace 36 St, Brooklyn AND 36 St
				message: 'Some southbound [R] trains are stopping along the [F] line from 36 St (Qns) to ...',
				stations: {
					'MTA NYCT_R': {
						stations: {
							'Qs272-G20': '36 St',
						}
					}
				},
				line: [
					 	{ line: 'MTA NYCT_R', },
				],
			},
			{
				source: { id: 'MTA NYCT_3a382636-b7c8-435d-8ca3-2ae51393268d', archive: 17 },
				message: 'Northbound [D] and [N] trains are running with delays because of a sick passenger at 36 St (BKLYN).',
				stations: {
					'MTA NYCT_D': {
						stations: {
							'Bk32-R36': '36 St',
						}
					},
					'MTA NYCT_N': {
						stations: {
							'Bk32-R36': '36 St',
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_D' },
					{ line: 'MTA NYCT_N' }
				],
			},
			{
				source: { id: 'MTA NYCT_175195', archive: 22 },
				message: '[F] trains run local in Queens, Manhattan-bound [E] [F] trains make local stops at ... 36 St.',
				stations: {
					'MTA NYCT_E': {
						stations: {
							'Qs272-G20': '36 St',
						}
					},
					'MTA NYCT_F': {
						stations: {
							'Qs272-G20': '36 St',
						}
					},
				},
				line: [
					{ line: 'MTA NYCT_E' },
					{ line: 'MTA NYCT_F' },
				],
			},
			{
				source: { id: 'MTA NYCT_9d5e8bb2-fff8-403a-85f5-917eb80c0d76', archive: 24 },
				message: 'Northbound [N] trains are running local from 59 St (Bklyn) to 36 St (Bklyn) because of the weather conditions.',
				stations: {
					'MTA NYCT_N': {
						stations: {
							'Bk32-R36': '36 St',
							'Bk35-R41': '59 St',
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_N' }
				],
			},
			{
				source: { id: 'MTA NYCT_78c4ecec-1ca7-43d4-9cea-1edb9c7c2c29', archive: 28 },
				message: 'Broadway Junction bound [M] trains are stopping along the [F] line from 36 St (QNS) to ... ',
				stations: {
					'MTA NYCT_M': {
						stations: {
							'Qs272-G20': '36 St',
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_M' }
				],
			},
			{
				source: { id: 'MTA NYCT_176107', archive: 31 },
				message: 'SIGNAL MAINTENANCE [R] Bay Ridge-bound trains run express from ... to 59 St, Brooklyn ... Trains stop at 36 St. For service to ..., take the [R] to 36 St and transfer to ... For service from these stations, take the [N] or [R] to 36 St and transfer to a Bay Ridge-bound [R].',
				stations: {
					'MTA NYCT_R': {
						stations: {
							'Bk32-R36': '36 St',
							'Bk35-R41': '59 St',
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_R' }
				],
			},
			{
				source: { id: 'MTA NYCT_f665b032-fca1-4121-8032-616da357047d', archive: 32 },
				message: 'There is no [B] train service between Coney Island-Stillwell Av and Bedford Park Blvd in both directions.There is no [D] train service between ... and 36 St (Bklyn) in both directions.',
				stations: {
					'MTA NYCT_D': {
						stations: {
							'Bk32-R36': '36 St',
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_D' }
				],
			},
			{
				source: { id: 'MTA NYCT_178432', archive: 36 },
				message: 'PRIORITY REPAIRS [D] Coney Island-bound trains are rerouted in Manhattan and Brooklyn. Travel Alternatives [TP] For ... For service to ... , transfer at 36 St to a Manhattan-bound [D] [N] or [R].',
				stations: {
					'MTA NYCT_D': {
						stations: {
							'Bk32-R36': '36 St',
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_D' }
				],
			},
			{
				source: { id: 'MTA NYCT_176101', archive: 36 },
				message: 'SIGNAL MAINTENANCE [N] Coney Island-bound trains run express from ... to 59 St, Brooklyn. Trains stop at 36 St.',
				stations: {
					'MTA NYCT_N': {
						stations: {
							'Bk32-R36': '36 St',
							'Bk35-R41': '59 St',
						}
					},
					'MTA NYCT_R': {
						stations: {
							'Bk32-R36': '36 St',
							'Bk35-R41': '59 St',
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_N' },
					{ line: 'MTA NYCT_R' }
				],
			},
			{
				source: { id: 'MTA NYCT_176626', archive: 39 },
				message: 'STATION IMPROVEMENTS [R] Forest Hills-bound trains run express from 59 St, Brooklyn to Canal St via the Manhattan Bridge. Trains stop at 36 St and Atlantic Av-Barclays Ctr.',
				stations: {
					'MTA NYCT_': {
						stations: {
							'Bk32-R36': '36 St',
							'Bk35-R41': '59 St',
							'Bk617-R31': 'Atlantic Av - Barclays Ctr',
							'Mn623-Q01': 'Canal St',
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_' }
				],
			},
			{
				source: { id: 'MTA NYCT_176800', archive: 40 },
				message: 'TRACK MAINTENANCE [E] ...-bound trains run local from Roosevelt Av to Queens Plaza Trains stop at ... 36 Sts.',
				stations: {
					'MTA NYCT_E': {
						stations: {
							'Qs616-G14': 'Jackson Hts - Roosevelt Av',
							'Qs273-G21': 'Queens Plaza',
							'Qs272-G20': '36 St',
						}
					},
					'MTA NYCT_F': {
						stations: {
							'Qs616-G14': 'Jackson Hts - Roosevelt Av',
							'Qs272-G20': '36 St',
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_E' },
					{ line: 'MTA NYCT_F' }
				],
			},
			{
				source: { id: '', archive: 45 },
				message: 'TRACK MAINTENANCE [R] No trains between 36 St, Brooklyn and 95 St [R] service operates between 71 Av and 36 St , Brooklyn and via the [D] to/from 9 Av, evenings . For late night service between Whitehall St and 59 St , Brooklyn',
				stations: {
					'MTA NYCT_': {
						stations: {
							'': ''
						}
					}
				},
				line: [
					{ line: 'MTA NYCT_' }
				],
			},
			/**
						{
							source: { id: '', archive: 0 },
							message: '',
							stations: {
								'MTA NYCT_': {
									stations: {
										'': ''
									}
								}
							},
							line: [
								{ line: 'MTA NYCT_' }
							],
						},
			*/
		],

	},
};

/**

All examples up to archive #55.

---NO---
- between DeKalb Av and 47-50 Sts No at 7 Av , 47-50 Sts (NO)
- No trains between Bedford-Nostrand Avs and Church Av
- trains skip 170 St, 174-175 Sts and 182-183 Sts
- trains skip 170 St and 174-175 Sts

---PROBLEMA---
-[F] service at 21 St-Queensbridge , Roosevelt Island , Lexington Av/63 St , 57, 47-50 Sts , 42 St-Bryant Pk , 34 St-Herald Sq , 23 , 14 , B'way-Lafayette Sts , 2 Av , Delancey St , East Broadway and York St.
- Buses make stops at Beach 90 , Beach 67 , Beach 60 , Beach 44 , Beach 36 , Beach 25 Sts and Mott Av .
- [6] Pelham Bay Park-bound trains skip Canal, Spring, Bleecker Sts, Astor Pl, 23, 28 and 33 Sts
- Trains stop at DeKalb Av, Jay St-MetroTech, Court, Whitehall, Rector, Cortlandt Sts and City Hall.
- [F] Trains skip Bergen St, Carroll St and Smith-9 Sts

---YES---
- [2] No Wakefield-bound service at Bronx Park East , Pelham Pkwy , Allerton , Burke Avs , 219 , 225 , 233 Sts and Nereid Av .
- [1] South Ferry-bound trains skip 238, 231, 225, 215 and 207 Sts
- [4] [6] Trains skip 116, 110, 103, 96, 77, 68 and 51 Sts in both directions
-  [6] Pelham Bay Park-bound trains skip Canal, Spring, Bleecker Sts, Astor Pl, 23, 28 and 33 Sts
- [6] Brooklyn Bridge-bound trains skip 33, 28, 23 Sts, Astor Pl, Bleecker, Spring and Canal Sts
- [A] Inwood-bound trains skip 72, 81, 86, 96, 103, 110, 116, 135, 155 and 163 Sts
- [A] Ozone Park/Far Rockaway-bound trains skip 163, 155, 135, 116, 110, 103, 96, 86, 81 and 72 Sts
- No [E] service at Queens Plaza , Court Sq-23 St , Lexington Av/53 St, 5 Av/53 St , 7 Av , 50 , 42 , 34 , 23 , 14 , Spring , Canal Sts and World Trade Center.
- No [A] [C] service at Spring , Canal , Chambers , Fulton and High Sts
- No Crown Hts-bound service at Bedford Park Blvd , Kingsbridge Rd , Fordham Rd , 183 St , 176 St , Mt Eden Av , 170 , 167 and 161 Sts
- Express trains make local stops in both directions at 33, 40, 46, 52, 69 and 74 Sts Rush Hours
- stopping at 65 St, Northern Blvd, 46, Steinway, 36 Sts
- No [G] service at Bergen , Carroll , Smith-9 Sts , 4 Av-9 St , 7 Av , 15 St-Prospect Park , Fort Hamilton Pkwy and Church Av
- [N] Astoria-bound trains make local stops at 53, 45, 36, 25 Sts, Prospect Av, 4 Av-9 St and Union St
- [N] Trains stop at 49, 28, 23, 8, Prince Sts, City Hall, Cortlandt, Rector, Whitehall, Court Sts, Jay St-MetroTech, and DeKalb Av.
- [N] Trains stop at City Hall, Cortlandt, Rector, Whitehall, Court Sts, Jay St-MetroTech, DeKalb Av, Atlantic Av-Barclays Ctr, Union St, 4 Av-9 St, Prospect Av, 25, 36, 45 and 53 Sts.
- [E] Trains stop at 36, Steinway, 46 Sts, Northern Blvd, 65 St, Roosevelt, Elmhurst, Grand Avs, Woodhaven Blvd, 63 Dr and 67 Av.
- [R] trains skip 28, 23, 8 and Prince Sts.

 */



module.exports = {
	stations,
};
