// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB16_mRgMYYB3QQrRQkzOR5mtDpzcvAZZA",
  authDomain: "test-54f2e.firebaseapp.com",
  projectId: "test-54f2e",
  storageBucket: "test-54f2e.firebasestorage.app",
  messagingSenderId: "528744431713",
  appId: "1:528744431713:web:b1242f04d846890e57ea20"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
