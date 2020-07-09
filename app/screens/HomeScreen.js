import React from 'react';
import { useIsFocused } from '@react-navigation/native';
import {
    Text, 
    Image, 
    View,
    StyleSheet,
} from 'react-native';

import colors from '../config/colors.js';
import sizes from '../config/sizes.js';
import EmissionCircle from '../components/EmissionCircle.js';
import EmissionManager from '../utils/manager/EmissionManager.js'

export default class HomeScreen extends React.Component {
    _isMounted = false; 
    
    constructor(props) {
        super(props);
        this.state = {emission: 0};
    } 

    componentDidMount(){
        this._isMounted = true;
        EmissionManager.getEmissionTotalToday().then(value => {
            this.setState({emission:value});
        });
    }

    componentDidUpdate(){
        EmissionManager.getEmissionTotalToday().then(value => {
            this.setState({emission:value});
        });
    }
    
    //prevents from getting the warning 
    componentWillUnmount(){
        this._isMounted = false; 
    }

    render() {
        return( 
            <View style={styles.mainView}> 

                <View style={styles.titleContainer}>
                    <Text style={styles.screenTitle}>Home</Text>
                </View>

                <Text style={styles.todaysEmission}>Today's total Emissions</Text> 

                <View style={styles.circle}> 
                    <EmissionCircle emissionNumber={this.state.emission}/>
                </View>
            </View > 
        );
    }
};

const styles = StyleSheet.create({
    screenTitle: {
        left: 10,
        top: 30,
        color: colors.textPrimary, 
        fontSize: 30,
        fontWeight: 'bold',
    }, 
    todaysEmission: {
        top: 70,
        color: colors.textPrimary, 
        fontWeight: 'bold',
        fontSize: sizes.headFontSize,
    },
    mainView: {
        flex: 1,
        alignItems: 'center',
    },
    circle: {
        top: '20%',
    },
}); 

