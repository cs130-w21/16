import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Rating, Divider, Button, Icon} from "react-native-elements";
import PropTypes from 'prop-types';
import { timeDifference } from '../util/TimeConversion';
import colors from '../config/colors';



function Review(props){
    return(
        <View>
            {props.index != 0 ? <Divider style={styles.divider}/> : <View></View>}
            <View style={styles.ReviewContainer}>
                <Text style={styles.reviewerText}>{props.reviewer}</Text>
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

function Reviews(props){
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
            <Button title="More Reviews" type="outline" containerStyle={styles.buttonContainer} titleStyle={styles.button} buttonStyle={styles.button}/>
        </View>
    );
}

Reviews.propTypes = {
    rating: PropTypes.number.isRequired,
    numReviews: PropTypes.number.isRequired
}

const styles = StyleSheet.create({
    container: {
        padding: 10
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
        color: colors.secondary
    },
    button: {
        color: colors.primary,
        borderColor: colors.primary
    }
});

export default Reviews;