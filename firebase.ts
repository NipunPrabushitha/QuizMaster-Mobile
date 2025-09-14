import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBFynWcxRh0pzGm7Gm53MYLbgpwCMr2IKk",
  authDomain: "quizmaster-e4118.firebaseapp.com",
  projectId: "quizmaster-e4118",
  storageBucket: "quizmaster-e4118.firebasestorage.app",
  messagingSenderId: "714588290179",
  appId: "1:714588290179:web:a571fa2ccd0a1cf2086fb6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);