import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import {
    Card,
  Icon,
    Rating
} from "react-native-elements";
import colors from "../config/colors";
import PropTypes, { any } from "prop-types"

/*  
* This is the single recommendation for a chef
*/

export default function ChefRec(props) {
  console.log(props)
    return (
        <Card containerStyle={styles.cardContainer}>
          <TouchableOpacity style={styles.button} onPress={props.item.onPress}>
            <View containerStyle={styles.title}>
                <Card.Title>{props.item.name}</Card.Title>
                <Text numberOfLines={1} style={styles.cuisine}>{props.item.cuisine}</Text>
                {/* <Card.Divider /> */}
                <Card.Image source={{uri: props.item.image}} style={styles.image} />
            </View>
            <Text numberOfLines={2} style={styles.bio}>{props.item.bio}</Text>
            {/* <Text numberOfLines={1} style={styles.cuisine}>{props.item.cuisine}</Text> */}
            <View containerStyle={styles.footer}>
                <View style={styles.location}>
                  <Icon name="location-pin" size={11} />
                  <Text style={styles.text}>{props.item.location}</Text>
                </View>
                <Card.Divider />
                <Rating
                    style={styles.rating}
                    readonly={true}
                    imageSize={13}
                    fractions={1}
                    startingValue={props.item.rating ? props.item.rating : 0}
                />
            </View>                  
            </TouchableOpacity>
        </Card>
    )
}

ChefRec.PropTypes = {
    item: {
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      image: any,
      rating: PropTypes.number,
      bio: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      cuisine: PropTypes.string.isRequired,
      onPress: PropTypes.func
    }
}

const styles = StyleSheet.create({
    cardContainer: {
      flexDirection: "column",
      flex: 1,
      alignItems: "center",
      alignContent: "center",
      height: 250,
      width: 130
    },
    image: {
      alignSelf: "center",
      alignItems: "center",
      alignContent: "center",
      height: 50,
      width: 100
    },
    bio: {
      fontSize: 12,
      padding: 10,
      flexWrap: "wrap",
      flexShrink: 1,
      flexDirection: "column",
      alignSelf: "center",
    },
    cuisine: {
      fontSize: 11,
      paddingBottom: 8,
      paddingStart: 0,
      textAlign: "center",
      color: colors.secondary,
      fontWeight: "bold"
    },
    text: {
      fontSize: 10,
      padding: 10,
      flexWrap: "wrap",
      flexShrink: 1,
      flexDirection: "column",
      alignSelf: "center",
    },
    horizontal: {
      width: "100%",
      justifyContent: "space-around",
      alignItems: "stretch",
      alignSelf: "center"
    },
    rating: {
      position: "absolute",
      alignSelf: "center",
      bottom: 0
    },
    title: {
      flexDirection: "column",
      alignContent: "center",
      alignItems: "center",
      justifyContent: "flex-start",
      flex: 1
    },
    footer: {
      flexDirection: "column",
      alignContent: "center",
      alignItems: "center",
      flex: 1,
      justifyContent: "flex-end"
    },
    button: {
      height: 250,
      width: 130,
      alignItems: "center",
      padding: 10,
      flexDirection: "column",
      flex: 1
    },
    location: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly"
    }
  });
