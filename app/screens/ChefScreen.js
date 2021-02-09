import React, {useState} from 'react';
import {Dimensions, Image, Modal, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, Icon, Divider} from 'react-native-elements'
import Carousel, {Pagination} from 'react-native-snap-carousel';
import colors from '../config/colors';
import { Linking } from "react-native";
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

const SLIDER_WIDTH = Dimensions.get('window').width
const ITEM_WIDTH = Math.round(SLIDER_WIDTH)

function remove(count, setCount) {
    if(count > 0){
        setCount(count - 1);
    }
}
function close(setVisible) {
    setVisible(false);
}
const CarouselCardItem = ({ item, index }) => {
    return (
        <Image
          source={item.image}
          style={styles.carouselItem}
        />
    )
}
function ChefScreen(props) {
    const [count, setCount] = useState(0);
    const [modalVisible, setVisible] = useState(true);
    const [index, setIndex] = React.useState(0)
    const isCarousel = React.useRef(null)
    let carouselData = carouselData=[{image: { uri: 'https://i0.wp.com/www.eatthis.com/wp-content/uploads/2019/01/healthy-spaghetti-spicy-tomato-sauce.jpg?resize=1250%2C702&ssl=1' }}, {image: { uri: 'https://i0.wp.com/www.eatthis.com/wp-content/uploads/2019/01/healthy-spaghetti-spicy-tomato-sauce.jpg?resize=1250%2C702&ssl=1' }}]
    let name="Gordon Ramsay" 
    let time="1 hour" 
    let description="My name is Gordon, I like cooking. I own several 5 star restaurants around the world, please buy my banana bread." 
    let ingredients="flour, tomatoes, basil, parmesan cheese, salt, pepper"
    let tableHead = ['Dish Name', 'Price', 'Review']
  let tableTitle = ['Scramble Eggs', 'Chicken Tikka', 'Lobster', 'King Crab']
  let tableData = [
    [<Text style={{color: 'blue', textAlign:'center'}}
    onPress={() => Linking.openURL('https://www.bjsrestaurants.com/Pizookie')}>
    Pizookie
    </Text>, 
    '$2.00', 
    '1'],
    [<Text style={{color: 'blue', textAlign:'center'}}
    onPress={() => Linking.openURL('https://en.wikipedia.org/wiki/Sugar_cookie')}>
    Sugar Cookies
    </Text>, '$3.00', '2'],
    [<Text style={{color: 'blue', textAlign:'center'}}
    onPress={() => Linking.openURL('https://www.foodnetwork.com/recipes/banana-bread-recipe-1969572')}>
    Banana Bread
    </Text>, '$4.00', '3'],
    [<Text style={{color: 'blue', textAlign:'center'}}
    onPress={() => Linking.openURL('https://cafedelites.com/chocolate-cake/')}>
    Chocolate Cake
    </Text>, '$5.00', '4']
  ]

    return(
        
            <View style={styles.container}>
                <View style={styles.images}>
                  <Pagination
                        dotsLength={carouselData.length}
                        activeDotIndex={index}
                        carouselRef={isCarousel}
                        dotStyle={styles.dotStyle}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                        tappableDots={true}
                        containerStyle={styles.dots}
                />
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
                </View>
              
                
                <View style={styles.textContainer}>
                    
                    
                    <ScrollView>
                    <Text style={styles.titleText}>{name}</Text>
                    <Divider style={styles.divider} />
                        <Text style={styles.descriptionText}>{description}</Text>
                        <Divider style={styles.divider} />
                        <Table style={styles.tableHolder} borderStyle={{borderWidth: 1}}>
          <Row data={tableHead} flexArr={[3, 2, 2]} style={styles.head} textStyle={styles.text}/>
          <TableWrapper style={styles.wrapper}>
            <Rows data={tableData} flexArr={[3,2, 2]} style={styles.row} textStyle={styles.text}/>
          </TableWrapper>
        </Table>
                        
                    </ScrollView>
                </View>
                <View style={styles.chefPicHolder}>
                <Image style={styles.chefPic} source={{uri: 'https://yt3.ggpht.com/ytc/AAUvwnhSeGCbeHJD09S7X-Qo8yuQKJqYdHa85OqkBDzSmg=s900-c-k-c0x00ffffff-no-rj'}}/>
                </View>

            </View>
        
    );
}


const styles = StyleSheet.create({
    container: {
        paddingTop: '0%',
        flex: 1,
        backgroundColor: colors.primary,
        minWidth: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column'
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

    closeButton:{
        alignSelf:'flex-end',
        position:'absolute',
        top:40,
        right: 0
    },

    closeButtonStyle: {
        backgroundColor: 'transparent'
    },
    
    minusButton: {
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: colors.secondary
    },

    plusButton: {
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: colors.secondary
    },

    plusButtonPadding: {
        paddingRight:10
    },

    addToCartButton: {
        borderRadius:20,
        backgroundColor: colors.secondary,
        paddingLeft:10
    },

    addToCartText: {
        fontWeight: 'bold',
        paddingRight:10
    },

    buttonText: {
        fontWeight: 'bold'
    },

  

    textContainer: {
        flex: 5,
        backgroundColor: "white",
        top: "10%",
        width: '100%',
        alignItems: 'center',
        textAlign: 'center'
    },

    images: {
        flex: 2,
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

    titleText: {
        fontSize: 30,
        padding: 10,
        color: "black",
        fontWeight: 'bold',
        fontFamily: "Avenir",
        alignSelf: "center"
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
      width: 125,
      height: 125,
      borderRadius: 70
    },
    chefPicHolder: {
      position: "absolute",
      top: "18%",
      alignItems: "center",
      width: '90%'
    },
    checkout: {
        flex: 1,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    head: {  height: 40,  backgroundColor: '#f1f8ff'},
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: {  height: 28  },
    text: { textAlign: 'center' },
    tableHolder: {
      position: "relative",
      top: '0%',
      width: "90%",
      left: "5%",
      right:"5%",
      alignItems: "center",
      justifyContent: "center"
    }
});

export default ChefScreen;
