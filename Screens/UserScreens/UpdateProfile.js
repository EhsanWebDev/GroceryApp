import React,{Component} from 'react';
import { View,Text,StyleSheet,ActivityIndicator } from 'react-native';
import { Input } from 'react-native-elements';
import {validateAll,validations} from 'indicative/validator'
import {URL} from '../../utls'
import axios from 'axios'
import {Button,Icon} from 'native-base'
import ValidationRules from './Rules'
import {connect} from 'react-redux'
import {updateUser} from '../../store/actions'
import { TouchableOpacity } from 'react-native-gesture-handler';
class UpdateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            loading:false,
            email:'',
            mobile:'',
            data:[],
            emailAvailable:2,
            errors:{},
       
        };
    }
 
componentDidMount(){
    this.set();
}
        set =()=>{
            let   email= this.props.user.auth.EMAIL;
            let    mobile= this.props.user.auth.CONTACT;
                this.setState({
                    email:email,
                    mobile:mobile,
                })
        }
        registerUser= async(data) =>{
            const rules={
                email: "required|email|regex:"+validations.regex(['^([\w-\.]+)@@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$']),
                mobile:'required|string|max:11|min:11'
            }
            const messages={
                required:(field)=>`${field} is required`,
                'email.regex':'The Email Syntax is Wrong',
                'email.email':'The Email Syntax is Wrong',
                'mobile.max':'Mobile Number must be of 11 Digits',
                'mobile.min':'Mobile Number must be of 11 Digits',
            }

        try{
                await validateAll(data,rules,messages).then(()=>{
                   this.setState({errors:{}, loading:true})

        axios.get(`${URL}api/UsersApi/IsEmailExist_F?EMAIL=`+this.state.email)
                        .then((res)=>{
                            this.setState({emailAvailable:res.data,loading:false})
                        }).catch((e)=>console.log(e))
                  
                })
        }catch(errors){
                const formattedErrors={};
                errors.forEach(error=>formattedErrors[error.field] = error.message);
                this.setState({
                    errors:formattedErrors
                })
        }      
    }

    signUpUser=(data)=>{
       // this.setState({loading:true})
        var currentdate = new Date(); 
        var datetime = currentdate.getFullYear()   + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getDate()

           data.created = datetime;
           data.updated = datetime;
           data.name = this.props.

           console.log(data)

        /*   this.props.dispatch(signUp(data)).then(()=>{
               this.setState({loading:false})
               this.props.navigation.navigate('VerifyEmail')
           })*/
    }

    render() {
        if(this.state.loading){
            return( 
              <View style={styles.loading}>
                <ActivityIndicator size="large"/>
              </View>
            )
      
          }else{
               return (
            <View style={styles.main}>

                <Input
                    placeholder='Email Address'
                    onChangeText={value => this.setState({ email: value })}
                    value={this.state.email}
                    autoCapitalize="none"
                   
                />
                     {this.state.errors["email"] && (
              <Text style={{ fontSize: 16, fontWeight: "600" }}>
                {this.state.errors["email"]}
              </Text>
            )}

            {this.state.emailAvailable === 1 ? (
              <Text
                style={{ fontSize: 16, color: "#fbc531", fontWeight: "500" }}
              >
                This Email is Already Registered
              </Text>
            ) : null}

                <Input
                    placeholder='Contact Number'
                    onChangeText={value => this.setState({ mobile: value })}
                    value={this.state.mobile}
                    autoCapitalize="none"
                    
                />

                  {this.state.errors["mobile"] && (
                          <Text style={{ fontSize: 16, fontWeight: "600" }}>
                          {this.state.errors["mobile"]}
                         </Text>
                  )}

            {this.state.emailAvailable === 0 ? (
              <View style={{ width: "100%", marginTop: 10,padding:10 }}>
                <Button
                  block success   style={{marginTop:10}} iconRight
                  onPress={() => this.signUpUser(this.state)}
                  
                >
                <Icon name='save' style={{color:'#fff'}}/>
                <Text style={{fontSize:16,fontWeight:'bold',color:'#fff'}}>Save Changes</Text>

                </Button>
                
              </View>
            ) : (
              <View style={{ width: "100%", marginTop: 10,padding:10 }}>
                <Button
                    block warning   style={{marginTop:10}} iconRight
                  onPress={() => this.registerUser(this.state)}
                > 
                 <Icon name='save' style={{color:'#fff'}}/>
                <Text style={{fontSize:16,fontWeight:'bold',color:'#fff'}}>Check availability </Text>
                </Button>

              </View>
            )}
    
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('ForgotPassword')}
                            style={{justifyContent:'center',alignItems:'center'}}
            >
                <Text style={{fontWeight:'bold',fontSize:14,color:'#2980b9'}}>Change Password?</Text>
            </TouchableOpacity>
            </View>
        );
          }
        
            
       
    }
}

const styles= StyleSheet.create({
    main:{
        marginTop:20,
        padding:20
    }, loading:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
      },
    container:{
        marginVertical:20,
        backgroundColor:'#f44336',
        padding:10
},
    label:{
        color:'#fff',
        textAlign:'center',
        textAlignVertical:'center'
    },
})

const mapStateToProps=(state)=>{
    console.log(state)
    return{
        user:state.user
    }
}

export default connect(mapStateToProps)(UpdateProfile);