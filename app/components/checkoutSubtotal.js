import React, { useEffect, useState } from "react";
import { Alert, View, StyleSheet, Text, ScrollView } from "react-native";
import { Card, Button, Input } from "react-native-elements";
import colors from "../config/colors";
import PropTypes, { any } from "prop-types";
import { Row } from "react-native-table-component";
import { dishesPerChef, getLongestTime, getLongestTimeForChef,  isolateChefs, subTotal } from "./ShoppingCart";

function CheckoutSubtotal(props) {
  const [cart, setCart] = useState(global.cart);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.headers}>DISHES</Text>
        {Object.keys(isolateChefs()).map((chef) => 
          <View>
            <Text style={styles.chefText}>Chef: {chef}</Text>
            {dishesPerChef()[chef].map((item) => 
              item["count"] > 0 ? (
                <View style={styles.itemContainer}>
                  <Text style={styles.textStyle}>
                    {item["count"] +
                      " x " +
                      item["dish"]["name"] +
                      " by " +
                      item["dish"]["Chef"]["name"]}
                  </Text>
                  <Text style={styles.textStyle}>
                    {"$" + (item["count"] * item["dish"]["price"]).toFixed(2)}
                  </Text>
                </View>
              ) : null
            )}
            <Input
              placeholder="Special Instructions"
              placeholderTextColor="grey"
              multiline={true}
              numberOfLines={5}
              containerStyle={styles.commentContainer}
              inputContainerStyle={styles.commentInputContainer}
              inputStyle={styles.commentInput}
              onChangeText={text => {
                props.setComment(text, chef);
              }}
            />
            <Text style={styles.deliveryHeader}>Estimated Time To Pickup: {getLongestTimeForChef(chef)}</Text>
          </View>
        )}
        <View style={styles.subtotalContainer}>
          <Text style={styles.headers}>TOTAL</Text>
          <Text style={styles.headers}>{"$" + subTotal()}</Text>
        </View>
        <View style={{height: 100}}/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  scrollView: {
    width: "100%",
    height: "100%",
    marginHorizontal: 10
  },
  itemContainer: {
    paddingVertical: 10,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  subtotalContainer: {
    paddingTop: 20,
    paddingRight: 15,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  headers: {
    fontSize: 20,
    fontFamily: "Avenir",
    fontWeight: 'bold',
    paddingVertical: 10
  },
  deliveryHeader: {
    fontSize: 17,
    fontFamily: "Avenir",
    marginLeft: '2.5%',
    paddingBottom: 5,
    fontWeight: 'bold'
  },
  textStyle: {
    fontSize: 15,
    fontFamily: "Avenir",
    marginRight: 5
  },
  chefText: {
    fontSize: 18,
    fontFamily: "Avenir",
    color: colors.secondary,
    fontWeight: 'bold',
    marginTop: 10
  },
  commentInputContainer: {
    // height: "100%"
  },
  commentContainer: {
    alignSelf: "flex-start",
    fontFamily: "Avenir",
    paddingTop: 5,
    width: '95%'
  },
  commentInput: {
    alignSelf: "flex-start",
    fontFamily: "Avenir",
    height: "100%",
    color: "gray",
    fontSize: 14
  }
});

export default CheckoutSubtotal;
