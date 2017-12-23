let dateMessages = {
	weekend: {
		simple: [
			'Weekend, 9:45 PM Fri to 5 AM Mon, Nov 24 - 27',
			'Weekend, 10 PM Fri to 5 AM Mon, Nov 24 - 27',
			'Weekend, 3:45 AM Sat to 10 PM Sun, Nov 25 - 26',
			'Weekend , Saturday and Sunday, Nov 25 - 26',
			'Weekend , Saturday and Sunday , Nov 25 - 26',
			'Weekend, 12:15 AM Sat to 4:30 AM Mon, Nov 18 - 20',
			'Weekend, 7 AM to 7 PM, Sat and Sun, Nov 18 - 19',
		],
		multiweekend: [
			'Weekends, 11:15 PM Fri to 5 AM Mon, Nov 24 - 27 &bull; Dec 1 - 4',
			'Weekend, 7:30 AM to 7 PM, Saturday, Nov 25 9:30 AM to 7 PM, Sunday, Nov 26',
			'Weekend, 3:45 AM Sat to 10 PM Sun, Nov 25 - 26',
			'Weekends, 11:30 PM Fri to 5 AM Mon, Nov 24 - 27  &bull;  Dec 1 - 4',
			'Weekends, 11:15 PM Fri to 5 AM Mon, until Dec 18',
		],
		complex: [
			'Weekend, 7:30 AM to 7 PM, Saturday, Nov 25 9:30 AM to 7 PM, Sunday, Nov 26',
		],
		unique: [
			'Until Summer 2018 including Dec 25, 2017 and Jan 1, 2018',
			'Weekends & Holidays , Dec 25, 2017 & Jan 1, 2018',
		],
	},
	weekdays: {
		simple: [
			// Days
			'Days, 9 AM to 3 PM, Mon to Fri, Nov 27 - Dec 1',
			'Days, 9 AM to 3 PM, Mon to Fri, Dec 11 - 15',

			// Late Night
			'Late Nights, 11 PM to 5 AM, Mon to Fri, Dec 4 - 8',
			'Late Nights, 11 PM to 5 AM, Mon to Wed, Dec 4 - 6',
			'Late Nights, beginning at 10 PM, Mon to Thu, Dec 4 - 7',
			'Late Nights, 9:45 PM Tue to 5 AM Wed, Dec 5 - 6',
			'Late Nights, 9:45 PM to 5 AM, Mon to Fri, until Dec 15',
			'Late Night, 9:45 PM Tue to 5 AM Wed, Dec 19 - 20',

			// Evenings & Late Evenings
			'Evenings, Mon to Thu, Dec 4 - 7',
			'Evenings, 8:30 PM to 11:59 PM, Mon to Thu, Dec 4 - 7',
			'Late Evenings, 11 PM to 11:59 PM, Mon to Thu, Dec 4 - 7',
			'Late Evenings, beginning 10 PM, Mon to Thu, Dec 4 - 7',
		],
		multiweek: [
			'All times, Monday to Friday, Dec 4 - 8    Dec 11 - 15',
			'Days, 9:45 AM to 3:30 PM, Mon and Tue, Dec 11 - 12    Mon to Fri, Dec 18 - 22    Tue to Fri, Dec 26 - 29',
			'Days, 9:30 AM to 4 PM, Mon to Fri, Dec 11 - 15    Dec 18 - 22',
			'Late Nights, 9:45 PM to 5 AM, Mon to Fri, Dec 4 - 8    Dec 11 - 15',
		],
		complex: [],
	},
	longterm: {
		simple: [
			'Until Saturday, Jan 6, 2018',
			'All Times Until Summer 2018',
			'Until Spring 2018',
			'Until further notice',
			'Until 11:59 PM Sun, Nov 26',
		],
		unique: [
			'Weekend ... Until Summer 2018 including Dec 25, 2017 and Jan 1, 2018',
		],
	},
	spellingErrors: [
		'Late Evenng, 9:45 PM to 11 PM, Friday, Dec 22',
	],
};


module.exports = {
	dateMessages
};