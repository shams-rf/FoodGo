import React from 'react';
import {Platform, Text, View} from "react-native";
import {Rating} from "react-native-ratings";

export function PlaceRating(props) {
    return (
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
    );
}

const styles = {
    ratingBox: {
        flexDirection: 'row',
        gap: 5
    },
    ratingText: {
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'Roboto',
    },
}