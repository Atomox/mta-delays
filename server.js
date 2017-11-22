
// MTA Status endpoint.
const url = "http://web.mta.info/status/serviceStatus.txt";
const mta_status_file = "mta_status";

const mtaApi = require('./mta.api');
const mtaStatus = require('./mta.status');

const cacheMinutes = 15;

const testLines = [
// 'ACE',
// 'BDFM',
// 'JZ',
 'NQR',
// 'G',
 'L',
// '123',
 '456',
// '7',
];

// const mode = 'full';
const mode = 'type';

// Load the data.
// Check the filesystem first.
mtaApi.loadStatusFromFile(mta_status_file + '.json', 'json')

	// Make sure data is fresh.
	.then((results) => (mtaApi.checkFreshnessDate(results.service.timestamp[0], cacheMinutes) === true)
		? Promise.resolve(results)
		: Promise.reject('Refresh data, please.'))

	// If we couldn't get it, load from mta.info's API.
	.catch(err => mtaApi.getLocation(url, mta_status_file))

	// Catch an errors from API load or 
	.catch(err => console.error('Problem after loading API data. ', err))

	// Now we play with the data.
	.then((data) => {
		if (!data || data.length <= 0) {
			return Promise.reject('No data loaded from file or endpoint.');
		}

		// Let's play!
		for (let o in data) {
			console.log(o, ' ->', data[o]);
		}

		let stats = new Object;
		stats.ok = [];

		for (let o in data.service.subway[0]) {
			for (let line in data.service.subway[0].line) {
				let l = data.service.subway[0].line;

				if (testLines && testLines.indexOf(l[line].name[0]) === -1) {
					console.log(' <!> --- Bypassing Line: ', l[line].name[0]);
					continue;
				} 

				let text = mtaStatus.parseLineStatus(l[line].name[0], l[line].status[0], l[line].text);

				if (!text) {
					stats.ok[l[line].name[0]] = l[line].name[0];
				}
				else {
					console.log("\n\n", l[line].name[0], ' ... ', l[line].status[0], ' -- ');
					
					if (mode == 'type' && text['text']) {
						for (let i in text['text']) {
							if (typeof text['text'][i].type == 'undefined') {
								console.warn("\t -- [", t, ' -> ', i, ']', text['text'][i]);
							}

							if (['ServiceChange', 'Delay'].indexOf(text['text'][i].type) !== -1) {
								console.warn("\t -- ", text['text'][i].type, '|', text['text'][i].type_detail, '--', text['text'][i].message);	
							}
							else {
								console.log("\t -- ", text['text'][i].type);
							}
						}
					}
					else {
						for (let t in text) {						
							console.log("\t -- ", text[t]);	
						}	
					}
				}
			}
		}
	})

	// Catch an errors from API load or 
	.catch(err => console.error('Problem using API data. ', err));
