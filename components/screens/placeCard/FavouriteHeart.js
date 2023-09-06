import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity} from "react-native";
import {doc, updateDoc, arrayUnion, getDoc, arrayRemove} from "firebase/firestore";
import {FIREBASE_DB} from "../../../config/Firebase";
import {getAuth} from "firebase/auth";
const heartIcon = require('../../../assets/placeCard/favourite.png')
const emptyHeartIcon = require('../../../assets/placeCard/notFavourite.png')

export function FavouriteHeart(props) {
    const [isFavourite, setIsFavourite] = useState(false)

    function getUser() {
        return getAuth().currentUser
    }

    useEffect(() => {
        async function checkFavourite() {
            try {
                const docRef = doc(FIREBASE_DB, 'users', props.user?.uid);
                const docSnapshot = await getDoc(docRef);

                if (docSnapshot.exists()) {
                    const userFavourites = docSnapshot.data().favourites;

                    if (userFavourites && userFavourites.includes(props.place.id)) {
                        setIsFavourite(true)
                    } else {
                        setIsFavourite(false)
                    }
                } else {
                    console.log('User not found');
                }
            } catch (error) {
                console.log('Error 4: ' + error);
            }
        }

        checkFavourite().then().catch((error) => console.log('Error 5: ' + error))
    }, [props.place])

    async function removeFavourite() {
        try {
            const docRef = doc(FIREBASE_DB, 'users', props.user?.uid)
            await updateDoc(docRef, {
                favourites: arrayRemove(props.place.id)
            })
            setIsFavourite(false)
        } catch (error) {
            console.log('Error 6' + error)
        }
    }

    async function addToFavourites() {
        try {
            if(!getUser()) {
                console.log('Please sign in')
                return
            }
            const docRef = doc(FIREBASE_DB, 'users', props.user?.uid)
            await updateDoc(docRef, {
                favourites: arrayUnion(props.place.id)
            })
            setIsFavourite(true)
        } catch (error) {
            console.log('Error 3' + error)
        }
    }

    if(isFavourite) {
        return (
            <TouchableOpacity style={styles.button} onPress={removeFavourite}>
                <Image style={{width: 30, height: 30}} source={heartIcon}/>
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity style={styles.button} onPress={addToFavourites}>
                <Image style={{width: 30, height: 30}} source={emptyHeartIcon}/>
            </TouchableOpacity>
        )
    }
}

const styles = {
    button: {
        marginRight: 15
    }
}