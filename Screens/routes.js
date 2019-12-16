import React from 'react'
import {createSwitchNavigator,createAppContainer} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createStackNavigator} from 'react-navigation-stack'
import HomeScreen from'./Home'
import Profile from '../Screens/UserScreens/ProfileScreen'
import Search from './Search'
import Maps from './UserScreens/Maps'
import Cart from './Cart'
import CatagoryScreen from './Catagory/Catagory'
import ProductDetails from '../Components/ProductDetails/ProductDetails'
import DisplayProducts from '../Screens/DIsplayProducts'
import Subcategory from './Catagory/Subcategory'
import userAddress from './UserCheckout/userAddress'
import VerifyEmail from './Auth/VerifyEmail'
import PlaceOrder from './UserCheckout/PlaceOrder'
import UpdateUser from './UserScreens/UpdateProfile'
import CheckAuth from './UserScreens/CheckAuth'
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import ForgotPassword from './Auth/FogotPassword'
import MyOrders from './UserScreens/MyOrders'
import { Icon } from 'native-base';
import VisitStore from './Store/VisitStore'
import addAddress from './UserCheckout/AddNewAddress'
import chat from './UserScreens/Chat'
import MyAddresses from './UserScreens/MyAddresses'
import ConfirmAddress from './UserCheckout/ConfirmAddress'
const Home = createStackNavigator ({
    HomeScreen:HomeScreen,
    PD:ProductDetails,
    VisitStore:VisitStore,
    Cart:Cart,
    Address:userAddress,
    addAddress:addAddress,
    PlaceOrders:PlaceOrder ,
    chat:chat,
    Maps:Maps ,
    ConfirmAddress:ConfirmAddress,
    MyAddresses:MyAddresses  
       
  })
  const Catagory = createStackNavigator ({
    CatagoryScreen:CatagoryScreen,
    Subcategory:Subcategory,
    DisplayProducts:DisplayProducts,
    PD:ProductDetails,
    VisitStore:VisitStore,
    Cart:Cart,
    userAddress:userAddress ,   
    PlaceOrders:PlaceOrder ,
    chat:chat,
    MyAddresses:MyAddresses   
  })
  const SearchScreen= createStackNavigator({
    Search:Search,
    PD:ProductDetails
  })
  const Auth = createStackNavigator({
      SignIn:SignIn,
      SignUp:SignUp,
      ForgotPassword:ForgotPassword,
      VerifyEmail:VerifyEmail
  })
  const ProfileNavigation = createStackNavigator({
    Profile:Profile,
    Maps:Maps,
    VisitStore:VisitStore,
    UpdateUser:UpdateUser,
    CheckAuth:CheckAuth,
    MyOrders:MyOrders,
    ForgotPassword:ForgotPassword,
    MyAddresses:MyAddresses
  })
  const TabNavigation= createBottomTabNavigator({
    Home:{screen:Home,
      navigationOptions:{
        tabBarLabel:'Home',
        tabBarIcon:({tintColor}) => (
          <Icon name = 'home' style = {{fontSize:24 , color:tintColor}} />
          ),
  }
    },
    Search:{screen:SearchScreen,
      navigationOptions:{
        tabBarLabel:'Search',
        tabBarIcon:({tintColor}) => (
          <Icon name = 'search' style = {{fontSize:24 , color:tintColor}} />
          ),
  }
    }, Catagory:{screen:Catagory,
      navigationOptions:{
        tabBarLabel:'Catagory',
        tabBarIcon:({tintColor}) => (
          <Icon name = 'grid' style = {{fontSize:24 , color:tintColor}} />
          ),
  }
    },
    Profile:{screen:ProfileNavigation,
      navigationOptions:{
        tabBarLabel:'Profile',
        tabBarIcon:({tintColor}) => (
          <Icon name = 'person' style = {{fontSize:24 , color:tintColor}} />
          ),
  }
    },
  },{
    initialRouteName:'Home',
    tabBarOptions:{
      activeTintColor:'seagreen',
      inactiveTintColor:'grey'
    }})

    export const  RootNavigator = () =>{
        return createAppContainer(createSwitchNavigator({
          
            Home:TabNavigation,
            Login:Auth,
        },{
            initialRouteName:'Home'
        })
        ) }
    