import React from 'react';

import {
    Text, 
    View,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import colors from '../config/colors.js';
import sizes from '../config/sizes.js';

//TODO create strings file for translation
const TrackButton = props => { 
    return(
        <View styles={styles.container}>
            <TouchableOpacity 
                style={{...styles.touch, ...props.style}}
                onPress={props.onPress}>
                <Text style={styles.text}>{props.text}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '10%',
    }, 
    touch: {
        color: colors.white, 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    text: {
        fontSize: sizes.textFontSize,
        padding: '3%',
        color: colors.textWhite,
    },
});

export default TrackButton;
