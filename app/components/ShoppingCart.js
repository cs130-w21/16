import React, { useEffect, useState } from "react";
import { Alert, View, StyleSheet, Text, ScrollView } from "react-native";
import { Card, Button } from "react-native-elements";
import colors from "../config/colors";
import PropTypes, { any } from "prop-types";

global.cart = [];
global.orderOpen = false;
global.orders = null;
global.progress = {};

export { cartSum, getDishes, isolateChefs, dishesPerChef, removeChef, addToCart, addQuantity, subTotal, getLongestTime, getLongestTimeForChefinMin, getLongestTimeForChef};

/**
 * Calculate sum of items in shopping cart
 * @memberof ShoppingCart
 * @returns number
 */
function cartSum() {
  let sum = 0;
  global.cart.forEach(item => (sum += item.count));
  return sum;
}


/**
 * Convert array of dishes into string
 * @memberof ShoppingCart
 * @param {Array} dishes 
 * @returns string
 */
function getDishes(dishes) {
  var dishString = "";
  dishes.forEach(item => (dishString += item + " | "));
  return dishString;
}

/**
 * Get all chefs of items in shopping cart
 * @memberof ShoppingCart
 * @returns {Object} pairs {chef, [dish strings]}
 */
function isolateChefs() {
  var pairs = {};
  global.cart.forEach(item => {
    if (!(item.dish["Chef"]["name"] in pairs)) {
      let chefEntry = item.dish["Chef"]["name"];
      pairs[chefEntry] = [];
      let string = item.count + " " + item.dish["name"];
      pairs[chefEntry].push(string);
    } else {
      let chefEntry2 = item.dish["Chef"]["name"];
      let string = item.count + " " + item.dish["name"];
      pairs[chefEntry2].push(string);
    }
  });
  return pairs;
}

/**
 * Get dishes for each chef
 * @memberof ShoppingCart
 * @returns {Object} pairs - {chef, [dishes]}
 */
function dishesPerChef() {
  var pairs = {};
  global.cart.forEach(item => {
    if (!(item.dish["Chef"]["name"] in pairs)) {
      let chefEntry = item.dish["Chef"]["name"];
      pairs[chefEntry] = [];
      pairs[chefEntry].push(item);
    } else {
      let chefEntry2 = item.dish["Chef"]["name"];
      pairs[chefEntry2].push(item);
    }
  });
  return pairs;
}

/**
 * Remove chef from orders
 * @memberof ShoppingCart
 * @param {Chef} chef 
 */
function removeChef(chef){
  global.orders.removeChef(chef);
}

/**
 * Add item to cart
 * @memberof ShoppingCart
 * @param {Dish} item 
 */
function addToCart(item) {
  global.cart.push(item);
}

/**
 * Add quantity to cart (can be positive or negative)
 * @memberof ShoppingCart
 * @param {number} index 
 * @param {number} count 
 */
function addQuantity(index, count) {
  global.cart[index].count += count;
}

/**
 * Calculate subtotal for shopping cart
 * @memberof ShoppingCart
 * @returns number
 */
function subTotal() {
  let tot = 0.0;
  global.cart.forEach(item => (tot += item.dish.price * item.count));
  return tot.toFixed(2);
}

/**
 * Get longest preparation time of items in cart
 * @memberof ShoppingCart
 * @returns number
 */
function getLongestTime() {
  let max = 0;
  global.cart.forEach(item =>
    item.dish.timeMin > max ? (max = item.dish.timeMin) : (max = max)
  );

  if (max < 60) {
    return max + " minutes";
  } else {
    if (max % 60 === 0) {
      return (
        Math.floor(max / 60) + " hour" + (Math.floor(max / 60) == 1 ? "" : "s")
      );
    } else {
      return (
        Math.floor(max / 60) +
        " hour" +
        (Math.floor(max / 60) == 1 ? " " : "s ") +
        (max % 60) +
        " minutes"
      );
    }
  }
}

/**
 * Get longest preparation time for each chef in minutes
 * @memberof ShoppingCart
 * @param {Chef} chef 
 */
function getLongestTimeForChefinMin(chef) {
  let max = 0;
  global.cart.forEach(item =>
    item.dish.Chef.name == chef && item.dish.timeMin > max ? (max = item.dish.timeMin) : (max = max)
  );
  return max;
}

/**
 * Get longest time for each chef
 * @memberof ShoppingCart
 * @param {Chef} chef 
 */
function getLongestTimeForChef(chef) {
  let max = 0;
  global.cart.forEach(item =>
    item.dish.Chef.name == chef && item.dish.timeMin > max ? (max = item.dish.timeMin) : (max = max)
  );

  if (max < 60) {
    return max + " minutes";
  } else {
    if (max % 60 === 0) {
      return (
        Math.floor(max / 60) + " hour" + (Math.floor(max / 60) == 1 ? "" : "s")
      );
    } else {
      return (
        Math.floor(max / 60) +
        " hour" +
        (Math.floor(max / 60) == 1 ? " " : "s ") +
        (max % 60) +
        " minutes"
      );
    }
  }
}

/**
 * 
 * @typedef CartCardProps
 * @memberof ShoppingCart
 * @property {price} price of dish
 * @property {quantity} amount of dish
 * @property {dishid} ID of dish 
 * @property {title} title of dish
 * @property {cart} shopping cart copy
 */
/**
 * Shopping cart card for dish
 * @class CartCard
 * @memberof ShoppingCart
 * @param {CartCardProps} props - Props for CardCard
 */
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
      setCount(0);
      global.cart[found].count = 0;
    }
  }

  useEffect(() => {
    setTotal(count * props.price);
  }, [count]);

  useEffect(() => {
    const found = global.cart.findIndex(
      item => item["dish"]["dishid"] == props.dishid
    );
    if (found >= 0 && count <= 0) {
      global.cart.splice(found, 1);
    }
    return () => {
      const found = global.cart.findIndex(
        item => item["dish"]["dishid"] == props.dishid
      );
      if (found >= 0 && count <= 0) {
        global.cart.splice(found, 1);
      }
    };
  }, []);

  return count == 0 ? (
    <View style={styles.cartCardContainer}>
      <Text style={styles.empty}>Item Removed</Text>
    </View>
  ) : (
    <View style={styles.cartCardContainer}>
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

/**
 * 
 * @typedef ShoppingCartProps
 * @memberof ShoppingCart
 * @property {cart} shopping cart copy
 */
/**
 * Shopping Cart object
 * @class ShoppingCart
 * @param {ShoppingCartProps} props 
 */
function ShoppingCart(props) {
  const [cart, setCart] = useState(global.cart);

  useEffect(() => {
    setCart(global.cart);
  }, [props.cart]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
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
        <View style={{height: 150}}/>
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
    width: "100%",
  },
  cartCardContainer: {
    width: "100%",
  },
  cardContainer: {
    alignItems: "flex-end",
    alignContent: "stretch",
    height: 125,
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
    flexDirection: "row",
  },
  minusButton: {
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: colors.secondary
  },
  scrollView: {
    width: "100%",
  },
  empty: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    padding: 20
  },
  checkoutTab: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    height: "7%",
    position: "absolute",
    bottom: 0
  },
  checkoutButton: {
    borderRadius: 20,
    backgroundColor: colors.secondary
  },
  checkoutText: {
    fontWeight: "bold"
  }
});
export default ShoppingCart;