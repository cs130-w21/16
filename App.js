import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import FeaturedMenuScreen from './app/screens/FeaturedMenuScreen';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './app/screens/WelcomeScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="FeaturedMenuScreen">
        <Stack.Screen name='Search' component={WelcomeScreen}/>
        <Stack.Screen
          name='FeaturedMenuScreen' component={FeaturedMenuScreen}
        />
        
      </Stack.Navigator>
        
    </NavigationContainer>
  );
}

export default App;
