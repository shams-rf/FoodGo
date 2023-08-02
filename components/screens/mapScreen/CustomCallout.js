import React from 'react';
import {Text, View} from "react-native";
import {Callout} from "react-native-maps";

export function CustomCallout(props) {
    return (
        <Callout tooltip>
            <View style={styles.callout}>
                <Text>{props.place.name}</Text>
            </View>
        </Callout>
    );
}

const styles = {
    callout: {
        borderRadius: 5,
        backgroundColor: '#fff',
        borderColor: '#98bad5',
        borderWidth: 2,
        padding: 10,
        marginBottom: 5
    }
}