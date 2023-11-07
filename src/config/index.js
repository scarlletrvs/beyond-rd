// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfQ-lHVZFX6H9FjgRRjkMmwrqSH94Ogh4",
  authDomain: "beyond-rd.firebaseapp.com",
  projectId: "beyond-rd",
  storageBucket: "beyond-rd.appspot.com",
  messagingSenderId: "1071237506487",
  appId: "1:1071237506487:web:5b707aecf06ae6a33eb432"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const auth = getAuth();
 export {app, auth}
 
 