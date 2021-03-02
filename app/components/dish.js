import React, { useEffect, useState} from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { Card, Rating, Avatar, Icon } from "react-native-elements";
import colors from "../config/colors";
import PropTypes, { any } from "prop-types";
import {minRemainingToString} from "../util/TimeConversion";
import {getChefInfo} from "../util/Queries";
import Chef from "../objects/Chef";
import Dish from "../objects/Dish";
import DishPage from "../screens/DishPage";

// general design/architecture notes:
// from the landing page, make query to get all of the dishes
// map those results to this card (each dish gets a card) with the columns as props
// pass in all columns for dish into the MenuCard function
// --> for the dish page navigation, pass in the dish's id parameter
// to do another query call for the dish page
//

export default function MenuCard(props) {
  const [ChefObject, setChefObject] = useState(null);
  const [dishPageVisible, setDishPageVisible] = useState(false);
  
  useEffect(()=>{
    getChefInfo(props.Dish.chefid).then(function(results) {
      var chef = new Chef(results[0]);
      props.Dish.setChef(chef);
      setChefObject(chef);
    }, () => {console.log("Error")})
    .catch((err) => {console.log("Use Effect Error: ", err)});
  }, [props.Dish]);

  function onPress(){
    setDishPageVisible(true);
  }

  function hideModal(){
    setDishPageVisible(false);
  }

  function onPressChef(){
    if(props.Dish.Chef == null) {return;}
    props.navigation.push("Chef", {
      Chef: props.Dish.Chef
    })
  }
  return (
    <View style={styles.container}>
      <Card containerStyle={styles.cardContainer}>
        <TouchableOpacity onPress={onPress}>
          <Card.Title><Text style={styles.title}>{props.Dish.name}</Text></Card.Title>
          <Card.Divider />
          <View style={styles.cardlayout}>
            <View style={styles.horizontal}>
              <Card.Image source={{uri: props.Dish.primaryImageURL}} style={styles.image} />
            </View>
            <View style={styles.horizontal}>
              <Text style={styles.desc}>{props.Dish.shortDesc}</Text>
              <Text style={styles.price}>${props.Dish.price}</Text>
              <View style={styles.ratingsContainer}>
                <Rating
                  style={styles.rating}
                  readonly={true}
                  imageSize={13}
                  fractions={1}
                  startingValue={props.Dish.rating ? props.Dish.rating : 0.0}
                />
                <Text style={styles.numReviews}>({props.Dish.numReviews})</Text>
              </View>
              {!props.inChefMenu &&
              <TouchableOpacity onPress={onPressChef}>
              <View style={styles.card}>
                <Image source={{uri: props.Dish.Chef!=null ? props.Dish.Chef.profilePicURL : "https://reactnative.dev/img/header_logo.svg"}} style={styles.icon}/>
                <Text style={styles.text}>{props.Dish.Chef!=null ? props.Dish.Chef.name : "Loading"}</Text>
              </View>
              </TouchableOpacity>}
            </View>
          </View>
        </TouchableOpacity>
      </Card>
      <View style={styles.centeredContent}>
        {props.Dish!=null && dishPageVisible && <DishPage Dish={props.Dish} visible={dishPageVisible} hideModal={hideModal} navigation={props.navigation}/>}
      </View>
      
    </View>
  );
}

MenuCard.propTypes = {
  Dish: any.isRequired,
  navigation: any,
  inChefMenu: any
};

const styles = StyleSheet.create({
  centeredContent: {
    flex:1,
    justifyContent:'center',
    alignItems: 'center'
  },
  container: {
    width: "100%"
  },
  cardContainer: {
    alignItems: "flex-end",
    alignContent: "stretch",
    height: 225
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16
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
  },
  ratingsContainer: {
    width: '100%',
    flexDirection: "row",
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  numReviews: {
    marginLeft: 5,
    fontSize: 12,
    color: 'grey',
    left: 45
  },
  rating: {
    position: 'absolute'
  }
});
