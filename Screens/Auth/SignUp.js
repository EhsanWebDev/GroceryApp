import React from 'react';
import { Text,View,Button,StyleSheet,KeyboardAvoidingView,ActivityIndicator} from 'react-native';
import {Hoshi} from 'react-native-textinput-effects';
import {validateAll,validations} from 'indicative/validator'
import axios from 'axios'
import {signUp, signIn} from '../../store/actions'
import {connect} from 'react-redux'
import {URL} from '../../utls'
import Constants from 'expo-constants';
import Logo from './LoginLogo'
import RNPasswordStrengthMeter from 'react-native-password-strength-meter';
class SignUp extends React.Component{
        constructor(){
            super();
            this.state={
                username:'',
                password:'',
                password_confirmation:'',
                email:'',
                mobile:'',
                errors:{},
                data:[],
                emailAvailable:2,
                loading:false
            }
        }

        static navigationOptions={
            header:null,
           
        } 

        registerUser= async(data) =>{

            const rules={
                username:'required|string',
                email: "required|email|regex:"+validations.regex(['^([\w-\.]+)@@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$']),
                password:"required|confirmed|min:6",
                mobile:'required|string|max:11|min:11'
            }

            const messages={
                required:(field)=>`${field} is required`,
                'email.regex':'The Email Syntex is Wrong',
                'email.email':'The Email Syntex is Wrong',
            
                'password.confirmed':'The password did not match',
                'password.min':'password is short, it should be more than 4 characters',
                'mobile.max':'Mobile Number must be of 11 Digits',
                'mobile.min':'Mobile Number must be of 11 Digits',

                
            }

        try{
                await validateAll(data,rules,messages).then(()=>{
                   this.setState({errors:{}, loading:true})

                axios.get(`${URL}api/UsersApi/IsUserExist_F?username=`+this.state.username).then((res)=>{
                       this.setState({data:res.data, loading:false})
                        axios.get(`${URL}api/UsersApi/IsEmailExist_F?EMAIL=`+this.state.email)
                        .then((res)=>{
                            this.setState({emailAvailable:res.data})

                        }).catch((e)=>console.log(e))
                       
                   }).catch((e)=>console.log(e))
                  
                })
                
              
                
                
        }catch(errors){
               
                
                const formattedErrors={};
            
                errors.forEach(error=>formattedErrors[error.field] = error.message);
          
                
                
                
                this.setState({
                    errors:formattedErrors
                })
        }
        
        }

        signUpUser=(data)=>{
            this.setState({loading:true})
            var currentdate = new Date(); 
            var datetime = currentdate.getFullYear()   + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getDate()
    
               data.created = datetime;
               data.updated = datetime;

               this.props.dispatch(signUp(data)).then(()=>{
                   this.setState({loading:false})
                   this.props.navigation.navigate('VerifyEmail')
               })
        }


    render(){
        if(this.state.loading){
            return( 
              <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <ActivityIndicator size="large" color="seagreen"/>
              </View>
            )
      
          }else{
        
        return (

          <View style={{flex:1}}>
     

<KeyboardAvoidingView
            behavior="height"
            style={{
              flex: 1,
              justifyContent:'center',
              backgroundColor: "#ddd"
            }}
          >
            <Logo/>
    
            <Hoshi
              style={styles.textInput}
              label="Username"
              inputPadding={14}
              borderColor={'#27ae60'}
              
              onChangeText={value => this.setState({ username: value })}
              value={this.state.username}
            />
            {this.state.errors["username"] && (
              <Text style={{
                fontSize:16,
                                    borderWidth:1,borderColor:'#000',padding:5,
                                    borderRadius:20,color:'red',alignSelf:'center'
               }}>
                {this.state.errors["username"]}
              </Text>
            )}
            {this.state.data.length > 0 ? (
              <Text
                style={{ fontSize:16,
                  borderWidth:1,borderColor:'#000',padding:5,
                  borderRadius:20,color:'red',alignSelf:'center' }}
              >
                This Username is Already Taken
              </Text>
            ) : null}
            <Hoshi
              style={styles.textInput}
              label="Email"
              keyboardType="email-address"
              
              borderColor={'#27ae60'}
              onChangeText={value => this.setState({ email: value })}
              value={this.state.email}
            />
            {this.state.errors["email"] && (
              <Text style={{  fontSize:16,
                borderWidth:1,borderColor:'#000',padding:5,
                borderRadius:20,color:'red',alignSelf:'center' }}>
                {this.state.errors["email"]}
              </Text>
            )}

            {this.state.emailAvailable === 1 ? (
              <Text
                style={{  fontSize:16,
                  borderWidth:1,borderColor:'#000',padding:5,
                  borderRadius:20,color:'red',alignSelf:'center'}}
              >
                This Email is Already Registered
              </Text>
            ) : null}

            <Hoshi
              style={styles.textInput}
              label="Mobile Number"
            
              borderColor={'#27ae60'}
              onChangeText={value => this.setState({ mobile: value })}
              value={this.state.mobile}
              keyboardType="phone-pad"
            />
            {this.state.errors["mobile"] && (
              <Text style={{ fontSize:16,
                borderWidth:1,borderColor:'#000',padding:5,
                borderRadius:20,color:'red',alignSelf:'center' }}>
                {this.state.errors["mobile"]}
              </Text>
            )}
        
            <RNPasswordStrengthMeter
              inputStyle={{color:'#000'}}
              placeholderStyle= {{fontWeight:'bold'}}
              onChangeText={value => this.setState({ password: value })}
              meterType="bar"
              defaultPassword={this.state.password}
            />
        
            
            {this.state.errors["password"] && (
              <Text style={{ fontSize:16,
                borderWidth:1,borderColor:'#000',padding:5,
                borderRadius:20,color:'red',alignSelf:'center'}}>
                {this.state.errors["password"]}
              </Text>
            )}
            <Hoshi
              style={styles.textInput}
              label="Confirm Password"
              inputPadding={14}
              
              borderColor={'#27ae60'}
              onChangeText={password_confirmation =>
                this.setState({ password_confirmation })
              }
              value={this.state.password_confirmation}
              secureTextEntry
              
            />

            {this.state.emailAvailable === 0 && this.state.data === 0 ? (
              <View style={{ width: "100%", marginTop: 10,padding:10 }}>
                <Button
                  title="SignUp"
                  onPress={() => this.signUpUser(this.state)}
                  color="seagreen"
                />
              </View>
            ) : (
              <View style={{ width: "100%", marginTop: 10,padding:10 }}>
                <Button
                  title="Check Availibility"
                  onPress={() => this.registerUser(this.state)}
                  color="#000"
                />
              </View>
            )}
          </KeyboardAvoidingView>

          </View>
        
        );
    }}
}

const styles= StyleSheet.create({
    textInput:{
    
        
        width:'100%',
        marginBottom:5
    }
})

export default connect(null)(SignUp);

