import React, { Component } from 'react';
import { View, Text } from 'react-native';

class OrderSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    renderProdList=(data)=>{
        return data.map((item)=>
            <View key={item.id} style={{flexDirection:'row',justifyContent:'space-around',borderWidth:1,borderColor:'#000'}}>
                
                            <Text style={{fontSize:16,fontWeight:'500',marginBottom:5}}> {item.name} </Text>
                            <Text style={{fontSize:16,fontStyle:'italic'}}> {item.units} x </Text>
                            
            </View>
        )
    }
     calPrice=(items)=>{

        return items.reduce((total,item)=>{
            if(item.discountedPrice){
                return total + item.discountedPrice * item.units
            }
            else{
                return total + item.price * item.units
            }
        },0)
          
      }

    render() {
        return (
            <View>
                <Text style={{fontWeight:'600',fontSize:18}}>
                            Products List</Text>
                
                {this.props.items?this.renderProdList(this.props.items):null}
                <Text style={{fontWeight:'600',fontSize:18,marginVertical:10}}>Total Price =    {this.calPrice(this.props.items)} </Text>
                <Text style={{fontWeight:'600',fontSize:18,marginVertical:10}}>Discount =    0% </Text>
                <Text style={{fontWeight:'600',fontSize:18,marginVertical:10}}>Grand Total =    {this.calPrice(this.props.items)} </Text>
            </View>
        );
    }
}

export default OrderSummary;