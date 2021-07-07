import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyAdjFD0verBu36ivQFzw-GXA15Md6yblo0",
    authDomain: "medallia-utm.firebaseapp.com",
    projectId: "medallia-utm",
    storageBucket: "medallia-utm.appspot.com",
    messagingSenderId: "209020528722",
    appId: "1:209020528722:web:372ac1e3cb342bdef5178b",
    measurementId: "G-8EBL06ZNQP",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
