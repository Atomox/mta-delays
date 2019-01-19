import React, { Component } from 'react';
import { View } from 'react-native';

import gStyles from '../../../styles/Grid.styles';

let GridProps = {
  styles: [],
};

export class GridRow extends Component <GridProps> {

    getHeading(type) {
      return (this.props.heading && this.props.heading === type) ? true : false;
    }

    render() {
  		return(
  			<View
          style={ [this.props.styles, gStyles.row] }>
			    {this.props.children}
  			</View>
  		);
  	}
};

export class RowCell extends Component <GridProps> {

    getHeading(type) {
      return (this.props.heading && this.props.heading === type) ? true : false;
    }

    render() {
  		return(
  			<View
          style={ [this.props.styles, gStyles.rowCell] }>
			    {this.props.children}
  			</View>
  		);
  	}
};

export class GridCol extends Component <GridProps> {

    getHeading(type) {
      return (this.props.heading && this.props.heading === type) ? true : false;
    }

    render() {
  		return(
  			<View
          style={ [this.props.styles, gStyles.col] }>
			    {this.props.children}
  			</View>
  		);
  	}
};
