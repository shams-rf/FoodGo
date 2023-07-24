import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from "react-native";
import {googleMapsConfig} from "../../config/GoogleMapsConfig";
import MapView, {Marker} from "react-native-maps";
import axios from "axios";

export function MapScreen(props) {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
            params: {
                query: 'halal',
                location: `${props.location.coords.latitude}, ${props.location.coords.longitude}`,
                key: googleMapsConfig.API_KEY,
            }
        })
            .then((response) => {
                console.log(response.data.results)
                setData(response.data.results)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    function mapMarkers() {
        return data.map((place) =>
            <Marker
                key={place.place_id}
                coordinate={{ latitude: place.geometry.location.lat, longitude: place.geometry.location.lng }}
                title={place.name}
            />
        )
    }

    return (
        <View style={styles.container}>
            <MapView
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
                {mapMarkers()}
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