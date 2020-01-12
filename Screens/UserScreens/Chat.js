import React, { Component } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";
import {
  Header,
  Body,
  Right,
  Button,
  Title,
  Left,
  Icon,
  Segment,
  Content,
  Container
} from "native-base";
import { GiftedChat } from "react-native-gifted-chat";
import Constants from "expo-constants";
import { connect } from "react-redux";
import { autoSignIn, newMSG } from "../../store/actions";
import { setTokens, getTokens, removeTokens, URL } from "../../utls";
import { Ionicons } from "@expo/vector-icons";
import Axios from "axios";

class Chat extends Component {
  _isMounted = false;
  state = {
    messages: [],
    isauth: false,
    loading: true,
    message: null
  };
  static navigationOptions = {
    header: null
  };
  manageState = (isauth, loading) => {
    this.setState({
      isauth,
      loading
    });
  };
  componentDidMount() {
    this._isMounted = true;
    getTokens(val => {
      if (val[0][1] === null) {
        this.manageState(false, false);
      } else {
        this.props.dispatch(autoSignIn(val[0][1])).then(() => {
          !this.props.user.auth
            ? this.manageState(false, false)
            : setTokens(this.props.user.auth.ID, () => {
                this.manageState(true, false);
              });
        });
      }
    });
    if (this._isMounted) {
      Axios.get(`${URL}api/ChatApi/receive?userqueue=ehsan47`)
        .then(res => {
          if (res.data !== null) {
            this.setState({
              messages: [
                {
                  _id: Math.round(Math.random() * 1000000),
                  text: res.data,
                  createdAt: new Date(),
                  user: {
                    _id: Math.round(Math.random() * 1000000),
                    name: "React Native",
                    avatar: "https://placeimg.com/140/140/any"
                  }
                }
              ]
            });
          }
        })
        .catch(e => console.log(e));
    }
  }
  componentWillMount() {
    setInterval(() => this.getMore(), 1000);
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  getMore() {
    if (this._isMounted) {
      Axios.get(`${URL}api/ChatApi/receive?userqueue=ehsan47`)
        .then(res => {
          if (res.data !== null) {
            this.setState(previousState => ({
              messages: GiftedChat.append(previousState.messages, {
                _id: Math.round(Math.random() * 1000000),
                text: res.data,
                createdAt: new Date(),
                user: {
                  _id: Math.round(Math.random() * 1000000),
                  name: "React Native",
                  avatar: "https://placeimg.com/140/140/any"
                }
              })
            }));
          }
        })
        .catch(e => console.log(e));
    }
  }
  onSend(messages = []) {
    const item = this.props.navigation.getParam("item");
    const request = {};
    var currentdate = new Date();
    var datetime =
      currentdate.getFullYear() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getDate();
    request.CREATED_AT = datetime;
    request.UPDATED_AT = datetime;
    // console.log(request);

    Axios({
      url: `${URL}api/ChatApi/sendmsg`,
      method: "POST",
      data: JSON.stringify({
        STORE_ID: this.props.user.auth.ID,
        USER_ID: this.props.user.auth.ID,
        MESSAGE: messages[0].text,
        // SENDER: "CUSTOMER",
        friend: "talha786"
        // CREATED_AT: datetime,
        //UPDATED_AT: datetime
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => null)
      .catch(e => alert("error with chat server"));

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }

  render() {
    const item = this.props.navigation.getParam("item");
    if (this.state.loading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          {this.state.isauth ? (
            <View style={{ flex: 1 }}>
              <Header
                style={{
                  backgroundColor: "seagreen",
                  marginTop: Constants.statusBarHeight
                }}
              >
                <Left>
                  <Button
                    transparent
                    onPress={() => this.props.navigation.goBack()}
                  >
                    <Icon name="arrow-back" />
                  </Button>
                </Left>
                <Body>
                  <Text style={{ fontSize: 16, color: "#fff" }}>
                    {" "}
                    {item.STORE}{" "}
                  </Text>
                </Body>
                <Right>
                  <Button transparent small onPress={() => this.getMore()}>
                    <Text style={{ color: "seagreen" }}>Refresh</Text>
                  </Button>
                </Right>
              </Header>
              <KeyboardAvoidingView
                keyboardVerticalOffset={20}
                behavior="padding"
                style={{ flex: 1 }}
              >
                <GiftedChat
                  messages={this.state.messages}
                  onSend={messages => this.onSend(messages)}
                  user={{
                    _id: 1
                  }}
                />
              </KeyboardAvoidingView>
            </View>
          ) : (
            <View
              style={{
                margin: Constants.statusBarHeight + 50,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Ionicons name="md-sad" size={80} color="#d5d5d5" />
              <Text style={{ fontSize: 16, fontWeight: "400" }}>
                We're Sorry you need to registered / Logged in to see this
                section
              </Text>

              <View style={{ marginTop: 10 }}>
                <Button
                  block
                  success
                  style={{ padding: 10 }}
                  onPress={() => this.props.navigation.navigate("Login")}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      fontStyle: "italic",
                      color: "#f7f7f7"
                    }}
                  >
                    Login / Register
                  </Text>
                </Button>
              </View>
            </View>
          )}
        </View>
      );
    }
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    user: state.user,
    chat: state.chat
  };
};

export default connect(mapStateToProps)(Chat);
