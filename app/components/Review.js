import React from 'react';
import { LogBox } from 'react-native';
import {StyleSheet, View, Text} from 'react-native';
import {Rating, Divider} from "react-native-elements";
import { timeDifference } from '../util/TimeConversion';

function Review(props){
    LogBox.ignoreLogs(['Each child in a list should have a unique "key" prop.']);
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

export default Review;

const styles = StyleSheet.create({
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
})