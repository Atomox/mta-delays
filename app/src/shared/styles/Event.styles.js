import React from 'react';
import { Platform, AppRegistry, StyleSheet } from 'react-native';

import { remCalc, emCalc } from './Common.styles';

// TrainLine
export default StyleSheet.create({
  title: {
    fontSize: remCalc(1.2),
    color: "#8A8A8A",
    fontWeight: "200",
    marginTop: remCalc(1.5),
  },
  detailContainer: {
    borderTopWidth: 1,
    borderTopColor: "#DDDDDD",
    paddingTop: remCalc(.8)
  },
  detailMessage: {
    paddingLeft: remCalc(2),
    color: "#8A8A8A",

    ...Platform.select({
     ios: {
       fontSize: remCalc(1.2),
       lineHeight: remCalc(1.6),
     },
     android: {

     },
     web: {
       fontSize: remCalc(1.5),
       lineHeight: remCalc(2),
     }
   })
  }
});
