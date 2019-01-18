'use strict';
import moment from 'moment';
import * as _ from 'lodash';
import log from '../../includes/logger';
import { mtaSubway as mta } from '../../includes/mta.subway';
import { helpers } from '../../includes/helpers';
import { determineSeverity, prepareEventSummary } from '../../includes/calculations';

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Txt from '../common/Txt';
import { Card } from '../Card';
import TrainLine from '../TrainLine';
import Boro from '../Boro';

import grid from '../../../styles/Grid.styles';
import glStyle from '../../../styles/Summary.styles';

/**
type GroupLineCardProps = {
  events: [],
	age: 0,
};
*/

export default class GroupLineCard extends React.Component /** <GroupLineCardProps> */ {

	assembleBoros(boros, short, caps, styles) {
		return (boros && Array.isArray(boros))
			? boros.map( b => (
					<Boro
						key={_.uniqueId('boro-' + b)}
						boro={b}
						short={short}
						caps={caps}
            styles={styles}
            overrideStyle={true}/>
					))
				.reduce((prev, curr) => ((prev === null)
					? [curr]
					: [prev, ', ', curr]),
				null)
			: null;
	}

	assembleLines(lines) {
		return (lines && lines.length > 0 && Array.isArray(lines))
			? lines
				.map( t => (isNaN(parseInt(t)))
					? t.toUpperCase()
					: parseInt(t) )
				.map( t => (
					<TrainLine
						key={_.uniqueId('train-' + t)}
						line={t}
						disabled={(this.props.affectedLines.indexOf(t) === -1)}/>
					))
			: null;
	}

	assembleEvents(events) {

		return (events && Array.isArray(events))
			? events.map( e => {

				let tagClass = 'cell small-6 large-5',
					mainTag = (e.keyword[0])
						? e.keyword[0]
						: {tag: '', weight: 5};
				mainTag.tag = helpers.underscoreToCaps(e.keyword[0].tag);
				tagClass += (mainTag.weight) ? ' weight-' + mainTag.weight : 'weight-5';

				return (
					<View style={ grid.row } className="grid-x" key={_.uniqueId('sum-event')}>
						<View className="cell small-2 x-large-1 lines">
							<Txt>
                { (e.lines && Array.isArray(e.lines)) ? e.lines.join('/') : '' }
              </Txt>
						</View>

						<View className="cell small-4 large-3">
              <Txt>
    						{	(e.boro)
    							? this.assembleBoros(e.boro, true, false)
    							: null }
              </Txt>
						</View>

						<View className={tagClass}>
							<Txt>
                {	(mainTag.tag) ? mainTag.tag : 'UNKNOWN' }
              </Txt>
						</View>
					</View>
				);
			})
			: null;
	}

	render() {

		let lines = this.props.line_group.split('-');

		if (!lines || !this.props.events) {
			return null;
		}
		let color = mta.getLineGroupColor(this.props.line_group);
		let myGlColor = {
			borderLeftColor: color
		};

		return(
			<View style={ [glStyle.groupLineCard, myGlColor]} className="group-line-card">
				<View className="grid-x">
					<View h3="true" className="cell small-4" style={ glStyle.h3 }>
						{ this.assembleLines(lines) }
					</View>
					<View className="cell small-8 text-right">
						<Text>
              { this.assembleBoros(this.props.boros, false, false, glStyle.boro) }
            </Text>
					</View>
				</View>

				<View>
					{
            this.assembleEvents(this.props.events)
          }
				</View>
			</View>
		);
	}
}
