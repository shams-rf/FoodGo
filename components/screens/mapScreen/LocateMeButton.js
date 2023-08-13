import React from 'react';
import {Platform, SafeAreaView, TouchableOpacity} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {colours} from '../../../config/Colours';

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
                <FontAwesome5 name={'location-arrow'} color={colours.limeGreen}/>
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
        width: 40,
        height: 40,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    }
}