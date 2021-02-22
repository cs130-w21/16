import React, {useState, useEffect} from 'react';
import { LogBox } from 'react-native';
import {Dimensions, Image, Modal, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, Icon, Divider} from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import colors from '../config/colors';
import DropDownPicker from 'react-native-dropdown-picker';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { ShadowPropTypesIOS } from 'react-native';


const SLIDER_WIDTH = Dimensions.get('window').width
const ITEM_WIDTH = Math.round(SLIDER_WIDTH)





function FilterPage(props) {
    LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

    const [count, setCount] = useState(0);
    const [index, setIndex] = React.useState(0)
    const [ratingsOfficial,setRatingsOfficial] = useState("hello")
    const [pricePressed,setPrice] = useState([false,false,false])
    

    function closeApply() {
        props.update()
        props.closeModal(false)
    }

    useEffect(() => {

        let temp = []

        for (let i=0;i<props.priceFilter.length;i++)
        {
            if (props.priceFilter[i])
            {
                temp.push(true)
            }
            else
            {
                temp.push(false)
            }
        }
        setPrice(temp)
    }, [])
    
    
   function handleTimePress(buttonNum)
   {

        let timeFilter = []
        let timeHolder= {0:[0,30],1:[0,60],2:[0,120],3:[0,100000000000000]}
        let retHolder = -1
        for (let i=0;i<4;i++)
        {
            if (buttonNum==i)
            {
                timeFilter.push(true)
                retHolder=i
            }
            else
                timeFilter.push(false)
        }
        props.setTime(timeHolder[retHolder])
        props.setTimeFilter(timeFilter)

   }

   function handleRatingPress(buttonNum)
   {
        if (buttonNum == 0)
        {
            props.setRatingFilter([true,false,false])
        }
        if (buttonNum == 1)
        {
            props.setRatingFilter([false,true,false])
        }
        if (buttonNum == 2)
        {
            props.setRatingFilter([false,false,true])
        }
   }
   
    function handlePriceRange(buttonPressed)
    {
        temp1 = pricePressed[0]
        temp2 = pricePressed[1]
        temp3 = pricePressed[2]
        if (buttonPressed=="low")
        {
            temp1 = !(pricePressed[0])
        }
        else if (buttonPressed=="medium")
        {
            temp2 = !(pricePressed[1])
        }
        else if (buttonPressed=="high")
        {
            temp3 = !(pricePressed[2])
        }
        console.log([temp1,temp2,temp3])
        setPrice([temp1,temp2,temp3])

        if (temp3 && !temp2 && !temp1)
        {
            props.setPrices([40,10000000000000])
            props.setPriceFilter([false,false,true])
        }
        else if (temp3 && !temp2 && temp1)
        {
            props.setPrices([9,41])
            props.setPriceFilter([true,false,true])
        }
        else if (temp1 && !temp2 && !temp3)
        {
            props.setPrices([0,10])
            props.setPriceFilter([true,false,false])
        }
        else if (temp2 && temp1 && temp3)
        {
            props.setPrices([0,1000000000000000])
            props.setPriceFilter([true,true,true])
        }
        else if (temp2 && temp1 && !temp3)
        {
            props.setPrices([0,40])
            props.setPriceFilter([true,true,false])
        }
        else if (temp2 && temp3 && !temp1)
        {
            props.setPrices([10,100000000000000])
            props.setPriceFilter([false,true,true])
        }
        else if (temp2 && !temp1 && !temp3)
        {
            props.setPrices([10,40])
            props.setPriceFilter([false,true,false])
        }
        if (!temp1 && !temp2 && !temp3)
        {
            props.setPrices([0,1000000000000000])
            props.setPriceFilter([false,false,false])
        }
    }

    function colorTeller(buttonPressed)
    {
        
        if (buttonPressed == false)
        {
            return colors.secondary
        }
        return colors.primary
    }

    function colorTellerTime(buttonNum)
    {
        
        if (props.timeFilter[buttonNum] == false)
        {
            return colors.secondary
        }
        return colors.primary
    }
    function colorTellerRating(buttonNum)
    {
        
        if (props.ratingFilter[buttonNum] == false)
        {
            return colors.secondary
        }
        return colors.primary
    }

    function Clear() {
        props.setRatingFilter([false,false,true])
        props.setPriceFilter([false,false,false])
        props.setPrices([0,100000000000])
        setPrice([false,false,false])
        props.setTimeFilter([false,false,false,true])
        props.setTime([0,10000000000000000])
    }

    return(
            <View style={styles.container}>
               
                
                <View style={styles.textContainer}>
                    
                    <Text style = {styles.textTop}>Sort By Rating</Text>
                    <View style={styles.ratingsRow}>
                        <Button
                        title = "High to Low"
                        color = "white"
                        buttonStyle = {{backgroundColor: colorTellerRating(0) , marginRight: 10 }}
                        onPress = {() => handleRatingPress(0)}
                        />
                        <Button
                        title = "Low to High"
                        color = "white"
                        buttonStyle = {{backgroundColor: colorTellerRating(1) , marginRight: 10}}
                        onPress = {() => handleRatingPress(1)}
                        />
                        <Button
                        title = "None"
                        color = "white"
                        buttonStyle = {{backgroundColor: colorTellerRating(2), marginRight: 10 }}
                        onPress = {() => handleRatingPress(2)}
                        />
                    </View>
                    <Divider style={styles.divider} /> 
                    <Text style={styles.text}>Price</Text>
                    <View style={styles.ratingsRow}>
                        <Button
                        title = "$"
                        color = "white"
                        buttonStyle = {{backgroundColor: colorTeller(pricePressed[0]) , marginRight: 10}}
                        onPress = {() => handlePriceRange("low")}
                        />
                        <Button
                        title = "$$"
                        color = "white"
                        buttonStyle = {{backgroundColor: colorTeller(pricePressed[1]) , marginRight: 10}}
                        onPress = {() => handlePriceRange("medium")}
                        />
                        <Button
                        title = "$$$"
                        color = "white"
                        buttonStyle = {{backgroundColor: colorTeller(pricePressed[2]), marginRight: 10 }}
                        onPress = {() => handlePriceRange("high")}
                        />
                    </View>
                    <Divider style={styles.divider} /> 
                    <Text style={styles.text}>Time</Text>
                    <View style={styles.ratingsRow}>
                        <Button
                        title = "< 30 Min."
                        color = "white"
                        buttonStyle = {{backgroundColor: colorTellerTime(0) , marginRight: 10}}
                        onPress = {() => handleTimePress(0)}
                        />
                        <Button
                        title = "< 60 Min."
                        color = "white"
                        buttonStyle = {{backgroundColor: colorTellerTime(1), marginRight: 10 }}
                        onPress = {() => handleTimePress(1)}
                        />
                        <Button
                        title = "< 120 Min."
                        color = "white"
                        buttonStyle = {{backgroundColor: colorTellerTime(2), marginRight: 10 }}
                        onPress = {() => handleTimePress(2)}
                        />
                         <Button
                        title = "All"
                        color = "white"
                        buttonStyle = {{backgroundColor: colorTellerTime(3) , marginRight: 10}}
                        onPress = {() => handleTimePress(3)}
                        />
                    </View>
                    <Divider style={styles.divider} />
                    <Text style={styles.text}>Categories</Text> 
                    <View style={styles.ratingsRow}>
                        <Button
                        title = "Italian"
                        color = "white"
                        buttonStyle = {{backgroundColor: colors.secondary , marginRight: 10, marginBottom: 10}}
                        onPress = {() => console.log("Implement")}
                        />
                        <Button
                        title = "Indian"
                        color = "white"
                        buttonStyle = {{backgroundColor: colors.secondary, marginRight: 10,  marginBottom: 10 }}
                        onPress = {() => console.log("Implement")}
                        />
                        <Button
                        title = "Asian"
                        color = "white"
                        buttonStyle = {{backgroundColor: colors.secondary, marginRight: 10, marginBottom: 10 }}
                        onPress = {() => console.log("Implement")}
                        />
                        <Button
                        title = "Italian"
                        color = "white"
                        buttonStyle = {{backgroundColor: colors.secondary , marginRight: 10, marginBottom: 10}}
                        onPress = {() => console.log("Implement")}
                        />
                        <Button
                        title = "Indian"
                        color = "white"
                        buttonStyle = {{backgroundColor: colors.secondary, marginRight: 10, marginBottom: 10 }}
                        onPress = {() => console.log("Implement")}
                        />
                        <Button
                        title = "Asian"
                        color = "white"
                        buttonStyle = {{backgroundColor: colors.secondary, marginRight: 10, marginBottom: 10 }}
                        onPress = {() => console.log("Implement")}
                        />
                        <Button
                        title = "Asian"
                        color = "white"
                        buttonStyle = {{backgroundColor: colors.secondary, marginRight: 10, marginBottom: 10 }}
                        onPress = {() => console.log("Implement")}
                        />
                        <Button
                        title = "Italian"
                        color = "white"
                        buttonStyle = {{backgroundColor: colors.secondary , marginRight: 10, marginBottom: 10}}
                        onPress = {() => console.log("Implement")}
                        />
                        <Button
                        title = "Indian"
                        color = "white"
                        buttonStyle = {{backgroundColor: colors.secondary, marginRight: 10, marginBottom: 10 }}
                        onPress = {() => console.log("Implement")}
                        />
                        <Button
                        title = "Asian"
                        color = "white"
                        buttonStyle = {{backgroundColor: colors.secondary, marginRight: 10, marginBottom: 10 }}
                        onPress = {() => console.log("Implement")}
                        />
                        <Button
                        title = "Asian"
                        color = "white"
                        buttonStyle = {{backgroundColor: colors.secondary, marginRight: 10, marginBottom: 10 }}
                        onPress = {() => console.log("Implement")}
                        />
                        <Button
                        title = "Italian"
                        color = "white"
                        buttonStyle = {{backgroundColor: colors.secondary , marginRight: 10, marginBottom: 10}}
                        onPress = {() => console.log("Implement")}
                        />
                        <Button
                        title = "Indian"
                        color = "white"
                        buttonStyle = {{backgroundColor: colors.secondary, marginRight: 10, marginBottom: 10 }}
                        onPress = {() => console.log("Implement")}
                        />
                        <Button
                        title = "Asian"
                        color = "white"
                        buttonStyle = {{backgroundColor: colors.secondary, marginRight: 10, marginBottom: 10 }}
                        onPress = {() => console.log("Implement")}
                        />
                    
                    </View>
                   
                   
                </View>
                <View style={styles.closeButton} >
                    <Button onPress={() => props.closeModal(false)} buttonStyle={styles.closeButtonStyle} icon={<Icon name='close' size={25} color='white' style={{backgroundColor: 'black', borderRadius:15, outline:"white solid 1px"}}/>} />
                </View>
                <View style={styles.checkout}>
                <View >
                    <Button
                    title = "Apply"
                    color = "#ACBD89"
                    buttonStyle = {{backgroundColor: colors.secondary, paddingLeft:10, marginBottom: 10, width:"100%" }}
                    onPress = {closeApply}
                    />
                    <Button
                    title = "Clear"
                    color = "#ACBD89"
                    buttonStyle = {{backgroundColor: colors.secondary, paddingLeft:10, width:"100%" }}
                    onPress = {Clear}
                    />
                    </View>
                    
                </View>
            </View>
        
    );
}


