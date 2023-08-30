import React, {useEffect, useState} from 'react';
import {Text, View} from "react-native";
import axios from "axios";
import {constants} from "../../../config/Constants";

export function Distance(props) {
    const [distance, setDistance] = useState(null)

    useEffect(() => {
        getDistance()
    }, [props.place])

    function getDistance() {
        setDistance('calculating')
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

    return (
        <View style={styles.container}>
            <Text style={styles.distanceTitle}>Distance</Text>
            <Text style={styles.distanceText}>{distance}</Text>
        </View>
    );
}

const styles = {
    distanceTitle: {
        fontSize: 14,
        fontWeight: 500,
        fontFamily: 'Rubik-Medium',
    },
    distanceText: {
        fontSize: 16,
        fontWeight: 500,
        fontFamily: 'Rubik-Medium',
    }
}