import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Input } from "react-native-elements";
import { validateAll, validations } from "indicative/validator";
import { URL } from "../../utls";
import axios from "axios";
import { Button, Icon } from "native-base";
import ValidationRules from "./Rules";
import { connect } from "react-redux";
class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }
  static navigationOptions = {
    headerTitle: "Chats"
  };
  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return <View style={styles.main}></View>;
    }
  }
}

const styles = StyleSheet.create({
  main: {
    marginTop: 20,
    padding: 20
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    marginVertical: 20,
    backgroundColor: "#f44336",
    padding: 10
  },
  label: {
    color: "#fff",
    textAlign: "center",
    textAlignVertical: "center"
  }
});

const mapStateToProps = state => {
  console.log(state);
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(UpdateProfile);
