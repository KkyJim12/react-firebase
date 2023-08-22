import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfgZ9yIp8FL1dBTuqwKFx9RuZIztFr5WE",
  authDomain: "test-44ee6.firebaseapp.com",
  projectId: "test-44ee6",
  storageBucket: "test-44ee6.appspot.com",
  messagingSenderId: "541362844737",
  appId: "1:541362844737:web:fd2b2d486564cc385102c0",
  measurementId: "G-ZQXKEXXGX9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
