import React, { Component } from 'react';
import { View, Text,StyleSheet,ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import MapView from 'react-native-maps';

class Maps extends Component {
    constructor(props) {
      super(props);
      this.state = {
        mapLoaded:false,
        region:{
          
          longitude: -122,
          latitude: 37,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }
      };
    }
    static navigationOptions={
      header:null
    }

    componentDidMount(){
      this.setState({
        mapLoaded:true
      })
    }

    onRegionChangeComplete=(region)=>{
      this.setState({region})
    }
  
    render() {

      if(!this.state.mapLoaded){
        return(
          <View style={{flex:1,justifyContent:'center'}}>
              <ActivityIndicator size="large"/>
          </View>
        )
      }
      return (

       
      
          
          <MapView style={{flex: 1}}
              region={this.state.region}
              onRegionChangeComplete={this.onRegionChangeComplete}
         />
      
      );
    }
  }
  const styles = StyleSheet.create({
    statusBar: {
      backgroundColor: "#2c3e50",
      height: Constants.statusBarHeight,
    }
  })
  
  export default Maps;