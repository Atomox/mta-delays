let React = require('react');

// Components.
let StatusList = require('./status-list').StatusList;
let EventList = require('./event-list').EventList;

const api = {
  dev: {
    protocol: 'http://',
    host: 'localhost',
    port: 8100,
    endpoint_prefix: '',
  },
  production: {
    protocol: 'http://',
    host: 'nyc.bhelmer.com',
    port: '80',
    endpoint_prefix: '/api'
  },
};

/**
 * The main app container.
 */
class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      events: []
    }

    this.getStatus()
      .then( (data) => {
        this.initLists(data);
      });
  }

  getStatus = () => {

    console.log(' ---- The environment is: [', process.env.NODE_ENV, '] ------');

    let e = api[process.env.NODE_ENV];
    let url = e.protocol + e.host + ':' + e.port 
      + e.endpoint_prefix + '/' + 'subway/status';

    console.log(' ---- The environment API: [', url, '] ------');

    return new Promise((resolve, reject) => {
      fetch(url)
        .then(data => {
        	console.log('Fetch Result', data);
        	data = data.json();
        	console.log('JSON-Parsed Response:', data);
        	resolve(data);
        }) // Transform the data into json
        .catch((err) => {
          console.log('Fetch Error: ', err);
          reject(err);
        });
    });
  }


  initLists = (data) => {
  	console.log('initLists: ', data);
    this.setState(prevState => {
      return {
        events: data
      };
    });
  }

  render() {

  	console.log(this.state);

    return (
      <div>
        {Object.keys(this.state.events).map(key =>
            <EventList 
            	event={this.state.events[key]} />
          )
        }
      </div>
    );
  }
}

module.exports = App;
