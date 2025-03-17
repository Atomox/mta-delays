import { Router } from 'express';

import root_json from '../../data/root_response.js';

import { get_archive_list } from '../../data/archive/archive.js';

export default () => {
    const router = Router();
    
    router.get('/subway/status/archive', (req, resp, next) => {
        let list = get_archive_list();
    
        resp.json({
            message: 'Here are available archives. Pass their ID to the endpoint',
            endpoint: '/subway/status/archive/::ID_HERE::',
            archives: list.list,
        });
    });

    return router;
};