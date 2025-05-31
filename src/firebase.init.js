// DANGER DO NOT USE TO Public
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaalJwNaZHL9L_fkU-C_XxARjbdssiR-g",
  authDomain: "explore-email-password-a-373d1.firebaseapp.com",
  projectId: "explore-email-password-a-373d1",
  storageBucket: "explore-email-password-a-373d1.firebasestorage.app",
  messagingSenderId: "146323533328",
  appId: "1:146323533328:web:12623aeabb42fa7d5de495"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);