import React, {useState} from 'react';
import {Platform, Text, View} from "react-native";
import {Chip} from "react-native-paper";
import {Rating} from "react-native-ratings";
import {DirectionsButton} from "./DirectionsButton";
import axios from "axios";
import {googleMapsConfig} from "../../../config/GoogleMapsConfig";

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
                <View style={styles.headingBox}>
                    <Text style={styles.title}>{props.place.name}</Text>
                    <Chip
                        textStyle={styles.chipText}
                        style={props.place.opening_hours.open_now ? styles.greenChip : styles.redChip}
                    >
                        {props.place.opening_hours.open_now ? 'Open' : 'Closed'}
                    </Chip>
                </View>
                <View style={styles.ratingBox}>
                    <Text style={styles.ratingText}>{props.place.rating}</Text>
                    <Rating
                        type={'custom'}
                        imageSize={15}
                        readonly
                        startingValue={props.place.rating}
                        ratingColor='#ffd700'
                    />
                    <Text style={styles.distance}>{distance}</Text>
                </View>
                <DirectionsButton place={props.place}/>
            </View>
        )
    }
}

const styles = {
    container: {
        paddingLeft: 20,
        paddingRight: 20,
        gap: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'Roboto',
        width: '80%'
    },
    headingBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    greenChip: {
        backgroundColor: '#77dd77',
        borderRadius: 50
    },
    redChip: {
        backgroundColor: '#ff6961',
        borderRadius: 50
    },
    chipText: {
        color: 'white',
        fontSize: 14,
        fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'Roboto',
    },
    ratingBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        justifyContent: 'space-between'
    },
    ratingText: {
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'Roboto',
    },
    distance: {
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'Roboto',
    }
}