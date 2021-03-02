import React, { Component, useCallback, useEffect, useState } from "react";
import { Alert, View, SafeAreaView } from "react-native";
import { StyleSheet } from "react-native";
import { Card, Button, Input } from "react-native-elements";
import CheckoutSubtotal from "../components/checkoutSubtotal";
import { getDishes, isolateChefs } from "../components/ShoppingCart";
import colors from "../config/colors";
import { sendTextMessage } from "../util/Queries";
const secrets = require("../../backend/secrets");

function CheckoutScreen(props) {
  const [comment, setComment] = useState("");
  const navigation = props.navigation;
  return (
    <SafeAreaView style={styles.container}>
      <CheckoutSubtotal></CheckoutSubtotal>
      <View>
        <Input
          placeholder="Special Instructions"
          placeholderTextColor="grey"
          multiline={true}
          numberOfLines={5}
          containerStyle={styles.commentContainer}
          inputContainerStyle={styles.commentInputContainer}
          inputStyle={styles.commentInput}
          onChangeText={text => {
            setComment(text);
          }}
        />
      </View>
      <View style={styles.paymentTab}>
        <Button
          type="solid"
          title="Pay with Cash"
          titleStyle={styles.paymentText}
          buttonStyle={styles.paymentButton}
          onPress={() => {
            // Do a thing
            var pairs = isolateChefs();
            Object.keys(pairs).forEach(chef =>
              sendTextMessage(
                getDishes(pairs[chef]),
                comment != "" ? comment : "None",
                secrets.phone(chef),
                "Cash"
              ).then(navigation.navigate("Tracking"))
            );
          }}
        />
        <Button
          type="solid"
          title="Pay with Venmo"
          titleStyle={styles.paymentText}
          buttonStyle={styles.paymentButton}
          onPress={() => {
            // Do a thing
            var pairs = isolateChefs();
            Object.keys(pairs).forEach(chef =>
              sendTextMessage(
                getDishes(pairs[chef]),
                comment != "" ? comment : "None",
                secrets.phone(chef),
                "Venmo"
              ).then(navigation.navigate("Tracking"))
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
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
    backgroundColor: colors.secondary
  },
  commentInputContainer: {
    // height: "100%"
  },
  commentContainer: {
    alignSelf: "flex-start",
    fontFamily: "Avenir",
    height: "40%"
  },
  commentInput: {
    alignSelf: "flex-start",
    fontFamily: "Avenir",
    height: "100%",
    color: "gray",
    fontSize: 14
  }
});

export default CheckoutScreen;
