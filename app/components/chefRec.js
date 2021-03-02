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
  function onPressChef() {
    if(props.item == null) {return;}
    props.navigation.push("Chef", {
      Chef: props.item
    })
  }

    return (
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            <TouchableOpacity style={styles.button} onPress={onPressChef}>
              <Card.Title><Text style={styles.title}>{props.item.name}</Text></Card.Title>
              <Card.Divider />
              <View style={styles.imageView}>
                <Card.Image source={{uri: props.item.profilePicURL}} style={styles.image} />
              </View>
              <Text numberOfLines={3} style={styles.bio}>{props.item.shortDesc}</Text>
              <View style={styles.footer}>
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
        </View>
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
    container: {
      width: "20%"
    },
    cardContainer: {
      alignContent: "stretch",
      height: 255
    },
    imageView: {
      paddingBottom: 10,
      paddingTop: 0,
      alignItems: "center"
    },
    image: {
      height: 90,
      width: 90,
      borderRadius: 45
    },
    bio: {
      padding: 8,
      textAlign: "center",
      fontSize: 12,
      fontFamily: "Avenir",
    },
    cuisine: {
      fontSize: 11,
      fontFamily: 'Avenir',
      paddingBottom: 8,
      paddingStart: 0,
      color: colors.secondary,
      fontWeight: "bold"
    },
    rating: {
    },
    title: {
      fontWeight: "bold",
      fontSize: 16
    },
    footer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0
    },
    button: {
      height: "100%"
    },
  });
