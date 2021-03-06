import React from "react";
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  Button
} from "react-native";
import { getTokens } from "../../utls";
import { connect } from "react-redux";
import axios from "axios";
import { URL } from "../../utls";
import Constants from "expo-constants";
import OrderSummary from "../../Components/OrderSummary";
import { placeOrder, empty } from "../../store/actions";
class PlaceOrder extends React.Component {
  state = {
    userID: "",
    loading: false,
    data: []
  };

  componentDidMount() {
    getTokens(val => {
      if (val[0][1] === null) {
        this.setState({ loading: false });
      } else {
        this.setState({ userID: val[0][1], loading: false });
        this.getData();
      }
    });
  }
  static navigationOptions = {
    header: null
  };

  getData = () => {
    const data = {};
    const quantities = this.getQuantityCount();
    var currentdate = new Date();
    var datetime =
      currentdate.getFullYear() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getDate();
    data.userID = this.state.userID;
    data.products_id = this.getProductsID();
    data.quantities = this.getQuantityCount();
    data.total_quantity = this.getTotalQuantity(quantities);
    data.total_price = this.calPrice();
    data.amountAfterDiscount = this.calPrice();
    data.shippingID = this.props.defaultAddress[0].ID;
    data.orderStatus = 0;
    data.totalShippingCharges = this.calPrice() + 20;
    data.CreatedAt = datetime;
    data.UpdatedAt = datetime;
    this.setState({
      data: data
    });
  };
  getProductsID = () => {
    return this.props.cartItems.map(element => element.id);
  };
  getQuantityCount = () => {
    return this.props.cartItems.map(element => element.units);
  };

  postData = data => {
    console.log(data);
    this.props
      .dispatch(placeOrder(data))
      .then(() => {
        this.props.dispatch(empty());
        this.props.navigation.navigate("HomeScreen");
        alert("Thank You for Shopping With Us. Your Order Placed Successfully");
      })
      .catch(e => console.log(e));
  };
  calPrice = () => {
    return this.props.cartItems.reduce((total, item) => {
      if (item.discountedPrice) {
        return total + item.discountedPrice * item.units;
      } else {
        return total + item.price * item.units;
      }
    }, 0);
  };

  getTotalQuantity = data => {
    return data.reduce((total, item) => {
      return total + item;
    }, 0);
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          {this.props.cartItems.length > 0 ? (
            <View style={{ marginTop: Constants.statusBarHeight + 5, flex: 1 }}>
              <View>
                <Text
                  style={{
                    borderWidth: 2,
                    borderColor: "#d35400",
                    padding: 10,
                    fontSize: 18,
                    width: "100%",
                    fontStyle: "italic",
                    textAlign: "center",
                    color: "#000",
                    alignSelf: "center"
                  }}
                >
                  Shipping Address: {this.props.defaultAddress[0].STREETADDRESS}{" "}
                  {this.props.defaultAddress[0].CITY}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontStyle: "italic",
                    fontWeight: "bold",
                    borderBottomColor: "#000",
                    borderBottomWidth: 1,
                    padding: 5,
                    width: "100%",
                    textAlign: "center"
                  }}
                >
                  Your Order Summery
                </Text> 
              </View>

              <View style={{ padding: 10, flex: 1 }}>
                <OrderSummary items={this.props.cartItems} />
              </View>

              <View style={{}}>
                <Button
                  onPress={() => this.postData(this.state.data)}
                  title="Place Your Order"
                  color="seagreen"
                  style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}
                ></Button>
              </View>
            </View>
          ) : (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1
              }}
            >
              <Text>Hello,{this.state.userID} </Text>
            </View>
          )}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

const mapStateToProps = state => {
  //console.log(state.order);
  return {
    cartItems: state.cart,
    address: state.address,
    defaultAddress: state.address.defaultAddress
  };
};

export default connect(mapStateToProps)(PlaceOrder);