const styles = StyleSheet.create({
    container: {
        paddingTop: '10%',
        flex: 1,
        backgroundColor: colors.primary,
        minWidth: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column'
    },

    ratingsRow: {
        paddingLeft: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        paddingBottom: 10,
        

    },

    carouselItem: {
        width: '100%',
        height: '100%',
    },

    dots: {
        position: 'absolute',
        alignSelf: 'center',
        top: 305,
    },

    dotStyle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 0,
        backgroundColor: colors.black
    },

    closeButton:{
        alignSelf:'flex-end',
        position:'absolute',
        top:40,
        right: 0
    },

    closeButtonStyle: {
        backgroundColor: 'transparent',
    },
    
    minusButton: {
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: colors.secondary
    },
    text: {
        paddingLeft: 10,
        fontSize: 35,
        color: "black",
        fontWeight: 'bold',
        fontFamily: "Avenir",
    },
    textTop: {
        paddingTop: "10%",
        paddingLeft: 10,
        fontSize: 35,
        color: "black",
        fontWeight: 'bold',
        fontFamily: "Avenir",
    },
    plusButton: {
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: colors.secondary
    },

    plusButtonPadding: {
        paddingRight:10
    },
    divider: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: colors.secondary,
        height: 1
    }, 
    addToCartButton: {
        borderRadius:20,
        backgroundColor: colors.secondary,
        paddingLeft:10
    },

    addToCartText: {
        fontWeight: 'bold',
        paddingRight:10
    },

    buttonText: {
        fontWeight: 'bold'
    },

    cartPadding: {
        paddingLeft:10,
        paddingRight:10
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
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        paddingBottom: 20,
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
        fontWeight: 'bold',
        fontFamily: "Avenir",
    },

    price: {
        alignSelf: 'flex-end',
        fontSize: 30,
        padding: 10,
        color: colors.black,
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
        flexDirection: 'row',
    }
});

export default FilterPage;
