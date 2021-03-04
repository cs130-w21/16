import React, { Component, useCallback, useEffect, useState } from "react";
import { Alert, View, SafeAreaView } from "react-native";
import { StyleSheet } from "react-native";
import { Card, Button, Input } from "react-native-elements";
import CheckoutSubtotal from "../components/checkoutSubtotal";
import { dishesPerChef, getDishes, isolateChefs } from "../components/ShoppingCart";
import colors from "../config/colors";
import { sendTextMessage } from "../util/Queries";
import Order from '../objects/Order';
const secrets = require("../../backend/secrets");

function CheckoutScreen(props) {
  const [comment, setComment] = useState({});
  const navigation = props.navigation;
  function setCommentChef(thisComment, chef){
    var comments = comment;
    comments[chef] = thisComment;
    setComment(comments);
  }

  return (
    <View style={styles.container}>
      <CheckoutSubtotal setComment={setCommentChef}></CheckoutSubtotal>
      <SafeAreaView style={styles.paymentTab}>
        <Button
          type="solid"
          title="Pay with Cash"
          titleStyle={styles.paymentText}
          buttonStyle={styles.paymentButton}
          containerStyle={styles.paymentButtonContainer}
          onPress={() => {
            // Do a thing
            if(!global.orderOpen){
              global.orderOpen = true;
              global.progress = {};
              global.orders = new Order(dishesPerChef());
              var pairs = isolateChefs();
              Object.keys(pairs).forEach(chef =>
              sendTextMessage(
                getDishes(pairs[chef]),
                comment[chef] != "" ? comment[chef] : "None",
                secrets.phone(chef),
                "Cash"
              ).then(navigation.navigate("Tracking"))
              );
            } else {
              global.orderOpen = true;
              navigation.navigate("Tracking")
            }
          }}
        />
        <Button
          type="solid"
          title="Pay with Venmo"
          titleStyle={styles.paymentText}
          buttonStyle={styles.paymentButton}
          containerStyle={styles.paymentButtonContainer}
          onPress={() => {
            // Do a thing
            if(!global.orderOpen){
              global.orderOpen = true;
              global.progress = {};
              global.orders = new Order(dishesPerChef());
              var pairs = isolateChefs();
              Object.keys(pairs).forEach(chef =>
                sendTextMessage(
                  getDishes(pairs[chef]),
                  comment[chef] != "" ? comment[chef] : "None",
                  secrets.phone(chef),
                  "Venmo"
                ).then(navigation.navigate("Tracking"))
              );
            } else {
              global.orderOpen = true;
              navigation.navigate("Tracking")
            }
          }}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%'
  },
  paymentTab: {
    flex: 1,
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
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
  paymentButtonContainer: {
    width: '40%',
    marginBottom: 20
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
