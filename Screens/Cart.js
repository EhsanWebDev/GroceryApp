import React, { Component } from 'react';
import { View, Text,TouchableOpacity } from 'react-native';
import CartItems from '../Components/CartItems'
import {connect }from 'react-redux'

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  calPrice=()=>{

    return this.props.cartItems.reduce((total,item)=>{
        if(item.discountedPrice){
            return total + item.discountedPrice * item.units
        }
        else{
            return total + item.price * item.units
        }
    },0)
      
  }

  static navigationOptions={
    headerTitle:'Your Cart',
}


  render() {
    console.log(this.props)
    return (
      <View style={{flex:1}}>
         {this.props.cartItems.length > 0 ?
         <View style={{flex:1}}>
             <CartItems
                        
                        items={this.props.cartItems}
                        onPress={this.props.removeItem} />
                       <TouchableOpacity style={{padding:5,flexDirection:'row',justifyContent:'center',width:'100%',
                                  height:40,backgroundColor:'red',justifyContent:'space-between'}}
                                  onPress={()=>this.props.navigation.navigate('Address')}
                                  >
                          <Text style={{color:'#fff',fontSize:16,
                                        fontWeight:'500'}}>
                                          Checkout
                                       
                                         
                                          </Text>
                                          <Text style={{color:'#fff',fontSize:16,fontWeight:'500'}}>
                                            Total Price:
                                             {this.calPrice()}
                                          </Text>
                          </TouchableOpacity>
         </View>
                  
                        
                    : <Text style={{
                                     color:'seagreen',fontSize:20,fontWeight:'bold'}}>
                                       No items in your cart</Text>
                }

                  
      </View>
    );
  }
}

const mapStateToProps=(state)=>{
  console.log(state)
    return{
            cartItems:state.cart
    }
}
const mapDispatchToProps = (dispatch) => {
  return {
      removeItem: (product) => dispatch({ type: 'REMOVE_FROM_CART', payload: product })
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (Cart);
