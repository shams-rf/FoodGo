import {Text, TouchableOpacity} from "react-native";
import React from "react";
import {colours} from "../../../config/Colours";

export function NextButton({ ...props }) {
    return (
        <TouchableOpacity {...props} style={styles.container}>
            <Text style={styles.text}>Next</Text>
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