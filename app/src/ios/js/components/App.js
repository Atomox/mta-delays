import React, {Component} from 'react';
import {Platform, StyleSheet, Text, ScrollView, View} from 'react-native';

import {styles} from '../../styles/App.styles';

import Header from '../../../shared/js/components/Header';
import Summary from '../../../shared/js/components/Summary';
import EventList from '../../../shared/js/components/EventList';

import MTADApi from '../../../shared/js/MtaDelaysApi';


if (global && !global.self && Platform.OS === 'ios') {
  global.self = global;
}

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

    const delaysApi = new MTADApi();
    delaysApi.getStatus()
    .then( data => this.initLists(data) )
    .catch( data => this.initLists({ status: false }) );
  }

  initLists = (data) => {
    console.log('initLists: ', data);

    this.setState(prevState => {
      prevState.status = (data.status) ? data.status : false;
      prevState.events = (data.events) ? data.events : [];
      prevState.age = (data.timestamp) ? data.timestamp : Date.now();
      prevState.archive = (data.archive) ? data.archive : null;
      prevState.summary = (data.summary) ? data.summary : null;

      return prevState;
    });
  }

  render() {
    return (
      <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between'
        }}>
        <Header
          age={this.state.age}
          status={this.state.status}
          numEvents={this.state.events.length}
          archive={this.state.archive}
          summary={this.state.summary}/>

        <Summary
          events={this.state.events}
          age={this.state.age}
          status={this.state.status}
          numEvents={this.state.events.length}
          archive={this.state.archive}
          summary={this.state.summary}
          />

        <EventList
          events={this.state.events}/>
      </ScrollView>
      </View>
    );
  }
}
