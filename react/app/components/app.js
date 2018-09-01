let React = require('react');
let _ = require('lodash');

// Components.
let EventList = require('./event-list').EventList;
let Header = require('./header').Header;
let Summary = require('./summary').Summary;

import MTADApi from '../../../app/src/shared/js/MtaDelaysApi';

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

    const delaysApi = new MTADApi();

    delaysApi.getStatus()
      .then( data => this.initLists(data) )
      .catch( data => this.initLists({ status: false }) );
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
