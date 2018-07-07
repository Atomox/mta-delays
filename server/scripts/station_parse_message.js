
if (!process.argv[2]) {
  console.error('\n', '<!> Expecting a passed message, in quotes.', '\n\n');
  return;
}

let message = process.argv[2];

header('Parse Message', true);

header('Original Message');
console.log(message, '\n');

const mtaStatus = require('../mta.event');
const mtaTags = require('../mta.taxonomy');
const mtaStations = require('../mta.stations');
const mtaRouteChange = require('../mta.route_change');

main(message);

async function main(message) {
  try {
    let lines = await mtaStatus.getMessageTrainLines(message);
    section('Find Lines', lines);

    tags = mtaTags.getMessageAction(message);
    section('Find all Tags', tags);

    message = mtaStations.prepareBunchedStationNames(message);
    section('Station Prep', message);

    message = await mtaStatus.getStationsInEventMessage(lines, message);
    message = message;
    section('Stations', message.stations);
    section('Direction-only Stations', message.bound);

    let boro = mtaStations.getBorosFromStations(message.stations);
    section('Affected Boros', boro);

    message = message.parsed_message;
    section('Station Parse', message);

    message = await mtaRouteChange.getMessageRouteChange(message);
    section('1st Route Change Parse', message);

    message = await mtaRouteChange.getRouteChange(message);
    section('2nd Route Change Parse', message);
  }
  catch (err) {
    console.log('\n\n\n <!> Woops!\n\n', err, '\n\n\n');
  }
}

function header(title, header) {
  if(header) {
    console.log('\n\n');
  }
  console.log('\n', '[', title, '] -------------------------------------------', '\n');
}

function section(title, data) {
  header(title);
  console.log(data);
  console.log('\n');
}
