// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlk_pZpkLsmC7PQvJkYWb9hYHenXsMC7s",
  authDomain: "journal-curso-5b278.firebaseapp.com",
  projectId: "journal-curso-5b278",
  storageBucket: "journal-curso-5b278.appspot.com",
  messagingSenderId: "136869392878",
  appId: "1:136869392878:web:bda33ae3444e909921deff"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );