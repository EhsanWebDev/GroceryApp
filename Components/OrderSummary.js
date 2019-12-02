import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container, Header, Content, Item,Button } from 'native-base';
import { Input } from 'react-native-elements';
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
                <Text style={{fontWeight:'600',fontSize:20,marginBottom:5}}>
                            PRODUCTS LIST</Text>
                
                {this.props.items?this.renderProdList(this.props.items):null}
                <Text style={{fontWeight:'600',fontSize:18,marginVertical:5}}>Total Price =    {this.calPrice(this.props.items)} </Text>
                <View style={{flexDirection:'row',justifyContent:'space-around',paddingHorizontal:5}}>
                    
                <Input
                    placeholder='ENTER PROMO CODE'
                />
                 <Button success>
                     <Text style={{fontWeight:'600',color:'#fff',padding:5,fontSize:16}}>CHECK</Text>
                 </Button>
                </View>
                <Text style={{fontSize:16,marginVertical:5}}>Discount =    0% </Text>
                <Text style={{fontWeight:'600',fontSize:18,marginVertical:5,borderTopColor:'#ddd',paddingVertical:10,borderTopWidth:2}}>Grand Total =    {this.calPrice(this.props.items)} </Text>
            </View>
        );
    }
}

export default OrderSummary;