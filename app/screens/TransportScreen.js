import React, {useState, useEffect} from 'react';
import MapView, {Polyline}  from 'react-native-maps';
import * as Location from 'expo-location';
import {
    View,
    StyleSheet,
    Dimensions,
    Button,
} from 'react-native';

import colors from '../config/colors.js';
import TrackBtn from '../components/TrackBtn.js';

export default function TransportScreen() { 

    const [errorMsg, setErrorMsg] = useState(null);
    //coordinates are used to create a route
    const [coordinates, setCoordinates] = useState([]);
    //markers are used to allow the user to choose what mode of transport was used
    //at that coordinate 
    const [markers, setMarkers] = useState([]);
    const [pressed, setIsPressed] = useState(false); 
    const [btnText, setBtnText] = useState("Start");
    const [bgColor, setBgColor] = useState(colors.primary);
    
    useEffect(() => {
        (async () => {
            if(pressed) { //start adding to the array when btn is pressed
                let location = await Location.getCurrentPositionAsync({}); 
                //TODO this is not working. Before adding new coordinate, check if it exists already
                if(!coordinates.includes(location)) {//avoid adding repetive coordinates 
                    console.log(`Coordinate: ${location}`);
                    setCoordinates(coordinates.concat(location)); 
                } 

            } else {
                console.log("Stopped tracking coordinates here are the list of coordinates gathered:");
                console.log(coordinates);
            }
        })();
    });
    
    //TODO Maybe create a function that will handle the construciton of a route
    //with the markers and all. This function should calculate the appropriate
    //number of markers to dislplay in the map. In on hand it should be overpopulated
    //and on the other unpopulated. Somehow we must find an ideal number of markers
    //to be displayed depending in the amount of coordinates. Of course the first
    //and last coordinate will always be displayed as markers.
    
    //TODO Consider creating a custom marker with popup to ask the user about
    //what mode of transport they were using. Then we can send that data to a manager
    //class that will calculate the emissions depending in the distance between 
    //the two markers. 
    return(
        <View style={styles.container}>
            <MapView style={styles.mapStyle} showsUserLocation={true} />
            <View style={styles.btnView}>
                <TrackBtn style={{backgroundColor: bgColor}} 
                          text={btnText} 
                          onPress={() => {
                              if(pressed) {
                                  setIsPressed(false);
                                  setBtnText("Start");
                                  setBgColor(colors.primary);
                              } else {
                                  setIsPressed(true);
                                  setBtnText("Stop");
                                  setBgColor(colors.attention);
                              }
                          }}></TrackBtn>
            </View>
        </View>
    ); 
}

const styles = StyleSheet.create({
    btnView: {
        position: 'absolute',
        top: '90%',
        alignSelf: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        flex: 1,
    },
}); 
