import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';

import Card from './card';
import { RouteChange } from './routechange';
import { StationList } from './stations';
import { Station } from './stations';
import { TrainLine } from './trains';
import { Boro } from './boro';
import { mtaSubway as mta } from '../includes/mta.subway';
import { helpers as mtaHelp } from '../includes/helpers';


class EventList extends React.Component {

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
						key={_.uniqueId('boro-' + b)}
						boro={b}
						caps={false} />;
					})
				}
				ribbon={ (e.planned) ? null : '!' }
				headerClass={titleClass}
				cardClass={cardClass}>
			  <div>
					<div className="grid-x">
						<div className="small-12 medium-4 large-3">
					  	<h3>
					    {
								Object.keys(trains).map((key, i) => {
									let line = trains[key].line;
									let dir = mta.getlineDirectionByID(trains[key].dir);

									return <TrainLine
										key={_.uniqueId('train-' + line)}
										line={line}
										dir={dir} />;
								})
							}
							</h3>
						</div>
						<div className="small-12 medium-8 large-9">
							{ (e.detail.route_change
								&& typeof e.detail.route_change.route == 'object'
								&& e.detail.route_change.route.length > 0)
								? <RouteChange routeInfo={e.detail.route_change} stations={e.detail.stations} />
								: '' }
						</div>
					</div>
					<h2>{e.detail.type.tag}</h2>

					<div className="detail-message">
						<p>{e.detail.message}</p>


						<div className="grid-x">
							<div className="medium-8">
								{(e.detail.stations && Object.keys(e.detail.stations).length <= 2)
									? <StationList stations={e.detail.stations} /> : ''}
							</div>
							<div className="medium-4 text-right">

						    <small>
						    	{(e.planned === true)
						    		? e.detail.durration.parsed
					    			: moment(e.date.start).format('h:mm A, dddd, MMMM Do')
					    	}</small>
							</div>
						</div>
					</div>
		    </div>
			</Card>
		);
	}
}


EventList.propTypes = {
  event: PropTypes.any.isRequired,
};


module.exports = {
	EventList
};
