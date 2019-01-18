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
  }
});
