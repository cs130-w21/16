import React from 'react';
import {View, StyleSheet, Image, Text} from "react-native";

import colors from '../config/colors';

function WelcomeScreen(props) {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require("../assets/potluck_logo_small.jpg")}/>
                <Text style={styles.text}>Potluck</Text>
            </View>  
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center'
    },

    logo: {
        width: 100,
        height: 100,
    },

    logoContainer: {
        position: 'absolute',
        top: '40%',
        alignItems: 'center'
    },

    text: {
        fontSize: 50,
        color: "white",
        fontWeight: 'bold',
        fontFamily: "Verdana"
    }
  });

export default WelcomeScreen;

