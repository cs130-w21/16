import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Card, Rating, Avatar, Icon } from "react-native-elements";
import colors from "../config/colors";
import PropTypes, { any } from "prop-types";

// general design/architecture notes:
// from the landing page, make query to get all of the dishes
// map those results to this card (each dish gets a card) with the columns as props
// pass in all columns for dish into the MenuCard function
// --> for the dish page navigation, pass in the dish's id parameter
// to do another query call for the dish page
//
export default function MenuCard(props) {
  return (
    <View style={styles.container}>
      <Card containerStyle={styles.cardContainer}>
        <TouchableOpacity onPress={props.onPress}>
          <Card.Title>{props.title}</Card.Title>
          <Card.Divider />
          <View style={styles.cardlayout}>
            <View style={styles.horizontal}>
              <Card.Image source={props.image} style={styles.image} />
            </View>
            <View style={styles.horizontal}>
              <Text style={styles.desc}>{props.description}</Text>
              <Text style={styles.price}>{props.price}</Text>
              <Rating
                readonly={true}
                imageSize={13}
                fractions={1}
                startingValue={props.rating ? props.rating : 0}
              />
              <View style={styles.card}>
                <Icon name="android" size={12} />
                {/* <Avatar rounded title="Initials" size="small" /> */}
                <Text style={styles.text}>{props.subtitle}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Card>
    </View>
  );
}

MenuCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: any,
  rating: PropTypes.number,
  subtitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.string,
  onPress: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    minWidth: "100%"
  },
  cardContainer: {
    alignItems: "flex-end",
    alignContent: "stretch",
    maxHeight: "40%"
  },
  text: {
    paddingVertical: 4,
    textAlign: "center",
    color: colors.secondary,
    fontWeight: "bold"
  },
  desc: {
    fontSize: 12
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  price: {
    fontSize: 10,
    alignSelf: "center",
    paddingVertical: 4,
    color: colors.black,
    fontWeight: "bold"
  },
  horizontal: {
    width: "50%",
    justifyContent: "space-around",
    padding: 8,
    alignItems: "stretch"
  },
  cardlayout: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row"
  }
});
