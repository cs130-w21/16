import React, { useEffect, useState } from "react";
import { Alert, View, StyleSheet, Text, ScrollView } from "react-native";
import { Card, Button } from "react-native-elements";
import colors from "../config/colors";
import PropTypes, { any } from "prop-types";
import { Row } from "react-native-table-component";
import { getLongestTime, subTotal } from "./ShoppingCart"

function CheckoutSubtotal(props) {
    const [cart, setCart] = useState(global.cart);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.headers}>DISHES</Text>
                {cart.map(item => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.textStyle}>
                            {item["count"] + " x " + item["dish"]["name"] + " by " + item["dish"]["Chef"]["name"]}
                        </Text>
                        <Text style={styles.textStyle}>
                            {"$" + (item["count"] * item["dish"]["price"]).toFixed(2)}
                        </Text>
                    </View>
                    
                ))}
                <View style={styles.subtotalContainer}>
                    <Text style={styles.headers}>TOTAL</Text>
                    <Text style={styles.headers}>{"$" + subTotal()}</Text>
                </View>
                <View style={styles.subtotalContainer}>
                    <Text style={styles.deliveryHeader}>Delivery Estimate</Text>
                    <Text style={styles.deliveryHeader}>{getLongestTime()}</Text>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      padding: 10
    },
    scrollView: {
        width: "100%",
        height: "80%"
    },
    itemContainer: {
        paddingTop: 20,
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
        fontFamily: "Avenir"
    },
    deliveryHeader: {
        fontSize: 17,
        fontFamily: "Avenir"
    },
    textStyle: {
        fontSize: 15,
        fontFamily: "Avenir"
    }

});

export default CheckoutSubtotal;