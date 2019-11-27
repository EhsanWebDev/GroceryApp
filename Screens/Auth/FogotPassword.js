import React, { Component } from 'react';
import { View,Text,ActivityIndicator} from 'react-native';
import { Kaede } from 'react-native-textinput-effects';
import {validateAll,validations} from 'indicative/validator'
import { Button } from 'native-base';
import Constants from 'expo-constants';
import axios from 'axios'
import {URL} from '../../utls'
class FogotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email:'',
            loading:false,
            errors:{},
            emailAvailable:2,
         };
    }

    static navigationOptions={
        header:null,
        
    }
    

    validateEmail= async(data) =>{

        const rules={
            email: "required|email"
 
        }

        const messages={
            required:(field)=>`${field} is required`,
            'email.regex':'The Email Syntex is Wrong',
            'email.email':'The Email Syntex is Wrong'
            
            
        }

    try{
            await validateAll(data,rules,messages).then(()=>{
                this.setState({errors:{},})

                axios.get(`${URL}api/UsersApi/IsEmailExist_F?EMAIL=`+this.state.email)
                .then((res)=>
                    this.setState({emailAvailable:res.data})
                ).catch((e)=>console.log(e))
            })  
            
    }catch(errors){
           
            
            const formattedErrors={};
            errors.forEach(error=>formattedErrors[error.field] = error.message);
            this.setState({
                errors:formattedErrors
            })
    }
    
    }
    submitEmail=(data)=>{
        this.setState({loading:true})
        axios.post(`${URL}api/LoginApi/FindPassword?EMAIL=`+data.email)
        .then(()=>{
        this.setState({loading:false})
        this.props.navigation.navigate('VerifyEmail')
    })
    }
    render() {
        if(this.state.loading){
            return( 
              <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <ActivityIndicator size="large" color="seagreen"/>
              </View>
            )
      
          }else{
        return (
            <View style={{marginTop:Constants.statusBarHeight+10}}>
                <Text style={{borderWidth:2,borderRadius:20,padding:10,marginBottom:10,width:'100%',textAlign:'center',
                    borderColor:'#000',fontSize:20,alignSelf:'center'}}>
                    Reset Your Password
                </Text>
                <Kaede
                    label={'Please Enter Your Email-Address'}
                     inputPadding={16}
                     onChangeText={value=>this.setState({email:value})}
                     value={this.state.email}
                 />
                  {this.state.errors['email'] && 
                   <Text style={{fontSize:16,fontWeight:'600',color:'#d35400', alignSelf:'center',padding:10}}>{this.state.errors['email']}</Text>
                   }

                    {this.state.emailAvailable === 0 ? 
                        <Text style={{fontSize:16,color:'red',textAlign:'center',fontWeight:'500'}}>This Email is not Registered</Text>
                       :null}

                {this.state.emailAvailable === 0   || this.state.emailAvailable === 2? 

                <Button block warning
                    onPress={()=>this.validateEmail(this.state)}
                >
                    <Text style={{fontSize:18,fontWeight:'bold',color:'#fff'}}>Validate Email</Text>
                </Button>  :
                 <Button block success 
                 onPress={()=>this.submitEmail(this.state)}
                 >
                      <Text style={{fontSize:18,fontWeight:'bold',color:'#fff'}}>Send Reset Link</Text>
                 </Button> 
            }

            </View>
        );
    }}
}

export default FogotPassword;