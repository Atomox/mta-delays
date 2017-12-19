var express = require('express');
var app = express();
var server = require('http').createServer(app);
var status_debug = require('./mta.debug').debug;

const mtaApi = require('./mta.api');
const mtaStations = require('./mta.stations');
const mtaStatus = require('./mta.status.xml');

// File where we'll store things. No extension, please.
const mta_status_file = './data/mta_status';
const mta_stations_file = './data/mta.stations.final';

// How long before we refresh the feeds?
const cacheMinutes = 1;

const port = 8100;

// Display a short summary of the current status on the console at startup.
// status_debug(mta_status_file, cacheMinutes, testLines);

// Allow other domains to access us. (Prepare for mingling)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/subway/status', (req, resp, next) => {

	// Load the data.
	// Check the filesystem first.
	mtaApi.getSubwayStatus(mta_status_file, cacheMinutes)

	// Now we play with the data.
	.then((data) => {

		if (!data || data.length <= 0) {
			return Promise.reject('No data loaded from file or endpoint.');
		}

		const t = data.Siri.ServiceDelivery[0].SituationExchangeDelivery[0].Situations[0].PtSituationElement;
		let statusArray = mtaStatus.parseStatusFeed(t);
		
		resp.json(statusArray);	
	});
});

app.get('/subway/stations/:boro?', (req, resp, next) => {

	mtaStations.getStations(mta_stations_file, req.params.boro)
	
	.then(data => resp.json(data))
	.catch(err => console.warn('Error fetching stations: ', err));
});

app.get('/subway/lines/boro/:boro?', (req, resp, next) => {

	mtaStations.getStationLines(mta_stations_file, req.params.boro)
	
	.then(data => resp.json(data))
	.catch(err => console.warn('Error fetching stations: ', err));
});

app.get('/subway/lines/train/:train?', (req, resp, next) => {

	mtaStations.getStationLines(mta_stations_file, null, req.params.train)
	
	.then(data => resp.json(data))
	.catch(err => console.warn('Error fetching stations: ', err));
});

/**
app.get('/subway/status/*', function(req, resp, next) {

	// Load the data.
	// Check the filesystem first.
	mtaApi.getSubwayStatus(mta_status_file, cacheMinutes)

		// Now we play with the data.
		.then((data) => {

			if (!data || data.length <= 0) {
				return Promise.reject('No data loaded from file or endpoint.');
			}

			// Basic structure of our response-to-be.
			let stats = new Object;
			stats.ok = [];
			stats.ignored = [];
			stats.line = {};

			// Deal with all the nesting.
			for (let o in data.service.subway[0]) {
				for (let line in data.service.subway[0].line) {
					let l = data.service.subway[0].line;

					// Are we ignoring this line?
					if (testLines.indexOf(l[line].name[0]) === -1) {
						stats.ignored.push(l[line].name[0]);
						continue;
					} 

					// Properly format our line status.
					let text = mtaStatus.parseLineStatus(l[line].name[0], l[line].status[0], l[line].text);

					// Add the formatted line data to our results.
					stats.line[l[line].name[0]] = text;
				}
			}

			// JSON-ify and respond.
			resp.json(stats);
		});
});
*/

server.listen(port);