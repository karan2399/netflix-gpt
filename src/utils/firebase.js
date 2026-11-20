// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrlNhrX1leerK3rT9Snh-WGHxGS4bkl6w",
  authDomain: "netflixgpt-258b9.firebaseapp.com",
  projectId: "netflixgpt-258b9",
  storageBucket: "netflixgpt-258b9.firebasestorage.app",
  messagingSenderId: "887010590654",
  appId: "1:887010590654:web:edc3fb11348aead36ec3ef",
  measurementId: "G-R1LDPH0FH1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
