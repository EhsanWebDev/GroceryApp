import React, { Component } from "react";
import { View, Text } from "react-native";
import StarRating from "react-native-star-rating";
class Reviews extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <View>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <View>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {this.props.username}
              </Text>
            </View>
            <View>
              <StarRating
                disabled={true}
                starSize={16}
                maxStars={5}
                fullStarColor="orange"
                rating={this.props.userRating}
                emptyStarColor="orange"
              />
            </View>
          </View>
          <Text
            style={{
              paddingHorizontal: 20,
              textAlign: "justify",
              marginTop: 5,
              fontSize: 16
            }}
          >
            {this.props.comment}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = {
  mainContainer: {
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    padding: 10
  }
};

export default Reviews;
