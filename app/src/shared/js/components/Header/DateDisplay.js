import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import moment from 'moment';

/**
 *
 *
 *
 *
 * @TODO
 *
 *
 *
 *   Start Here.
 *
 *
 *
 *
 *
 */

import dStyle from '../../../styles/Header.styles';
import commonStyle from '../../../styles/Common.styles';

export const DateDisplay = (props) => {

	return (
		<View className="DateHeader">
			<Text h5="true" style={ dStyle.date }>{moment(props.age).format('dddd, MMMM Do')}</Text>
			<Text h1="true">{moment(props.age).format('h:mm A')}</Text>
			<Text h4="true"><Text className="station">Cathedral Pkwy</Text> Release</Text>
		</View>
	);
}
