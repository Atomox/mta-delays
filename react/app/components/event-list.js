import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import Card from './card';
import { RouteChange } from './routechange';
import { StationList } from './stations';
import { Station } from './stations';
import { TrainLine } from './trains';
import { Boro } from './boro';
import { mtaSubway as mta } from '../includes/mta.subway';


class EventList extends React.Component {

	render() {

		let e = this.props.event;

		let titleClass = "card-divider ";
		titleClass += (e.planned === true) ? 'caution' : 'bad';

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

		return (

			<Card key="event-list" id={e.id}
				header={e.type}
				headerSubtitle={
					e.detail.boros.global.map(b => {
					return <Boro
						key={_.uniqueId('boro-' + b)}
						boro={b} />;
					})
				}
				headerClass={titleClass}>
			  <div>

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
					<h5>
						{ (e.detail.type_detail)
							? e.detail.type_detail.join(' | ')
							: ''}
					</h5>
					{ (e.detail.route_change
						&& typeof e.detail.route_change.route == 'object'
						&& e.detail.route_change.route.length > 0)
						? <RouteChange routeInfo={e.detail.route_change} stations={e.detail.stations} />
						: '' }

					<p>{e.detail.message}</p>

					{(e.detail.stations)
						? <StationList stations={e.detail.stations} /> : ''}

			    <small>
			    	{(e.planned === true)
			    		? e.detail.durration
			    		: new Date(e.date.start).toString()
			    	}</small>
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
