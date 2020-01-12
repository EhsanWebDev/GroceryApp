import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from "react-native";
import Constants from "expo-constants";
import ProductCard from "../Components/Exclusive/ProductCard";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import CartIcon from "./ShoppingCartIcon";

class DisplayProducts extends Component {
  _is_mounted = false;

  static navigationOptions = {
    title: "Products",
    headerStyle: {
      backgroundColor: "seagreen"
    },
    headerTintColor: "#fff",
    headerRight: <CartIcon />
  };
  componentDidMount() {
    this._is_mounted = true;
    if (this._is_mounted) {
      this.props.dispatch(
        actions.productsList(this.props.navigation.getParam("subID"))
      );
    }
  }

  renderProducts() {
    return this.props.products.map(item => (
      <ProductCard
        key={item.ID}
        navigation={this.props.navigation}
        current={this.props.products}
      />
    ));
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.statusBar} />

        {this.props.products ? (
          <View>
            <ProductCard
              navigation={this.props.navigation}
              current={this.props.products}
            />
          </View>
        ) : (
          <ActivityIndicator
            style={{ justifyContent: "center", alignItems: "center" }}
            size="large"
          />
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: "#fff",
    height: Constants.statusBarHeight
  },
  mainHeading: {
    fontSize: 26,
    fontWeight: "bold",
    margin: 20
  }
});

const mapStateToProps = state => {
  // console.log(state);
  return {
    products: state.products
  };
};

export default connect(mapStateToProps)(DisplayProducts);
