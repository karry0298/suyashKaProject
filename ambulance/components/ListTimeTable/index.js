import React, { Component } from 'react';
import { View, Text,StyleSheet,Linking,TouchableOpacity,Picker } from 'react-native';
import {Container,List, Content, Button, Item, Label, Input, Form,Icon, Header ,Radio } from "native-base";
import ListItem from './Listitem.js';
import Dialog, { DialogTitle,DialogContent,DialogFooter,DialogButton,SlideAnimation} from 'react-native-popup-dialog';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SocketIOClient from 'socket.io-client';
import IPADDR from '../../assets/constant/IP';
import call from 'react-native-phone-call'

const routes = [
  {source:"Virar",desti:"Viva",name:"Lilavati Hospital",special:"eyes specialization" , emergency:"Available" , distance:'25km'},
  {source:"Virar" , desti:"Viva" ,name:"Raheja Hospital",special:"brain specialization" , emergency:"Not Available", distance:'35km'},
  {source:"Viva",desti:"Virar",name:"Kokilaben Hospital",special:"heart specialization" , emergency:"Available", distance:'32km'},
  {source:"Viva",desti:"Virar",name:"Karuna Hospital",special:"bones specialization" , emergency:"Not Available", distance:'45km'},
  {source:"Virar",desti:"Viva",name:"Navneet Hospital",special:"cardiac specialization" , emergency:"Available", distance:'51km'},
  {source:"Virar",desti:"Viva",name:"Hinduja Hospital",special:"cancer specialization" , emergency:"Not Available", distance:'59km'},
  {source:"Viva" , desti:"Virar",name:"KEM Hospital",special:"full body checkup" , emergency:"Available", distance:'85km'},
  {source:"Viva",desti:"Virar",name:"Vadia Hospital",special:"cancer specialization" , emergency:"Not Available", distance:'100km'},
  {source:"Virar",desti:"Viva",name:"Harkisandas Hospital",special:"heart specialization" , emergency:"Available", distance:'122km'},
  {source:"Viva",desti:"Virar",name:"Bhagvati Hospital",special:"brain specialization" , emergency:"Available", distance:'222km'}];


export default class studentNavigation extends Component {

  constructor(props) {
    super(props);
    var navi = this.props.navigation;
    var user = navi.getParam('user', {
      name : 'Abby Patil',
      contactNo : 95624723541,
      rating : 2
    })
    this.state = {
      tumtum:false,
      rickshaw:false,
      myId : user.name,
      findingTumTumMsg : "Finding your Ride...",
      findingRickshawMsg : "Finding your Ride..",
      accepted : false,
      driverId : null,
      contactNo : user.contactNo,
      rating : user.rating,
      tumtumNumber:'1',
      rickshawNumber:'1',
      destination:"College",
      driverContactNo : 9730304944
    };
    this.socket = SocketIOClient(`${IPADDR}`);
  }


  componentDidMount() {

    this.socket.on('accept', (msg)=>{
      var findingTumTumMsg = `Mr ${msg.driverId} has accepted your request`
      console.log(msg)
      this.setState({ accepted : true , 
        driverId : msg.driverId, findingTumTumMsg , driverContactNo : msg.contactNo })
    })

  }

  handleCall = () =>{
    var num = this.state.driverContactNo;
    console.log("before con", num)
    const contact = {
      number: num.toString(), // String value with the number to call
      prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call 
    }
    call(contact).catch(console.error)
  }

  handle = () =>{
    let url = 'http://m.p-y.tm';
    Linking.openURL(url).catch(err => {
    if (err.code === 'EUNSPECIFIED') {

        if (Platform.OS === 'android') {
            Linking.openURL(url);
            }
    } 
    else {
        console.log("Impossible")
    }
    });
}

handleTumTumPress = () =>{

  var destination = this.state.destination,
      noOfPass = this.state.tumtumNumber
  this.socket.emit('find' , { id : this.state.myId, destination, noOfPass, 
                  contactNo : this.state.contactNo, rating : this.state.rating , riderId : this.socket.id })

}

handleRickshawPress = () =>{

  var destination = this.state.destination,
      noOfPass = this.state.rickshawNumber  
  this.socket.emit('find' , { id : this.state.myId, destination, noOfPass,
    contactNo : this.state.contactNo, rating : this.state.rating , riderId : this.socket.id })

}



