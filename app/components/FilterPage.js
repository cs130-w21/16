import React, {useState, useEffect} from 'react';
import { LogBox } from 'react-native';
import {Dimensions, Image, Modal, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, Icon, Divider, Header} from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import colors from '../config/colors';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { ShadowPropTypesIOS } from 'react-native';
import { relativeTimeRounding } from 'moment';


const SLIDER_WIDTH = Dimensions.get('window').width
const ITEM_WIDTH = Math.round(SLIDER_WIDTH)





function FilterPage(props) {
    LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

    const [pricePressed,setPrice] = useState([false,false,false])
    let categories = ['American','Asian','Baked Goods', 'Chinese','Dessert','Indian','Italian','Japanese','Korean','Mediterranean','Mexican','Thai','Vietnamese']
    let initial = []
    for (let i=0;i<categories.length;i++)
    {
        initial.push(false)
    }
    const [categoriesArr,setCategories]=useState(initial)

    function closeApply() {
        props.update()
        props.closeModal(false)
    }

    useEffect(() => {

        let temp = []
        let tempCategories = []
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
        for (let i=0;i<props.categoriesArr.length;i++)
        {
            if (props.categoriesArr[i])
            {
                tempCategories.push(true)
            }
            else
            {
                tempCategories.push(false)
            }
        }
        setPrice(temp)
        setCategories(tempCategories)
    }, [])
    
    
   function handleTimePress(buttonNum)
   {

        let timeFilter = []
        let timeHolder= {0:[0,30],1:[0,60],2:[0,120],3:[0,100000000000000]}
        let retHolder = -1
        for (let i=0;i<4;i++)
        {
            if (buttonNum==i || (props.timeFilter[i] && buttonNum ==5) ) 
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
    function colorTellerCategories(buttonNum)
    {
        if (categoriesArr[buttonNum]==false)
            return colors.secondary
        return colors.primary
    }

    function retCategoryButtons(buttonNum)
    {
        return (
        <Button
        title = {categories[buttonNum]}
        buttonStyle = {{backgroundColor: colorTellerCategories(buttonNum) , marginRight: 10, marginBottom: 10}}
        onPress = {() => handleCategoryPress(buttonNum)}
        />
        )

    }
    function handleCategoryPress(buttonNum)
    {
        let tempCategories = categoriesArr
        let holder = tempCategories[buttonNum]
        tempCategories[buttonNum]= !(holder)
        var removeAll = (keys, arr) => {for (prop of keys) arr.delete(prop); return arr};
        setCategories(tempCategories)
        props.setCategoriesArr(tempCategories)
        
        let tempSet = props.categoriesSet
        if (holder)
        {
            
            tempSet.delete(categories[buttonNum])
        }
        else
        {
            tempSet.add(categories[buttonNum])
        }
        props.setCategoriesSet(tempSet)
        handleTimePress(5)
        
            

    }
    function retAllButtons()
    {
        let buttons = []
        for (let i=0;i<categories.length;i++)
        {
            
            buttons.push(retCategoryButtons(i))
        }
        return buttons
    }


    function Clear() {
        props.setRatingFilter([false,false,true])
        props.setPriceFilter([false,false,false])
        props.setPrices([0,100000000000])
        setPrice([false,false,false])
        props.setTimeFilter([false,false,false,true])
        props.setTime([0,10000000000000000])
        let initial = []
        for (let i=0;i<categories.length;i++)
        {
            initial.push(false)
        }
        props.setCategoriesArr(initial)
        setCategories(initial)
        props.setCategoriesSet(new Set())
        
    }

    return(
            <View style={styles.container}>
               
               <Header
                            containerStyle={styles.headerContainer}
                            centerComponent={<View style={{flexDirection: 'column'}}><Text style={styles.header}>Filter</Text></View>}
                            rightComponent={<Button onPress={() => props.closeModal(false)} containerStyle={styles.buttonContainer} buttonStyle={styles.closeButtonStyle} icon={<Icon name='close' size={25} color='black' style={{backgroundColor: 'white', borderRadius:15, outline:"black solid 2px"}}/>} />}
                            
                />
                
            <View style={styles.applyContainer}>
                <Button title = "Clear" buttonStyle = {{backgroundColor: 'transparent',alignSelf: 'flex-end'}}  titleStyle = {{fontFamily: 'Avenir', color: "black", fontSize:20}} onPress = {Clear} />
                <ScrollView>  
                 <View style={{alignItems:'flex-start'}}>
                    <Text style = {styles.text}>Sort By Rating</Text>   
                    
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
                    
                    <Text style={styles.text}>Time</Text>
                    <View style={styles.ratingsRow}>
                        <Button
                        title = "< 30 Min."
                        color = "white"
                        buttonStyle = {{backgroundColor: colorTellerTime(0) , marginRight: 10, marginBottom:10}}
                        onPress = {() => handleTimePress(0)}
                        />
                        <Button
                        title = "< 60 Min."
                        color = "white"
                        buttonStyle = {{backgroundColor: colorTellerTime(1), marginRight: 10, marginBottom:10 }}
                        onPress = {() => handleTimePress(1)}
                        />
                        <Button
                        title = "< 120 Min."
                        color = "white"
                        buttonStyle = {{backgroundColor: colorTellerTime(2), marginRight: 10 , marginBottom:10}}
                        onPress = {() => handleTimePress(2)}
                        />
                         <Button
                        title = "All"
                        color = "white"
                        buttonStyle = {{backgroundColor: colorTellerTime(3) , marginRight: 10}}
                        onPress = {() => handleTimePress(3)}
                        />
                    </View>
                    <Text style={styles.text}>Categories</Text> 
                    <View style={styles.ratingsRow}>
                        {retAllButtons()}
                    </View>
                
                    </View>
                    </ScrollView>   

                    <Button
                        title = "Apply"
                        buttonStyle = {{justifyContent:'center', backgroundColor: 'transparent', paddingBottom: '2%'}}
                        titleStyle = {{fontFamily: 'Avenir', color: "black", fontSize:20}}
                        onPress = {closeApply}
                    />
                    <Divider style={styles.divider}></Divider>
                    
                
                        
                   
            </View>
 
            </View>
        
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        minWidth: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        borderRadius: 30
    },

    ratingsRow: {
        paddingLeft: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        paddingBottom: 20,
        

    },
    
    bottom: {
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: "100%"
        
    },
    
   
    closeButton:{
        alignSelf:'flex-start',
        position:'absolute',
        flexDirection: 'row',
        top:0,
        left: 0,
    },

    closeButtonStyle: {
        backgroundColor: 'transparent',
    },
 
    text: {
        paddingLeft: 10,
        fontSize: 20,
        color: "black",
        fontWeight: 'bold',
        fontFamily: "Avenir",
        marginBottom: 10
    },
    

    buttonContainer: {
        alignSelf: 'flex-end'
    },

    applyContainer: {
        flex: 5,
        backgroundColor: "white",
        paddingTop: "2%",
        width: '100%',
        alignItems: 'center',
        flexDirection: 'column',
        borderRadius: 20
    },

   
    divider: {
        alignSelf: 'center',
        backgroundColor: colors.secondary,
        height: 1
    }, 

    headerContainer:{
        backgroundColor: colors.primary, 
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    header:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24,
        alignSelf: 'center',
        marginTop: 5,
        fontFamily: 'Avenir',
    }

});

export default FilterPage;
