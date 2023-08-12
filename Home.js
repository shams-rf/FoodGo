import React, {useEffect, useState} from 'react';
import * as Location from "expo-location";
import {LocationDenied} from "./components/screens/locationDeniedScreen/LocationDenied";
import {MapScreen} from "./components/screens/mapScreen/MapScreen";
import {SplashScreen} from "./components/screens/splashScreen/SplashScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";
import {SettingsScreen} from "./components/screens/SettingsScreen";
import {Platform} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {constants} from "./config/Constants";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export function Home() {
    const [location, setLocation] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if(status !== 'granted') {
                setError(true)
                return;
            }

            let location = await Location.getLastKnownPositionAsync({});
            setLocation(location)
        })();
    }, [])

    const Tab = createBottomTabNavigator()

    if(error) {
        return (
            <LocationDenied/>
        )
    } else if(location) {
        return (
            <NavigationContainer>
                <Tab.Navigator screenOptions={
                    {
                        headerShown: false,
                        tabBarLabelStyle: styles.tabBarText,
                        tabBarActiveTintColor: constants.colors.limeGreen
                    }
                }>
                    <Tab.Screen options={{
                        tabBarIcon: ({focused}) => (
                            <FontAwesome5 name={'map'} color={focused ? constants.colors.limeGreen : 'gray'}/>
                        )
                    }} name={'MapScreen'} children={() => <MapScreen location={location}/>}/>
                    <Tab.Screen options={{
                        tabBarIcon: ({focused}) => (
                            <FontAwesome name={'gears'} color={focused ? constants.colors.limeGreen : 'gray'}/>
                        )
                    }} name={'Settings'} children={() => <SettingsScreen/>}/>
                </Tab.Navigator>
            </NavigationContainer>
        )
    } else {
        return (
            <SplashScreen/>
        )
    }
}

const styles = {
    tabBarText: {
        fontSize: 12,
        fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'Roboto',
    }
}