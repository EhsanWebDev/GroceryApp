import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

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
                    <Text style={{fontSize:16,fontWeight:'bold'}}> {this.props.item.STORE} </Text>
                </View>
                <View>
                    <TouchableOpacity style={{borderColor:'red',borderWidth:1,padding:5}}>
                       <Text style={{color:'red', fontSize:18}}>Follow</Text>
                    </TouchableOpacity>
                </View>
          </View>
          
          <View style={styles.percentageContainer}>
                <View style={styles.subPerContainer}>
                    <Text style={{fontSize:24, fontWeight:'bold'}}>75%</Text>
                    <Text style={{fontSize:12,textAlign:'center', color:'grey'}}>Positive User Ratings</Text>
                </View>

                <View style={styles.subPerContainer}>
                    <Text style={{fontSize:24, fontWeight:'bold'}}>89%</Text>
                    <Text style={{fontSize:12, color:'grey' }}>Ship on Time</Text>
                </View>

                <View style={styles.subPerContainer}>
                    <Text style={{fontSize:22, fontWeight:'bold'}}>95%</Text>
                    <Text style={{fontSize:12, color:'grey'}}>Chat Response Rate</Text>
                </View>
               
               
          </View>
          
          <View style={{justifyContent:'center', alignItems:'center', marginTop:10}}>
              <TouchableOpacity onPress={()=>this.props.navigation.navigate('VisitStore',{
                  itemName:this.props.item.STORE_ID
                  })}>
                  <Text style={{color:'red', fontSize:16}}>Visit Store</Text>
            </TouchableOpacity>
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
        padding: 5,
        marginTop:20
    },
    rowContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
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
