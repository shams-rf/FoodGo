import React, {useEffect, useMemo, useState} from 'react';
import {Image, Text, TouchableOpacity} from "react-native";
import {doc, getDoc} from "firebase/firestore";
import {FIREBASE_DB, FIREBASE_STORAGE} from "../../../config/Firebase";
import {getDownloadURL, ref} from "firebase/storage";

export function Card(props) {
    const [restaurant, setRestaurant] = useState(null)
    const [image, setImage] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                const docRef = doc(FIREBASE_DB, 'restaurants', props.place)
                const docSnapshot = await getDoc(docRef)

                const imageRef = ref(FIREBASE_STORAGE, `${docRef.id}/logo.jpg`)
                await getDownloadURL(imageRef)
                    .then((url) => {
                        setImage(url)
                    })
                    .catch((error) => {console.log(error)})

                if (docSnapshot.exists()) {
                    setRestaurant(docSnapshot.data())
                } else {
                    console.log("No document found");
                }
            } catch (error) {
                console.log('Error 11: ' + error)
            }
        })();
    }, [])

    const memorizedImage = useMemo(() => image, [image])
    const memorizedRestaurant = useMemo(() => restaurant, [restaurant])

    if(!restaurant) {
        return null
    } else {
        return (
            <TouchableOpacity style={styles.container} onPress={() => props.navigation.navigate('Detail View')}>
                <Image style={styles.logo} source={{uri: memorizedImage}}/>
                <Text style={styles.title}>{memorizedRestaurant.name}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = {
    container: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    title: {
        fontFamily: 'medium',
        fontSize: 18
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 50,
    }
}