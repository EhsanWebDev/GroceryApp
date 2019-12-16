import React, { Component } from 'react';
import Constants from 'expo-constants';
import {  Button, } from 'native-base';
import { Text,View,ActivityIndicator,StyleSheet,ScrollView,} from 'react-native';
import {connect} from 'react-redux'
import {thisAddress,allAddress,deleteAddress} from '../../store/actions'

class MyAddresses extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
        isauth:false,
        loading:false,
        data:[],
        value: false,
    };
  }
  
  static navigationOptions={
  
     header:null
  }

  componentDidMount(){
    this._isMounted = true;
     this.props.dispatch(allAddress(this.props.user.auth.ID))
   
  } 
  componentWillUnmount(){
    this._isMounted= false;
  }
  filterData=( event, id,add,city,phone)=>{
      
      const data={};
      data.ID=id;
      data.STREETADDRESS=add;
      data.CITY=city
      data.PHONE = phone
     // console.log(data)  
    
      this.props.dispatch(thisAddress(data))
      //this.props.navigation.navigate('PlaceOrders')
    }
    removeAddress=(id)=>{
          this.props.dispatch(deleteAddress(id))
    }

  renderAddress=(data)=>{
    let i = 0;
    return data.map((item)=>(
      <View key={item.ID} style={{borderWidth:2,borderColor:'#bdc3c7',borderRadius:15,padding:5}}>
        <View style={{padding:10}}>
        <Text style={{fontSize:18,textAlign:'center',alignSelf:'center',padding:5}}>Reciever Name: {item.CUSTOMERNAME} </Text>
          <Text style={{fontSize:18,textAlign:'center',alignSelf:'center',padding:5}}>Street Address: {item.STREETADDRESS} </Text>
          <Text style={{fontSize:16,textAlign:'center',alignSelf:'center',padding:5}}>
              Phone Nummber: {item.PHONE}
          </Text>
        </View>
            <View style={{flexDirection:'row',justifyContent:'space-around'}}>
            <Button block  onPress={(event) => this.filterData(event, item.ID,item.STREETADDRESS,item.CITY,item.PHONE)}
                    style={{alignItems:'center',justifyContent:'center',padding:10}}
              >
              <Text style={{fontSize:16,fontWeight:'600',color:'#fff'}}> Make This Default</Text>
            </Button>
            <Button block danger onPress={() => this.removeAddress(item)}
                    style={{alignItems:'center',justifyContent:'center',padding:10}}
              >
              <Text style={{fontSize:16,fontWeight:'600',color:'#fff'}}>Remove ADDRESS</Text>
            </Button>
            </View>
            
           
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
          <View style={{flex:1,marginTop:Constants.statusBarHeight}}>
                  <View style={{flex:1}}>
                    <Button success block onPress={()=>this.props.navigation.navigate('addAddress')}>
                      <Text style={{fontSize:18,color:'#fff',fontWeight:'bold'}}>ADD NEW ADDRESS</Text>
                    </Button>
                    
                      {this.props.defaultAddress?
                      <View style={{borderWidth:1,borderColor:'#000',padding:10}}>
                          <Text style={{fontSize:20,fontWeight:'700',alignSelf:'center',}}>
                               My Default Shipping Address</Text>
                         <Text style={{color:'#000',alignSelf:'center',fontSize:18}}>
                          {this.props.defaultAddress[0].STREETADDRESS}
                         </Text>
                         <Text style={{color:'#000',alignSelf:'center',fontSize:18}}>
                         {this.props.defaultAddress[0].CITY}
                         </Text>
                         <Text style={{color:'#000',alignSelf:'center',fontSize:18}}>
                         {this.props.defaultAddress[0].PHONE}
                         </Text>
                     </View>
                        :
                        <Text style={{alignSelf:'center',fontSize:18,fontWeight:'700',
                                        borderWidth:2,borderColor:'#000',padding:10}}>
                            You Don't have any default address</Text>
                     }
                
                    
                   
                    <ScrollView 
                    >
                      {this.props.address ? this.renderAddress(this.props.address)
                      :
                      <Text style={{fontSize:18,alignSelf:'center',textAlign:'center'}}> You haven't saved any address, Add One to Proceed</Text>
                      }
          
                    </ScrollView>
                  </View>
              
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
    address:state.address.address,
    defaultAddress:state.address.defaultAddress,
    user:state.user
  }
  }



export default connect(mapStateToProps)(MyAddresses);
