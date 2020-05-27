import React from 'react';
import MapView from 'react-native-maps';

import {
    Text, 
    Image, 
    SafeAreaView, 
    View,
    StyleSheet,
    Dimensions,
    Button,
} from 'react-native';

import colors from '../config/colors.js';

const TransportScreen = () => {
    return(
        <SafeAreaView style={styles.container}>
            <MapView style={styles.mapStyle} />
            <Button title="track"/>
        </SafeAreaView>

       //TODO Design the button to put here
    ); 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 1.5,
    },
}); 

export default TransportScreen;
