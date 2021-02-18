import { minRemainingToString } from "../util/TimeConversion";

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