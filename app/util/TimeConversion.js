function minRemainingToString(min){
    var minutes = min % 60;
    var hours = Math.floor(min / 60);
    if(hours == 0){
        return ""+minutes+" minutes";
    } else if(hours == 1 && minutes > 0){
        return "1 hour and "+minutes+" minutes";
    } else if(hours == 1 && minutes == 0){
        return "1 hour";
    } else if(hours > 1 && minutes > 0){
        return ""+hours+" hours and "+minutes+" minutes";
    } else if(hours > 1 && minutes == 0){
        return ""+hours+"hours";
    } else{
        return ""+hours+" hours and "+minutes+" minutes";
    }

}

export default minRemainingToString;