// Require axios for ASYNC GET requests.
const axios = require('axios');

// Require FileStream library for read/write.
const fs = require('fs');

// MTA Status endpoint.
const url = "http://web.mta.info/status/serviceStatus.txt";


/**
 * Get the latest, return it, and store it in a local file.
 * 
 * @param  {string} mta_status_file
 *   A filename where we should store (cache) our request.
 * @param  {int} cacheMinutes
 *   How many minutes old can we use this data for before refreshing?
 *   
 * @return {object}
 *   The Subway status in a data object. Not cleaned or restructured!
 */
function getSubwayStatus (mta_status_file, cacheMinutes) {

	return new Promise ( (resolve, reject) => {
		
		loadStatusFromFile(mta_status_file + '.json', 'json')

			// Make sure data is fresh.
			.then((results) => (checkFreshnessDate(results.service.timestamp[0], cacheMinutes) === true)
				? Promise.resolve(results)
				: Promise.reject('Refresh data, please.'))

			// If we couldn't get it, load from mta.info's API.
			.catch(err => getLocation(url, mta_status_file))

			// Catch an errors from API load or 
			.catch(err => console.error('Problem after loading API data. ', err))

			// Resolve with the parsed data.
			.then (data => resolve(data))

			// Reject if there were MTA API errors.
			.catch (err => reject(err));
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


function checkFreshnessDate(packed_date, expires) {

	let lastUpdated = new Date(packed_date);
	let expiresIn = new Date(packed_date);
	expiresIn.setMinutes(expiresIn.getMinutes() + expires);

	// Get the age of the data.
	let minutesOld = Math.abs(Date.now() - lastUpdated.getTime());
	minutesOld = Math.floor((minutesOld/1000/60) << 0);

	if (minutesOld > expires) {
		let message = 'Cached data is of age' + lastUpdated.getTime() + '(' + minutesOld  + ' minutes ago). Refreshing cached data at' + Date.now();
		console.warn(message);
		return false;
	}
	console.log('Cached data is of age', lastUpdated.getTime(), '(', minutesOld ,' minutes ago). Still fresh. Using cached data.');
	return true;
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
 * Write data to a file. If one exists, we'll overwrite this.
 */
function saveStatusToFile(data, filename) {

	return new Promise((resolve, reject) => {
		fs.writeFile(filename, data, (err) => {
			if (err) { reject('Problem writing to file: ' + filename + '. Err: ' + err); }

			resolve(data);
		});
	});
}


function loadStatusFromFile(filename, type) {
	return new Promise((resolve, reject) => {
		fs.readFile(filename, 'utf8', (err, contents) => {
			if (err) {
				reject(err);
			}
			else if (contents.length <= 0) {
				reject("File has no contents.");
			}

			// Contents were stringified, and must be rebuilt into a true object.
			if (type == 'json') {
				try {					
					contents = JSON.parse(contents);
				}
				catch (err) {
					reject(err);
				}
			}

			resolve(contents);
		});
	});
}


function makeJson(data) {
	return new Promise((resolve, reject) => {

		var parseString = require('xml2js').parseString;
		parseString(data, function (err, result) {
	    	if (err) {
	    		reject('Error parsing to JSON. Error:' + err);
	    	}
	    	resolve(JSON.stringify(result));
		});	
	});
}


module.exports = {
	getSubwayStatus
};