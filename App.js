import React from 'react'
// import { Text, View } from 'react-native'
import MainNavigators from './src/navigators/Navigators'
import {View} from 'native-base'
import {Text} from 'react-native'
import Detail from './src/screen/Detail'
import Login from './src/screen/Login'
import { createStackNavigator } from '@react-navigation/stack';
import Navigator from './src/navigators/Navigators'
import { NavigationContainer } from '@react-navigation/native'
const Stack = createStackNavigator();




const App = () => {    
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" headerMode='none'>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Navigator" component={Navigator} />
      <Stack.Screen name="Detail" component={Detail}/>
      </Stack.Navigator>
    </NavigationContainer>
    )
}
export default App;