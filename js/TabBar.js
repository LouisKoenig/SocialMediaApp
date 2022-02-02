import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//Screens
import HomeScreen from './tabs/HomeScreen';
import AccountScreen from './tabs/AccountScreen';
import AccountSettings from './tabs/AccountSettings'
export default function TabBar() {

    const Tab = createBottomTabNavigator();

    return (
    <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen name="Home"
                        component={HomeScreen}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons
                                    name="home"
                                    color={color}
                                    size={size}
                                />
                            ),
                        }}/>
            <Tab.Screen name="Account"
                        component={AccountScreen}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons
                                    name="account"
                                    color={color}
                                    size={size}
                                />
                            ),
                        }}/>
            <Tab.Screen name="Settings"
                        component={AccountSettings}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons
                                    name="account"
                                    color={color}
                                    size={size}
                                />
                            ),
                        }}/> //Added it here for easier implementation
        </Tab.Navigator>
    </NavigationContainer>);
}
