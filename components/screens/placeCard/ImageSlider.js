import React, {useEffect, useMemo, useState} from 'react';
import {Image, View} from "react-native";
import {FIREBASE_STORAGE} from '../../../config/Firebase'
import {ref, listAll, getDownloadURL} from 'firebase/storage';
import {FlatList} from "react-native-gesture-handler";
import { Skeleton } from '@rneui/themed';

export function ImageSlider(props) {
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function getImages() {
            setLoading(true)
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
                    setLoading(false)
                })
        }

        getImages()
            .then(() => {
            })
            .catch((error) => {console.log(error)})
    }, [props.place])

    const memoizedImages = useMemo(() => images, [images]);

    if(loading) {
        return (
            <View style={styles.skeletonContainer}>
                <Skeleton style={styles.skeletonStyle} height={200} width={200}/>
                <Skeleton style={styles.skeletonStyle} height={200} width={200}/>
            </View>
        )
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
    skeletonContainer: {
        flexDirection: 'row',
        gap: 10
    },
    skeletonStyle: {
        borderRadius: 15
    }
}