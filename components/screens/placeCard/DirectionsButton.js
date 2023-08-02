import React from 'react';
import openMaps from "react-native-open-maps";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {TouchableOpacity} from "react-native";
import {constants} from "../../../config/Constants";

export function DirectionsButton(props) {
    function goToMaps() {
        openMaps({
            end: `${props.place.geometry.location.lat},${props.place.geometry.location.lng}`,
            provider: 'google',
            travelType: 'drive'
        })
    }

    return (
        <TouchableOpacity style={styles.routeButton} onPress={goToMaps}>
            <FontAwesome5 color={'#fff'} size={50} name={'route'}/>
        </TouchableOpacity>
    );
}

const styles = {
    routeButton: {
        borderRadius: 50,
        backgroundColor: constants.colors.light2,
        padding: 20,
    }
}