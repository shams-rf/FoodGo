import React, {useRef, useState} from 'react';
import {ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {FIREBASE_AUTH} from "../../config/Firebase";
import {signInWithEmailAndPassword} from 'firebase/auth';
import {colours} from "../../config/Colours";
const logo = require('../../assets/logo.png');
import validator from "validator";

export function Login({navigation}) {
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

    async function login() {
        setFirebaseError('')
        setLoading(true)
        validateEmail()
        validatePassword()

        if(!!emailValid && !!passwordValid) {
            try {
                await signInWithEmailAndPassword(auth, email, password)
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
            <Text style={styles.title}>Login</Text>
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
                    <TouchableOpacity style={styles.loginButton} onPress={login}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </>}
            {firebaseError ? (
                <Text style={styles.miniText}>{firebaseError}</Text>
            ) : null}
            <View style={{flexDirection: 'row', gap: 5}}>
                <Text style={styles.miniText}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.miniTextButton}>Sign Up</Text>
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
    loginButton: {
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