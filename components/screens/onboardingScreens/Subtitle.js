import React from 'react';
import {Text} from "react-native";

export function Subtitle(props) {
    return (
        <Text style={styles.text}>{props.text}</Text>
    );
}

const styles = {
    text: {
        fontFamily: 'light',
        fontSize: 16,
        textAlign: 'center'
    }
}