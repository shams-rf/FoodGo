import React from 'react';
import {Image, Platform, Text, View} from "react-native";
import location from '../../../assets/mapscreen/location.gif';

export function SplashScreen() {
    return (
        <View style={styles.container}>
            <Image style={{width: 300, height: 300}} source={location}/>
            <Text style={styles.loadingText}>Please wait while we locate you!</Text>
        </View>
    );
}

const styles = {
    container: {
        backgroundColor: '#98bad5',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'Roboto',
    },
    animation: {
        height: 300
    }
}