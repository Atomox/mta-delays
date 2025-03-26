import express from 'express';
import http from 'http';
import router from './routes/index.js';
import config from 'config'; 

const app = express();
const server = http.createServer(app);

// File where we'll store things. No extension, please.
const mta_status_file = './data/generated/mta_status.cache';
const cached_parse_file = './data/generated/mta_status.final.cache';
const port = config.get("port");


console.log("Starting API on port: " + port);

// Allow other domains to access us. (Prepare for mingling)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Import Routes from Routes Folder.
app.use(router());

server.listen(port);