  render() {
    console.disableYellowBox = true;
    return (
      <View style={{flex:1 , backgroundColor:'#ffcdd2'}}>

        <View style={{flex:1 , backgroundColor:'#ffcdd2'}} >
          <Container style={{backgroundColor:'#fce4ec'}}>
          <Content>  
      
          <List 
              dataArray={routes}
              renderRow={data => {
                return (
                  <ListItem source={data.source} distance={data.distance} special={data.special} desti={data.desti} name={data.name} emergency={data.emergency} />
                  );
                }}
              />
            </Content>
          </Container>
            
        </View> 

        <View style={{flexDirection:'row', justifyContent:'center'}}>
        
    </View>

{/* ------------------------------------------------Tum   Tum---------------------------------------------------------------------------------------------------- */}

        <Dialog
          onDismiss={() => {this.setState({tumtum:false})}}
          width={0.85}
          height={0.75}
          visible={this.state.tumtum}
          rounded
          actionsBordered
          onTouchOutside  ={()=>{this.setState({tumtum:false})}}>
          <View style={{height:"58%",flexDirection:"column",justifyContent: "space-between",alignItems: "center", }} >
              <View style ={styles.DialogBContainer}>
              
                  <View style={[styles.CircleShapeView]}>
                  <FontAwesome5 name={"bell"} brand style={{paddingLeft:5 , fontSize: 80, color:'black'}} /> 

                  </View>
              </View>
              <View>
                  <Text style={[styles.status]} > Status</Text>
              </View>
              {/* { this.state.findingTumTumMsg } */}
              <View style={{alignItems:'center',marginBottom:15}} >
                  <Text style={{fontSize:18,fontWeight:'bold',color:'#000',marginTop:2}} > { this.state.findingTumTumMsg } </Text>
                  {
                    this.state.accepted &&
                    <View style={{marginTop:10}} >
                      <Button onPress={ this.handleCall }>
                        <Text style={{color:'white'}}>  Call the Driver  </Text>
                      </Button>
                    </View>        
                  }


              </View>

              <View style={{paddingTop:15}}></View>

              
              <Item floatingLabel style={{ width:250}}>
                <Label>Enter Destination</Label>
                <Input  onChangeText={(text) => this.setState({"destination":text})}
                        value={this.state["destination"]}/>
              </Item>


                <View style={{flexDirection:'row', marginTop:15}}>
                  <View style={{flex:0.5 , alignItems:'center',paddingTop: 14,}}>
                    <Text style={{fontSize:18,fontWeight:'bold',color:'#000'}}> No Of People: </Text>
                  </View>

                  <View style={{flex:0.5 }}>
                    <Picker
                      selectedValue={this.state.tumtumNumber}
                      style={{height: 50, width: 130}}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({tumtumNumber: itemValue})
                      }>
                      <Picker.Item label="One : 1" value="1" />
                      <Picker.Item label="Two : 2" value="2" />
                      <Picker.Item label="Three : 3" value="3" />
                      <Picker.Item label="Four : 4" value="4" />
                      <Picker.Item label="Five : 5" value="5" />
                      <Picker.Item label="Six : 6" value="6" />
                      <Picker.Item label="Seven : 7" value="7" />
                      <Picker.Item label="Eight : 8" value="8" />
                      <Picker.Item label="Nine : 9" value="9" />
                      <Picker.Item label="Ten : 10" value="10" />
                      <Picker.Item label="Eleven : 11" value="11" />
                      <Picker.Item label="Twelve : 12" value="12" />

                    </Picker>
                  </View>

                </View>
              
              {/* onPress={() => this.handle()} */}

                <View style={{margin:10,marginTop:13}}>
                    
                    {
                      ! this.state.accepted ?
                        <Button style={{paddingRight:22,backgroundColor:"#f1813b"}} rounded onPress={this.handleTumTumPress} >
                        <Text style={{paddingLeft:23,fontSize:20 , textAlign:'center'}} > Find </Text>
                        </Button> :
                        <Button style={{paddingRight:22,backgroundColor:"#f1813b"}} rounded onPress={this.handle} >
                        <Text style={{paddingLeft:23,fontSize:20 , textAlign:'center'}} > Pay </Text>
                        </Button> 
                    }
                        
                    
                </View>


          </View>
        </Dialog>

{/* ---------------------------------------------------------------------------------------------------------------------------------------------------- */}

        <Dialog
            onDismiss={() => {this.setState({rickshaw:false})}}
            width={0.85}
            height={0.75}
            visible={this.state.rickshaw}
            rounded
            actionsBordered
            onTouchOutside  ={()=>{this.setState({rickshaw:false})}}>
            <View style={{height:"58%",flexDirection:"column",justifyContent: "space-between",alignItems: "center", }} >
                <View style ={styles.DialogBContainer}>
                
                    <View style={[styles.CircleShapeView]}>
                    <FontAwesome5 name={"bell"} brand style={{paddingLeft:5 , fontSize: 80, color:'black'}} /> 

                    </View>
                </View>
                <View>
                    <Text style={[styles.status]} > Status</Text>
                </View>
                
                {/* { this.state.findingRickshawMsg } */}

                <View style={{alignItems:'center',marginBottom:15}}>
                    <Text style={{textAlign:"center" , fontSize:18,fontWeight:'bold',color:'#000',marginTop:4}} >Mr.Ambilkar has accepted your request</Text>

                    {
                    this.state.accepted &&
                    <View style={{marginTop:10}} >
                      <Button onPress={ this.handleCall }>
                        <Text style={{color:'white'}}>  Call the Driver  </Text>
                      </Button>
                    </View> 
                    }

                </View>

                <Item floatingLabel style={{width:250}}>
                <Label>Enter Destination</Label>
                <Input  onChangeText={(text) => this.setState({"destination":text})}
                        value={this.state["destination"]}/>
                </Item>


                <View style={{flexDirection:'row', marginTop:15}}>
                  <View style={{flex:0.5 , alignItems:'center',paddingTop: 14,}}>
                    <Text style={{fontSize:18,fontWeight:'bold',color:'#000'}}> No Of People: </Text>
                  </View>

                  <View style={{flex:0.5 }}>
                    <Picker
                      selectedValue={this.state.rickshawNumber}
                      style={{height: 50, width: 130}}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({rickshawNumber: itemValue})
                      }>
                      <Picker.Item label="One : 1" value="1" />
                      <Picker.Item label="Two : 2" value="2" />
                      <Picker.Item label="Three : 3" value="3" />
                      <Picker.Item label="Four : 4" value="4" />
                      <Picker.Item label="Five : 5" value="5" />
        
