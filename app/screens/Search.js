import React, {Component, useCallback, useEffect, useState} from 'react';
import { ScrollView, Text, View, RefreshControl } from 'react-native';
import {StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import colors from '../config/colors';
import NavBarComponent from '../components/NavBarComponent';
import MenuCard from '../components/dish';
import {getAvailableDishes, getChefs} from '../util/Queries';
import Dish from '../objects/Dish';
import { SearchBar } from 'react-native-elements';
import Fuse from 'fuse.js'

/**
 * 
 * @typedef SearchProps 
 * @param {Object} navigation - Stack Navigation object
 */

/**
 * A page for searching for dishes based on keywords
 * 
 * @param {SearchProps} props
 */

function dishCard(content, navigation){
    return <MenuCard
                key={content.dishid}
                Dish={content}
                navigation={navigation}/>
}

class Cards extends Component{
    constructor(props){
        super(props);
    }
    render(){
        if(this.props.dishes == null){
            return <Text></Text>;
        } else {
            var arr = [];
            for(i=0; i<this.props.dishes.length; i++){
                arr.push(dishCard(this.props.dishes[i], this.props.navigation));
            }
            return arr;
        }
    }
}

function filter(search, searchChange, dishes, setDishes) {
    searchChange(search);
    if(search == ""){
        setDishes(null);
        return;
    }

    const options = {
        keys: ["name", "ingredients", "description"]
    }

    const fuse = new Fuse(dishes, options)
    var fuseOut = fuse.search(search)
    var output = [] 
    fuseOut.forEach((item) => (output.push(item["item"])))
    setDishes(output);
}
function Search(props){
    const [dishes, setDishes] = useState(null);
    const [showDishes, setShownDishes] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [chefs, setChefs] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getAvailableDishes().then(function(results) {
            var dishObjects = [];
            results.forEach((dish) => {
                dishObjects.push(new Dish(dish));
            })
            setDishes(dishObjects);
        }, ()=>{console.log("Error in useEffect getAvailableDishes")})
        .catch((err) => {console.log("Use Effect Err Dishes: ", err)});

        getChefs().then(function(results) {
            setChefs(results);
        }, ()=>{console.log("Error in useEffect getChefs")})
        .catch((err) => {console.log("Use Effect Err Chefs: ", err)});
    }, [])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getAvailableDishes().then(function(results) {
            var dishObjects = [];
            results.forEach((dish) => {
                dishObjects.push(new Dish(dish));
            })
            setDishes(dishObjects);
        }, ()=>{console.log("Error in onRefresh getAvailableDishes")})
        .catch((err) => {console.log("Refresh Err Dishes: ", err)});
        setRefreshing(false);
    });

    return(
        <SafeAreaProvider style={styles.container}>
            <NavBarComponent search="true" navigation={props.navigation}/>
            <SearchBar lightTheme={true} round={true} value={search} onChangeText={(val) => filter(val, setSearch, dishes, setShownDishes)} ></SearchBar>
            <ScrollView style={styles.ScrollView} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                <Cards dishes={showDishes} navigation={props.navigation}/>
            </ScrollView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
    },
    ScrollView: {
        marginBottom: 20
    }
});

export default Search;