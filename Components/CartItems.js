import React, { Component } from 'react';
import { View,ScrollView, Text,StyleSheet,Image,Button} from 'react-native';
import {URL} from '../utls'
class CartItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  calPercentage=(price,discountRate)=>{
    const dis = discountRate / 100;
    var totalValue = price - (price * dis)
    return totalValue;
  }

  renderItems(items,onPress){
      return items.map((item)=>
      <View key={item.id} style={styles.mainContainer}>
         
         <View style={{flexDirection:'row'}}>
              <Image source={{uri:`${URL}`+item.img}}
                  style={{height:80,width:80}} />
      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',flex:1}}>
            <View>
                       <Text style={{marginLeft:10, fontSize:16,
                                fontWeight:'600',}}>{item.name}</Text>
                        {item.discountedPrice? 
                              <View style={{marginLeft:10}}>
                              <Text style = {{fontSize:14 ,fontWeight:'400',}}>RS 
                             <Text style={{fontSize:14 ,fontWeight:'400', padding:5}}>{ item.discountedPrice}</Text>

                             </Text>
                     
                           </View>
                            :
                            <View style={{marginLeft:10}}>
                            <Text style = {{fontSize:14 ,fontWeight:'400',}}>RS
                                <Text style = {{fontSize:14 ,fontWeight:'400',}}> {item.price} </Text>
                             </Text>
                          
                          </View>
                        }
                          <Text style={{marginLeft:10,fontStyle:'italic', fontSize:14,
                                fontWeight:'200',color:'green'}}>Quantity{item.units}</Text>

            </View>
            <View >
                    <Button title="Remove" 
                            style={{backgroundColor:'red'}}
                            onPress={() => onPress(item)} />
            </View>
      </View>
                  
                 
         </View>
         
            
      </View>)
  }

  render() {
     
    return (
      <ScrollView>
        {this.props.items?this.renderItems(this.props.items,this.props.onPress):null}
      </ScrollView>
    );
  }
}

const styles= StyleSheet.create({
    mainContainer:{
        padding:10,
        margin:10,
        borderWidth:1,
        borderRadius:15,
        borderColor:'#ccc',

    }
})


export default CartItems;
