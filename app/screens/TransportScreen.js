import React from 'react';
import MapView, {Polyline}  from 'react-native-maps';
import * as Location from 'expo-location';
import { transport } from 'carbon-footprint';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Button,
    Picker,
} from 'react-native';

import colors from '../config/colors.js';
import TrackBtn from '../components/TrackBtn.js';

const GEOLOCATION_OPTIONS = { 
    accruracy: Location.Highest,
    distanceInterval: 1,
    timeInterval: 3000, 
}; 

const MARKER_INTERVAL = 10; //every x coordinates register a marker NOTE: We might want to increase this value in the future
var counter = 0; //used to count how many coordinates inserted
var isFirstCoordinate = true;

export default class TansportScreen extends React.Component { 

    state = {
        pressed: false,
        coordinates: [],
        markers: [], 
        btnText: "Start",
        bgColor: colors.primary,
        errorMsg: null, 
    }
    
    componentDidMount(){
        Location.watchPositionAsync(
            GEOLOCATION_OPTIONS,
            this.locationChanged
        ); 
    }

    locationChanged = ( location ) => {
         if(this.state.pressed) {
             let loc = {
                 longitude : location.coords.longitude,
                 latitude : location.coords.latitude,
             }
             
             //type will be the transport type the user is on.
             //the marker object
             let mLoc = {
                 latitude: loc.latitude, 
                 longitude: loc.longitude,
                 type: 'foot',
             }

             this.setState({ 
                 coordinates : this.state.coordinates.concat([loc])
             });
            
             if(isFirstCoordinate){
                this.setState({
                    markers : this.state.markers.concat([mLoc])
                });

                isFirstCoordinate = false;
             }
        
             //adding to markers
            if(counter == MARKER_INTERVAL) {
                this.setState({
                    markers : this.state.markers.concat([mLoc])
                });
                //reset it
                counter = 0;
            } else {
                counter++;
            }

        } else {
            isFirstCoordinate = true;
        }
     }

    render() {
        console.log(transport);
        return(
            <View style={styles.container}>
                <MapView style={styles.mapStyle} showsUserLocation={true} >
                    <Polyline coordinates={this.state.coordinates} strokeColor={colors.primary} strokeWidth={5}/>
                    {
                        this.state.markers.map(marker => (
                            <MapView.Marker
                                coordinate={{ latitude: marker.latitude, longitude: marker.longitude, }}
                                title="Location Marker"
                            > 
                                <MapView.Callout>
                                    <View> 
                                    </View>
                                </MapView.Callout>

                            </MapView.Marker>
                        ))
                    }
                    

                </MapView> 

                <View style={styles.btnView}>
                    <TrackBtn style={{backgroundColor: this.state.bgColor}} 
                        text={this.state.btnText} 
                        onPress={() => {

                            if(this.state.pressed) {
                                
                                //save the last coordinate to the markers array.
                                let lastCoordinate = this.state.coordinates[this.state.coordinates.length - 1]; 
                                let mLastCoordinate = {
                                        latitude: lastCoordinate.latitude, 
                                        longitude: lastCoordinate.longitude,
                                        type: 'foot',
                                } 
                                
                                this.setState({
                                    markers : this.state.markers.concat(mLastCoordinate)
                                });
                                this.setState({pressed:false});
                                this.setState({btnText:"Start"});
                                this.setState({bgColor:colors.primary});

                                console.log(this.state.markers);
                            } else {
                                //consider adding this logic to a function -> It's gross. 
                                //delete the exisiting coordinates before starting again.
                                this.setState({markers:[]});
                                this.setState({coordinates: []});
                                this.setState({pressed:true});
                                this.setState({btnText:"Stop"});
                                this.setState({bgColor:colors.attention});
                            }
                        }}></TrackBtn>
                </View>
            </View>
        );

    } 
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
