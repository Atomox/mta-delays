let React = require('react');

// Components.
let StatusList = require('./status-list').StatusList;
let EventList = require('./event-list').EventList;

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

    let url = "http://localhost:8100/subway/status";

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
