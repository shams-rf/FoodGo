import React from 'react';
import {Marker} from "react-native-maps";
const markerImg = require('../../../assets/icons/marker.png')
const dish = require('../../../assets/icons/dish.png')

export function CustomMarker(props) {
    function focusMarker() {
        props.setMarker(props.index)
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
            image={props.marker === props.index ? markerImg : dish}
            onPress={focusMarker}
            key={props.place.place_id}
            coordinate={{ latitude: props.place.geometry.location.lat, longitude: props.place.geometry.location.lng }}
        />
    );
}