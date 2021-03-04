import React, { Component, useCallback, useEffect, useState } from "react";
import { Dimensions, View, Text, SafeAreaView } from "react-native";
import { StyleSheet } from "react-native";
import Carousel, {Pagination} from 'react-native-snap-carousel';
import { Card, Button } from "react-native-elements";
import CheckoutSubtotal from "../components/checkoutSubtotal";
import colors from "../config/colors";
import * as Progress from 'react-native-progress';
import { Icon } from 'react-native-elements';
import { dishesPerChef, getLongestTimeForChef } from "../components/ShoppingCart";
import ReviewPrompt from "../components/ReviewPrompt";

const ICON_SIZE = 200;
const SLIDER_WIDTH = Dimensions.get('window').width
const SLIDER_HEIGHT = Dimensions.get('window').height


const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
async function changeProgress(key){
    for(let i = 0; i <= 1; i += 0.25){
        await sleep(2000)
        global.progress[key]=i;
    }
}
function icon(progress){
    if(progress == 0){
        return(
            <View>
                <Text style={styles.title}>Order Received</Text>
                <Icon name='check-circle' type='font-awesome' size={ICON_SIZE} style={styles.icon}/>
            </View>
        )
    } else if (progress == 0.25) {
        return(
            <View>
                <Text style={styles.title}>Chef Beginning Preperation</Text>
                <Icon name='carrot' type='font-awesome-5' size={ICON_SIZE} style={styles.icon}/>
            </View>
        )
    } else if (progress == 0.50) {
        return(
            <View>
                <Text style={styles.title}>Chef Done Cooking</Text>
                <Icon name='hotdog' type='font-awesome-5' size={ICON_SIZE} style={styles.icon}/>
            </View>
        )
    } else if (progress == 0.75) {
        return(
            <View>
                <Text style={styles.title}>Pickup Ready</Text>
                <Icon name='car' type='font-awesome-5' size={ICON_SIZE} style={styles.icon}/>
            </View>
        )
    } else if (progress == 1.00) {
        return(
            <View>
                <Text style={styles.title}>Done</Text>
                <Icon name='glass-cheers' type='font-awesome-5' size={ICON_SIZE} style={styles.icon}/>
            </View>
        )
    }
}

function TrackingElement(props){
    const chef=props.item;
    const [reviewVisible, setReviewVisible] = useState(false);

    function hideModal(){
        setReviewVisible(false);
    }

    function finishOrder(){
        setReviewVisible(true);
    }

    return(
        (global.cart != null || global.cart != undefined) && global.cart.length > 0 ? 
        <View style={styles.trackingContainer}>
            <Text style={styles.orderFromText}>Order From: {chef}</Text>
            {icon(global.progress[chef])}
            <Progress.Bar progress={global.progress[chef]} color={colors.secondary} width={300} style={styles.progress} />
            <View style={styles.chefOrderSummaryContainer}>
                <Text style={styles.chefText}>Chef: {chef}</Text>
                {dishesPerChef()[chef].map((orderitem) => 
                    orderitem["count"] > 0 ? (
                <View style={styles.itemContainer}>
                    <Text style={styles.textStyle}>
                    {orderitem["count"] +
                    " x " +
                    orderitem["dish"]["name"] +
                    " by " +
                    orderitem["dish"]["Chef"]["name"]}
                    </Text>
                    <Text style={styles.textStyle}>
                    {"$" + (orderitem["count"] * orderitem["dish"]["price"]).toFixed(2)}
                    </Text>
                </View>
                ) : null)}
                <Text style={styles.deliveryHeader}>Estimated Time To Pickup: {getLongestTimeForChef(chef)}</Text>
                {global.progress[chef]==1 &&<Button title="Close Order" type='solid' containerStyle={styles.submitButtonContainer} titleStyle={styles.submitButtonTitle} buttonStyle={styles.submitButton} onPress={finishOrder}/>}
                {reviewVisible && <ReviewPrompt
                                    order={dishesPerChef()[chef]}
                                    hideModal={hideModal}    
                                    refresh={hideModal}
                                    chef={chef}
                                    closeOpenOrder={props.closeOpenOrder}
                />}
            </View>
        </View>    : <View/>
    )
}

