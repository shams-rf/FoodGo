import React from 'react';
import {List} from "./List";
import {Button, View} from "react-native";
import {FIREBASE_AUTH} from "../../config/Firebase";

export function Favourites({navigation}) {
    function goToList() {
        navigation.navigate('List')
    }

    function signout() {
        FIREBASE_AUTH.signOut()
            .then()
            .catch((error) => console.log(error))
    }

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Button title={'list'} onPress={goToList}/>
            <Button title={'Sign out'} onPress={signout}/>
        </View>
    );
}