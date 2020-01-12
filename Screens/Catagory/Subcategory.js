import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from "react-native";
import CatagoriesCard from "../../Components/Exclusive/Catagories";
import Constants from "expo-constants";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import CartIcon from "../ShoppingCartIcon";

class Subcategory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch(
      actions.subcategoriesList(this.props.navigation.getParam("catID"))
    );
  }

  static navigationOptions = {
    title: "SubCategories",
    headerTintColor: "#fff",
    headerStyle: {
      backgroundColor: "seagreen"
    },
    headerRight: <CartIcon />
  };

  renderSubcategories() {
    return this.props.subcategories.map(item => (
      <CatagoriesCard
        key={item.ID}
        navigation={this.props.navigation}
        name={item.NAME}
        imageUri={require("../../assets/Images/CatagoryImages/1.jpg")}
        subcategory={item.ID}
        toGo="DisplayProducts"
      />
    ));
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.statusBar} />
        <View style={styles.mainView}>
          {this.props.subcategories ? (
            this.renderSubcategories()
          ) : (
            <ActivityIndicator
              style={{ justifyContent: "center", alignItems: "center" }}
              size="large"
            />
          )}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: "#fff",
    height: Constants.statusBarHeight
  },
  mainView: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  mainHeading: {
    fontSize: 26,
    fontWeight: "bold",
    margin: 20
  }
});

const mapStateToProps = state => {
  console.log(state);
  return {
    subcategories: state.subcategories
  };
};

export default connect(mapStateToProps)(Subcategory);
