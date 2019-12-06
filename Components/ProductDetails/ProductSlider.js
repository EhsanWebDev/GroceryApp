import React , {Component} from 'react';
import { Image,View,Dimensions } from 'react-native';
import {URL} from '../../utls'

class ProductSlider extends Component {

    render()
    {
        return(

            <View style = {{flex:1}}>
                    <Image  source= {{uri:`${URL}`+this.props.imageUri}} 
                            style = {{width:Dimensions.get('window').width, height:200 , resizeMode:'contain'}} 
                    />
                
            </View>
        )
    }
}

const styles = {
   
}

export default ProductSlider;
