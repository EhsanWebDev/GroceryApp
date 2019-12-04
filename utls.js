import {AsyncStorage} from 'react-native'
export const URL = `http://172.16.132.183/`;


export const getTokens=async (cb)=>{

    await AsyncStorage.multiGet([
         '@grocery_userID',
     ]).then(values =>{
         cb(values);
     })
 
 }
 export const setTokens= async(values,cb)=>{
       await AsyncStorage.multiSet([
             ['@grocery_userID',values.toString()]
         ]).then(responce =>{
             cb();
         })
 }
 
 export const removeTokens = async(cb)=>{
     await AsyncStorage.removeItem('@grocery_userID').then(()=>{
         cb();
     })
 }