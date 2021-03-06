/**
 * 
 * @typedef ChefObj
 * @property {number} chefid
 * @property {string} name
 * @property {string} bio
 * @property {string} shortDesc
 * @property {string} location
 * @property {string} profilePicURL
 * @property {number} rating
 * @property {number} numReviews
 * @property {Object[]} dishes
 */

/**
 * Chef Object
 * 
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