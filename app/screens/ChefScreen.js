import React, {useState, useEffect} from 'react';
import {Dimensions, Image, Modal, ScrollView, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {Button, Icon, Divider} from 'react-native-elements'
import Carousel, {Pagination} from 'react-native-snap-carousel';
import colors from '../config/colors';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';

import {getChefsDishes, getCoverPhotos} from "../util/Queries";
import minRemainingToString from '../util/TimeConversion';

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
    const navigation = props.navigation;
    props = props.route.params;

    let name = props.name;
    let description = props.description;
    let id=props.id;
    let profilePic = props.profilePic;
    let shortDesc = props.shortDesc;

    const [coverPhotos, setCoverPhotos] = useState(null);
    const [carouselData, setCarouselData] = useState([]);
    const [chefsDishes, setChefsDishes] = useState([]);

    useEffect(() => {
        getCoverPhotos(id).then(function(results) {
            setCoverPhotos(results);
            let photos = [];
            results.forEach((x) => {photos.push({image: {uri: x.primaryImage}})});
            setCarouselData(photos);
        }, ()=>{console.log("Error")})
        .catch((err) => {console.log("Use Effect Err Cover Photos: ", err)});

        getChefsDishes(id).then(function(results) {
            setChefsDishes(results);
        }, ()=>{console.log("Error")})
        .catch((err) => {console.log("Use Effect Err Chef's Dishes: ", err)});
        
    }, [])
    
    function onPress(dish){
        const carouselData = [{image: {uri: dish.primaryImage}}];
        dish.secondImage != null ? carouselData.push({image: {uri: dish.secondImage}}) : {};
        dish.thirdImage != null ? carouselData.push({image: {uri: dish.thirdImage}}) : {};
        dish.fourthImage != null ? carouselData.push({image: {uri: dish.fourthImage}}) : {};
        navigation.push("DishPage", {
            carouselData: carouselData,
            name: dish.name,
            price: dish.price,
            time: minRemainingToString(dish.timeMin),
            description: dish.description,
            ingredients: dish.ingredients,
            chefid: dish.chefid
        })
    }

    const [index, setIndex] = React.useState(0)
    const isCarousel = React.useRef(null)
    let tableHead = ['Dish Name', 'Price', 'Rating']

    let tableData = [];
    chefsDishes.forEach((dish) => {
        tableData.push(
            [<Text style={{color: 'blue', textAlign: 'center'}}
            onPress={() => {onPress(dish)}}>
                {dish.name}
            </Text>,
            '$'+dish.price.toFixed(2),
            dish.rating.toFixed(2)
        ]
        )
    })

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
                    <Button onPress={() => navigation.goBack()} buttonStyle={styles.closeButtonStyle} icon={<Icon name='close' type="simple-line-icon" size={30} color='white'/>} />
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