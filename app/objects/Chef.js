function Chef(chefJSON){
    this.chefid =  chefJSON.chefid;
    this.name = chefJSON.name;
    this.bio = chefJSON.bio;
    this.shortDesc = chefJSON.shortDesc;
    this.location;
    this.profilePicURL = chefJSON.profilePic;
    this.rating = chefJSON.rating;
    this.numReviews = chefJSON.numReviews
    this.dishes = [];

    this.setDishes = (dishes) => {this.dishes=dishes}
}

export default Chef;