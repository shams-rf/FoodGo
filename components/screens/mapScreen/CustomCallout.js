import React from 'react';
import {Text, View} from "react-native";
import {Callout} from "react-native-maps";
import openMaps from "react-native-open-maps";

export function CustomCallout(props) {
    function goToMaps() {
        openMaps({
            end: `${props.place.geometry.location.lat},${props.place.geometry.location.lng}`,
            provider: 'google',
            travelType: 'drive'
        })
    }

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