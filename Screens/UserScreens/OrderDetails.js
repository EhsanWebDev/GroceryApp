import React, { Component } from "react";
import { View, Text, ActivityIndicator, Image } from "react-native";
import Axios from "axios";
import { URL } from "../../utls";

class OrderDetails extends Component {
  _is_mounted = false;
  state = {
    data: [],
    loading: true
  };
  componentDidMount() {
    const order_id = this.props.navigation.getParam("orderid");
    this._is_mounted = true;
    if (this._is_mounted) {
      Axios.get(`${URL}api/OrdersApi/CheckOrderDetails?orderid=${order_id}`)
        .then(res => this.setState({ data: res.data, loading: false }))
        .catch(e => console.log(e));
    }
  }
  render() {
    if (this.state.loading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <View>
        {this.state.data
          ? this.state.data.map(item => (
              <View key={item.ID}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    padding: 10,
                    borderWidth: 1,
                    borderColor: "#000",
                    marginBottom: 10
                  }}
                >
                  <View
                    style={{
                      justifyContent: "flex-start",
                      alignItems: "flex-start"
                    }}
                  >
                    <Image
                      source={{ uri: `${URL}` + item.IMAGE1 }}
                      style={{ width: 80, height: 80, resizeMode: "contain" }}
                    />
                  </View>
                  <View style={{ marginLeft: 10 }}>
                    <Text style={{ fontSize: 18, marginBottom: 5 }}>
                      Product Name: {item.NAME}{" "}
                    </Text>
                    <Text style={{ fontSize: 16, marginBottom: 5 }}>
                      Quantity: {item.QUANTITY}{" "}
                    </Text>

                    {item.discountedPrice ? (
                      <View>
                        <Text style={{ fontSize: 16, fontWeight: "400" }}>
                          Unit Price: RS
                          <Text
                            style={{
                              textDecorationLine: "line-through",
                              fontSize: 12,
                              padding: 5
                            }}
                          >
                            {" "}
                            {item.price}{" "}
                          </Text>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: "600",
                              padding: 5
                            }}
                          >
                            {" "}
                            {item.discountedPrice}{" "}
                          </Text>
                        </Text>
                      </View>
                    ) : (
                      <View>
                        <Text style={{ fontSize: 14, fontWeight: "400" }}>
                          Unit Price: RS
                          <Text style={{ fontSize: 14 }}> {item.PRICE} </Text>
                        </Text>
                      </View>
                    )}
                    <Text style={{ fontSize: 16 }}>
                      Total Amount: {item.PRICE * item.QUANTITY}{" "}
                    </Text>
                  </View>
                </View>
              </View>
            ))
          : null}
      </View>
    );
  }
}

export default OrderDetails;
