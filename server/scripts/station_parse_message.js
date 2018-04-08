
if (!process.argv[2]) {
  console.error('\n', '<!> Expecting a passed message, in quotes.', '\n\n');
  return;
}

let message = process.argv[2];

header('Parse Message', true);

header('Original Message');
console.log(message, '\n');

const mtaStatus = require('../mta.event');
const mtaStations = require('../mta.stations');

main(message);

async function main(message) {
  try {
    let lines = await mtaStatus.getMessageTrainLines(message);
    section('Find Lines', lines);

    tags = mtaStatus.getMessageAction(message);
    section('Find all Tags', tags);

    message = mtaStations.prepareBunchedStationNames(message);
    section('Station Prep', message);

    message = await mtaStatus.getStationsInEventMessage(lines, message);
    message = message.parsed_message;
    section('Station Parse', message);

    message = await mtaStatus.getMessageRouteChange(message);
    section('1st Route Change Parse', message);

    message = await mtaStatus.getRouteChange(message);
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
  console.log(data, '\n');
}
