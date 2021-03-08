import React from "react";
import renderer from "react-test-renderer";
import TestComponent from "../app/components/testComponent.js";
import MenuCard from "../app/components/dish";
import { Card, Rating, Icon } from "react-native-elements";
import ChefRec from "../app/components/chefRec.js";
import Dish from "../app/objects/Dish";
import Chef from "../app/objects/Chef";
import ShoppingCartScreen from "../app/screens/ShoppingCartScreen";
import { addToCart } from "../app/components/ShoppingCart.js";
jest.mock("react-native-gesture-handler", () => {});
jest.mock("react-native-reanimated", () => {
  return {
    View: jest.fn()
  };
});

const express = require("express");
const supertest = require("supertest");
const app2 = require("../backend/test_routes");
const request = supertest(app2);

console.error = jest.fn(() => console.log("error received - ignoring"));

const sum = (a, b) => a + b;

// functionality test - Jest and functions
test("adds 1 + 2 to equal 3 - sanity check", () => {
  expect(sum(1, 2)).toBe(3);
});

// front-end test
it("renders test component", () => {
  const tree = renderer.create(<TestComponent />).toJSON();
  expect(tree).toMatchSnapshot();
});

const testdish = {
  Dish: {
    dishid: 1,
    chefid: 1,
    name: "Test Dish",
    price: 10.0,
    description: "Testing menu card functionality",
    shortDesc: "Test Dish Card",
    ingredients: "Flour, water, sugar, butter",
    timeMin: 45,
    timeString: "45",
    rating: 4.5,
    numReviews: 12,
    primaryImageURL:
      "https://mk0tamingofthes3a5vy.kinstacdn.com/wp-content/uploads/2014/05/Chocolate-Souffle%CC%81-R3-1.jpg",
    imagesURLs: [
      "https://mk0tamingofthes3a5vy.kinstacdn.com/wp-content/uploads/2014/05/Chocolate-Souffle%CC%81-R3-1.jpg",
      null,
      null,
      null
    ],
    available: true,
    Chef: {
      chefid: 1,
      name: "Joe Bruin",
      bio: "Testing my cooking skills",
      shortDesc: "Testing",
      location:
        '{\n"longitudeitudeitude": 37.68150389706859,\n"latitude": -121.77003055798302\n}',
      profilePicURL:
        "https://media-exp1.licdn.com/dms/image/C5603AQF0WhseuqC1vg/profile-displayphoto-shrink_400_400/0/1601364008023?e=1617840000&v=beta&t=6uenlQcCtwSNzh8nvbGdfhQjmTdPoEbwS2obX9CtVCs",
      rating: 5,
      numReviews: 13
    }
  },
  navigation: "navigation",
  inChefMenu: true
};

// data compatibility test
it("Test objects", () => {
  const result = renderer.create(Dish(testdish.Dish)).toJSON();
  expect(result).toMatchSnapshot();
  const chefResult = renderer.create(Chef(testdish.Dish.Chef)).toJSON();
  expect(chefResult).toMatchSnapshot();
});

// main app component
it("Renders main dish card", async () => {
  const result = renderer
    .create(
      <MenuCard
        Dish={testdish.Dish}
        inChefMenu={testdish.inChefMenu}
        navigation={testdish.navigation}
      />
    )
    .toJSON();
  expect(result).toMatchSnapshot();
});

// main app component
it("Renders chef card", async () => {
  const result = renderer
    .create(
      <ChefRec item={testdish.Dish.Chef} navigation={testdish.navigation} />
    )
    .toJSON();
  expect(result).toMatchSnapshot();
});

// test dynamic screen rendering
it("Renders shopping cart page", async done => {
  const result = renderer
    .create(<ShoppingCartScreen navigation={testdish.navigation} />)
    .toJSON();
  expect(result).toMatchSnapshot();
  done();
});

it("Renders shopping cart page update", async done => {
  const dishObject = {
    dish: {
      dishid: testdish.Dish.dishid,
      name: testdish.Dish.name,
      price: testdish.Dish.price
    },
    count: 2
  };
  addToCart(dishObject);
  expect(global.cart).toHaveLength(1);
  const cartUpdated = renderer
    .create(<ShoppingCartScreen navigation={testdish.navigation} />)
    .toJSON();
  expect(cartUpdated).toMatchSnapshot();
  global.cart = [];
  expect(global.cart).toHaveLength(0);
  done();
});

// test back-end routes
it("GET /test", async () => {
  const { body } = await request.get("/test");
  expect(body).toEqual({
    dishid: 1,
    name: "Test Dish"
  });
});

// test back-end / front-end connection
it("GET /testObject", async () => {
  const { body } = await request.get("/testObject");
  expect(body).toEqual({
    Dish: {
      dishid: 1,
      chefid: 1,
      name: "Test Dish 2",
      price: 10.0,
      description: "Testing menu card functionality - routes",
      shortDesc: "Test Dish Card 2",
      ingredients: "Flour, water, sugar, butter",
      timeMin: 45,
      timeString: "45",
      rating: 4.5,
      numReviews: 12,
      primaryImageURL:
        "https://mk0tamingofthes3a5vy.kinstacdn.com/wp-content/uploads/2014/05/Chocolate-Souffle%CC%81-R3-1.jpg",
      imagesURLs: [
        "https://mk0tamingofthes3a5vy.kinstacdn.com/wp-content/uploads/2014/05/Chocolate-Souffle%CC%81-R3-1.jpg",
        null,
        null,
        null
      ],
      available: true,
      Chef: {
        chefid: 1,
        name: "Joe Bruin",
        bio: "Testing my cooking skills",
        shortDesc: "Testing",
        location:
          '{\n"longitudeitudeitude": 37.68150389706859,\n"latitude": -121.77003055798302\n}',
        profilePicURL:
          "https://media-exp1.licdn.com/dms/image/C5603AQF0WhseuqC1vg/profile-displayphoto-shrink_400_400/0/1601364008023?e=1617840000&v=beta&t=6uenlQcCtwSNzh8nvbGdfhQjmTdPoEbwS2obX9CtVCs",
        rating: 5,
        numReviews: 13
      }
    },
    navigation: "navigation",
    inChefMenu: true
  });
  const dishCard = renderer.create(<MenuCard {...body} />).toJSON();
  expect(dishCard).toMatchSnapshot();
});
