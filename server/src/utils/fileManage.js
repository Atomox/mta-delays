// Require FileStream library for read/write.
import fs from 'fs';

/**
 * Write data to a file. If one exists, we'll overwrite this.
 */
export function saveStatusToFile(data, filename) {

	return new Promise((resolve, reject) => {
		fs.writeFile(filename, data, (err) => {
			if (err) { reject('Problem writing to file: ' + filename + '. Err: ' + err); }

			resolve(data);
		});
	});
}


export function loadStatusFromFile(filename, type) {
	return new Promise((resolve, reject) => {
		fs.readFile(filename, 'utf8', (err, contents) => {
			if (err) {
        		console.log(' <!> -- Error Loading File: ', err);
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

function prepJsonForFile(data) {
  return JSON.stringify(data);
}

/**
 * 
 * @returns true if data is still within freshness.
 */
export function checkFreshnessDate(packed_date, expires) {

	if (expires === false) {
		console.log(' -- [', 'Cached timing disabled. Using cached data.', '] --');
		return true;
	}
	// Make sure we even have a date, or fail (in case of empty cache files).
	else if (!packed_date) {
		return false;
	}

	let lastUpdated = new Date(packed_date);
	let expiresIn = new Date(packed_date);
	expiresIn.setMinutes(expiresIn.getMinutes() + expires);

	// Get the age of the data.
	let minutesOld = Math.abs(Date.now() - lastUpdated.getTime());
	minutesOld = Math.floor((minutesOld/1000/60) << 0);

	let time_msg = 'Cached data is of age ' + lastUpdated.getTime()
		+ ' (' + minutesOld  + ' minutes ago).';

	console.warn(' -- [', time_msg, '] -- ');

	if (minutesOld > expires) {
		let message = 'Refreshing cached data at [' + Date.now() + ']';
		console.warn(' -- [', message, '] -- ');
		return false;
	}
	console.log(' -- [', 'Still fresh. Using cached data.', '] --');
	return true;
}

export async function cacheJsonResponse(data, file) {
  let status = null;

  try {
    if (!data) {
      throw new Error('Expected non-empty data for cache.');
    }

    let finalData = await prepJsonForFile(data);

    status = await saveStatusToFile(finalData, file);
    console.log(' -!- Data cache complete.');
  }
  catch (err) {
    console.warn(' <!> -- Error while caching Response: ', err);
  }

  // Return data, so this can be a step in the file serve.
  return status;
}
