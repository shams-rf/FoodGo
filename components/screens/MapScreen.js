import React, {useState} from 'react';
import {StyleSheet, View} from "react-native";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import {googleMapsConfig} from "../../config/GoogleMapsConfig";
import MapView, {Marker} from "react-native-maps";

export function MapScreen(props) {
    const [destination, setDestination] = useState({
        latitude: 0,
        longitude: 0
    })

    return (
        <View style={styles.container}>
            <GooglePlacesAutocomplete
                placeholder='Search'
                fetchDetails={true}
                GooglePlacesSearchQuery={{
                    rankby: 'distance'
                }}
                onPress={(data, details = null) => {
                    setDestination({
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng,
                        latitudeDelta: 0.2,
                        longitudeDelta: 0.2
                    })
                }}
                query={{
                    key: googleMapsConfig.API_KEY,
                    language: 'en',
                    types: 'restaurant',
                    radius: 10000,
                    components: 'country:ie',
                    location: `${props.location.coords.latitude}, ${props.location.coords.longitude}`
                }}
                styles={{
                    container: styles.searchBarContainer,
                    listView: {backgroundColor: 'white'}
                }}
            />
            <MapView
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
                <Marker
                    coordinate={{
                        latitude: destination.latitude,
                        longitude: destination.longitude,
                    }}
                />
            </MapView>
        </View>
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