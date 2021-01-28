import React, {useState} from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';
import {Button, Card, Icon, Divider} from 'react-native-elements'

import colors from '../config/colors';

function remove(count, setCount) {
    if(count > 0){
        setCount(count - 1);
    }
}
function DishPage(props) {
    const [count, setCount] = useState(0);
    return(
        <View style={styles.container}>
            <View style={styles.image}>
                <Image source={require("../assets/spaghetti.jpg")}/>
            </View>
            <View style={styles.textContainer}>
                <View style ={styles.title}> 
                    <Text style={styles.titleText}>{props.name}</Text>
                    <Text style={styles.price}>${props.price}</Text>
                </View>
                <Divider style={styles.divider} />
                <Text style={styles.descriptionText}>{props.description}</Text>
                <Divider style={styles.divider} />
                <Text style={styles.descriptionText}>Ingredients: {props.ingredients}</Text>
                <Divider style={styles.divider} />
                <Text style={styles.descriptionText}>Estimated Time: {props.time}</Text>
            </View>
            <View style={styles.checkout}>
                <Button type='solid' title=' - ' onPress={() => remove(count, setCount)} titleStyle={{fontWeight: 'bold'}} buttonStyle={{borderBottomLeftRadius:20,borderTopLeftRadius:20, backgroundColor: colors.secondary}}/>
                <Text style={styles.countStyle}>{count}</Text>
                <Button type='solid' style={{paddingRight:10}} title=' + ' onPress={() => setCount(count + 1)} titleStyle={{fontWeight: 'bold'}} buttonStyle={{borderBottomRightRadius:20, borderTopRightRadius: 20, backgroundColor: colors.secondary}}/>
                <Button type='solid' title='Add to Cart' titleStyle={{fontWeight: 'bold', paddingRight:10}} buttonStyle={{borderRadius:20, backgroundColor: colors.secondary, paddingLeft:10}} icon={
                    <Icon style={{paddingLeft:10, paddingRight:10}} name='basket' type="simple-line-icon" size='20' color='white'/>}
                />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        paddingTop: '25%',
        flex: 1,
        backgroundColor: colors.primary,
        minWidth: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start', 
        flexDirection: 'column'
    },

    textContainer: {
        flex: 5,
        backgroundColor: "white",
        paddingTop: "0%",
        width: '100%',
        alignItems: 'flex-start',
        flexDirection: 'column'
    },

    image: {
        flex: 3,
        // width: '100%',
        // height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '18%'
    },
    
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    
    divider: {
        width: '90%', 
        alignSelf: 'center',
        backgroundColor: colors.secondary, 
        height: 1
    }, 

    titleText: {
        fontSize: 30,
        padding: 10,
        color: "black",
        fontWeight: 'bold',
        fontFamily: "Avenir",
    },

    countStyle: {
        fontSize: 20,
        padding: 10,
        color: "white",
        height: 40,
        // backgroundColor: colors.secondary,
        fontWeight: 'bold',
        fontFamily: "Avenir",
    },

    price: {
        alignSelf: 'flex-end',
        fontSize: 30,
        padding: 10,
        color: "black",
        fontWeight: 'bold',
        fontFamily: "Avenir",
    },

    description: {
        alignSelf: 'flex-start',
        flex: 2,
        paddingLeft: 20,
    },

    descriptionText: {
        fontSize: 20,
        padding: 10, 
        color: "gray",
        fontFamily: "Avenir",
    },
    
    checkout: {
        flex: 1,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'flex-start', 
        flexDirection: 'row'
    }
  });

export default DishPage;