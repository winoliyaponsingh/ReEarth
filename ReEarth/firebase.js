// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase, onValue } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDbGau644frlmO4106xWJKcyTx1ALNA4Zk",
  authDomain: "librarymanagementmpr.firebaseapp.com",
  projectId: "librarymanagementmpr",
  storageBucket: "librarymanagementmpr.appspot.com",
  messagingSenderId: "290949862767",
  appId: "1:290949862767:web:f354055ba6fcec0384849a",
  measurementId: "G-K9PKRY9JYK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Storage
const db = getFirestore(app);
const storage = getStorage(app);
const realtimeDb = getDatabase(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export { db, storage, realtimeDb, onValue };