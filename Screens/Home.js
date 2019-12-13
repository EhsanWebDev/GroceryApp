import React, { Component } from 'react';
import {Badge, Left,Header, Body, Right, Button, Title ,H1, Icon} from 'native-base'
import { StyleSheet,ActivityIndicator, View, Text,ScrollView} from 'react-native';
import Constants from 'expo-constants';
import MainSlider from '../Components/Exclusive/HomeSlider'
import CatagorySlider from '../Components/Exclusive/CatagorySlider'
import ProductCard from './../Components/Exclusive/ProductCard'
import CartIcon from './ShoppingCartIcon'
import { connect } from 'react-redux'
import * as actions from '../store/actions'
import {setTokens,getTokens,removeTokens} from '../utls'
import Carousel from 'react-native-snap-carousel';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit:8, 
      isauth:false,
      loading:true
    };
  }
  static navigationOptions={
      header:null,
      tabBarLabel:'Home',
  }
 
  manageState=(isauth,loading)=>{
    this.setState({
      isauth,
      loading
    })
  }
  componentDidMount(){
    this.props.dispatch(actions.allProductsList());
     getTokens((val)=>{
         if(val[0][1] === null){
           this.manageState(false,false)
         }
         else{
               this.manageState(true,false)
         }
       })
  }

 

  render() {
    
    return (
      <ScrollView>
      <View style={styles.statusBar} />
                    <Header style = {{backgroundColor:'seagreen'}}>
                                     
                                     <Body> 
                                           <Title style = {{ fontSize:22,fontWeight:'700'}}>Grocery-Mart</Title>
                                     </Body>
                                     <Right>
                                     <Button transparent onPress = {() => this.props.navigation.navigate('Maps')}>
                                           <Icon name='pin' size={80} />
                                           </Button>
                                       
                                          <CartIcon />
                                           
                                          {this.state.isauth? null:
                                          <Button transparent onPress = {() => this.props.navigation.navigate('SignIn')}>
                                           <Icon name='people' />
                                           </Button>
                                        }
                                           
                                     </Right>
                                     
                  </Header>
                  <View style = {{ padding:5}}>
                          <ScrollView 
                              horizontal= {true}
                             showsHorizontalScrollIndicator = {false}
                             pagingEnabled = {true}
                              >
        
                               <MainSlider imageUri = {require('../assets/Images/tile.jpg')}/>
                               <MainSlider imageUri = {require('../assets/Images/s1.jpg')}/>
                        
                           </ScrollView>
        
                   </View>

                
                   <Header style = {{backgroundColor:'seagreen',marginTop:20,padding:5,
                                                 justifyContent:'center', alignItems: 'center',}}>
                              <Left style={{flex:1}}>
                                   <H1 style = {{ marginLeft:5,fontSize:18, color:'#fff'}}>Catagories </H1>
                               </Left>
                               
                              <Right>
                                  <Button transparent  onPress = {() => this.props.navigation.navigate('Catagory')}>
                                      <Icon name='arrow-forward' />
                                  </Button>
                              </Right>
                                           
                    </Header>

              {/*     <View style = {{height:130 , marginTop:5,paddingLeft:5}}>
                                      <ScrollView 
                                      horizontal= {true}
                                      showsHorizontalScrollIndicator = {false}
                                      >
        
                                            <CatagorySlider imageUri = {require('../assets/Images/1.jpg')}
                                                        name = "Vegetables">
        
                                            </CatagorySlider>
                                            <CatagorySlider imageUri = {require('../assets/Images/2.jpg')}
                                                        name = "Fruits">
        
                                            </CatagorySlider>
                                            <CatagorySlider imageUri = {require('../assets/Images/3.jpg')}
                                                        name = "Detergents">
        
                                            </CatagorySlider>
                                            <CatagorySlider imageUri = {require('../assets/Images/4.jpg')}
                                                        name = "Meat">
        
                                            </CatagorySlider>
                                           
        
                                      </ScrollView>
        
                                      </View>*/}

                     <View style = {{backgroundColor:'seagreen',marginTop:20,padding:5, flex:1}}>
                      
                         <H1 style = {{ marginLeft:5,fontSize:18, color:'#fff'}}>Top Products </H1>
                      
                                    
                      </View>

                     
                      
                    {this.props.allProducts?
                   
                       <ProductCard navigation={this.props.navigation} 
                                    current={this.props.allProducts}/>
                    
                   :
                   <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                      <ActivityIndicator size='large'/>
                   </View>
                   }

                     


      </ScrollView>
      
    );
  }
}

const mapStateToProps=(state)=>{
  return{
    allProducts:state.allProducts
  }
  
}

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: "seagreen",
    height: Constants.statusBarHeight,
  }
})

export default connect(mapStateToProps)(Home);
