import React, { Component } from 'react';
import Constants from 'expo-constants';
import { View, Text ,ScrollView ,StyleSheet,  TouchableOpacity} from 'react-native';
import {Left, Right , H3, Button , Icon , Header , Body,Title} from 'native-base';
import RelatedProductSlider from './RelatedProSlider'
import SellerViewer from './SellerViewer'
import Review from './Reviews'
import ProductSlider from './ProductSlider'
import { connect } from 'react-redux';
import CartIcon from '../../Screens/ShoppingCartIcon'

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      related:[]
    };
  }
  static navigationOptions={
    header:null
  }

 
 

  render() {
    const item= this.props.navigation.getParam('item')
    
    if(item){
       return (
      <View>
        <View style={styles.statusBar} />
        <ScrollView style = {{backgroundColor:'#fff'}}>
                <Header style = {{backgroundColor:'seagreen'}}>
                        <Left>
                          <Button transparent onPress = {() => this.props.navigation.goBack() }>
                            <Icon name='arrow-back' />
                          </Button>
                        </Left>
                        <Body>
                          <Title>Product Details</Title>
                        </Body>
                        <Right>
                                  <CartIcon />
                        </Right>

                </Header>
               
                 <View style = {{padding: 5,}}>
                 <ScrollView 
                        horizontal= {true}
                        showsHorizontalScrollIndicator = {true}
                        indicatorStyle='black'
                        pagingEnabled={true}
                       
                        >
                                            <ProductSlider imageUri = {item.IMAGE1}
                                                        name = "Vegetables">

                                            </ProductSlider>
                        </ScrollView>

                </View>            
                 
                 <View>
                      <View style = {styles.headingContainer}>
                        <View>
                                  <Text style = {{color:'#000' , fontWeight:'bold',fontStyle:'italic'
                                                 ,fontSize:18}}>{item.NAME}</Text>
                                  <Text style = {{fontWeight:'bold' , fontSize:16 }}>RS:{item.PRICE}</Text>
                                  <Text style = {{fontStyle:'italic',  fontSize:16 ,}}>{item.UOM_NAME}</Text>
                        </View>
                        <View>
                              <TouchableOpacity style = {styles.buttonStyle} onPress={()=>this.props.addItemToCart({id:item.ID,name:item.NAME,price:item.PRICE,img:item.IMAGE1, units:1})} > 
                                    <Text style = {styles.buttonTextStyle}>Add to Cart</Text>
                               </TouchableOpacity>  
                        </View>
                          
                         
                      </View>
                      
                      <View style = {{marginTop:20 , paddingLeft:10}}>
                              <Text style = {{fontWeight:'700', fontSize:18}}>About</Text>
                              <Text style = {{textAlign:'left'}}>
                                        {item.DES}
                                </Text>
                      </View>

                      <SellerViewer visit={()=>this.props.navigation.navigate('VisitStore')} item={item}>
                  
                  </SellerViewer>

                      <View style = {{marginTop:20 , paddingLeft:10}}>
                              <Text style = {{fontSize:20 , fontWeight:'bold'}}>Related Products</Text>
                            <View style  = {{height:220}} >
                                  
                                       <RelatedProductSlider catID={item.CATEGORY_ID}/>
                                   
                            </View>        
                      </View>
                      <View style = {{marginTop:20 , paddingLeft:10}}>
                              <Text style = {{fontSize:20 , fontWeight:'bold'}}>People also buy these</Text>
                            <View style  = {{height:220}} >
                                  
                                       <RelatedProductSlider catID={item.CATEGORY_ID}/>
                                   
                            </View>        
                      </View>
                </View>   

                  <View style={{marginTop:40 ,}}>
                    <View style = {{ paddingLeft:10}}>
                        <Text style = {{fontSize:20 , fontWeight:'bold'}}>Comments And Reviews</Text>
                       
                    </View>
                    <Review userRating = {4}></Review>
                    <Review userRating = {5}></Review>
                    <Review userRating = {1}></Review>
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
    height: Constants.statusBarHeight,
  }, headingContainer:{
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
   paddingHorizontal:10
  },
  buttonStyle:{
    backgroundColor:'#27ae60',
    padding:5,
    borderRadius:15,
    margin:10

  },
  buttonTextStyle:{
    fontSize:16,
    fontWeight:'200',
    fontStyle:'italic',
    color:'#fff'
  }
})

const mapDispatchToProps = (dispatch) => {
  return {
      addItemToCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: product })
  }
}

export default connect(null,mapDispatchToProps) (ProductDetails);
