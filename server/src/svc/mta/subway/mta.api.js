import axios from 'axios';
import fs from 'fs';
import { checkFreshnessDate, saveStatusToFile, loadStatusFromFile } from '../../../utils/fileManage.js';
import config from 'config';

// MTA Status endpoint.
const mta_api_url = config.get('api.mta.subway_alerts');

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
async function getSubwayStatus (mta_status_file, cacheMinutes) {

	if (mta_status_file.indexOf('.json') !== -1) {
		console.warn('JSON extension already in file name!');
	}

	let results = await loadStatusFromFile(mta_status_file + '.json', 'json');

		// Make sure data is fresh.
		if (cacheMinutes !== false && checkFreshnessDate(results.header.timestamp, cacheMinutes) === true) {
			return results;
		}
		console.log(' (Cache is stale, fetching latest.)');	

		let data;

		try {
			// Fetch fresh data from the mta api.
			data = await getLocation(mta_api_url, mta_status_file);
		}
		catch (err) {
			console.error('Problem after loading API data. ', err)
		}

		return data;
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
async function getLocation (url, filename) {

	try {
		// Fetch the data at url, then cache it to filename.
		let response = await getEndpoint(url);
		await saveStatusToFile(JSON.stringify(response), filename + '.json');
		return response;
	}
	catch (err) {
		throw new Error('Problem getting or saving data from API. -- Err: ' + err);
	};
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

export default {
	getSubwayStatus,
	getSubwayStations,
	saveStatusToFile,
};
