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
const AddEmissionBtn = ( props ) => {
    const { onPress } = props;
    return(
        <View styles={styles.container}>
           <TouchableOpacity style={styles.touch} onPress={onPress}>
               <Text style={styles.text}>Generate Emission</Text>
           </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '10%',
    }, 
    touch: {
        backgroundColor: colors.primary,
        color: colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    text: {
        fontSize: sizes.textFontSize,
        padding: '4%',
        color: colors.textWhite,
    },
});
export default AddEmissionBtn;

