<<<<<<< HEAD
import React, {Component, useCallback, useEffect, useState} from 'react';
=======
import React, {Component, useEffect} from 'react';
>>>>>>> dev
import { ScrollView, Text, View, RefreshControl } from 'react-native';
import {StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';


import colors from '../config/colors';
import NavBarComponent from '../components/NavBarComponent';
import MenuCard from '../components/dish';

function dishCard(content, navigation){
    return <MenuCard
<<<<<<< HEAD
                key={content.dishid}
=======
>>>>>>> dev
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

<<<<<<< HEAD
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

=======
class FeaturedMenuScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            dishes: null,
            refreshing: false,
            test: "false"
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
    }

    componentDidMount(){
        let ref = this;
        this.getDishes().then(function(results) {
            ref.setState({test: "true"});
            ref.setState({dishes: results});
        }, ()=>{console.log("Error")})
        .catch((err) => {console.log("Component Did Mount Err: ", err)});

   }

    async getDishes() {
        const response = await fetch('http://3.141.20.190:8888/AllDishes');
        const dishes = await response.json();
        return dishes;
    }

    async onRefresh(){
        var ref = this;
        this.setState({refreshing: true});
        this.getDishes().then(function(results) {
            if(results!=null){
                //console.log(results);
                ref.setState({dishes: results});
            }
        })
        .catch(() => {console.log("Refresh Err")});
        this.setState({refreshing: false});
    }


    wait(timeout){
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    render(){
        return(
            <SafeAreaProvider style={styles.container}>
                <NavBarComponent navigation={this.props.navigation}/>
                <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh}/>}>
                    <Cards dishes={this.state.dishes} navigation={this.props.navigation}/>
                </ScrollView>
            </SafeAreaProvider>
        );
    }
    
}


>>>>>>> dev
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
    }
});

export default FeaturedMenuScreen;