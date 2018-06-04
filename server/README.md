# MTA Status API
This is a standalone API, which can be used to generate more usable subway event data for an application. At it's inception, it was paired with a react app (also in this repo), but it will eventually stand alone, and power multiple apps across separate repos.

This readme is for the API only.

## Installation (Stand Alone)

### Server Directory (Hosting the Application)

It is advisable to have the this directory sorted out prior to the `react/` directory. Follow the instructions in that directory's README file after completing this one.

In order to get the application running locally on your host machine, this directory needs the node modules sorted out prior to sorting the `react/` directory.

```bash
$ npm install
```

### Setup Steps:
All following steps are `BASH` commands, unless a URL is mentioned.

1. `npm install` in the server directory.
2. `mkdir [server_root]/data/generated`
3. You may need to `touch` the following files in this new directory:
  - `mta_status.cache.json` (The MTA API's response, converted to JSON)
  - `mta_status.cache.xml` (The original XML pulled from the MTA's status API -- Used mostly to avoid too many pings to the MTA API)
  - `mta_status.final.cache` (A cache of the parsed response, used mostly in PROD for performance)
  - `mta.stations.compiled.json` (A compiled list of all stations, with generated IDs, regex, aliases, etc. See Building Stations in the Scripts section below)
4. Once this completes, `npm run start`.
5. Test by hitting: `localhost:8100/` (static API welcome page).
6. Test full API by hitting: `localhost:8100/subway/status`. You should see a huge JSON response with the current status.
7. See `localhost:8100`'s root directory for a list of API paths, for things like station lists, line station order, etc.
8. `localhost:8100/subway/status/archive` will list all archives, which are loaded locally, and do not require an internet connection. Good for testing/developing offline.

See the Troubleshooting section at the end of this document if you have trouble installing.


## API Endpoint Documentation
All API endpoints should be documented in the root of the server. By default, that lives on port 8100 of localhost. Hit that endpoint to get all routes, parameter lists, etc.
```
localhost:8100/
```

## Scripts

### Building stations
The stations file is a generated file required for proper parsing. This is a manual process, to be run with npm. Before you start the server, but after installation, run:

```
npm run stations
```
in the server directory. This will pull a list of MTA stations, assemble data, like station aliases, regesx patterns for each station, etc.

### Testing Message Parsing
Because testing/updating route change behavior can get hairy, a script exists which will take a string (usually a plain text event message), and show most of the steps for parsing the message.

Run this, like so, from the server directory:

```
npm run parse_message "Some [A] trains are running over the [C] line from 59 St to 34 St/Penn Station."
```

This will show you what stations are parsed, parsed tags, 1st and 2nd pass of regex for route changes, and all data in the route change array. It's very useful.

Whenever updating the regex for parseing route changes (phase 1, 2, and special phases), you should use this to confirm your changes, before committing.


## Troubleshooting

### Installation
Should you encounter issues installing the node modules, delete the `node_modules` directory and the `package-lock.json` file and reinstall the node modules.

```bash
$ rm -rf node_modules
$ rm package-lock.json
$ npm install
```
