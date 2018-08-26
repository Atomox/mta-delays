import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import _uniqueId from 'lodash/uniqueId';

import tStyleFn from '../../styles/Train.styles';

const tStyle = tStyleFn(24);

import { mtaSubway as mta } from '../includes/mta.subway';

type TrainLineProps = {
	'line': null,
	'dir': -1,
	'disabled': false,
	'outline': false
};

export default class TrainLine extends Component <TrainLineProps> {

	getLine() {
		return (this.props.line.length > 4)
			? mta.getlineById(this.props.line)
			: this.props.line;
	}

	getDirection() {
		return (this.props.dir !== 'both' && this.props.dir)
			? (<Text className="direction"> { mta.getlineDirectionAbbreviation(this.props.dir)}</Text> )
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

		return (
			<View className={classes} style={tStyle.container}>
				<View style={tStyle.base}>
					<Text style={tStyle.text}>
						{ this.getLine() }
					</Text>
				</View>
				<Text style={tStyle.direction}>
					{ this.getDirection() }
				</Text>
			</View>
		);
	}
}
