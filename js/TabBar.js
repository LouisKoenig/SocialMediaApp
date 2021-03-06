import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//Screens
import AccountSettings from './tabs/AccountSettings'
import Feed from './tabs/Feed';
import CreatePost from './tabs/CreatePost';
export default function TabBar() {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator screenOptions={{ tabBarActiveTintColor: "#4A0080"}}>
            <Tab.Screen name="Home"
                        component={Feed}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons
                                    name="home"
                                    color={color}
                                    size={size}
                                />
                            ),
                        }}/>
            <Tab.Screen name="Create Post"
                        component={CreatePost}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons
                                    name="pencil"
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
                                    name="cog"
                                    color={color}
                                    size={size}
                                />
                            ),
                        }}/>
        </Tab.Navigator>);
}
