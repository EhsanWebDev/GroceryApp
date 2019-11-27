import React, { Component } from 'react';
import { View, Text , Image , TouchableOpacity } from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {addToCart} from '../../store/actions'
import {URL} from '../../utls'
class ProductFragContents extends React.Component{

  calPercentage=(price,discountRate)=>{
    const dis = discountRate / 100;
    var totalValue = price - (price * dis)
    return totalValue;
  }

  renderProducts(product){
    return product.map((item)=>
    <View key={item.ID} style={styles.fragStyles}>
            <TouchableOpacity  onPress = {()=> this.props.navigation.navigate('PD',{
                                              item:item
                                            })}>
                    <View  style = {{justifyContent:'center' ,marginTop:10, alignItems:'center'}}>
                    <Image source={{uri:`${URL}`+item.IMAGE1}}
                     style = {styles.productImageStyle}
                     />
                 <View style={{marginTop:10}}>
                <Text style = {{fontSize:16 ,fontWeight:'500',textAlign:'justify'   }}>{item.NAME}</Text>
                                         {item.DISCOUNT?
                                          <View>
                                             <Text style = {{fontSize:14 ,fontWeight:'400',}}>RS
                                             <Text style={{ textDecorationLine: 'line-through',fontSize:12 ,fontWeight:'400', padding:5 }}> {item.PRICE} </Text>
                                            <Text style={{fontSize:14 ,fontWeight:'400', padding:5}}>{this.calPercentage(item.PRICE,item.DISCOUNT)}</Text>

                                            </Text>
                                    
                                          </View>
                                          :
                                          <View>
                                            <Text style = {{fontSize:14 ,fontWeight:'400',}}>RS
                                                <Text style = {{fontSize:14 ,fontWeight:'400',}}> {item.PRICE} </Text>
                                             </Text>
                                          
                                          </View>
                                          } 
               <Text style = {{fontSize:12 , fontWeight:'300', fontStyle:'italic' ,paddingHorizontal:5}}>{item.UOM_NAME}</Text> 
               
             </View>     

            
           
                <View>
                      <TouchableOpacity style = {styles.buttonStyle} onPress={() => this.props.addToCart({id:item.ID,name:item.NAME,price:item.PRICE,discountedPrice:this.calPercentage(item.PRICE,item.DISCOUNT) || null,img:item.IMAGE1, units:1,store_id:item.STORE_ID})}> 
                              <Text style = {styles.buttonTextStyle}>Add to Cart</Text>
                     </TouchableOpacity>  
                </View>
                    </View>

            </TouchableOpacity>

</View>
      
       

   

    )
  }

 



  handleAddFunc(product,cartState) {
    const existingProductIndex = cartState.findIndex(p => p.id === product.id);

    if (existingProductIndex >= 0) {

        
        const updatedCart = [...cartState];
        
        const existingProduct = updatedCart[existingProductIndex];

        const updatedUnitsProduct = {
          ...existingProduct,
          units: existingProduct.units + product.units
        };

        updatedCart[existingProductIndex] = updatedUnitsProduct;

       // console.log(cartProducts)

        this.props.addToCart(updatedCart)

    } else {
    
      this.props.addToCart(product)
    }
  }

 

    render(){
        return(

          <View style={{flex:1,flexDirection:'row',flexWrap:'wrap'}}>
           
            { this.props.current? this.renderProducts(this.props.current):null}
          </View>
            
       
        )
    }
}





const styles ={
    fragStyles:{
        width:'45%',
        borderColor: '#ddd',
        borderRadius: 20,
        borderWidth: 1,
        marginLeft: 15,
        marginTop: 20,
        
    },
    mainContainer :{
      flexDirection:'row',
      paddingRight: 8,
    },
    productImageStyle:{
       width:100,
       height:100,
       resizeMode:'cover'
    },
    buttonStyle:{
      backgroundColor:'#27ae60',
      padding:5,
      borderRadius:5,
      margin:10
    },
    buttonTextStyle:{
      fontSize:16,
      fontWeight:'200',
      fontStyle:'italic',
      color:'#fff'
    }
}

const mapStateToProps=(state)=>{
  return{
    cart:state.cart
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({addToCart},dispatch)
      
  
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductFragContents)