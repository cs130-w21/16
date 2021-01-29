import React from "react";
import { View, StyleSheet, Image, Text, SafeAreaView, FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ChefRecList from "../components/chefRecList";
import MenuCard from "../components/dish";
import Constants from 'expo-constants';

import colors from "../config/colors";
import ChefRec from "../components/chefRec";

const DATA = [
  {
    id: '1',
    name: "Chef Remy",
    image: "https://theperceptionalist.files.wordpress.com/2012/03/remy_ratatouille.jpeg",
    rating: 5,
    bio: "I'm a rat"
  }
]

function WelcomeScreen({ navigation }) {
  return (
      <SafeAreaView style={styles.scrollContainer}>
        {/* <View style={styles.logoContainer}>
                  <Image style={styles.logo} source={require("../assets/potluck_logo_small.jpg")}/>
                  <Text style={styles.text}>Potluck</Text>
              </View>   */}
        <ScrollView>
          <SafeAreaView style={styles.container}>
            <MenuCard
              title={"Spaghetti"}
              subtitle={"Chef Remy"}
              image={require("../assets/potluck_logo_small.jpg")}
              description={"Classic spaghetti recipe with marinara sauce!"}
              rating={4.5}
              price={"$10.11"}
              onPress={() => navigation.push("Details")}
            />
          </SafeAreaView>
          <SafeAreaView style={styles.container}>
            <ChefRecList data={DATA} />
          </SafeAreaView>
        </ScrollView>
        
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Constants.statusBarHeight,
  },
  logo: {
    width: 100,
    height: 100
  },
  logoContainer: {
    position: "absolute",
    top: "40%",
    alignItems: "center"
  },

  text: {
    fontSize: 50,
    color: "white",
    fontWeight: "bold",
    fontFamily: "Verdana"
  }
});

export default WelcomeScreen;
