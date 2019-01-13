import React from 'react';
import { Platform, AppRegistry, StyleSheet } from 'react-native';

import { remCalc, emCalc } from './Common.styles';


export default StyleSheet.create({
  date: {
    fontSize: remCalc(3),
//    color: "red",
//    color: "#8A8A8A",

    marginBottom: remCalc(3),
    ...Platform.select({
      ios: {
        fontSize: remCalc(3),
        fontWeight: "300",
      },
      android: {
        fontSize: remCalc(3),
      },
      web: {
        fontSize: remCalc(3),
        fontWeight: "200",
      },
    })
  }
});
