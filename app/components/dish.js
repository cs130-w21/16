import React, { useEffect, useState} from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { Card, Rating, Avatar, Icon } from "react-native-elements";
import colors from "../config/colors";
import PropTypes, { any } from "prop-types";
import minRemainingToString from "../util/TimeConversion";
import {getChefInfo} from "../util/Queries";

// general design/architecture notes:
// from the landing page, make query to get all of the dishes
// map those results to this card (each dish gets a card) with the columns as props
// pass in all columns for dish into the MenuCard function
// --> for the dish page navigation, pass in the dish's id parameter
// to do another query call for the dish page
//

export default function MenuCard(props) {
  const [chefinfo, setChefInfo] = useState(null);
  
  useEffect(()=>{
    getChefInfo(props.json.chefid).then(function(results) {
      setChefInfo(results);
    }, () => {console.log("Error")})
    .catch((err) => {console.log("Use Effect Error: ", err)});
  }, [])

  function onPress(){
    const carouselData = [{image: {uri: props.json.primaryImage}}];
    props.json.secondImage != null ? carouselData.push({image: {uri: props.json.secondImage}}) : {};
    props.json.thirdImage != null ? carouselData.push({image: {uri: props.json.thirdImage}}) : {};
    props.json.fourthImage != null ? carouselData.push({image: {uri: props.json.fourthImage}}) : {};
    props.navigation.push("DishPage", {
        carouselData: carouselData,
        name: props.title,
        price: props.price,
        time: minRemainingToString(props.json.timeMin), 
        description: props.json.description,
        ingredients: props.json.shortDesc,
        chefid: props.json.chefid
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
                <Image source={{uri: chefinfo!=null ? chefinfo[0].profilePic : "https://reactnative.dev/img/header_logo.svg"}} style={styles.icon}/>
                <Text style={styles.text}>{chefinfo!=null ? chefinfo[0].name : "Loading"}</Text>
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
  },
  icon: {
    width: 25,
    height: 25,
    borderRadius: 12.5
  }
});
