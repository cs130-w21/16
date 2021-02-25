const port = 8888;
<<<<<<< HEAD
// const ip = 'http://3.141.20.190';
const ip = 'http://localhost';
=======
const ip = 'http://3.141.20.190';
// const ip = 'http://localhost';
>>>>>>> bb864a1a401e4e3b5ca02b89042b432115ffb679

async function getDishes() {
    const response = await fetch(ip+':'+port+'/AllDishes');
    const data = await response.json();
    return data;
}
module.exports.getDishes = getDishes;

async function getAvailableDishes() {
    const response = await fetch(ip+':'+port+'/AvailableDishes');
    const data = await response.json();
    return data;
}
module.exports.getAvailableDishes = getAvailableDishes;

async function getChefInfo(id) {
    const response = await fetch(ip+':'+port+'/ChefInfo?id='+id);
    const data = await response.json();
    return data;
}
module.exports.getChefInfo = getChefInfo;

async function getChefs() {
    const response = await fetch(ip+':'+port+'/Chefs');
    const data = await response.json();
    return data;
}
module.exports.getChefs = getChefs;

async function getCoverPhotos(id) {
    const response = await fetch(ip+':'+port+'/CoverPhotos?id='+id);
    const data = await response.json();
    return data;
}
module.exports.getCoverPhotos = getCoverPhotos;

async function getChefsDishes(id) {
    const response = await fetch(ip+':'+port+'/ChefsDishes?id='+id);
    const data = await response.json();
    return data;
}
module.exports.getChefsDishes = getChefsDishes;