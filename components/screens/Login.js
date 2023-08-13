import React, {useRef, useState} from 'react';
import {ActivityIndicator, Button, TextInput, View} from "react-native";
import {FIREBASE_AUTH} from "../../config/Firebase";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';

export function Login() {
    const auth = FIREBASE_AUTH
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const passwordRef = useRef(null)

    async function login() {
        setLoading(true)
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            console.log(response)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function signup() {
        setLoading(true)
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            console.log(response)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20}}>
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
                onChangeText={(text) => setPassword(text)}/>
            {loading ? <ActivityIndicator size={'large'} color={'#000'} />
            : <>
                <Button title={'Login'} onPress={login}/>
                <Button title={'Create account'} onPress={signup}/>
            </>}
        </View>
    );
}

const styles = {
    textInput: {
        borderWidth: 1,
        width: '80%',
        backgroundColor: '#fff',
        padding: 10
    }
}