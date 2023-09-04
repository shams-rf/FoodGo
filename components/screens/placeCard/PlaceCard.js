import React from 'react';
import {Text, View} from "react-native";
import {ActionButtons} from "./ActionButtons";
import {ImageSlider} from "./ImageSlider";
import {FavouriteHeart} from "./FavouriteHeart";

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
                <View style={styles.titleAndFavContainer}>
                    <Text style={styles.title}>{props.place.name}</Text>
                    <FavouriteHeart place={props.place}/>
                </View>
                <ActionButtons place={props.place}/>
                <ImageSlider place={props.place}/>
            </View>
        )
    }
}

const styles = {
    titleAndFavContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    container: {
        paddingLeft: 20,
        paddingRight: 20,
        gap: 15,
    },
    title: {
        fontSize: 22,
        fontFamily: 'ComfortaaBold'
    },
    quickInfoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
}