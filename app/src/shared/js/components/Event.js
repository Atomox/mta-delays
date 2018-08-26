import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import _uniqueId from 'lodash/uniqueId';
import moment from 'moment';
import PropTypes from 'prop-types';

// Components
import Card from './Card';
/**
import { RouteChange } from './routechange';
*/
import { StationList } from './StationList';
import { Station } from './Station';
import TrainLine from './TrainLine';
import Boro from './Boro';

// Styles
import commonStyle from '../../styles/Common.styles';
import eventStyle from '../../styles/Event.styles';

import { mtaSubway as mta } from '../includes/mta.subway';
import { helpers as mtaHelp } from '../includes/helpers';

type EventProps = {
  event: null,
};

export default class Event extends Component <EventProps> {

	/**
	 * @TODO
	 *    Testing debugging in child components.
	 */
	componentDidCatch(error, info) {

		console.error('Error occured:', error, '\n', info);
	}


	/**
	 * Determine all classes to assign to this event card.
	 *
	 * @return {String}
	 *   A single string of space-seperated class names.
	 */
	getCardClassHeader() {
		let e = this.props.event;

		let titleClass = "card-divider ";
		titleClass += (e.planned === true)
			? 'caution-background planned-work'
			: 'bad-background unplanned-incident';

		let group = mta.getLineGroup(e.line[0].line);

		titleClass += ' ' + mta.getLineGroupClass(group) + '-background';

		return titleClass;
	}

	getCardClass() {
		let e = this.props.event;

		let titleClass = (e.planned === true)
			? 'planned-work'
			: 'unplanned-incident';

		return titleClass;
	}

	getEventTrains() {
		let e = this.props.event;

		let trains = {};
		for (let i in e.line) {
			let line = mta.getlineById(e.line[i].line);
			let dir = e.line[i].dir;

			if (!trains[line]) {
				trains[line] = {line: line, dir: dir,};
			}
			else {
				if (trains[line].dir !== dir) {
					trains[line].dir = 2;
				}
			}
		}
		return trains;
	}

	render() {

			let e = this.props.event;

			let titleClass = this.getCardClassHeader();
			let cardClass = this.getCardClass();
			let trains = this.getEventTrains();

		return (

			<Card key="event-list" id={e.id}
				header={ (e.detail.type_detail)	? e.detail.type_detail
							.map(tag => mtaHelp.underscoreToCaps(tag))
							.join(' | ') : '' }
				headerSubtitle={
					e.detail.boros.global.map(b => {
					return <Boro
						key={_uniqueId('boro-' + b)}
						boro={b}
						caps={false} />;
					})
				}
				ribbon={ (e.planned) ? null : '!' }
				headerClass={titleClass}
				cardClass={cardClass}>
			  <View>
					<View className="grid-x">
						<View className="small-12 medium-4 large-3">
					  	<Text h3="true">
					    {
								Object.keys(trains).map((key, i) => {
									let line = trains[key].line;
									let dir = mta.getlineDirectionByID(trains[key].dir);

									return <TrainLine
										key={_uniqueId('train-' + line)}
										line={line}
										dir={dir} />;
								})
							}
							</Text>
						</View>
{/**
						<View className="small-12 medium-8 large-9">
							{ (e.detail.route_change
								&& typeof e.detail.route_change.route == 'object'
								&& e.detail.route_change.route.length > 0)
								? <RouteChange routeInfo={e.detail.route_change} stations={e.detail.stations} />
								: '' }
						</View>
*/}
					</View>

					<Text h2="true" style={ eventStyle.title }>{e.detail.type.tag}</Text>

					<View className="detail-message" style={ eventStyle.detailContainer }>
						<Text style={ eventStyle.detailMessage }>{e.detail.message}</Text>

						<View className="grid-x">
{/**
							<View className="medium-8">
								{(e.detail.stations && Object.keys(e.detail.stations).length <= 2)
									? <StationList stations={e.detail.stations} /> : ''}
							</View>
  */}
							<View className="medium-4 text-right">

						    <Text className="small" style={[ commonStyle.small]}>
						    	{(e.planned === true)
						    		? e.detail.durration.parsed
					    			: moment(e.date.start).format('h:mm A, dddd, MMMM Do')
					    	}</Text>
							</View>
						</View>
					</View>
		    </View>
			</Card>
		);
	}
}


Event.propTypes = {
  event: PropTypes.any.isRequired,
};
