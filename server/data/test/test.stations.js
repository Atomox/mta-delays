let stations = {
	names: {
		hyphen: {
			'Times Sq-42 St': 'Times Sq - 42 St',
			'Bay Ridge-95 St': 'Bay Ridge- 95 St.',
			'Lexington Av-63 St': 'Lexington Av-63 St.',
			'Jackson Heights-Roosevelt Av': 'Jackson Heights - Roosevelt Av.',
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
			'59 St':'5 Av/59 St',
			'4Av-9th St': '4Av',
			'Queens Plaza': 'Queensboro Plaza',
		},
		nomDePlume: {
			'Jackson Hts - Roosevelt Av': 'Jackson Heights-Roosevelt Av',
		},
	},
};


module.exports = {
	stations,
};