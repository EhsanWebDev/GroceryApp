import React, { Component } from 'react';
import {View, Text,StyleSheet,ScrollView,ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import Catagories from '../../Components/Exclusive/Catagories'
import {connect} from 'react-redux';
import * as actions from '../../store/actions'

class Catagory extends Component {


  constructor(props) {
    super(props);
    this.state = {
      imageID:1,
      images:[],
      loading:false
    };
  }
    componentDidMount(){
      this.props.dispatch(actions.catagoriesList());
     
    }

  static navigationOptions={
    header:null
  }

  increment(id){
    id++
    return id;
  }

  renderCategories(){
    return this.props.categories.map((item,index)=>
                                <Catagories key={item.ID} navigation={this.props.navigation}
                                            name={item.NAME}
                                            imageUri ={images[id++]}
                                            category={item.ID}
                                            toGo='Subcategory'
                                            
                                            />
                                            
                                            )
  }

  render() {
    if(this.state.loading){
      return( 
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator size="large" color="seagreen"/>
        </View>
      )
    }
   else{
    return (
      <ScrollView style={{flex:1}}>
        <View style={styles.statusBar} />
            <Text style ={styles.mainHeading}> Categories </Text>
            <View style = {styles.mainView}>
                
               
                
               {this.props.categories? this.renderCategories():this.setState({loading:true})
                 }
           </View>
      </ScrollView>
    );
   
    
                }
  }
}
let id=1;
const images={
  1:require('../../assets/Images/CatagoryImages/1.jpg'),
  2:require('../../assets/Images/CatagoryImages/2.jpg'),
  3:require('../../assets/Images/CatagoryImages/3.jpg'),
  4:require('../../assets/Images/CatagoryImages/4.jpg'),
  5:require('../../assets/Images/CatagoryImages/5.jpg'),
  6:require('../../assets/Images/CatagoryImages/6.jpg'),
  7:require('../../assets/Images/CatagoryImages/7.jpg'),

}
const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: "#fff",
    height: Constants.statusBarHeight,
  }, mainView:{
     
    flexDirection: 'row',
    flexWrap: 'wrap',
  
},
  mainHeading:{
    fontSize: 26,
    fontWeight: 'bold',
    margin: 20,

}
})

const mapStateToProps=(state)=>{
  return{
    categories:state.categories
  }
  
}

export default connect(mapStateToProps)(Catagory);
