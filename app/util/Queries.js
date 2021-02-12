const port = 8080;
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