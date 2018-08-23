import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';

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
		<Text className="station">
			{(station) ? station.name : ''}
			{(props.showId === true) ? '(' + props.sid + ')' : ''}
		</Text>
	);
}

Station.propTypes = {
  line: PropTypes.any.isRequired,
  sid: PropTypes.string.isRequired,
};

export default Station;
