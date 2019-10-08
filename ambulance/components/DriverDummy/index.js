import React, { Component } from 'react';
import { View, Text ,StyleSheet,Image} from 'react-native';
import { Container, Header, Button, Icon, Fab } from 'native-base';
import AwesomeAlert from 'react-native-awesome-alerts';
import SocketIOClient from 'socket.io-client';
import axios from 'axios';
import call from 'react-native-phone-call'

import IPADDR from '../../assets/constant/IP';

export default class DriverDummy extends Component {  //rename ur calss same as ur folder path
  static navigationOptions = {
    title: 'Driver Page',
  };

  constructor(props) {
    super(props);
    this.socket = SocketIOClient(`${IPADDR}`);
    var navi = this.props.navigation;
    var user = navi.getParam('user', {
      name : 'Suyash Salvi',
      contactNo : 95624723541,
      rating : 2
    })
    this.state = {
      showAlert: true,
      onlineStatus:false,
      id : user.name,
      requested : false,
      riderId : null,
      rider : null,
      seats : 5,
      riderContact : '123456',
      riderRating : 5,
      contactNo : user.contactNo,
      rating : user.rating,
      destination : "Virar"
    };

    
  }

  componentDidMount(){

    this.socket.on('request' , (msg)=>{
      console.log("geting requests");
      this.setState( {rider : msg.id , 
        riderId : msg.riderId, riderContact : msg.contactNo, destination : msg.destination,
          riderRating : msg.rating , requested : true, seats : msg.noOfPass} )
    })

  }




  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };
 
  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  goOnline = () =>{

    if ( this.state.onlineStatus ){
      this.socket.emit('goOffline');
    }else{
      this.socket.emit('ready', { id : this.state.id , driverId : this.socket.id })
    }

    this.setState({ onlineStatus: !this.state.onlineStatus })
    
  }

  acceptRequest = () =>{

    let state = this.state;
    let driverId = state.id, id = state.riderId;
    this.socket.emit('sendAcception' , { driverId, id , contactNo : this.state.contactNo } )

    this.setState({
      showAlert: false
    });

  }

  render() {
    const {showAlert} = this.state;
    return (

      <View style={{ flex: 1,alignItems:'center',flexDirection:'row' }}>
      <View style={{ flex: 1,alignItems:'center',flexDirection:'column' }}>
      {this.state.onlineStatus ? <Image style={{width:280, height: 200}} source={require('./img2.jpg')} />: <Image style={{width: 250, height: 220}} source={require('./img1.jpg')} />}
        <View  >
        {this.state.onlineStatus ? <Text style={{ fontWeight:'900',fontSize:50,color:'#840a0a',paddingRight:17}}>  Online</Text>: <Text style={{ fontWeight:'900',fontSize:50,color:'#840a0a',paddingRight:1}}>Offline</Text> }
        </View>
      </View>


        
        <Fab
        active={this.state.active}
        direction="up"
        containerStyle={{ }}
        style={{ backgroundColor: '#5067FF' }}
        position="bottomRight" 
         onPress={ this.goOnline }
        >
        <Icon type="FontAwesome" name="toggle-on"  />
      </Fab>

          
      {
        this.state.requested && 

        <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Booking needed"
        message={ this.state.rider + " wants to book for " + this.state.destination }
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Reject"
        confirmText="Accept"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {
          this.hideAlert();
        }}
        onConfirmPressed={ this.acceptRequest }
      />

      }

      </View>
      
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  button: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: "#AEDEF4",
  },
  text: {
    color: '#fff',
    fontSize: 15
  }
});
