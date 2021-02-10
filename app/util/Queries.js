const port = 8080;

async function getDishes() {
    const response = await fetch('http://3.141.20.190:'+port+'/AllDishes');
    const data = await response.json();
    return data;
}
module.exports.getDishes = getDishes;

async function getAvailableDishes() {
    const response = await fetch('http://3.141.20.190:'+port+'/AvailableDishes');
    const data = await response.json();
    return data;
}
module.exports.getAvailableDishes = getAvailableDishes;

async function getChefInfo(id) {
    const response = await fetch('http://3.141.20.190:'+port+'/ChefInfo?id='+id);
    const data = await response.json();
    return data;
}
module.exports.getChefInfo = getChefInfo;

async function getChefs() {
    const response = await fetch('http://3.141.20.190:'+port+'/Chefs');
    const data = await response.json();
    return data;
}
module.exports.getChefs = getChefs;