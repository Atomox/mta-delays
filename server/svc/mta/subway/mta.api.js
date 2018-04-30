// Require axios for ASYNC GET requests.
const axios = require('axios');

// Require FileStream library for read/write.
const fs = require('fs');

const mtaFile = require('../../../includes/fileManage');


// MTA Status endpoint.
// const url = "http://web.mta.info/status/serviceStatus.txt";
const url = "http://web.mta.info/status/ServiceStatusSubway.xml";




/**
 *
 *
 *  @TODO
 *
 *    Parse this in order to plan future dates.
 *
 *
 *
 *
 *
 *
 *
 */
const future_url = 'http://travel.mtanyct.info/serviceadvisory/routeStatusResult.aspx'
		+ '?tag=ALL&date='
		+ '12/31/2017'
		+ '&time='
		+ '&method=getstatus4';

/**
 * Get the latest, return it, and store it in a local file.
 *
 * @param  {string} mta_status_file
 *   A filename where we should store (cache) our request.
 * @param  {int} cacheMinutes
 *   How many minutes old can we use this data for before refreshing?
 *   Note: If [false], this will be ignored, and data will not be refreshed.
 *
 * @return {object}
 *   The Subway status in a data object. Not cleaned or restructured!
 */
function getSubwayStatus (mta_status_file, cacheMinutes) {

	return new Promise ( (resolve, reject) => {

		if (mta_status_file.indexOf('.json') !== -1) {
			console.warn('JSON extension already in file name!');
		}

		loadStatusFromFile(mta_status_file + '.json', 'json')

			// results.Siri.ServiceDelivery[0].ResponseTimestamp[0]

			// Make sure data is fresh.
			.then((results) => (cacheMinutes === false || checkFreshnessDate(results.Siri.ServiceDelivery[0].ResponseTimestamp[0], cacheMinutes) === true)
				? Promise.resolve(results)
				: Promise.reject('Refresh data, please.'))

			// If we couldn't get it, load from mta.info's API.
			.catch(err => {
				console.warn('\n\n','  <!> -- Error checking cache file -- <!> \n', err);
				if (cacheMinutes === false) {
					throw new Error('Error loading file during archive mode.');
				}

				return getLocation(url, mta_status_file);
			})

			// Catch an errors from API load or
			.catch(err => console.error('Problem after loading API data. ', err))

			// Resolve with the parsed data.
			.then (data => resolve(data))

			// Reject if there were MTA API errors.
			.catch (err => reject(err));
	});
}


function getSubwayStations(stations_json_file) {
	return new Promise( (resolve, reject) => {
		loadStatusFromFile(stations_json_file + '.json', 'json')

			.then(data => (data) ? resolve(data) : reject('Problem loading data...'))

			.catch(err => reject(err));
	});
}


/**
 * Given a url, fetch the data, load, prepare and save it. Finally, return it.
 *
 * @param  {string} url
 *   A URL where we can find data to fetch.
 * @param  {string} filename
 *   A file name (without extension) where we will save our data, first in raw XML, then in JSON.
 *
 * @return {data}
 *   The contents of the provided endpoint.
 */
function getLocation (url, filename) {

	return new Promise( (resolve, reject) => {

		// Fetch the data at url, then save it to filename.
		// We'll save both the original XML, and then parsed JSON.
		getEndpoint(url)

			// Save to a file, so we don't hit the API too frequently.
			.then(data => saveStatusToFile(data, filename + '.xml'))

			// Convert to JSON, then save to JSON file.
			.then(data => makeJson(data))
			.then(data => saveStatusToFile(data, filename + '.json'))

			// Finalize the main promise. Make sure that we convert our JSON back into a true object.
			.then(data => resolve(JSON.parse(data)))
			.catch(err => reject('Problem getting or saving data from API. -- Err: ' + err));
	});
}

/**
 * Get data from the provided url.
 *
 * @param  {string} url
 *   A URL to get the data from.
 *
 * @return {mixed}
 *   The content body.
 */
async function getEndpoint (url) {
	// Fetch data from http.
	const response = await axios.get(url);
	return response.data;
}


/**
 * Aliases to broken-out file library.
 */
function checkFreshnessDate(packed_date, expires) {
 	return mtaFile.checkFreshnessDate(packed_date, expires);
}
function saveStatusToFile(data, filename) {
	return mtaFile.saveStatusToFile(data, filename);
}
function loadStatusFromFile(filename, type) {
	return mtaFile.loadStatusFromFile(filename, type);
}
function makeJson(data) {
	return mtaFile.makeJsonFromXml(data);
}


module.exports = {
	getSubwayStatus,
	getSubwayStations,
	saveStatusToFile,
};
