import React, { Component } from 'react';
import { View, Text,StyleSheet,TextInput,Picker,KeyboardAvoidingView } from 'react-native';

const input=(props)=>  {

    let templete =null;

    switch(props.type){

        case "textinput":
            templete = 
            <TextInput 
            {...props}
            
            style={styles.input}
            />
            break;

         default : 
         return templete;   
    } 
    return templete;
  }
 
const styles = StyleSheet.create({
    input:{
        width:'100%',
        padding:5,
        borderBottomColor:'#cecece',
        borderBottomWidth:2,
        marginBottom:10,
        fontSize:16,

    }
})
export default input;
