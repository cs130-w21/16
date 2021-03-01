import React, {useState, useEffect} from 'react';
import {Dimensions, Image, Modal, ScrollView, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {Button, Icon, Divider, Rating} from 'react-native-elements'
import Carousel, {Pagination} from 'react-native-snap-carousel';
import colors from '../config/colors';
import MapView, { Marker, Polyline } from 'react-native-maps';
import coordDist from '../util/CoordDist';
import MenuCard from '../components/dish';

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
    let location=JSON.parse(Chef.location);
    location['latitudeDelta'] = 0.007;
    location['longitudeDelta'] = 0.007;

    const [carouselData, setCarouselData] = useState([]);
    const [index, setIndex] = React.useState(0);
    const [dishIndex, setDishIndex] = React.useState(0);
    const isCarousel = React.useRef(null);
    const [dishPageVisible, setDishPageVisible] = useState(false);
    const [dishPageFocus, setDishPageFocus] = useState(null);
    const [first5Reviews, setFirst5Reviews] = useState(null);
    const [userLocation, setLocation] = useState(null);


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
        }, ()=>{console.log("Error")})
        .catch((err) => {console.log("Use Effect Err Chef's Dishes: ", err)});

        getNChefReviews(id, 5).then(function(results) {
            setFirst5Reviews(results);
        }, () => {console.log("Error in useEffect getNChefReviews")})
        .catch((err) => {console.log("use Effect Err Get N Chef Reviews: ", err)});
        
        navigator.geolocation.getCurrentPosition((pos) => {
            setLocation(pos);
        }, (err) => {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }, {
            enableHighAccuracy: true, timeout: 5000, maximumAge: 0
        });
    }, [])

    function hideModal(){
        setDishPageVisible(false);
    }
    
    function onPress(dish){
        setDishPageVisible(true);
        setDishPageFocus(dish);
    }

    const CarouselDishItem = ({ item, index }) => {
        return (
            <MenuCard
              key={item.dishid}
              Dish={item}
              navigation={props.navigation}
            />
        )
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
                    <Text style={styles.dishesTitle}>Chef's Menu:</Text>
                    <Carousel
                        layout='default'
                        data={Chef.dishes}
                        useScrollView={true}
                        renderItem={CarouselDishItem}
                        sliderWidth={SLIDER_WIDTH}
                        sliderHeight={Math.round(ITEM_WIDTH*(3.0/4.0))}
                        itemWidth={ITEM_WIDTH}
                        itemHeight={Math.round(ITEM_WIDTH*(3.0/4.0))}
                        onSnapToItem={(i) => setDishIndex(i)}
                        useScrollView={true}
                        ref={isCarousel}
                        style={{paddingBottom: '5%'}}
                    />
                    <Pagination
                        dotsLength={Chef.dishes.length}
                        activeDotIndex={dishIndex}
                        carouselRef={isCarousel}
                        dotStyle={styles.dotStyle}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                        tappableDots={true}
                        containerStyle={styles.dots}
                    />
                    <View style={styles.spacer}/>
                    <MapView style={styles.map}
                        initialRegion={location}
                        showsUserLocation={true}
                    >
                        {userLocation && <Polyline
                            coordinates={[
                                {latitude: location.latitude, longitude: location.longitude},
                                {latitude: userLocation.coords.latitude, longitude: userLocation.coords.longitude}
                            ]}
                            strokeColor={colors.primary}
                            strokeWidth={6}
                        />}
                        <Marker
                            coordinate={{latitude: location.latitude, longitude: location.longitude}}
                        />
                    </MapView>
                    {userLocation && <Text style={styles.distanceText}>
                            {coordDist(location.latitude, location.longitude, userLocation.coords.latitude, userLocation.coords.longitude).toFixed(2)} miles away
                    </Text>}
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
    dishesTitle: {
        fontSize: 24,
        fontFamily: 'Avenir',
        fontWeight: 'bold',
        color: 'black',
        alignSelf: 'center',
        marginTop: '5%'
    },
    dots: {
        alignSelf: 'center',
        margin: '-3%'
    },
    dotStyle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        margin: 0,
        backgroundColor: colors.black,
    },
    map: {
        width: '90%',
        height: 250,
        borderRadius: 10,
        margin: '5%'
    },
    distanceText: {
        fontSize: 15,
        marginLeft: '5%',
        marginBottom: '5%',
        color: "#333",
        fontFamily: "Avenir",
        fontWeight: 'bold'
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