// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyDkaI3mor9JpQkoVlpjD1U_dqCR1QiO1lY",
  authDomain: "loom-5eccb.firebaseapp.com",
  databaseURL:
    "https://loom-5eccb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "loom-5eccb",
  storageBucket: "loom-5eccb.firebasestorage.app",
  messagingSenderId: "496155832958",
  appId: "1:496155832958:web:7609e45f5ae104ed0bde2f",
  measurementId: "G-J6B1YYE623",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
const analytics = getAnalytics(app);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const realtimeDb = getDatabase(app);

export const functions =
  getFunctions(app, "us-central1");

export default app;
