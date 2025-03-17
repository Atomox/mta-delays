import { Router } from 'express';
import { handleRequestError } from '../utils/errorHandler.js';
const mtaStations = require('../utils/mta.stations.js');

export default () => {
    const router = Router();
    
    router.get('/subway/stations/:boro?', (req, resp, next) => {

        mtaStations.getStations(req.params.boro)
            .then(data => resp.json(data))
            .catch(err => handleRequestError(req,resp, err, 'Error fetching stations'));
    });
    
    return router;
};