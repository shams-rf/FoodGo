import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";
import {constants} from "./Constants";

const firebaseConfig = {
    apiKey: constants.firebaseConfig.API_KEY,
    authDomain: constants.firebaseConfig.AUTH_DOMAIN,
    projectId: constants.firebaseConfig.PROJECT_ID,
    storageBucket: constants.firebaseConfig.STORAGE_BUCKET,
    messagingSenderId: constants.firebaseConfig.MESSAGING_SENDER_ID,
    appId: constants.firebaseConfig.APP_ID,
    measurementId: constants.firebaseConfig.MEASUREMENT_ID
};

const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);