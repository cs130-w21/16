import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View, Modal, Image} from 'react-native';
import {Button, Icon, Divider, Rating, Header, Input} from 'react-native-elements'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {AirbnbRating} from 'react-native-ratings';
import MenuCard from '../components/dish';
import Review from '../components/Review';
import colors from '../config/colors';
import { getDishReviews, getChefReviews, getDishInfo, pushNewReview } from '../util/Queries';
import Dish from '../objects/Dish';
import { TextInput } from 'react-native';
import { Alert } from 'react-native';


export default function LeaveReview(props){
    const [modalVisible, setVisible] = useState(false);
    const [dish, setDish] = useState(null);
    const [chefName, setChefName] = useState(null);
    const [rating, setRating] = useState(props.rating);
    const [reviewer, setReviewer] = useState(null);
    const [comment, setComment] = useState(null);
    const [invalid, setInvalid] = useState(false);

    useEffect(() => {
        setVisible(props.visible);
    })

    useEffect(() => {
        getDishInfo(props.dishid).then(function(results) {
            if(results!=null){
                const d = new Dish(results[0])
                setDish(d);
                setChefName(results[0].chefName);
            }
        }, ()=>{console.log("Error in useEffect getDishInfo")})
        .catch((err) => {console.log("Use Effect Err Get Dish Info: ", err)});
    }, [])

    function updateRating(rating){
        setRating(rating);
    }


    function close(){
        setVisible(false);
        props.refresh();
        props.hideModal();
    }

    function makeInvalid(){
        setInvalid(true);
    }

    function submit(){
        if(dish!=null && reviewer!=null && reviewer.length>0){
            pushNewReview(dish.dishid,dish.chefid,reviewer,rating,comment, Date.now()).then(function(results) {
                Alert.alert(
                    "Review Submitted",
                    "Your Review Has Been Recorded!",
                    [
                        {
                            text: "Dismiss",
                            style: 'dismiss',
                            onPress: close
                        }
                    ]
                );
            }, ()=>{console.log("Error in submit pushnewReview")})
            .catch((err) => {console.log("Err Push New Review: ", err)});
        } else {
            Alert.alert(
                "Unable to Submit Review",
                "You must enter your name to leave a review.",
                [
                    {
                        text: "Dismiss",
                        style: 'dismiss',
                        onPress: makeInvalid
                    }
                ]
            );
        }
    }

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            swipeDirection="down"
            onRequestClose={close}
        >
            <TouchableWithoutFeedback onPress={close}>
                <View style={styles.modalOverlay}/>
            </TouchableWithoutFeedback>
            
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Header
                            containerStyle={styles.headerContainer}
                            centerComponent={<View style={{flexDirection: 'column'}}><Text style={styles.header}>Leave a Review</Text></View>}
                            rightComponent={<Button onPress={close} containerStyle={styles.buttonContainer} buttonStyle={styles.closeButtonStyle} icon={<Icon name='close' size={25} color='black' style={{backgroundColor: 'white', borderRadius:15, outline:"black solid 2px"}}/>} />}
                        />
                        {dish!=null && <View style={styles.dishContainer}>
                            <Image style={styles.dishImage} source={{uri: dish.primaryImageURL}}/>
                            <View style={styles.dishInfo}>
                                <Text style={styles.titleText}>{dish.name}</Text>
                                <Text style={styles.chefName}>By {chefName}</Text>
                            </View>
                        </View>}
                        <Text style={styles.tapText}>Tap to review:</Text>
                        <AirbnbRating
                            defaultRating={props.rating}
                            showRating={false}
                            onFinishRating={updateRating}
                        />
                        <View style={styles.inputContainer}>
                            <Input
                                placeholder="Your Name"
                                placeholderTextColor={invalid? 'red': 'grey'}
                                inputStyle={styles.nameInput}
                                inputContainerStyle = {invalid ? styles.invalidInputContainer : {}}
                                onChangeText={text => {setReviewer(text); setInvalid(false)}}
                            />
                            <Input
                                placeholder="Comment (optional)"
                                placeholderTextColor='grey'
                                multiline={true}
                                numberOfLines={10}
                                containerStyle={styles.commentContainer}
                                inputContainerStyle={styles.commentInputContainer}
                                inputStyle={styles.commentInput}
                                onChangeText={text => {setComment(text)}}
                            />
                            <Button title="Submit Review" type="solid" onPress={submit} containerStyle={styles.submitButtonContainer} titleStyle={styles.submitButtonTitle} buttonStyle={styles.submitButton}/>
                        </View>
                        
                    </View>
                    
                </View>
          
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalOverlay:{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width:'100%',
        height: '100%'
    },
    modalContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        marginLeft: '2.5%',
        marginRight: '2.5%',
        marginBottom: '5%'
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        width: '100%',
        height: '100%',
        shadowColor: 'black',
        shadowOffset: {width: 5, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5
    },
    closeButton:{
        alignSelf:'center'
    },

    closeButtonStyle: {
        backgroundColor: 'transparent',
    },
    buttonContainer: {
        alignSelf: 'flex-end'
    },
    headerContainer:{
        backgroundColor: colors.primary, 
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    header:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24,
        alignSelf: 'center',
        marginTop: 5,
        fontFamily: 'Avenir',
    },
    dishContainer:{
        width: '90%',
        height: '25%',
        flexDirection: 'row'
    },
    dishImage:{
        width: 150,
        height: 150,
        borderRadius: 75,
        marginTop: 20
    },
    dishInfo: {
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        width: '50%',
    },
    titleText: {
        fontSize: 30,
        paddingLeft: 15,
        paddingBottom: 10,
        color: "black",
        fontWeight: 'bold',
        fontFamily: "Avenir",
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    chefName: {
        fontSize: 18,
        fontFamily: 'Avenir',
        fontWeight: 'bold',
        color: colors.secondary,
        paddingLeft: 15
    },
    tapText: {
        fontFamily: 'Avenir',
        paddingBottom: 5
    },
    inputContainer: {
        paddingHorizontal: 10,
        paddingVertical: 30,
        width: '95%',
        flexDirection: 'column',
        flex: 1
    },
    nameInput:{
        fontFamily: 'Avenir',
    },
    commentInputContainer: {
        height: '100%',
    },
    commentContainer:{
        alignSelf: 'flex-start',
        fontFamily: 'Avenir',
        height: '40%',
    },
    commentInput:{
        alignSelf: 'flex-start',
        fontFamily: 'Avenir',
        height: '100%'
    },
    submitButtonContainer: {
        marginTop: 10,
        width: '100%',
        justifyContent: 'flex-end',
        flex: 1
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
    invalidInputContainer: {
        borderColor: 'red',
    }
});