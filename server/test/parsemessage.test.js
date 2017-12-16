var assert = require('assert');

var mtaStatus = mtaStatus || require('../mta.status.xml');

describe('Parse Service Messages', function() {

	let myObj = [
		{
			type: 'ServiceChange',
			type_detail: null,
			time: 'Posted: 11/25/2017 7:12PM',
			durration: null,
			message: 'Some northbound [N] trains are stopping on the [Q] line from <STRONG>57 St-7 Av</STRONG> and end at <STRONG>96 St.</STRONG> Some northbound [R] trains are stopping on the [Q] line from <B>57 St-7 Av</B> to <B>Lexington Av-63 St</B>, then over the [F] line from <B>Lexington Av-63 St</B> to <B>Jackson Heights-Roosevelt Av.</B> This service change is because of a train with mechanical problems at <B>5 Av-59 St.</B> Expect delays in [F][N][Q][R] train service.',
		},
		{
			type: 'Delays',
			type_detail: null,
			time: 'Posted: 11/15/2017 12:22PM',
			durration: null,
			message: ' [2], [3], [4] and [5] trains are running with delays in both directions because of signal maintenance at <STRONG>Eastern Pkwy-Brooklyn Museum.</STRONG>',
		},
		{
			type: 'PlannedWork',
			type_detail: null,
			time: '',
			durration: 'All times, Monday to Friday, Dec 4 - 8 Dec 11 - 15',
			message: 'TRACK & TRACK PLATE INSTALLATION, REPLACEMENT OF POWER & COMMUNICATION CABLES [2] [3] Trains run at reduced speed through the Clark St Tunnel between Manhattan and Brooklyn All times, Monday to Friday, Dec 4 - 8 Dec 11 - 15 The slower speed will keep everyone safe as our crews make critical repairs to the tunnel. Please allow additional travel time.',
		},
		{
			type: 'PlannedWork',
			type_detail: null,
			time: '',
			durration: 'Weekend Until Summer 2018',
			message: 'Weekend [2] [3] station closures and route changes Until Summer 2018 -- No service at Park Place, Wall St, Clark St and Hoyt St; use nearby [4] [5] stations No [2] [3] service between Manhattan and Brooklyn; take the [4] or [5] instead.',
		},

	];

	let interupt_msg = [
		'<span class="TitleDelay">Delays</span> <span class="DateStyle">Posted: 11/25/2017 7:12PM</span> Some northbound [N] trains are stopping on the [Q] line from <STRONG>57 St-7 Av</STRONG> and end at <STRONG>96 St.</STRONG> Some northbound [R] trains are stopping on the [Q] line from <B>57 St-7 Av</B> to <B>Lexington Av-63 St</B>, then over the [F] line from <B>Lexington Av-63 St</B> to <B>Jackson Heights-Roosevelt Av.</B> This service change is because of a train with mechanical problems at <B>5 Av-59 St.</B> Expect delays in [F][N][Q][R] train service.',
		'<span class="TitleDelay">Delays</span> <span class="DateStyle"> Posted: 11/15/2017 12:22PM  </span> [2], [3], [4] and [5] trains are running with delays in both directions because of signal maintenance at <STRONG>Eastern Pkwy-Brooklyn Museum.</STRONG>',
		'<b>TUNNEL RECONSTRUCTION</b> Weekend [2] [3] station closures and route changes Until Summer 2018 -- No service at Park Place, Wall St, Clark St and Hoyt St; use nearby [4] [5] stations No [2] [3] service between Manhattan and Brooklyn; take the [4] or [5] instead. Weekend service map for Lower Manhattan and Downtown Brooklyn New timetables with Weekend Route Changes | [2] pdf | [3] pdf | [4] pdf | [5] pdf',
		'SCHEDULED MAINTENANCE  [SIR] Trains board at the Tottenville-bound platform from Arthur Kill to Prince\'s Bay Stations Days, 9 AM to 3 PM, Mon to Fri, Nov 27 - Dec 1   Boarding change includes  Arthur Kill ,  Richmond Valley ,  Pleasant Plains  and     Prince\'s Bay Stations .',
	];



	describe('Parse Interruption Dates', () => {

		it ('Should Parse basic Posted dates from service interruptions.', () => {
			for (let x in interupt_msg) {
				if (myObj[x].type === 'PlannedWork') { continue; }

				let result = mtaStatus.getMessageDateTime(interupt_msg[x]);

				assert.equal(myObj[x].time, result);
			}
		});
	});

	describe('Parse Planned Work Dates', () => {

// TRACK REPLACEMENT  [A] Trains replace the [S] Rockaway Park Shuttle Days, 9:30 AM to 4 PM, Mon to Fri, Dec 11 - 15    Dec 18 - 22    [A]  trains make all  [S]  stops between Broad Channel and Beach 116 St.

		let status_dates = {
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
			}
		};


		it ('Should Parse basic [weekdays] planned work dates.', function() {
			for (let x in status_dates.weekdays.simple) {
				let result = mtaStatus.getMessagePlannedWorkDate(status_dates.weekdays.simple[x]);
				assert.equal(status_dates.weekdays.simple[x], result);
			}
		});

		it ('Should Parse basic [weekend] planned work dates.', function() {
			for (let x in status_dates.weekend.simple) {
				let result = mtaStatus.getMessagePlannedWorkDate(status_dates.weekend.simple[x]); 
				assert.equal(status_dates.weekend.simple[x], result);
			}
		});

		it ('Should Parse [multi-weekend] planned work dates.', function() {
			for (let x in status_dates.weekend.multiweekend) {
				let result = mtaStatus.getMessagePlannedWorkDate(status_dates.weekend.multiweekend[x]); 
				assert.equal(status_dates.weekend.multiweekend[x], result);
			}
		});

		it ('Should Parse complex planned work dates.', function() {
			for (let x in status_dates.weekend.complex) {
				let result = mtaStatus.getMessagePlannedWorkDate(status_dates.weekend.complex[x]); 
				assert.equal(status_dates.weekend.complex[x], result);
			}
		});

		it ('Should Parse [multi-weekday] planned work dates.', function() {
			for (let x in status_dates.weekdays.multiweek) {
				let result = mtaStatus.getMessagePlannedWorkDate(status_dates.weekdays.multiweek[x]); 
				assert.equal(status_dates.weekdays.multiweek[x], result);
			}
		});

		it ('Should Parse long-term planned work dates.', function() {
			for (let x in status_dates.longterm.simple) {
				let result = mtaStatus.getMessagePlannedWorkDate(status_dates.longterm.simple[x]); 
				assert.equal(status_dates.longterm.simple[x], result);
			}
		});

	});

	describe('Parse Event Messages', () => {

		it ('Should Parse simple unplanned event messages.', function() {
//			assert.equal(status_dates.longterm.simple[x], result);
		});

		it ('Should Parse complex unplanned event messages.', function() {
//			assert.equal(status_dates.longterm.simple[x], result);
		});

		it ('Should Parse service change event messages.', function() {
//			assert.equal(status_dates.longterm.simple[x], result);
		});

	});


	describe('Parse Event Messages', () => {

		it ('Should Parse simple planned event messages.', function() {
//			assert.equal(status_dates.longterm.simple[x], result);
		});

		it ('Should Parse complex planned event messages.', function() {
//			assert.equal(status_dates.longterm.simple[x], result);
		});

		it ('Should Parse service change event messages.', function() {
//			assert.equal(status_dates.longterm.simple[x], result);
		});

	});

	let status_msg = {
		unplanned: {
			simple: [
				// Police Activity
				'Southbound [1] trains are running express from 96 St to 42 St because of NYPD activity 86 St.',

				// Running Local // Signal Problems
				'Southbound [E] and [F] trains are running local from Forest Hills-71 Av to Jackson Hts-Roosevelt Av because of signal problems at Forest Hills-71 Av.',
				'[R] trains are running with delays in both directions because of signal problems between 86 St and Bay Ridge-95 St.',

				'There is limited [A] train service between 168 St and Inwood-207 St in both directions because of a rail condition at 190 St.',

				// Terrorism / Incident
				'[1] [2] [3] [N] [R] [Q] [W] and [7] trains are bypassing Times Sq-42 St in both directions, [A] [C] and [E] trains are bypassing 42 St/Port Authotiy.',
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

				// Service Ends Early
				'TRACK MAINTENANCE [5] Service ends early between E 180 St and Bowling Green [2] [4] trains provide alternate service',

				// Rerouted
				'SIGNAL MAINTENANCE [A] Trains run via the [F] in both directions between W 4 St and Jay St-MetroTech [E] and [J] trains provide alternate service',
				'SIGNAL MAINTENANCE [C] Trains run via the [F] in both directions between W 4 St and Jay St-MetroTech [E] and [J] trains provide alternate service',

				// No Service Parital
				'TRACK MAINTENANCE [G] No trains between Bedford-Nostrand Avs and Church Av [F] trains and [SB] free shuttle buses provide alternate service',
				'FASTRACK PROGRAM [N] No trains in Manhattan [Q] Trains are rerouted in Manhattan [R] Service ends early in Manhattan and Queens',
				'TRACK MAINTENANCE [R] No trains running [4] [E] [M] [N] trains and [SB] free shuttle buses provide alternate service',

				// Special
				'TRACK REPLACEMENT  [A] Trains replace the [S] Rockaway Park Shuttle Days, 9:30 AM to 4 PM, Mon to Fri, Dec 11 - 15    Dec 18 - 22    [A]  trains make all  [S]  stops between Broad Channel and Beach 116 St.',
				],
			}
		};
});