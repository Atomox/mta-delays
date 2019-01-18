import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Txt from '../common/Txt';

import hStyle from '../../../styles/Header.styles';

const Logo = (props) => {

	return (
		<View className="Logo">
			<Txt h1="true" styles={ hStyle.logoH1 }>Subway</Txt>
			<Txt h2="true" styles={ hStyle.logoH2 }>New York City</Txt>
			<Txt h3="true" styles={ hStyle.logoH3 }>Delays</Txt>
		</View>
	);
}

export default Logo;
