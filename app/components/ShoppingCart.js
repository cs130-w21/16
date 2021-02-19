import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Card, Button } from "react-native-elements";
import colors from "../config/colors";
import PropTypes, { any } from "prop-types";

global.cart = [];

export function cartSum() {
  let sum = 0;
  global.cart.forEach(item => (sum += item.count));
  return sum;
}

export function addToCart(item) {
  global.cart.push(item);
}

export function addQuantity(index, count) {
  global.cart[index].count += count;
}

function CartCard(props) {
  const [total, setTotal] = useState(props.price);
  const [count, setCount] = useState(props.quantity);

  function remove(count, setCount) {
    const found = global.cart.findIndex(
      item => item["dish"]["dishid"] == props.dishid
    );
    if (count > 1) {
      setCount(count - 1);
      global.cart[found].count--;
    } else {
      //remove from array so that the card doesn't show up
      //item count == 0
      global.cart.splice(found, 1);
      setCount(0);
    }
  }

  useEffect(() => {
    setTotal(count * props.price);
  }, [count]);

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.cardContainer}>
        <Card.Title>
          <Text style={styles.title}>{props.title}</Text>
        </Card.Title>
        <Card.Divider />
        <View style={styles.cardlayout}>
          <View style={styles.horizontal}>
            <View style={styles.checkout}>
              <Button
                type="solid"
                title=" - "
                onPress={() => {
                  remove(count, setCount);
                }}
                titleStyle={styles.buttonText}
                buttonStyle={styles.minusButton}
              />
              <Text style={styles.quantity}>{count}</Text>
              <Button
                type="solid"
                style={styles.plusButtonPadding}
                title=" + "
                onPress={() => {
                  setCount(count + 1);
                  const found = global.cart.findIndex(
                    item => item["dish"]["dishid"] == props.dishid
                  );
                  global.cart[found].count++;
                }}
                titleStyle={styles.buttonText}
                buttonStyle={styles.plusButton}
              />
            </View>
          </View>
          <View style={styles.horizontal}>
            <Text style={styles.text}>
              {count} x ${props.price} each =
            </Text>
            <Text style={styles.price}>${total}</Text>
          </View>
        </View>
      </Card>
    </View>
  );
}

export default function ShoppingCart(props) {
  const [cart, setCart] = useState(global.cart); //constantly updated

  useEffect(() => {
    setCart(global.cart);
  }, [props.cart]);

  return (
    <View style={styles.container}>
      <ScrollView>
        {cart.length == 0 ? (
          <Text style={styles.empty}>No items yet!</Text>
        ) : (
          cart.map(item => (
            <CartCard
              key={item["dish"]["name"]}
              title={item["dish"]["name"]}
              quantity={item["count"]}
              price={item["dish"]["price"]}
              dishid={item["dish"]["dishid"]}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

ShoppingCart.propTypes = {
  cart: PropTypes.array,
  navigation: any
};

CartCard.propTypes = {
  title: PropTypes.string,
  quantity: PropTypes.number,
  price: PropTypes.number,
  dishid: PropTypes.number
};

const styles = StyleSheet.create({
  container: {
    width: "100%"
  },
  cardContainer: {
    alignItems: "flex-end",
    alignContent: "stretch",
    height: 125
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16
  },
  text: {
    paddingVertical: 4,
    textAlign: "center",
    color: colors.primary
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  price: {
    fontSize: 20,
    alignSelf: "center",
    paddingVertical: 2,
    color: colors.black,
    fontWeight: "bold"
  },
  horizontal: {
    width: "50%",
    justifyContent: "space-around",
    alignItems: "stretch"
  },
  cardlayout: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row"
  },
  quantity: {
    fontWeight: "800",
    fontSize: 20,
    textAlign: "center",
    paddingHorizontal: 8,
    paddingVertical: 0
  },
  buttonText: {
    fontWeight: "bold"
  },
  plusButton: {
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors.secondary
  },

  plusButtonPadding: {
    paddingRight: 10
  },
  checkout: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row"
  },
  minusButton: {
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: colors.secondary
  },
  empty: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    padding: 20
  }
});
