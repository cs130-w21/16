import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import colors from '../config/colors';

const dummyDishCards = [
    {
        name: 'Pad Kee Mao',
        photo: 'https://thewoksoflife.com/wp-content/uploads/2016/02/drunken-noodles-4.jpg',
        ingredients: "Noodles, Chicken, Sauce, Veggies",
        price: "$12.99"
    },
    {
        name: 'Pad Kee Mao',
        photo: 'https://thewoksoflife.com/wp-content/uploads/2016/02/drunken-noodles-4.jpg',
        ingredients: "Noodles, Chicken, Sauce, Veggies",
        price: "$12.99"
    },
    {
        name: 'Pad Kee Mao',
        photo: 'https://thewoksoflife.com/wp-content/uploads/2016/02/drunken-noodles-4.jpg',
        ingredients: "Noodles, Chicken, Sauce, Veggies",
        price: "$12.99"
    }
];

function DishCard(props) {
    const { name, photo, ingredients, price } = props.data;
    return (
        <View style={styles.dishcard}>
            <Text style={styles.name}>{name}</Text>
            <Image source={{uri: photo}} style={{width: 75, height: 75}} />
            <Text style={styles.ingredients}>Ingredients: {ingredients}</Text>
            <Text style={styles.price}>Price: {price}</Text>
        </View>
    )
}

export default function ChefMenu(props){
    return(
        <View style={styles.container}>
            {dummyDishCards.map((dish, index) => <DishCard data={dish}/>)}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    dishcard: {
        width: 200,
        height: 200,
        backgroundColor: colors.secondary
    },
    name: {
        fontSize: 10,
        color: "white",
        fontFamily: "Verdana"
    },
    photo: {
        fontSize: 10,
        color: "white",
        fontFamily: "Verdana"
    },
    ingredients: {
        fontSize: 10,
        color: "white",
        fontFamily: "Verdana"
    },
    price: {
        fontSize: 10,
        color: "white",
        fontFamily: "Verdana"
    }
});