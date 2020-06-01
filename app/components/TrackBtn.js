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
export default class TrackBtn extends React.Component {
    state = {
        pressed: false,
        text: "Start",
        backgroundColor: colors.primary,
    }

    render() {

        const { text, pressed, backgroundColor } = this.state;

        return(
            <View styles={styles.container}>

                <TouchableOpacity 
                    style={[styles.touch, 
                            {backgroundColor: this.state.backgroundColor}]}
                    onPress={
                        () => {
                            if(this.state.pressed) {
                                this.setState({ pressed : false }); 
                                this.setState({ backgroundColor : colors.primary });
                                this.setState({ text : "Start" });
                                //off
                            } else {
                                //on
                                this.setState({ pressed : true }); 
                                this.setState({ backgroundColor : colors.attention });
                                this.setState({ text : "Stop" });
                            }
                    }}>

                    <Text style={styles.text}>{text}</Text>
                </TouchableOpacity>
            </View>
        );
    }
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
        padding: '3%',
        color: colors.textWhite,
    },
});

