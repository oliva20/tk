import React from 'react';
import { useIsFocused } from '@react-navigation/native';
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
            <SafeAreaView style={styles.mainView} > 
                <Text style={styles.screenTitle}>Today's total Emissions</Text> 

                <View style={styles.circle}> 
                    <EmissionCircle emissionNumber={this.state.emission}/>
                </View>

            </SafeAreaView> 
        );
    }
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

