// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8KQVGqigjVZ-UsjqeA3z53zKwTQpp3gg",
  authDomain: "hack-thelaw25cam-588.firebaseapp.com",
  projectId: "hack-thelaw25cam-588",
  storageBucket: "hack-thelaw25cam-588.firebasestorage.app",
  messagingSenderId: "1062749795908",
  appId: "1:1062749795908:web:95baf568a7e1c30e79ae11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_AUTH = initializeAuth(FIREBASE_APP);
const FIREBASE_DB = getFirestore(FIREBASE_APP);
const FIREBASE_STORAGE = getStorage(FIREBASE_APP);

export { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB, FIREBASE_STORAGE };

