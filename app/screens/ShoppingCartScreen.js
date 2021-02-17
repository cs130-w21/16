import React, { Component, useCallback, useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  RefreshControl,
  SafeAreaView
} from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ButtonGroup } from "react-native-elements";
import colors from "../config/colors";
import NavBarComponent from "../components/NavBarComponent";
import MenuCard from "../components/dish";
import { getAvailableDishes, getChefs } from "../util/Queries";
import ChefRecList from "../components/chefRecList";
import Dish from "../objects/Dish";
import ShoppingCart from "../components/ShoppingCart";

function dishCard(content, navigation) {
  return (
    <MenuCard key={content.dishid} Dish={content} navigation={navigation} />
  );
}

class Cards extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.dishes == null) {
      return <Text>LOADING</Text>;
    } else {
      var arr = [];
      for (i = 0; i < this.props.dishes.length; i++) {
        arr.push(dishCard(this.props.dishes[i], this.props.navigation));
      }
      return arr;
    }
  }
}

function ShoppingCartScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
      <ShoppingCart></ShoppingCart>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background
  },
  ScrollView: {
    marginBottom: 20
  },
  buttonGroup: {
    backgroundColor: colors.secondary
  }
});

export default ShoppingCartScreen;
