import React, {useEffect, useState} from 'react';
import {Button, Text, View} from "react-native";
import {FIREBASE_AUTH, FIREBASE_DB} from "../../config/Firebase";
import {doc, getDoc} from "firebase/firestore";
import {Card} from "./favourites/Card";
import {getAuth} from "firebase/auth";

export function Favourites() {
    const [places, setPlaces] = useState(null)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('Loading')

    function getUser() {
        return getAuth().currentUser.uid
    }

    useEffect(() => {
        async function getFavourites() {
            setLoading(true)
            const docRef = doc(FIREBASE_DB, 'users', getUser())
            const docSnapshot = await getDoc(docRef)

            if (docSnapshot.exists()) {
                if(docSnapshot.data().favourites.length === 0) {
                    setMessage('No favourites found')
                } else {
                    setPlaces(docSnapshot.data().favourites)
                }
                setLoading(false)
            } else {
                setMessage("User not found");
                setLoading(false)
            }
        }

        getFavourites().then().catch((error) => console.log(error))
    }, [])

    function signout() {
        FIREBASE_AUTH.signOut()
            .then()
            .catch((error) => console.log(error))
    }

    if(loading || !places) {
        return (
            <View>
                <Text>{message}</Text>
                <Button title={'Sign out'} onPress={signout}/>
            </View>
        )
    } else {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                {places.map((place) => {
                    return (
                        <Card key={place} place={place}/>
                    )
                })}
                <Button title={'Sign out'} onPress={signout}/>
            </View>
        )
    }
}