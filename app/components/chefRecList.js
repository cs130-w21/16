import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import {
    Card,
    Image,
    Button,
    Rating,
    Avatar,
    Icon
} from "react-native-elements";
import colors from "../config/colors";
import PropTypes, { any } from "prop-types"
import { FlatList } from "react-native";
import ChefRec from "./chefRec"

/*  
* The idea is to have a list containint three recommendations
* every now an then within the Featured Menu
*/

const DATA = [
  {
    id: "1",
    name: "Chef Remy",
    image: "https://theperceptionalist.files.wordpress.com/2012/03/remy_ratatouille.jpeg",
    rating: 4.5,
    bio: "I'm a rat"
  },
  {
    id: "2",
    name: "Chef Remy",
    image: "https://theperceptionalist.files.wordpress.com/2012/03/remy_ratatouille.jpeg",
    rating: 4.5,
    bio: "I'm a rat"
  },
]

export default function ChefRecList(props) {
    return (
      <FlatList 
            horizontal={true}
            data={DATA}
            renderItem={ChefRec}
            keyExtractor={(item) => item.id}
        />
    )
}
ChefRecList.propTypes = {
    data: any
}