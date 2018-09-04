import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { mtaSubway as mta } from '../includes/mta.subway';
import Station from './Station';
import TrainLine from './TrainLine';

import rcStyle from '../../styles/RouteChange.styles';

export default class RouteChange extends Component {

  componentDidCatch(err, info) {
    console.log('<!> Route Change Error', err);
  }


  getRoutes() {
    return this.props.routeInfo.route.map(r => {
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
          : (<Text>run between</Text>);

  			let from = (r.from)
          ? (
              <Station
                key={_.uniqueId('station-' + r.from)}
                stations={this.props.stations}
      					line={_.union([r.along],r.lines)}
      					sid={r.from}/>
		        )
          : null;

  			let to = (r.to)
          ? (
              <Station
                key={_.uniqueId('station-' + r.to)}
      					stations={this.props.stations}
      					line={_.union([r.along],r.lines)}
      					sid={r.to}/>
	          )
          : null;

        let boro_general = (r.in)
          ? (<Text>{ r.in }</Text>)
          : null;

        let bypass_stations = (r.bypass)
          ? (r.bypass
              .map( s => (<Station
                key={_.uniqueId('station-' + s)}
      					stations={this.props.stations}
      					line={_.union([r.along],r.lines)}
      					sid={s}/> ) )
              .reduce((prev, curr) => [prev, ', ', curr])
            )
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

        function getBypassText() {
          return (<Text style={rcStyle.flex1}>{ bypass_stations }.</Text>);
        }

        function getBoroGeneralText(boro_general) {
          return (<Text style={rcStyle.flex1}>in { boro_general }.</Text>);
        }

        function getNormalText(from, to) {
          return (<Text style={rcStyle.flex1}>from {from} until {to}.</Text>);
        }

        function getBetweenText(from, to) {
          return (<Text style={rcStyle.flex1}>between {from} and {to}.</Text>);
        }

  			return (
          <View key={_.uniqueId()} style={ rcStyle.container }>

            <Text style={ rcStyle.pre }>{ pre }</Text>

            { trains }

            <Text style={ rcStyle.main, rcStyle.lineMessage }>
              { action } { line_change && along }

              { // No stations, just "in Boro".
                (boro_general) &&
                getBoroGeneralText(boro_general) }

              { // No stations, just "in Boro".
                (!boro_general && bypass_stations) &&
                getBypassText(bypass_stations) }

              { // Normal Stations from/to.
                (!boro_general && !bypass_stations) && !no_svc_between &&
                getNormalText(from, to) }

              { // Normal Stations from/to.
                (no_svc_between) &&
                getBetweenText(from, to) }

            </Text>
          </View>
  			);
      }
      catch (err) {
        console.error('Problem with route change: ', r);
      }

		});
  }

  render() {
		return (
			<View>
        { // className="route-change"
          this.getRoutes()
       }
			</View>
		);
	}
}

RouteChange.propTypes = {
  routeInfo: PropTypes.any.isRequired,
  stations: PropTypes.any.isRequired,
};
