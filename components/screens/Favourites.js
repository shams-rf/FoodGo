import React, {useEffect, useMemo, useState} from 'react';
import {Button, Image, Text, TouchableOpacity, View} from "react-native";
import {FIREBASE_AUTH, FIREBASE_DB} from "../../config/Firebase";
import {doc, getDoc} from "firebase/firestore";
import {Card} from "./favourites/Card";
import {getAuth} from "firebase/auth";
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList} from "react-native-gesture-handler";
import {colours} from "../../config/Colours";
const refresh = require('../../assets/icons/refresh.png')

export function Favourites({navigation}) {
    const [places, setPlaces] = useState(null)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('Loading...')

    function getUser() {
        return getAuth().currentUser.uid
    }

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

    useEffect(() => {
        getFavourites().then().catch((error) => console.log(error))
    }, [])

    function signout() {
        FIREBASE_AUTH.signOut()
            .then()
            .catch((error) => console.log(error))
    }

    const memorizedPlaces = useMemo(() => places, [places])

    if(loading) {
        return (
            <SafeAreaView style={styles.messageContainer}>
                <Text style={styles.messageText}>{message}</Text>
            </SafeAreaView>
        )
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Favourites</Text>
                    <TouchableOpacity onPress={getFavourites}>
                        <Image style={{width: 25, height: 25}} source={refresh}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.list}>
                    <FlatList
                        data={memorizedPlaces}
                        renderItem={({ item }) => (
                            <Card place={item} navigation={navigation}/>
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
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
    },
    messageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    messageText: {
        fontFamily: 'regular',
        fontSize: 20,
    }
}