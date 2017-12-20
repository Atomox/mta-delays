var assert = require('assert');

var mtaStatus = mtaStatus || require('../mta.status.xml');

describe('Parse Stations', function() {

	let r_train_msg = [
/*
		{
			stations: ['57 St-7 Av', '5 Av-59 St.', '96 St.', 'Lexington Av-63 St', 'Jackson Heights-Roosevelt Av.'],
			station_ids: [],
			message: 'Some northbound [N] trains are stopping on the [Q] line from <STRONG>57 St-7 Av</STRONG> and end at <STRONG>96 St.</STRONG> Some northbound [R] trains are stopping on the [Q] line from <B>57 St-7 Av</B> to <B>Lexington Av-63 St</B>, then over the [F] line from <B>Lexington Av-63 St</B> to <B>Jackson Heights-Roosevelt Av.</B> This service change is because of a train with mechanical problems at <B>5 Av-59 St.</B> Expect delays in [F][N][Q][R] train service.',
		},
*/
		{
			stations: ['53 St', '45 St', '25 St', 'Prospect Av', '4 Av-9 St', 'Union St'],
			station_ids: ['Bk34', 'Bk33', 'Bk31', 'Bk30', 'Bk608', 'Bk28'],
			message: 'PRIORITY REPAIRS [R] Manhattan-bound trains skip 53 St, 45 St, 25 St, Prospect Av, 4 Av-9 St and Union St',
		},
		{
			stations: ['86 St', 'Bay Ridge-95 St.'],
			station_ids: ['Bk38', 'Bk39'],
			message: '[R] trains are running with delays in both directions because of signal problems between 86 St and Bay Ridge-95 St.',
		},
		{
			stations: ['DeKalb Av', 'Canal St'],
			station_ids: [],
			message: 'SIGNAL MAINTENANCE [R] Trains run via the [Q] in both directions between DeKalb Av and Canal St',
		},
	];

	describe('Parse Stations in R Line', () => {

		it ('Should Identify stations in a message on the R Line.', () => {
			r_train_msg.map( (value, i) => {

				// Get all stations on the R line.

				/**
				 


					@TODO




					*
					*
					*
					*
					*
					*
					*
					*
					*
					*
					* 







				 */

				let result = mtaStatus.getMessageDateTime(interupt_msg[x]);

				assert.equal(myObj[x].time, result);
			}
		});
	});
});