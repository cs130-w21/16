import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import MenuCard from './dish';
import colors from '../config/colors';

const dummyDishCards = [
    {
        title: 'Pad Kee Mao',
        chef: 'Sarthak',
        photo: 'https://thewoksoflife.com/wp-content/uploads/2016/02/drunken-noodles-4.jpg',
        description: 'Drunkard noodles or pad kee mao is a stir fried noodle dish very similar to phat si-io, but with a slightly different flavor.',
        rating: 4.5,
        price: "$12.99"
    },
    {
        title: 'Pad Kee Mao',
        chef: 'Sarthak',
        photo: 'https://thewoksoflife.com/wp-content/uploads/2016/02/drunken-noodles-4.jpg',
        description: 'Drunkard noodles or pad kee mao is a stir fried noodle dish very similar to phat si-io, but with a slightly different flavor.',
        rating: 4.5,
        price: "$12.99"
    },
    {
        title: 'Pad Kee Mao',
        chef: 'Sarthak',
        photo: 'https://thewoksoflife.com/wp-content/uploads/2016/02/drunken-noodles-4.jpg',
        description: 'Drunkard noodles or pad kee mao is a stir fried noodle dish very similar to phat si-io, but with a slightly different flavor.',
        rating: 4.5,
        price: "$12.99"
    }
];

export default function ChefMenu(props){
    return(
        <View style={styles.container}>
            {dummyDishCards.map((dish, index) => <MenuCard
                title={dish.title}
                subtitle={dish.chef}
                image={dish.photo}
                description={dish.description}
                rating={dish.rating}
                price={dish.price}
                onPress={() => navigation.push("Details")}
            />)}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        minWidth: "100%"
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