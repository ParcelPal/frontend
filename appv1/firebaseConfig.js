// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGZh1gVo2JiL1s5ff6esryupcKR0Yw584",
  authDomain: "airmeeds.firebaseapp.com",
  projectId: "airmeeds",
  storageBucket: "airmeeds.appspot.com",
  messagingSenderId: "615002303745",
  appId: "1:615002303745:web:71387b2f737348ea707f00",
  measurementId: "G-CT80GRVM5J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // Optional: only if you need analytics
const db = getFirestore(app);

export { db };
