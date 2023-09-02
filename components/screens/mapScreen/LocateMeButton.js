import React from 'react';
import {Image, Platform, SafeAreaView, TouchableOpacity} from "react-native";
const locateMe = require('../../../assets/mapscreen/locateMe.png')

export function LocateMeButton(props) {
    function focusLocation() {
        let r = {
            latitude: props.location.coords.latitude,
            longitude: props.location.coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
        };
        props.mapView.animateToRegion(r, 1000)
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={focusLocation}>
                <Image style={styles.arrow} source={locateMe}/>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = {
    container: {
        alignSelf: 'flex-end',
        position: 'absolute',
        right: 10,
        top: (Platform.OS === 'android') ? 50 : null
    },
    button: {
        backgroundColor: '#fff',
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrow: {
        width: '50%',
        height: '50%'
    }
}