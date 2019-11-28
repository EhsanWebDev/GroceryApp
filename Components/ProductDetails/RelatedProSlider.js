import React , {Component} from 'react';
import { Image,View,Text,StyleSheet,ActivityIndicator,ScrollView,TouchableOpacity } from 'react-native';
import axios from 'axios'
import {URL} from '../../utls'
import Constants from 'expo-constants';
class RelatedProductSlider extends Component {

    state={
        productName:"",
        data:[],
        loading:true
    }

    componentDidMount(){
        this.getList()
    }

    getList=()=>{
    
        axios.get(`${URL}api/ProductsApi/RelatedProducts/?id=`+this.props.catID)
                .then(res=>this.setState({data:res.data,loading:false}))
    
    }

    renderItems=(data)=>{
        return data.map((i)=>
        
     <View key={i.ID} style = {{width:150 ,marginRight:15,padding:10, borderWidth:2, borderColor:'#ddd'}}>
        <View style = {{flex:1,justifyContent:'center',alignItems:'center'}}>

            <Image  source= {{uri:`${URL}`+i.IMAGE1}} 
                    style = {{ width:100 , height:100 , resizeMode:'contain'}} 
            />

        </View>
        <View style = {{ paddingTop:5 ,justifyContent:'center'}}>
            <Text style = {{fontWeight :'bold', fontSize:16,textAlign:'center'}}>{i.NAME}</Text>
            <Text style = {{fontSize:14,textAlign:'center'}}>RS {i.PRICE}</Text>

            <TouchableOpacity style = {{
                                backgroundColor:'#27ae60',
                                padding:5,
                                marginVertical:10
                              }} onPress={()=>this.props.onPress({id:i.ID,name:i.NAME,price:i.PRICE,img:i.IMAGE1, units:1})} > 
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
                                        style = {{marginTop:20}} >
                        {this.renderItems(this.state.data)}
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