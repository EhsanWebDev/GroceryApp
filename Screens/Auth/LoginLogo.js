import React from "react";
import { View, Image } from 'react-native';
import LogoImage from '../../assets/logo.png'

const LogoComponent = ()=> {
    return (
        <View style={{
            justifyContent:'center',
            alignItems:'center'}}>
            <Image 
                source = {LogoImage}
                resizeMode ="contain"
                style ={{
                    width:200,
                    height:200,

                }}

            />
        </View>
    )
}

export default LogoComponent;