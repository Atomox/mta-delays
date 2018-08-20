import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

let CardProps = {
  ribbon: null,
  header: null
};

export default class Card extends Component <CardProps> {

  	getRibbon() {
  		return (this.props.ribbon)
  			? (
  				<View className="ribbon-container">
  					<View className="ribbon">{this.props.ribbon}</View>
  				</View>
  			)
  			: null;
  	}

  	render() {
  		let key = (this.props.id) ? this.props.id : _.uniqueId('card');
  		let mainClass = "card";

  		if (this.props.cardClass) {
  			mainClass += " " + this.props.cardClass;
  		}

  		return(
  			<View className={mainClass} key={key}>
  			  <View className={this.props.headerClass}></View>
  				<View className="grid-x">
  					<View className="subtitle small-12 medium-5">
  						{ this.getRibbon() }
  						{this.props.headerSubtitle}
  					</View>
  					<View className="title small-12 medium-7">
  						<Text h3>{this.props.header}</Text>
  					</View>
  				</View>
  			  <View className="card-section small-12 medium-6">
  			    {this.props.children}
  			  </View>
  			</View>
  		);
  	}
};
