const mtaApi = require('./mta.api');
const mtaStatus = require('./mta.status');

// const mode = 'full';
const mode = 'type';


function debug(mta_status_file, cacheMinutes, testLines) {

  // Load the data.
  // Check the filesystem first.
  mtaApi.getSubwayStatus(mta_status_file, cacheMinutes)

	// Now we play with the data.
	.then((data) => {
		if (!data || data.length <= 0) {
			return Promise.reject('No data loaded from file or endpoint.');
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

				if (!text || l[line].status[0] == 'GOOD SERVICE') {
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

		console.log(stats.ok, 'are good.');
	})

	// Catch an errors from API load or 
	.catch(err => console.error('Problem using API data. ', err));
}

module.exports = {
	debug
};