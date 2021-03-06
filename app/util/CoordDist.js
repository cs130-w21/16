/**
 * @module utilities
 */

/**
 * Function to calculate the distance in miles between two coordinate locations.
 * @param {number} lat1 - Latitude of first location
 * @param {number} lon1 - Longitude of first location
 * @param {number} lat2 - Latitude of second location
 * @param {number} lon2 - Longitude of second location
 */
const coordDist = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
     
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    d /= 1.609;
    return d;
}
function deg2rad(deg) {
    return deg * (Math.PI/180)
}
export default coordDist;