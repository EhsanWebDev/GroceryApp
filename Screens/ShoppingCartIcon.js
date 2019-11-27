import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform
} from "react-native";
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
const ShoppingCartIcon = (props) => (
    <View style={[{ padding: 5 }, Platform.OS == 'android' ? styles.iconContainer : null]}>
        <View style={{
            position: 'absolute', height: 20, width: 20, borderRadius: 15, backgroundColor: 'rgba(230, 126, 34,0.9)', right: 15, bottom: 15, alignItems: 'center', justifyContent: 'center', zIndex: 100,

        }}>
            <Text style={{ color: 'white', fontWeight: '400' }}>{props.cartItems.length}</Text>
        </View>
        <Ionicons onPress={() => props.navigation.navigate('Cart')} name="ios-cart" size={30}  style={{color:'#fff'}}  />
    </View>
)

const mapStateToProps = (state) => {
    console.log(state)
    return {
        cartItems: state.cart
    }
}

export default connect(mapStateToProps)(withNavigation(ShoppingCartIcon));

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconContainer: {
        paddingLeft: 20, paddingTop: 10, marginRight: 5
    }
});