import React, { Component } from 'react';
import { View, Text,StyleSheet,Dimensions,Image } from 'react-native';


export default class HomeSlider extends Component{

    render(){
        return(
           <View>
                
                <Image source= {this.props.imageUri} 
                    style ={{width:Dimensions.get('window').width, height:200,resizeMode:'cover'}}
                    
                />
            </View>
    );
    }
    
}
   

 
  
 