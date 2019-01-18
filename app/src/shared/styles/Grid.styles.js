import React from 'react';
import { AppRegistry, StyleSheet } from 'react-native';

import { remCalc, emCalc, colorPalette } from './Common.styles';

const cardHeaderHeight = remCalc(1);

// Card
export default StyleSheet.create({
  row: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
  },
  col: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "column",
  }
});
