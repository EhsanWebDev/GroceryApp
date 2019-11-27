import React, { Component } from 'react';
import { View, Text,Image, TouchableOpacity } from 'react-native';


class Catagories extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View  style ={styles.mainView}>
       
          <TouchableOpacity onPress = {() => this.props.navigation.navigate(this.props.toGo,{
            catID:this.props.category,
            subID:this.props.subcategory
          
          })}>
                                  <View>
                                    
                                    <View style ={styles.imgaeContainer}>
                                        <Image source = {this.props.imageUri} style ={styles.imageStyle} />
                                    </View>
                                    
                                        
                                        <View style = {styles.textContainer}>
                                            <Text style ={styles.textStyle}>{this.props.name}</Text>
                                        </View>
                                </View>

          </TouchableOpacity>
          
           
      </View>
    );
  }
}

const styles = {
    mainView:{
        
      width:'45%',
      borderColor: '#ddd',
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset:{width:2 , height:2},
      shadowOpacity:0.9,
      elevation:5,
      borderWidth: 1,
      marginLeft: 15,
      marginTop: 20,
      backgroundColor:'#fff'
      
        
    },
    imageStyle:{
        width:'100%',
        height:150,
        resizeMode:'cover'
    }, 
    textContainer:{
        
        backgroundColor:'#16a085',
        height:40,
        justifyContent: 'center',
    },
    textStyle:{
        fontSize: 18,
        fontWeight: 'bold',
        color:'#fff',
        textAlign:'center'
    }
}

export default Catagories;
