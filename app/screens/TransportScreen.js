import React from 'react';
import MapView, {Polyline}  from 'react-native-maps';

import {
    View,
    StyleSheet,
    Dimensions,
    Button,
} from 'react-native';

import colors from '../config/colors.js';

export default class TransportScreen extends React.Component {
    render() {
        return(
            <View style={styles.container}>
                <MapView style={styles.mapStyle} showsUserLocation={true}>
                    <Polyline
                        coordinates={[
                            { latitude: 37.8025259, longitude: -122.4351431 },
                            { latitude: 37.7896386, longitude: -122.421646 },
                            { latitude: 37.7665248, longitude: -122.4161628 },
                            { latitude: 37.7734153, longitude: -122.4577787 },
                            { latitude: 37.7948605, longitude: -122.4596065 },
                            { latitude: 37.8025259, longitude: -122.4351431 }
                        ]}
                        strokeColor="#000" 
                        strokeColors={[
                            '#7F0000',
                            '#00000000',
                            '#B24112',
                            '#E5845C',
                            '#238C23',
                            '#7F0000'
                        ]}
                        strokeWidth={6}
                    />
                </MapView>
                <Button title="Start"/>
            </View>

            //TODO Design the button to put here
        ); 
    }
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
