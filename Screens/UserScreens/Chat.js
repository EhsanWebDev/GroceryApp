import React, { Component } from 'react';
import { View,Text,KeyboardAvoidingView,ActivityIndicator,  } from 'react-native';
import {Header, Body, Right, Button, Title ,Left, Icon,Segment, Content,Container,} from 'native-base'
import { GiftedChat } from 'react-native-gifted-chat'
import Constants from 'expo-constants';
import {connect} from 'react-redux'
import {autoSignIn , logOut} from '../../store/actions'
import {setTokens,getTokens,removeTokens} from '../../utls'
import { Ionicons } from '@expo/vector-icons';


class Chat extends Component {
    state = {  messages: [],
      isauth:false,
      loading:true
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
            //console.log(this.props.user.auth)
          })
        }
      })
        this.setState({
          messages: [
            {
              _id: 1,
              text: 'Hello Customer',
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
              },
            },
          ],
        })
      }
      onSend(messages = []) {
        const item = this.props.navigation.getParam('item');
        const request = {};
        request.STORE_ID = item.STORE_ID;
        request.USER_ID = this.props.user.auth.ID;
        request.MESSAGE = messages[0].text;
        request.SENDER = "CUSTOMER";
        request.friend = item.STORE
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
            <Text style={{fontSize:16,color:'#fff'}}>{this.props.user.auth.NAME}</Text>
          </Right>
        </Header>
         <KeyboardAvoidingView keyboardVerticalOffset={20} behavior="padding" style={{flex:1}}>
            <GiftedChat
            
             messages={this.state.messages}
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
    user:state.user
  }
  }

  export default connect(mapStateToProps)(Chat);