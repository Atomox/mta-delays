import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import {styles} from '../../styles/App.styles';

import Header from '../../../shared/js/components/Header';

//import MTADApi from '../../../../shared/sdk/MtaDelaysApi';

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);

    this.state = {
      status: 'initializing',
      age: 0,
      events: [],
      archive: null,
      summary: null
    }

//    const delaysApi = new MTADApi();
//    delaysApi.getStatus()
//      .then(data => console.warn(data));
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          age={this.state.age}
          status={this.state.status}
          numEvents={this.state.events.length}
          archive={this.state.archive}
          summary={this.state.summary}/>
      </View>
    );
  }
}
