import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { mtaSubway as mta } from '../includes/mta.subway';
import { TrainLine } from './trains';

class StationList extends React.Component {

	render() {
		if (Object.keys(this.props.stations).length === 0) {
			return null;
		}

    let station_list = (Object.keys(this.props.stations).map(line => (
        <div key={_.uniqueId()} className="station-list-line">
					<TrainLine
						key={_.uniqueId('train-' + line)}
						line={line}
						outline={true} />
          {
            Object.keys(this.props.stations[line].stations).map( sid =>  (
              <Station
								key={_.uniqueId('sid-')}
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
  			{	station_list }
  		</div>
    );
	}
}

StationList.propTypes = {
  stations: PropTypes.any.isRequired,

};

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

Station.propTypes = {
  line: PropTypes.any.isRequired,
  sid: PropTypes.string.isRequired,
};

module.exports = {
  StationList,
  Station,
};
