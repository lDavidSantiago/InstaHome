// src/components/RegisterWithEmail.js
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function RegisterWithEmail() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Usuario registrado:", userCredential.user);
    } catch (error) {
      console.error("Error en el registro:", error.message);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Registrarse</button>
    </form>
  );
}

export default RegisterWithEmail;