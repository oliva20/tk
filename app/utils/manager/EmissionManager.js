/* 
 * An emission object should have a date and a value. It should have a date
 * because we want to restart the emission count every day.Emissions are evaluated 
 * day by day. Keeping this in mind, we might want to use the date as the key string.
 * */

import AsyncStorage from '@react-native-community/async-storage';


var dateToday = new Date().toJSON().slice(0,10).replace(/-/g,'/'); //returns formatted date

const storeEmission = async ( value ) => {
    try {

        let aEmission = await AsyncStorage.getItem(dateToday);

        if(aEmission != null) {
            //let newValue = parseInt(aEmisson) + emission.value; 
            let newValue = parseInt(aEmission) + value;
            //add up the value    
            await AsyncStorage.setItem(dateToday, newValue.toString()); 

            return true; 
        } else {
            await AsyncStorage.setItem(dateToday, value.toString());
            return true;
        }

    } catch (e) {
        console.log(`Could not store emission: ${emission},
                    Error: ${e}`);
        return false;
    }
}

const getEmissionTotalToday = async () => {
    try {

        let emission = 0;

        const emissionToday = await AsyncStorage.getItem(dateToday);

        if(emissionToday != null) {
            emission  = parseInt(emissionToday); 
        }

        return emission;

    } catch (e) {
        console.log(`Cannot return emission from today: ${e}`); 
    }
    
}

const clearEmissions = async () => {
    try {
        await AsyncStorage.clear();
        return true;
    } catch (e) {
        console.log(`Problem clearing emissions ${e}`);
        return false; 
    }
}
    
export default {
    storeEmission,
    getEmissionTotalToday,
    clearEmissions,
};
