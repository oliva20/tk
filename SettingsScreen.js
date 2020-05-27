import React from 'react';

import {Text, Image, SafeAreaView, StyleSheet,} from 'react-native';

import colors from '../config/colors.js';

const SettingsScreen = () => {
    return( 
        <SafeAreaView style={styles.mainView} > 
            <Text style={styles.screenTitle}>Settings</Text> 
        </SafeAreaView> 
    );
};

const styles = StyleSheet.create({
    screenTitle: {
        left: 10,
        top: 20,
        color: colors.textPrimary, 
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'left',
    }, 
    mainView: {
        flex: 1,
    },
}); 

export default SettingsScreen; 
