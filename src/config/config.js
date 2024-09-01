import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyDtWwU_qqjvRdiJgJT7SVz3vHh52-vWDd4",
    authDomain: "nubbemart.firebaseapp.com",
    projectId: "nubbemart",
    storageBucket: "nubbemart.appspot.com",
    messagingSenderId: "162835573527",
    appId: "1:162835573527:web:23cad3a2937468a2706552",
    measurementId: "G-XK7GBTC2VF"
};

const firebaseApp = initializeApp(firebaseConfig);
const projectFirestore = getFirestore(firebaseApp);
const projectAuth = getAuth(firebaseApp);
const projectStorage = getStorage(firebaseApp);
const timestamp = serverTimestamp; // Or use directly in your code
export { projectAuth, projectFirestore, projectStorage, timestamp };