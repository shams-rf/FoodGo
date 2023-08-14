import React, {useState} from 'react';
import {Platform, Text, View} from "react-native";
import {ActionButtons} from "./ActionButtons";
import axios from "axios";
import {constants} from "../../../config/Constants";
import {PlaceRating} from "./PlaceRating";
import {colours} from "../../../config/Colours";

export function PlaceCard(props) {
    const [distance, setDistance] = useState(null)

    function getDistance() {
        axios.get('https://maps.googleapis.com/maps/api/distancematrix/json?', {
            params: {
                destinations: `${props.place.location.latitude},${props.place.location.longitude}`,
                origins: `${props.location.coords.latitude},${props.location.coords.longitude}`,
                key: constants.googleMapsConfig.API_KEY
            }
        })
            .then((response) => {
                setDistance(response.data.rows[0].elements[0].distance.text)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    if(props.place === null) {
        return (
            <View>
                <Text>Hi</Text>
            </View>
        )
    } else {
        getDistance()
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{props.place.name}</Text>
                <View style={styles.quickInfoBox}>
                    <Text style={styles.distance}>{distance}</Text>
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
    distance: {
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'Roboto',
    }
}