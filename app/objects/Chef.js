/**
 * @module objects
 */

/**
 * @typedef ChefObj
 * @property {int} chefid - chefid
 * @property {String} name - name of chef
 * @property {String} bio - text of full bio
 * @property {String} shortDesc - short 50 character max description for chef cards
 * @property {String} location - JSON string for location with longitude and latitude attributes
 * @property {String} profilePic - image url to chef's profile picture
 * @property {float} rating - average rating for any dishes made by this chef
 * @property {int} numReviews - total number of reviews left on dishes by this chef
 * @property {Object[]} dishes - array of Dish objects of all dishes made by this chef
 */

/**
 * Chef Object
 * @param {ChefObj} chefJSON
 */
function Chef(chefJSON){
    this.chefid =  chefJSON.chefid;
    this.name = chefJSON.name;
    this.bio = chefJSON.bio;
    this.shortDesc = chefJSON.shortDesc;
    this.location = chefJSON.location;
    this.profilePicURL = chefJSON.profilePic;
    this.rating = chefJSON.rating;
    this.numReviews = chefJSON.numReviews
    this.dishes = [];

    this.setDishes = (dishes) => {this.dishes=dishes}
}

export default Chef;