import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Rating, Divider, Button, Icon} from "react-native-elements";
import PropTypes from 'prop-types';
import { timeDifference } from '../util/TimeConversion';
import colors from '../config/colors';
import AllReviews from '../screens/AllReviews';
import Review from './Review';




function Reviews(props){
    const [allReviewsVisible, setAllReviewsVisible] = useState(false);

    function allReviewsOnPress(){
        setAllReviewsVisible(true);
    }

    function hideModal(){
        setAllReviewsVisible(false);
    }
    console.log("render");
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Recent Reviews:</Text>
            <Text style={styles.rating}>{Math.round(props.rating*100)/100} out of 5 ({props.numReviews} Reviews)</Text>
            {props.reviews!=null ? props.reviews.map((review, index)=>
                <Review 
                    key={index}
                    index={index}
                    reviewer={review.reviewer}
                    rating={review.rating}
                    timestamp={review.timestamp}
                    comment={review.comment}
                />) : <Text></Text>}
            <Button title="More Reviews" type="outline" onPress={allReviewsOnPress} containerStyle={styles.buttonContainer} titleStyle={styles.button} buttonStyle={styles.button}/>
            {props.dishid!=null && allReviewsVisible && <AllReviews dishid={props.dishid} visible={allReviewsVisible} hideModal={hideModal}/>}
            {allReviewsVisible && <View style={styles.modalBackground}/>}
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
    },
    ReviewContainer: {
        marginTop: 15,
        alignItems: 'flex-start',
        marginBottom: 15
    },
    reviewerText: {
        //fontWeight: 'bold',
        color: 'black',
        marginBottom: 7
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
        color: 'grey'
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
    modalBackground: {
        position:'absolute',
        right:0,
        top:0,
        height:1000000000,
        width: 1000000000,
        backgroundColor: 'black'
    }
});

export default Reviews;