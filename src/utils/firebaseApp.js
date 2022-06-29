// JavaScript
// src.firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6FK3OKm4MQHAYb5tPOUlXyNIHPgxyj5s",
  authDomain: "pricecharts-687e9.firebaseapp.com",
  projectId: "pricecharts-687e9",
  storageBucket: "pricecharts-687e9.appspot.com",
  messagingSenderId: "657813804298",
  appId: "1:657813804298:web:97c932d6ee29c4d2ed16f3",
  measurementId: "G-GPYHZ1X883",
};
// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
