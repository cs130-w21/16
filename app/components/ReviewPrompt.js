import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View, Modal, Image} from 'react-native';
import {Button, Icon,  Header } from 'react-native-elements'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import colors from '../config/colors';
import LeaveReview from '../screens/LeaveReview';
import { removeChef } from './ShoppingCart';

/**
 * 
 * @typedef ReviewPromptProps
 * @property {Order} order - Order object that corresponds to the current open orders
 * @property {boolean} visible - boolean value indicating whether this modal is currently visible or not
 * @property {String} chef - chef name of the review prompt
 * @property {function} closeOpenOrder - function passed in to close the current order upon closing of last chef order
 * @property {function} refresh - function passed in from parent to force refresh of parent on close
 * @property {function} hideModal - function passed in from parent to close this modal
 */

/**
 * A modal screen that prompts the user for reviews for all dishes for a certain chef within an order after completion
 * 
 * @param {ReviewPromptProps} props
 */
export default function ReviewPrompt(props){
    const [modalVisible, setVisible] = useState(false);
    const [leaveReviewVisible, setLeaveReviewVisible] = useState(false);
    const [dishidToReview, setDishidToReview] = useState(null);
    const [order, setOrder] = useState(props.order)
    
    useEffect(() => {
        setVisible(props.visible);
    })

    function close(){
        setVisible(false);
        props.refresh();
        props.hideModal();
        removeChef(props.chef);
        if(global.orders.chefs.length <= 0){
            props.closeOpenOrder();
        }
    }

    function hideModal(){
        setLeaveReviewVisible(false);
    }

    function openReview(dishid){
        setDishidToReview(dishid);
        setLeaveReviewVisible(true);
        var orderTemp = order;
        for(var i; i<order.length; i++){
            if(orderTemp[i].dish.dishid == dishid){
                orderTemp.splice(i, 1);
                setOrder(orderTemp);
                return;
            }
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
                        centerComponent={<View style={{flexDirection: 'column'}}><Text style={styles.header}>Thank You!</Text><Text style={styles.header2}>Did You Enjoy Your Dishes?</Text></View>}
                        rightComponent={<Button onPress={close} containerStyle={styles.buttonContainer} buttonStyle={styles.closeButtonStyle} icon={<Icon name='close' size={25} color='black' style={{backgroundColor: 'white', borderRadius:15, outline:"black solid 2px"}}/>} />}
                    />
                    <ScrollView style={styles.dishesContainer}>
                        {order!=null && order.map((dishOrder) =>
                            <View style={styles.dishReviewContainer}> 
                                <View style={styles.dishContainer}>
                                    <Image style={styles.dishImage} source={{uri: dishOrder.dish.primaryImageURL}}/>
                                    <View style={styles.dishInfo}>
                                        <Text style={styles.titleText}>{dishOrder.dish.name}</Text>
                                        <Text style={styles.chefName}>By {dishOrder.dish.Chef.name}</Text>
                                    </View>
                                </View>
                                <Button title="Review This Dish" type="outline" onPress={() => openReview(dishOrder.dish.dishid)} containerStyle={styles.submitButtonContainer} titleStyle={styles.submitButtonTitle} buttonStyle={styles.submitButton}/>
                            </View>
                        )}
                    </ScrollView> 
                </View>
                {leaveReviewVisible && <LeaveReview
                    dishid={dishidToReview}
                    hideModal={hideModal}    
                    rating={0}
                    refresh={hideModal}
                />}
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
        marginBottom: '5%',
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
        elevation: 5,
    },
    dishesContainer: {
        alignContent: 'center',
        flexDirection: 'column',
        width: '100%',
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
        textAlign: 'center'
    },
    header2:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        alignSelf: 'center',
        marginTop: 5,
        fontFamily: 'Avenir',
        textAlign: 'center'
    },
    dishContainer:{
        width: '90%',
        flexDirection: 'row',
        marginVertical: 10
    },
    dishReviewContainer: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },  
    dishImage:{
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 20
    },
    dishInfo: {
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        width: '75%',
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
        marginBottom: 10,
        width: '90%',
    },
    submitButton: {
        color: 'white',
        borderColor: colors.primary,
        borderWidth: 1
    },
    submitButtonTitle: {
        color: colors.primary,
        fontFamily: 'Avenir',
        borderColor: 'white',
    },
    invalidInputContainer: {
        borderColor: 'red',
    }
});