import { 
    transport,
    food,
} from 'carbon-footprint'; 

const getCO2FromFood = ( grams, foodType ) => {
    let emissionResult = null;   
    Object.keys(food).forEach((key) => {
        if(foodType == key){
            emissionResult = grams * food[key];
        }
    });
    return emissionResult;
}

const getCO2FromKilometers = ( km, transportType ) => {
    let emissionResult = null;   
    Object.keys(transport).forEach((key) => {
        if(transportType == key){
            emissionResult = km * transport[key];
        }
    });
    return emissionResult;
}

export default {
    getCO2FromFood, 
    getCO2FromKilometers,
};
