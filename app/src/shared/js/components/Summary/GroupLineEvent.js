'use strict';

import * as _ from 'lodash';
import log from '../../includes/logger';
import { helpers } from '../../includes/helpers';
import { assembleBoros } from './Summary.helpers';

import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Txt from '../common/Txt';
import { GridRow, RowCell } from '../common/Grid';
import TrainLine from '../TrainLine';

import glStyle from '../../../styles/Summary.styles';
/**
type GroupLineCardProps = {
  events: [],
	age: 0,
};
*/

export default class GroupLineEvent extends React.Component /** <GroupLineCardProps> */ {

  getMainTag() {
    let mainTag = (this.props.event.keyword[0])
      ? this.props.event.keyword[0]
      : {tag: '', weight: 5};

    mainTag.tag = helpers.underscoreToCaps(this.props.event.keyword[0].tag);
    return mainTag;
  }

	render() {

    let mainTag = this.getMainTag();
    let tagStyleName = (mainTag.weight)
      ? 'weight' + mainTag.weight
      : 'weight5';

    return (
      <GridRow>
        <RowCell cols={ 3 }>
          <Txt styles={ glStyle.lines }>
            { (this.props.event.lines && Array.isArray(this.props.event.lines)) ? this.props.event.lines.join('/') : '' }
          </Txt>
        </RowCell>

        <RowCell cols={ 4 }>
          <Txt>
            {	(this.props.event.boro) ? assembleBoros(this.props.event.boro, true, false) : null }
          </Txt>
        </RowCell>

        <RowCell>
          <Txt styles={ glStyle[tagStyleName] }>
            {	(mainTag.tag) ? mainTag.tag : 'UNKNOWN' }
          </Txt>
        </RowCell>
      </GridRow>
    );
  }
}
