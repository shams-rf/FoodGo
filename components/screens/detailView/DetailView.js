import React from 'react';
import {Image, Text, TouchableOpacity, View} from "react-native";
import {Dimensions} from 'react-native';
import {colours} from "../../../config/Colours";
import {OpeningHours} from "../placeCard/OpeningHours";
const marker = require('../../../assets/detailView/mapMarker.png')
const phone = require('../../../assets/detailView/phone.png')
const website = require('../../../assets/detailView/website.png')
const clock = require('../../../assets/detailView/clock.png')
const islam = require('../../../assets/detailView/islam.png')

export function DetailView({route}) {
    const {restaurant, image} = route.params
    const windowWidth = Dimensions.get('window').width;

    return (
        <View>
            <Image style={{width: windowWidth, height: 300}} source={{uri: image}}/>
            <View style={styles.rectangleContainer}>
                <Text style={styles.title}>{restaurant.name}</Text>
                <View style={styles.container2}>
                    <Image style={{width: 20, height: 20}} source={marker}/>
                    <Text style={styles.text}>{restaurant.address}</Text>
                </View>
                <View style={styles.container1}>
                    <View style={styles.container2}>
                        <Image style={{width: 20, height: 20}} source={phone}/>
                        <Text style={styles.text}>{restaurant.phone}</Text>
                    </View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Call</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container1}>
                    <View style={styles.container2}>
                        <Image style={{width: 20, height: 20}} source={website}/>
                        <Text style={styles.text}>{restaurant.website}</Text>
                    </View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Visit</Text>
                    </TouchableOpacity>
                </View>
                <View style={{gap: 10, flexDirection: 'row'}}>
                    <Image style={{width: 20, height: 20}} source={clock}/>
                    <OpeningHours place={restaurant}/>
                </View>
                <View style={styles.container1}>
                    <View style={styles.container2}>
                        <Image style={{width: 20, height: 20}} source={islam}/>
                        <Text style={styles.text}>Certificate Level: {restaurant.certificate}</Text>
                    </View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>View</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = {
    rectangleContainer: {
        position: 'absolute',
        backgroundColor: '#fff',
        top: 250,
        left: 20,
        right: 20,
        padding: 15,
        gap: 20,
        borderRadius: 20
    },
    container1: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    container2: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    title: {
        fontFamily: 'medium',
        fontSize: 24,
    },
    text: {
        fontFamily: 'regular',
        fontSize: 14
    },
    button: {
        backgroundColor: colours.red,
        padding: 4,
        borderRadius: 20,
        paddingRight: 15,
        paddingLeft: 15,
    },
    buttonText: {
        color: '#fff'
    }
}