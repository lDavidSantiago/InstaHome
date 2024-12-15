// src/Firebase/Firebase.jsx
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  signOut,
  onAuthStateChanged as firebaseOnAuthStateChanged 
} from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore"; 

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Función para obtener el usuario actual (con onAuthStateChanged)
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebaseOnAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

// Escuchar cambios en el estado de la autenticación
export const onAuthStateChanged = (callback) => {
  return firebaseOnAuthStateChanged(auth, callback);
};

// Registrar con email y contraseña
export const registerWithEmail = async (email, password, data) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Crear o actualizar perfil en la colección `users` de Firestore
    await createUserProfile(user, data);
    console.log("Usuario registrado y perfil creado:", user.uid);

    return user;
  } catch (error) {
    console.error("Error al registrar:", error.message);
    throw error;
  }
};

// Iniciar sesión con Google
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Crear o actualizar perfil en la colección `users` de Firestore
    await createUserProfile(user);

    console.log("Perfil guardado:", user.uid);
    return user;
  } catch (error) {
    console.error("Error en autenticación con Google:", error.message);
    throw error;
  }
};

// Función para crear o actualizar el perfil del usuario en Firestore
const createUserProfile = async (user, data = {}) => {
  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef, {
    name: user.displayName || "Sin nombre",
    email: user.email,
    cedula: data.cedula || "",
    phone: data.phone || "",
    creationDate: user.metadata.creationTime,
    lastLogin: new Date().toISOString(),
    role: "user"
  }, { merge: true });
};

// Cerrar sesión
export const logout = async () => {
  try {
    await signOut(auth);
    console.log("Sesión cerrada");
  } catch (error) {
    console.error("Error al cerrar sesión:", error.message);
  }
};

export { auth, db };
