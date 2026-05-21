import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAzF6YvgyPoGJ6FYPVdLPHv6HXSBCBHMQ0",
  authDomain: "peanutcandy.firebaseapp.com",
  projectId: "peanutcandy",
  storageBucket: "peanutcandy.firebasestorage.app",
  messagingSenderId: "324078162017",
  appId: "1:324078162017:web:c0f580af2b575e17a71a20",
  measurementId: "G-8X8D5BSGX1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);