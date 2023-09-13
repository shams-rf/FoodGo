import React, {useEffect, useMemo, useState} from 'react';
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

    const memoizedImages = useMemo(() => images, [images]);

    if(!memoizedImages || memoizedImages.length === 0) {
        return null
    } else {
        return (
            <View style={styles.container}>
                {memoizedImages.map((image) => {
                    return (
                        <Image key={image} style={styles.image} source={{uri: image}}/>
                    )
                })}
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1
    },
    image: {
        width: '40%',
        height: 200
    }
}