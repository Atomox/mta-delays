import React from 'react';
import { AppRegistry, StyleSheet } from 'react-native';

import { remCalc, emCalc } from './Common.styles';

// Card
export default StyleSheet.create({
  cardDefault: {
    borderColor: '#8A8A8A',
    borderWidth: 1,
    margin: remCalc(.5),
  	borderBottomLeftRadius: remCalc(.5),
  	borderBottomRightRadius: remCalc(.5)
  },
  cardTitle: {
    fontSize: remCalc(1.2) // 1.2rem
  },
  cardSubtitleStrong: {
  	color: '#D8D8D8',

  },
  cardRibbon: {

  },
  cardTitleH3: {
    color: '#999',
  	textAlign: 'right',
  	paddingRight: remCalc(.75)
  },
  cardSection: {
    padding: remCalc(1)
  },
  unplannedIncidentTitle: {
  	backgroundColor: '#ffe2e2'
  }
});
