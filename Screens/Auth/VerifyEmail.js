import React ,{Component} from "react";
import { View,Text,Button,Platform , StyleSheet} from 'react-native';
import {Icon} from 'native-base'
class VerifyEmail extends Component{

    static navigationOptions={
        header:null
    }

    render(){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Icon name="mail-unread" style={{color:'#FF6347',fontSize:120,}} />
                <Text style={{fontSize:18,padding:10,fontStyle:'italic'}}>Email sent Successfully, Please Verify Your Email.</Text>
                <Button style={styles.button} title="Go to Login" onPress={()=>this.props.navigation.navigate('SignIn')}></Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
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

export default VerifyEmail;