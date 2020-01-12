import React, { Component } from "react";
import Constants from "expo-constants";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ToastAndroid,
  TextInput
} from "react-native";
import { Left, Right, Button, Icon, Header, Body, Title } from "native-base";
import { Rating, AirbnbRating, Input } from "react-native-elements";
import RelatedProductSlider from "./RelatedProSlider";
import SellerViewer from "./SellerViewer";
import Review from "./Reviews";
import { connect } from "react-redux";
import CartIcon from "../../Screens/ShoppingCartIcon";
import axios from "axios";
import { URL } from "../../utls";
import { bindActionCreators } from "redux";
import { addToCart } from "../../store/actions";
import { ActivityIndicator } from "react-native";
import { autoSignIn, allReviews } from "../../store/actions";
import { setTokens, getTokens, removeTokens } from "../../utls";

const { width: screenWidth } = Dimensions.get("window");
class ProductDetails extends Component {
  _is_mounted = false;
  constructor(props) {
    super(props);
    this.state = {
      peopleAlsoBuy: [],
      item: 0,
      all_reviews: [],
      isauth: false,
      loading: true,
      reviewable: 0,
      stars: 0,
      review_comment: ""
    };
  }
  static navigationOptions = {
    header: null
  };

  calPercentage = (price, discountRate) => {
    const dis = discountRate / 100;
    var totalValue = price - price * dis;
    return totalValue;
  };
  manageState = isauth => {
    this.setState({
      isauth
    });
  };
  async componentDidMount() {
    this._is_mounted = true;
    await getTokens(val => {
      if (val[0][1] === null) {
        this.manageState(false);
      } else {
        if (this._is_mounted) {
          this.props.autoSignIn(val[0][1]).then(() => {
            !this.props.user.auth
              ? this.manageState(false)
              : setTokens(this.props.user.auth.ID, () => {
                  this.manageState(true);
                });
            //console.log(this.props.user.auth)
          });
        }
      }
    });
    const item = await this.props.navigation.getParam("item");
    console.log(item.SUBCATEGORY_ID);
    // console.log(item.PRODUCT_ID ? item.PRODUCT_ID : item.ID);
    if (this._is_mounted) {
      axios
        .get(
          `${URL}api/OrdersApi/TopProductsbyCategories?id=${item.SUBCATEGORY_ID}`
        )
        .then(res =>
          this.setState({ peopleAlsoBuy: res.data }, () => {
            if (item.PRODUCT_ID) {
              axios
                .get(`${URL}api/ProductsApi/GetReviews/?id=` + item.PRODUCT_ID)
                .then(res => {
                  this.props.allReviews(res.data);
                  axios({
                    url: `${URL}api/OrdersApi/CheckOrderStatusReview`,
                    method: "POST",
                    data: JSON.stringify({
                      PRODUCT_ID: item.PRODUCT_ID ? item.PRODUCT_ID : item.ID,
                      UID: this.props.user.auth.ID,
                      CREATED_AT: "2019/08/08",
                      UPDATED_AT: "2019/08/08"
                    }),
                    headers: {
                      "Content-type": "application/json; charset=UTF-8"
                    }
                  })
                    .then(res =>
                      this.setState(
                        { reviewable: res.data, loading: false },
                        () => console.log(this.state.reviewable)
                      )
                    )
                    .catch(e => console.log(e));
                })
                .catch(e => console.log(e));
            } else {
              axios
                .get(`${URL}api/ProductsApi/GetReviews/?id=` + item.ID)
                .then(res => {
                  this.props.allReviews(res.data);
                  axios({
                    url: `${URL}api/OrdersApi/CheckOrderStatusReview`,
                    method: "POST",
                    data: JSON.stringify({
                      PRODUCT_ID: item.ID,
                      UID: this.props.user.auth.ID,
                      CREATED_AT: "2019/08/08",
                      UPDATED_AT: "2019/08/08"
                    }),
                    headers: {
                      "Content-type": "application/json; charset=UTF-8"
                    }
                  })
                    .then(res =>
                      this.setState({ reviewable: res.data, loading: false })
                    )
                    .catch(e => console.log(e));
                })
                .catch(e => console.log(e));
            }
          })
        )
        .catch(e => console.log(e));
    }
  }
  addto = data => {
    ToastAndroid.show(`${data.name} Added to the Cart !`, ToastAndroid.SHORT);
    this.props.addToCart(data);
  };
  componentWillUnmount() {
    this._is_mounted = false;
  }
  handleSubmit = () => {
    const item = this.props.navigation.getParam("item");
    axios({
      url: `${URL}api/OrdersApi/AddReview`,
      method: "POST",
      data: JSON.stringify({
        UID: this.props.user.auth.ID,
        PRODUCT_ID: item.PRODUCT_ID ? item.PRODUCT_ID : item.ID,
        DES: this.state.review_comment,
        RATINGS: parseInt(this.state.stars),
        CREATED_AT: "2020/01/05",
        UPDATED_AT: "2020/01/05"
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => {
        const data = [
          {
            ID: 1,
            RATINGS: parseInt(this.state.stars),
            NAME: this.props.user.auth.NAME,
            DES: this.state.review_comment
          }
        ];

        this.props.allReviews(data);
      })
      .catch(e => console.log(e));
    // this.props.navigation.goBack();
  };
  renderComment = data => {
    return data.map(i => (
      <Review
        key={i.ID}
        userRating={i.RATINGS}
        username={i.NAME}
        comment={i.DES}
      ></Review>
    ));
  };
  ratingCompleted = val => {
    this.setState({ stars: val });
  };
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
    } else if (item) {
      return (
        <View>
          <View style={styles.statusBar} />
          <ScrollView style={{ backgroundColor: "#fff" }}>
            <Header style={{ backgroundColor: "seagreen" }}>
              <Left>
                <Button
                  transparent
                  onPress={() => this.props.navigation.goBack()}
                >
                  <Icon name="arrow-back" />
                </Button>
              </Left>
              <Body>
                <Title>Product Details</Title>
              </Body>
              <Right>
                <CartIcon />
              </Right>
            </Header>

            <View style={{ padding: 5, marginBottom: 1 }}>
              <Image
                source={{ uri: `${URL}` + item.IMAGE1 }}
                style={{
                  width: Dimensions.get("window").width,
                  height: 200,
                  resizeMode: "contain"
                }}
              />
            </View>

            <View>
              <View style={styles.headingContainer}>
                <View>
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 18,
                      fontStyle: "italic",
                      fontSize: 18
                    }}
                  >
                    {item.NAME}
                  </Text>
                  {item.DISCOUNT ? (
                    <View>
                      <Text style={{ fontSize: 16, fontWeight: "400" }}>
                        RS
                        <Text
                          style={{
                            textDecorationLine: "line-through",
                            fontSize: 12,
                            padding: 5
                          }}
                        >
                          {" "}
                          {item.PRICE}{" "}
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "600",
                            padding: 5
                          }}
                        >
                          {this.calPercentage(item.PRICE, item.DISCOUNT)}
                        </Text>
                      </Text>
                    </View>
                  ) : (
                    <View>
                      <Text style={{ fontSize: 16, fontWeight: "400" }}>
                        RS
                        <Text style={{ fontSize: 16 }}> {item.PRICE} </Text>
                      </Text>
                    </View>
                  )}

