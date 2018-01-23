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
/**
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
*/
		],
	},
};


module.exports = {
	stations,
};
