import React, {useEffect, useState} from 'react';
import {Text, View} from "react-native";
import {doc, getDoc} from "firebase/firestore";
import {FIREBASE_DB} from "../../../config/Firebase";

export function Card(props) {
    const [restaurant, setRestaurant] = useState(null)

    useEffect(() => {
        (async () => {
            const docRef = doc(FIREBASE_DB, 'restaurants', props.place)
            const docSnapshot = await getDoc(docRef)

            if (docSnapshot.exists()) {
                setRestaurant(docSnapshot.data())
            } else {
                console.log("No document found");
            }
        })();
    }, [])

    return (
        <View>
            <Text>{restaurant?.name}</Text>
        </View>
    );
}