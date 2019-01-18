import React from 'react';
import { Platform, AppRegistry, StyleSheet } from 'react-native';

import { remCalc, emCalc } from './Common.styles';


export default StyleSheet.create({
  logoContainer: {

  },
  logoH1: {
    fontSize: remCalc(4.2)
  },
  logoH2: {
    fontSize: remCalc(2.1),
    color: "#999",
    marginTop: remCalc(-1.05),
    fontWeight: "200"
  },
  logoH3: {
    fontSize: remCalc(2.1),
    color: "#999",
    marginTop: remCalc(-0.5),
    fontWeight: "bold"
  },
  dateContainer: {
    marginBottom: remCalc(3),
    marginRight: remCalc(1),
    ...Platform.select({
      ios: {
        marginBottom: remCalc(1)
      },
      android: {
        marginBottom: remCalc(1)
      },
      web: {
        marginBottom: remCalc(3)
      },
    })
  },
  dateBase: {
    textAlign: "right"
  },
  date: {
    fontSize: remCalc(3),
//    color: "red",
//    color: "#8A8A8A",

    ...Platform.select({
      ios: {
        fontSize: remCalc(1.1),
        fontWeight: "500",
      },
      android: {
        fontSize: remCalc(1.1),
      },
      web: {
        fontSize: remCalc(1.1),
        fontWeight: "500",
      },
    })
  },
  time: {
    fontSize: remCalc(2.2),
    lineHeight: remCalc(2.2),
//    color: "red",
//    color: "#8A8A8A",

    ...Platform.select({
      ios: {
        fontSize: remCalc(2.2),
        fontWeight: "500",
      },
      android: {
        fontSize: remCalc(2.2),
        fontWeight: "500",
      },
      web: {
        fontSize: remCalc(2.2),
        fontWeight: "500",
      },
    })
  },
  releaseName: {
    fontSize: remCalc(1),
    lineHeight: remCalc(1),
    marginBottom: remCalc(1),
    color: "#c8c8c8",

    ...Platform.select({
      ios: {
        fontSize: remCalc(1),
        color: "#b8b8b8"
      },
      android: {
        fontSize: remCalc(1)
      },
      web: {
        fontSize: remCalc(1)
      },
    })
  }
});
