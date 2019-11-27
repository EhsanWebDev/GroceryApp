import React, { Component } from 'react';
import Constants from 'expo-constants';
import { Text,View,Image,ActivityIndicator, TouchableOpacity,StyleSheet,AsyncStorage } from 'react-native';
import { Thumbnail,Icon,Button, Badge } from 'native-base'
import { Avatar} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import {connect} from 'react-redux'
import {autoSignIn , logOut} from '../../store/actions'
import {setTokens,getTokens,removeTokens} from '../../utls'

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isauth:false,
        loading:true
      
    };
  }
  static navigationOptions={
    header:null
  }

  manageState=(isauth,loading)=>{
    this.setState({
      isauth,
      loading
    })
  }
  componentDidMount(){
   getTokens((val)=>{
      if(val[0][1] === null){
        this.manageState(false,false)
      }
      else{
        this.props.dispatch(autoSignIn(val[0][1])).then(()=>{
          !this.props.user.auth?
          this.manageState(false,false):
          setTokens(this.props.user.auth.ID,()=>{
            this.manageState(true,false)
          })
          //console.log(this.props.user.auth)
        })
      }
    })

   

   
  }

  _signout=()=>{
    removeTokens(()=>{
        this.props.dispatch(logOut())
        this.props.navigation.navigate('Home')
        this.setState({isauth:false})
       
    })
}




  render() {


      if(this.state.loading){
        return(
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size="large"/>
          </View>
        )
      }
      else{
        return(
          <View>
              {this.state.isauth?
                   
                      <View>
                        <View style={styles.statusBar} />
                        <View>
                         <View style = {styles.mainHeader} >
                             <View style = {styles.imageContainer}>
                             <Avatar
                              source={require('../../assets/Images/user.jpg')}
                              
                              size="xlarge"
                              rounded
                              />
                              
                             </View>
                             <View style={{marginTop:5}}>
                                 <View style = {{flexDirection:'row', marginBottom:10}}>
              <Text style = {{fontSize:16,color:'white', marginRight:5}}>{this.props.user.auth?this.props.user.auth.NAME:'EHSAN AHMAD'}</Text>
                                    <Icon name = "checkmark-circle-outline" style = {{color:'white'}}></Icon>
                                 </View>
                                  
                
                                    <View style = {{flexDirection:'row',marginBottom:10}}>
                                        <Icon name = "mail" style = {{color:'white', fontSize:18,
                                                                     marginRight:5,}}></Icon>
                                        <Text style = {{fontSize:14,color:'white'}}>{this.props.user.auth?this.props.user.auth.EMAIL:'Not Provided'}</Text>
                                          
                
                                    </View>
                                    
                                    <View style = {{flexDirection:'row'}}>
                                        <Icon name = "call" style = {{color:'white', fontSize:18,
                                                                     marginRight:5,}}></Icon>
                                        <Text style = {{fontSize:14,color:'white'}}>{this.props.user.auth?this.props.user.auth.CONTACT:'Not Provided'}</Text>
                                          
                
                                    </View>
                                    <View style={{marginTop:10}}>
                                    <Button danger style={{alignItems:'center', justifyContent:'center'}} onPress={()=>this._signout()} >
                                      <Text style={{color:'#fff', fontSize:18,}}>Sign Out</Text>
                                      
                                      </Button>
                                    </View>
                                    
                                    
                             </View>
                          
                         </View>
                         <Button block light style={{marginBottom:10}} iconRight
                                  onPress={()=>this.props.navigation.navigate('UpdateUser')}
                         >
                               <Icon name='create'/>
                           <Text style={{fontSize:16,fontWeight:'bold'}}>Edit your Profile</Text>
                         </Button>
                         <View style ={{flexDirection:"row",}} >
                                <Button block danger style={{flex:1}}>
                                    <Icon name = "chatboxes"style ={{color:"white", fontSize:24, marginRight:10}}></Icon>
                                    <Text style = {{ color:'white', fontSize:20}}>Live Chat</Text>
                                </Button>
                                <Button iconLeft block warning style = {{flex:1}}>
                                    <Icon name = "text" style ={{color:"black", fontSize:24, marginRight:10}}></Icon>
                                    <Text style = {{textAlign:'center' , color:'black', fontSize:20}}>Messages</Text>
                                    <Badge danger style ={{marginLeft:30, padding:10}}>
                                        <Text style = {{color:'white'}}>2</Text>
                                    </Badge>
                                </Button>
                         </View>   
                         
                         <View>
                                <View style={{ flexDirection:'row',padding:5,flexWrap:'wrap'}}>
                                   
                                  
                
                                    <TouchableOpacity style={{flex:1}}
                                                  onPress={()=>this.props.navigation.navigate('MyOrders')}
                                    >
                                            <View style={styles.boxStyle}>
                                            <Icon style={{fontSize:30,color:'#fff',padding:5 }} name ="paper"/>
                                            <Text style={styles.boxText}>My Orders</Text>
                                            </View>
                                    </TouchableOpacity>
                
                
                                    <TouchableOpacity style={{flex:1}}>
                                            <View style={styles.boxStyle}>
                                            <Icon style={{fontSize:30,color:'#fff',padding:5}} name ="cash"/>
                                            <Text style={styles.boxText}>My Payments</Text>
                                            </View>
                                    </TouchableOpacity>
                
                                    <TouchableOpacity style={{flex:1}}>
                                            <View style={styles.boxStyle}>
                                            
                                            <Icon style={{fontSize:30,color:'#fff',padding:5}} name ="analytics"/>
                                            <Text style={styles.boxText}>Track Order</Text>
                                            </View>
                                    </TouchableOpacity>
                
                                    
                                   
                                </View>
                
                                <View style={{ flexDirection:'row',padding:5,flexWrap:'wrap'}}>
                                   
                                  
                
                                   <TouchableOpacity style={{flex:1}} onPress ={()=> this.props.navigation.navigate('Maps')}>
                                           <View style={styles.boxStyle}>
                                           
                                           <Icon style={{fontSize:30,color:'#fff',padding:5 }} name ="map"/>
                                           <Text style={styles.boxText}>Search Store Nearby</Text>
                                           </View>
                                   </TouchableOpacity>
                
                
                                   <TouchableOpacity style={{flex:1}}>
                                           <View style={styles.boxStyle}>
                                           
                                           <Icon style={{fontSize:30,color:'#fff',padding:5}} name ="analytics"/>
                                           <Text style={styles.boxText}>Track Your order</Text>
                                           </View>
                                   </TouchableOpacity>
                                  
                
                                   
                                  
                               </View>
                               <Button block danger style={{marginTop:20}} iconLeft>
                               <Icon name='close' style={{color:'#fff'}}/>
            <Text style={{fontSize:16,color:'#fff',fontWeight:'bold'}}>Delete your Profile</Text>
          </Button>
                              
                         </View>
                         
                     
                      
                    
                       </View>
                      </View>
                    
              
              
                :
                <View style={{margin:Constants.statusBarHeight+50,
                                justifyContent:'center'
                                ,alignItems:'center'}}>
                    <Ionicons name="md-sad" size={80} color='#d5d5d5' />
                    <Text style={{fontSize:16,fontWeight:'400'}}>We're Sorry you need to registered / Logged in
                      to see this section
                    </Text>

                    <View style={{marginTop:10}}>
                      
                    <Button
                       
                      transparent
                        onPress={()=>this.props.navigation.navigate('Login')}
                      ><Text>Login / Register</Text></Button>
                      </View>
                </View>
              
              
              }
          </View>
        )
      }










    
  }
}
const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: "#2c3e50",
    height: Constants.statusBarHeight,
  },mainHeader:{
    flexDirection:'row', 
    backgroundColor:'#222f3e',
    padding : 20,
    alignItems: 'flex-start',
},
imageContainer:{
    marginRight: 20,
},
imageStyle:{
    borderColor:'white' ,
     borderWidth:1,
     
},
boxStyle:{
    
    backgroundColor:'#22a6b3',
    borderColor:'#ddd',
    shadowColor: '#000',
    shadowOffset:{width:2 , height:2},
    shadowOpacity:1,
    elevation:5,
    borderWidth:1,
    marginTop: 10,
    padding:10,
    marginRight:10,
    
},
boxText:{
    fontSize:16,
    color:'white',
    
}
  
}

)

const mapStateToProps=(state)=>{
  console.log(state)
  return{
    user:state.user
  }
  }

export default connect(mapStateToProps)(ProfileScreen);
