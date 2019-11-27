import React, { Component } from 'react';
import { View,Text } from 'react-native';
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

        this.props.dispatch(getOrders(this.props.orders.id))
        
        
    }
    renderOrders=(data)=>{
        return data.map((item)=>
        <View key={item.ID}>
                <Text> {item.CUSTOMERNAME} </Text>
        </View>
        )
    }
    render() {
        return (
            <View>
                {this.props.orders?
                <View style={{borderColor:'#000',borderWidth:1,padding:10,}}>
                    <Text style={{fontSize:16,fontStyle:'italic',fontWeight:'500'}}> Ordered By {this.props.orders.CUSTOMERNAME} </Text>
                    <View style={{marginTop:10}}>
                        <Text style={{fontSize:16,fontWeight:'400',marginBottom:10}}>
                            Address: {this.props.orders.STREETADDRESS},{this.props.orders.CITY}
                        </Text>
                        <Text style={{fontSize:16,fontWeight:'400',marginBottom:10}}>
                            Mobile Number: {this.props.orders.PHONE}
                        </Text>

                        <Text style={{fontSize:16,fontWeight:'600',marginBottom:10}}>
                            Order Amount: {this.props.orders.AMOUNT}
                        </Text>
                        <Text>Order Status :{this.props.orders.ORDERSTATUS === 'Order Placed' ? <Text style={{color:'#d35400',fontSize:16,fontWeight:'bold'}}> {this.props.orders.ORDERSTATUS} </Text> : null }  </Text>
                             
                        

                        
                    </View>

                </View>
                
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