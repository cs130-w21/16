import React, { useEffect, useState } from "react";
import { LogBox } from "react-native";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  Alert
} from "react-native";
import { Button, Icon, Divider, Rating } from "react-native-elements";
import { color } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Reviews from "../components/Reviews";
import colors from "../config/colors";
import { getNDishReviews } from "../util/Queries";
import { addToCart, addQuantity } from "../components/ShoppingCart";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH);

function remove(count, setCount) {
  if (count > 0) {
    setCount(count - 1);
  }
}
function close(setVisible, hideModal) {
  setVisible(false);
  hideModal();
}
const CarouselCardItem = ({ item, index }) => {
  return <Image source={item.image} style={styles.carouselItem} />;
};
function DishPage(props) {
  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state"
  ]);

  const [count, setCount] = useState(0);
  const [modalVisible, setVisible] = useState(false);
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);
  const [first5Reviews, setFirst5Reviews] = useState(null);

  useEffect(() => {
    getNDishReviews(props.Dish.dishid, 5)
      .then(
        function(results) {
          setFirst5Reviews(results);
        },
        () => {
          console.log("Error in useEffect getNDishReviews");
        }
      )
      .catch(err => {
        console.log("use Effect Err Get N Dish Reviews: ", err);
      });
  }, []);

  useEffect(() => {
    setVisible(props.visible);
  });

  let carouselData = [];
  if (props.Dish.imagesURLs != null) {
    props.Dish.imagesURLs.forEach(imageURL => {
      if (imageURL != null) {
        carouselData.push({ image: { uri: imageURL } });
      }
    });
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      swipeDirection="down"
      onRequestClose={() => {
        close(setVisible, props.hideModal);
      }}
    >
      <View style={styles.modalContainer}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
        >
          <View style={styles.modalView}>
            <View style={styles.carouselContainer}>
              <Carousel
                layout="default"
                data={carouselData}
                useScrollView={true}
                renderItem={CarouselCardItem}
                sliderWidth={ITEM_WIDTH}
                sliderHeight={Math.round(ITEM_WIDTH * (3.0 / 4.0))}
                itemWidth={ITEM_WIDTH}
                itemHeight={Math.round(ITEM_WIDTH * (3.0 / 4.0))}
                onSnapToItem={index => setIndex(index)}
                useScrollView={true}
                ref={isCarousel}
              />
            </View>
            <Divider style={styles.divider2} />
            <View style={styles.textContainer}>
              <View style={styles.title}>
                <Text style={styles.titleText}>{props.Dish.name}</Text>
                <Text adjustsFontSizeToFit={true} numberOfLines={1} style={styles.price}>${props.Dish.price}</Text>
              </View>
              <View style={styles.ratingsContainer}>
                <Rating
                  style={styles.rating}
                  readonly={true}
                  imageSize={20}
                  fractions={1}
                  startingValue={props.Dish.rating ? props.Dish.rating : 0.0}
                />
                <Text style={styles.numReviews}>
                  ({props.Dish.numReviews} Reviews)
                </Text>
              </View>
              <View style={styles.spacer} />

              <Text style={styles.descriptionText}>
                {props.Dish.description}
              </Text>
              <Divider style={styles.divider} />
              <Text style={styles.descriptionText}>
                Ingredients: {props.Dish.ingredients}
              </Text>
              <Divider style={styles.divider} />
              <Text style={styles.descriptionText}>
                Estimated Time: {props.Dish.timeString}
              </Text>
              <View style={styles.spacer}></View>
              <Reviews
                rating={props.Dish.rating}
                numReviews={props.Dish.numReviews}
                reviews={first5Reviews}
                dishid={props.Dish.dishid}
              />
              <View style={styles.spacer} />
              <View style={styles.spacer} />
            </View>
          </View>
        </ScrollView>
        <View style={styles.closeButton}>
          <Button
            onPress={() => close(setVisible, props.hideModal)}
            buttonStyle={styles.closeButtonStyle}
            icon={
              <Icon
                name="close"
                size={25}
                color="white"
                style={{
                  backgroundColor: "black",
                  borderRadius: 15,
                  outline: "white solid 1px"
                }}
              />
            }
          />
        </View>
        <View style={styles.checkout}>
          <Button
            type="solid"
            title=" - "
            onPress={() => remove(count, setCount)}
            titleStyle={styles.buttonText}
            buttonStyle={styles.minusButton}
          />
          <Text style={styles.countStyle}>{count}</Text>
          <Button
            type="solid"
            style={styles.plusButtonPadding}
            title=" + "
            onPress={() => setCount(count + 1)}
            titleStyle={styles.buttonText}
            buttonStyle={styles.plusButton}
          />
          <Button
            type="solid"
            title="Add to Cart"
            titleStyle={styles.addToCartText}
            buttonStyle={styles.addToCartButton}
            icon={
              <Icon
                style={styles.cartPadding}
                name="basket"
                type="simple-line-icon"
                size={20}
                color="white"
              />
            }
            onPress={() => {
              if (count > 0) {
                const found = global.cart.findIndex(
                  item => item["dish"] == props.Dish
                );
                if (found < 0) {
                  const dish = props.Dish;
                  addToCart({ dish, count });
                } else {
                  addQuantity(found, count);
                }
                Alert.alert(
                  "Added to Cart",
                  "Successfully added items to cart!"
                );
              }
            }}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    width: "100%",
    height: "80%"
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background
  },

  modalView: {
    backgroundColor: colors.background,
    alignItems: "flex-start",
    width: "100%",
    minHeight: "100%"
  },

  carouselContainer: {
    width: "100%"
  },

  closeButton: {
    alignSelf: "flex-end",
    position: "absolute",
    top: 20,
    right: 0
  },

  closeButtonStyle: {
    backgroundColor: "transparent"
  },

  carouselItem: {
    width: ITEM_WIDTH,
    height: Math.round(ITEM_WIDTH * (3.0 / 4.0))
  },

  dots: {
    position: "absolute",
    alignSelf: "center",
    bottom: 0
  },

  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    backgroundColor: colors.black
  },

  closeButton: {
    alignSelf: "flex-end",
    position: "absolute",
    top: 40,
    right: 0
  },

  closeButtonStyle: {
    backgroundColor: "transparent"
  },

  minusButton: {
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: colors.secondary,
    marginBottom: 10
  },

  plusButton: {
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors.secondary,
    marginBottom: 10
  },

  plusButtonPadding: {
    paddingRight: 10
  },

  addToCartButton: {
    borderRadius: 20,
    backgroundColor: colors.secondary,
    paddingLeft: 10,
    marginBottom: 10
  },

  addToCartText: {
    fontWeight: "bold",
    paddingRight: 10
  },

  buttonText: {
    fontWeight: "bold"
  },

  cartPadding: {
    paddingLeft: 10,
    paddingRight: 10
  },

  textContainer: {
    flex: 5,
    backgroundColor: "white",
    paddingTop: "0%",
    width: "100%",
    alignItems: "flex-start",
    flexDirection: "column"
  },

  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    fontFamily: "Avenir"
  },

  divider: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: colors.secondary,
    height: 1
  },

  divider2: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: colors.secondary,
    height: 1
  },
  titleText: {
    fontSize: 30,
    padding: 10,
    color: "black",
    fontWeight: "bold",
    fontFamily: "Avenir",
    maxWidth: "80%"
  },

  countStyle: {
    fontSize: 20,
    padding: 10,
    color: "white",
    height: 40,
    fontWeight: "bold",
    fontFamily: "Avenir",
    marginBottom: 10
  },

  price: {
    alignSelf: "flex-start",
    fontSize: 30,
    padding: 10,
    color: colors.black,
    fontWeight: "bold",
    fontFamily: "Avenir",
    maxWidth: "30%"
  },

  description: {
    alignSelf: "flex-start",
    flex: 2,
    paddingLeft: 20
  },

  descriptionText: {
    fontSize: 20,
    padding: 10,
    color: "gray",
    fontFamily: "Avenir"
  },

  checkout: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%"
  },
  ratingsContainer: {
    width: "100%",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 15,
    marginLeft: 10
  },
  numReviews: {
    marginLeft: 5,
    fontSize: 18,
    color: "grey"
  },
  spacer: {
    height: 10,
    backgroundColor: colors.background,
    width: "100%"
  }
});

export default DishPage;
