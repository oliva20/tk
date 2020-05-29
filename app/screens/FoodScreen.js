import React from 'react';
import { food } from 'carbon-footprint'; 
import {
    Text, 
    SafeAreaView,
    View,
    StyleSheet,
    Button,
    Slider,
    Picker,
} from 'react-native';

import colors from '../config/colors.js';
import sizes from '../config/sizes.js';
import CalculateEmission from '../utils/calculate/CalculateEmission.js'
import EmissionManager from '../utils/manager/EmissionManager.js'

export default class FoodScreen extends React.Component {
    
    state = {
        value: 500, 
        foodItem: 'vegetables', 
    };

    change(value) {
        this.setState(() => {
            return {
                value: parseFloat(value)
            };
        });
    }
    
    calcEmission() {
        //convert grams to kg
        let carbon = CalculateEmission.getCO2FromFood((this.state.value /1000), 
            this.state.foodItem); 
         
    }

    render() { 
        const { value } = this.state;
        const { foodItem } = this.state;


        return(

            <View style={styles.container}> 
                
                <View>
                    <Text style={styles.screenTitle}>Food</Text>
                </View>

                <View style={styles.pickerView}> 
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

                <View style={styles.sliderView}>

                    <Text style={styles.quantityText}>Quantity: </Text>

                    <Text style={styles.grams}>{this.state.value} grams</Text> 

                    <Slider
                        style={styles.slider} 
                        step={1}
                        maximumValue={1000}
                        onValueChange={this.change.bind(this)}
                        value={value}
                    />


                    <Button title="Add" onPress={this.calcEmission.bind(this)}/>

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

    screenTitle: {
        top: 20,
        color: colors.textPrimary, 
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    }, 


    pickerView: {
        flex: 0.5,
    },
    picker: {
        width: 100,
        height: 50,
    },
    grams: {
        padding: 10,
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: sizes.textFontSize
    },
    quantityText: {
        padding: 10,
        textAlign: 'left',
        fontSize: sizes.headFontSize,
        fontWeight: 'bold',
    },
    slider: {
        width: 300,        
    },
}); 

