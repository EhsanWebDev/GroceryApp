import React from 'react';
import { View, Text } from 'react-native';

const ValidationRules=(value,rules,form)=>{

    let valid=true
    for( let rule in rules){
        switch(rule){
            case "isEmail":
                    valid = valid && validationEmail(value)
                    break;                          
            default :
                    valid = true; 
        }
    }
        return valid;
}

validationRequired=(value)=>{
    if(value !==''){
        return true
    }
    return false
}

validationEmail = (email)=>{
const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
return expression.test(String(email).toLocaleLowerCase());
}



export default ValidationRules;
