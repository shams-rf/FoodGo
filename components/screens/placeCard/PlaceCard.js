import React from 'react';
import {Text, View} from "react-native";
import {ActionButtons} from "./ActionButtons";
import {PlaceRating} from "./PlaceRating";
import {Distance} from "./Distance";
import {ImageSlider} from "./ImageSlider";

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
                <ImageSlider place={props.place}/>
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
        fontSize: 22,
        fontWeight: 500,
        fontFamily: 'Rubik-Medium'
    },
    quickInfoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
}