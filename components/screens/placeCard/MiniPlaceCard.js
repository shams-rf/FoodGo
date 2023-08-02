import React from 'react';
import {Platform, Text, View} from "react-native";

export function MiniPlaceCard(props) {

    if(props.place === null) {
        return (
            <View>
                <Text>Hi</Text>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{props.place.name}</Text>
            </View>
        )
    }
}

const styles = {
    container: {
        paddingLeft: 20
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'Roboto',
    }
}