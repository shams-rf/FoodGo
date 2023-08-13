import React from 'react';
import openMaps from "react-native-open-maps";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {Linking, Platform, TouchableOpacity, View} from "react-native";
import {colours} from "../../../config/Colours";
import call from 'react-native-phone-call';

export function ActionButtons(props) {
    function goToMaps() {
        openMaps({
            end: `${props.place.geometry.location.lat},${props.place.geometry.location.lng}`,
            provider: 'google',
            travelType: 'drive'
        })
    }

    function goToPhone() {
        const args = {
            number: '0899543487',
            prompt: true
        }
        if(Platform.OS === 'ios') {
            call(args).catch((error) => console.log(error))
        } else {
            Linking.openURL(`tel:${args.number}`)
                .then()
                .catch((error) => console.log(error))
        }
    }

    return (
        <View style={styles.buttons}>
            <TouchableOpacity style={styles.routeButton} onPress={goToMaps}>
                <FontAwesome5 color={'#fff'} size={30} name={'route'}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.routeButton} onPress={goToPhone}>
                <FontAwesome5 color={'#fff'} size={30} name={'phone'}/>
            </TouchableOpacity>
        </View>
    );
}

const styles = {
    routeButton: {
        borderRadius: 50,
        backgroundColor: colours.limeGreen,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
}