                  <Text style={{ fontStyle: "italic", fontSize: 16 }}>
                    {item.UOM_NAME}
                  </Text>
                </View>
                <View>
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() =>
                      this.addto({
                        id: item.PRODUCT_ID ? item.PRODUCT_ID : item.ID,
                        name: item.NAME,
                        price: item.PRICE,
                        discountedPrice:
                          this.calPercentage(item.PRICE, item.DISCOUNT) || null,
                        img: item.IMAGE1,
                        units: 1,
                        store_id: item.STORE_ID,
                        store: item.STORE
                      })
                    }
                  >
                    <Text style={styles.buttonTextStyle}>Add to Cart</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ marginTop: 20, paddingLeft: 10 }}>
                <Text style={{ fontWeight: "700", fontSize: 18 }}>About</Text>
                <Text style={{ textAlign: "left" }}>{item.DES}</Text>
              </View>

              <SellerViewer
                navigation={this.props.navigation}
                item={item}
              ></SellerViewer>

              <View style={{ marginTop: 20, paddingLeft: 10, marginBottom: 1 }}>
                <Text style={{ fontSize: 22 }}>
                  People Also Buy These Products
                </Text>

                <RelatedProductSlider
                  items={
                    this.state.peopleAlsoBuy.length > 0
                      ? this.state.peopleAlsoBuy
                      : null
                  }
                  onPress={this.props.addToCart}
                />
              </View>
            </View>

            <View style={{ marginTop: 40, marginBottom: 30 }}>
              <View
                style={{
                  paddingHorizontal: 10,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Comments And Reviews
                </Text>
                <TouchableOpacity
                  style={{ borderColor: "red", borderWidth: 1, padding: 5 }}
                >
                  <Text style={{ color: "red", fontSize: 18 }}>See All</Text>
                </TouchableOpacity>
              </View>
              {this.state.reviewable === 1 ? (
                <View style={{ padding: 20, flex: 1 }}>
                  <Rating
                    type="star"
                    ratingCount={5}
                    startingValue={0}
                    imageSize={40}
                    defaultRating={1}
                    showRating
                    onFinishRating={value => this.ratingCompleted(value)}
                  />
                  <TextInput
                    placeholder="Enter your review....."
                    style={{ borderWidth: 1, borderColor: "#000", padding: 10 }}
                    onChangeText={value =>
                      this.setState({ review_comment: value })
                    }
                  />
                  <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                    <Button
                      small
                      onPress={this.handleSubmit}
                      style={{ justifyContent: "center" }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "700",
                          color: "#fff",
                          textAlign: "center",
                          alignSelf: "center"
                        }}
                      >
                        Submit
                      </Text>
                    </Button>
                  </View>
                </View>
              ) : null}
              {this.props.reviews.all_reviews ? (
                this.renderComment(this.props.reviews.all_reviews)
              ) : (
                <Text
                  style={{
                    fontSize: 18,
                    margin: 20,
                    fontWeight: "bold",
                    fontStyle: "italic",
                    alignSelf: "center"
                  }}
                >
                  No Reviews
                </Text>
              )}
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: "#2c3e50",
    height: Constants.statusBarHeight
  },
  headingContainer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    paddingHorizontal: 10
  },
  buttonStyle: {
    backgroundColor: "#27ae60",
    padding: 5,
    borderRadius: 15,
    margin: 10
  },
  buttonTextStyle: {
    fontSize: 16,
    fontWeight: "200",
    fontStyle: "italic",
    color: "#fff"
  },
  item: {
    width: screenWidth - 180,
    height: screenWidth - 180
  },
  imageContainer: {
    flex: 1,
    marginBottom: 1, // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 8
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "contain"
  }
});
const mapStateToProps = state => {
  // console.log(state)
  return {
    user: state.user,
    reviews: state.reviews
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addToCart, autoSignIn, allReviews }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
