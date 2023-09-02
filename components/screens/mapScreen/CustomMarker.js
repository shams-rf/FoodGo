import React from 'react';
import {Marker} from "react-native-maps";
const markerImg = require('../../../assets/mapscreen/marker.png')
const dishImg = require('../../../assets/mapscreen/dish.png')

export function CustomMarker(props) {
    function focusMarker() {
        props.setMarker(props.index)
        props.setSpot(props.place)
        let r = {
            latitude: props.place.location.latitude,
            longitude: props.place.location.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
        };
        props.mapView.animateToRegion(r, 1000)
    }

    return (
        <Marker
            image={props.marker === props.index ? markerImg : dishImg}
            onPress={focusMarker}
            key={props.place.id}
            coordinate={{ latitude: props.place.location.latitude, longitude: props.place.location.longitude }}
        />
    );
}