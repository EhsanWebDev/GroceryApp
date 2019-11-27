import React, { Component } from 'react';
import Constants from 'expo-constants';
import { Input } from 'react-native-elements';
import {  Icon, Button, Form, Item, Picker } from 'native-base';
import { Text,View,ActivityIndicator,StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {connect} from 'react-redux'
import {autoSignIn, userAddressAct} from '../../store/actions'
import {setTokens,getTokens} from '../../utls'

import {validateAll,validations} from 'indicative/validator'

class userAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isauth:false,
        loading:true,
        selected2: undefined,
        name:'',
        mobile:'',
        address:'',
        errors:{}
        
      
    };
  }
  static navigationOptions={
  
     headerTitle:'Enter Your Shipping Details'
  }

  manageState=(isauth,loading)=>{
    this.setState({
      isauth,
      loading
    })
  }

  componentDidMount(){
    getTokens((val)=>{
      if(val[0][1] === null){
        this.manageState(false,false)
      }
      else{
        this.props.dispatch(autoSignIn(val[0][1])).then(()=>{
          !this.props.user.auth?
          this.manageState(false,false):
          setTokens(this.props.user.auth.ID, ()=>{
            this.manageState(true,false)
          })
        })
      }
    })
  } 


  registerUser= async(data) =>{

    const rules={
        name:'required|string',
        mobile:'required|string|max:11|min:11',
        address:'required|string|max:100'
    }

    const messages={
        required:(field)=>`${field} is required`,
        'mobile.max':'Mobile Number must be of 11 Digits',
        'mobile.min':'Mobile Number must be of 11 Digits',
        'address.max':'Max limit reached'

        
    }

try{
        await validateAll(data,rules,messages).then(()=>{
           this.setState({errors:{},})
           this.props.dispatch(userAddressAct(data))
           this.props.navigation.navigate('PlaceOrders') 
           })   
        }catch(errors){
        const formattedErrors={};
        errors.forEach(error=>formattedErrors[error.field] = error.message);
        this.setState({
            errors:formattedErrors
        })
}

}


submitForm=(data)=>{
    
  this.props.dispatch(userAddressAct(data))
  this.props.navigation.navigate('PlaceOrders') 
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
          <View>
              {this.state.isauth?
                   <View style={{marginTop:Constants.statusBarHeight,
                                 padding:10 
                                  }}>
                    <Input
                   placeholder='Reciever Name'
                   onChangeText={(value)=>this.setState({name:value})}
                   value={this.state.name}
                 />
                 {this.state.errors['name'] && 
                   <Text style={{fontSize:16,color:'#c23616',fontWeight:'500',textAlign:'center'}}>{this.state.errors['name']}</Text>
                   }
                   <Input
                   placeholder='Contact Number'
                   keyboardType="phone-pad"
                   onChangeText={(value)=>this.setState({mobile:value})}
                   value={this.state.mobile}
                 />
                  {this.state.errors['mobile'] && 
                   <Text style={{fontSize:16,color:'#c23616',fontWeight:'500',textAlign:'center'}}>{this.state.errors['mobile']}</Text>
                   }
                   <Input
                   placeholder='Your Shipping Address'
                   onChangeText={value=>this.setState({address:value})}
                   value={this.state.address}
                 />
                  {this.state.errors['address'] && 
                   <Text style={{fontSize:16,color:'#c23616',fontWeight:'500',textAlign:'center'}}>{this.state.errors['address']}</Text>
                   }

          <Form>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select your City"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
              >
                <Picker.Item label="Lahore" value="key0" />
              
              </Picker>
            </Item>
          </Form>
          <View style={{justifyContent:'flex-end'}}>
            <Button block success onPress={()=> this.registerUser(this.state)}>
            <Text style={{color:'#fff',fontSize:18}}>Proceed</Text>
          </Button>
           
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
                       
                      transparent
                        onPress={()=>this.props.navigation.navigate('Login')}
                      ><Text>Login / Register</Text></Button>
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
    user:state.user
  }
  }

export default connect(mapStateToProps)(userAddress);
