import React, {useEffect, useState} from 'react';
import {Text, View} from "react-native";

export function OpeningHours(props) {
    const [day, setDay] = useState(null)

    useEffect(() => {
        const today = new Date()
        setDay(today.getDay())
    }, [])

    return (
        <View style={styles.container}>
            <Text style={day === 1 ? styles.highlight : styles.hours}>Monday: {props.place.monday}</Text>
            <Text style={day === 2 ? styles.highlight : styles.hours}>Tuesday: {props.place.tuesday}</Text>
            <Text style={day === 3 ? styles.highlight : styles.hours}>Wednesday: {props.place.wednesday}</Text>
            <Text style={day === 4 ? styles.highlight : styles.hours}>Thursday: {props.place.thursday}</Text>
            <Text style={day === 5 ? styles.highlight : styles.hours}>Friday: {props.place.friday}</Text>
            <Text style={day === 6 ? styles.highlight : styles.hours}>Saturday: {props.place.saturday}</Text>
            <Text style={day === 0 ? styles.highlight : styles.hours}>Sunday: {props.place.sunday}</Text>
        </View>
    );
}

const styles = {
    container: {
        gap: 5,
    },
    hours: {
        fontSize: 14,
        fontFamily: 'light',
    },
    highlight: {
        fontSize: 14,
        fontFamily: 'bold'
    }
}