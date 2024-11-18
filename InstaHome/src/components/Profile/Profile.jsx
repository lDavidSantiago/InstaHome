// src/components/Profile.jsx
import React, { useEffect, useState } from "react";
import { auth, db } from "../../Firebase/Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "usuarios", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    const user = auth.currentUser;
    if (user) {
      const docRef = doc(db, "usuarios", user.uid);
      await updateDoc(docRef, editableData);
      setUserData((prev) => ({ ...prev, ...editableData }));
      setIsEditing(false);
    }
  };

  if (!userData) return <p>Cargando...</p>;

  return (
    <div>
      {isEditing ? (
        <input 
          value={editableData.nombre || userData.nombre}
          onChange={(e) => setEditableData({ ...editableData, nombre: e.target.value })}
        />
      ) : (
        <p>Nombre: {userData.nombre}</p>
      )}
      {/* Otros campos */}
      <button onClick={isEditing ? handleSave : () => setIsEditing(true)}>
        {isEditing ? "Guardar" : "Editar"}
      </button>
    </div>
  );
};

export default Profile;
