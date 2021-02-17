import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View, Modal} from 'react-native';
import {Button, Icon, Divider, Rating, Header} from 'react-native-elements'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Review from '../components/Review';
import colors from '../config/colors';
import { getDishReviews } from '../util/Queries';


export default function AllReviews(props){
    const [modalVisible, setVisible] = useState(false);
    const [reviews, setReviews] = useState(null);

    useEffect(() => {
        setVisible(props.visible);
    })

    useEffect(() => {
        getDishReviews(props.dishid).then(function(results) {
            setReviews(results);
        }, () => {console.log("Error in useEffect getDishReviews")})
        .catch((err) => {console.log("use Effect Err Get Dish Reviews: ", err)});
    }, [])

    function close(){
        setVisible(false);
        props.hideModal();
    }
    console.log("ALL REVIEWS RENDER", modalVisible);
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
                            centerComponent={<View style={{flexDirection: 'column'}}><Text style={styles.header}>Reviews</Text></View>}
                            rightComponent={<Button onPress={close} containerStyle={styles.buttonContainer} buttonStyle={styles.closeButtonStyle} icon={<Icon name='close' size={25} color='black' style={{backgroundColor: 'white', borderRadius:15, outline:"black solid 2px"}}/>} />}
                        />
                        <ScrollView style={styles.ScrollView} showsVerticalScrollIndicator={false} alwaysBounceHorizontal={false} alwaysBounceVertical={false}>
                            {reviews!=null ? reviews.map((review, index)=>
                                <View style={{marginLeft: 10, marginRight:10}}><Review 
                                    key={index}
                                    index={index}
                                    reviewer={review.reviewer}
                                    rating={review.rating}
                                    timestamp={review.timestamp}
                                    comment={review.comment}
                                /></View>) : <Text></Text>}
                        </ScrollView>
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
        margin: '5%'
    },
    scrollView: {
        width: '100%',
        height: '100%'
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        width: '100%',
        height: '100%',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
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
        marginTop: 5
    }
});