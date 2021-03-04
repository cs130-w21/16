import { getLongestTimeForChef, getLongestTimeForChefinMin } from "../components/ShoppingCart";

function Order(dishesByChef){
    this.chefs = Object.keys(dishesByChef);
    this.order = dishesByChef;

    this.removeChef = function(chef){
        const index = this.chefs.indexOf(chef);
        if (index > -1){
            this.chefs.splice(index, 1);
        }
    }
}

export default Order;