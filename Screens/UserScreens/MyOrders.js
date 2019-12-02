import React, { Component } from 'react';
import { View,Text,ScrollView } from 'react-native';
import {connect} from 'react-redux';
import {getOrders} from '../../store/actions'


class MyOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            id:0,
            data:[]
        };
    }

    componentDidMount(){

        this.props.dispatch(getOrders(this.props.user.auth.ID))
        
        
    }
    renderOrders=(data)=>{
        return data.map((item)=>
        <View key={item.ID} style={{borderColor:'#000',borderWidth:1,padding:10,marginBottom:5}}>
            <Text style={{color:'#8e44ad',fontSize:14}}>Order Tracking ID: {item.ID} </Text>
            <Text style={{fontSize:18,fontWeight:'500'}}> Ordered By:  {item.CUSTOMERNAME} </Text>
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
          case 0:   return  <Text style={{color:'#d35400',fontSize:16,fontWeight:'bold'}}> Order Placed </Text>;
          case 1: return  <Text style={{color:'#f1c40f',fontSize:16,fontWeight:'bold'}}> Order In-Progress </Text>;
          case 2:  return  <Text style={{color:'#2ecc71',fontSize:16,fontWeight:'bold'}}> Order Delivered </Text>;
          default:      return "#FFFFFF";
        }
      })()}
 
                         </Text>
                </View>
        </View>
        )
    }
    render() {
        return (
            <View>
                {this.props.orders?
                <ScrollView>
                    {this.renderOrders(this.props.orders)}

                </ScrollView>
                
                :null}
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