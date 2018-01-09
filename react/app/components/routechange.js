import React from'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { mtaSubway as mta } from '../includes/mta.subway';
import { Station } from './stations';
import { TrainLine} from './trains';


class RouteChange extends React.Component {

  render() {
		console.log(this.props.routeInfo);

		let routes = this.props.routeInfo.route.map(r => {
			let trains = r.lines.map(t => {
					return <TrainLine
						key={_.uniqueId('train-' + mta.getlineById(t))}
						line={mta.getlineById(t)}
						dir='both' />;
			});

			let along = (<TrainLine
				key={_.uniqueId('train-' + mta.getlineById(r.along))}
				line={mta.getlineById(r.along)}
				dir={'both'} />);

			let from = (<Station
					stations={this.props.stations}
					line={_.union([r.along],r.lines)}
					sid={r.from}/>
			);
			let to = (<Station
					stations={this.props.stations}
					line={_.union([r.along],r.lines)}
					sid={r.to}/>
			);

			return (<div key={_.uniqueId()}>{trains} via the {along} from {from} until {to}.</div>
			);
		});

		return (
			<div className="route-change">
				{routes}
			</div>
		);
	}
}

RouteChange.propTypes = {
  routeInfo: PropTypes.any.isRequired,
  stations: PropTypes.any.isRequired,
};


module.exports = {
	RouteChange
};
