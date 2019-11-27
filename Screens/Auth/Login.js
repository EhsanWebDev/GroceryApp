import React, { Component } from 'react';
import { View, Text,StyleSheet,ActivityIndicator,Button } from 'react-native';
import {setTokens,getTokens} from '../../utls'
import Constants from 'expo-constants';
import Logo from './LoginLogo'
import Form from './AuthForm'
import {connect} from 'react-redux'
import {autoSignIn} from '../../store/actions'
import {bindActionCreators} from 'redux'
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:true
    };
  }
  static navigationOptions={
    header:null
  }

  componentDidMount(){
   
    getTokens((value)=>{
      if(value[0][1] === null)
      {
        this.setState({loading:false})
      }
      else{
          this.props.autoSignIn(value[0][1]).then(()=>{
            if(!this.props.user.auth.id){
              this.setState({loading:false})
            }
            else {
              setTokens(this.props.user.auth,()=>{
                this.goNext();
              })
            }
          })
      }
    })

   
  }

  goNext=()=>{
    this.props.navigation.navigate('Home')
  }
 

  render() {
    if(this.state.loading){
      return( 
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="seagreen"/>
        </View>
      )

    }else{

      return (
      <View style={{padding:30,backgroundColor:'#fff',flex:1}}>
        <View style={styles.statusBar} />
        <Logo />
        <Form goNext={this.goNext} navigate={this.props.navigation}/>
        
      </View>
    );
    }
  
  }
}
const styles = StyleSheet.create({
  statusBar: {
    
    height: Constants.statusBarHeight,
  },
  loading:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})

const mapStateToProps=(state)=>{
return{
  user:state.user
}
}
const mapDispatchToProps=(dispath)=>{
    return bindActionCreators({autoSignIn},dispath)
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
