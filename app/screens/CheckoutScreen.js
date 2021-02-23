import React, { Component, useCallback, useEffect, useState } from "react";
import { Alert, View, SafeAreaView } from "react-native";
import { StyleSheet } from "react-native";
import { Card, Button } from "react-native-elements";
import CheckoutSubtotal from "../components/checkoutSubtotal";
import colors from "../config/colors";

function CheckoutScreen(props) {
    return (
        <SafeAreaView style={styles.container}>
            <CheckoutSubtotal></CheckoutSubtotal>
            <View style={styles.paymentTab}>
            <Button
              type="solid"
              title="Pay with Cash"
              titleStyle={styles.paymentText}
              buttonStyle={styles.paymentButton}
              onPress={() => {
                // Do a thing
              }}
            />
            <Button 
              type="solid"
              title="Pay with Venmo"
              titleStyle={styles.paymentText}
              buttonStyle={styles.paymentButton}
              onPress={() => {
                // Do a thing
              }}
            />
      </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background
    },
    paymentTab: {
        flex: 1,
        backgroundColor: colors.primary,
        justifyContent: "space-evenly",
        alignContent: "center",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        height: "12%",
        position: "absolute",
        bottom: 0
    }, 
    paymentText: {
      fontWeight: "bold",
      fontFamily: "Avenir"
    },
    paymentButton: {
        borderRadius: 20,
        backgroundColor: colors.secondary,
    }
});

export default CheckoutScreen;