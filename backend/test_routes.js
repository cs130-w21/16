const express = require("express");
const app = express();

////////////////
// Test Query //
////////////////

app.get("/test", function(req, res) {
  const testJson = { dishid: 1, name: "Test Dish" };
  res.send(testJson);
  return;
});

app.get("/testObject", function(req, res) {
  const testJson = {
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
  };
  res.send(testJson);
  return;
});

module.exports = app;
