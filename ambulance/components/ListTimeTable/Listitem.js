import React,{Component} from "react";
import { AppRegistry, Image, StatusBar,Text } from "react-native";
import { Button,Container,List,Content,Icon,Thumbnail, View} from "native-base";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Rating} from 'react-native-elements';

const routes = [
                {title:"prof",name:"Profile", icon:"user"},
                {title:"rout" , name:"Help Section" , icon:"question-circle"},
                {title:"filter",name:"Filter", icon:"filter"},
                {title:"feedback",name:"Feedback", icon:"comments"},
                {title:"chat",name:"Chatroom", icon:"comment-dots"},
                {title:"prof",name:"Profile", icon:"user"},
                {title:"rout" , name:"Help Section" , icon:"question-circle"},
                {title:"filter",name:"Filter", icon:"filter"},
                {title:"feedback",name:"Feedback", icon:"comments"},
                {title:"chat",name:"Chatroom", icon:"comment-dots"}];

export default class ListItem extends Component {
  render() {
    
    return (    
      
    // <Container style={{backgroundColor:'#e8f5fc'}}>
    //     <Content>  
    
    //     <List 
    //         dataArray={routes}
    //         renderRow={data => {
    //           return (

                <View style={{flex:1,}}>
                  
                  <View style={{flexDirection:'row' ,marginTop:7 , marginBottom: 7}}>
                    <View style={{flex:0.85}}>
                      <Text blurRadius={1} style={{color:'black' , fontSize:23, paddingLeft:20 ,paddingRight:5}}>{this.props.name} {this.props.source}</Text>
                      <Text blurRadius={1} style={{color:'grey' , fontSize:17, paddingLeft:20 ,paddingRight:5}}>{this.props.special} | 24/7 {this.props.emergency} </Text>
                      <Text blurRadius={1} style={{color:'grey' , fontSize:17, paddingLeft:20 ,paddingRight:5}}>{this.props.distance} away from current location</Text>
                    
                      <View style={{flexDirection:'row'}}>

                      <Text blurRadius={1} style={{color:'grey' , fontSize:17, paddingLeft:20 ,paddingRight:5}}>Ratings : </Text>

                        <Rating
                            imageSize={15}
                            readonly
                            startingValue={4}
                            style={{marginTop:6 }}
                            />
                      </View>

                    </View>
                    
                    <View style={{flex:0.15 , justifyContent:'center' , alignItems: 'center', }}>
                      <Button rounded info style={{textAlign:'center',justifyContent:'center',width:60,marginRight:25 , alignSelf: 'center', backgroundColor:"#ff1744"}}
                        onPress={() => this.props.buttonFunc(this.props.name)}>
                          <Text style={{color:'white'}} >BOOK</Text>
                      </Button>
                    </View>
                  </View>

                  <View
                    style={{
                      alignSelf:'center',
                      borderBottomColor: 'black',
                      borderBottomWidth: 1,
                      paddingLeft:20,
                      width:370
                    }}
                  />
            
                </View>  
      //         );
      //       }}
      //     />
      //   </Content>
      // </Container>


      
    );
  }
}