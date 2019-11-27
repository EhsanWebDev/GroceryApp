import React , {Component} from 'react';
import { Image,View,Text,TouchableOpacity } from 'react-native';

export default class CatagorySlider extends Component {

    render()
    {
        return(
            <TouchableOpacity>

               <View style = {{height:120 , width:120 ,  borderWidth:0.5, borderColor:'#dddddd'}}>

                        <View style = {{flex:2}}>

                            <Image  source= {this.props.imageUri} 
                                    style = {{width:100 , height:100,borderRadius:50,  resizeMode:'contain'}} 
                            />

                        </View>
                        <View style = {{flex:1, paddingLeft:5, marginTop:40}}>
                            <Text style = {{fontSize:16,}}>{this.props.name}</Text>
                        </View>


                 </View>
            </TouchableOpacity>
       
        )
    }
}

