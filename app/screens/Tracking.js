import React, { Component, useCallback, useEffect, useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { StyleSheet } from "react-native";
import { Card, Button } from "react-native-elements";
import CheckoutSubtotal from "../components/checkoutSubtotal";
import colors from "../config/colors";
import * as Progress from 'react-native-progress';
import { Icon } from 'react-native-elements';

const ICON_SIZE = 200;

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
async function changeProgress(progress, setProgress){
    for(let i = 0; i <= 1; i += 0.25){
        await sleep(2000)
        setProgress(i);
    }
}
function icon(progress){
    if(progress == 0){
        return(
            <View>
                <Text style={styles.title}>Order Received</Text>
                <Icon name='check-circle' type='font-awesome' size={ICON_SIZE} style={styles.icon}/>
            </View>
        )
    } else if (progress == 0.25) {
        return(
            <View>
                <Text style={styles.title}>Chef Beginning Preperation</Text>
                <Icon name='carrot' type='font-awesome-5' size={ICON_SIZE} style={styles.icon}/>
            </View>
        )
    } else if (progress == 0.50) {
        return(
            <View>
                <Text style={styles.title}>Chef Done Cooking</Text>
                <Icon name='hotdog' type='font-awesome-5' size={ICON_SIZE} style={styles.icon}/>
            </View>
        )
    } else if (progress == 0.75) {
        return(
            <View>
                <Text style={styles.title}>Pickup Ready</Text>
                <Icon name='car' type='font-awesome-5' size={ICON_SIZE} style={styles.icon}/>
            </View>
        )
    } else if (progress == 1.00) {
        return(
            <View>
                <Text style={styles.title}>Done</Text>
                <Icon name='glass-cheers' type='font-awesome-5' size={ICON_SIZE} style={styles.icon}/>
            </View>
        )
    }
}

function Tracking(props) {
    const navigation = props.navigation;
    const [progress, setProgress] = React.useState(0.0);
    if(progress == 0){
        changeProgress(progress, setProgress);
    }
    return (
    <SafeAreaView style={styles.container}>
        <View style={styles.trackingContainer}>
            {icon(progress)}
            <Progress.Bar progress={progress} color={colors.secondary} width={300} style={styles.progress} />
            <CheckoutSubtotal></CheckoutSubtotal>
        </View>
        <View style={styles.paymentTab}>
            <Button
              type="solid"
              title="Done"
              titleStyle={styles.doneText}
              buttonStyle={styles.doneButton}
              onPress={() => {
                // Do a thing
                navigation.navigate("FeaturedMenuScreen")
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
    trackingContainer: {
        height: '100%',
        width: '100%',
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
    doneText: {
      fontWeight: "bold",
      fontFamily: "Avenir"
    },
    title: {
        alignSelf: 'center',
        fontWeight: "bold",
        fontFamily: 'Avenir',
        fontSize: 25,
    },
    icon: {
        padding: 40
    },
    doneButton: {
        borderRadius: 20,
        backgroundColor: colors.secondary,
    },
    progress: {
        alignSelf: 'center'
    }
});

export default Tracking;