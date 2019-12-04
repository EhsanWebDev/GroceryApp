import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Container, Header, Content, Item,Button } from 'native-base';
import { Input } from 'react-native-elements';
import {uniqBy,filter} from 'lodash'
import Axios from 'axios';
import {URL} from '../utls'
class OrderSummary extends Component {
    constructor(props) {
        super(props);
        this.state = { loading:false,
                    promo:'',
                    promoRes:[],
        };
    }

    renderProdList=(data)=>{
        return data.map((item)=>
            <View key={item.id} style={{flexDirection:'row',justifyContent:'space-between',borderWidth:1,borderColor:'#000',marginBottom:10}}>
                
                            <Text style={{fontSize:16,fontWeight:'500',marginBottom:5}}> {item.name} </Text>
                            <Text style={{fontSize:16,fontWeight:'500',marginBottom:5}}> {item.store} </Text>
                            <Text style={{fontSize:16,fontStyle:'italic'}}> total: {item.price * item.units}  </Text>
                            
            </View>
        )
    }
    calPercentage=(price,discountRate)=>{
        const dis = discountRate / 100;
        var totalValue = price - (price * dis)
        return totalValue;
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

      UniqueByID=(promo)=>{
      
          Axios.get(`${URL}api/PromoApi/GetPromo?promo=`+promo)
          .then(res=>{
            this.setState({promoRes:res.data})
          
          let data = filter(this.props.items,{'store_id':this.state.promoRes.STORE_ID});
         let total =  this.calPrice(data)
       //  console.log(data);
         //  console.log(this.state.promoRes.AMOUNT)
      let dis=   this.calPercentage(total,this.state.promoRes.AMOUNT);
          console.log(dis)
          }).catch(e=>console.log(e));

          
          
      }

    render() {
        if(this.state.loading){
            return(
                <View style={{justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size="large" />
            </View>
            )
          
        }else{

        
        return (
            <View>
                <Text style={{fontWeight:'600',fontSize:20,marginBottom:5}}>
                            PRODUCTS LIST</Text>
                
                {this.props.items?this.renderProdList(this.props.items):null}
                <Text style={{fontWeight:'600',fontSize:18,marginVertical:5}}>Total Price =    {this.calPrice(this.props.items)} </Text>
                <View style={{flexDirection:'row',justifyContent:'space-around',paddingHorizontal:5}}>
                    
                <Input
                    placeholder='ENTER PROMO CODE'
                    onChangeText={(value)=>this.setState({promo:value})}
                />
                 <Button success onPress={()=>this.UniqueByID(this.state.promo)}>
                     <Text style={{fontWeight:'600',color:'#fff',padding:5,fontSize:16}}>CHECK</Text>
                 </Button>
                </View>
                <Text style={{fontSize:16,marginVertical:5}}>Discount =    0% </Text>
                <Text style={{fontWeight:'600',fontSize:18,marginVertical:5,borderTopColor:'#ddd',paddingVertical:10,borderTopWidth:2}}>Grand Total =    {this.calPrice(this.props.items)} </Text>
            </View>
        );
        }
    }
}

export default OrderSummary;