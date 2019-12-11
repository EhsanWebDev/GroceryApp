import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import StarRating from 'react-native-star-rating'
import { Button } from 'native-base';

class SellerViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style ={styles.mainContainer}>
          <View style={styles.rowContainer}>
                <View>
                    <Text style={{fontSize:20,fontStyle:'italic',paddingBottom:10}}>SELL BY: {this.props.item.STORE} </Text>
                    <View style={{alignItems:'center',justifyContent:'center'}}>
                    <StarRating 
                     disabled = {true}
                     starSize = {18}
                     maxStars = {5}
                     fullStarColor = 'orange'
                     rating = {4.5}
                     emptyStarColor = 'orange' />
                </View>
                </View>
          </View>
          
         
          
          <View style={{justifyContent:'center', alignItems:'center', marginTop:10}}>
              <TouchableOpacity onPress={()=>this.props.navigation.navigate('VisitStore',{
                  item:this.props.item,
                  id:this.props.item.STORE_ID
                  })}>
                  <Text style={{color:'red', fontSize:16}}>Visit Store</Text>
            </TouchableOpacity>
            <Button danger block onPress={()=>this.props.navigation.navigate('chat',{
              item:this.props.item,
            })}>
              <Text style={{fontSize:16,fontWeight:'bold',color:'#fff'}}>Chat With Seller</Text>
            </Button>
          </View>
      </View>
    );
  }
}

const styles = {
    mainContainer:{
        borderWidth:1,
        borderRadius: 5,
        borderColor: '#000',
        margin: 10,
        padding: 20,
        marginTop:20
    },
    rowContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        padding:10,

    },
    percentageContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding:10,
    },
    subPerContainer:{
        marginRight: 20,
    }
}

export default SellerViewer;
