import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { Button} from "react-native-elements";
import PropTypes from 'prop-types';
import colors from '../config/colors';
import AllReviews from '../screens/AllReviews';
import Review from './Review';
import {AirbnbRating} from 'react-native-ratings';
import LeaveReview from '../screens/LeaveReview';

/**
 * @typedef ReviewJSON
 * @property {String} reviewer - name of the person who left the review
 * @property {int} rating - star rating of review from 1 to 5
 * @property {BigInt} timestamp - timestamp of review in milliseconds 
 * @property {String} comment - comment of review 
 * @property {String} name - dish name
 * @property {int} dishid - dishid of dish being reviewed
 */
/**
 * 
 * @typedef ReviewsProps
 * @property {float} rating - average rating of dish/chef
 * @property {int} numReviews - total number of ratings left for dish/chef
 * @property {int} dishid - dishid if component is reviews for a dish (null if chefid is not null)
 * @property {int} chefid - chefid if component is reviews for a chef (null if dishid is not null)
 * @property {function} refresh - function passed in from parent to force refresh of parent on close
 * @property {ReviewJSON[]} reviews - array of JSON objects containing informations for the first 5 reviews
 * @property {Object} navigation - Stack Navigation object
 */

/**
 * A component that lists the first few reviews for either a dish or a chef, a button to open all reviews. If reviews are for a dish, a leave review option is available. 
 * 
 * @param {ReviewsProps} props
 */
function Reviews(props){
    const [allReviewsVisible, setAllReviewsVisible] = useState(false);
    const [leaveReviewVisible, setLeaveReviewVisible] = useState(false);
    const [leftRating, setLeftRating] = useState(0);

    function allReviewsOnPress(){
        setAllReviewsVisible(true);
    }

    function hideModal(){
        setAllReviewsVisible(false);
        setLeaveReviewVisible(false);
    }

    function ratingTapped(rating){
        setLeaveReviewVisible(true);
        setLeftRating(rating);
    }
    
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Recent Reviews:</Text>
            <Text style={styles.rating}>{Math.round(props.rating*100)/100} out of 5 ({props.numReviews} Reviews)</Text>
            {props.dishid!=null && 
            <View style={styles.leaveReviewContainer}>
                <Text style={styles.tapText}>Tap to leave a review:</Text>
                <AirbnbRating
                    defaultRating={0}
                    reviews={[]}
                    count={5}
                    size={30}
                    showRating={false}
                    onFinishRating={ratingTapped}
                />
                {leaveReviewVisible && <LeaveReview
                    dishid={props.dishid}
                    hideModal={hideModal}    
                    rating={leftRating}
                    refresh={props.refresh}
                />}
            </View>}
            {props.reviews!=null ? props.reviews.map((review, index)=>
                <Review 
                    key={index}
                    index={index}
                    reviewer={review.reviewer}
                    rating={review.rating}
                    timestamp={review.timestamp}
                    comment={review.comment}
                    name={review.name!=null ? review.name : null}
                    dishid={review.dishid}
                    navigation={props.navigation}
                />) : <Text></Text>}
            {props.reviews!=null && props.reviews.length==0 && <Text style={styles.noReviews}>No Reviews with Comments</Text>}
            {props.reviews!=null && props.reviews.length>0 && <Button title="More Reviews" type="outline" onPress={allReviewsOnPress} containerStyle={styles.buttonContainer} titleStyle={styles.button} buttonStyle={styles.button}/>}
            {(props.dishid!=null || props.chefid!=null) && allReviewsVisible && <AllReviews dishid={props.dishid} chefid={props.chefid} visible={allReviewsVisible} hideModal={hideModal} navigation={props.navigation}/>}
        </View>
    );
}

Reviews.propTypes = {
    rating: PropTypes.number.isRequired,
    numReviews: PropTypes.number.isRequired
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        width: '100%'
    },
    title: {
        fontSize: 24,
        fontFamily: 'Avenir',
        fontWeight: 'bold',
        color: 'black'
    },
    rating: {
        color: 'gray',
        fontFamily: 'Avenir',
    },
    ReviewContainer: {
        marginTop: 15,
        alignItems: 'flex-start',
        marginBottom: 15
    },
    reviewerText: {
        color: 'black',
        marginBottom: 7,
        fontFamily: 'Avenir',
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
        color: 'grey'
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
    buttonContainer: {
        marginTop: 10,
        color: colors.secondary,
        width: '100%'
    },
    button: {
        color: colors.primary,
        borderColor: colors.primary
    },
    noReviews: {
        padding: 15,
        alignSelf: 'center',
        fontSize: 18
    },
    leaveReviewContainer:{
        alignItems: 'center',
        paddingTop: 10
    },
    tapText: {
        fontFamily: 'Avenir',
        paddingBottom: 5
    }
});

export default Reviews;