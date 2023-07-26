import React from 'react';
import {Marker} from "react-native-maps";
import {CustomCallout} from "./CustomCallout";
const markerImg = require('../../../assets/icons/marker.png')

export function CustomMarker(props) {
    console.log(props.place)
    function focusMarker() {
        props.setShowPlaceCard(true)
        props.setSpot(props.place)
        let r = {
            latitude: props.place.geometry.location.lat,
            longitude: props.place.geometry.location.lng,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
        };
        props.mapView.animateToRegion(r, 1000)
    }

    return (
        <Marker
            image={markerImg}
            onPress={focusMarker}
            key={props.place.place_id}
            coordinate={{ latitude: props.place.geometry.location.lat, longitude: props.place.geometry.location.lng }}
            title={props.place.name}
        >
            <CustomCallout place={props.place}/>
        </Marker>
    );
}