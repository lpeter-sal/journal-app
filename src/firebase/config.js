// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'
import { getEnvironments } from "../helpers/getEnvironments";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID 
} = getEnvironments();


// Your web app's Firebase configuration
//DEV/PROD
// const firebaseConfig = {
//   apiKey: "AIzaSyBlk_pZpkLsmC7PQvJkYWb9hYHenXsMC7s",
//   authDomain: "journal-curso-5b278.firebaseapp.com",
//   projectId: "journal-curso-5b278",
//   storageBucket: "journal-curso-5b278.appspot.com",
//   messagingSenderId: "136869392878",
//   appId: "1:136869392878:web:bda33ae3444e909921deff"
// };

// //TESTING
// const firebaseConfig = {
//   apiKey: "AIzaSyDyQlEzzG3H2Q4GAn42FLLwLvyU1XFVZAQ",
//   authDomain: "testingdb-7e313.firebaseapp.com",
//   projectId: "testingdb-7e313",
//   storageBucket: "testingdb-7e313.appspot.com",
//   messagingSenderId: "765674261615",
//   appId: "1:765674261615:web:a7810850f2b5319d2f119a"
// };



const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID 
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );