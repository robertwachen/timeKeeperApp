// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNsrGoguCLVXNje3QaSfgSlAjshnJ9Uqo",
  authDomain: "time-keeper-2937f.firebaseapp.com",
  projectId: "time-keeper-2937f",
  storageBucket: "time-keeper-2937f.appspot.com",
  messagingSenderId: "471368045990",
  appId: "1:471368045990:web:68de1ae910ec5f46fd6b67",
  databaseURL: "https://time-keeper-2937f-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase)

export { firebase, auth };