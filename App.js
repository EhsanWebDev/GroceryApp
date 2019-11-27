import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import {RootNavigator} from './Screens/routes'
import {Provider} from 'react-redux'
import rootReducer from './store/reducers'
import store from './store'
import { AppLoading } from 'expo';

import { Ionicons } from '@expo/vector-icons';

  
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }
  
  async componentDidMount() {
    console.disableYellowBox = true; 
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    const Nav = RootNavigator();
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Provider store={store(rootReducer)}>
         <Nav/>
      </Provider>
     
    );
  }
}

//Styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
});
