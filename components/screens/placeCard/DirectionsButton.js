import React from 'react';
import {Platform, Text, TouchableOpacity} from "react-native";
import {constants} from '../../../config/Constants';

export function DirectionsButton() {
    return (
        <TouchableOpacity style={styles.button}>
            <Text style={styles.message}>Directions</Text>
        </TouchableOpacity>
    );
}

const styles = {
    button: {
        backgroundColor: constants.colors.light,
        width: 100,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        alignSelf: 'flex-end'

    },
    message: {
        fontSize: 16,
        fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'Roboto',
        color: '#fff'
    }
}