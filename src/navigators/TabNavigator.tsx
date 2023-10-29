import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import TicketScreen from '../screens/TicketScreen';
import UserAccountScreen from '../screens/UserAccountScreen';
import { COLORS, FONTSIZE, SPACING } from '../theme/theme';
import {View, StyleSheet} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons, AntDesign } from "@expo/vector-icons";
import { IconButton, MD3Colors } from 'react-native-paper';
const Tab = createBottomTabNavigator();


const TabNavigator = ()=>{
    return( <Tab.Navigator
        screenOptions={{
            tabBarHideOnKeyboard: true,
            headerShown: false,
            tabBarStyle: {
                backgroundColor: COLORS.Black,
                borderTopWidth: 0,
                height: SPACING.space_10*8,
            },
        }}
    >
        <Tab.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{
            tabBarShowLabel: false,
            tabBarIcon:(tabInfo) =>{
                return(
                    <Ionicons
                        name="home"
                        size={FONTSIZE.size_24}
                        color={tabInfo.focused ? COLORS.Orange : COLORS.WhiteRGBA50}
                    />
                );
            },
        }}/>
        <Tab.Screen name="SearchScreen" component={SearchScreen}
        options={{
            tabBarShowLabel: false,
            tabBarIcon:(tabInfo) =>{
                return(
                    <Ionicons
                        name="md-search"
                        size={FONTSIZE.size_24}
                        color={tabInfo.focused ? COLORS.Orange : COLORS.WhiteRGBA50}
                    />
                );
            },
        }}/>
        <Tab.Screen name="TicketScreen" component={TicketScreen}
        options={{
            tabBarShowLabel: false,
            tabBarIcon:(tabInfo) =>{
                return(
                    <IconButton
                        icon="ticket-confirmation-outline"
                        iconColor={tabInfo.focused ? COLORS.Orange : COLORS.WhiteRGBA50}
                        size={FONTSIZE.size_30}
    
                    />
                );
            },
        }}/>
        <Tab.Screen name="UserAccountScreen" component={UserAccountScreen}
        options={{
            tabBarShowLabel: false,
            tabBarIcon:(tabInfo) =>{
                return(
                    <Ionicons
                        name="person"
                        size={FONTSIZE.size_24}
                        color={tabInfo.focused ? COLORS.Orange : COLORS.WhiteRGBA50}
                    />
                );
            },
        }}/>
        
    </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    activeTabBackground:{
        backgroundColor:COLORS.Black,
        padding:SPACING.space_18,
        borderRadius: SPACING.space_18*10,
    }
});

export default TabNavigator;