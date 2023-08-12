// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "netflix-clone-18b2c.firebaseapp.com",
  projectId: "netflix-clone-18b2c",
  storageBucket: "netflix-clone-18b2c.appspot.com",
  messagingSenderId: "1079936151814",
  appId: "1:1079936151814:web:668cd3dbc047bd38b6ae87",
  measurementId: "G-17211G4Y40",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
export const auth = getAuth(app);

export default db;
