import React, { PureComponent } from 'react';
import { View, Text,FlatList,Image,TouchableOpacity, ActivityIndicator } from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {addToCart} from '../../store/actions'
import {URL} from '../../utls'
import Axios from 'axios';
class VisitStore extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { 
            data:[]
         };
    }

    componentDidMount(){
            Axios.get(`${URL}api/StoresApi/ShowStore?id=1203`)
            .then((res)=>this.setState({data:res.data}))
            .catch(e=>console.log(e))
    }
    renderStore=({item})=>{
        return(
            <View style={{borderColor:'#2c3e50',borderWidth:2,borderRadius:15
                        ,padding:5,margin:10,width:'45%',
                        }}>
                    <View style={{flexDirection:'row',justifyContent:'center', padding:5}}>
                        <View style={{marginRight:5}}>
                        <Image source={{uri:`${URL}`+item.IMAGE1}} 
                               style={{width:100,height:100}} />   
                                  
                        </View>
                        
                        
                    </View>
                    <Text style={{fontSize:16,fontWeight:'600',textAlign:'center'}}> {item.NAME} </Text>
                    <Text style={{fontSize:14,fontWeight:'600',textAlign:'center'}}> RS {item.PRICE} </Text>
                    <Text style={{fontSize:14,textAlign:'center'}}> {item.UOM_NAME} </Text>
                    <View>
                      <TouchableOpacity style = {{
                           backgroundColor:'#27ae60',
                           padding:5,
                           borderRadius:5,
                           margin:10
                      }} onPress={() => this.props.addToCart({id:item.ID,name:item.NAME,price:item.PRICE,discountedPrice:this.calPercentage(item.PRICE,item.DISCOUNT) || null,img:item.IMAGE1, units:1,store_id:item.STORE_ID})}> 
                              <Text style = {{
                                    fontSize:16,
                                    fontWeight:'200',
                                    fontStyle:'italic',
                                    color:'#fff',
                                    textAlign:'center'
                              }}>Add to Cart</Text>
                     </TouchableOpacity>  
                </View>
            </View>
        )
    }
    render() {
        return (
            <View style={{flex:1}}>
               <FlatList
                    data={this.state.data}
                    renderItem={this.renderStore}
                    initialNumToRender={4}
                    ListEmptyComponent={
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <ActivityIndicator size="large" />
                        </View>
                    
                }
                    numColumns={2}
                    keyExtractor = { (item) => item.ID.toString() } />
            </View>
        );
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

export default connect(mapStateToProps,mapDispatchToProps) (VisitStore);