
if (!process.argv[2]) {
  console.error('\n', '<!> Expecting a passed message, in quotes.', '\n\n');
  return;
}

let message = process.argv[2];

console.log('\n\n', ' [ Parse Message ] -------------------------------------------', '\n');

console.log('[Original Message]\n', message, '\n');

const mtaStatus = require('../mta.event');
const mtaStations = require('../mta.stations');

main(message);

async function main(message) {
  try {
    let lines = await getMessageTrainLines(message);
    console.log('[Find Lines]\n', lines, '\n');

    message = mtaStations.prepareBunchedStationNames(message);
    console.log('[Station Prep]\n', message, '\n');

    message = await mtaStatus.getStationsInEventMessage(lines, message);
    message = message.parsed_message;
    console.log('[Station Parse]\n', message, '\n');

    message = await mtaStatus.getMessageRouteChange(message);
    console.log('[1st Route Change Parse]\n', message, '\n');

    message = await mtaStatus.getRouteChange(message);
    console.log('[2nd Route Change Parse]\n', message, '\n');
  }
  catch (err) {
    console.log('\n\n\n <!> Woops!\n\n', err, '\n\n\n');
  }
}

async function getMessageTrainLines(txt) {
  let result = await mtaStatus.getMessageTrainLines(txt);
  return result;
}
