import React, {Component, useCallback, useEffect, useState} from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import {
    Card,
    Image,
    Button,
    Rating,
    Avatar,
    Icon
} from "react-native-elements";
import colors from "../config/colors";
import {getChefs} from '../util/Queries'
import PropTypes, { any } from "prop-types"
import { FlatList } from "react-native";
import ChefRec from "./chefRec"
import Chef from "../objects/Chef";

/*  
* The idea is to have a list containint three recommendations
* every now an then within the Featured Menu
*/

function chefRecCard(item, navigation) {
    return <ChefRec key={item.chefid} item={item} navigation={navigation} />
}

class Cards extends Component{
    constructor(props){
        super(props);
    }
    render(){
        if(this.props.chefs == null){
            return <Text>LOADING</Text>;
        } else {
            var arr = [];
            for(i=0; i<this.props.chefs.length; i++){
                var chef = new Chef(this.props.chefs[i]);
                arr.push(chefRecCard(chef, this.props.navigation));
            }
            return arr;
        }
    }
}

/**
 * 
 * @typedef ChefRecListProps
 * @memberof ChefRecList 
 * @property {Object} navigation - Stack Navigation object
 */

/**
 * A component that displays all the chefs in a horizontal list.
 * @class ChefRecList
 * @param {ChefRecListProps} props 
 */

export default function ChefRecList(props) {
    const [chefs, setChefs] = useState(null);

    useEffect(() => {
        getChefs().then(function(results) {
            setChefs(results);
        }, ()=>{console.log("Error in useEffect getChefs")})
        .catch((err) => {console.log("Use Effect Err Chefs: ", err)});
    }, [])
    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Cards chefs={chefs} navigation={props.navigation} />
        </ScrollView>
    )
}
ChefRecList.propTypes = {
    data: any,
    navigation: any
}