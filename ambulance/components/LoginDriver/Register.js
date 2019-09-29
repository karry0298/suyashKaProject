import React, {Component} from "react";
import {StyleSheet, ImageBackground, Image, View, Dimensions, PermissionsAndroid} from 'react-native';
import {
    Container, Content, Button, Item, Label, Input, Form,Radio,Text, Icon
} from "native-base";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import logo from '../../assets/images/logo.png';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import IPADR from "../../assets/constant/IP";

const {width: WIDTH} = Dimensions.get('window');
export default class SignIn extends Component {
    constructor(props)  {
        super(props);
        this.state = {
            errorMessage: false,
            drivOpt:false,
            fd : null,
            licenceUrl : 'https://www.informalnewz.com/wp-content/uploads/2018/04/index-5.jpeg',
            imageUrl : 'https://i.pinimg.com/originals/1a/b7/93/1ab793756082c4a2a341817da054daf1.jpg'
            
        }
    }

    _register = () =>{

        let ts = this.state;
        let query = {
            name : ts.formName,
            age : ts.formAge,
            password : ts.formPassword,
            photoUrl : ts.imageUrl,
            licenceUrl : ts.licenceUrl,
            carModel : ts.formCarModel,
            carNumber : ts.formCarNumber,
            experienced : ts.drivOpt,
            contactNo : ts.formMobile,
            isStudent : false
        }

        var url = `${IPADR}user/registerDriver`
        console.log("CALLING URL", url)
        axios.post( url , query )
            .then( res => {
                console.log("[DATA: ]",res.data);
                this.props.navigation.navigate('driverLogin')
            } )
            .catch( err => console.log(err) )
        // console.log( query )

    }

    async componentDidMount(){

        console.log("mounting")
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Cool Photo App Camera Permission',
            message:
              'Cool Photo App needs access to your camera ' +
              'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
    
        console.log(granted)        

    }


    uploadDrivingLicence = async () =>{

        var fd = new FormData();
        ImagePicker.launchImageLibrary({}, (response) => {
      
      

            fd.append('file', {
              uri: response.uri,
              type: response.type,
              name: response.fileName
            });
      
            this.setState({ fd })
            // console.log(fd)

            var ref = this;
            var url = 'http://192.168.1.108:3000/upload';
            axios({
              method: 'post',
              url: url,
              data: fd,
              config: { headers: {'Content-Type': 'multipart/form-data' }}
              })
              .then(function (response) {
                  //handle success
                  var data = response.data;
                  ref.setState({ licenceUrl : data.url })
                  console.log( ref.state.licenceUrl );
              })
              .catch(function (response) {
                  //handle error
                  console.log(response);
            });
      
          });



    }

    uploadProfilePicture = () =>{

        var fd = new FormData();
        ImagePicker.launchImageLibrary({}, (response) => {
      
      

            fd.append('file', {
              uri: response.uri,
              type: response.type,
              name: response.fileName
            });
      
            this.setState({ fd })
            // console.log(fd)

            var ref = this;
            var url = 'http://192.168.1.108:3000/upload';
            axios({
              method: 'post',
              url: url,
              data: fd,
              config: { headers: {'Content-Type': 'multipart/form-data' }}
              })
              .then(function (response) {
                  //handle success
                  var data = response.data;
                  ref.setState({ imageUrl : data.url })
                  console.log();
              })
              .catch(function (response) {
                  //handle error
                  console.log(response);
            });
      
          });

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
                                <Label>Mobile</Label>
                                <Input keyboardType='name-phone-pad' 
                                       onChangeText={(text) => this.setState({"formMobile":text})}
                                       value={this.state["formMobile"]}/>
                            </Item>
                            <Item floatingLabel>
                                <Label>Age</Label>
                                <Input keyboardType='name-phone-pad' 
                                       onChangeText={(text) => this.setState({"formAge":text})}
                                       value={this.state["formAge"]}/>
                            </Item>
                            <Item floatingLabel>
                                <Label>Password</Label>
                                <Input secureTextEntry
                                       onChangeText={(text) => this.setState({"formPassword":text})}
                                       value={this.state["formPassword"]}/>
                            </Item>

                            <Item floatingLabel>
                                <Label> Car Model </Label>
                                <Input 
                                       onChangeText={(text) => this.setState({"formCarModel":text})}
                                       value={this.state["formCarModel"]}/>
                            </Item>


                            <Item floatingLabel>
                                <Label> Car Number </Label>
                                <Input
                                       onChangeText={(text) => this.setState({"formCarNumber":text})}
                                       value={this.state["formCarNumber"]}/>
                            </Item>



                            <Button rounded info onPress={ this.uploadProfilePicture } style={{textAlign:'center',justifyContent:'center',width:260 ,marginTop: 30, alignSelf: 'center', backgroundColor:"#ff1744"}}>
                                <Text>Select Profile Image</Text>
                            </Button>
                            <Button rounded info onPress={ this.uploadDrivingLicence } style={{textAlign:'center',justifyContent:'center',width:260 ,marginTop: 30, alignSelf: 'center', backgroundColor:"#ff1744"}}>
                                <Text>Select Driving Licence</Text>
                            </Button>

                            
                            <View style={{flexDirection:'row' , marginLeft:15, marginTop:25}}>

                            <View style={{flex:0.5}}>
                              <Radio onPress={() => this.setState({ drivOpt: false })} selected={this.state.drivOpt != true} />
                              <Text>New Driver</Text> 
                            </View>


                            <View style={{flex:0.5}}>
                              <Radio onPress={() => this.setState({ drivOpt: true })} selected={this.state.drivOpt != false} />
                              <Text>Exprienced Driver</Text>
                            </View>                        


                            </View>

                        </Form>

                        <Button rounded info onPress={ this._register }
                        style={{textAlign:'center',justifyContent:'center',width:260 ,marginTop: 30, alignSelf: 'center', backgroundColor:"#ff1744"}}>
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
