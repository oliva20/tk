import React from 'react';

import {
    Text, 
    Image, 
    View, 
    StyleSheet,
} from 'react-native';

import colors from '../config/colors.js';
import sizes from '../config/sizes.js';

const EmissionCircle = ( props ) => {
    return(
        // 0 - 10 = SMALL; 11 - 20 = MEDIUM; 21 - 30 = HIGH
            //TODO Its should check for severity of the emission total of the day and get reflected in the colour of the circle.
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
        borderWidth: sizes.circleBorderWidth,
        borderColor: colors.primary,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
    },
    emissionNumber: {
        fontSize: sizes.textFontSize, 
        fontWeight: 'bold',
    }
});

export default EmissionCircle;
