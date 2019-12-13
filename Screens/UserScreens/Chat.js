import React, { Component, } from 'react';
import { View,Text,KeyboardAvoidingView,ActivityIndicator,  } from 'react-native';
import {Header, Body, Right, Button, Title ,Left, Icon,Segment, Content,Container,} from 'native-base'
import { GiftedChat } from 'react-native-gifted-chat'
import Constants from 'expo-constants';
import {connect} from 'react-redux'
import {autoSignIn , newMSG} from '../../store/actions'
import {setTokens,getTokens,removeTokens, URL} from '../../utls'
import { Ionicons } from '@expo/vector-icons';
import Axios from 'axios'

class Chat extends Component {
  _isMounted = false;
    state = {
      messages: [],
      isauth:false,
      loading:true,
      message:null
    }
    static navigationOptions={
      header:null
    }
    manageState=(isauth,loading)=>{
      this.setState({
        isauth,
        loading
      })
    }
    componentDidMount() {
      this._isMounted = true;
      getTokens((val)=>{
        if(val[0][1] === null){
          this.manageState(false,false)
        }
        else{
          this.props.dispatch(autoSignIn(val[0][1])).then(()=>{
            !this.props.user.auth?
            this.manageState(false,false):
            setTokens(this.props.user.auth.ID,()=>{
              this.manageState(true,false)
            })
            
          })
        }
      })
      Axios.get(`${URL}api/ChatApi/receive?userqueue=ehsan47`)
      .then(res=>this.props.dispatch(newMSG(res.data))).catch(e=>console.log(e))
  }
      componentWillUnmount(){
        this._isMounted= false;
      }
     /* componentWillUpdate(nextState){
        if(this.state.messages!== nextState.messages){
          Axios.get(`${URL}api/ChatApi/receive?userqueue=ehsan47`)
          .then(res=>this.props.dispatch(newMSG(res.data))).catch(e=>console.log(e))
        }

      }*/
      getMore(){
        Axios.get(`${URL}api/ChatApi/receive?userqueue=ehsan47`)
         .then(res=>this.props.dispatch(newMSG(res.data))).catch(e=>console.log(e))
          
      }
      onSend(messages = []) {
        const item = this.props.navigation.getParam('item');
        const request = {};
        request.STORE_ID = item.STORE_ID;
        request.USER_ID = this.props.user.auth.ID;
        request.MESSAGE = messages[0].text;
        request.SENDER = "CUSTOMER";
        request.friend = "Talha786"
        console.log(request)
      
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }))
      }
    
    render() {
      const item = this.props.navigation.getParam('item');
      if(this.state.loading){
        return(
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size="large"/>
          </View>
        )
      }
      else{
        return (
          <View style={{flex:1}}>
            {this.state.isauth?
             <View style={{flex:1}}>
             <Header  style={{ backgroundColor: "seagreen",marginTop:Constants.statusBarHeight }}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Text style={{fontSize:16,color:'#fff'}}> {item.STORE} </Text>
            
          </Body>
          <Right>
            <Button transparent small onPress={()=>this.getMore()}>
              <Text>Refresh</Text>
            </Button>
          </Right>
        </Header>
         <KeyboardAvoidingView keyboardVerticalOffset={20} behavior="padding" style={{flex:1}}>
            <GiftedChat
            
             messages={this.props.chat}
             onSend={messages => this.onSend(messages)}
             user={{
                 _id: 1,
                 }}
      />
     
        </KeyboardAvoidingView>
       </View>
          
          :
          <View style={{margin:Constants.statusBarHeight+50,
            justifyContent:'center'
            ,alignItems:'center'}}>
<Ionicons name="md-sad" size={80} color='#d5d5d5' />
<Text style={{fontSize:16,fontWeight:'400'}}>We're Sorry you need to registered / Logged in
  to see this section
</Text>

<View style={{marginTop:10}}>
  
<Button
   
   block success
   style={{padding:10}}
    onPress={()=>this.props.navigation.navigate('Login')}
  ><Text style={{fontSize:16,fontWeight:'600',fontStyle:'italic',color:'#f7f7f7'}}>Login / Register</Text></Button>
  </View>
</View>
          }
          </View>
          
         
         
           
        );
    }}
}

const mapStateToProps=(state)=>{
  console.log(state)
  return{
    user:state.user,
    chat:state.chat
  }
  }

  export default connect(mapStateToProps)(Chat);