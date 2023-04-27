// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfmZpppBgMZL2Mrpi4MYeBc9mX5fBAKVg",
  authDomain: "littlehopes.firebaseapp.com",
  projectId: "littlehopes",
  storageBucket: "littlehopes.appspot.com",
  messagingSenderId: "15014456263",
  appId: "1:15014456263:web:f0ca2659400a5ac71b87e2",
  measurementId: "G-W1DDRK7EP9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// Initialize Firestore

const storage = getStorage(app);

export { db, auth, storage };
