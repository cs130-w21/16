import React, {useState, useEffect} from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, Icon, Divider} from 'react-native-elements'
import Carousel from 'react-native-snap-carousel';
import colors from '../config/colors';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';
import MapView, { Marker } from 'react-native-maps';
import MenuCard from '../components/dish';
import coordDist from '../util/CoordDist';

// import * as Location from 'expo-location';
import {getChefsDishes, getCoverPhotos} from "../util/Queries";
import Dish from '../objects/Dish';
import { LogBox } from 'react-native';

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
    let tableHead = ['Dish Name', 'Price', 'Rating'];
    let location=JSON.parse(Chef.location);
    location['latitudeDelta'] = 0.007;
    location['longitudeDelta'] = 0.007;

    const [carouselData, setCarouselData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [index, setIndex] = React.useState(0);
    const isCarousel = React.useRef(null);
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
        
        navigator.geolocation.getCurrentPosition((pos) => {
            setLocation(pos);
        }, (err) => {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }, { 
            enableHighAccuracy: true, timeout: 5000, maximumAge: 0
        });       
    }, []);
    return(
        <View style = {styles.container}>
            <View style={styles.closeButton} >
                <Button onPress={() => props.navigation.goBack()} buttonStyle={styles.closeButtonStyle} icon={<Icon name='close' size={25} color='white' style={{backgroundColor: 'black', borderRadius:15, outline:"white solid 1px"}}/>} />
            </View>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.images}>
                    <View style={styles.image}>
                        <Carousel
                            layout='default'
                            data={carouselData}
                            useScrollView={true}
                            renderItem={CarouselCardItem}
                            sliderWidth={SLIDER_WIDTH}
                            itemWidth={ITEM_WIDTH}
                            onSnapToItem={(index) => setIndex(index)}
                            useScrollView={true}
                            ref={isCarousel}
                        />
                    </View>
                    <View style={styles.chefInfoHolder}>
                        <Text style={styles.titleText}>{name}</Text>
                        <Text style={styles.subtitleText}>{shortDesc}</Text>
                        <Image style={styles.chefPic} source={{uri: profilePic}}/>
                    </View>
                    
                </View>
                <View style={styles.bodyContainer}>
                    <Text style={styles.descriptionText}>{description}</Text>
                    <Divider style={styles.divider} />
                    <Text style={styles.subHeaderText}>Chef's Location</Text>
                    <MapView style={styles.map}
                        initialRegion={location}
                        showsUserLocation={true}
                    >
                        <Marker
                            coordinate={{ latitude : location.latitude , longitude : location.longitude }}
                        />
                    </MapView>
                    {userLocation && 
                    <Text style={styles.distanceText}>
                        You are {coordDist(location.latitude, location.longitude, userLocation.coords.latitude, userLocation.coords.longitude).toFixed(2)} miles away from Chef {name}.
                    </Text>
                    }
                    <Divider style={styles.divider} />
                    <Text style={styles.subHeaderText}>Chef's Menu</Text>
                    <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} styles={styles.menuContainer}>
                        {Chef.dishes.map((content) => <MenuCard key={content.dishid} Dish={content} />)}
                    </ScrollView>
                </View>
            </ScrollView>  
        </View>
        
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollContainer: {
        flex: 1
    },
    menuContainer: {
        flex: 1
    },
    carouselItem: {
        width: '100%',
        height: '100%',
    },
    map: {
        width: '90%',
        height: 250,
        borderRadius: 10,
        margin: '5%'
    },
    distanceText: {
        fontSize: 15,
        marginBottom: '5%',
        color: "#333",
        fontFamily: "Avenir",
    },
    bodyContainer: {
        backgroundColor: colors.background,
        width: Dimensions.get('window').width,
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative'
    },

    images: {
        justifyContent: 'center',
        width: "100%"
    },
    image: {
        height: 250
    },    
    title: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%'
    },
    divider: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: colors.secondary,
        height: 1
    }, 
    closeButton:{
        alignSelf:'flex-end',
        position:'absolute',
        top:40,
        right: 0,
        zIndex:100
    },
    closeButtonStyle: {
        backgroundColor: 'transparent',

    },
    titleText: {
        fontSize: 30,
        marginTop: 50,
        color: "black",
        fontWeight: 'bold',
        fontFamily: "Avenir",
        alignSelf: "center"
    },
    subtitleText: {
        color: "black",
        fontFamily: "Avenir",
        alignSelf: "center",
        marginBottom: 10
    },
    subHeaderText: {
        fontSize: 20,
        marginTop: '5%',
        color: "black",
        fontWeight: 'bold',
        fontFamily: "Avenir",
        alignSelf: "center"
    },
    border: {
        backgroundColor: colors.primary,
        height: 30
    },
    countStyle: {
        fontSize: 20,
        padding: 10,
        color: "white",
        height: 40,
        fontWeight: 'bold',
        fontFamily: "Avenir",
    },

    descriptionText: {
        fontSize: 15,
        margin: '5%',
        color: "#333",
        fontFamily: "Avenir",
    },
    chefPic: {
        position: "absolute",
        width: 150,
        height: 150,
        borderRadius: 70,
        top: -100,
        backgroundColor: colors.primary,
    },
    chefInfoHolder: {
      alignItems: "center",
      width: '100%',
      backgroundColor: colors.primary,
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
      justifyContent: "center"
    }


});

export default ChefScreen;