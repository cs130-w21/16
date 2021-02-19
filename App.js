import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import FeaturedMenuScreen from "./app/screens/FeaturedMenuScreen";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import DishPage from "./app/screens/DishPage";
import ChefScreen from "./app/screens/ChefScreen";
import ShoppingCartScreen from "./app/screens/ShoppingCartScreen";
import colors from "./app/config/colors";
import Search from "./app/screens/Search";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="FeaturedMenuScreen"
      >
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen
          name="ShoppingCart"
          component={ShoppingCartScreen}
          options={{
            title: "CART",
            headerShown: true,
            headerStyle: {
              backgroundColor: colors.primary
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
              color: "white",
              fontFamily: "Avenir",
              fontSize: 20
            },
            headerTruncatedBackTitle: "",
            headerBackTitle: ""
          }}
        />
        <Stack.Screen
          name="FeaturedMenuScreen"
          component={FeaturedMenuScreen}
        />
        <Stack.Screen name="DishPage" component={DishPage} />
        <Stack.Screen name="Chef" component={ChefScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
