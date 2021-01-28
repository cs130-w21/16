import React, {Component} from 'react';
import { ScrollView, Text, View, RefreshControl } from 'react-native';
import {Image, SafeAreaView, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { Header, Icon} from 'react-native-elements';

import {IconToggle} from 'react-native-material-ui';

import colors from '../config/colors';
import NavBarComponent from '../components/NavBarComponent';

class RightElement extends Component{
    render(){
        return(
            <Icon name='filter-alt' color='white' onPress={() => {console.log("MAP")}}/>
        );
    }
}

class LeftElement extends Component{
    render(){
        const {navigation} = this.props;
        return(
            <Icon 
                name='search' 
                color='white' 
                onPress={() => {
                    console.log("SEARCH");
                    navigation.navigate('Search')
                }}/>
        );
    }
}

class CenterElement extends Component{
    render() {
        return(
            <Text style={styles.title}>POTLUCK</Text>
        );
    }
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
            <Header
                containerStyle={{backgroundColor: colors.primary}}
                leftComponent={<LeftElement navigation={props.navigation}/>}//{icon:'search', color:'white', onPress: ()=> {console.log("Search Pressed")}}}
                centerComponent={<CenterElement/>} //{ text: 'POTLUCK', style:{ color: '#fff', fontFamily:'Avenir', fontWeight:'bold', fontSize:20} }}
                rightComponent={<RightElement/>}//{ icon: 'map', color: '#fff', onPress: ()=> {console.log("Map Pressed")}}}
                barStyle="light-content"
            />
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                <Text style={{fontSize:1000}}>Hello</Text>
            </ScrollView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
    },
    title: {
        color: '#fff', fontFamily:'Avenir', fontWeight:'bold', fontSize:20
    },
});

export default FeaturedMenuScreen;