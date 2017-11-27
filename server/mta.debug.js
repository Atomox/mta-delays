const mtaApi = require('./mta.api');
const mtaStatus = require('./mta.status.xml');

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



//		console.log(data.Siri.ServiceDelivery[0].SituationExchangeDelivery[0].Situations[0].PtSituationElement);
//		return;

		const t = data.Siri.ServiceDelivery[0].SituationExchangeDelivery[0].Situations[0].PtSituationElement;


		let text = mtaStatus.parseStatusFeed(t);	

		return;

		for (let o in t) {

			console.log(t[o].CreationTime[0], ' -- #', t[o].SituationNumber[0].trim());
			console.log('PublicationWindow', t[o].PublicationWindow[0]);
			console.log('Summary', t[o].Summary[0]);
			console.log('Description', t[o].Description[0]);
			console.log('Source', t[o].Source[0]);
			console.log('Affects', t[o].Affects[0].VehicleJourneys[0].AffectedVehicleJourney);
			console.log('Consequences', t[o].Consequences[0]);
			console.log('--------------------------------');


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

		console.log(stats.ok, 'are good.');
	})

	// Catch an errors from API load or 
	.catch(err => console.error('Problem using API data. ', err));
}

module.exports = {
	debug
};