// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcA3VJfjQKnV12qqC1r2ENtwUpb1fG_xg",
  authDomain: "ba-cai-cay.firebaseapp.com",
  projectId: "ba-cai-cay",
  storageBucket: "ba-cai-cay.appspot.com",
  messagingSenderId: "1053685397738",
  appId: "1:1053685397738:web:4cda78e56ac8f3e50aff93",
  measurementId: "G-4Z956SSZBM",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
