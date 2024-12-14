import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { motion } from "framer-motion";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editableCedula, setEditableCedula] = useState(false);
  const [form, setForm] = useState({
    phone: "",
    description: "",
    cedula: "",
    stars: 0,
  });

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const userDocRef = doc(db, "users", authUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          setUser({ uid: authUser.uid, ...data });
          setForm({
            phone: data.phone || "",
            description: data.description || "",
            cedula: data.cedula || "",
            stars: data.stars || 0,
          });
          setEditableCedula(!data.cedula);
        } else {
          console.error("No se encontraron datos del usuario.");
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [auth, db]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleStarClick = (index) => {
    setForm((prevForm) => ({
      ...prevForm,
      stars: index + 1, // Índice base 0 -> número de estrellas seleccionadas
    }));
  };

  const handleSave = async () => {
    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        phone: form.phone,
        description: form.description,
        cedula: editableCedula ? form.cedula : user.cedula,
        stars: form.stars,
      });

      setUser((prevUser) => ({
        ...prevUser,
        phone: form.phone,
        description: form.description,
        cedula: editableCedula ? form.cedula : prevUser.cedula,
        stars: form.stars,
      }));
      setEditableCedula(false);
      alert("Información actualizada exitosamente.");
    } catch (error) {
      console.error("Error al guardar los cambios:", error.message);
    }
  };

  if (isLoading) {
    return <div className="text-center text-lg mt-10">Cargando...</div>;
  }

  if (!user) {
    return <div className="text-center text-lg mt-10">Por favor, inicia sesión.</div>;
  }

  return (
    <motion.div
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Profile Icon */}
      <motion.div
        className="flex justify-center mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <img
          src="https://via.placeholder.com/100"
          alt="Profile Icon"
          className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md"
        />
      </motion.div>

      <h1 className="text-center text-2xl font-bold text-gray-800 mb-2">{user.name || "Usuario"}</h1>
      <p className="text-center text-gray-600 mb-4">{user.email || "Correo no disponible"}</p>

       {/* Calificación con estrellas */}
       <div className="flex justify-center space-x-1 my-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <motion.span
              key={index}
              className={`text-2xl cursor-pointer ${
                index < form.stars ? "text-yellow-400" : "text-gray-300"
              }`}
              whileHover={{ scale: 1.2 }}
              onClick={() => handleStarClick(index)}
            >
              ★
            </motion.span>
          ))}
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Teléfono:</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Descripción:</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            rows="3"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Cédula:</label>
          <input
            type="text"
            name="cedula"
            value={form.cedula}
            onChange={handleInputChange}
            className={`w-full mt-1 p-2 border ${
              editableCedula ? "border-gray-300" : "border-gray-200 bg-gray-100"
            } rounded-md focus:ring-blue-500 focus:border-blue-500`}
            disabled={!editableCedula}
          />
        </div>
      </div>

      {/* Save Button */}
      <motion.button
        onClick={handleSave}
        className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Guardar Cambios
      </motion.button>

      {/* SECCION DE FAVORITOS */}

    </motion.div>
  );
}

export default UserProfile;
