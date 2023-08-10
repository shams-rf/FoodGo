import React from 'react';
import {Platform, Text, TouchableOpacity, View} from "react-native";
import * as Location from "expo-location";

export function LocationPermissions() {
    function getLocationPermissions() {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if(status !== 'granted') {
                console.log('Location unavailable')
            }
        })();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.subtitle}>We need location access to show places near you</Text>
            <TouchableOpacity style={styles.button} onPress={getLocationPermissions}>
                <Text style={styles.buttonText}>Enable Location</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = {
    container: {
        gap: 20
    },
    button: {
        backgroundColor: '#2f5233',
        alignSelf: 'center',
        padding: 8,
        borderRadius: 20
    },
    buttonText: {
        fontSize: 16,
        fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'Roboto',
        color: '#fff'
    }
}