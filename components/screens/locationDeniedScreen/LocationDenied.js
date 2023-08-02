import React from 'react';
import {Text, TouchableOpacity, View, Linking, Platform, Image} from "react-native";
const sad = require('../../../assets/icons/warning.gif');

export function LocationDenied() {
    function openLocationSettings() {
        Linking.openSettings()
            .then(() => console.log('settings opened'))
            .catch(() => console.log('error'))
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Oops!</Text>
            <Image style={{height: 300, width: 300}} source={sad}/>
            <Text style={styles.message}>Looks like we don't location access</Text>
            <TouchableOpacity style={styles.button} onPress={openLocationSettings}>
                <Text style={styles.message}>Go to location settings</Text>
            </TouchableOpacity>
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
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'Roboto',
        color: '#fff',
        marginBottom: '20%'
    },
    animation: {
        height: 300
    },
    message: {
        fontSize: 18,
        fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'Roboto',
        color: '#fff',
    },
    button: {
        borderRadius: 30,
        backgroundColor: '#304674',
        padding: 10,
        marginTop: '10%',
    }
}