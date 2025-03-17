import { Router } from 'express';

import subwayStatusRoute from './subwayStatus.js';
import rootRoute from './root.js';


export default () => {
    const routes = Router();

    console.log("Using Router...");

    routes.use(rootRoute());
    routes.use(subwayStatusRoute());

    return routes;
};