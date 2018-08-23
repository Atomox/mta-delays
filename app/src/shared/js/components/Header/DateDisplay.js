import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import moment from 'moment';

export const DateDisplay = (props) => {

	return (
		<View className="DateHeader">
			<Text h5="true">{moment(props.age).format('dddd, MMMM Do')}</Text>
			<Text h1="true">{moment(props.age).format('h:mm A')}</Text>
			<Text h4="true"><Text className="station">Cathedral Pkwy</Text> Release</Text>
		</View>
	);
}
