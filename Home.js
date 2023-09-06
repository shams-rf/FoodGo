import React, {useEffect, useState} from 'react';
import * as Location from "expo-location";
import {LocationDenied} from "./components/screens/locationDeniedScreen/LocationDenied";
import {MapScreen} from "./components/screens/mapScreen/MapScreen";
import {SplashScreen} from "./components/screens/splashScreen/SplashScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";
import {Main} from "./components/screens/Main";
import {Image, Platform} from "react-native";
import {colours} from "./config/Colours";
const mapIcon = require('./assets/tabs/map.png')
const mapIconGray = require('./assets/tabs/mapGray.png')
const heartIcon = require('./assets/tabs/heart.png')
const heartIconGray = require('./assets/tabs/heartGray.png')

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

            location = await Location.getCurrentPositionAsync({});
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
            <NavigationContainer independent>
                <Tab.Navigator screenOptions={
                    {
                        headerShown: false,
                        tabBarLabelStyle: styles.tabBarText,
                        tabBarActiveTintColor: colours.limeGreen,
                        tabBarInactiveTintColor: 'gray',
                        tabBarShowLabel: false
                    }
                }>
                    <Tab.Screen options={{
                        tabBarIcon: ({focused}) => {
                            if(focused) {
                                return (
                                    <Image style={styles.icons} source={mapIcon}/>
                                )
                            } else {
                                return (
                                    <Image style={styles.icons} source={mapIconGray}/>
                                )
                            }
                        }
                    }} name={'MapScreen'} children={() => <MapScreen location={location}/>}/>
                    <Tab.Screen options={{
                        unmountOnBlur: true,
                        tabBarIcon: ({focused}) => {
                            if(focused) {
                                return (
                                    <Image style={styles.icons} source={heartIcon}/>
                                )
                            } else {
                                return (
                                    <Image style={styles.icons} source={heartIconGray}/>
                                )
                            }
                        }
                    }} name={'Favourites'} children={() => <Main/>}/>
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
    },
    icons: {
        width: 30,
        height: 30
    }
}