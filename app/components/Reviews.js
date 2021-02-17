import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Rating} from "react-native-elements";
import PropTypes from 'prop-types';

function Review(props){
    return(
        <View>
            <Text>{props.reviewer}</Text>
            <Rating
                  style={styles.rating}
                  readonly={true}
                  imageSize={13}
                  fractions={1}
                  startingValue={props.rating ? props.rating : 0.0}
            />
        </View>
    )
}

function Reviews(props){
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Customer Reviews:</Text>
            <Text style={styles.rating}>{Math.round(props.rating*100)/100} out of 5 ({props.numReviews} Reviews)</Text>
            <Review reviewer={props.reviews != null ? "props.reviews[0].reviewer" : "Loading"}/>
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
        color: 'gray'
    }
});

export default Reviews;