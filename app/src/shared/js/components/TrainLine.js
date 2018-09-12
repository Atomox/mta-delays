import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import _uniqueId from 'lodash/uniqueId';

import Txt from './common/Txt';
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
		return (this.props.dir !== 'both' && this.props.dir && this.props.styleType === 'large')
			? (<Txt className="direction" styles={ styles }> { mta.getlineDirectionAbbreviation(this.props.dir)}</Txt> )
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
		let container = (this.props.styleType === 'large')
			? s.container
			: s.containerSmall;

		return (
			<View className={classes} style={container}>
				<View style={s.base}>
					<Txt styles={s.text}>
						{ this.getLine() }
					</Txt>
				</View>
				{ this.getDirection(s.direction) }
			</View>
		);
	}
}
