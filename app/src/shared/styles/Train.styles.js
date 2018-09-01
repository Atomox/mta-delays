import React from 'react';
import { Platform, AppRegistry, StyleSheet } from 'react-native';

import { remCalc, emCalc } from './Common.styles';

function getLineColor(line) {
  if (typeof line === 'string') {
    line = line.replace(/-/g, '_');
  }
  switch (line) {
    case '1_2_3':
    case 'oneTwoThree':
      return '#EE352E';
    case '4_5_6':
    case 'fourFiveSix':
      return '#00933C';
    case 7:
    case '7':
    case 'seven':
      return '#B933AD';
    case 'a_c_e':
      return '#0039A6';
    case 'b_d_f_m':
      return '#FF6319';
    case 'n_q_r_w':
      return '#FCCC0A';
    case 'g':
      return '#6CBE45';
    case 'j_z':
      return '#996633';
    case 'l':
      return '#A7A9AC';
    case 's':
      return '#808183';
    case 'SIR':
    default:
      return '#CCCCCC';
  }
}

export const trainBackgroundColorFn = (line) => {
  return StyleSheet.create({
    background: {
      backgroundColor: getLineColor(line)
    },
    color: {
      color: getLineColor(line)
    }
  });
};

// TrainLine
export default (emBaseSize) => { return StyleSheet.create({
    container: {
      width: emCalc(emBaseSize, 1.75),
      marginBottom: remCalc(1),
      alignItems: 'center',
      marginRight: remCalc(.5),
    },
    text: {
      color: "#fff",
      fontSize: emCalc(emBaseSize, 1.25),
    },
    base: {
      backgroundColor: "#999",

      width: emCalc(emBaseSize, 1.75),
      height: emCalc(emBaseSize, 1.75),
      borderRadius: emCalc(emBaseSize, 1.75)/2,
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
