import React ,{Component} from "react";
import { View,ActivityIndicator,Text,StyleSheet,Button,Platform, KeyboardAvoidingView } from 'react-native';
import Input from '../../Components/input'
import ValidationRules from './ValidationRules'
import {connect} from 'react-redux'
import {signUp,signIn} from '../../store/actions'
import {setTokens} from '../../utls'
 class AuthForm extends Component {

    state = {
        
            loading:false,
          
        type:'Login',
        action:'Login',
        userNAME:"",
        actionMode:'I want to Register',
        hasErrors:false,
        form:{
            email:{
                value:"",
                valid:false,
                type:"textinput",
                rules:{
                    isRequired:true,
                    isEmail:true
                }

            },
            mobileNumber:{
                value:"",
                valid:false,
                type:"textinput",
                rules:{
                    isRequired:true,
                    isNumber:true,
                    maxLength:11
                }
            },
            password:{
                value:"",
                valid:false,
                type:"textinput",
                rules:{
                    isRequired:true,
                    minLength:6
                }
            },
            confirmPassword:{
                value:"",
                valid:false,
                type:"textinput",
                rules:{
                    confirmPass:'password',
                }
            },
            username:{
                value:"",
                valid:false,
                type:"textinput",
                rules:{
                    isRequired:true,
                    maxLength:10
                }
            }
        }
    }
  
       
   

    updateInput = (name,value)=>{
        this.setState({
            hasErrors:false
        });

        let formCopy = this.state.form;
        formCopy[name].value= value;

        let rules = formCopy[name].rules
        let valid = ValidationRules(value,rules,formCopy)
        
        formCopy[name].valid=valid;

        this.setState({
            form:formCopy
        })
    }


   

    confirmPassword = () =>(
        
       
        
              
                    this.state.type != 'Login' ? 
               
            <KeyboardAvoidingView enabled behavior="padding">

             <Input 
                placeholder = "Confirm Your Password"
                placeholderTextColor="#000"
                type={this.state.form.confirmPassword.type}
                value={this.state.form.confirmPassword.value}
                onChangeText ={ value => this.updateInput("confirmPassword",value)}
                secureTextEntry
                autoCapitalize="none"

                />
                 <Input 
                    placeholder = "Enter Email"
                    placeholderTextColor="#000"
                    type={this.state.form.email.type}
                    value={this.state.form.email.value}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onChangeText ={ value => this.updateInput("email",value)}
                />

                <Input 
                placeholder = "Enter your Mobile Number"
                placeholderTextColor="#000"
                type={this.state.form.mobileNumber.type}
                value={this.state.form.mobileNumber.value}
                onChangeText ={ value => this.updateInput("mobileNumber",value)}
                keyboardType="number-pad"
                />

              
        </KeyboardAvoidingView>
            
        :null 
               
              )
             
             

        
          

       
        

    formHasErros =()=>(
        this.state.hasErrors ? 
            <View style={styles.container}>

                <Text style={styles.label}>
                       Please,Check your info.
                </Text>
            </View>

        :null
    )
    manageAccess=()=>{

      

        if(!this.props.user.auth.id){
             this.setState({hasErrors:true})
         }
         else{
             setTokens(this.props.user.auth,()=>{
                 this.setState({hasErrors:false,loading:false})

                 this.props.goNext();
             })
         }
     }

     manageSignUp=()=>{
            if(this.props.user.res.res !== 200){
                this.setState({hasErrors:false})
            }
            else{
                
                this.props.navigate.navigate('VerifyEmail');
                this.changeFormType();
            }
     }
   
   

    submitUser=()=>{
        let isFormValid=true;
        let formToSubmit={};
        const formCopy=this.state.form;

        for (let key in formCopy){
            if(this.state.type === 'Login'){
                //Login
                if(key !=='mobileNumber' && key!=='confirmPassword' && key!=='email'){
                        isFormValid = isFormValid && formCopy[key].valid;
                        formToSubmit[key] = formCopy[key].value;
                }
            }
            else{
                isFormValid = isFormValid && formCopy[key].valid;
                formToSubmit[key] = formCopy[key].value;
            }
        }

        if(isFormValid){
                if(this.state.type === 'Login'){
                    
                    this.props.dispatch(signIn(formToSubmit)).then(()=>{
                            this.manageAccess()
                            this.setState({loading:true})
                    })
                    
                }
                else{
                    //console.log(formToSubmit)
                    this.props.dispatch(signUp(formToSubmit)).then(()=>{
                        this.manageSignUp();
                        
                        

                    })
                }
        }else{
            this.setState({
                hasErrors:true
            })
        }
    }
   
   


    changeFormType=()=>{
        const type = this.state.type;
        

        this.setState({
            type: type === 'Login'? 'Register':'Login',
            action: type ==='Login'? 'Register':'Login',
            actionMode:type==='Login'? 'I want to Login' : 'I want to register'
        })
    }

  
    render(){

        if(this.state.loading){
            return( 
              <View style={styles.loading}>
                <ActivityIndicator size="large" color="seagreen"/>
              </View>
            )
      
          }else{
              return(
            <View>

                <Input 
                    placeholder = "Enter your UserName"
                    placeholderTextColor="#000"
                    type={this.state.form.username.type}
                    value={this.state.form.username.value}
                    onChangeText ={value => this.updateInput("username",value)}
                    autoCapitalize="none"
                />
               

            <Input 
                placeholder = "Enter Your Password"
                placeholderTextColor="#000"
                type={this.state.form.password.type}
                value={this.state.form.password.value}
                onChangeText ={ value => this.updateInput("password",value)}
                secureTextEntry
                autoCapitalize="none"
                />
               
            {this.confirmPassword()}
            {this.formHasErros()}

            <View style={styles.button}>
                     <Button 
                         title={this.state.action}
                         onPress={this.submitUser}
                     />

            </View>

            <View style={styles.button}>
                     <Button 
                         title={this.state.actionMode}
                         onPress={this.changeFormType}
                     />

            </View>

            <View style={styles.button}>
                     <Button 
                         title="I'll do it later"
                         onPress={this.props.goNext}
                     />

            </View>

           
            

            </View>
        )
          }
     
        
    }
}

const styles = StyleSheet.create({
    container:{
            marginVertical:20,
            backgroundColor:'#f44336',
            padding:10
    },
    label:{
        color:'#fff',
        textAlign:'center',
        textAlignVertical:'center'
    },
    button:{
            ...Platform.select({
                ios:{
                    marginBottom: 0,
                },
                android:{
                    marginVertical:10
                }
            })
    }
})

const mapStateToProps=(state)=>{
console.log(state)
    return{
        user:state.user
    }
}


export default connect(mapStateToProps)(AuthForm)