import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import {
    Card,
    Rating
} from "react-native-elements";
import colors from "../config/colors";
import PropTypes, { any } from "prop-types"

/*  
* This is the single recommendation for a chef
*/

export default function ChefRec(props) {
    return (
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            <TouchableOpacity onPress={props.onPress}>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Divider />
                    <View style={styles.cardlayout}>
                        <Card.Image source={props.image} style={styles.image} />
                        <Rating
                            readonly={true}
                            imageSize={13}
                            fractions={1}
                            startingValue={props.rating ? props.rating : 0}
                        />
                        <Text style={styles.bio}>{props.bio}</Text>
                    </View>
              </TouchableOpacity>
            </Card>
        </View>
    )
}

ChefRec.PropTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: any,
    rating: PropTypes.number,
    bio: PropTypes.string.isRequired,
    onPress: PropTypes.func
}

const styles = StyleSheet.create({
    container: {
      maxWidth: "100%",
      minHeight: "100%"
      // maxHeight: "30%",
      // justifyContent: "center"
    },
    cardContainer: {
      alignItems: "flex-end",
      alignContent: "stretch",
      maxHeight: "100%"
    },
    image: {
      alignSelf: "center"
    },
    bio: {
      fontSize: 10,
      flexDirection: "column",
      flexGrow: 2
    },
    rating: {},
    avatar: {
      flex: 1,
      flexWrap: "wrap",
      flexDirection: "row"
    },
    card: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly"
    },
    cardlayout: {
      flex: 1,
      flexWrap: "wrap",
      flexDirection: "row"
    }
  });
