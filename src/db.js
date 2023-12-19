import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBYh0agqK9gBAOIGg7atIbwuZen-xlVJiQ",
    authDomain: "readingbuddies-27591.firebaseapp.com",
    projectId: "readingbuddies-27591",
    storageBucket: "readingbuddies-27591.appspot.com",
    messagingSenderId: "190798231029",
    appId: "1:190798231029:web:542382995913803b931cbc",
    measurementId: "G-LH4BGZH7C6",
    databaseURL: "https://readingbuddies-27591-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);