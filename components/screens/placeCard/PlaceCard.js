import React from 'react';
import {Text, View} from "react-native";
import {ActionButtons} from "./ActionButtons";
import {ImageSlider} from "./ImageSlider";
import {FavouriteHeart} from "./FavouriteHeart";
import {Divider} from "@rneui/themed";
import {OpeningHours} from "./OpeningHours";

export function PlaceCard(props) {
    if(props.place === null) {
        return null
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.titleAndFavContainer}>
                    <Text style={styles.title}>{props.place.name}</Text>
                    <FavouriteHeart user={props.user} place={props.place}/>
                </View>
                <Text style={styles.address}>{props.place.address}</Text>
                <ActionButtons place={props.place}/>
                <ImageSlider place={props.place}/>
                <Divider/>
                <Text style={styles.subtitle}>Opening hours</Text>
                <OpeningHours place={props.place}/>
                <Divider/>
                <Text style={styles.subtitle}>Halal Information</Text>
                <Text style={styles.text}>Certificate Level: {props.place.certificate}</Text>
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
        fontFamily: 'bold'
    },
    quickInfoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    address: {
        fontSize: 16,
        fontFamily: 'medium'
    },
    subtitle: {
        fontSize: 20,
        fontFamily: 'bold'
    },
    text: {
        fontSize: 16,
        fontFamily: 'regular'
    }
}