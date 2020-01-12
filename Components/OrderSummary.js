import React, { Component } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import { Container, Header, Content, Item, Button } from "native-base";
import { Input } from "react-native-elements";
import { uniqBy, filter } from "lodash";
import Axios from "axios";
import { URL } from "../utls";
import { connect } from "react-redux";
class OrderSummary extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, promo: "", promoRes: null, isPromo: "" };
  }

  renderProdList = data => {
    return data.map(item => (
      <View key={item.id}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            padding: 5,
            borderWidth: 1,
            borderColor: "#000",
            marginBottom: 10
          }}
        >
          <View
            style={{ justifyContent: "flex-start", alignItems: "flex-start" }}
          >
            <Image
              source={{ uri: `${URL}` + item.img }}
              style={{ width: 80, height: 80, resizeMode: "contain" }}
            />
          </View>
          <View style={{}}>
            <Text style={{ fontSize: 18, marginBottom: 5 }}>
              Product Name: {item.name}{" "}
            </Text>
            <Text style={{ fontSize: 16, marginBottom: 5 }}>
              Quantity: {item.units}{" "}
            </Text>
            <Text style={{ fontSize: 14, marginBottom: 5 }}>
              Store Name: {item.store}{" "}
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
                  <Text style={{ fontSize: 18, fontWeight: "600", padding: 5 }}>
                    {" "}
                    {item.discountedPrice}{" "}
                  </Text>
                </Text>
              </View>
            ) : (
              <View>
                <Text style={{ fontSize: 14, fontWeight: "400" }}>
                  Unit Price: RS
                  <Text style={{ fontSize: 14 }}> {item.price} </Text>
                </Text>
              </View>
            )}
            <Text style={{ fontSize: 16 }}>
              Total Amount: {item.price * item.units}{" "}
            </Text>
          </View>
        </View>
      </View>
    ));
  };
  calPercentage = (price, discountRate) => {
    const dis = discountRate / 100;
    var totalValue = price - price * dis;
    return totalValue;
  };
  calPrice = items => {
    return items.reduce((total, item) => {
      if (item.discountedPrice) {
        return total + item.discountedPrice * item.units;
      } else {
        return total + item.price * item.units;
      }
    }, 0);
  };
  UniqueByID = pro => {
    Axios({
      url: `${URL}api/StoresApi/GetPromo`,
      method: "POST",
      data: JSON.stringify({
        UID: this.props.user.auth.ID,
        promo: pro
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => {
        if (res.data !== null) {
          this.setState({ promoRes: res.data.AMOUNT }, () =>
            console.log(this.state.promoRes)
          );
        }
        this.setState({ isPromo: res.data });

        // let total = this.calPrice(data)
        //console.log(dis);
      })
      .catch(e => console.log(e));
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <ScrollView style={{ flex: 1 }}>
          <View style={{ padding: 10, margin: 10 }}>
            <Input
              placeholder="ENTER PROMO CODE"
              onChangeText={value => this.setState({ promo: value })}
            />
            {this.state.isPromo === null ? (
              <Text style={{ fontSize: 16, color: "red", fontWeight: "bold" }}>
                Promo doesn't Exist
              </Text>
            ) : null}
            {this.state.promoRes === null ? null : this.state.promoRes ===
              0.0 ? (
              <Text style={{ fontSize: 16, color: "red", fontWeight: "bold" }}>
                You have used this promo
              </Text>
            ) : (
              <Text>{this.state.promoRes}</Text>
            )}
            {/*(() => {
              switch (this.state.promoRes) {
                case null:
                  return <Text>Promo not Exist</Text>;
                case 1:
                  return null;
                case 2:
                  return null;
                default:
                  return null;
              }
            })()*/}

            <Button
              success
              block
              style={{}}
              onPress={() => this.UniqueByID(this.state.promo)}
            >
              <Text style={{ color: "#fff", padding: 5, fontSize: 16 }}>
                CHECK
              </Text>
            </Button>
          </View>

          <Text style={{ fontWeight: "600", fontSize: 20, marginBottom: 5 }}>
            PRODUCTS LIST
          </Text>

          {this.props.items ? this.renderProdList(this.props.items) : null}
          <Text style={{ fontWeight: "600", fontSize: 18, marginVertical: 5 }}>
            Total Price = {this.calPrice(this.props.items)}{" "}
          </Text>
          <View style={{ flex: 1 }}></View>
          <Text style={{ fontSize: 16, marginVertical: 5 }}>
            Discount ={" "}
            {this.state.promoRes !== null
              ? this.state.promoRes === 0.0
                ? 0.0
                : this.state.promoRes
              : 0.0}
          </Text>
          <Text
            style={{
              fontWeight: "600",
              fontSize: 18,
              marginVertical: 5,
              borderTopColor: "#ddd",
              paddingVertical: 10,
              borderTopWidth: 2
            }}
          >
            Grand Total =
            {this.calPrice(this.props.items) - this.state.promoRes !== null
              ? this.state.promoRes === 0.0
                ? 0.0
                : this.state.promoRes
              : 0.0}
          </Text>
        </ScrollView>
      );
    }
  }
}

const mapStateToProps = state => {
  console.log(state.user);
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(OrderSummary);
