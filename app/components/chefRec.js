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
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            <TouchableOpacity onPress={props.item.onPress}>
                    <Card.Title>{props.item.name}</Card.Title>
                    <Card.Divider />
                    <View style={styles.horizontal}>
                        <Card.Image source={{uri: props.item.image}} style={styles.image} />
                        <Text style={styles.bio}>{props.item.bio}</Text>
                        <Rating
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
      minWidth: "50%",
      minHeight: "100%"
    },
    cardContainer: {
      alignItems: "center",
      alignContent: "center",
      maxHeight: "100%"
    },
    image: {
      maxHeight: "60%",
      alignSelf: "center"
    },
    bio: {
      fontSize: 10,
      flexDirection: "column",
      alignSelf: "center",
      flexGrow: 2
    },
    cardlayout: {
      flex: 1,
      flexWrap: "wrap",
      flexDirection: "row"
    },
    horizontal: {
      width: "100%",
      justifyContent: "space-around",
      padding: 0,
      alignItems: "stretch"
    }
  });
