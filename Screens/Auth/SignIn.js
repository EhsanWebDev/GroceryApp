import React, { Component } from 'react';
import { View,Text,Button,ActivityIndicator,TouchableOpacity,KeyboardAvoidingView } from 'react-native';
import Logo from './LoginLogo'
import { Hoshi } from 'react-native-textinput-effects';
import { connect} from 'react-redux'
import{ signIn} from '../../store/actions/index'
import {validateAll,validations} from 'indicative/validator'
import {setTokens} from '../../utls'
import axios from 'axios'
import {URL} from '../../utls'
 class SignInForm extends Component{
        constructor(){
            super();

            this.state={
                loading:false,
                username:'',
                password:'',
                errors:false,
                validErrors:{},
                data:[]
            }
        }

    static navigationOptions={
        header:null,
       
    }
    manageAccess=()=>{
        if(!this.props.user.auth){
             this.setState({errors:true,loading:false})
         }
         else{
             setTokens(this.props.user.auth.ID,()=>{
                 this.setState({errors:false,loading:false})
                 this.props.navigation.navigate('Home')
             })
         }
     }

    submitUser=(data)=>{
       
              
    }
    registerUser= async(data) =>{

        const rules={
            username:'required',
            password:"required"
        }

        const messages={
            required:(field)=>`${field} is required`,
            
        }

    try{
            await validateAll(data,rules,messages).then(()=>{
               this.setState({validErrors:{}})
               var currentdate = new Date(); 
               var datetime = currentdate.getFullYear()   + "/"
                       + (currentdate.getMonth()+1)  + "/" 
                       + currentdate.getDate()
       
                  data.created = datetime;
                  data.updated = datetime;

               this.props.dispatch(signIn(data)).then(()=>{
              
                this.setState({loading:true})
                this.manageAccess()
                })  
            }) 
            
    }catch(errors){
            const formattedErrors={};
            errors.forEach(error=>formattedErrors[error.field] = error.message);
            this.setState({
                validErrors:formattedErrors
            })
    }
    
    }

    render(){
        if(this.state.loading){
            return( 
              <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <ActivityIndicator size="large" color="seagreen"/>
              </View>
            )
      
          }else{
        return(
            <View style={{flex:1, backgroundColor:'#ecf0f1'}}>
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Logo/>
                </View>
                


        <KeyboardAvoidingView behavior="padding"
                 style={{flex:1,justifyContent:'center'}}>
            <View >
            <Hoshi
                style={{marginBottom:10}}
                 label={'Username'}
                 borderColor={'#27ae60'}
                 borderHeight={3}
                inputPadding={16}
                onChangeText={value=>this.setState({username:value})}
                value={this.state.username}
                autoCapitalize="none"
   
                />
   {this.state.validErrors['username'] && 
                   <Text style={{fontSize:16,fontWeight:'600',}}>{this.state.validErrors['username']}</Text>
                   }
        

            <Hoshi
                style={{marginBottom:10}}
                 label={'Password'}
                 borderColor={'#27ae60'}
                 borderHeight={3}
                inputPadding={16}
                secureTextEntry
                onChangeText={value=>this.setState({password:value})}
                value={this.state.password}
                autoCapitalize="none"
                />
                 {this.state.validErrors['password'] && 
                   <Text style={{fontSize:16,fontWeight:'600',}}>{this.state.validErrors['password']}</Text>
                   }
            </View>

            {this.state.errors ? <Text style={{fontSize:16,fontWeight:'bold',
                                    borderWidth:1,borderColor:'#000',padding:10,
                                    borderRadius:20,color:'red',alignSelf:'center'}}>Incorrect Username OR Password</Text>:null}

            <TouchableOpacity onPress={()=>this.props.navigation.navigate('ForgotPassword')}>
                <Text style={{marginVertical:5,alignSelf:'center'}}>Forgot Password?</Text>
            </TouchableOpacity>
            
            <View style={{width:'80%',alignSelf:'center'}}>
                 <Button   
                title="Login"
                color="#000"
                style={{padding:10}}
                onPress={()=>this.registerUser(this.state)} />
            </View>
            
               
                <View style={{justifyContent:'center',alignItems:'center'}}>
                
                <TouchableOpacity style={{borderColor:'#000',borderWidth:1,
                                        borderRadius:20,padding:5,marginTop:10}}
                                  onPress={()=>this.props.navigation.navigate('SignUp')}     
                                       >
                    <Text style={{fontSize:18,}}>Not a Member? SignUp</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{borderColor:'#000',borderWidth:1,
                                        borderRadius:20,padding:5,marginTop:10}}
                                  onPress={()=>this.props.navigation.navigate('Home')}     
                                       >
                    <Text style={{fontSize:18,}}>I'll Do it Later</Text>
                </TouchableOpacity>
                </View>
               
        
                </KeyboardAvoidingView>
            </View>
        )
    }
}
}

const mapStateToProps=(state)=>{
    console.log(state.user)
    return{
        user:state.user
    }
}

export default connect(mapStateToProps)(SignInForm)