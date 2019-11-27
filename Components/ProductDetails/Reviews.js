import React, { Component } from 'react';
import { View, Text } from 'react-native';
import StarRating from 'react-native-star-rating'
class Reviews extends Component {

  render() {
    return (
      <View style = {styles.mainContainer}>
        <View>
            <View style = {{flexDirection:'row' , paddingHorizontal: 30,
                            justifyContent:'space-between' , alignItems : 'center'}}>
                <View>
                    <Text style = {{fontSize:16 , fontWeight:'bold'}}>User name</Text>
                </View>
                <View>
                    <StarRating 
                     disabled = {true}
                     starSize = {12}
                     maxStars = {5}
                     fullStarColor = 'orange'
                     rating = {this.props.userRating}
                     emptyStarColor = 'orange' />
                </View>
            </View>
            <Text style = {{paddingHorizontal: 30, textAlign :'justify', marginTop: 5,}}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            </Text>
        </View>
      </View>
    );
  }
}

const styles  = {
    mainContainer:{
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,
        margin: 10,
        padding: 10,
    }
}

export default Reviews;
