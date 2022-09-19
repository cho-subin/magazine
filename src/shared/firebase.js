import { initializeApp } from 'firebase/app';
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBP_zbhdtk2dp1MivSNmLRIAHTPuaxqSZs",
    authDomain: "megazine-login.firebaseapp.com",
    projectId: "megazine-login",
    storageBucket: "megazine-login.appspot.com",
    messagingSenderId: "653602149997",
    appId: "1:653602149997:web:8d65e39b0e0ba6383c9164",
    measurementId: "G-C5M9TY8Y6D"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;