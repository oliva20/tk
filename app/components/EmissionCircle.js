import React from 'react';
import PropTypes from 'prop-types';
import {
    Text, 
    View, 
    StyleSheet,
} from 'react-native';

import colors from '../config/colors.js';
import sizes from '../config/sizes.js';

const EmissionCircle = ( props ) => {
    const { emissionNumber } = props;

    return(
            //TODO Its should check for severity of the emission total of the day and get reflected in the colour of the circle.
            <View style={styles.circleBackground}> 
                <Text style={styles.emissionNumber}>{emissionNumber}  KgCO2</Text>
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

EmissionCircle.propTypes = {
    emissionNumber: PropTypes.float
}

export default EmissionCircle;
