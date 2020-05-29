import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import HomeScreen from './app/screens/HomeScreen.js';
import SettingsScreen from './app/screens/SettingsScreen.js';
import TransportScreen from './app/screens/TransportScreen.js';
import FoodScreen from './app/screens/FoodScreen.js';
import colors from './app/config/colors.js'; 

const Tab = createBottomTabNavigator();

export default class App extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Tab.Navigator         
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === 'Home') {
                                iconName = 'ios-home';

                            } else if (route.name === 'Settings') {
                                iconName = focused ? 'ios-list-box' : 'ios-list';

                            }  else if (route.name === 'Transport') {
                                iconName = focused ? 'ios-car' : 'ios-car';

                            }  else if (route.name === 'Food') {
                                iconName = focused ? 'ios-pizza' : 'ios-pizza';
                            }

                            // You can return any component that you like here!
                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                    })}

                    tabBarOptions={{
                        activeTintColor: colors.primary,
                        inactiveTintColor: 'gray',
                    }}
                >

                    <Tab.Screen name="Home" component={HomeScreen} />
                    <Tab.Screen name="Transport" component={TransportScreen} />
                    <Tab.Screen name="Food" component={FoodScreen} />
                    <Tab.Screen name="Settings" component={SettingsScreen} />

                </Tab.Navigator>
            </NavigationContainer>
        );
    }
}
