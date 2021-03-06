const moment = require("moment");

const port = 8888;
const ip = "http://3.141.20.190";
//const ip = "http://localhost";

////////////
// DISHES //
///////////

/**
 * return all Dish entries in the Dish Table
 * @return {Object[]} - array of JSON Objects containing the attributes for each dish
 */
async function getDishes() {
  const response = await fetch(ip + ":" + port + "/AllDishes");
  const data = await response.json();
  return data;
}
module.exports.getDishes = getDishes;

/**
 * return information on a specific dish specifid by dishid
 * @param {int} dishid - dishid of desired dish
 * @return {Object[]} - array of length 1 of the JSON Object containing the attributes for the given dish
 */
async function getDishInfo(dishid) {
  const response = await fetch(ip + ":" + port + "/DishInfo?dishid=" + dishid);
  const data = await response.json();
  return data;
}
module.exports.getDishInfo = getDishInfo;

/**
 * return all Dish entries in the Dish Table of currently available dishes
 * @return {Object[]} - array of JSON Objects containing the attributes for each dish
 */
async function getAvailableDishes() {
  const response = await fetch(ip + ":" + port + "/AvailableDishes");
  const data = await response.json();
  return data;
}
module.exports.getAvailableDishes = getAvailableDishes;

/**
 * return all primary image URLs of the dishes of a specified chef ordered by dish rating
 * @param {int} chefid - chefid of desired chef
 * @return {Object[]} - array of JSON Objects containing the primaryImage URLs for a the given chef
 */
async function getCoverPhotos(chefid) {
  const response = await fetch(ip + ":" + port + "/CoverPhotos?id=" + chefid);
  const data = await response.json();
  return data;
}
module.exports.getCoverPhotos = getCoverPhotos;

/**
 * return all Dish entries for a given chef
 * @param {int} id - chefid of desired chef
 * @return {Object[]} - array of JSON Objects containing the attributes for each dish
 */
async function getChefsDishes(id) {
  const response = await fetch(ip + ":" + port + "/ChefsDishes?id=" + id);
  const data = await response.json();
  return data;
}
module.exports.getChefsDishes = getChefsDishes;

///////////
// CHEFS //
//////////

/**
 * return information on a specific chef specifid by chefid
 * @param {int} id - chefid of desired chef
 * @return {Object[]} - array of length 1 of the JSON Object containing the attributes for the given chef
 */
async function getChefInfo(id) {
  const response = await fetch(ip + ":" + port + "/ChefInfo?id=" + id);
  const data = await response.json();
  return data;
}
module.exports.getChefInfo = getChefInfo;

/**
 * return all Chef entries in the Chef Table
 * @return {Object[]} - array of JSON Objects containing the attributes for each chef
 */
async function getChefs() {
  const response = await fetch(ip + ":" + port + "/Chefs");
  const data = await response.json();
  return data;
}
module.exports.getChefs = getChefs;

/////////////
// Reviews //
/////////////

/**
 * pushes a new review to the Review table in the database
 * @param {int} dishid - dishid of dish being reviewed
 * @param {int} chefid - chefid of the chef of the dish being reviewed
 * @param {String} reviewer - name of who left the review
 * @param {rating} int - star rating of 1 to 5 left for the dish
 * @param {String} comment - optional comment left for the dish (null if no comment)
 * @param {BigInt} timestamp - timestamp of when the review was left in milliseconds
 */
async function pushNewReview(
  dishid,
  chefid,
  reviewer,
  rating,
  comment,
  timestamp
) {
  const response = await fetch(
    ip +
      ":" +
      port +
      "/newReview?dishid=" +
      dishid +
      "&chefid=" +
      chefid +
      "&reviewer=" +
      encodeURI(reviewer).replace(/%20/g, "+") +
      "&rating=" +
      rating +
      "&timestamp=" +
      timestamp +
      (comment != null
        ? "&comment=" + encodeURI(comment).replace(/%20/g, "+")
        : "")
  );
  const data = await response.json();
  const response2 = await fetch(
    ip +
      ":" +
      port +
      "/updateDishWithNewReview?dishid=" +
      dishid +
      "&rating=" +
      rating
  );
  const data2 = await response2.json();
  const response3 = await fetch(
    ip +
      ":" +
      port +
      "/updateChefWithNewReview?chefid=" +
      chefid +
      "&rating=" +
      rating
  );
  const data3 = await response3.json();
}
module.exports.pushNewReview = pushNewReview;

/**
 * return all reviews with comments left for a specific dish specified by dishid
 * @param {int} dishid - dishid of specified dish
 * @return {Object[]} - array of length JSON Objects containing the attributes for each review
 */
async function getDishReviews(dishid) {
  const response = await fetch(
    ip + ":" + port + "/getDishReviews?dishid=" + dishid
  );
  const data = await response.json();
  return data;
}
module.exports.getDishReviews = getDishReviews;

/**
 * return all reviews with comments left for a specific chef specified by chefid
 * @param {int} chefid - chefid of specified chef
 * @return {Object[]} - array of length JSON Objects containing the attributes for each review
 */
async function getChefReviews(chefid) {
  const response = await fetch(
    ip + ":" + port + "/getChefReviews?chefid=" + chefid
  );
  const data = await response.json();
  return data;
}
module.exports.getChefReviews = getChefReviews;

/**
 * return the latest n reviews with comments left for a specific dish specified by dishid
 * @param {int} dishid - dishid of specified dish
 * @param {int} n - number of reviews to pull
 * @return {Object[]} - array of length JSON Objects containing the attributes for each review
 */
async function getNDishReviews(dishid, n) {
  const response = await fetch(
    ip + ":" + port + "/getNDishReviews?dishid=" + dishid + "&n=" + n
  );
  const data = await response.json();
  return data;
}
module.exports.getNDishReviews = getNDishReviews;

/**
 * return the latest n reviews with comments left for a specific chef specified by chefid
 * @param {int} chefid - chefid of specified chef
 * @param {int} n - number of reviews to pull
 * @return {Object[]} - array of length JSON Objects containing the attributes for each review
 */
async function getNChefReviews(chefid, n) {
  const response = await fetch(
    ip + ":" + port + "/getNChefReviews?chefid=" + chefid + "&n=" + n
  );
  const data = await response.json();
  return data;
}
module.exports.getNChefReviews = getNChefReviews;

/**
 * return ALL reviews
 * @return {Object[]} - array of length JSON Objects containing the attributes for each review
 */
async function getAllReviews() {
  const response = await fetch(ip + ":" + port + "/AllReviews");
  const data = await response.json();
  return data;
}
module.exports.getAllReviews = getAllReviews;

///////////////////////
// Send Text Message //
///////////////////////
var requestOptions = {
  method: "POST",
  redirect: "follow",
  Accept: "application/json",
  "Content-Type": "application/json"
};

/**
 * perform post request to send text messages to chefs
 * @param {String} dishes - dishes in order
 * @param {String} instructions - special instructions left by customer
 * @param {int} phone - phone number of chef to send to
 * @param {String} method - GET or POST method
 */
async function sendTextMessage(dishes, instructions, phone, method) {
  const response = await fetch(
    ip +
      ":" +
      port +
      "/textChef?dishes=" +
      dishes +
      "&instructions=" +
      instructions +
      "&phone=" +
      phone +
      "&method=" +
      method,
    requestOptions
  )
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log("error", error));
}
module.exports.sendTextMessage = sendTextMessage;
