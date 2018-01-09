let React = require('react');
let _ = require('lodash');

let mta = require('../includes/mta.subway').mtaSubway;

class StationList extends React.Component {

	render() {
		if (Object.keys(this.props.stations).length === 0) {
			return null;
		}

    let station_list = (Object.keys(this.props.stations).map(line => (
        <div key={_.uniqueId()} className="station-list-line">
          {mta.getlineById(line)} :
          {
            Object.keys(this.props.stations[line].stations).map( sid =>  (
              <Station
                stations={this.props.stations}
                line={line}
                sid={sid} />
              ))
          }
        </div>
      )
    ));

		return (
      <div key={_.uniqueId('stations-')} className="station-list">
  			<em>Stations (alpha) | </em>
  			{	station_list }
  		</div>
    );
	}
}

const Station = (props) => {

	function getStation (lines, id) {

		let needle = null;

    // If a single line is passed, enforce an array.
    if (typeof lines !== 'object') { lines = [lines]; }

		lines.map(s => {
			let key = (s.length < 4) ? 'MTA NYCT_' + s : s;

			if (props.stations && props.stations[key]) {
				let stations = props.stations[key].stations;
				let results = (stations[id]) ? {	name: stations[id], id: id}	: null;

        if (results !== null) {
					needle = results;
					return;
				}
			}
		});

		return needle;
	}

	let station = getStation(props.line, props.sid);

	return (
		<span className="station">
			{(station) ? station.name : ''}
			{(props.showId === true) ? '(' + props.sid + ')' : ''}
		</span>
	);
}

module.exports = {
  StationList,
  Station,
};
