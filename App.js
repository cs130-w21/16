import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import FeaturedMenuScreen from './app/screens/FeaturedMenuScreen';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './app/screens/WelcomeScreen';
import DishPage from './app/screens/DishPage';
import ChefScreen from "./app/screens/ChefScreen";
// import * as Location from 'expo-location';

const Stack = createStackNavigator();

const App = () => {
  // const [location, setLocation] = useState(null);
  // const [errorMsg, setErrorMsg] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestPermissionsAsync();
  //     if (status !== 'granted') {
  //       setErrorMsg('Permission to access location was denied');
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);
  //   })();
  // }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="FeaturedMenuScreen">
        <Stack.Screen name='Search' component={WelcomeScreen}/>
        <Stack.Screen
          name='FeaturedMenuScreen' component={FeaturedMenuScreen}
        />
        <Stack.Screen name='DishPage' component={DishPage}/>
        <Stack.Screen name="Chef" component={ChefScreen} />
      </Stack.Navigator>
        
    </NavigationContainer>
  );
}

export default App;
