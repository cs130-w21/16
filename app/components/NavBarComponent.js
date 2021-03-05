import React, { Component, useCallback, useEffect, useState, View } from "react";
import { Header, Icon, Badge } from "react-native-elements";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { cartSum } from "./ShoppingCart";
import colors from "../config/colors";

function RightElement(props) {
  const [sum, setSum] = useState(cartSum());

  const {navigation, search} = props;
  if (search)  //if its on the search screen the right element has to be the map icon
  {
    return (
      <Icon
        name="location-pin"
        type="simple-line-icon"
        color="white"
        onPress={() => {
          navigation.navigate("MapScreen");
        }}
      />
    )
  }
  else
  {

    return (
      !global.orderOpen ? 
      <TouchableOpacity
        onPress={() => {
          if(global.orderOpen){
            navigation.navigate("Tracking");
          } else {
            navigation.navigate("ShoppingCart");
          }
          setSum(cartSum());      }}
      >
        <Icon name="shopping-cart" color="white" />
        {cartSum() > 0 ? (
          <Badge
            containerStyle={{ position: "absolute", top: -4, right: -4 }}
            badgeStyle={{ backgroundColor: colors.secondary }}
          />
        ) : (
          <></>
        )}
      </TouchableOpacity>
      :
      <TouchableOpacity
        onPress={() => {
          if(global.orderOpen){
            navigation.navigate("Tracking");
          } else {
            navigation.navigate("ShoppingCart");
          }
        }}
      >
        <Icon name='shopping-cart' color='white'/>
        <Badge
              containerStyle={{ position: "absolute", top: -4, right: -4 }}
              badgeStyle={{ backgroundColor: colors.secondary }}
        />
      </TouchableOpacity>
    );
  }

}

class LeftElement extends Component {
  render() {
    const { navigation, search } = this.props;
    if (search == null) {
      return (
        <Icon
          name="search"
          color="white"
          onPress={() => {
            navigation.navigate("Search");
          }}
        />
      );
    } else {
      return (
        <Icon
          name="arrow-left"
          type="simple-line-icon"
          color="white"
          onPress={() => {
            navigation.navigate("FeaturedMenuScreen");
          }}
        />
      );
    }
  }
}

class CenterElement extends Component {
  render() {
    return <Text style={styles.title}>POTLUCK</Text>;
  }
}

function NavBarComponent(props){
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setRefresh(!refresh);
  }, [global.cart])

  useEffect(() => {
    setRefresh(!refresh);
  }, [global.orderOpen])

  return (
    <Header
      containerStyle={{ backgroundColor: colors.primary }}
      leftComponent={
        <LeftElement
          navigation={props.navigation}
          search={props.search}
        />
      }
      centerComponent={<CenterElement />}
      rightComponent={<RightElement navigation={props.navigation} search={props.search} />}

      barStyle="light-content"
    />
  );
}

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontFamily: "Avenir",
    fontWeight: "bold",
    fontSize: 20
  }
});

export default NavBarComponent;
