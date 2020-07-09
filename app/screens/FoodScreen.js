import React from 'react';
import { food } from 'carbon-footprint'; 
import {
    Text, 
    View,
    StyleSheet,
    Slider,
    Picker,
} from 'react-native';

import colors from '../config/colors.js';
import sizes from '../config/sizes.js';
import CalculateEmission from '../utils/calculate/CalculateEmission.js';
import EmissionCircle from '../components/EmissionCircle.js';
import AddEmissionBtn from '../components/AddEmissionBtn.js';
import EmissionManager from '../utils/manager/EmissionManager.js';

export default class FoodScreen extends React.Component {
    state = {
        value: 250, 
        foodItem: 'vegetables', 
    };

    change(value) {
        this.setState(() => {
            return {
                //round for now and then it will be converted to kilos 
                //when sent to the manager 
                value: Math.round(value),
            };
        });
    }
    
    calcEmission() {
        //convert grams to kg
        let emission = CalculateEmission.getCO2FromFood((this.state.value /1000), 
            this.state.foodItem); 

        EmissionManager.storeEmission(emission);  
        
        this.setState({ value: 250 });
    }

    render() { 

        const MIN_SLIDER_VALUE = 20;
        const MAX_SLIDER_VALUE = 500;

        const { value } = this.state;
        const { foodItem } = this.state;


        return(

            <View style={styles.container}> 

                <View style={styles.titleContainer}>
                    <Text style={styles.screenTitle}>Food Emission</Text>
                </View>

                <View style={styles.foodItemContainer}>
                    <Text style={styles.subTitle}> Food Item: </Text>
                    <Picker
                        style={styles.picker}
                        selectedValue={this.state.foodItem}
                        onValueChange={(itemValue) => 
                                this.setState({foodItem: itemValue})}>
                        {
                            Object.keys(food).map((item) => {
                                return <Picker.Item label={item} value={item} />
                            })
                        }
                    </Picker>
                </View>

                <View style={styles.quantityContainer}>
                    
                    <Text style={styles.subTitle}>Quantity: </Text>
                    <Text style={styles.grams}>{this.state.value} grams</Text> 

                    <Slider
                        minimumTrackTintColor={colors.primary}
                        maximumTrackTintColor={colors.gray}
                        thumbTintColor={colors.primary}
                        style={styles.slider}
                        value={value}
                        onSlidingComplete={this.change.bind(this)}
                        maximumValue={MAX_SLIDER_VALUE}
                        minimumValue={MIN_SLIDER_VALUE}
                    />

                    <AddEmissionBtn onPress={() => {this.calcEmission()}} />

                </View>
            </View>
        );

    } 
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'space-around',
    },
    foodItemContainer: {
        padding: 10,
        alignItems: 'center',
    },
    titleContainer: {
        margin: 50,
    },
    quantityContainer: {
        margin: 120,
    },
    screenTitle: {
        top: 20,
        color: colors.textPrimary, 
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    }, 
    picker: {
        width: 100,
        height: 50,
    },
    grams: {
        padding: 10,
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: sizes.textFontSize,
    },
    subTitle: {
        padding: 10,
        textAlign: 'left',
        fontSize: sizes.headFontSize,
        fontWeight: 'bold',
    },
    slider: {
        width: 300,        
        margin: 15,
    },
}); 

