import { 
    transport,
    food,
} from 'carbon-footprint'; 

import { getDistance } from 'geolib';

const getCO2FromFood = ( kg , foodType ) => {
    let emissionResult = null;   
    Object.keys(food).forEach((key) => {
        if(foodType == key){
            emissionResult = kg * food[key];
        }
    });
    return emissionResult;
}

//markers: Array of marker objects (marker { id, lat, lon, type})
const getCO2FromMarkers = ( markers ) => {

    if(markers == null || markers.length == 0)
        return null;

    var distance = 0.0;
    var totalResult = 0.0;  
    
    var j = 1; //current
       
    for(var i = 0; i < markers.length-1; i++){ //previous

        let pMarker = markers[i];
        let coordP = { latitude: pMarker.latitude, longitude: pMarker.longitude } 

        let cMarker = markers[j];
        let coordC = { latitude: cMarker.latitude, longitude: cMarker.longitude } 

        distance = getDistance(coordP, coordC) / 1000; //convert to km
        console.log(`Distance between ${pMarker.id} and ${cMarker.id} is: ${distance}`);
        totalResult += getCO2FromKilometers(distance, pMarker.type);
        j++
    }

    console.log(`CO2 returned ${totalResult}`);
    return totalResult;
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
    getCO2FromMarkers,
    getCO2FromKilometers,
};
