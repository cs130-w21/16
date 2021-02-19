import React, { Component, useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet } from "react-native";
import colors from "../config/colors";
import ShoppingCart from "../components/ShoppingCart";

function ShoppingCartScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
      <ShoppingCart cart={global.cart}></ShoppingCart>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background
  }
});

export default ShoppingCartScreen;
