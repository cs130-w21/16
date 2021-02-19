import React, { Component, View } from "react";
import { Header, Icon, Badge } from "react-native-elements";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { cartSum } from "./ShoppingCart";
import colors from "../config/colors";

class RightElement extends Component {
  constructor(props) {
    super(props);
    this.state = { sum: cartSum() };
  }
  render() {
    const { navigation } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          console.log("CART");
          navigation.navigate("ShoppingCart");
          this.setState({ sum: cartSum() });
        }}
      >
        <Icon name="shopping-cart" color="white" />
        {cartSum() > 0 ? (
          <Badge
            status="error"
            containerStyle={{ position: "absolute", top: -4, right: -4 }}
          />
        ) : (
          <></>
        )}
      </TouchableOpacity>
    );
  }
}

class LeftElement extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <Icon
        name="search"
        color="white"
        onPress={() => {
          console.log("SEARCH");
          navigation.navigate("Search");
        }}
      />
    );
  }
}

class CenterElement extends Component {
  render() {
    return <Text style={styles.title}>POTLUCK</Text>;
  }
}

class CartElement extends Component {
  render() {
    return <Text>Shopping cart</Text>;
  }
}
class NavBarComponent extends Component {
  render() {
    return (
      <Header
        containerStyle={{ backgroundColor: colors.primary }}
        leftComponent={<LeftElement navigation={this.props.navigation} />}
        centerComponent={<CenterElement />}
        rightComponent={<RightElement navigation={this.props.navigation} />}
        barStyle="light-content"
      />
    );
  }
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
