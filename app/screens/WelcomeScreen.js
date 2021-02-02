import React from "react";
import { View, StyleSheet, Image, Text, SafeAreaView } from "react-native";
import MenuCard from "../components/dish";

import colors from "../config/colors";

function WelcomeScreen(props) {
    const {navigation, route} = props;
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require("../assets/potluck_logo_small_transparent_orange.png")}/>
                <Text style={styles.text}>Potluck</Text>
            </View>
        </View>
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
