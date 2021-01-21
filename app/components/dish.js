import React from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  Card,
  Image,
  Button,
  Rating,
  AirbnbRating
} from "react-native-elements";
import colors from "../config/colors";
import PropTypes, { any } from "prop-types";

//dish props feed in to the card
export default function MenuCard(props) {
  return (
    <View style={styles.container}>
      <Card>
        <Card.Title>{props.title}</Card.Title>
        <Card.Divider />
        <View>
          <Card.Image source={props.image} style={styles.image} />
          <Rating
            style={styles.rating}
            readonly={true}
            imageSize={13}
            fractions={1}
            startingValue={props.rating ? props.rating : 0}
          />
          <Text style={styles.text}>{props.subtitle}</Text>
          <Text style={styles.desc}>{props.description}</Text>
        </View>
      </Card>
    </View>
  );
}

MenuCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: any,
  rating: PropTypes.number,
  subtitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // borderColor: colors.black,
    // borderWidth: 2,
    padding: 4,
    maxWidth: "50%"
    // maxHeight: "30%",
    // justifyContent: "center"
  },
  image: {
    alignSelf: "center"
  },
  text: {
    paddingVertical: 4,
    textAlign: "center",
    color: colors.secondary,
    fontWeight: "bold"
  },
  desc: {
    fontSize: 10
  },
  rating: {}
});
