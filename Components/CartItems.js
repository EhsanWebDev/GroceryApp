import React, { Component } from 'react';
import { View,ScrollView, Text,StyleSheet,Image} from 'react-native';
import {URL} from '../utls'
import { Button } from 'native-base';
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
                  style={{height:100,width:100,resizeMode:'contain'}} />
      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',flex:1}}>
            <View style={{marginLeft:25}}>
                       <Text style={{marginLeft:1, fontSize:20,fontWeight:'bold'}}>{item.name}</Text>
                        {item.discountedPrice? 
                              <View style={{paddingVertical:5}}>
                              <Text style = {{fontSize:14 ,}}>Discounted Price: RS 
                             <Text style={{fontSize:14 , paddingVertical:5}}> { item.discountedPrice}</Text>

                             </Text>
                     
                           </View>
                            :
                            <View style={{paddingVertical:5}}>
                            <Text style = {{fontSize:14 ,}}>Unit Price: RS
                                <Text style = {{fontSize:14 ,}}> {item.price} </Text>
                             </Text>
                          
                          </View>
                        }
                      <Text style={{fontSize:16,paddingVertical:5}}>Total Price: {item.units * item.price} </Text>

                        
           <View style={{flexDirection:'row',flex:1,justifyContent:'space-between'}}>
             <View style={{flexDirection:'row',marginRight:70}}>
             <Button
                  success small rounded
              onPress={() => this.props.removeOne(item)}
              style={{padding:10,margin:5}}
              >
                <Text style={{color:'#fff',fontWeight:'bold',fontSize:24}}>-</Text>
              </Button>
            
              <Button
                  dark small rounded
                  style={{padding:10,margin:5}}
              >
                <Text style={{color:'#fff',fontWeight:'bold',fontSize:18}}> {item.units} </Text>
              </Button>

              <Button
                  success small rounded
                  onPress={() => this.props.addItem(item)}
                  style={{padding:10,margin:5}}
              >
                <Text style={{color:'#fff',fontWeight:'bold',fontSize:24}}>+</Text>
              </Button>
             </View>
           <View style={{}}>
           <Button
                  danger small rounded
                  onPress={() => this.props.RemoveEntire(item)}
                  style={{padding:10,margin:5}}
              >
                <Text style={{color:'#fff',fontWeight:'600',fontSize:16}}>x</Text>
              </Button>
           </View>
            

           </View>
          
          

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
