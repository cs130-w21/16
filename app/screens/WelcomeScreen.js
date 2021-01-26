import React from 'react';
import {View, StyleSheet, Image, Text} from "react-native";
import ChefMenu from '../components/ChefMenu';

import colors from '../config/colors';

function WelcomeScreen(props) {
    return (
        <View style={styles.container}>
            <ChefMenu/>
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

