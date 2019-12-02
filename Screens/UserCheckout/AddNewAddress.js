import React, { Component } from 'react';
import { View,Text,ActivityIndicator,StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import Constants from 'expo-constants';
import {  Icon, Button, Form, Item, Picker } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import {connect} from 'react-redux'
import {setTokens,getTokens} from '../../utls'
import {addAddress,allAddress} from '../../store/actions'
import {validateAll,validations} from 'indicative/validator'
class AddNewAddress extends Component {
    constructor(props) {
        super(props);
        this.state = { 
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
               data.id=this.props.user.auth.ID; 
              this.props.dispatch(addAddress(data)).then(()=>
              this.props.dispatch(allAddress(this.props.user.auth.ID)),
              this.props.navigation.goBack()
              )
              
             // console.log(data)
               
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
        return (
            <View>
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
            </View>
        );
    }
}

const mapStateToProps=(state)=>{
    return{
      user:state.user,
    }
    }

export default connect(mapStateToProps) (AddNewAddress);