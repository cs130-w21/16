import React, {useState} from 'react';
import { LogBox } from 'react-native';
import {Dimensions, Image, Modal, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, Icon, Divider, Rating} from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import colors from '../config/colors';

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
function DishPage(props) {
    LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);
    let Dish = props.route.params.Dish;

    const [count, setCount] = useState(0);
    const [modalVisible, setVisible] = useState(true);
    const [index, setIndex] = React.useState(0)
    const isCarousel = React.useRef(null)

    let carouselData = [];
    if(Dish.imagesURLs != null){
        Dish.imagesURLs.forEach((imageURL) => {
            if(imageURL != null){
                carouselData.push({image: {uri: imageURL}});
            }
        });
    }


    return(
        <SafeAreaView>
        <Modal animationType="slide" transparent={false} visible={modalVisible}>
            <View style={styles.container}>
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
                <View style={styles.closeButton} >
                    <Button onPress={() => props.navigation.goBack()} buttonStyle={styles.closeButtonStyle} icon={<Icon name='close' size={25} color='white' style={{backgroundColor: 'black', borderRadius:15, outline:"white solid 1px"}}/>} />
                </View>
                <View style={styles.textContainer}>
                    <View style ={styles.title}>
                        <Text style={styles.titleText}>{Dish.name}</Text>
                        <Text style={styles.price}>${Dish.price}</Text>
                    </View>
                    <View style={styles.ratingsContainer}>
                        <Rating
                        style={styles.rating}
                        readonly={true}
                        imageSize={20}
                        fractions={1}
                        startingValue={Dish.rating ? Dish.rating : 0.0}
                        />
                        <Text style={styles.numReviews}>({Dish.numReviews} Reviews)</Text>
                    </View>
                    <Divider style={styles.divider} />
                    <ScrollView>
                        <Text style={styles.descriptionText}>{Dish.description}</Text>
                        <Divider style={styles.divider} />
                        <Text style={styles.descriptionText}>Ingredients: {Dish.ingredients}</Text>
                        <Divider style={styles.divider} />
                        <Text style={styles.descriptionText}>Estimated Time: {Dish.timeString}</Text>
                    </ScrollView>
                </View>
                <View style={styles.checkout}>
                    <Button type='solid' title=' - ' onPress={() => remove(count, setCount)} titleStyle={styles.buttonText} buttonStyle={styles.minusButton}/>
                    <Text style={styles.countStyle}>{count}</Text>
                    <Button type='solid' style={styles.plusButtonPadding} title=' + ' onPress={() => setCount(count + 1)} titleStyle={styles.buttonText} buttonStyle={styles.plusButton}/>
                    <Button type='solid' title='Add to Cart' titleStyle={styles.addToCartText} buttonStyle={styles.addToCartButton} icon={
                        <Icon style={styles.cartPadding} name='basket' type="simple-line-icon" size={20} color='white'/>}
                    />
                </View>
            </View>
        </Modal>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        paddingTop: '10%',
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
        top: 305,
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
        backgroundColor: 'transparent',
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

    cartPadding: {
        paddingLeft:10,
        paddingRight:10
    },

    textContainer: {
        flex: 5,
        backgroundColor: "white",
        paddingTop: "0%",
        width: '100%',
        alignItems: 'flex-start',
        flexDirection: 'column'
    },

    image: {
        flex: 3,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        paddingBottom: 20,
    },
    
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    },

    countStyle: {
        fontSize: 20,
        padding: 10,
        color: "white",
        height: 40,
        fontWeight: 'bold',
        fontFamily: "Avenir",
    },

    price: {
        alignSelf: 'flex-end',
        fontSize: 30,
        padding: 10,
        color: colors.black,
        fontWeight: 'bold',
        fontFamily: "Avenir",
    },

    description: {
        alignSelf: 'flex-start',
        flex: 2,
        paddingLeft: 20,
    },

    descriptionText: {
        fontSize: 20,
        padding: 10,
        color: "gray",
        fontFamily: "Avenir",
    },
    
    checkout: {
        flex: 1,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    ratingsContainer: {
        width: '100%',
        flexDirection: "row",
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 15,
        marginLeft: 10
      },
      numReviews: {
        marginLeft: 5,
        fontSize: 18,
        color: 'grey',
      },
});

export default DishPage;
