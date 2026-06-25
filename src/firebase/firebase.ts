// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAo6lEweIQLrVO0eg2A0iw0tqopVMJvC6U",
  authDomain: "blog-posting-app-8ab40.firebaseapp.com",
  projectId: "blog-posting-app-8ab40",
  storageBucket: "blog-posting-app-8ab40.firebasestorage.app",
  messagingSenderId: "620007660161",
  appId: "1:620007660161:web:15aa95af7c7707295e4b80",
  measurementId: "G-G6BG3C0K83"
};

const app = initializeApp(firebaseConfig);
export  const auth = getAuth(app)