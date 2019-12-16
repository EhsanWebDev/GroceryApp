import React, { Component } from 'react';
import { Container, Header, Content, ListItem, Button, Radio, Right, Left } from 'native-base';
import { Text,View,ActivityIndicator,StyleSheet,ScrollView,RefreshControl} from 'react-native';
import {connect} from 'react-redux'
import {setTokens,getTokens,URL} from '../../utls'
import {autoSignIn,} from '../../store/actions'
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
class ConfirmAddress extends Component {
    _isMounted = false;
    state = { 
        isauth:false,
        loading:true, 
    }
    manageState=(isauth,loading)=>{
  
        this.setState({
          isauth,
          loading
        })
      }
      static navigationOptions={
          headerTitle:'Choose Shipping Address'
      }
    componentDidMount() {
        this._isMounted = true;
        getTokens((val)=>{
          if(val[0][1] === null){
            this.manageState(false,false)
          }
          else{
              if(this._isMounted){
                this.props.dispatch(autoSignIn(val[0][1])).then(()=>{
                  !this.props.user.auth?
                  this.manageState(false,false):
                 // this.props.dispatch(allAddress(this.props.user.auth.ID))
                  setTokens(this.props.user.auth.ID, ()=>{
                    this.manageState(true,false)
                  })
                })
              }
          }
        })
    }
    componentWillUnmount(){
        this._isMounted= false;
      }
    
    render() {
        if(this.state.loading){
            return(
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size="large"/>
              </View>
            )
          }
          else{
              return(
                  <View style={{flex:1}}>
                    {this.state.isauth?
                    <View>
                          {this.props.address.defaultAddress?
                            <View style={{borderWidth:1,borderColor:'#000',padding:10}}>
                                <Text style={{fontSize:20,fontWeight:'700',alignSelf:'center',}}>
                                     My Default Shipping Address</Text>
                               <Text style={{color:'#000',alignSelf:'center',fontSize:18}}>
                                {this.props.address.defaultAddress[0].STREETADDRESS}
                               </Text>
                               <Text style={{color:'#000',alignSelf:'center',fontSize:18}}>
                               {this.props.address.defaultAddress[0].CITY}
                               </Text>
                               <Text style={{color:'#000',alignSelf:'center',fontSize:18}}>
                               {this.props.address.defaultAddress[0].PHONE}
                               </Text>
                               <Text style={{alignSelf:'center',fontSize:22,marginTop:30}}>OR</Text>
                               <Button warning block onPress={()=>this.props.navigation.navigate('MyAddresses')}>
                                      <Text style={{padding:10,color:'#fff',fontWeight:'bold',fontSize:20}}>Choose another default Address</Text>
                                  </Button>

                           </View>
                              :
                              <View>
                                 <Text style={{alignSelf:'center',fontSize:18,fontWeight:'700',
                                              borderWidth:2,borderColor:'#000',padding:10}}>
                                  You Don't have any default address</Text>
                                  
                                  <Button danger block onPress={()=>this.props.navigation.navigate('MyAddresses')}>
                                      <Text style={{padding:10,color:'#fff',fontWeight:'bold',fontSize:20}}>Choose Default Address</Text>
                                  </Button>
                              </View>
                          
                           }   

                            <View style={{marginTop:10}}>
                               {this.props.address.defaultAddress?
                                    <Button success block onPress={()=>this.props.navigation.navigate('PlaceOrders')}>
                                        <Text style={{padding:10,color:'#fff',fontWeight:'bold',fontSize:20}}>Proceed to Checkout... </Text>
                                    </Button>
                                : null
                            
                                }
                           </View>     
                    </View>
                    :
            <View style={{margin:Constants.statusBarHeight+50,
                        justifyContent:'center'
                        ,alignItems:'center'}}>
            <Ionicons name="md-sad" size={80} color='#d5d5d5' />
            <Text style={{fontSize:16,fontWeight:'400'}}>We're Sorry you need to registered / Logged in
              to see this section
            </Text>

            <View style={{marginTop:10}}>
              
            <Button
               
               block success
               style={{padding:10}}
                onPress={()=>this.props.navigation.navigate('Login')}
              ><Text style={{fontSize:16,fontWeight:'600',fontStyle:'italic',color:'#f7f7f7'}}>Login / Register</Text></Button>
              </View>
        </View>
                    }
                   </View>
              )

    }
}
}
const mapStateToProps=(state)=>{
    return{
      address:state.address,
      user:state.user
    }
    }
export default connect(mapStateToProps)(ConfirmAddress);