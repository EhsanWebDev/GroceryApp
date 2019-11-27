import React, { Component } from 'react';
import { Text,View, ActivityIndicator } from 'react-native';
import {Icon,Button, } from 'native-base'
import { Input } from 'react-native-elements';

class CheckAuth extends Component {
    constructor(props) {
        super(props);
        this.state = { loading:false ,
           
            form:{
                username:{
                    value:""
                  },
                  password:{
                    value:""
                  }, 

            }
        
        };
    }
    updateInput = (name,value)=>{
       

        let formCopy = this.state.form;
        formCopy[name].value= value;

        this.setState({
            form:formCopy
        })
    }

    submit=()=>{
        console.log(this.state.form.password)
    }



    render() {
            if(this.state.loading){
                return(
                    <View style={{flex:1,justifyContent:'center',
                                    alignItems:'center'}}>
                        <ActivityIndicator size='large'/>
                    </View> 
                )
            }else{
                 return (
                  <View style={{flex:1,alignItems:'center'}}>
                     <Text style={{fontSize:16,fontWeight:'bold',
                                    fontStyle:'italic'}}>
                        Please enter your current password</Text>
                        <Input
                         placeholder='PASSWORD'
                         onChangeText ={value => this.updateInput("password",value)}
                         autoCapitalize="none"
                         secureTextEntry
                         />

                         <Button block success iconRight onPress={this.submit}>
                             <Icon name='ios-arrow-dropdown-circle'/>
                             <Text>Proceed</Text>
                         </Button>
                   </View>
                     );
            }

       
    }
}

export default CheckAuth;