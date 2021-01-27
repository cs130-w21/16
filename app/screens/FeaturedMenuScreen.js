import React from 'react';
import { View } from 'react-native';
import {Image, SafeAreaView, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { Header } from 'react-native-elements';

import colors from '../config/colors';

function FeaturedMenuScreen(props) {
    return(
        <SafeAreaProvider style={styles.container}>
            <Header
                containerStyle={{backgroundColor: colors.primary}}
                leftComponent={{icon:'search', color:'white', onPress: ()=> {console.log("Search Pressed")}}}
                centerComponent={{ text: 'POTLUCK', style:{ color: '#fff', fontFamily:'Avenir', fontWeight:'bold', fontSize:20} }}
                rightComponent={{ icon: 'map', color: '#fff', onPress: ()=> {console.log("Map Pressed")}}}
                barStyle="light-content"
            />
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
    }
});

export default FeaturedMenuScreen;