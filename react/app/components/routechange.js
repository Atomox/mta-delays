import React from'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { mtaSubway as mta } from '../includes/mta.subway';
import { Station } from './stations';
import { TrainLine} from './trains';


class RouteChange extends React.Component {

  render() {

		let routes = this.props.routeInfo.route.map(r => {
      try {

        let line_change = true;
        let lcl = false;
        let exp = false;


        // Along null is running on same line between stations.
        if (r.along == null) {
          r.along = r.lines[0];
          line_change = false;
          if (r.exp_lcl) {
            if (r.exp_lcl == 'local') {
              lcl = true;
            }
            else if (r.exp_lcl == 'express') {
              exp = true;
            }
          }
        }

  			let trains = r.lines.map(t => {
  					return <TrainLine
  						key={_.uniqueId('train-' + mta.getlineById(t))}
  						line={mta.getlineById(t)}
  						dir='both' />;
  			});

  			let along = (line_change)
          ? (<TrainLine
				      key={_.uniqueId('train-' + mta.getlineById(r.along))}
		          line={mta.getlineById(r.along)}
              dir={'both'} />)
          :  'run between';

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

  			return (
          <div key={_.uniqueId()}>
            {trains}
            {(line_change)
              ? 'via the'
              : (lcl || exp)
                ? 'run ' + r.exp_lcl
                :'run'
            }
            {(line_change) ? along : ''} from {from} until {to}.
          </div>
  			);
      }
      catch (err) {
        console.error('Problem with route change: ', r);
      }

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
