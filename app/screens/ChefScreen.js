import React, {useState} from 'react';
import {Dimensions, Image, Modal, ScrollView, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {Button, Icon, Divider} from 'react-native-elements'
import Carousel, {Pagination} from 'react-native-snap-carousel';
import colors from '../config/colors';
import { Linking } from "react-native";
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

const SLIDER_WIDTH = Dimensions.get('window').width
const ITEM_WIDTH = Math.round(SLIDER_WIDTH)


const CarouselCardItem = ({ item, index }) => {
    return (
        <Image
          source={item.image}
          style={styles.carouselItem}
        />
    )
}

function ChefScreen(props) {
    function onPress(){
        props.navigation.push("DishPage", {
            carouselData: [{image: require('../assets/spaghetti.jpg')}, {image: require('../assets/spaghetti2.jpg')}], //REPLACE WITH ACTUAL IMAGES
            name: "spaghetti",
            price: "5",
            time: "1 hour", //REPLACE WITH ACTUAL TIME
            description: "Spaghetti is a long, thin, solid, cylindrical noodle pasta. It is a staple food of traditional Italian cuisine. Like other pasta, spaghetti is made of milled wheat and water and sometimes enriched with vitamins and minerals. Italian spaghetti is typically made from durum wheat semolina.",
            ingredients: "flour, tomatoes, basil, parmesan cheese, salt, pepper" //REPLACE WITH ACTUAL INGREDIENTS
        })
      }






    const [count, setCount] = useState(0);
    const [modalVisible, setVisible] = useState(true);
    const [index, setIndex] = React.useState(0)
    const isCarousel = React.useRef(null)
    let carouselData = carouselData=[{image: { uri: 'https://i0.wp.com/www.eatthis.com/wp-content/uploads/2019/01/healthy-spaghetti-spicy-tomato-sauce.jpg?resize=1250%2C702&ssl=1' }}, {image: { uri: 'https://i0.wp.com/www.eatthis.com/wp-content/uploads/2019/01/healthy-spaghetti-spicy-tomato-sauce.jpg?resize=1250%2C702&ssl=1' }}]
    let name="Gordon Ramsay" 
    let time="1 hour" 
    let description="My name is Gordon, I like cooking. I own several 5 star restaurants around the world, please buy my banana bread." 
    let ingredients="flour, tomatoes, basil, parmesan cheese, salt, pepper"
    let tableHead = ['Dish Name', 'Price', 'Review']
  
    let tableData = [
        [<Text style={{color: 'blue', textAlign:'center'}}
        onPress={onPress}>
        Pizookie
        </Text>, 
        '$2.00', 
        '1'],
        [<Text style={{color: 'blue', textAlign:'center'}}
        onPress={onPress}>
        Sugar Cookies
        </Text>, '$3.00', '2'],
        [<Text style={{color: 'blue', textAlign:'center'}}
        onPress={onPress}>
        Banana Bread
        </Text>, '$4.00', '3'],
        [<Text style={{color: 'blue', textAlign:'center'}}
        onPress={onPress}>
        Chocolate Cake
        </Text>, '$5.00', '4'],
        [<Text style={{color: 'blue', textAlign:'center'}}
        onPress={onPress}>
        Banana Bread
        </Text>, '$4.00', '3'],
        [<Text style={{color: 'blue', textAlign:'center'}}
        onPress={onPress}>
        Banana Bread
        </Text>, '$4.00', '3'],
        [<Text style={{color: 'blue', textAlign:'center'}}
        onPress={onPress}>
        Banana Bread
        </Text>, '$4.00', '3'],
        [<Text style={{color: 'blue', textAlign:'center'}}
        onPress={onPress}>
        Banana Bread
        </Text>, '$4.00', '3'],
        [<Text style={{color: 'blue', textAlign:'center'}}
        onPress={onPress}>
        Banana Bread
        </Text>, '$4.00', '3'],
        [<Text style={{color: 'blue', textAlign:'center'}}
        onPress={onPress}>
        Banana Bread
        </Text>, '$4.00', '3'],
        [<Text style={{color: 'blue', textAlign:'center'}}
        onPress={onPress}>
        Banana Bread
        </Text>, '$4.00', '3'],
        [<Text style={{color: 'blue', textAlign:'center'}}
        onPress={onPress}>
        Banana Bread
        </Text>, '$4.00', '3'],
        [<Text style={{color: 'blue', textAlign:'center'}}
        onPress={onPress}>
        Banana Bread
        </Text>, '$4.00', '3'],
        [<Text style={{color: 'blue', textAlign:'center'}}
        onPress={onPress}>
        Banana Bread
        </Text>, '$4.00', '3'],
        [<Text style={{color: 'blue', textAlign:'center'}}
        onPress={onPress}>
        Banana Bread
        </Text>, '$4.00', '3'],
        [<Text style={{color: 'blue', textAlign:'center'}}
        onPress={onPress}>
        Banana Bread
        </Text>, '$4.00', '3'],
        [<Text style={{color: 'blue', textAlign:'center'}}
        onPress={onPress}>
        Banana Bread
        </Text>, '$4.00', '4']
    ]

    return(
        
        <SafeAreaView style={styles.container}>
            <SafeAreaView style={styles.images}>

                <SafeAreaView style={styles.image}>
                    <Carousel
                        layout='default'
                        data={carouselData}
                        useScrollView={true}
                        renderItem={CarouselCardItem}
                        sliderWidth={SLIDER_WIDTH}
                        itemWidth={ITEM_WIDTH}
                        onSnapToItem={(index) => setIndex(index)}
                        useScrollView={true}
                        ref={isCarousel}
                        />
                    <View style={styles.border}>

                    </View>
                </SafeAreaView>
                <SafeAreaView style={styles.chefPicHolder}>
                    <Image style={styles.chefPic} source={{uri: 'https://yt3.ggpht.com/ytc/AAUvwnhSeGCbeHJD09S7X-Qo8yuQKJqYdHa85OqkBDzSmg=s900-c-k-c0x00ffffff-no-rj'}}/>
                </SafeAreaView>
            </SafeAreaView>
            <View style={styles.closeButton} >
                    <Button onPress={() => props.navigation.goBack()} buttonStyle={styles.closeButtonStyle} icon={<Icon name='close' type="simple-line-icon" size={30} color='white'/>} />
                </View>

            
              
           
            <SafeAreaView style={styles.textContainer}>  
                <Text style={styles.titleText}>{name}</Text>
                    <Divider style={styles.divider} /> 
                <ScrollView> 
                        <Text style={styles.descriptionText}>{description}</Text>
                        <Divider style={styles.divider} />
                        <Table style={styles.tableHolder} borderStyle={{borderWidth: 1}}>
                            <Row data={tableHead} flexArr={[3, 2, 2]} style={styles.head} textStyle={styles.text}/>
                            <TableWrapper style={styles.wrapper}>
                                <Rows data={tableData} flexArr={[3,2, 2]} style={styles.row} textStyle={styles.text}/>
                            </TableWrapper>
                        </Table>   
                    {/* <View style={styles.holder}>

                    </View>           */}
                </ScrollView>   
            </SafeAreaView>

           
        </SafeAreaView>

        
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        minWidth: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column'
    },

    holder: {
        height: 100
    },

    carouselItem: {
        width: '100%',
        height: '100%',
    },

    dots: {
        position: 'absolute',
        alignSelf: 'center',
        top: 263,
    },

    dotStyle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 0,
        backgroundColor: colors.black
    },


    
  
  

    textContainer: {
        flex: 5,
        backgroundColor: "white",
        width: '100%',
        alignItems: 'center',
        textAlign: 'center'
    },

    images: {
        flex: 4,
        justifyContent: 'center',
        width: "100%",
        height: "40%",

        
    },
    
    title: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%'
    },
    
    divider: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: colors.secondary,
        height: 1
    }, 
    closeButton:{
        alignSelf:'flex-end',
        position:'absolute',
        top:40,
        right: 0,
    },

    closeButtonStyle: {
        backgroundColor: 'transparent',

    },
    titleText: {
        fontSize: 30,
        padding: 10,
        color: "black",
        fontWeight: 'bold',
        fontFamily: "Avenir",
        alignSelf: "center"
    },
    border: {
        backgroundColor: colors.primary,
        height: 30
    },
    countStyle: {
        fontSize: 20,
        padding: 10,
        color: "white",
        height: 40,
        fontWeight: 'bold',
        fontFamily: "Avenir",
    },


    descriptionText: {
        fontSize: 20,
        padding: 10,
        color: "gray",
        fontFamily: "Avenir",
    },
    
    chefPic: {
      width: 150,
      height: 150,

      borderRadius: 70
    },
    chefPicHolder: {
      position: "relative",
      top: -95,
      alignItems: "center",
    },
    
    head: {  height: 40,  backgroundColor: '#f1f8ff'},
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: {  height: 28  },
    text: { textAlign: 'center' },
    tableHolder: {
      position: "relative",
      width: "90%",
      left: "5%",
      right:"5%",
      alignItems: "center",
      justifyContent: "center"
    }


});

export default ChefScreen;