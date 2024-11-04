// src/components/LoginWithGoogle.js
import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function LoginWithGoogle() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Usuario autenticado:", result.user);
    } catch (error) {
      console.error("Error en autenticación con Google:", error.message);
    }
  };

  return <button onClick={handleGoogleLogin}>Iniciar sesión con Google</button>;
}

export default LoginWithGoogle;