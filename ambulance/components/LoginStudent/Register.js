import React, {Component} from "react";
import {StyleSheet, ImageBackground, Image, View, Dimensions} from 'react-native';
import {
    Container, Content, Button, Item, Label, Input, Form,Radio,Text, Icon
} from "native-base";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import logo from '../../assets/images/logo.png';
import axios from 'axios';

import IPADR from "../../assets/constant/IP";


const {width: WIDTH} = Dimensions.get('window');
export default class SignIn extends Component {
    constructor(props)  {
        super(props);
        this.state = {
            errorMessage: false
        }
    }

    _register = () =>{

        let ts = this.state;
        let query = {
            name : ts.formName,
            age : ts.formAge,
            password : ts.formPassword,
            contactNo : ts.formMobile,
            rollNo : ts.formRollNo,
            isStudent : true
        }

        var url = `${IPADR}user/registerStudent`
        console.log("CALLING URL", url)
        axios.post( url , query )
            .then( res => {
                console.log("[DATA: ]",res.data);
                this.props.navigation.navigate('studentLogin')
            } )
            .catch( err => console.log(err) )
        // console.log( query )

    }

    render() {
        return (
            <Container>
                <Content>

                    <View style={styles.logoContainer}>
                        <Text style={styles.logoText}>Registration</Text>
                    </View>

                    <View style={{paddingLeft: 20, paddingRight: 20}}>
                        {this.state.errorMessage &&
                        <View style={{backgroundColor:"lightpink", padding:20,
                         borderRadius:10, borderWidth:2, borderColour:"red", textAlign:"center", marginTop:20}}>
                            <Text>{this.state.errorMessage}</Text>
                        </View> }
                        
                        <Form block style={styles.item}>
                            <Item block floatingLabel>
                                <Label block style={{marginBottom: 20}}>
                                    <Text>Name</Text>
                                </Label>
                                <Input block
                                       onChangeText={(text) => this.setState({"formName":text})}
                                       value={this.state["formName"]} />
                            </Item>
                            <Item floatingLabel>
                                <Label>Email</Label>
                                <Input 
                                       onChangeText={(text) => this.setState({"formEmail":text})}
                                       value={this.state["formEmail"]}/>
                            </Item>
                            
                            <Item floatingLabel>
                                <Label>Roll Number</Label>
                                <Input 
                                       onChangeText={(text) => this.setState({"formRollNo":text})}
                                       value={this.state["formRollNo"]}/>
                            </Item>

                            <Item floatingLabel>
                                <Label>Age</Label>
                                <Input 
                                       onChangeText={(text) => this.setState({"formAge":text})}
                                       value={this.state["formAge"]}/>
                            </Item>
                            <Item floatingLabel>
                                <Label>Password</Label>
                                <Input secureTextEntry
                                       onChangeText={(text) => this.setState({"formPassword":text})}
                                       value={this.state["formPassword"]}/>
                            </Item>
                           
                        </Form>

                        <Button rounded info onPress={this._register}
                        style={{textAlign:'center',justifyContent:'center',width:260 ,marginTop: 30, alignSelf: 'center', backgroundColor:"#0083d9"}}>
                            <Text >Register</Text>
                        </Button>



                    </View>

                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center',

    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 30
    },
    logo: {
        height: 150,
        width: 150,
        resizeMode: 'contain'
    },
    logoText: {
        color: 'black',
        fontSize: 30,
        fontWeight: '300',
        opacity: 0.9,
    },
    item: {
        paddingTop: 10,
    },

});
