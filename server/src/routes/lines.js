import { Router } from 'express';
import { handleRequestError } from '../utils/errorHandler.js';
const mtaStations = require('../utils/mta.stations.js');

export default () => {
    const router = Router();
        
    router.get('/subway/lines/boro/:boro?', (req, resp, next) => {
    
        mtaStations.getStationLines(req.params.boro)
            .then(data => resp.json(data))
            .catch(err => handleRequestError(req,resp, err, 'Error fetching stations'));
    });
    
    router.get('/subway/lines/train/:train?', (req, resp, next) => {
    
        mtaStations.getStationLines(null, req.params.train)
            .then(data => resp.json(data))
            .catch(err => handleRequestError(req,resp, err, 'Error fetching stations'));
    });
    
    router.get('/subway/lines/:train/route', (req, resp, next) => {
        mtaStations.getTrainRoute(req.params.train)
            .then(data => (data === false) ? 'unavailable' : data )
            .then(data => resp.json(data))
            .catch(err => handleRequestError(req,resp, err, 'Error fetching train route'));
    });
    
    router.get('/subway/lines/:train/route/array', (req,resp,next) => {
        mtaStations.getRouteStationsArray(req.params.train)
            .then(data => (data === false) ? 'unavailable' : data )
            .then(data => resp.json(data))
            .catch(err => handleRequestError(req,resp, err, 'Error fetching train route'));
    });

    return router;
};