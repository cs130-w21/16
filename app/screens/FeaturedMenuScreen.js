import React, {Component, useCallback, useEffect, useState} from 'react';
import { ScrollView, Text, View, RefreshControl } from 'react-native';
import {StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';


import colors from '../config/colors';
import NavBarComponent from '../components/NavBarComponent';
import MenuCard from '../components/dish';

function dishCard(content, navigation){
    return <MenuCard
                key={content.dishid}
                json={content}
                title={content.name}
                chefname={"Insert Chef Name"}
                image={content.primaryImage}
                short_description={content.shortDesc}
                rating={Math.round(content.rating, 2)}
                price={content.price}
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

/*
async function onRefresh(){
    setRefreshing(true);
    getDishes().then(function(results) {
        if(results!=null){
            setDishes(results);
        }
    })
    .catch(() => {console.log("Refresh Err")});
    setRefreshing(false);
}
*/

async function getDishes() {
    const response = await fetch('http://3.141.20.190:8888/AllDishes');
    const dishes = await response.json();
    return dishes;
}

function FeaturedMenuScreen(props){
    const [dishes, setDishes] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        getDishes().then(function(results) {
            setDishes(results);
        }, ()=>{console.log("Error")})
        .catch((err) => {console.log("Use Effect Err: ", err)});
    }, [])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getDishes().then(function(results) {
            if(results!=null){
                setDishes(results);
            }
        })
        .catch(() => {console.log("Refresh Err")});
        setRefreshing(false);
    });

    return(
        <SafeAreaProvider style={styles.container}>
            <NavBarComponent navigation={props.navigation}/>
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                <Cards dishes={dishes} navigation={props.navigation}/>
            </ScrollView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
    }
});

export default FeaturedMenuScreen;