import React, { Component } from 'react';
import { View, Text,StyleSheet,ActivityIndicator, KeyboardAvoidingView, } from 'react-native';
import {Icon} from 'native-base'
import Constants from 'expo-constants';
import MapView,{Marker,Circle, Callout} from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Button } from 'native-base';
import { Input } from 'react-native-elements';
import {getDistance} from 'geolib'
import Axios from 'axios';
import { URL } from '../../utls';
class Maps extends Component {
    constructor(props) {
      super(props);
      this.state = {
        mapLoaded:false,
        storeData: [],
        latitude:null,
        longitude:null,
        radius:0,
        distances:[]
      };
    }
    renderMarkers=(element)=>(
        element.map((e)=>
        <Marker
        key={e.ID}
        coordinate={{ latitude:parseFloat(e.LATITUDE) ,longitude:parseFloat(e.LONGITUDE)  }}
        image={require('../../assets/store.jpg')}
      >
        <Callout style={{padding:20}} onPress={()=>this.props.navigation.navigate('VisitStore',{
                  item:e,
                  id:e.ID
                  })}>
              <Text style={{fontSize:18,fontWeight:'700',padding:5}}>{e.NAME} </Text>
              <Text style={{fontSize:16,padding:5}}> {e.TYPE_NAME} </Text>
              <Button success block style={{padding:5}} >
                <Text style={{color:'#fff',}}>Visit Store</Text>
              </Button>
        </Callout>
        
      </Marker>
        )
    )
   calDistance=(data)=>{
        let long=data.longitude;
        let lat = data.latitude;
        const newData = data.storeData.filter(this._getPreciseDistance)
       this.setState({distances:newData})
       console.log(this.state.distances)
      }
    _getPreciseDistance = (element) => {
      let long=this.state.longitude;
      let lat = this.state.latitude;
     let pdis=   getDistance(
          {latitude: element.LATITUDE?element.LATITUDE:0,longitude: element.LONGITUDE?element.LONGITUDE:0},
          { latitude: element.LATITUDE?lat:0, longitude: element.LONGITUDE?long:0 }
        )
            if(  pdis < this.state.radius && this.state.radius !== 0){
              return pdis
            }
    };
    static navigationOptions={
      header:null
    }

   async componentDidMount(){
    
    const { status } = await Permissions.getAsync(Permissions.LOCATION)

    if (status !== 'granted') {
      const response = await Permissions.askAsync(Permissions.LOCATION)
    }
    Axios.get(`${URL}api/StoresApi/ListStore`).then((res)=>this.setState({storeData:res.data})).catch(e=>console.log(e))
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
            {this.state.distances? this.renderMarkers(this.state.distances):null}
          </MapView>
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={40}>
        
        <Input
          placeholder="Enter Radius in Meters"
          onChangeText={(value)=>this.setState({radius:value})}
          
        />
        <Button success block onPress={()=>this.calDistance(this.state)}>
          <Text style={{fontSize:18,fontWeight:'700',color:'#fff'}}>Show Stores !!</Text>
        </Button>
      
      

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