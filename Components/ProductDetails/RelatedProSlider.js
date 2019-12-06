import React , {Component} from 'react';
import { Image,View,Text,StyleSheet,ActivityIndicator,ScrollView,TouchableOpacity,ToastAndroid } from 'react-native';
import axios from 'axios'
import {URL} from '../../utls'
import Constants from 'expo-constants';
class RelatedProductSlider extends Component {

    state={
        productName:"",
        data:[],
        loading:false
    }

    componentDidMount(){
        this.getList()
    }

    getList=()=>{
    
      
    
    }
    calPercentage=(price,discountRate)=>{
      const dis = discountRate / 100;
      var totalValue = price - (price * dis)
      return totalValue;
    }

    addto=(data)=>{
      ToastAndroid.show(`${data.name} Added to the Cart !`, ToastAndroid.SHORT)
      this.props.onPress(data)
    }

    renderItems=(data)=>{
        return data.map((i)=>
        
     <View key={i.ID} style = {{width:150 ,marginRight:15,padding:10, borderWidth:2, borderColor:'#ddd'}}>
        <View style = {{flex:1,justifyContent:'center',alignItems:'center'}}>

            <Image  source= {{uri:`${URL}`+i.IMAGE1}} 
                    style = {{ width:80 , height:80 , resizeMode:'cover'}} 

            />

        </View>
        <View style = {{flex:1, paddingTop:5,marginTop:10 ,justifyContent:'center'}}>
            <Text style = {{fontSize:16,textAlign:'center'}}>{i.NAME}</Text>
            {i.DISCOUNT?
                                          <View>
                                             <Text style = {{fontSize:14 ,textAlign:'center'}}>RS
                                             <Text style={{ textDecorationLine: 'line-through',fontSize:12 , padding:5,textAlign:'center' }}> {i.PRICE} </Text>
                                            <Text style={{fontSize:16 ,fontWeight:'600', padding:5,textAlign:'center'}}>{this.calPercentage(i.PRICE,i.DISCOUNT)}</Text>

                                            </Text>
                                    
                                          </View>
                                          :
                                          <View>
                                            <Text style = {{fontSize:14 ,fontWeight:'300',textAlign:'center'}}>RS
                                                <Text style = {{fontSize:14 ,textAlign:'center'}}> {i.PRICE} </Text>
                                             </Text>
                                          
                                          </View>
                                          } 

            <TouchableOpacity style = {{
                                backgroundColor:'#27ae60',
                                padding:5,
                                marginVertical:10
                              }} onPress={() => this.addto({id:i.ID,name:i.NAME,price:i.PRICE,discountedPrice:this.calPercentage(i.PRICE,i.DISCOUNT) || null,img:i.IMAGE1, units:1,store_id:i.STORE_ID,store:i.STORE})} > 
                                    <Text style = {{
                                        fontSize:14,
                                        fontWeight:'600',
                                        textAlign:'center', 
                                        color:'#fff'
                                    }}>Add to Cart</Text>
                               </TouchableOpacity> 
        </View>
    </View>
    
        )
    }


    render()
    {
        if(this.state.loading){
            return( 
              <View style={styles.loading}>
                <ActivityIndicator size="large" color="seagreen"/>
              </View>
            )
      
          }else{
                return(
                    <ScrollView horizontal = {true} 
                                        showsHorizontalScrollIndicator = {false} 
                                        style = {{flex:1}} >
                        {this.props.items?this.renderItems(this.props.items):null}
                    </ScrollView>
                )    
    }
    }
}
const styles = StyleSheet.create({
    statusBar: {
      
      height: Constants.statusBarHeight,
    },
    loading:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    }
  })

export default RelatedProductSlider;