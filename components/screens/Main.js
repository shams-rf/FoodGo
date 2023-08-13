import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Login} from "./Login";
import {User} from "./User";
import {onAuthStateChanged} from 'firebase/auth'
import {FIREBASE_AUTH} from "../../config/Firebase";
import {List} from "./List";

export function Main() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setUser(user)
        })
    })

    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator>
            {user ? (
                <Stack.Screen name={'User'} component={User}/>
            ) : (
                <Stack.Screen name={'Login'} component={Login}/>
            )}
            <Stack.Screen name={'List'} component={List}/>
        </Stack.Navigator>
    );
}