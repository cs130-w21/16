import React, {useState, useEffect} from 'react';
import {Dimensions, Image, Modal, ScrollView, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {Button, Icon, Divider} from 'react-native-elements'
import Carousel, {Pagination} from 'react-native-snap-carousel';
import colors from '../config/colors';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';

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

    const [carouselData, setCarouselData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [index, setIndex] = React.useState(0);
    const isCarousel = React.useRef(null);

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
        
        
    }, [])
    
    function onPress(dish){
        navigation.push("DishPage", {
            Dish: dish
        })
    }

    return(
        <SafeAreaView style = {styles.container}>
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
                    <View style={styles.border}>

                    </View>
                </View>
                <View style={styles.chefPicHolder}>
                    <Image style={styles.chefPic} source={{uri: profilePic}}/>
                </View>
            </View>
            <View style={styles.closeButton} >
                    <Button onPress={() => props.navigation.goBack()} buttonStyle={styles.closeButtonStyle} icon={<Icon name='close' size={25} color='white' style={{backgroundColor: 'black', borderRadius:15, outline:"white solid 1px"}}/>} />
            </View>

            
              
           
            <SafeAreaView style={styles.textContainer}>  
                <Text style={styles.titleText}>{name}</Text>
                <Text style={styles.subtitleText}>{shortDesc}</Text>
                    <Divider style={styles.divider} /> 
                <ScrollView> 
                        <Text style={styles.descriptionText}>{description}</Text>
                        <Divider style={styles.divider} />
                        <Table style={styles.tableHolder} borderStyle={{borderWidth: 1}}>
                            <Row data={tableHead} flexArr={[3, 2, 2]} style={styles.head} textStyle={styles.text}/>
                            <TableWrapper style={styles.wrapper}>
                                <Rows data={tableData} flexArr={[3,2, 2]} style={styles.row} textStyle={styles.text}/>
                            </TableWrapper>
                        </Table>   
                </ScrollView>   
            </SafeAreaView>
        </SafeAreaView>
        
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        minWidth: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column'
    },

    holder: {
        height: 100
    },

    carouselItem: {
        width: '100%',
        height: '100%',
    },

    dots: {
        position: 'absolute',
        alignSelf: 'center',
        top: 263,
    },

    dotStyle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 0,
        backgroundColor: colors.black
    },


    
  
  

    textContainer: {
        flex: 5,
        backgroundColor: "white",
        width: '100%',
        alignItems: 'center',
        textAlign: 'center'
    },

    images: {
        flex: 4,
        justifyContent: 'center',
        width: "100%",
        height: "40%",

        
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
    },

    closeButtonStyle: {
        backgroundColor: 'transparent',

    },
    titleText: {
        fontSize: 30,
        padding: 10,
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
        fontSize: 20,
        padding: 10,
        color: "gray",
        fontFamily: "Avenir",
    },
    
    chefPic: {
      width: 150,
      height: 150,

      borderRadius: 70
    },
    chefPicHolder: {
      position: "relative",
      top: -95,
      alignItems: "center",
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