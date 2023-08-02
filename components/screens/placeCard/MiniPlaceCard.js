import React from 'react';
import {Platform, Text, View} from "react-native";
import {Chip} from "react-native-paper";
import {Rating} from "react-native-ratings";
import {DirectionsButton} from "./DirectionsButton";

export function MiniPlaceCard(props) {
    console.log(props.place)
    if(props.place === null) {
        return (
            <View>
                <Text>Hi</Text>
            </View>
        )
    } else {
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
        alignItems: 'flex-start',
        gap: 10
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
        gap: 5
    },
    ratingText: {
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'Roboto',
    },
}