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
  console.log(props)
    return (
        // <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            <TouchableOpacity onPress={props.item.onPress}>
                    <Card.Title>{props.item.name}</Card.Title>
                    <Card.Divider />
                    <View style={styles.horizontal}>
                        <Card.Image source={{uri: props.item.image}} style={styles.image} />
                    </View>
                    <View style={styles.horizontal}>
                        <Text numberOfLines={2} style={styles.bio}>{props.item.bio}</Text>
                        <Rating
                            readonly={true}
                            imageSize={13}
                            fractions={1}
                            startingValue={props.item.rating ? props.item.rating : 0}
                        />
                        
                    </View>
              </TouchableOpacity>
            </Card>
        // </View>
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
      maxWidth: "50%",
      minHeight: "100%"
    },
    cardContainer: {
      alignItems: "center",
      alignContent: "center",
      maxHeight: "100%",
      maxWidth: "100%",
      width: 150,
      flex: 1
    },
    image: {
      maxHeight: "60%",
      alignContent: "stretch"
    },
    bio: {
      fontSize: 12,
      flexWrap: "wrap",
      flexDirection: "column",
      alignSelf: "center",
    },
    horizontal: {
      width: 120,
      padding: 2,
      alignItems: "stretch"
    }
  });
