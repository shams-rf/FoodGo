import React, {useEffect, useMemo, useState} from 'react';
import {Image, View} from "react-native";
import {FIREBASE_STORAGE} from '../../../config/Firebase'
import {ref, listAll, getDownloadURL} from 'firebase/storage';
import {FlatList} from "react-native-gesture-handler";

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
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={memoizedImages}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Image
                            style={styles.image}
                            source={{ uri: item }}
                        />
                    )}
                />
            </View>
        );
    }
}

const styles = {
    container: {
        flexDirection: 'row',
    },
    image: {
        width: 200,
        height: 200,
        marginRight: 10,
        borderRadius: 15
    },
}