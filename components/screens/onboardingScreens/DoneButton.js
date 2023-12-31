import React from 'react';
import {Text, TouchableOpacity} from "react-native";
import {colours} from "../../../config/Colours";

export function DoneButton({ ...props }) {
    return (
        <TouchableOpacity {...props} style={styles.container}>
            <Text style={styles.text}>Let's Go</Text>
        </TouchableOpacity>
    );
}

const styles = {
    container: {
        backgroundColor: colours.red,
        marginRight: 10,
        borderRadius: 30,
        padding: 2
    },
    text: {
        fontSize: 16,
        fontFamily: 'regular',
        color: '#fff',
        padding: 10,
    }
}