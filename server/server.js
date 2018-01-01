var express = require('express');
var app = express();
var server = require('http').createServer(app);

const mtaApi = require('./svc/mta/subway/mta.api');
const mtaStations = require('./mta.stations');
const mtaStatus = require('./mta.event');

// File where we'll store things. No extension, please.
const mta_status_file = './data/generated/mta_status.cache';

// How long before we refresh the feeds?
const cacheMinutes = 1;

const port = 8100;


// Allow other domains to access us. (Prepare for mingling)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/', (req,resp, next) => {

	resp.json(
	{
		title: 'Ladies and Gentleman, after an earlier incident...',
		author: {
			name: 'Ben Helmer',
			www: {
				mta: 'nyc.bhelmer.com',
				related: 'subway.bhelmer.com',
				photography: 'benhelmer.com',
				github: 'https://github.com/Atomox',
			},
		},
		project: {
			title: 'MTA Smart-ish Status',
			description: 'Parsed data, combined with custom-created data, to generate better status updates.',
			repo: 'https://github.com/Atomox/mta-delays',
			license: 'Use of the status app is free. Use of these APIs is forbidden without express written permission from Ben Helmer. Not for commercial use.',
			disclaimer: 'This app is automated, heavily parsed data. It is based partly on the offical MTA feeds, but no longer official data. It may not always be accurate, but I am working on it! Do not stake your monitary, health or well being on the accuracy of this app!',
			contact: 'atomox@gmail.com',
			note: 'I want this app to help people, and am open to helping for-the-greater-good causes and developers. Reach out if that might be you!',
		},
		status: true,
		endpoints: {

			'/subway/status': {
				type: 'parsed data from mta.info interruption feeds.',
				frequency: 'upon request, but updated no more than once per minute.',
			},
			'/subway/stations/::boro::': {
				type: 'Station info, optionally per boro',
				frequency: 'static',
				values: 'see boros below',
			},
			'/subway/lines/boro/::boro::': {
				type: 'Stations, ordered by branch (named stretch of track)',
				examples: 'Astoria (Qs), Broadway - Brighton (Mn & Bk), 8th Av - Fulton St (Mn), Concourse (Mn & Bx)',
				frequency: 'static',
				values: 'see boros below',
			},
			'/subway/lines/train/::train::': {
				type: 'Stations, ordered by branch (named stretch of track), for ONLY the requested train.',
				examples: 'N, Q, R, T',
				values: 'see trains below',
			},
			'/subway/lines/::train::/route': {
				type: 'Stations for ONLY the requested train, in order from North to South, or Outter to Manhattan (SIR, L, 7, J, Z)',
				examples: 'A, D, L, Z',
				values: 'see trains below',
			},
			'/subway/lines/::train::/route/array': {
				type: 'BASIC Key/Value OBJECT of Stations for ONLY the requested train, like above, but only KEY => Name. In train order, meaning the next item in the list will be the next station for that line, with rare exceptions for branch lines (I\'m looking at you, A-line!)',
				examples: 'A, D, L, Z',
				values: 'see trains below',
			},
		},
		trains: [
			'1', '2', '3', '4', '5', '6', '7', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'J', 'L', 'M', 'N', 'Q', 'R', 'S', 'T', 'W', 'Z', 'SIR'
		],
		boros: [
			'Mn', 'Qs', 'Bk', 'Bx', 'SI'
		],
	});
});

app.get('/subway/status', (req, resp, next) => {

	// Load the data.
	// Check the filesystem first.
	mtaApi.getSubwayStatus(mta_status_file, cacheMinutes)

		// Now we play with the data.
		.then(data => (!data || data.length <= 0) ? Promise.reject('No data loaded from file or endpoint.') : data) 
		.then(data => mtaStatus.checkReports(data))
		.then(data => mtaStatus.parseStatusFeed(data))
		.then(data => resp.json(data))
		.catch(err => handleRequestError(req,resp, err, 'Error fetching normal subway status.'));
});

app.get('/subway/stations/:boro?', (req, resp, next) => {

	mtaStations.getStations(req.params.boro)
		.then(data => resp.json(data))
		.catch(err => handleRequestError(req,resp, err, 'Error fetching stations'));
});

app.get('/subway/lines/boro/:boro?', (req, resp, next) => {

	mtaStations.getStationLines(req.params.boro)
		.then(data => resp.json(data))
		.catch(err => handleRequestError(req,resp, err, 'Error fetching stations'));
});

app.get('/subway/lines/train/:train?', (req, resp, next) => {

	mtaStations.getStationLines(null, req.params.train)
		.then(data => resp.json(data))
		.catch(err => handleRequestError(req,resp, err, 'Error fetching stations'));
});

app.get('/subway/lines/:train/route', (req, resp, next) => {
	mtaStations.getTrainRoute(req.params.train)
		.then(data => (data === false) ? 'unavailable' : data )
		.then(data => resp.json(data))
		.catch(err => handleRequestError(req,resp, err, 'Error fetching train route'));
});

app.get('/subway/lines/:train/route/array', (req,resp,next) => {
	mtaStations.getRouteStationsArray(req.params.train)
		.then(data => (data === false) ? 'unavailable' : data )
		.then(data => resp.json(data))
		.catch(err => handleRequestError(req,resp, err, 'Error fetching train route'));
});


/**
 * Handle any catchs in Promise chains, and provide API error response.
 * 
 * @param {Object} req
 * @param {Object} resp
 * @param {String} err
 *   Error to be logged internally (not shared to user).
 * @param {String} msg
 *   Message to the user.
 */
function handleRequestError(req,resp, err, msg) {
	console.warn(msg, ':', err);
	resp.json({
		msg: msg,
		status: false,
	});
}


server.listen(port);