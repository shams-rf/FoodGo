import React, {useEffect, useState} from 'react';
import {Image, View} from "react-native";
import {FIREBASE_STORAGE} from '../../../config/Firebase'
import {ref, listAll, getDownloadURL} from 'firebase/storage';

export function ImageSlider(props) {
    const [images, setImages] = useState([])

    useEffect(() => {
        async function getImages() {
            let links = []
            const imagesRef = ref(FIREBASE_STORAGE, props.place.id)
            listAll(imagesRef)
                .then(async (result) => {
                    for (const itemRef of result.items) {
                        await getDownloadURL(itemRef).then((link) => {
                            links.push(link)
                        })
                    }
                    setImages(links)
                })
        }

        getImages()
            .then(() => {})
            .catch((error) => {console.log(error)})
    }, [props.place])

    if(!images) {
        return null
    } else {
        return (
            <View>
                {images.map((image) => {
                    return (
                        <Image key={image} style={{width:100, height:100}} source={{uri: image}}/>
                    )
                })}
            </View>
        );
    }
}