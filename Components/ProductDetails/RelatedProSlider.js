import React , {Component} from 'react';
import { Image,View,Text,StyleSheet,ActivityIndicator,ScrollView } from 'react-native';
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
                .then(res=>this.setState({data:res.data}))
    
    }

    renderItems=(data)=>{
        return data.map((i)=>
        
     <View key={i.ID} style = {{height:250 , width:150 ,marginRight:15, borderWidth:0.5, borderColor:'#000'}}>
        <View style = {{flex:2}}>

            <Image  source= {{uri:`${URL}`+i.IMAGE1}} 
                    style = {{flex:1 , width:null , height:null , resizeMode:'cover'}} 
            />

        </View>
        <View style = {{flex:1, paddingLeft:10, paddingTop:10}}>
            <Text style = {{fontWeight :'bold', fontSize:14}}>{i.NAME}</Text>
        </View>

    </View>
    
        )
    }


    render()
    {
       
       
        console.log(this.state.data)


        if(!this.state.data){
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