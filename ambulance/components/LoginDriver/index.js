import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Container, Header, Tab, Tabs, Button, TabHeading, Icon} from 'native-base';
import SignIn from './SignIn';
import Register from './Register';

import {NetInfo} from 'react-native';

export default class LoginDriver extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            abc: 1,
        };
    }


    switchFun() {
        this.props.navigation.navigate('signup')
    }

    switchMap() {

        NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected) {
               // this.props.navigation.navigate('listTimeTable');
                //console.warn("Success");
            } else {
                //this.props.navigation.navigate('rout');
            }
        })
    } 

    render() {
        console.disableYellowBox = true;
        return ( 
            <Container>
                <Header style={{height: 0}} hasTabs/>
                <Tabs tabBarUnderlineStyle={{backgroundColor: '#00a4fe', opacity:0}} >
                    <Tab activeTextStyle={{color: '#fff', fontWeight: 'bold'}}
                         textStyle={{color: '#fff', fontSize: 12}}
                         tabStyle={{backgroundColor: '#ff1744', height: 60}}
                         activeTabStyle={{backgroundColor: '#ff5252', height: 60}}
                         heading="Sign in">
                        <SignIn navigation={this.props.navigation}/>
                    </Tab>

                    <Tab activeTextStyle={{color: '#fff', fontWeight: 'bold'}}
                         textStyle={{color: '#fff', fontSize: 12}}
                         tabStyle={{backgroundColor: '#ff1744', height: 60}}
                         activeTabStyle={{backgroundColor: '#ff5252', height: 60}}
                         heading="Register">
                        <Register navigation={this.props.navigation}/>
                    </Tab>
                    
                </Tabs>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    header: {},
    tab: {
        backgroundColor: '#3F51B5'
    }

})