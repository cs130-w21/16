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
  Alert,
  TouchableOpacity
} from "react-native";
import { Button, Icon, Divider, Rating } from "react-native-elements";
import { color } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel, { Pagination } from "react-native-snap-carousel";
import MapView, { Marker, Polyline } from 'react-native-maps';
import PropTypes, { any } from "prop-types";
import Reviews from "../components/Reviews";
import colors from "../config/colors";
import { getChefInfo, getDishInfo, getNDishReviews } from "../util/Queries";
import { addToCart, addQuantity } from "../components/ShoppingCart";
import Chef from "../objects/Chef";
import Dish from "../objects/Dish";
import coordDist from "../util/CoordDist";

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
  const [dish, setDish] = useState(props.Dish!=null ? props.Dish : new Dish({}));
  var location=dish.Chef != null ? JSON.parse(dish.Chef.location) : {'latitude':0, 'longitude':0};
  location['latitudeDelta'] = 0.007;
  location['longitudeDelta'] = 0.007;
  const [region, setRegion] = useState(location);
  const [userLoc, setUserLoc] = useState(null);

  useEffect(() => {
      if(dish.dishid != null){
          getNDishReviews(dish.dishid, 5).then(function(results) {
              setFirst5Reviews(results);
          }, () => {console.log("Error in useEffect getNDishReviews")})
          .catch(err => {console.log("use Effect Err Get N Dish Reviews: ", err)});
      }

      navigator.geolocation.getCurrentPosition((pos) => {
        setUserLoc(pos);
        var loc = {};
        loc['latitude'] = (pos.coords.latitude + location.latitude)/2.0
        loc['longitude'] = (pos.coords.longitude + location.longitude)/2.0
        loc['latitudeDelta'] = Math.abs(pos.coords.latitude-loc.latitude)*(loc.latitude > pos.coords.latitude ? 10: 3);
        loc['longitudeDelta'] = Math.abs(pos.coords.longitude-loc.longitude)*1.5;
        setRegion(loc);
      }, (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }, {
        enableHighAccuracy: true, timeout: 5000, maximumAge: 0
      });
  }, []);

  useEffect(() => {
    setVisible(props.visible);
  });

  useEffect(()=> {
      if(props.dishid!=null){
          refresh(props.dishid);
      }
      
  }, [props.dishid])

  function refresh(dishid){
    getNDishReviews(dishid, 5)
    .then(
      function(results) {
        setFirst5Reviews(results);
      },
      () => {
        console.log("Error in refresh getNDishReviews");
      }
    )
    .catch(err => {
      console.log("use Effect Err Get N Dish Reviews: ", err);
    });

    getDishInfo(dishid)
    .then(
        function(results){
            var d = new Dish(results[0]);
            getChefInfo(d.chefid).then(function(results){
                var chef = new Chef(results[0]);
                d.setChef(chef)
                setDish(d); 
            }, () => {console.log("Error")})
            .catch((err) => {console.log("Refresh get Chef error: ", err)})
        },
        () => {
            console.log("Error in refresh getDishInfo");
        }
    )
    .catch(err => {
        console.log("refresh Err get dish info: ", err);
    });
  }

  function onPressChef(){
    if(dish.Chef == null) {return;}
      close(setVisible, props.hideModal)
      props.navigation.navigate("Chef", {
        Chef: dish.Chef
      })
  }

  let carouselData = [];
  if (dish.imagesURLs != null) {
    dish.imagesURLs.forEach(imageURL => {
      if (imageURL != null) {
        carouselData.push({ image: { uri: imageURL } });
      }
    });
  }

  if(dish == null){return(<View></View>);}
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
                <Text style={styles.titleText}>{dish.name}</Text>
                <Text adjustsFontSizeToFit={true} numberOfLines={1} style={styles.price}>${dish.price}</Text>
              </View>
              <View style={styles.ratingsContainer}>
                <Rating
                  style={styles.rating}
                  readonly={true}
                  imageSize={20}
                  fractions={1}
                  startingValue={dish.rating ? dish.rating : 0.0}
                />
                <Text style={styles.numReviews}>
                  ({dish.numReviews} Reviews)
                </Text>
              </View>
              <View style={styles.spacer} />

              <Text style={styles.descriptionText}>
                {dish.description}
              </Text>
              <Divider style={styles.divider} />
              <Text style={styles.descriptionText}>
                Ingredients: {dish.ingredients}
              </Text>
              <Divider style={styles.divider} />
              <Text style={styles.descriptionText}>
                Estimated Time: {dish.timeString}
              </Text>
              <View style={styles.spacer}></View>
              {dish.Chef != null &&
              <TouchableOpacity onPress={onPressChef}>
              <View style={styles.chefInfoContainer}>
                <View style={styles.chefPicHolder}>
                  <Image style={styles.chefPic} source={{uri: dish.Chef.profilePicURL}}/>
                </View>
                <View style={styles.chefTextContainer}>
                  <Text style={styles.chefNameText}>{dish.Chef.name}</Text>
                  <Text style={styles.chefSubtitleText}>{dish.Chef.shortDesc}</Text>
                  <Rating
                    style={{marginTop: 4}}
                    readonly={true}
                    imageSize={15}
                    fractions={1}
                    startingValue={dish.Chef.rating ? dish.Chef.rating : 0.0}
                  />
                </View>
                <View style={styles.chefMapContainer}>
                  <MapView style={styles.map}
                    region={region}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    showsTraffic={true}
                    pitchEnabled={false}
                  >
                    <Marker
                      coordinate={{latitude: location.latitude, longitude: location.longitude}}
                    />
                  </MapView>
                  {userLoc && <Text style={styles.distanceText}>
                            {coordDist(location.latitude, location.longitude, userLoc.coords.latitude, userLoc.coords.longitude).toFixed(2)} miles away
                  </Text>}
                </View>
              </View>
              </TouchableOpacity>
              }
              <View style={styles.spacer}></View>
              {dish.numReviews!=null &&
              <Reviews
                rating={dish.rating}
                numReviews={dish.numReviews}
                reviews={first5Reviews}
                dishid={dish.dishid}
                refresh={() => {refresh(dish.dishid)}}
                navigation={props.navigation}
              />
              }
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
                  item => item["dish"] == dish
                );
                if (found < 0) {
                  const d = dish;
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


DishPage.propTypes = {
  navigation: any.isRequired
};

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
  chefInfoContainer:{
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  chefPic: {
    width: SLIDER_WIDTH*0.2,
    height: SLIDER_WIDTH*0.2,
    borderRadius: SLIDER_WIDTH*0.1,
  },
  chefPicHolder: {
    height: SLIDER_WIDTH*0.2,
    width: SLIDER_WIDTH*0.2,
    margin: '5%'
  },
  chefTextContainer:{
    width: '40%',
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  chefNameText:{
    fontSize: 20,
    color: colors.secondary,
    fontWeight: 'bold',
    fontFamily: "Avenir",
    alignContent: 'center',
    textAlign: 'center'
  },
  chefSubtitleText:{
    fontSize: 12,
    color: 'grey',
    fontFamily: "Avenir",
    textAlign: 'center'
  },
  chefMapContainer:{
    width: '20%',
    marginHorizontal: '5%',
    marginVertical: '2.5%',
  },
  map:{
    height: SLIDER_WIDTH*0.2,
    width: SLIDER_WIDTH*0.2,
    borderRadius: SLIDER_WIDTH*0.02
  },
  distanceText: {
    fontSize: 10,
    color: 'black',
    fontFamily: "Avenir",
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 5
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