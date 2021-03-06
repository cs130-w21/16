import React, { useState } from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Rating, Divider} from "react-native-elements";
import { timeDifference } from '../util/TimeConversion';
import colors from "../config/colors";
import DishPage from '../screens/DishPage';

/**
 * 
 * @typedef ReviewProps
 * @memberof Review
 * @property {int} index - index of review within the larger list of reviews
 * @property {String} reviewer - name of the person who left the review
 * @property {String} name - dish name
 * @property {int} dishid - dishid of dish being reviewed
 * @property {int} rating - star rating of review from 1 to 5
 * @property {BigInt} timestamp - timestamp of review in milliseconds 
 * @property {String} comment - comment of review 
 * @property {Object} navigation - Stack Navigation object   
 */

/**
 * A component for a single review with name, timestamp, rating, comment
 * @class Review
 * @param {ReviewProps} props
 */
function Review(props){
    const [dishPageVisible, setDishPageVisible] = useState(false);

    function onPressDish(){
        setDishPageVisible(true);
    }

    function hideModal(){
        setDishPageVisible(false);
    }
    
    return(
        <View style={{minWidth: '100%'}}>
            {props.index != 0 ? <Divider style={styles.divider}/> : <View></View>}
            <View style={styles.ReviewContainer}>
                <Text style={styles.reviewerText}>{props.reviewer}</Text>
                {(props.name != null) && <TouchableOpacity onPress={onPressDish}>
                    <Text style={styles.dishText}>{props.name}</Text>
                </TouchableOpacity>}
                {dishPageVisible && props.dishid != null && <DishPage dishid={props.dishid} visible={dishPageVisible} hideModal={hideModal} navigation={props.navigation}/>}
                <View style={styles.starContainer}>
                    <Rating
                        style={styles.stars}
                        readonly={true}
                        imageSize={18}
                        fractions={1}
                        startingValue={props.rating ? props.rating : 0.0}
                    />
                    <Text style={styles.timestamp}>{timeDifference(Date.now(), new Date(props.timestamp))}</Text>
                </View>
                <Text style={styles.comment}>{props.comment}</Text>
            </View>
            
        </View>
    )
}

export default Review;

const styles = StyleSheet.create({
    ReviewContainer: {
        marginTop: 15,
        alignItems: 'flex-start',
        marginBottom: 15,
        width: '100%'
    },
    reviewerText: {
        color: 'black',
        marginBottom: 7,
        fontFamily: 'Avenir',
        fontWeight: 'bold'
    },
    dishText: {
        color: colors.secondary,
        marginBottom: 7,
        fontFamily: 'Avenir',
        fontWeight: 'bold'
    },
    starContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 7
    },
    stars: {
        marginRight: 10
    },
    timestamp: {
        fontSize: 10,
        color: 'grey',
        fontFamily: 'Avenir',
    },
    comment: {
        color: 'grey',
        fontFamily: 'Avenir',
    },
    divider: {
        width: '100%',
        alignSelf: 'center',
        backgroundColor: 'grey',
        height: 0.3
    },
})