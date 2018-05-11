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

        let line_change = true,
          lcl = false,
          exp = false,
          bypass = false,
          no_svc_between = false,
          pre = null,
          action = null;


        // Along null is running on same line between stations.
        if (r.along == null) {
          r.along = r.lines[0];
          line_change = false;
          if (r.noTrains) {
            no_svc_between = true;
          }
          else if (r.bypass && r.bypass.length > 0) {
            bypass = true;
          }
          if (r.exp_lcl) {
            if (r.exp_lcl == 'local') {
              lcl = true;
            }
            else if (r.exp_lcl == 'express') {
              exp = true;
            }
          }
        }

  			let trains = r.lines.map(t => (
          <TrainLine
  					key={_.uniqueId('train-' + mta.getlineById(t))}
  					line={mta.getlineById(t)}
  					dir='both' />
          ));

  			let along = (line_change)
          ? (<TrainLine
				      key={_.uniqueId('train-' + mta.getlineById(r.along))}
		          line={mta.getlineById(r.along)}
              dir={'both'} />)
          : 'run between';

  			let from = (r.from) ? (<Station
            key={_.uniqueId('station-' + r.from)}
            stations={this.props.stations}
  					line={_.union([r.along],r.lines)}
  					sid={r.from}/>
  			) : null;

  			let to = (r.to) ? (<Station
            key={_.uniqueId('station-' + r.to)}
  					stations={this.props.stations}
  					line={_.union([r.along],r.lines)}
  					sid={r.to}/>
  			) : null;

        let boro_general = (r.in)
          ? r.in
          : null;

        let bypass_stations = (r.bypass)
          ? r.bypass
              .map( s => (<Station
                key={_.uniqueId('station-' + s)}
      					stations={this.props.stations}
      					line={_.union([r.along],r.lines)}
      					sid={s}/> ) )
              .reduce((prev, curr) => [prev, ', ', curr])
          : null;

        if (r.action === 'replace') { action = 'replace the'; }
        else if (line_change) {       action = 'via the'; }
        else if (no_svc_between) {    action = 'service'; }
        else if (bypass) {            action = 'skip'; }
//        else if (r.section) {   action = 'section ' + r.section; }
        else if (lcl || exp) {  action = 'run ' + r.exp_lcl; }
        else {                  action = 'run'; }

        pre = (r.section) ? '(' + r.section + ')' : '';

        if (r.allTrains === false) {
          pre += ' ' + 'Some';
        }
        if (no_svc_between) {
          pre += ' ' + 'No';
        }

  			return (
          <div key={_.uniqueId()}>
            { pre } { trains } { action } { line_change && along }

            { // No stations, just "in Boro".
              boro_general &&
              <span>in { boro_general }. </span> }

            { // No stations, just "in Boro".
              !boro_general && bypass_stations &&
              <span>{ bypass_stations }. </span> }

            { // Normal Stations from/to.
              !boro_general && !bypass_stations && !no_svc_between &&
              <span>from {from} until {to}.</span> }

            { // Normal Stations from/to.
              no_svc_between &&
              <span>between {from} and {to}.</span> }

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
