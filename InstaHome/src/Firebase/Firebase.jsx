// src/Firebase/Firebase.jsx
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth"; // Importa GoogleAuthProvider

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAgjODswQwoAXie4TKsf3JCbu14NmGlVi8",
  authDomain: "instanthome-63227.firebaseapp.com",
  projectId: "instanthome-63227",
  storageBucket: "instanthome-63227.firebasestorage.app",
  messagingSenderId: "771731977136",
  appId: "1:771731977136:web:ce5fb03b17013ac5bc5c75",
  measurementId: "G-VH5B1QJXEN"
};

// Inicialización de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Función de autenticación con Google
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider(); 
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Usuario autenticado con Google:", result.user);
  } catch (error) {
    console.error("Error en autenticación con Google:", error.message);
  }
};

export const registerWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Usuario registrado:", userCredential.user);
  } catch (error) {
    console.error("Error en el registro:", error.message);
  }
};
