import React from 'react';
import {Platform, Text, TouchableOpacity} from "react-native";

export function DoneButton({ ...props }) {
    return (
        <TouchableOpacity{...props} style={styles.container}>
            <Text style={styles.text}>Enable Location</Text>
        </TouchableOpacity>
    );
}

const styles = {
    container: {
        backgroundColor: '#fff',
        marginRight: 10,
        borderRadius: 30
    },
    text: {
        fontSize: 14,
        fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'Roboto',
        color: '#a30000',
        padding: 10,
    }
}