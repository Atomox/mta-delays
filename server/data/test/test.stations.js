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
			'36 St (Qns)': '36 St',
			'59 St':'5 Av/59 St',
			'4Av-9th St': '4Av',
			'Queens Plaza': 'Queensboro Plaza',
		},
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
							'Bk359-247': 'Flatbush Av - Brooklyn College'
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
							'Mn143-A02': 'Inwood - 207 St',
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
	},
};


module.exports = {
	stations,
};
