import React from 'react';
import { AppRegistry, StyleSheet } from 'react-native';

import { remCalc, emCalc, colorPalette } from './Common.styles';

const cardHeaderHeight = remCalc(1);

// Card
export default StyleSheet.create({
  groupLineCard: {
    borderLeftWidth: 4,
    borderStyle: 'solid',
    margin: remCalc(.25),
    paddingTop: remCalc(.35),
    paddingBottom: remCalc(.05),
    paddingLeft: remCalc(.5)
  },
  h3: {
    margin: 0,
    marginRight: remCalc(.5)
  },
  boro: {
    paddingLeft: remCalc(.5),
    paddingRight: remCalc(.5),
    fontWeight: "200"
  },
  lines: {
    fontWeight: "200",
  	color: "#777"
  },
  weight1: {
    color: colorPalette.unplanned
  },
  weight2: {
    color: colorPalette.planned
  },
  weight4: {
    color: colorPalette.minor
  },
  weight5: {
    color: colorPalette.minor
  }
});
