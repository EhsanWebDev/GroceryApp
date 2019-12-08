import React, { Component } from 'react';
import { View,Text,KeyboardAvoidingView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
class Chat extends Component {
    state = {  messages: [], }
    componentWillMount() {
        this.setState({
          messages: [
            {
              _id: 1,
              text: 'Hello developer',
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
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }))
      }
    
    render() {
        return (
           <View style={{flex:1}}>
             <KeyboardAvoidingView keyboardVerticalOffset={80} behavior="padding" style={{flex:1}}>
                <GiftedChat
                
                 messages={this.state.messages}
                 onSend={messages => this.onSend(messages)}
                 user={{
                     _id: 1,
                     }}
          />
         
            </KeyboardAvoidingView>
           </View>
         
         
           
        );
    }
}

export default Chat;