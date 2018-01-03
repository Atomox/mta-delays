var express = require('express');
var app = express();
var server = require('http').createServer(app);

const mtaApi = require('./svc/mta/subway/mta.api');
const mtaStations = require('./mta.stations');
const mtaStatus = require('./mta.event');

// File where we'll store things. No extension, please.
const mta_status_file = './data/generated/mta_status.cache';
const root_json = require('./data/root_response');
const archive = require('./data/archive/archive');


// How long before we refresh the feeds?
const cacheMinutes = 1;

const port = 8100;


// Allow other domains to access us. (Prepare for mingling)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// API Welcome Screen
app.get('/', (req,resp, next) => {	resp.json(root_json); 	});

// Subway Status Main App Endpoint
app.get(['/subway/status', '/subway/status/archive/:id'], (req, resp, next) => {

	console.log('\n');
	console.log(' -- [', 'Request: ', req.url, '] --');
	let my_cache_time = cacheMinutes;

	let req_file = mta_status_file;
	if (typeof req.params.id !== 'undefined') {
		console.log('Requesting archive: ', req.params.id);
		console.log(archive.archive_status);
		if (archive.archive_status.files[req.params.id]) {
			req_file = archive.archive_status.path + archive.archive_status.files[req.params.id];
			my_cache_time = false;
		}
	}

	console.log(' -- [', 'Serving request from file: ', req_file, ', with cache: ' + my_cache_time + '] --');

	// Load the data.
	// Check the filesystem first.
	mtaApi.getSubwayStatus(req_file, my_cache_time)

		// Now we play with the data.
		.then(data => (!data || data.length <= 0) ? Promise.reject('No data loaded from file or endpoint.') : data) 
		.then(data => mtaStatus.checkReports(data))
		.then(data => mtaStatus.parseStatusFeed(data))
		.then(data => resp.json(data))
		.catch(err => handleRequestError(req,resp, err, 'Error fetching normal subway status.'));
});


app.get('/subway/status/archive', (req, resp, next) => {
	let list = archive.get_archive_list();

	resp.json({
		message: 'Here are available archives. Pass their ID to the endpoint',
		endpoint: '/subway/status/archive/::ID_HERE::',
		archives: list.list,
	});
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