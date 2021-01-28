import React from "react";
import { View, StyleSheet, Image, Text, SafeAreaView, Linking } from "react-native";
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import MenuCard from "../components/dish";


import colors from "../config/colors";

function ChefScreen({ navigation }) {
  let tableHead = ['Dish Name', 'Price', 'Review']
  let tableTitle = ['Scramble Eggs', 'Chicken Tikka', 'Lobster', 'King Crab']
  let tableData = [
    [<Text style={{color: 'blue', textAlign:'center'}}
    onPress={() => Linking.openURL('https://www.bjsrestaurants.com/Pizookie')}>
    Pizookie
    </Text>, 
    '$2.00', 
    '1'],
    [<Text style={{color: 'blue', textAlign:'center'}}
    onPress={() => Linking.openURL('https://en.wikipedia.org/wiki/Sugar_cookie')}>
    Sugar Cookies
    </Text>, '$3.00', '2'],
    [<Text style={{color: 'blue', textAlign:'center'}}
    onPress={() => Linking.openURL('https://www.foodnetwork.com/recipes/banana-bread-recipe-1969572')}>
    Banana Bread
    </Text>, '$4.00', '3'],
    [<Text style={{color: 'blue', textAlign:'center'}}
    onPress={() => Linking.openURL('https://cafedelites.com/chocolate-cake/')}>
    Chocolate Cake
    </Text>, '$5.00', '4']
  ]
  return (

    
    <SafeAreaView style={styles.container}> 
      <View style={styles.chefPicHolder}>
                <Image style={styles.chefPic} source={{uri: 'https://yt3.ggpht.com/ytc/AAUvwnhSeGCbeHJD09S7X-Qo8yuQKJqYdHa85OqkBDzSmg=s900-c-k-c0x00ffffff-no-rj'}}/>
                <Text style={styles.chefName}>Gordon Ramsay</Text>
                <Text style={styles.chefBio}>My name is Gordon, I like cooking. I own several 5 star restaurants around the world, please buy my banana bread.</Text>
                
        <Table style={styles.tableHolder} borderStyle={{borderWidth: 1}}>
          <Row data={tableHead} flexArr={[3, 2, 2]} style={styles.head} textStyle={styles.text}/>
          <TableWrapper style={styles.wrapper}>
            <Rows data={tableData} flexArr={[3,2, 2]} style={styles.row} textStyle={styles.text}/>
          </TableWrapper>
        </Table>
      </View>  
      {/* <View style={styles.tableHolder}>
        
      </View> */}
      


      {/* <MenuCard
        title={"Spaghetti"}
        subtitle={"Chef Remy"}
        image={require("../assets/potluck_logo_small.jpg")}
        description={"Classic spaghetti recipe with marinara sauce!"}
        rating={4.5}
        price={"$10.11"}
        onPress={() => navigation.push("Details")}
      /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },

  logo: {
    width: 50,
    height: 50
  },

  chefPic: {
    width: 200,
    height: 200
  },

  logoContainer: {
    position: "absolute",
    top: "5%",
    alignItems: "center"
  },

  chefPicHolder: {
    position: "absolute",
    top: "5%",
    alignItems: "center",
    width: '90%'
  },
  tableHolder: {
    position: "relative",
    top: '9%',
    alignItems: "center",
  },

  chefName: {
    fontSize: 50,
    color: "white",
    fontWeight: "bold",
    fontFamily: "Verdana",
    top: '5%'

  },
  head: {  height: 40,  backgroundColor: '#f1f8ff'},
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: {  height: 28  },
  text: { textAlign: 'center' },
  chefBio: {
    fontSize: 20,
    color: "white",
    fontFamily: "Verdana",
    top: '5%',
    textAlign: 'center'

  }
});

export default ChefScreen;