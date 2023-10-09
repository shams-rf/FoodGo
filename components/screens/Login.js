import React, {useRef, useState} from 'react';
import {ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {FIREBASE_AUTH, FIREBASE_DB} from "../../config/Firebase";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth} from 'firebase/auth';
import {setDoc, doc} from 'firebase/firestore';
import {colours} from "../../config/Colours";
const logo = require('../../assets/logo.png');

export function Login() {
    const auth = FIREBASE_AUTH
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const passwordRef = useRef(null)

    function getUser() {
        return getAuth().currentUser.uid
    }

    async function login() {
        setLoading(true)
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function signup() {
        setLoading(true)
        try {
            await createUserWithEmailAndPassword(auth, email, password)

            const docData = {favourites: []}
            const docRef = doc(FIREBASE_DB, 'users', getUser())
            await setDoc(docRef, docData)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo}/>
            <Text style={styles.title}>Login or Sign Up</Text>
            <TextInput
                value={email}
                placeholder={'Email'}
                autoCapitalize={'none'}
                keyboardType={'email-address'}
                style={styles.textInput}
                autoCorrect={false}
                returnKeyType={'next'}
                onSubmitEditing={() => passwordRef.current.focus()}
                onChangeText={(text) => setEmail(text)}/>
            <TextInput
                ref={passwordRef}
                value={password}
                placeholder={'Password'}
                autoCapitalize={'none'}
                secureTextEntry
                style={styles.textInput}
                returnKeyType={'done'}
                onChangeText={(text) => setPassword(text)}/>
            {loading ? <ActivityIndicator size={'large'} color={'#000'} />
            : <>
                <TouchableOpacity style={styles.loginButton} onPress={login}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.registerButton} onPress={signup}>
                    <Text style={styles.registerButtonText}>Sign Up</Text>
                </TouchableOpacity>
            </>}
        </View>
    );
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        bottom: '5%'
    },
    textInput: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 20,
        fontFamily: 'medium',
    },
    logo: {
        width: 200,
        height: 200
    },
    title: {
        fontFamily: 'medium',
        fontSize: 20
    },
    buttonText: {
        fontFamily: 'bold',
        fontSize: 16,
        color: '#fff'
    },
    loginButton: {
        backgroundColor: colours.red,
        padding: 10,
        width: '80%',
        borderRadius: 20,
        alignItems: 'center'
    },
    registerButton: {
        borderColor: colours.red,
        borderWidth: 2,
        padding: 10,
        width: '80%',
        borderRadius: 20,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    registerButtonText: {
        fontFamily: 'bold',
        fontSize: 16,
        color: colours.red
    },
}