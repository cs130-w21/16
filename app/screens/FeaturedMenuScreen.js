import React, {Component, useCallback, useEffect, useState} from 'react';
import { ScrollView, Text, View,TouchableHighlight, RefreshControl, Button } from 'react-native';
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

/**


/**
 * A dish card component that displays information about a dish
 * @class dishCard
 * @param {Dish} content
 * @property {Object} navigation - Stack Navigation object
 */
function dishCard(content, navigation){
    return <MenuCard
                key={content.dishid}
                Dish={content}
                navigation={navigation}/>
}


/**
 * 
 * @typedef CardsProps
 * @memberof Cards
 * @property {Object} navigation - Stack Navigation object
 * @property {Array<Dish>} dishes - Array of all dishes in the database
 */

/**
 * Component that displays a dish card for each dish in the database
 * @class Cards
 * @param {CardsProps} props
 */

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

/**
 * 
 * @typedef FeaturedMenuScreenProps
 * @memberof FeaturedMenuScreen
 * @property {Object} navigation - Stack Navigation object
 */

/**
 * Main page component of the app that shows availible dishes along with chefs, with options to filter results
 * @class FeaturedMenuScreen
 * @param {FeaturedMenuScreenProps} props
 */

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
    let categories = ['American','Asian','Baked Goods', 'Chinese','Dessert','Fast Food','Indian','Italian','Japanese','Korean','Mediterranean','Mexican','Thai','Vietnamese']
    let initial = []
    for (let i=0;i<categories.length;i++)
    {
        initial.push(false)
    }
    const [categoriesArr,setCategoriesArr]=useState(initial)
    const [categoriesSet,setCategoriesSet]=useState(new Set())

    useEffect(() => {
        getAvailableDishes().then(function(results) {
            var dishObjects = [];
            results.forEach((dish) => {
                let categories = dish.category
                let categoriesArr = categories.split(',')
                let selected=false
                if (categoriesSet.size>0)
                {
                    for (let i=0;i<categoriesArr.length;i++)
                    {
                        if (categoriesSet.has(categoriesArr[i]))
                        {
                            selected = true
                            break
                        }
                    }
                    if (!selected)
                        return;
                }

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
                let categories = dish.category
                let categoriesArr = categories.split(',')
                let selected=false
                
                if (categoriesSet.size>0)
                {
                    for (let i=0;i<categoriesArr.length;i++)
                    {
                        if (categoriesSet.has(categoriesArr[i]))
                        {
                            selected = true
                            break
                        }
                    }
                    if (!selected)
                        return;
                }
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
            <Modal animationType="slide" transparent={true} visible={modalVisible}>
                <View style={styles.modalContainer}>
                <FilterPage  categoriesSet={categoriesSet} setCategoriesSet={setCategoriesSet} categoriesArr={categoriesArr} setCategoriesArr={setCategoriesArr} ratingFilter = {ratingFilter} setRatingFilter = {setRatingFilter} timeFilter = {timeFilter} setTimeFilter = {setTimeFilter} priceFilter = {priceFilter} setPriceFilter = {setPriceFilter} update={onRefresh} closeModal= {setModalVisible} prices={priceRange} time={timeRange}  setPrices = {setPriceRange} setTime = {setTimeRange} />
                </View>
            </Modal>
            
            <ScrollView style={styles.ScrollView} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                <TouchableHighlight onPress={changeVisible}>
                <View style={styles.button}>
                    <Text style={styles.text}>Filter</Text>
                </View>
                </TouchableHighlight>
                <ChefRecList data={chefs} navigation={props.navigation}/>
                <Cards dishes={dishes} chefs={chefs} navigation={props.navigation}/>
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
    modalContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: "22.5%",
        marginLeft: '2.5%',
        marginRight: '2.5%',
        marginBottom: '4%',
        shadowColor: 'black',
        shadowOffset: {width: 5, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5
    },
    button: {
        alignItems: "center",
        backgroundColor: '#dadada',
        padding: 10
      },
    text: {
        alignItems: "center",
        fontSize: 15,
        color: 'grey',
        fontWeight: 'bold',
        fontFamily:'Avenir'
    }
});

export default FeaturedMenuScreen;
