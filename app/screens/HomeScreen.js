import React from 'react';

import {Text, Image, SafeAreaView, StyleSheet,} from 'react-native';
import colors from '../config/colors.js';

function HomeScreen(props){
    //TODO: This is a setup test
    return(
        //TODO detect os here this does not work on android
        <SafeAreaView>
            <Text style={styles.screenTitle} >Home</Text>            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screenTitle: {
        top: 20,
        color: colors.textPrimary, 
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
    }, 
}); 


export default HomeScreen;

