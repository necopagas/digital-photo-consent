// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Ilisi ni sa imong kaugalingon nga Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyYOUR_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export ang Firestore database instance para magamit sa ubang components
export const db = getFirestore(app);