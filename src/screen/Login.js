// import React from 'react'
// import { Text, View, StyleSheet, Button, Alert } from 'react-native'
// import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

// function signIn   (user, pass) {
//     Alert.alert(user, pass)
// }

// const Login = props => {
//   console.log(props);
//         return (
//             <View>
//                 <View style={styless.content}>
//                     <Text style={styless.content}>Header</Text>
//                 </View>
//                 <View style={styless.header}>
//                 <Text>Username</Text>
//                 <TextInput style={styless.inp} placeholder="username"></TextInput>
//                 <Text>Password</Text>
//                 <TextInput style={styless.inp} secureTextEntry={true} placeholder="pass"></TextInput>
//                 </View>
//                 <View>
//                 <TouchableOpacity onPress={() => {
//                     props.navigation.navigate('Home');
//                 }}>

//                     <View >
//                         <Text>Login</Text>
//                     </View>
//                 </TouchableOpacity>
//                 </View>
//             </View>
//         )
// }

// const styless = StyleSheet.create({
//     content: {
//         backgroundColor: "green",
//     },
//     header : {
//         marginTop: 10,
//         flex: 1
//     },
//     inp : {
//         backgroundColor: "blue",
//         borderRadius: 5,
//     }
// })

// export default Login;

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  Image,
  ImageBackground,
} from 'react-native';
import Axios from 'axios';
// import { Image } from 'native-base';

export default class Login extends Component {
  constructor() {
    super();
    let loggedIn = false;
    this.state = {
      name: '',
      password: '',
      token: '',
      loggedIn,
    };
  }

  validateUser = async () => {
    try {
      const response = await Axios.post(
        'http://192.168.1.198:8080/api/v1/user/login',
        this.state,
      );
      this.setState({
        loggedIn: true,
      });
      AsyncStorage.setItem('token', response.data.token);
      console.log(response.data.token);
      if (response.data.token === undefined) {
        Alert.alert('username atau password salah');
      } else {
        this.props.navigation.navigate('Navigator');
      }
    } catch (err) {
      this.setState({
        loading: false,
        error: true,
      });
    }

    // this.props.navigation.navigate('Navigator');
  };
  render() {
    return (
      <View style={styles.container}>
          <ImageBackground source={require("../assets/image/bg.jpg")} style={{width: '100%', height: '100%'}}>
        <View style={styles.sectionTitle}>
          <Image source={require('../assets/image/hw.png')}></Image>
        </View>
        <View style={styles.sectionForm}>
          <TextInput
            style={[styles.input, styles.username]}
            placeholder="Username"
            onChangeText={value => this.setState({name: value})}
          />
          <TextInput
            secureTextEntry={true}
            style={[styles.input, styles.password]}
            placeholder="Password"
            onChangeText={value => this.setState({password: value})}
          />
          <TouchableOpacity onPress={this.validateUser}>
            <View style={styles.button}>
              <Text style={styles.fontLogin}>Login</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.sectionButton}>
          
        </View> */}
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffeee',
    flexDirection: 'column',
  },
  sectionTitle: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionForm: {
    // backgroundColor:"yellow",
    flex: 4,
    padding: 15,
  },
  sectionButton: {
    backgroundColor: 'green',
    flex: 5,
    alignItems: 'center',
    marginTop: 0,
  },
  input: {
    marginTop: 0,
    color: 'white',
    borderRadius: 5,
    fontSize: 20,
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'white',
  },
  username: {
    marginTop: 10,
  },
  password: {
    marginTop: 30,
  },
  button: {
    margin: 50,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#1b9094',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontLogin: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'white',
  },
});
