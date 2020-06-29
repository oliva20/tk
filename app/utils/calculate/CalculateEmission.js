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

//markers: Array of object markers (marker { id, lat, lon, type})
//TODO: Hasn't been tested.
const getCO2FromMarkers = ( markers ) => {
    if(markers == null || markers == [])
        throw 'Markers are null or empty: Could not calculate';
    console.log(`Calculating markers: ${markers}`);
    var distance = 0.0;
    var totalResult = 0.0;  

    for(var i = 0; i < markers.length-1; i++){ //previous
        for(var j = 1; j <= markers.length; j++){ //current 
            let pMarker = markers[i];
            let coordP = { latitude: pMarker.latitude, longitude: pMarker.longitude } 
            let cMarker = markers[j];
            let coordC = { latitude: cMarker.latitude, longitude: cMarker.longitude } 

            distance = getDistance(coordP, coordC) / 1000; //convert to km
            totalResult += _getCO2FromKilometers(distance, pMarker.type);
        }
    }

    return totalResult;
}

const _getCO2FromKilometers = ( km, transportType ) => {
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
};
