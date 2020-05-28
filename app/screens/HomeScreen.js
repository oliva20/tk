import React from 'react';

import {
    Text, 
    Image, 
    SafeAreaView, 
    View,
    StyleSheet,
} from 'react-native';

import colors from '../config/colors.js';
import sizes from '../config/sizes.js';
import EmissionCircle from '../components/EmissionCircle.js';

const HomeScreen = () => {
    return( 
        <SafeAreaView style={styles.mainView} > 
            <Text style={styles.screenTitle}>Today's total Emissions</Text> 

            <View style={styles.circle}> 
                <EmissionCircle emissionNumber="212"/>
            </View>

        </SafeAreaView> 
    );
};

const styles = StyleSheet.create({
    screenTitle: {
        left: 10,
        top: 30,
        color: colors.textPrimary, 
        fontSize: sizes.headFontSize,
        fontWeight: 'bold',
    }, 
    mainView: {
        flex: 1,
        alignItems: 'center',
    },
    circle: {
        top: '20%',
    },
}); 

export default HomeScreen; 
