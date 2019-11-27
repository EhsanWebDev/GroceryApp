import React , {Component} from 'react';
import { Image,View,Dimensions } from 'react-native';
import {URL} from '../../utls'

class ProductSlider extends Component {

    render()
    {
        return(

            <View style = {styles.mainViewStyle}>

                <View style = {{flex:1}}>

                    <Image  source= {{uri:`${URL}`+this.props.imageUri}} 
                            style = {{width:Dimensions.get('window').width, height:300 , resizeMode:'contain'}} 
                    />

                </View>
              


            </View>
        )
    }
}

const styles = {
    mainViewStyle:{
        
        shadowColor: '#000',
        shadowOffset:{width:1 , height:5},
        shadowOpacity:0.8,
        elevation:5,
        width:400, height:300
    }
}

export default ProductSlider;
