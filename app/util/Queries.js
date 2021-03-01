const port = 8888;
const ip = 'http://3.141.20.190';
//const ip = 'http://localhost';

////////////
// DISHES //
///////////

// ALL Dish entries in the Dish table
async function getDishes() {
    const response = await fetch(ip+':'+port+'/AllDishes');
    const data = await response.json();
    return data;
}
module.exports.getDishes = getDishes;

// Dish information for specific dish 
async function getDishInfo(dishid) {
    const response = await fetch(ip+':'+port+'/DishInfo?dishid='+dishid);
    const data = await response.json();
    return data;
}
module.exports.getDishInfo = getDishInfo;

// All Dish entries of currently available dishes
async function getAvailableDishes() {
    const response = await fetch(ip+':'+port+'/AvailableDishes');
    const data = await response.json();
    return data;
}
module.exports.getAvailableDishes = getAvailableDishes;

// All Dish Primary Images for a specified chef ordered by dish rating
async function getCoverPhotos(chefid) {
    const response = await fetch(ip+':'+port+'/CoverPhotos?id='+chefid);
    const data = await response.json();
    return data;
}
module.exports.getCoverPhotos = getCoverPhotos;

// All Dish entries for a given chef
async function getChefsDishes(id) {
    const response = await fetch(ip+':'+port+'/ChefsDishes?id='+id);
    const data = await response.json();
    return data;
}
module.exports.getChefsDishes = getChefsDishes;


///////////
// CHEFS //
//////////

// Table Entry for a specified chef
async function getChefInfo(id) {
    const response = await fetch(ip+':'+port+'/ChefInfo?id='+id);
    const data = await response.json();
    return data;
}
module.exports.getChefInfo = getChefInfo;

// All Chef entries in Chef table
async function getChefs() {
    const response = await fetch(ip+':'+port+'/Chefs');
    const data = await response.json();
    return data;
}
module.exports.getChefs = getChefs;


/////////////
// Reviews //
/////////////

async function pushNewReview(dishid, chefid, reviewer, rating, comment, timestamp) {
    const response = await fetch(ip+':'+port+'/newReview?dishid='+dishid+'&chefid='+chefid+'&reviewer='+encodeURI(reviewer).replace(/%20/g, "+")+'&rating='+rating+'&timestamp='+timestamp+(comment!=null ? '&comment='+encodeURI(comment).replace(/%20/g, "+"):""));
    const data = await response.json();
    const response2 = await fetch(ip+':'+port+'/updateDishWithNewReview?dishid='+dishid+'&rating='+rating);
    const data2 = await response2.json();
    const response3 = await fetch(ip+':'+port+'/updateChefWithNewReview?chefid='+chefid+'&rating='+rating);
    const data3 = await response3.json();
    return [data,data2, data3];
}
module.exports.pushNewReview = pushNewReview;

async function getDishReviews(dishid) {
    const response = await fetch(ip+':'+port+'/getDishReviews?dishid='+dishid);
    const data = await response.json();
    return data;
}
module.exports.getDishReviews = getDishReviews;

async function getChefReviews(chefid) {
    const response = await fetch(ip+':'+port+'/getChefReviews?chefid='+chefid);
    const data = await response.json();
    return data;
}
module.exports.getChefReviews = getChefReviews;

async function getNDishReviews(dishid, n) {
    const response = await fetch(ip+':'+port+'/getNDishReviews?dishid='+dishid+'&n='+n);
    const data = await response.json();
    return data;
}
module.exports.getNDishReviews = getNDishReviews;

async function getNChefReviews(chefid, n) {
    const response = await fetch(ip+':'+port+'/getNChefReviews?chefid='+chefid+'&n='+n);
    const data = await response.json();
    return data;
}
module.exports.getNChefReviews = getNChefReviews;

async function getAllReviews(){
    const response = await fetch(ip+':'+port+'/AllReviews');
    const data = await response.json();
    return data;
}
module.exports.getAllReviews = getAllReviews;
