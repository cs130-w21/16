import { minRemainingToString } from "../util/TimeConversion";

/**
 * 
 * @typedef DishObj
 * @property {int} dishid - dishid
 * @property {int} chefid - chefid of chef making this dish
 * @property {String} name - name of dish
 * @property {float} price - price of dish
 * @property {String} description - text of full dish description
 * @property {String} shortDesc - short 50 character max description for dish cards
 * @property {String} ingredients - text of ingredients
 * @property {int} timeMin - time that will take to fulfill the order in minutes
 * @property {float} rating - average rating
 * @property {int} numReviews - total number of reviews left
 * @property {String} primaryImage - image url to dish's primary picture
 * @property {String} secondImage - image url to dish's second picture
 * @property {String} thirdImage - image url to dish's third picture
 * @property {String} fourthImage - image url to dish's fourth picture
 * @property {boolean} available - boolean whether this dish is currently available
 * @property {Object} Chef - Chef object of the chef that makes this dish
 */

/**
 * Dish Object
 * 
 * @param {DishObj} dishJSON
 */
function Dish(dishJSON){
    this.dishid = dishJSON.dishid;
    this.chefid = dishJSON.chefid;
    this.name = dishJSON.name;
    this.price = Math.round(dishJSON.price *100)/100;
    this.description = dishJSON.description;
    this.shortDesc = dishJSON.shortDesc;
    this.ingredients = dishJSON.ingredients;
    this.timeMin = dishJSON.timeMin;
    this.timeString = minRemainingToString(this.timeMin);
    this.rating = dishJSON.rating;
    this.numReviews = dishJSON.numReviews;
    this.primaryImageURL = dishJSON.primaryImage;
    this.imagesURLs = [dishJSON.primaryImage, dishJSON.secondImage, dishJSON.thirdImage, dishJSON.fourthImage];
    this.available = dishJSON.available ? true : false;
    this.Chef;

    this.setChef = (Chef) => {this.Chef=Chef};

}

export default Dish;