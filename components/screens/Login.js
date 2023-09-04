import React, {useRef, useState} from 'react';
import {ActivityIndicator, Button, TextInput, View} from "react-native";
import {FIREBASE_AUTH, FIREBASE_DB} from "../../config/Firebase";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth} from 'firebase/auth';
import {setDoc, doc} from 'firebase/firestore';

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
                returnKeyType={'done'}
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