import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBU2SHkKIwZXJVGOqpNQWFtB6emQk0sDLo",
  authDomain: "dg-tournament-83fa8.firebaseapp.com",
  projectId: "dg-tournament-83fa8",
  storageBucket: "dg-tournament-83fa8.firebasestorage.app",
  messagingSenderId: "696419413697",
  appId: "1:696419413697:web:2aeab88096d9b412b46e40",
};

console.log("Firebase API Key:", firebaseConfig.apiKey);

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);