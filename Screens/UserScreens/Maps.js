import React, { Component } from 'react';
import { View, Text,StyleSheet,ActivityIndicator,Platform, KeyboardAvoidingView } from 'react-native';
import Constants from 'expo-constants';
import MapView,{Marker,Circle} from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Button } from 'native-base';
import { Input } from 'react-native-elements';
class Maps extends Component {
    constructor(props) {
      super(props);
      this.state = {
        mapLoaded:false,
        latitude:null,
        longitude:null,
        radius:0
      };
    }
    static navigationOptions={
      header:null
    }

   async componentDidMount(){
    const { status } = await Permissions.getAsync(Permissions.LOCATION)

    if (status !== 'granted') {
      const response = await Permissions.askAsync(Permissions.LOCATION)
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => this.setState({ latitude, longitude }, ()=>console.log('state:',this.state)),
      (error) => console.log('Error:', error)
    )
      
      this.setState({
        mapLoaded:true,
        
      })
    }

    onRegionChangeComplete=(region)=>{
      this.setState({region})
    }
  
    render() {
    const {latitude,longitude} = this.state;
    if(latitude){
      return (
        <View style={{ flex: 1 ,marginTop:Constants.statusBarHeight}}>
        
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude,
              longitude,
              latitudeDelta: 0.00924,
              longitudeDelta: 0.00421
            }}
          >
            <Circle
              center={{ longitude, latitude }}
              radius={this.state.radius?parseInt(this.state.radius):0}
              strokeWidth={2}
              strokeColor={"rgba(230, 126, 34,1.0)"}
              fillColor={"rgba(52, 152, 219,0.5)"}
            />
            <Marker
              coordinate={{ longitude, latitude }}
              title="My Location"
            ></Marker>
          </MapView>
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={40}>
        
        <Input
          placeholder="Enter Radius in Meters"
          onChangeText={(value)=>this.setState({radius:value})}
          
        />

        </KeyboardAvoidingView>
        
        </View>
      );
    }
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size="large" />
      </View>
     
    )
   
    }
  }
  const styles = StyleSheet.create({
    statusBar: {
      backgroundColor: "#2c3e50",
      height: Constants.statusBarHeight,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      textAlign: 'center',
    },
  })
  
  export default Maps;