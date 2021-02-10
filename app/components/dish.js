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
  //console.log(props);
  function onPress(){
    props.navigation.push("DishPage", {
        carouselData: [{image: require('../assets/spaghetti.jpg')}, {image: require('../assets/spaghetti2.jpg')}], //REPLACE WITH ACTUAL IMAGES
        name: props.title,
        price: props.price,
        time: "1 hour", //REPLACE WITH ACTUAL TIME
        description: "Spaghetti is a long, thin, solid, cylindrical noodle pasta. It is a staple food of traditional Italian cuisine. Like other pasta, spaghetti is made of milled wheat and water and sometimes enriched with vitamins and minerals. Italian spaghetti is typically made from durum wheat semolina.",
        ingredients: "flour, tomatoes, basil, parmesan cheese, salt, pepper" //REPLACE WITH ACTUAL INGREDIENTS
    })
  }

  function onPressChef(){
    props.navigation.push("Chef", {
    })
  }

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.cardContainer}>
        <TouchableOpacity onPress={onPress}>
          <Card.Title>{props.json.name}</Card.Title>
          <Card.Divider />
          <View style={styles.cardlayout}>
            <View style={styles.horizontal}>
              <Card.Image source={{uri: props.json.primaryImage}} style={styles.image} />
            </View>
            <View style={styles.horizontal}>
              <Text style={styles.desc}>{props.json.shortDesc}</Text>
              <Text style={styles.price}>${props.json.price}</Text>
              <Rating
                readonly={true}
                imageSize={13}
                fractions={1}
                startingValue={props.json.rating ? props.json.rating : 0.0}
              />
              <TouchableOpacity onPress={onPressChef}>
              <View style={styles.card}>
                <Icon name="android" size={12} />
                {/* <Avatar rounded title="Initials" size="small" /> */}
                <Text style={styles.text}>{props.chefname}</Text>
              </View>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Card>
    </View>
  );
}

MenuCard.propTypes = {
  json: any.isRequired,
  title: PropTypes.string.isRequired,
  image: any,
  rating: PropTypes.number,
  chefname: PropTypes.string.isRequired,
  short_description: PropTypes.string.isRequired,
  price: PropTypes.number,
  onPress: PropTypes.func,
  navigation: any
};

const styles = StyleSheet.create({
  container: {
    width: "100%"
  },
  cardContainer: {
    alignItems: "flex-end",
    alignContent: "stretch",
    height: 225
  },
  text: {
    paddingVertical: 4,
    textAlign: "center",
    color: colors.secondary,
    fontWeight: "bold"
  },
  desc: {
    fontSize: 12,
    textAlign: "center"
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
