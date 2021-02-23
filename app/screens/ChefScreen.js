import React, {useState, useEffect} from 'react';
import {Dimensions, Image, Modal, ScrollView, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {Button, Icon, Divider, Rating} from 'react-native-elements'
import Carousel, {Pagination} from 'react-native-snap-carousel';
import colors from '../config/colors';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';

import {getChefsDishes, getCoverPhotos, getNChefReviews} from "../util/Queries";
import Dish from '../objects/Dish';
import { LogBox } from 'react-native';
import DishPage from './DishPage';
import Reviews from '../components/Reviews';

const SLIDER_WIDTH = Dimensions.get('window').width
const ITEM_WIDTH = Math.round(SLIDER_WIDTH)

const CarouselCardItem = ({ item, index }) => {
    return (
        <Image
          source={item.image}
          style={styles.carouselItem}
        />
    )
}

function ChefScreen(props) {
    LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);
    const navigation = props.navigation;
    let Chef = props.route.params.Chef;


    let name = Chef.name;
    let description = Chef.bio;
    let id=Chef.chefid;
    let profilePic = Chef.profilePicURL;
    let shortDesc = Chef.shortDesc;
    let rating = Chef.rating;
    let numReviews = Chef.numReviews;
    let tableHead = ['Dish Name', 'Price', 'Rating'];

    const [carouselData, setCarouselData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [index, setIndex] = React.useState(0);
    const isCarousel = React.useRef(null);
    const [dishPageVisible, setDishPageVisible] = useState(false);
    const [dishPageFocus, setDishPageFocus] = useState(null);
    const [first5Reviews, setFirst5Reviews] = useState(null);


    useEffect(() => {
        getCoverPhotos(id).then(function(results) {
            let photos = [];
            results.forEach((x) => {photos.push({image: {uri: x.primaryImage}})});
            setCarouselData(photos);
        }, ()=>{console.log("Error")})
        .catch((err) => {console.log("Use Effect Err Cover Photos: ", err)});

        getChefsDishes(id).then(function(results) {
            let dishes = [];
            results.forEach((dish) => {
                dishes.push(new Dish(dish));
            });
            Chef.setDishes(dishes);
            let td = [];
            Chef.dishes.forEach((dish) => {
                td.push(
                    [<Text style={{color: 'blue', textAlign: 'center'}}
                    onPress={() => {onPress(dish)}}>
                    {dish.name}
                    </Text>,
                    '$'+dish.price,
                    dish.rating.toFixed(2)
                    ]
                );
            });
            setTableData(td);
        }, ()=>{console.log("Error")})
        .catch((err) => {console.log("Use Effect Err Chef's Dishes: ", err)});

        getNChefReviews(id, 5).then(function(results) {
            setFirst5Reviews(results);
        }, () => {console.log("Error in useEffect getNChefReviews")})
        .catch((err) => {console.log("use Effect Err Get N Chef Reviews: ", err)});
        
        
    }, [])

    function hideModal(){
        setDishPageVisible(false);
    }
    
    function onPress(dish){
        setDishPageVisible(true);
        setDishPageFocus(dish);
    }

    return(
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} alwaysBounceHorizontal={false} alwaysBounceVertical={false}>
                <View style={styles.contentView}>
                    <View style={styles.carouselContainer}>
                        <Carousel
                            layout='default'
                            data={carouselData}
                            useScrollView={true}
                            renderItem={CarouselCardItem}
                            sliderWidth={SLIDER_WIDTH}
                            sliderHeight={Math.round(ITEM_WIDTH*(3.0/4.0))}
                            itemWidth={ITEM_WIDTH}
                            itemHeight={Math.round(ITEM_WIDTH*(3.0/4.0))}
                            onSnapToItem={(index) => setIndex(index)}
                            useScrollView={true}
                            ref={isCarousel}
                        />
                        <View style={styles.chefPicHolder}>
                            <Image style={styles.chefPic} source={{uri: profilePic}}/>
                        </View>
                        <View style={styles.titleTextContainer}>
                            <Text style={styles.titleText}>{name}</Text>
                            <Text style={styles.subtitleText}>{shortDesc}</Text>
                        </View>
                    </View>
                    <Divider style={styles.divider}/>
                    <Text style={styles.descriptionText}>{description}</Text>
                    <View style={styles.ratingsContainer}>
                        <Rating
                            style={styles.rating}
                            readonly={true}
                            imageSize={30}
                            fractions={1}
                            startingValue={rating ? rating : 0.0}
                        />
                        <Text style={styles.numReviews}>({numReviews} Reviews)</Text>
                    </View>
                    <View style={styles.spacer}/>
                    <Table style={styles.tableHolder} borderStyle={{borderWidth: 1}}>
                        <Row data={tableHead} flexArr={[3, 2, 2]} style={styles.head} textStyle={styles.text}/>
                        <TableWrapper style={styles.wrapper}>
                            <Rows data={tableData} flexArr={[3,2, 2]} style={styles.row} textStyle={styles.text}/>
                        </TableWrapper>
                    </Table>
                    <View style={styles.spacer}/>
                    {numReviews!=null && <Reviews rating={rating} numReviews={numReviews} chefid={id} reviews={first5Reviews}/>}
                    <View style={styles.spacer}/>
                    <View style={styles.spacer}/>
                </View>
            </ScrollView>
            <View style={styles.closeButton} >
                    <Button onPress={() => props.navigation.goBack()} buttonStyle={styles.closeButtonStyle} icon={<Icon name='close' size={25} color='white' style={{backgroundColor: 'black', borderRadius:15, outline:"white solid 1px"}}/>} />
            </View>
            {dishPageFocus!=null && dishPageVisible && <DishPage Dish={dishPageFocus} visible={dishPageVisible} hideModal={hideModal}/>}
        </View>
            
            
       
        
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        //minWidth: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    contentView:{
        backgroundColor: 'white',
        alignItems: 'flex-start',
        width: '100%',
        minHeight: '100%'
    },
    carouselContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    divider: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: colors.secondary,
        height: 1
    },
    divider2: {
        width: '100%',
        alignSelf: 'center',
        backgroundColor: colors.secondary,
        height: 1
    },
    carouselItem: {
        width: ITEM_WIDTH,
        height: Math.round(ITEM_WIDTH*(3.0/4.0)),
    },
    closeButton:{
        alignSelf:'flex-end',
        position:'absolute',
        top:40,
        right: 0,
    },

    closeButtonStyle: {
        backgroundColor: 'transparent',

    },
    chefPic: {
        width: 150,
        height: 150,
  
        borderRadius: 75
    },
    chefPicHolder: {
        position: "relative",
        top: -75,
        alignItems: "center",
        alignSelf: 'center',
        marginBottom: -75
    },
    titleTextContainer:{
        alignContent: 'flex-start',
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 30,
        padding: 10,
        color: "black",
        fontWeight: 'bold',
        fontFamily: "Avenir",
        maxWidth: '80%',
        alignSelf: 'center'
    },
    subtitleText: {
        color: "black",
        fontFamily: "Avenir",
        alignSelf: "center",
        marginBottom: 10
    },
    ratingsContainer: {
        width: '100%',
        flexDirection: "column",
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
        paddingBottom: 10
    },
    rating: {
        alignSelf: 'center',
    },
    numReviews: {
        marginLeft: 5,
        fontSize: 18,
        color: 'grey',
        fontFamily: 'Avenir',
    },
    descriptionText: {
        fontSize: 20,
        padding: 10,
        color: "gray",
        fontFamily: "Avenir",
    },

    spacer: {
        height: 10,
        backgroundColor: colors.background,
        width: '100%'
    },
    head: {  height: 40,  backgroundColor: '#f1f8ff'},
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: {  height: 28  },
    text: { textAlign: 'center' },
    tableHolder: {
      position: "relative",
      width: "90%",
      left: "5%",
      right:"5%",
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 20
    }
});

export default ChefScreen;