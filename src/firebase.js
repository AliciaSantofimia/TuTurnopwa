// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth"; // 👉 Importa el módulo de autenticación

const firebaseConfig = {
  apiKey: "AIzaSyBFQsRmXU7JKLpJp6O8RMJytIJQoxhNv7I",
  authDomain: "la-purisima-conchi.firebaseapp.com",
  databaseURL: "https://la-purisima-conchi-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "la-purisima-conchi",
  storageBucket: "la-purisima-conchi.appspot.com",
  messagingSenderId: "1088437635815",
  appId: "1:1088437635815:web:97a37a40e53c99e55bf042"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
const auth = getAuth(app); // 👉 Inicializa la autenticación

export { db, auth };

