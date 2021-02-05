import React, {Component, useEffect} from 'react';
import { ScrollView, Text, View, RefreshControl } from 'react-native';
import {StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';


import colors from '../config/colors';
import NavBarComponent from '../components/NavBarComponent';
import MenuCard from '../components/dish';

function dishCard(content, navigation){
    return <MenuCard
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
        /*
        this.getDishes().then(function(results) {
            if(results!=null){
                //this.setState({dishes: results});
                //console.log(results);
                setDishes(true);
                //console.log(this.state.test); 
            }
        }, ()=>{console.log("Then Error")})
        .catch((err) => {console.log("Constructor Err: ", err)});
    */    
   }

    async getDishes() {
        const response = await fetch('http://localhost:3000/AllDishes');
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

// function FeaturedMenuScreen(props) {
//     const [dishes, setDishes] = React.useState(null);
//     const [refreshing, setRefreshing] = React.useState(false);
    
//     useEffect(() =>{
//         getDishes().then(function(results) {
//             setDishes(results);
//         });
//     })
    

//     const onRefresh = React.useCallback(async function(){
//         setRefreshing(true);
//         getDishes().then(function(results) {
//             if(results!=null){
//                 setDishes(results);
//             }
//         })
//         .catch(() => {console.log("Refresh Err")});
//         setRefreshing(false);
//     }, []);

//     /*
//     getDishes().then(function(results) {
//         const objectsEqual = (o1, o2) => 
//             typeof o1 === 'object' && Object.keys(o1).length > 0 
//                 ? Object.keys(o1).length === Object.keys(o2).length 
//                     && Object.keys(o1).every(p => objectsEqual(o1[p], o2[p]))
//                 : o1 === o2;
//         if(dishes != null && !objectsEqual(dishes, results)){
//             console.log("setting state");
//             setDishes(results);
//         }
//     }).catch(() => {console.log("Get Dishes Err")});;
//     */

//     //console.log(dishes);
//     //console.log(dishes);
//     //dishes.forEach((content, index) => {console.log(content.name)})
//     console.log("END EXPERIEMENT");
//     return(
//         <SafeAreaProvider style={styles.container}>
//             <NavBarComponent navigation={props.navigation}/>
//             <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
//                 {dishes!=null ? dishes.map((content) => dishCard(content, props.navigation)):<Text>loading</Text>}
//             </ScrollView>
//         </SafeAreaProvider>
//     );
// }


const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
    }
});

export default FeaturedMenuScreen;