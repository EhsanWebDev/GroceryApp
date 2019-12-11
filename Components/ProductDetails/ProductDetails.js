import React, { Component } from 'react';
import Constants from 'expo-constants';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { View, Text ,ScrollView ,StyleSheet,Dimensions, Image, TouchableOpacity,ToastAndroid} from 'react-native';
import {Left, Right , H3, Button , Icon , Header , Body,Title} from 'native-base';
import RelatedProductSlider from './RelatedProSlider'
import SellerViewer from './SellerViewer'
import Review from './Reviews'
import ProductSlider from './ProductSlider'
import { connect } from 'react-redux';
import CartIcon from '../../Screens/ShoppingCartIcon'
import axios from 'axios'
import {URL} from '../../utls'

const { width: screenWidth } = Dimensions.get('window')
class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      related:[],item:0
    };
  }
  static navigationOptions={
    header:null
  }

  calPercentage=(price,discountRate)=>{
    const dis = discountRate / 100;
    var totalValue = price - (price * dis)
    return totalValue;
  }
  componentDidMount(){
    const item= this.props.navigation.getParam('item')
    axios.get(`${URL}api/ProductsApi/RelatedProducts/?id=`+item.CATEGORY_ID)
    .then(res=>this.setState({related:res.data,loading:false}))
  }
 
  getData=(catID)=>{
    
  }
  addto=(data)=>{
    ToastAndroid.show(`${data.name} Added to the Cart !`, ToastAndroid.SHORT)
    this.props.addItemToCart(data)
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
               
                 <View style = {{padding: 5,marginBottom:1}}>
                 <Image  source= {{uri:`${URL}`+item.IMAGE1}} 
                            style = {{width:Dimensions.get('window').width, height:200 , resizeMode:'contain'}} 
                    />
                </View>            
                  
                 <View>
                      <View style = {styles.headingContainer}>
                        <View>
                                  <Text style = {{color:'#000', fontSize:18,fontStyle:'italic'
                                                 ,fontSize:18}}>{item.NAME}</Text>
                                  {item.DISCOUNT?
                                          <View>
                                             <Text style = {{fontSize:16 ,fontWeight:'400',}}>RS
                                             <Text style={{ textDecorationLine: 'line-through',fontSize:12 , padding:5 }}> {item.PRICE} </Text>
                                            <Text style={{fontSize:16 ,fontWeight:'600', padding:5}}>{this.calPercentage(item.PRICE,item.DISCOUNT)}</Text>

                                            </Text>
                                    
                                          </View>
                                          :
                                          <View>
                                            <Text style = {{fontSize:16 ,fontWeight:'400',}}>RS
                                                <Text style = {{fontSize:16 ,}}> {item.PRICE} </Text>
                                             </Text>
                                          
                                          </View>
                                          } 

 
                                  <Text style = {{fontStyle:'italic',  fontSize:16 ,}}>{item.UOM_NAME}</Text>
                        </View> 
                        <View>
                              <TouchableOpacity style = {styles.buttonStyle} onPress={() => this.addto({id:item.ID,name:item.NAME,price:item.PRICE,discountedPrice:this.calPercentage(item.PRICE,item.DISCOUNT) || null,img:item.IMAGE1, units:1,store_id:item.STORE_ID,store:item.STORE})} > 
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

                      <SellerViewer navigation={this.props.navigation} item={item}>
                  
                  </SellerViewer>

                 <View style = {{marginTop:20 , paddingLeft:10,marginBottom:1}}>
                              <Text style = {{fontSize:22}}>Related Products</Text>
                            <View style  = {{}} >
                                       <RelatedProductSlider items={this.state.related} onPress={this.props.addItemToCart}/>
                            </View>        
                 </View>
                
         
                     
                </View>   
                

                  <View style={{marginTop:40 ,marginBottom:30}}>
                    <View style = {{ paddingHorizontal:10,flexDirection:'row',justifyContent: 'space-between',}}>
                        <Text style = {{fontSize:20 , fontWeight:'bold'}}>Comments And Reviews</Text>
                        <TouchableOpacity style={{borderColor:'red',borderWidth:1,padding:5}}>
                           <Text style={{color:'red', fontSize:18}}>See All</Text>
                        </TouchableOpacity>               
                    </View>
                    <Review userRating = {4}></Review>
                    <Review userRating = {5}></Review>
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
  },
  item: {
    width: screenWidth - 180,
    height: screenWidth - 180,
  },
  imageContainer: {
    flex: 1,
    marginBottom: 1, // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
})

const mapDispatchToProps = (dispatch) => {
  return {
      addItemToCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: product })
  }
}

export default connect(null,mapDispatchToProps) (ProductDetails);
