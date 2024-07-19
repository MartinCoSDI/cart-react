// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



const firebaseConfig = {
  apiKey: "AIzaSyDhtU54r-n2kv_mECy9CXbYCtOV1nDZjs0",
  authDomain: "react-authentication-f132f.firebaseapp.com",
  projectId: "react-authentication-f132f",
  storageBucket: "react-authentication-f132f.appspot.com",
  messagingSenderId: "972598524932",
  appId: "1:972598524932:web:bf5a420767de9cc83ec951",
  measurementId: "G-8BJWDJZ16S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export default app;
export { auth, db };