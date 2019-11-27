import React,{Component} from 'react';
import { View,Text,StyleSheet,ActivityIndicator } from 'react-native';
import { Input } from 'react-native-elements';
import {Button,Icon} from 'native-base'
import ValidationRules from './Rules'
import {connect} from 'react-redux'
import {updateUser} from '../../store/actions'
class UpdateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            hasErrors:false,
            loading:false,
            form:{
                email:{
                    value:"",
                    valid:true,
                    
                    rules:{
                       
                        isEmail:true
                    }
    
                },
                mobileNumber:{
                    value:"",
                    valid:true,
                 
                    rules:{
                        
                        isNumber:true,
                    }
                },
            }
       
        };
    }
    updateInput = (name,value)=>{
        this.setState({
            hasErrors:false
        });

        let formCopy = this.state.form;
        formCopy[name].value= value;

        let rules = formCopy[name].rules
        let valid = ValidationRules(value,rules,formCopy)
       formCopy[name].valid=valid;

        this.setState({
            form:formCopy
        })
    }
    formHasErros =()=>(
        this.state.hasErrors ? 
            <View style={styles.container}>

                <Text style={styles.label}>
                       Please,Check your info.
                </Text>
            </View>

        :null
    )

    submitForm=()=>{
        let formToSubmit={};
        let isFormValid=true;
       const formCopy=this.state.form;
        for (let key in formCopy){
   
        isFormValid = isFormValid && formCopy[key].valid;
        formToSubmit[key] = formCopy[key].value;
   
            }
            if(isFormValid){
                var currentdate = new Date(); 
                var datetime = currentdate.getFullYear()   + "/"
                        + (currentdate.getMonth()+1)  + "/" 
                        + currentdate.getDate()


                formToSubmit.id = this.props.user.auth.id;
                formToSubmit.name = this.props.user.auth.name;
                formToSubmit.created = datetime;
                formToSubmit.updated = datetime;
               formToSubmit.password = this.props.user.auth.password;
               
               this.props.dispatch(updateUser(formToSubmit)).then(()=>{
                        this.setState({loading:true})
                        
               })


            }else{
                this.setState({
                    hasErrors:true
                })
            }
            
                
            
 
}
componentDidMount(){
    this.set();
}

        set =()=>{
            let formCopy = this.state.form;
                formCopy["email"].value= this.props.user.auth.email;
                formCopy["mobileNumber"].value= this.props.user.auth.contact;

                this.setState({
                    form:formCopy
                })


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
                    onChangeText ={value => this.updateInput("email",value)}
                    autoCapitalize="none"
                    value={this.state.form.email.value}
                />

                <Input
                    placeholder='Contact Number'
                    onChangeText ={value => this.updateInput("mobileNumber",value)}
                    autoCapitalize="none"
                    value={this.state.form.mobileNumber.value}
                />
                 

{this.formHasErros()}

                <Button block success style={{marginTop:10}} iconRight
                      onPress={this.submitForm}
                         >
                         <Icon name='save' style={{color:'#fff'}}/>
                   <Text style={{fontSize:16,fontWeight:'bold',color:'#fff'}}>Save Changes</Text>                         
                </Button>
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