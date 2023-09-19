import React from 'react';
import openMaps from "react-native-open-maps";
import {Image, Linking, Platform, TouchableOpacity, View} from "react-native";
import {colours} from "../../../config/Colours";
import call from 'react-native-phone-call';
const directionsIcon = require('../../../assets/placeCard/directions.png')
const phone = require('../../../assets/placeCard/phone.png')
const website = require('../../../assets/placeCard/website.png')

export function ActionButtons(props) {
    function goToMaps() {
        openMaps({
            end: `${props.place.location.latitude},${props.place.location.longitude}`,
            travelType: 'drive'
        })
    }

    function goToPhone() {
        const args = {
            number: props.place.phone,
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

    function goToWebsite() {
        Linking.openURL(props.place.website)
            .then()
            .catch((error) => console.log(error))
    }

    return (
        <View style={styles.buttons}>
            <TouchableOpacity style={styles.routeButton} onPress={goToMaps}>
                <Image style={styles.icons} source={directionsIcon}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.routeButton} onPress={goToPhone}>
                <Image style={styles.phoneIcon} source={phone}/>
            </TouchableOpacity>
            {
                props.place.website ? (
                    <TouchableOpacity style={styles.routeButton} onPress={goToWebsite}>
                        <Image style={styles.webIcon} source={website}/>
                    </TouchableOpacity>
                ) : (
                    <></>
                )
            }
        </View>
    );
}

const styles = {
    routeButton: {
        borderRadius: 50,
        backgroundColor: colours.pink,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    icons: {
        width: '70%',
        height: '70%',
    },
    phoneIcon: {
        width: '50%',
        height: '50%',
    },
    webIcon: {
        width: '60%',
        height: '60%',
    },
}