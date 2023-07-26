import React from 'react';
import {Platform, Text, View} from "react-native";
import {DirectionsButton} from "./DirectionsButton";

export function MiniPlaceCard(props) {
    if(props.place == null) {
        return (
            <View/>
        )
    } else if(props.showCard) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{props.place.name}</Text>
                <View style={styles.bottomButtons}>
                    <DirectionsButton place={props.place}/>
                </View>
            </View>
        );
    }
}

const styles = {
    container: {
        position: 'absolute',
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        padding: 20,
        backgroundColor: '#fff',
        bottom: 0,
        width: '100%',
        height: '40%',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 18,
        fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'Roboto',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    bottomButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
}