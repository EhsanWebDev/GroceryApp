import React, { PureComponent } from 'react';
import { View,StyleSheet,FlatList,Image,ActivityIndicator,TouchableOpacity, Picker } from 'react-native';
import { Container, Header, Item, Input, Icon, Button, Text, Content, Form } from 'native-base';
import Constants from 'expo-constants';
import axios from 'axios'
import ProductCard from '../Components/Exclusive/ProductCard'
import {URL} from '../utls'
import Modal from "react-native-modal";
import {uniqBy} from 'lodash'
import { getDistance } from 'geolib';
import * as Permissions from 'expo-permissions';
class SearchScreen extends PureComponent {
    constructor(props) {
      super(props);
     
      this.state = {
        query:"",
        data:[],
        selected1:'',
        selected2: '',
        selected3: '',
        isModalVisible: false,
        latitude:null,
        longitude:null,
        km:0,radius:0
      };
    }
  async  componentDidMount() {
      const { status } = await Permissions.getAsync(Permissions.LOCATION)

      if (status !== 'granted') {
        const response = await Permissions.askAsync(Permissions.LOCATION)
      }
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => this.setState({ latitude, longitude }, ()=>console.log('state:',this.state)),
        (error) => console.log('Error:', error)
      )
    }
    onValueChange2(value) {
      this.setState({
        selected2: value
      });
    const data = this.state.data.sort(this.compareValues('PRICE',value))
    this.setState({
      data:data
    })
    }
    onValueChange1(value) {
      this.setState({
        selected1: value
      });
   // const data = this.state.data.filter(this.compareValues('PRICE',value))
    const data =this.state.data.filter((item) => item.STORE === value).map((item) => (item));
      this.setState({
        data:data
      })

    }
    toggleModal = () => {
      this.setState({ isModalVisible: !this.state.isModalVisible });
    };
     
    static navigationOptions={
      header:null
    }

    handleTextChange=(text)=>{

      this.setState({
        query:text
      })
    }
    searchQuery=()=>{


        axios.get(`${URL}api/ProductsApi/SearchProduct/?name=`+this.state.query).
              then(res=>this.setState({data:res.data})).catch((e)=>console.log(e))

                      
    }

    renderSearch=({item})=>{

      return (
          <View key={item.ID} style={{margin:5,padding:5,
                        borderColor:'#000',borderWidth:1,borderRadius:10}}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <View style={{borderColor:'seagreen',}}>
                <Image source={{uri:`${URL}`+item.IMAGE1}} 
                      style={{width:80,height:80,}} />
                
              </View>
              <View style={{alignItems:'center',justifyContent:'center'}}> 
                <Text style={{fontSize:16,fontStyle:'italic',fontWeight:'bold'}}>Sell By</Text>
                <Text style={{fontSize:16,color:'#9b59b6',fontWeight:'700', textAlign:'center'}}>
                 {item.STORE}
                </Text> 
                
                </View>
              <View style={{}}>
                <Text style={{fontSize:14,fontWeight:'500',padding:5}}>{item.NAME}</Text>
                <Text style={{fontSize:14,fontWeight:'300', padding:5}}>Price: RS {item.PRICE}</Text>
               
              </View>
            </View>

            <View style={{marginTop:5}}>
            <Button 
            onPress={()=>this.props.navigation.navigate('PD',{item:item})}
            style={{alignItems:'center',justifyContent:'center',
            backgroundColor:'#27ae60',
            padding:5,
            borderRadius:5,
            margin:10
              }} rounded small success >
                    <Text style={{}}>Go to Details</Text>
                  <View style={{justifyContent:'flex-end',alignItems:'flex-end'}}>
                    <Icon name="arrow-round-forward" />
                  </View>
                    
                   
                      
              </Button>
            </View>

           

          </View>
      )

    }
    _toggle(event, buttonId) {
      // Use buttonId
      alert(buttonId)
    }
    filterData=( event, value)=>{
      
        
      const data =this.state.data.filter((item) => item.STORE === value).map((item) => (item));
      this.setState({
        data:data
      })
      }
  
    renderButtons=(items)=>{
     let data =  uniqBy(items,'STORE')
      return data.map((item)=>(
        <Picker.Item key={item.ID} label={item.STORE} value={item.STORE} />
      ))
    }

   

      compareValues=(key, order='asc')=> {
      return function(a, b) {
        if(!a.hasOwnProperty(key) || 
           !b.hasOwnProperty(key)) {
          return 0; 
        }
        
        const varA = (typeof a[key] === 'string') ? 
          a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string') ? 
          b[key].toUpperCase() : b[key];
          
        let comparison = 0;
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }
        return (
          (order == 'desc') ? 
          (comparison * -1) : comparison
        );
      };
    }
    filterByDistance= async(event,value)=>{
    await this.setState({ radius: value * 1000 })
        const myData = this.state.data
      const newData = myData.filter(this._getPreciseDistance)
   
     await this.setState({ data: newData })
     // console.log(newData)
    // console.log(this.state.distances)
    }
  _getPreciseDistance = (element) => {
    let long=this.state.longitude;
    let lat = this.state.latitude;
   let pdis=   getDistance(
        {latitude: element.LATITUDE?element.LATITUDE:0,longitude: element.LONGITUDE?element.LONGITUDE:0},
        { latitude: element.LATITUDE?lat:0, longitude: element.LONGITUDE?long:0 }
      )
          if(  pdis < this.state.radius && this.state.radius !== 0){
            return pdis
          }
  };
  
    render() {
      
      return (
        <Container>
          <View style={styles.statusBar}/>
        <Header searchBar rounded style={{backgroundColor:'seagreen'}}>
          <Item>
            
            <Input placeholder="Search Products" onSubmitEditing={this.searchQuery} returnKeyType='search' onChangeText={this.handleTextChange} />
            <TouchableOpacity  onPress={this.searchQuery} >
              <Icon name="ios-search" />
            </TouchableOpacity>
            
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
         
        </Header>
        <View style={{flexDirection:'row',flexWrap:'wrap'}}>
 <Picker
               selectedValue={this.state.selected2}
              style={{height: 50, width: 200, marginBottom:20}}
              onValueChange={(itemValue) =>
           this.onValueChange2(itemValue)
           }>
            <Picker.Item label="Sort By" value="" />
            <Picker.Item label="Price Asc" value="asc" />
            <Picker.Item label="Price Desc" value="desc" />
        </Picker>

        <View style={{flex:1}}>
          <Button onPress={this.toggleModal} style={{justifyContent:'center'}}>
          <Text style={{fontSize:18}}>Filters</Text>
        </Button>
        <Modal onBackButtonPress={this.toggleModal} 
                onBackdropPress={this.toggleModal}
            isVisible={this.state.isModalVisible}>
          <View style={{ height:'80%',width:"100%", backgroundColor:'#fff'}}>
            <View style={{flex:1}}>
                <Text style={{paddingHorizontal:10,fontSize:16,fontWeight:'500'}}>Store Name</Text>
                <View style={{flex:1}}>
                <Picker
               selectedValue={this.state.selected1}
              style={{height: 50, width: 200, marginBottom:20}}
              onValueChange={(itemValue) =>this.onValueChange1(itemValue)
           }>
             <Picker.Item label="Filter By Stores" value="" />
           {this.state.data? this.renderButtons(this.state.data):null}
        </Picker>
                
           
                </View>

                <Text style={{paddingHorizontal:10,fontSize:16,marginTop:10,fontWeight:'500'}}>Search By Distance</Text>
                <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                <Button success small value="1" style={{margin:5}} onPress={(e)=>this.filterByDistance(e,1)}>
                  <Text>Less then 1KM </Text>
                </Button>
              
              
               
                </View>
               
            </View>
            <Button  onPress={this.toggleModal}> 
            <Text>Hide Model</Text>
            </Button>
          </View>
        </Modal>
        </View>

        
        </View>
       

        
        
        
       
        
        <FlatList
        data={this.state.data}
        renderItem={this.renderSearch}
        extraData={this.state}
        keyExtractor = { (item) => item.ID.toString() }
        />

      </Container>
      );
    }
  }
  const styles = StyleSheet.create({
    statusBar: {
      backgroundColor: "#000",
      height: Constants.statusBarHeight,
    }
  })
  
  export default SearchScreen;