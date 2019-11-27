import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import Constants from 'expo-constants';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  static navigationOptions={
    header:null
  }

  render() {
    return (
      <View>
        <View style={styles.statusBar} />
        <Text> Settings </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: "#2c3e50",
    height: Constants.statusBarHeight,
  }
})

export default Settings;
