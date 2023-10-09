import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from "react-native";
import MapView from "react-native-maps";
import {CustomMarker} from "./CustomMarker";
import {LocateMeButton} from "./LocateMeButton";
import {PlaceBottomSheet} from "../placeCard/PlaceBottomSheet";
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {collection, getDocs, query, where, orderBy, limit} from "firebase/firestore";
import {FIREBASE_AUTH, FIREBASE_DB} from "../../../config/Firebase";
import { GeoPoint } from 'firebase/firestore';
import {onAuthStateChanged} from "firebase/auth";

export function MapScreen(props) {
    const [data, setData] = useState([])
    const [spot, setSpot] = useState(null)
    const [marker, setMarker] = useState(null)
    const [user, setUser] = useState(null)

    const userLocation = new GeoPoint(props.location.coords.latitude, props.location.coords.longitude)

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setUser(user)
        })
    })

    useEffect( () => {
        (async () => {
            const fetchedDocs = []
            const restaurantsRef = collection(FIREBASE_DB, 'restaurants')
            const q = query(
                restaurantsRef,
                where('location', '>', userLocation),
                orderBy('location'),
                limit(10))

            const querySnapshot = await getDocs(q)

            querySnapshot.forEach((doc) => {
                fetchedDocs.push({id: doc.id, ...doc.data()})
            })

            setData(fetchedDocs)
        })();
    }, [])

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <BottomSheetModalProvider>
                <View style={styles.container}>
                    <MapView
                        ref={(ref) => this.mapView = ref}
                        showsMyLocationButton={false}
                        toolbarEnabled={false}
                        provider={'google'}
                        followsUserLocation={true}
                        showsUserLocation={true}
                        style={styles.map}
                        initialRegion={{
                            latitude: props.location.coords.latitude,
                            longitude: props.location.coords.longitude,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05
                        }}
                    >
                        {data.map((place, index) => {
                            return (
                                <CustomMarker
                                    index={index}
                                    setMarker={setMarker}
                                    marker={marker}
                                    setSpot={setSpot}
                                    key={place.id}
                                    place={place}
                                    mapView={this.mapView}/>
                            )
                        })}
                    </MapView>
                    <LocateMeButton mapView={this.mapView} location={props.location}/>
                    <PlaceBottomSheet location={props.location} place={spot} user={user}/>
                </View>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    paragraph: {
        fontSize: 18,
        textAlign: 'center',
    },
    map: {
        width: '100%',
        height: '100%'
    },
    searchBarContainer: {
        position: 'absolute',
        width: '90%',
        zIndex: 1,
        marginTop: 50,
    }
});