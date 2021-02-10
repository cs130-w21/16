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

export default function ChefRecList(props) {
    return (
      <FlatList 
            style={{minHeight: "100%"}}
            horizontal={true}
            data={props.data}
            renderItem={ChefRec}
            keyExtractor={(item) => item.id}
        />
    )
}
ChefRecList.propTypes = {
    data: any
}