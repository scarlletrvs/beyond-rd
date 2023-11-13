import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfQ-lHVZFX6H9FjgRRjkMmwrqSH94Ogh4",
  authDomain: "beyond-rd.firebaseapp.com",
  projectId: "beyond-rd",
  storageBucket: "beyond-rd.appspot.com",
  messagingSenderId: "1071237506487",
  appId: "1:1071237506487:web:5b707aecf06ae6a33eb432"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { app, auth, db };
