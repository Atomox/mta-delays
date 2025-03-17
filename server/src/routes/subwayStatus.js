import { Router } from 'express';
import { handleRequestError } from '../utils/errorHandler.js';
const mta_status_file = './data/generated/mta_status.cache';
const cached_parse_file = './data/generated/mta_status.final.cache';
import { archive_status } from '../../data/archive/archive.js';
import config from 'config';
import uniq from 'lodash';
import union from 'lodash';
import moment from 'moment';

import mtaApi from '../svc/mta/subway/mta.api.js';
import mtaStatus from '../utils/mta.event.js';
import { loadStatusFromFile, checkFreshnessDate, cacheJsonResponse } from '../utils/fileManage.js';
import { getTrainById } from "../utils/mta.stations.js";

// Feed refresh settings
const cacheMinutes = config.get("cache.minutes");

export default () => {
    const router = Router();
    
    // Subway Status Main App Endpoint
    router.get(['/subway/status', '/subway/status/archive/:id'], async (req, resp, next) => {

        console.log('\n', ' -- [', 'Request: ', req.url, '] --');
        let my_cache_time = cacheMinutes;

        let req_file = mta_status_file;
        if (typeof req.params.id !== 'undefined') {
            console.log(' -- [', 'Requesting archive: ', req.params.id, '] --');

            if (archive_status.files[req.params.id]) {
                req_file = archive_status.path + archive_status.files[req.params.id];
                my_cache_time = false;
            }
        }

        console.log(' -- [', 'Serving request from file: ', req_file, ', with cache: ' + my_cache_time + '] --');

        let target_file = (req_file) ? req_file + '.json' : cached_parse_file;


        try {

            // Load the data.
            // Check the filesystem first.
            let data = await loadStatusFromFile(target_file, 'json')

            // Data stale. Fetch Fresh.
            if (!data.timestamp || !checkFreshnessDate(data.timestamp, my_cache_time)) {
                console.log(' (!) Reparsing Status.');
                let response = await mtaApi.getSubwayStatus(req_file, my_cache_time);

                if (!response || response.length <= 0) { 
                    throw new Error('No data loaded from file or endpoint.');
                }

                response = mtaStatus.checkReports(response);
                
                console.log(" > parseStatusFeed()...");

                /**
                 * @todo
                 *   Check for async missing
                 */
                // Parse feed into array of events.
                response = await mtaStatus.parseStatusFeed(response);

                console.log(" > addResponseInfo()...");

                /**
                 * @todo
                 *   Check for async missing
                 */
                // Add Details to Events.
                response = addResponseInfo(response, req);

                console.log(" > CacheJsonResponse()...");
                console.log(response);


                if (my_cache_time) {
                    // Handle post-play caching.
                    cacheJsonResponse(response, cached_parse_file);
                }

                console.log(' (+) Using Fresh Data.', data.status);
                data = { data: response };
            }
            else {
                console.log(' (+) Using Cached Data.', data.status);
                data = { data: data };
            }

            console.log(" > Serving Response()...");

            // Serve the response JSON.
            resp.json(data.data);
        }
        catch(err) {
            handleRequestError(req, resp, err, 'Error fetching normal subway status.');
        }
    });

    function addResponseInfo(data, req) {
        data.archive = {};
        data.archive.detail = (archive_status.files[req.params.id])
            ? archive_status.files[req.params.id]
            : null;
        data.archive.id = req.params.id;

        console.log(" > addResponseInfo() > Data.Events " + typeof data.events);
        console.log(data);

        data.summary = {
            count: data.events.length,
            lines: [],
    };

    function getLines(interrupted, planned) {
        let result = getEvents(interrupted, planned);

        return (result && result.length > 0)
            ? uniq(
                result.map( e => uniq(e.line.map( l => getTrainById(l.line))) )
                .reduce( (c, i) => c = union(c, i) )).sort()
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
        let hour = moment(time).format('H');
        let day = moment(time).format('d');
        let rush_hour = ((hour > 7 && hour < 10) || hour > 15 && hour < 19);
        let period = (hour < 5 || hour > 21)
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
        data.summary.time = (data.events[0] && data.events[0].date) ? getEventTime(data.events[0].date.fetched) : null;

        return data;
    }

    return router;
};