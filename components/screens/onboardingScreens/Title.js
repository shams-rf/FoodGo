import React from 'react';
import {Text} from "react-native";

export function Title(props) {
    return (
        <Text style={styles.title}>{props.title}</Text>
    );
}

const styles = {
    title: {
        fontFamily: 'medium',
        fontSize: 26,
        marginBottom: 20
    }
}