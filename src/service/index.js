import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBD5ENelW2NBwHM1Qv3qNXV5ct0ZbMe7WE",
  authDomain: "spender-app-83bb5.firebaseapp.com",
  projectId: "spender-app-83bb5",
  storageBucket: "spender-app-83bb5.firebasestorage.app",
  messagingSenderId: "736169139842",
  appId: "1:736169139842:web:0349d7f84a604fbe75de9b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