function Tracking(props) {
    const navigation = props.navigation;
    const [progress, setProgress] = React.useState(0);
    const [index, setIndex] = useState(0);
    const isCarousel = React.useRef(null);
    const [time, setTime] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    for(const c of global.orders.chefs){
        if(!(c in global.progress)){
            global.progress[c] = 0
            changeProgress(c);
        }
    }

    function closeOpenOrder(){
        navigation.navigate("FeaturedMenuScreen");
        global.cart = [];
        global.orderOpen = false;
        global.progress = {};
    }

    const carouselOrderItem = ({item, index}) => {

        return (
            <View style={styles.trackingContainer}>
                {global.orders.chefs.length > 0 && <TrackingElement item={item} closeOpenOrder={closeOpenOrder}/>}
            </View>
        )
    }

    return (
        <View style={{height: '100%', flexDirection: 'column', alignContent: 'flex-start'}}>
            <Carousel
                layout='default'
                data={global.orders.chefs}
                useScrollView={true}
                renderItem={carouselOrderItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={SLIDER_WIDTH}
                onSnapToItem={(i) => setIndex(i)}
                useScrollView={true}
                ref={isCarousel}
            />

            <SafeAreaView style={styles.paymentTab}>
                <View style={styles.dotContainer}>
                    <Pagination
                        dotsLength={global.orders.chefs.length}
                        activeDotIndex={index}
                        carouselRef={isCarousel}
                        dotStyle={styles.dotStyle}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                        tappableDots={true}
                        containerStyle={styles.dots}
                    />
                </View>
                <Button
                type="solid"
                title="Home"
                titleStyle={styles.doneText}
                buttonStyle={styles.doneButton}
                containerStyle={styles.doneButtonContainer}
                onPress={() => {
                    // Do a thing
                    navigation.navigate("FeaturedMenuScreen");
                }}
                />
        </SafeAreaView>
      </View>
    
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white'
    },
    trackingContainer: {
        width: '100%',
    },
    paymentTab: {
        flex: 1,
        justifyContent: "space-evenly",
        alignContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        height: "12%",
        position: "absolute",
        bottom: 0
    }, 
    doneText: {
      fontWeight: "bold",
      fontFamily: "Avenir"
    },
    title: {
        alignSelf: 'center',
        fontWeight: "bold",
        fontFamily: 'Avenir',
        fontSize: 25,
    },
    icon: {
        padding: 40
    },
    doneButton: {
        borderRadius: 20,
        backgroundColor: colors.secondary,
    },
    doneButtonContainer: {
        width: '50%',
        marginBottom: 20
    },
    progress: {
        alignSelf: 'center'
    },
    dots: {
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        margin: '-3%',
    },
    dotContainer: {
        minHeight: 50, 
        position: 'absolute', 
        top: -50, 
        justifyContent: 'center', 
        alignContent: 'center', 
        alignSelf: 'center', 
    },
    dotStyle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        margin: 0,
        backgroundColor: colors.black,
        alignSelf: 'flex-end'
    },
    itemContainer: {
        paddingVertical: 10,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    textStyle: {
        fontSize: 15,
        fontFamily: "Avenir",
        marginRight: 5,
        marginHorizontal: 10
    },
    chefText: {
        fontSize: 18,
        fontFamily: "Avenir",
        color: colors.secondary,
        fontWeight: 'bold',
        marginTop: 10,
        marginHorizontal: 10
    },
    deliveryHeader: {
        fontSize: 17,
        fontFamily: "Avenir",
        marginLeft: '2.5%',
        paddingBottom: 5,
        fontWeight: 'bold'
    },
    chefOrderSummaryContainer:{
        width: '95%',
        margin: '2.5%',
        flexDirection: 'column',
    },
    orderFromText: {
        fontSize: 24,
        fontFamily: "Avenir",
        color: colors.secondary,
        fontWeight: 'bold',
        marginTop: 10,
        alignSelf: 'center',
        textAlign: "center"
    },
    submitButtonContainer: {
        marginTop: 20,
        width: '100%',
    },
    submitButton: {
        color: 'white',
        borderColor: 'white',
        backgroundColor: colors.primary
    },
    submitButtonTitle: {
        color: 'white',
        fontFamily: 'Avenir',
        borderColor: 'white',
    },
});

export default Tracking;