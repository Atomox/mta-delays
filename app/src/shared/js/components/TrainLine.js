import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import _uniqueId from 'lodash/uniqueId';

import tStyleFn from '../../styles/Train.styles';

const tStyleHeader = tStyleFn(24),
	tStyleRouteChange = tStyleFn(12);

import { mtaSubway as mta } from '../includes/mta.subway';

type TrainLineProps = {
	'line': null,
	'dir': -1,
	'disabled': false,
	'outline': false,
	'styleType': 'large',
};

export default class TrainLine extends Component <TrainLineProps> {

	getStyleBase() {
		return (this.props.styleType === 'large')
			? tStyleHeader
			: tStyleRouteChange;
	}

	getLine() {
		return (this.props.line.length > 4)
			? mta.getlineById(this.props.line)
			: this.props.line;
	}

	getDirection(styles) {
		return (this.props.dir !== 'both' && this.props.dir)
			? (<Text className="direction" style={ styles }> { mta.getlineDirectionAbbreviation(this.props.dir)}</Text> )
			: null;
	}

	render() {

		let classes = 'line';
		if (this.props.disabled) {
			classes = classes + ' ' + 'disabled';
		}
		if (this.props.outline) {
			classes = classes + ' ' + 'outline';
		}

		let s = this.getStyleBase();

		return (
			<View className={classes} style={s.container}>
				<View style={s.base}>
					<Text style={s.text}>
						{ this.getLine() }
					</Text>
				</View>
				{ this.getDirection(s.direction) }
			</View>
		);
	}
}
