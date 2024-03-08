import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA5RIbjutKYYO2uUWzWVVqN0HHKJlSunyY",
    authDomain: "chat-app-f3f35.firebaseapp.com",
    projectId: "chat-app-f3f35",
    storageBucket: "chat-app-f3f35.appspot.com",
    messagingSenderId: "468460648083",
    appId: "1:468460648083:web:03c2d12f8e64a593b0ff66"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)
const firebaseAuth = getAuth(app)
const firestoreDB = getFirestore(app)

export {
    app, firebaseAuth, firestoreDB
}