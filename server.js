var express = require('express');
var app = express();
var server = require('http').createServer(app);
var status_debug = require('./mta.debug').debug;

const mta_status_file = "mta_status";

const mtaApi = require('./mta.api');
const mtaStatus = require('./mta.status');

const cacheMinutes = 15;

const testLines = [
 'ACE',
 'BDFM',
 'JZ',
 'NQR',
 'G',
 'L',
 '123',
 '456',
 '7',
 'S',
 'SIR',
];


// Display a short summary of the current status on the console at startup.
status_debug(mta_status_file, cacheMinutes, testLines);


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/subway/status', function(req, resp, next) {
  console.log('List time!');

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
			stats.ignored = [];
			stats.line = {};

			for (let o in data.service.subway[0]) {
				for (let line in data.service.subway[0].line) {
					let l = data.service.subway[0].line;

					if (testLines && testLines.indexOf(l[line].name[0]) === -1) {
						console.log(' <!> --- Bypassing Line: ', l[line].name[0]);
						stats.ignored.push(l[line].name[0]);
						continue;
					} 

					let text = mtaStatus.parseLineStatus(l[line].name[0], l[line].status[0], l[line].text);

					
					stats.line[l[line].name[0]] = text;
				}
			}


			resp.json(stats);
		});
});

server.listen('8383');