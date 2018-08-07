let React = require('react');
let _ = require('lodash');

// Components.
let EventList = require('./event-list').EventList;
let Header = require('./header').Header;
let Summary = require('./summary').Summary;

// Config
const api = require('../../../config/settings');

// const endpoint = 'subway/status';
 const endpoint = 'subway/status/archive/165'; // 43 (lcl/exp) // 15 (route change) 27 (d/f crazy route change) 74, 117

/**
 * The main app container.
 */
class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      status: 'initializing',
      age: 0,
      events: []
    }

    this.getStatus()
      .then( data => this.initLists(data) )
      .catch( data => this.initLists({ status: false }) );
  }

  getStatus = () => {

    console.log(' ---- The environment is: [', process.env.NODE_ENV, '] ------');

    let e = api[process.env.NODE_ENV];
    let url = e.protocol + e.host + ':' + e.port
      + e.endpoint_prefix + '/' + endpoint;

    console.log(' ---- The environment API: [', url, '] ------');

    return fetch(url)
      .then(res => (res.status == 200) ? res : Promise.reject('Fetch had a non-200 response.'))
      .then(res => res.json())
      .catch(err => Promise.reject(err));
  }


  initLists = (data) => {
  	console.log('initLists: ', data);

    this.setState(prevState => {
      prevState.status = (data.status) ? data.status : false;
      prevState.events = (data.events) ? data.events : [];
      prevState.age = (data.timestamp) ? data.timestamp : Date.now();
      prevState.archive = (data.archive) ? data.archive : null;
      prevState.summary = (data.summary) ? data.summary : null;

      return prevState;
    });
  }

  render() {

    return (
      <div key={_.uniqueId('card')}>
        <Header
          age={this.state.age}
          status={this.state.status}
          numEvents={this.state.events.length}
          archive={this.state.archive}
          summary={this.state.summary}/>

        <Summary
          events={this.state.events}
          age={this.state.age}
          status={this.state.status}
          numEvents={this.state.events.length}
          archive={this.state.archive}
          summary={this.state.summary}
          />

        {Object.keys(this.state.events).map(key =>
            <EventList
              key={_.uniqueId('eventList-')}
            	event={this.state.events[key]} />
          )
        }

      </div>
    );
  }
}

module.exports = App;
