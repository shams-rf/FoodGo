import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from "react-native";
import {constants} from "../../../config/Constants";
import MapView from "react-native-maps";
import axios from "axios";
import {CustomMarker} from "./CustomMarker";
import {LocateMeButton} from "./LocateMeButton";
import {PlaceBottomSheet} from "../placeCard/PlaceBottomSheet";
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {GestureHandlerRootView} from "react-native-gesture-handler";

export function MapScreen(props) {
    const [data, setData] = useState([])
    const [spot, setSpot] = useState(null)
    const [marker, setMarker] = useState(null)

    useEffect(() => {
        axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
            params: {
                query: 'halal',
                location: `${props.location.coords.latitude}, ${props.location.coords.longitude}`,
                key: constants.googleMapsConfig.API_KEY,
            }
        })
            .then((response) => {
                setData(response.data.results)
            })
            .catch((error) => {
                console.log(error)
            })
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
                                    key={place.place_id}
                                    place={place}
                                    mapView={this.mapView}/>
                            )
                        })}
                    </MapView>
                    <LocateMeButton mapView={this.mapView} location={props.location}/>
                    <PlaceBottomSheet location={props.location} place={spot}/>
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