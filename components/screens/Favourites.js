import React, {useEffect, useMemo, useState} from 'react';
import {Button, Text, View} from "react-native";
import {FIREBASE_AUTH, FIREBASE_DB} from "../../config/Firebase";
import {doc, getDoc} from "firebase/firestore";
import {Card} from "./favourites/Card";
import {getAuth} from "firebase/auth";
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList} from "react-native-gesture-handler";
import {colours} from "../../config/Colours";

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

    const memorizedPlaces = useMemo(() => places, [places])

    if(loading || !places) {
        return (
            <SafeAreaView>
                <Text>{message}</Text>
                <Button title={'Sign out'} onPress={signout}/>
            </SafeAreaView>
        )
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Favourites</Text>
                <View style={styles.list}>
                    <FlatList
                        data={memorizedPlaces}
                        renderItem={({ item }) => (
                            <Card place={item}/>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <Button title={'Sign out'} onPress={signout}/>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = {
    container: {
        padding: 20,
    },
    title: {
        fontFamily: 'bold',
        fontSize: 32,
        color: colours.magenta
    },
    list: {
        marginTop: 20,
    }
}