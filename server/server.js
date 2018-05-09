var express = require('express');
var app = express();
var server = require('http').createServer(app);

const _ = require('lodash');
const moment = require('moment');

const mtaApi = require('./svc/mta/subway/mta.api');
const mtaStations = require('./mta.stations');
const mtaStatus = require('./mta.event');
const mtaFile = require('./includes/fileManage');

// File where we'll store things. No extension, please.
const mta_status_file = './data/generated/mta_status.cache';
const cached_parse_file = './data/generated/mta_status.final.cache';
const root_json = require('./data/root_response');
const archive = require('./data/archive/archive');


// How long before we refresh the feeds?
const cacheMinutes = 2;


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
		console.log(' -- [', 'Requesting archive: ', req.params.id, '] --');

		if (archive.archive_status.files[req.params.id]) {
			req_file = archive.archive_status.path + archive.archive_status.files[req.params.id];
			my_cache_time = false;
		}
	}

	console.log(' -- [', 'Serving request from file: ', req_file, ', with cache: ' + my_cache_time + '] --');

  let target_file = (req_file) ? req_file + '.json' : cached_parse_file;

	// Load the data.
	// Check the filesystem first.
	mtaFile.loadStatusFromFile(target_file, 'json')
    // Check freshness of cache.
    .then(data => (data.timestamp
      && mtaFile.checkFreshnessDate(data.timestamp, my_cache_time))
        ? data
        : false )

    // If stale, rebuild.
    .then(data => {
      if (data === false) {
        console.log(' (!) Reparsing Status.');
      }
      else {
        console.log(' (+) Using Cached Data.', data.status);
      }

      return (data !== false)
        ? { data: data }
        : mtaApi.getSubwayStatus(req_file, my_cache_time)
            // Now we play with the data.
            .then(data => (!data || data.length <= 0) ? Promise.reject('No data loaded from file or endpoint.') : data)
            .then(data => mtaStatus.checkReports(data))
            .then(data => mtaStatus.parseStatusFeed(data))
            .then(data => addResponseInfo(data, req))

            // Handle post-play caching.
            .then(data =>  (my_cache_time)
              ? mtaFile.cacheJsonResponse(data, cached_parse_file)
              : { data: data });
    })

    // Serve the file, or handle errors.
		.then(data => resp.json(data.data))
		.catch(err => handleRequestError(req,resp, err, 'Error fetching normal subway status.'));



});

function addResponseInfo(data, req) {
  data.archive = {};
  data.archive.detail = (archive.archive_status.files[req.params.id])
    ? archive.archive_status.files[req.params.id]
    : null;
  data.archive.id = req.params.id;

  data.summary = {
    count: data.events.length,
    lines: [],
  };

  function getLines(interrupted, planned) {
    let result = getEvents(interrupted, planned);

    return (result && result.length > 0)
      ? _.uniq(
        result.map( e => _.uniq(e.line.map( l => mtaStations.getTrainById(l.line))) )
        .reduce( (c, i) => c = _.union(c, i) )).sort()
      : [];
  }

  function getEvents(interrupted, planned) {
    return (data.events && data.events.length > 0)
      ? data.events
        .filter(e => (!interrupted || (interrupted && !e.planned)))
        .filter(e => (!planned || (planned && e.planned)))
      : [];
  }
  function getEventTime(time) {
    let hour = moment(time).format('H'),
      day = moment(time).format('d'),
      rush_hour = ((hour > 7 && hour < 10) || hour > 15 && hour < 19),
      period = (hour < 5 || hour > 21)
        ? 'Late Night'
        : (hour >= 5 && hour <= 11)
          ? 'Morning'
          : (hour >= 12 && hour <= 16)
            ? 'Afternoon'
            : (hour >= 17)
              ? 'Evening'
              : 'Unknown';

    return {
      time_of_day: period,
      rush_hour: rush_hour,
      weekend: (day === 0 || day === 6) ? true : false
    }
  }

  data.summary.lines = getLines();
  data.summary.interrupted_lines = getLines(true, false);
  data.summary.planned_work_lines = getLines(false, true);
  data.summary.planned_events = getEvents(false, true).length;
  data.summary.unplanned_events = getEvents(true, false).length;
  data.summary.time = (data.events[0].date) ? getEventTime(data.events[0].date.fetched) : null;

  return data;
}

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
