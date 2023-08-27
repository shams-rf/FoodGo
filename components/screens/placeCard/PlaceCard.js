import React from 'react';
import {Platform, Text, View} from "react-native";
import {ActionButtons} from "./ActionButtons";
import {PlaceRating} from "./PlaceRating";
import {colours} from "../../../config/Colours";
import {Distance} from "./Distance";

export function PlaceCard(props) {
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
                <View style={styles.quickInfoBox}>
                    <Distance location={props.location} place={props.place}/>
                    <PlaceRating place={props.place}/>
                </View>
                <ActionButtons place={props.place}/>
            </View>
        )
    }
}

const styles = {
    container: {
        paddingLeft: 20,
        paddingRight: 20,
        gap: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'Roboto',
    },
    open: {
        fontSize: 14,
        fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'Roboto',
        color: colours.leafGreen,
    },
    closed: {
        fontSize: 14,
        fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'Roboto',
        color: '#ff6961',
    },
    chipText: {
        color: 'white',
        fontSize: 14,
        fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'Roboto',
    },
    quickInfoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
}