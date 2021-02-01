import { StatusBar } from "expo-status-bar";
import React from "react";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import DishScreen from "./app/screens/DishScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Details" component={DishScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
