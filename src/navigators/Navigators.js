import React from 'react';
// import {View, Text} from 'react-native';
// import Home from '../../screens/Home';
import Login from '../screen/Login';
import Add from '../screen/Add';
import Home from '../screen/Home';
import Logi from '../screen/Login'
import Cart from '../screen/Cart'
import Detail from "../screen/Detail";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
// import Navigator from './navigators'
import {createBottomNavigator, createBottomTabNavigator} from '@react-navigation/bottom-tabs'

const Bottom = createBottomTabNavigator()
const Stack = createStackNavigator();
const MainNavigators = () => {
  return (
    <Bottom.Navigator initialRouteName="Home" headerMode='none'>
        {/* <Stack.Screen name="Login" component={Login} /> */}
        {/* <Stack.Screen name="Login" component={Login} options={{headerShown: false}} /> */}
        {/* <Bottom.Screen name="Detail" component={Detail} /> */}
        <Bottom.Screen name="Home" component={Home} />
        <Bottom.Screen name="Add" component={Add}/>
        <Bottom.Screen name="Cart" component={Cart}/>
    </Bottom.Navigator>
  );
};

export default MainNavigators;