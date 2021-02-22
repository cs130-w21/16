import React, {Component, useCallback, useEffect, useState} from 'react';
import { ScrollView, Text, View, RefreshControl, Button } from 'react-native';
import {StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import colors from '../config/colors';
import NavBarComponent from '../components/NavBarComponent';
import MenuCard from '../components/dish';
import {getAvailableDishes, getChefs} from '../util/Queries';
import ChefRecList from '../components/chefRecList';
import Dish from '../objects/Dish';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import FilterPage from '../components/FilterPage'
import { Modal } from 'react-native';


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
            return <Text>LOADING</Text>;
        } else {
            var arr = [];
            for(i=0; i<this.props.dishes.length; i++){
                arr.push(dishCard(this.props.dishes[i], this.props.navigation));
            }
            return arr;
        }
    }
}

function FeaturedMenuScreen(props){
    const [dishes, setDishes] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [chefs, setChefs] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [priceRange, setPriceRange] = useState([0.00,1000000000000000000.0])
    const [timeRange, setTimeRange] = useState([0,100000000000000.0])
    const [priceFilter,setPriceFilter] = useState([false,false,false])
    const [ratingFilter,setRatingFilter] = useState([false,false,true])
    const [timeFilter,setTimeFilter] = useState([false,false,false,true])

    useEffect(() => {
        getAvailableDishes().then(function(results) {
            var dishObjects = [];
            results.forEach((dish) => {
                console.log(dish)
                if (dish.timeMin > timeRange[1])
                {
                    return;
                }
                if (priceRange[0]==9)
                {
                    if (dish.price<10 || dish.price>=40)
                        dishObjects.push(new Dish(dish));
                }
                else if (dish.price < priceRange[1] && dish.price>=priceRange[0])
                {
                    dishObjects.push(new Dish(dish));
                }
                if (ratingFilter[1])
                {
                    dishObjects.sort((a,b)=> a.rating - b.rating)
                }
                else if (ratingFilter[0])
                {
                    dishObjects.sort((a,b)=> b.rating - a.rating)
                }
                
                
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
                if (dish.timeMin > timeRange[1])
                {
                    return;
                }
                if (priceRange[0]==9)
                {
                    if (dish.price<10 || dish.price>=40)
                        dishObjects.push(new Dish(dish));
                }
                else if (dish.price < priceRange[1] && dish.price>=priceRange[0])
                {
                    dishObjects.push(new Dish(dish));
                }
                if (ratingFilter[1])
                {
                    dishObjects.sort((a,b)=> a.rating - b.rating)
                }
                else if (ratingFilter[0])
                {
                    dishObjects.sort((a,b)=> b.rating - a.rating)
                }
            })
            setDishes(dishObjects);
        }, ()=>{console.log("Error in onRefresh getAvailableDishes")})
        .catch((err) => {console.log("Refresh Err Dishes: ", err)});
        setRefreshing(false);
    });

    function useForceUpdate() {
        const [, setTick] = useState(0);
        const update = useCallback(() => {
          setTick(tick => tick + 1);
        }, [])
        return update;
      }
    
    function changeVisible() {
        
        setModalVisible(true)
        
    }
    function testChange() {
        onRefresh()
    }

    return(
        <SafeAreaProvider style={styles.container}>
            <NavBarComponent navigation={props.navigation}/>
            <View style={styles.buttonStyle}>
                <Button
                    title = "Filter"
                    color = "#ACBD89"
                    onPress = {changeVisible}
                />
            </View>
            <Modal animationType="slide" transparent={false} visible={modalVisible}>
                <FilterPage  ratingFilter = {ratingFilter} setRatingFilter = {setRatingFilter} timeFilter = {timeFilter} setTimeFilter = {setTimeFilter} priceFilter = {priceFilter} setPriceFilter = {setPriceFilter} update={onRefresh} closeModal= {setModalVisible} prices={priceRange} time={timeRange}  setPrices = {setPriceRange} setTime = {setTimeRange} />
            </Modal>
            
            <ScrollView style={styles.ScrollView} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                <Cards dishes={dishes} navigation={props.navigation}/>
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
    },
    buttonStyle: {

    }
});

export default FeaturedMenuScreen;
