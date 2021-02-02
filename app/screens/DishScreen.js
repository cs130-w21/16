import React from "react";
import { Text, View } from "react-native";
import DishPage from "./DishPage"

function DishScreen(props) {
  return (
    <DishPage carouselData={[{image: require('../assets/spaghetti.jpg')}, {image: require('../assets/spaghetti2.jpg')}]} name="Spaghetti" price="10" time="1 hour" description="Spaghetti is a long, thin, solid, cylindrical noodle pasta. It is a staple food of traditional Italian cuisine. Like other pasta, spaghetti is made of milled wheat and water and sometimes enriched with vitamins and minerals. Italian spaghetti is typically made from durum wheat semolina." ingredients="flour, tomatoes, basil, parmesan cheese, salt, pepper"/>
  );
}

export default DishScreen;
