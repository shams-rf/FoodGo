import React from 'react';
import {Button, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

export function DetailView({navigation}) {
    return (
        <SafeAreaView>
            <Text>Hello</Text>
            <Button onPress={() => navigation.goBack()} title={'Go Back'}/>
        </SafeAreaView>
    );
}