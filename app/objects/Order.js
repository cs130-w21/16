import { getLongestTimeForChef, getLongestTimeForChefinMin } from "../components/ShoppingCart";

function Order(dishesByChef){
    this.chefs = Object.keys(dishesByChef);
    this.order = dishesByChef;

    this.completeChef = (chef) => {
        delete this.order[chef]
        const found = this.chefs.indexOf(chef);
        if(index > -1){
            this.chefs.splice(index, 1);
        }
    }
}

export default Order;