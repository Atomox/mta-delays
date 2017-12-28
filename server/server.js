var express = require('express');
var app = express();
var server = require('http').createServer(app);
var status_debug = require('./mta.debug').debug;

const mtaApi = require('./mta.api');
const mtaStations = require('./mta.stations');
const mtaStatus = require('./mta.event');

// File where we'll store things. No extension, please.
const mta_status_file = './data/mta_status';

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