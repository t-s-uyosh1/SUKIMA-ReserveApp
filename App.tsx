import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LogInScreen from './components/screens/LogInScreen';

export default function App() {
  const [aaa,iiii] = useState("")
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName="LogIn">
         <Stack.Screen
          name="LogIn"
          component={LogInScreen}
          options={{
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
          
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


