import React, { Component } from 'react';
import { View,Text,ScrollView,Dimensions } from 'react-native';
import {connect} from 'react-redux';
import {getOrders,deleteOrder} from '../../store/actions'
import * as Progress from 'react-native-progress';
import { Button } from 'native-base';
class MyOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            id:0,
            data:[]
        };
    }
static navigationOptions={
    headerTitle:'My Orders'
}
    componentDidMount(){

        this.props.dispatch(getOrders(this.props.user.auth.ID))
        
        
    }
    deleteOrder=(e,id)=>{
        this.props.dispatch(deleteOrder(id))
    }
    renderOrders=(data)=>{
        return data.map((item)=>
        <View key={item.ID} style={{borderColor:'#000',borderWidth:1,padding:10,marginBottom:5}}>
            <Text style={{color:'#8e44ad',fontSize:14}}>Order Tracking ID: {item.ID} </Text>
            <Text style={{fontSize:16,fontWeight:'500'}}> Ordered By:  {item.CUSTOMERNAME} </Text>
                 <View style={{marginTop:10}}>
                        <Text style={{fontSize:16,fontWeight:'400',marginBottom:10}}>
                            Address: {item.STREETADDRESS},{item.CITY}
                        </Text>
                        <Text style={{fontSize:16,fontWeight:'400',marginBottom:10}}>
                            Mobile Number: {item.PHONE}
                        </Text>

                        <Text style={{fontSize:16,fontWeight:'400',marginBottom:10}}>
                            Order Amount: RS {item.AMOUNT}
                        </Text>
                        <Text>Order Status :
                        {(() => {
        switch (item.ORDERSTATUS) {
          case 0:   return  <Text style={{color:'#d35400',fontSize:18,fontWeight:'bold'}}> Order Placed </Text>;
          case 1: return  <Text style={{color:'#f1c40f',fontSize:18,fontWeight:'bold'}}> Order In-Progress </Text>;
          case 2:  return  <Text style={{color:'#2ecc71',fontSize:18,fontWeight:'bold'}}> Order Delivered </Text>;
          default:      return null;
        }
      })()}
 
                         </Text>
             
         <View style={{marginTop:10}}>
    
                         {(() => {
        switch (item.ORDERSTATUS) {
          case 0:   return  <Progress.Bar progress={0.3} width={null} height={8} />;
          case 1: return  <Progress.Bar progress={0.7} width={null} height={8} />;
          case 2:  return  <Progress.Bar progress={1} width={null} height={8} />;
          default:      return null;
        }
      })()}
    </View>
    <View style={{marginBottom:5,marginTop:10}}>
                         {(() => {
        switch (item.ORDERSTATUS) {
          case 0:   return <Button small danger onPress={(e)=>this.deleteOrder(e,item.ID)} style={{textAlign:'center',justifyContent:'center'}}><Text style={{fontSize:18,fontWeight:'800',color:'#fff',alignSelf:'center'}}>Cancel Order</Text></Button>
          case 1:   return <Button small danger onPress={(e)=>this.deleteOrder(e,item.ID)} style={{textAlign:'center',justifyContent:'center'}}><Text style={{fontSize:18,fontWeight:'800',color:'#fff',alignSelf:'center'}}>Cancel Order</Text></Button>
          default:      return null;
        }
      })()}
                         </View>
                </View>
        </View>
        )
    }
    render() {
        
        return (
            <View style={{flex:1}}>
                {this.props.orders.length > 0?
                <ScrollView>
                    {this.renderOrders(this.props.orders)}

                </ScrollView>
                
                :
                <Text style={{fontSize:20,fontStyle:'italic',textAlign:'center'}}>You haven't Placed any orders yet.</Text>
                }
            </View>
        );
    }
}

const mapStateToProps=(state)=>{
    return{
        user:state.user,
        orders:state.order
    }
}

export default connect(mapStateToProps) (MyOrders);