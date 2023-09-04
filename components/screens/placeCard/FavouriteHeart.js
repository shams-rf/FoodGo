import React from 'react';
import {Image} from "react-native";
const heartIcon = require('../../../assets/placeCard/favourite.png')
import {getAuth} from 'firebase/auth';

export function FavouriteHeart(props) {
    if(props.place.id === getAuth().currentUser.uid) {
        return null
    } else {
        return (
            <Image style={{width: 50, height: 50}} source={heartIcon}/>
        );
    }
}