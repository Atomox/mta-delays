import { Router } from 'express';
import root_json from '../../data/root_response.js';

export default () => {
    const router = Router();
    
    // API Welcome Screen
    router.get('/', (req, resp, next) => {	
        resp.json(root_json); 	
    });

    return router;
};