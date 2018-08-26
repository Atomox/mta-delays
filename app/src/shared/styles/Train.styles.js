import React from 'react';
import { Platform, AppRegistry, StyleSheet } from 'react-native';

import { remCalc, emCalc } from './Common.styles';

// TrainLine
export default (emBaseSize) => { return StyleSheet.create({
    container: {
      width: emCalc(emBaseSize, 2),
      marginBottom: remCalc(.5),
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {
      color: "#fff",
      fontSize: emCalc(emBaseSize, 1.25),
    },
    base: {
      backgroundColor: "#999",
  //    -moz-border-radius: 50%;
  //    -webkit-border-radius: 50%;

      width: emCalc(emBaseSize, 1.5),
      height: emCalc(emBaseSize, 1.5),
      borderRadius: emCalc(emBaseSize, 1.5)/2,
      margin: emCalc(emBaseSize, .25),

      /**
       * Problems: Width/Height should be EMs, not REMs.
       * inline-flex does not work with iOS.
       */

      ...Platform.select({
       ios: {
         alignItems: 'center',
         justifyContent: 'center',
       },
       android: {

       },
       web: {
         display: "inline-flex",
         marginTop: 0,
         marginBottom: 0,
         marginLeft: remCalc(.25),
         marginRight: remCalc(.25),
         justifyContent: "center",
         alignItems: "center",
       }
     }),
    },
    direction: {
      width: emCalc(emBaseSize, 1.75),
      fontSize: emCalc(emBaseSize, .5),
      lineHeight: emCalc(emBaseSize, .5),
      textAlign: "center",
      color: "#AAA",
      ...Platform.select({
        ios: {
          fontWeight: "800"
        }
      })
    }
  });
}
