import React, { PureComponent } from 'react';
import { View, Text,FlatList,Image,TouchableOpacity, ActivityIndicator } from 'react-native';
import {connect} from 'react-redux'
import {Header, Body, Right, Button, Title ,Left, Icon} from 'native-base'
import {bindActionCreators} from 'redux'
import {addToCart} from '../../store/actions'
import CartIcon from '../ShoppingCartIcon'
import {URL} from '../../utls'
import Axios from 'axios';
import Constants from 'expo-constants';
class VisitStore extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { 
            data:[],
            limit:6,
         };
    }

    static navigationOptions={
       header:null
    }

    componentDidMount(){
           this.getData()
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
                      }} > 
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
    getData=()=>{
        Axios.get(`${URL}api/StoresApi/ShowStore?id=${this.props.navigation.getParam('itemName')}&limit=`+this.state.limit)
        .then((res)=>this.setState({data:res.data}))
        .catch(e=>console.log(e))
    }
    loadMore = () =>{
       // console.warn('end')
        this.setState({
            limit:this.state.limit+6
        })
        this.getData();
        
    }
    render() {
       
        return (
            <View style={{flex:1,marginTop:Constants.statusBarHeight}}>
  <Header style = {{backgroundColor:'seagreen'}}>
                        <Left>
                          <Button transparent onPress = {() => this.props.navigation.goBack() }>
                            <Icon name='arrow-back' />
                          </Button>
                        </Left>
                        <Body>
                          <Title>Store Details</Title>
                        </Body>
                        <Right>
                                  <CartIcon />
                        </Right>

                </Header>
                
    <FlatList
               
                    data={this.state.data}
                    renderItem={this.renderStore}
                    ListEmptyComponent={
                        <ActivityIndicator size="large" />
                    }
                      extraData={this.state}
                    keyExtractor = { (item) => item.ID.toString() }
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={0.3}
                    ListFooterComponent={
                        <ActivityIndicator size="large" />
                    }
                    numColumns={2}
                    />  

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