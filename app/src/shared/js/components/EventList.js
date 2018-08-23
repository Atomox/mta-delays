import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import _uniqueId from 'lodash/uniqueId';

import Event from './Event';

type EventListProps = {
  events: {}
};


export default class EventList extends Component<EventListProps> {

	/**
	 * @TODO
	 *    Testing debugging in child components.
	 */
	componentDidCatch(error, info) {

		console.error('Error occured:', error, '\n', info);
	}

	render() {

		return (

			<View>
        {Object.keys(this.props.events).map(key =>
            <Event
              key={_uniqueId('event-')}
              event={this.props.events[key]} />
          )
        }
      </View>
		);
	}
}


EventList.propTypes = {
  events: PropTypes.any.isRequired,
};
