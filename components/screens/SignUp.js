import React, {useRef, useState} from 'react';
import {ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {FIREBASE_AUTH, FIREBASE_DB} from "../../config/Firebase";
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';
import {setDoc, doc} from 'firebase/firestore';
import {colours} from "../../config/Colours";
import validator from "validator";
const logo = require('../../assets/logo.png');

export function SignUp({navigation}) {
    const auth = FIREBASE_AUTH
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const passwordRef = useRef(null)
    const [emailError, setEmailError] = useState('')
    const [emailValid, setEmailValid] = useState(false)
    const [passwordError, setPasswordError] = useState('')
    const [passwordValid, setPasswordValid] = useState(false)
    const [firebaseError, setFirebaseError] = useState('')

    function getUser() {
        return getAuth().currentUser.uid
    }

    function validateEmail() {
        if(email.length === 0) {
            setEmailValid(false)
            setEmailError('Email required')
        } else if(!validator.isEmail(email)) {
            setEmailValid(false)
            setEmailError('Invalid email')
        } else {
            setEmailValid(true)
            setEmailError('')
        }

        setLoading(false)
    }

    function validatePassword() {
        if(password.length === 0) {
            setPasswordValid(false)
            setPasswordError('Password required')
        } else if(password.length < 6) {
            setPasswordValid(false)
            setPasswordError('Password must be minimum 6 characters long')
        } else {
            setPasswordValid(true)
            setPasswordError('')
        }

        setLoading(false)
    }

    async function signup() {
        setFirebaseError('')
        setLoading(true)
        validateEmail()
        validatePassword()

        if(!!emailValid && !!passwordValid) {
            try {
                await createUserWithEmailAndPassword(auth, email, password)

                const docData = {favourites: []}
                const docRef = doc(FIREBASE_DB, 'users', getUser())
                await setDoc(docRef, docData)

                navigation.replace('Favourites')
            } catch (error) {
                setFirebaseError(error.message)
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo}/>
            <Text style={styles.title}>Sign Up</Text>
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
            {emailError ? (
                <Text style={styles.miniText}>{emailError}</Text>
            ) : null}
            <TextInput
                ref={passwordRef}
                value={password}
                placeholder={'Password'}
                autoCapitalize={'none'}
                secureTextEntry
                style={styles.textInput}
                returnKeyType={'done'}
                onChangeText={(text) => setPassword(text)}/>
            {passwordError ? (
                <Text style={styles.miniText}>{passwordError}</Text>
            ) : null}
            {loading ? <ActivityIndicator size={'large'} color={'#000'} />
                : <>
                    <TouchableOpacity style={styles.signupButton} onPress={signup}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                </>}
            {firebaseError ? (
                <Text style={styles.miniText}>{firebaseError}</Text>
            ) : null}
            <View style={{flexDirection: 'row', gap: 5}}>
                <Text style={styles.miniText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.miniTextButton}>Log In</Text>
                </TouchableOpacity>
            </View>
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
    signupButton: {
        backgroundColor: colours.red,
        padding: 10,
        width: '80%',
        borderRadius: 20,
        alignItems: 'center'
    },
    miniText: {
        fontFamily: 'regular',
        fontSize: 14
    },
    miniTextButton: {
        fontFamily: 'regular',
        fontSize: 14,
        color: colours.red
    }
}