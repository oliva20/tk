import React from 'react';

import {
    Text, 
    Image, 
    View, 
    StyleSheet,
} from 'react-native';

import colors from '../config/colors.js';

const EmissionCircle = ( props ) => {
    return(
            <View style={styles.circleBackground}> 
                <Text style={styles.emissionNumber}>{props.emissionNumber} KgCO2</Text>
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
    },
    circleBackground: {
        width: 250,
        height: 250, 
        borderRadius: 125, //half
        borderWidth: 5,
        borderColor: colors.primary,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
    },
    emissionNumber: {
        fontSize: 25,  //TODO create a  size file in config
        fontWeight: 'bold',
    }
});

export default EmissionCircle;
