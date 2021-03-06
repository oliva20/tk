import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import MapView, {Polyline}  from 'react-native-maps';
import * as Location from 'expo-location';
import DropdownMenu from 'react-native-dropdown-menu';
import { transport } from 'carbon-footprint'; //returns Object
import Toast, {DURATION} from 'react-native-easy-toast';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Dimensions,
    Button,
    Picker,
    TouchableOpacity,
    Alert,
} from 'react-native';

import colors from '../config/colors.js';
import TrackBtn from '../components/TrackBtn.js';
import CalculateEmission from '../utils/calculate/CalculateEmission.js';
import EmissionManager from '../utils/manager/EmissionManager.js';

const GEOLOCATION_OPTIONS = { 
    accruracy: Location.Highest,
    distanceInterval: 1,
    timeInterval: 3000, 
}; 

//TODO The save ICON could have a small popup hint to tell the user to use it to save the generate the emissions from the current route.
const SAVE_ICON = { url: '../assets/save.png' };

const MARKER_INTERVAL = 10; //every x coordinates register a marker NOTE: We might want to increase this value in the future
var counter = 0; //used to count how many coordinates inserted
var idCounter = 0; //counts markers id
var isFirstCoordinate = true;
var transportList = [Object.keys(transport).map(function(key){
    return key;
})];


export default class TansportScreen extends React.Component { 
    
    state = {
        permissionStatus: null,
        pressed: false,
        coordinates: [],
        markers: [], 
        btnText: "Start",
        bgColor: colors.primary,
        errorMsg: null, 
        modalVisible: false,
        displayMarkers: false,
    }
   
    
    componentDidMount(){
        Location.watchPositionAsync(
            GEOLOCATION_OPTIONS,
            this.locationChanged
        ); 
    }

    updateMarker = (marker, markers, selection, row) => {
        //using ids to find the matching markers. 
        markers.forEach(item => { 
            if(item.id === marker.id)
                item.type = transportList[selection][row]; 
        });
    }
    
    //TODO use a strings file for translation.
    calculate = () => {
        if(this.state.markers.length == 0)
            Alert.alert('Oops! No Route Detected', 'Please start tracking your coordinates and change the mode of transport by pressing each marker.',
                [
                    {
                        text: "Got it",
                    },
                ]);

        let total = CalculateEmission.getCO2FromMarkers(this.state.markers);
        console.log(`Emission Total from Transport: ${total}`);
        EmissionManager.storeEmission(total);
        this.setState({ markers : [] });
        this.setState({ coordinates: [] });
    } 

    locationChanged = ( location ) => {

         if(this.state.pressed) {

             idCounter++; 

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
                 id: idCounter,
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
                //reset counter 
                counter = 0;
            } else {
                counter++;
            }

        } else {
            isFirstCoordinate = true;
        }
     }

    
    render() {
        return(
            <View style={styles.container}>
                <MapView style={styles.mapStyle} showsUserLocation={true} >
                    <Polyline coordinates={this.state.coordinates} strokeColor={colors.primary} strokeWidth={5}/>
                    {
                        this.state.markers.map(marker => (
                            <MapView.Marker
                                coordinate={{ latitude: marker.latitude, longitude: marker.longitude, }}
                                title="Marker"
                            > 
                                    <MapView.Callout style={styles.infoWindow}>
                                        <View>
                                            <Text>What were you on here?</Text>
                                            <DropdownMenu
                                                bgColor={'white'}
                                                tintColor={'#666666'}
                                                activityTintColor={'green'}
                                                data={transportList}
                                                handler={
                                                    //There might be a better way to 
                                                    //do this but for now we create
                                                    //a reference to each marker.
                                                    //Iterate thorugh markers array, 
                                                    //find the matching marker and change
                                                    //the type property.
                                                    (selection, row) => 
                                                        this.updateMarker(marker,
                                                                    this.state.markers,
                                                                    selection,
                                                                    row)
                                                }
                                            >
                                            </DropdownMenu>
                                        </View>
                                    </MapView.Callout>
                            </MapView.Marker>
                        ))
                    }
     
                </MapView> 

                    <TouchableOpacity
                        style={styles.saveView}
                        onPress={this.calculate}
                    >
                        <View
                        >
                            <AntDesign name="save" size={32} color={colors.primary} />
                        </View>
                    </TouchableOpacity>

                <View style={styles.btnView}>
                    <TrackBtn style={{backgroundColor: this.state.bgColor}} 
                        text={this.state.btnText} 
                        onPress={() => {
                            if(this.state.pressed) {
                                //TODO Somewhere in here we must warn the user that the coordinates were acquired.
                                //save the last coordinate to the markers array.
                                if(this.state.coordinates.length != 0) { //if the coordinates are not empty, otherwise warn the user
                                    let lastCoordinate = this.state.coordinates[this.state.coordinates.length - 1]; 
                                    let mLastCoordinate = {
                                        latitude: lastCoordinate.latitude, 
                                        longitude: lastCoordinate.longitude,
                                        type: 'foot',
                                        id: idCounter,
                                    } 

                                    this.setState({
                                        markers : this.state.markers.concat(mLastCoordinate)
                                    });
                                } else {
                                    //TODO translate here. Add to strings file.
                                    this.refs.toast.show('No coordinates were tracked, check your internet connection');
                                }
                                
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
            <Toast ref="toast" defaultCloseDelay={5000} />
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
    infoWindow: {
        width: Dimensions.get('window').width / 2,
    },
    saveView: {
        position: 'absolute',
        top: '10%',
        right: '5%',
        alignSelf: 'flex-end',
    },
    saveIcon: {
        padding: 10
    }
}); 
