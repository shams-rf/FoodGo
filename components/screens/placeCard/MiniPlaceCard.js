import React, {useState} from 'react';
import {Platform, Text, View} from "react-native";
import {ActionButtons} from "./ActionButtons";
import axios from "axios";
import {googleMapsConfig} from "../../../config/GoogleMapsConfig";
import {PlaceRating} from "./PlaceRating";

export function MiniPlaceCard(props) {
    const [distance, setDistance] = useState(null)

    function getDistance() {
        axios.get('https://maps.googleapis.com/maps/api/distancematrix/json?', {
            params: {
                destinations: `${props.place.geometry.location.lat},${props.place.geometry.location.lng}`,
                origins: `${props.location.coords.latitude},${props.location.coords.longitude}`,
                key: googleMapsConfig.API_KEY
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
                    <Text style={props.place.opening_hours.open_now ? styles.open : styles.closed}>
                        {props.place.opening_hours.open_now ? 'Open' : 'Closed'}
                    </Text>
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
        color: '#76b947',
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