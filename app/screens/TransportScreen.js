import React from 'react';
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

const GEOLOCATION_OPTIONS = { 
    accruracy: Location.Highest,
    distanceInterval: 0,
    timeInterval: 3000, 
}; 
const test_coords=[
          { 
              longitude: -1.8843,
              latitude:  50.82123 
          },
          { longitude: -1.88366,latitude: 50.82108 },
          { longitude: -1.88331,latitude: 50.82102 },
          { longitude: -1.88303,latitude: 50.82099 },
          { longitude: -1.8827,latitude: 50.82096 },
          { longitude: -1.88246,latitude: 50.82094 },
          { longitude: -1.88189,latitude: 50.82089 },
          { longitude: -1.88096,latitude: 50.82081 },
          { longitude: -1.88038,latitude: 50.82169 },
          { longitude: -1.88016,latitude: 50.82203 },
          { longitude: -1.88011,latitude: 50.8221 },
          { longitude: -1.87958,latitude: 50.82285 },
          { longitude: -1.87901,latitude: 50.82366 },
          { longitude: -1.87996,latitude: 50.8239 },
          { longitude: -1.88008,latitude: 50.82392 },
          { longitude: -1.88173,latitude: 50.82428 },
          { longitude: -1.88206,latitude: 50.82437 },
          { longitude: -1.88225,latitude: 50.82445 },
          { longitude: -1.88251,latitude: 50.82454 },
          { longitude: -1.88272,latitude: 50.8246 },
          { longitude: -1.88321,latitude: 50.82472 },
          { longitude: -1.88341,latitude: 50.82478 },
          { longitude: -1.88556,latitude: 50.82402 },
          { longitude: -1.88602,latitude: 50.82386 },
          { longitude: -1.88667,latitude: 50.82359 },
          { longitude: -1.88699,latitude: 50.82348 },
          { longitude: -1.88751,latitude: 50.82328 },
          { longitude: -1.8873,latitude: 50.8228 },
          { longitude: -1.88716,latitude: 50.82248  },         
          { longitude: -1.88715,latitude: 50.82245 },
          { longitude: -1.88697,latitude: 50.82201 },       
          { longitude: -1.88695,latitude: 50.82202 },
          { longitude: -1.88694,latitude: 50.82202 },
          { longitude: -1.88692,latitude: 50.82202 },
          { longitude: -1.88691,latitude: 50.82201 },
          { longitude: -1.8869,latitude: 50.82201 },
          { longitude: -1.8869,latitude: 50.822 },
          { longitude: -1.88689,latitude: 50.82199 },
          { longitude: -1.88689,latitude: 50.82198 },
          { longitude: -1.88689,latitude: 50.82197 },
          { longitude: -1.88689,latitude: 50.82196 },
          { longitude: -1.8869,latitude: 50.82195 },
          { longitude: -1.88692,latitude: 50.82195 },
          { longitude: -1.88694,latitude: 50.82194 },
          { longitude: -1.88687,latitude: 50.82173 },
          { longitude: -1.88671,latitude: 50.82131 },
          { longitude: -1.88664,latitude: 50.82113 },
          { longitude: -1.88638,latitude: 50.82045 },
          { longitude: -1.88639,latitude: 50.82035 },
          { longitude: -1.8864,latitude: 50.8203 },
          { longitude: -1.88641,latitude: 50.82026 },
          { longitude: -1.88641,latitude: 50.82025 },
          { longitude: -1.88644,latitude: 50.8202 },
          { longitude: -1.88647,latitude: 50.82015 },
          { longitude: -1.88654,latitude: 50.82006 },
          { longitude: -1.88671,latitude: 50.81987 }
		]; 

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
        //simulating coordiantes being added.
         if(this.state.pressed) {
             let loc = {
                 longitude : location.coords.longitude,
                 latitude : location.coords.latitude,
             }

             this.setState({ 
                 coordinates : this.state.coordinates.concat([loc])
             });
        }
     }

    render() {
        return(
            <View style={styles.container}>
                <MapView style={styles.mapStyle} showsUserLocation={true} >
                    <Polyline coordinates={this.state.coordinates} strokeColor={colors.primary} strokeWidth={5}/>
                </MapView> 

                <View style={styles.btnView}>
                    <TrackBtn style={{backgroundColor: this.state.bgColor}} 
                        text={this.state.btnText} 
                        onPress={() => {
                            if(this.state.pressed) {
                                console.log(`Got this many coordinates: ${this.state.coordinates.length}`);
                                this.setState({pressed:false});
                                this.setState({btnText:"Start"});
                                this.setState({bgColor:colors.primary});
                            } else {
                                //delete the exisiting coordinates before starting again.
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
