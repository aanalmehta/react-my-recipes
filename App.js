import React from 'react';
import { Keyboard } from 'react-native';
import { StyleSheet, ScrollView, Text, View, Image, Alert, TextInput, TouchableHighlight, ImageBackground } from 'react-native';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email : '',
            password : ''
        };
      }
    onClickListener = (viewId) => {
        Keyboard.dismiss()
        if (this.state.email == '') {
            Alert.alert("Alert", "Please enter Email");
        } else if (this.state.password == '') {
            Alert.alert("Alert", "Please enter Password");
        } else {
            if (this.state.email != '') {
                let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
                if(reg.test(this.state.email ) === false)
                {
                    Alert.alert("Alert", "Please enter valid Email");
                    return false;
                } else {
                    console.log("Email : "+this.state.email+" Pwd : "+this.state.password);
            fetch('http://35.160.197.175:3006/api/v1/user/login',{
                method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            }),
            }).then((response) => response.json())
            .then((responseJson) => {
                console.log("Oh yeah "+JSON.stringify(responseJson));
                if (responseJson.error) {
                    Alert.alert("Login Failed", responseJson.error);
                } else {
                    Alert.alert("Login Successful", "You have successfully logged in!!!");
                }
            })
            .catch((error) =>{
                Alert.alert("Login Failed", error);
            });
                }
            }
        }
      }

    render(){
    return ( 
        <View style={styles.container}>
            <ScrollView style={{width: "100%"}} contentContainerStyle={{flexGrow: 1}}>
            <ImageBackground style={ styles.imgBackground } 
                 source={require('./assets/ic_splash.png')}>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={require('./assets/mail.png')}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={require('./assets/password.png')}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('login')}>
        <Text style={styles.loginText}>LOGIN</Text>
        </TouchableHighlight>
        </ImageBackground>
        </ScrollView>
      </View>
    );
}
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:10,
        borderBottomWidth: 1,
        width:250,
        height:45,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center'
    },
    imgBackground: {
        width: '100%',
        height: '100%',
        justifyContent: 'center', 
        alignItems: 'center' 
},
    inputs:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    inputIcon:{
      width:30,
      height:30,
      marginLeft:15,
      justifyContent: 'center'
    },
    buttonContainer: {
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:10,
    },
    loginButton: {
      backgroundColor: "#FF7F00",
    },
    loginText: {
      color: 'white',
    }
  });