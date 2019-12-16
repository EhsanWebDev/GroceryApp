import React, { Component } from 'react';
import Constants from 'expo-constants';
import { CheckBox } from 'react-native-elements'
import { Container, Header, Content, ListItem, Button, Radio, Right, Left } from 'native-base';

import { Text,View,ActivityIndicator,StyleSheet,ScrollView,RefreshControl} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {connect} from 'react-redux'
import {autoSignIn,thisAddress,allAddress} from '../../store/actions'
import {setTokens,getTokens,URL} from '../../utls'
import {validateAll,validations} from 'indicative/validator'
import Axios from 'axios';


class userAddress extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
        isauth:false,
        loading:true,
        data:[],
        value: false,
    };
  }
  
  static navigationOptions={
  
     headerTitle:'Manage Addresses'
  }

  manageState=(isauth,loading)=>{
  
    this.setState({
      isauth,
      loading
    })
  }

  componentDidMount(){

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
              this.props.dispatch(allAddress(this.props.user.auth.ID))
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
  filterData=( event, id,add,city)=>{
      
      const data={};
      data.ID=id;
      data.STREETADDRESS=add;
      data.CITY=city
     // console.log(data)  
     this.props.dispatch(thisAddress(data));
      this.props.navigation.navigate('PlaceOrders')
    }

  renderAddress=(data)=>{
    let i = 0;
    return data.map((item)=>(
      <View key={item.ID} style={{borderWidth:2,borderColor:'#ddd',padding:10}}>
        <View style={{padding:10}}>
        <Text style={{fontSize:18,textAlign:'center',alignSelf:'center',padding:5}}>Reciever Name: {item.CUSTOMERNAME} </Text>
          <Text style={{fontSize:18,textAlign:'center',alignSelf:'center',padding:5}}>Street Address: {item.STREETADDRESS} </Text>
          <Text style={{fontSize:16,textAlign:'center',alignSelf:'center',padding:5}}>
              Phone Nummber: {item.PHONE}
          </Text>
        </View>
            
            
            <Button small onPress={(event) => this.filterData(event, item.ID,item.STREETADDRESS,item.CITY)}
                    style={{alignItems:'center',justifyContent:'center'}}
              >
              <Text style={{fontSize:16,fontWeight:'600',color:'#fff'}}>Use This Address</Text>
            </Button>
      </View>
    ))
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
                  <View style={{flex:1}}>
                    <Button success block onPress={()=>this.props.navigation.navigate('addAddress')}>
                      <Text style={{fontSize:18,color:'#fff',fontWeight:'bold'}}>ADD NEW ADDRESS</Text>
                    </Button>
                    <ScrollView 
                    >
                      {this.props.address.address ? this.renderAddress(this.props.address.address)
                      :
                      <Text style={{fontSize:18,alignSelf:'center',textAlign:'center'}}> You haven't saved any address, Add One to Proceed</Text>
                      }
          
                    </ScrollView>
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
const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: "#2c3e50",
    height: Constants.statusBarHeight,
  },mainHeader:{
    flexDirection:'row', 
    backgroundColor:'#222f3e',
    padding : 40,
    alignItems: 'flex-start',
},
imageContainer:{
    marginRight: 30,
},
imageStyle:{
    borderColor:'white' ,
     borderWidth:1,
     
},
boxStyle:{
    
    backgroundColor:'#22a6b3',
    borderColor:'#ddd',
    shadowColor: '#000',
    shadowOffset:{width:2 , height:2},
    shadowOpacity:1,
    elevation:5,
    borderWidth:1,
    marginTop: 10,
    padding:10,
    marginRight:10,
    
},
boxText:{
    fontSize:16,
    color:'white',
    
}
  
}

)

const mapStateToProps=(state)=>{
  return{
    user:state.user,
    address:state.address
  }
  }



export default connect(mapStateToProps)(userAddress);
