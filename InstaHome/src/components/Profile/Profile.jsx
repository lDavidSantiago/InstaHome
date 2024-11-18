import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

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
          setEditableCedula(!data.cedula); // La cédula será editable solo si no existe
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

  const handleSave = async () => {
    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        phone: form.phone,
        description: form.description,
        cedula: editableCedula ? form.cedula : user.cedula, // Solo actualiza la cédula si es editable
      });

      setUser((prevUser) => ({
        ...prevUser,
        phone: form.phone,
        description: form.description,
        cedula: editableCedula ? form.cedula : prevUser.cedula,
      }));
      setEditableCedula(false); // Bloquea la edición de la cédula después de guardar
      alert("Información actualizada exitosamente.");
    } catch (error) {
      console.error("Error al guardar los cambios:", error.message);
    }
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    return <div>No has iniciado sesión. Por favor, inicia sesión.</div>;
  }

  return (
    <div style={styles.container}>
      {/* Ícono del perfil */}
      <div style={styles.profileIcon}>
        <img
          src="https://via.placeholder.com/100" // Reemplaza con un URL de ícono real si tienes
          alt="Ícono de perfil"
          style={styles.iconImage}
        />
      </div>
      {/* Datos del usuario */}
      <h1 style={styles.name}>{user.name}</h1>
      <p style={styles.email}>Correo: {user.email}</p>
      {/* Calificación con estrellas */}
      <div style={styles.stars}>
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            key={index}
            style={{
              color: index < form.stars ? "#FFD700" : "#CCC",
              fontSize: "24px",
            }}
          >
            ★
          </span>
        ))}
      </div>
      {/* Formulario para actualizar datos */}
      <form style={styles.form}>
        {/* Teléfono */}
        <label>Teléfono:</label>
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleInputChange}
          placeholder="Ingresa tu número de teléfono"
        />
        {/* Descripción */}
        <label>Descripción:</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleInputChange}
          placeholder="Escribe una breve descripción"
        />
        {/* Cédula */}
        <label>Cédula:</label>
        <input
          type="text"
          name="cedula"
          value={form.cedula}
          onChange={handleInputChange}
          placeholder="Ingresa tu cédula"
          disabled={!editableCedula}
        />
      </form>
      <button onClick={handleSave} style={styles.saveButton}>
        Guardar Cambios
      </button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    margin: "20px auto",
    padding: "20px",
    maxWidth: "400px",
    border: "1px solid #CCC",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  profileIcon: {
    marginBottom: "15px",
  },
  iconImage: {
    borderRadius: "50%",
    width: "100px",
    height: "100px",
    objectFit: "cover",
  },
  name: {
    fontSize: "20px",
    marginBottom: "10px",
  },
  email: {
    fontSize: "16px",
    color: "#555",
  },
  stars: {
    margin: "10px 0",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  saveButton: {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default UserProfile;