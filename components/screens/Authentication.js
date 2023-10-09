import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Login} from "./Login";
import {Favourites} from "./Favourites";
import {onAuthStateChanged} from 'firebase/auth'
import {FIREBASE_AUTH} from "../../config/Firebase";
import {NavigationContainer} from "@react-navigation/native";
import {DetailView} from "./detailView/DetailView";
import {HeaderBackButton} from "./detailView/HeaderBackButton";
import {SignUp} from "./SignUp";

export function Authentication() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setUser(user)
        })
    })

    const Stack = createNativeStackNavigator()

    return (
        <NavigationContainer independent>
            <Stack.Navigator screenOptions={{
                headerShown: false,
            }}>
                {user ? (
                    <Stack.Screen name={'Favourites'} component={Favourites}/>
                ) : (
                    <Stack.Screen name={'Login'} component={Login}/>
                )}
                <Stack.Screen options={ ({navigation}) => ({
                    headerShown: true,
                    title: '',
                    headerTransparent: true,
                    headerLeft: () => (
                        <HeaderBackButton navigation={navigation}/>
                    )
                })} name={'Detail View'} component={DetailView}/>
                <Stack.Screen name={'SignUp'} component={SignUp}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}