import React, {Component} from 'react';
import { ScrollView, Text, View, RefreshControl } from 'react-native';
import {Image, SafeAreaView, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { Header, Icon} from 'react-native-elements';

import {IconToggle} from 'react-native-material-ui';

import colors from '../config/colors';
import NavBarComponent from '../components/NavBarComponent';
import MenuCard from '../components/dish';
import { useLinkProps } from '@react-navigation/native';

import * as SQLite from 'expo-sqlite';

function getChefs(){
    const db = SQLite.openDatabase('../../backend/sqlite.db');
    db.exec([{ sql: 'SELECT * FROM Chef', args: [] }], false, () => console.log('Queried'));
}

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

function FeaturedMenuScreen(props) {
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);
    return(
        <SafeAreaProvider style={styles.container}>
            <NavBarComponent navigation={props.navigation}/>
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                <MenuCard
                    title={"Spaghetti"}
                    chefname={"Chef Remy"}
                    image={require("../assets/potluck_logo_small.jpg")}
                    short_description={"Classic spaghetti recipe with marinara sauce!"}
                    rating={4.5}
                    price={10.11}
                    navigation = {props.navigation}
                />
                <MenuCard
                    title={"Spaghetti"}
                    chefname={"Chef Remy"}
                    image={require("../assets/potluck_logo_small.jpg")}
                    short_description={"Classic spaghetti recipe with marinara sauce!"}
                    rating={4.5}
                    price={10.11}
                    navigation = {props.navigation}
                />
                <MenuCard
                    title={"Spaghetti"}
                    chefname={"Chef Remy"}
                    image={require("../assets/potluck_logo_small.jpg")}
                    description={"Classic spaghetti recipe with marinara sauce!"}
                    rating={4.5}
                    price={10.11}
                    navigation = {props.navigation}
                />
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