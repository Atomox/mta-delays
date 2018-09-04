import React from 'react';
import { Platform, AppRegistry, StyleSheet } from 'react-native';

import { remCalc, emCalc } from './Common.styles';

// TrainLine
export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: "wrap"
  },
  flex1: {
    flex: 1
  },
  lineMessage: {
    flex: 1,
    flexWrap: "wrap",
    borderBottomWidth: 3,
  },
  pre: {
    width: remCalc(2),
    color: "#8A8A8A",
    fontWeight: "200",
  },
  main: {
    backgroundColor: "#AAA"
  }
});
