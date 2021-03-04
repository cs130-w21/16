import React, { Component, useCallback, useEffect, useState } from "react";
import { Alert, View, SafeAreaView } from "react-native";
import { StyleSheet } from "react-native";
import { Card, Button } from "react-native-elements";
import colors from "../config/colors";
import ShoppingCart from "../components/ShoppingCart";

function ShoppingCartScreen(props) {
  const navigation = props.navigation;
  return (
    <View style={styles.container}>
      <ShoppingCart cart={global.cart}></ShoppingCart>
      <SafeAreaView style={styles.checkoutTab}>
            <Button
              type="solid"
              title="Checkout"
              titleStyle={styles.checkoutText}
              buttonStyle={styles.checkoutButton}
              containerStyle={styles.checkoutButtonContainer}
              onPress={() => {
                if (global.orderOpen){
                  navigation.navigate("Tracking")
                } else {
                  if (global.cart.length > 0) {
                    navigation.navigate("Checkout")
                  } else {
                    Alert.alert(
                      "Can't checkout", 
                      "No items to check out!"
                    );
                  }
                }
              }}
            />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    height: '100%'
  },
  checkoutTab: {
    flex: 1,
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    position: "absolute",
    bottom: 0
  },
  checkoutButton: {
    borderRadius: 20,
    backgroundColor: colors.secondary,
  },
  checkoutButtonContainer: {
    width: '50%',
    marginBottom: 20
  },
  checkoutText: {
    fontWeight: "bold",
    fontFamily: "Avenir"
  }
});

export default ShoppingCartScreen;
