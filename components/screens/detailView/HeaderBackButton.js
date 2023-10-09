import React from 'react';
import {Image, TouchableOpacity} from "react-native";
import {colours} from "../../../config/Colours";
const backArrow = require('../../../assets/detailView/back.png')

export function HeaderBackButton({navigation}) {
    return (
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Image style={{width: 25, height: 25}} source={backArrow}/>
        </TouchableOpacity>
    );
}

const styles = {
    button: {
        backgroundColor: colours.red,
        borderRadius: 50,
        padding: 10
    }
}