                    </Picker>
                  </View>

                </View>

                <View style={{margin:10,marginTop:55}}>
                {
                      this.state.accepted ?
                        <Button style={{paddingRight:22,backgroundColor:"#f1813b"}} rounded onPress={this.handleRickshawPress} >
                        <Text style={{paddingLeft:23,fontSize:20 , textAlign:'center'}} > Find </Text>
                        </Button> :
                        <Button style={{paddingRight:22,backgroundColor:"#f1813b"}} rounded onPress={this.handle} >
                        <Text style={{paddingLeft:23,fontSize:20 , textAlign:'center'}} > Pay </Text>
                        </Button> 
                    }
                </View>

            </View>
        </Dialog>



      </View>
    );
  }
}


const styles = StyleSheet.create({
  DialogBContainer:{
      
    backgroundColor:"#e0dcdb",    //grey
    width:"100%",
        justifyContent: 'center',
        alignItems:'center'
      },
  CircleShapeView: {
    marginTop:10,
    marginBottom:10,
  elevation:10,
  justifyContent:'center',
  alignItems:'center',
  width: 150,
  height: 150,
  borderRadius: 150/2,
  borderStyle:'solid',
  borderWidth:10,
  borderColor:'#ea5e33',
  backgroundColor: '#fff',
  paddingBottom: 20,
  },
  status:{fontSize:22,
  fontWeight:'bold',
  alignItems:'center' ,
  marginTop:10}
  

})

