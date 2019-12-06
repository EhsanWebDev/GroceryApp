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
    return (
      <View style={{flex:1}}>
         {this.props.cartItems.length > 0 ?
         <View style={{flex:1}}>
             <CartItems
                         
                        items={this.props.cartItems}
                        RemoveEntire={this.props.removeItem}
                        addItem={this.props.addItem}
                        removeOne={this.props.removeOne}
                        />
                       <TouchableOpacity style={{padding:5,flexDirection:'row',alignItems:'center',width:'100%',
                                  height:50,backgroundColor:'#e84118',justifyContent:'space-around'}}
                                  onPress={()=>this.props.navigation.navigate('Address')}
                                  >
                          <Text style={{color:'#fff',fontSize:20,
                                        fontWeight:'500'}}>
                                          Checkout
                                          </Text>
                                          <Text style={{color:'#fff',fontSize:20,fontWeight:'500'}}>
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
    return{
            cartItems:state.cart
    }
}
const mapDispatchToProps = (dispatch) => {
  return {
      removeItem: (product) => dispatch({ type: 'REMOVE_FROM_CART', payload: product }),
      addItem: (product) => dispatch({ type: 'ADD_TO_CART', payload: product }),
      removeOne:(product) => dispatch({ type: 'REMOVE_ONE', payload: product }),
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (Cart);
