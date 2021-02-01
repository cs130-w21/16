import React, {useState} from 'react';
import {Dimensions, Image, Modal, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, Icon, Divider} from 'react-native-elements'
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
    const [count, setCount] = useState(0);
    const [modalVisible, setVisible] = useState(true);
    const [index, setIndex] = React.useState(0)
    const isCarousel = React.useRef(null)

    return(
        <Modal animationType="slide" transparent={false} visible={modalVisible}>
            <View style={styles.container}>
                <View style={styles.image}>
                    <Carousel
                        layout='default'
                        data={props.carouselData}
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
                        dotsLength={props.carouselData.length}
                        activeDotIndex={index}
                        carouselRef={isCarousel}
                        dotStyle={styles.dotStyle}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                        tappableDots={true}
                        containerStyle={styles.dots}
                />
                <View style={styles.closeButton} >
                    <Button onPress={() => close(setVisible)} buttonStyle={styles.closeButtonStyle} icon={<Icon name='close' type="simple-line-icon" size='30' color='black'/>} />
                </View>
                <View style={styles.textContainer}>
                    <View style ={styles.title}>
                        <Text style={styles.titleText}>{props.name}</Text>
                        <Text style={styles.price}>${props.price}</Text>
                    </View>
                    <Divider style={styles.divider} />
                    <ScrollView>
                        <Text style={styles.descriptionText}>{props.description}</Text>
                        <Divider style={styles.divider} />
                        <Text style={styles.descriptionText}>Ingredients: {props.ingredients}</Text>
                        <Divider style={styles.divider} />
                        <Text style={styles.descriptionText}>Estimated Time: {props.time}</Text>
                    </ScrollView>
                </View>
                <View style={styles.checkout}>
                    <Button type='solid' title=' - ' onPress={() => remove(count, setCount)} titleStyle={styles.buttonText} buttonStyle={styles.minusButton}/>
                    <Text style={styles.countStyle}>{count}</Text>
                    <Button type='solid' style={styles.plusButtonPadding} title=' + ' onPress={() => setCount(count + 1)} titleStyle={styles.buttonText} buttonStyle={styles.plusButton}/>
                    <Button type='solid' title='Add to Cart' titleStyle={styles.addToCartText} buttonStyle={styles.addToCartButton} icon={
                        <Icon style={styles.cartPadding} name='basket' type="simple-line-icon" size='20' color='white'/>}
                    />
                </View>
            </View>
        </Modal>
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
    }
});

export default DishPage;
