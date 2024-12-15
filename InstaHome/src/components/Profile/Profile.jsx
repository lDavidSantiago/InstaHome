import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  updateDoc, 
  collection, 
  getDocs, 
  query, 
  where,
  deleteDoc 
} from "firebase/firestore";
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
  const [apartments, setApartments] = useState([]);
  
  // New states for apartment management
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [editApartmentForm, setEditApartmentForm] = useState({
    direccion: "",
    descripcion: "",
    precio: ""
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
          
          if (data.cedula) {
            loadApartments(data.cedula);
          }
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

  const loadApartments = async (cedula) => {
    try {
      const apartmentsQuery = query(collection(db, "actuCasa"), where("cedula", "==", cedula));
      const querySnapshot = await getDocs(apartmentsQuery);
      const apartmentsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setApartments(apartmentsData);
    } catch (error) {
      console.error("Error al cargar apartamentos:", error.message);
    }
  };

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

  // New function to handle apartment selection
  const handleApartmentSelect = (apartment) => {
    setSelectedApartment(apartment);
  };

  // Edit Apartment Modal Functions
  const openEditModal = (apartment) => {
    setSelectedApartment(apartment);
    setEditApartmentForm({
      direccion: apartment.direccion,
      descripcion: apartment.descripcion,
      precio: apartment.precio
    });
    setIsEditModalOpen(true);
  };

  const handleEditApartmentChange = (e) => {
    const { name, value } = e.target;
    setEditApartmentForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveEditedApartment = async () => {
    if (!selectedApartment) return;

    try {
      const apartmentDocRef = doc(db, "actuCasa", selectedApartment.id);
      await updateDoc(apartmentDocRef, {
        direccion: editApartmentForm.direccion,
        descripcion: editApartmentForm.descripcion,
        precio: editApartmentForm.precio
      });

      // Refresh apartments list
      loadApartments(user.cedula);
      
      setIsEditModalOpen(false);
      setSelectedApartment(null);
      alert("Apartamento actualizado exitosamente.");
    } catch (error) {
      console.error("Error al actualizar apartamento:", error.message);
    }
  };

  // Delete Apartment Modal Functions
  const openDeleteModal = (apartment) => {
    setSelectedApartment(apartment);
    setIsDeleteModalOpen(true);
    setDeleteConfirmation("");
  };

  const deleteApartment = async () => {
    if (deleteConfirmation !== "Confirmar" || !selectedApartment) return;

    try {
      const apartmentDocRef = doc(db, "actuCasa", selectedApartment.id);
      await deleteDoc(apartmentDocRef);

      // Refresh apartments list
      loadApartments(user.cedula);
      
      setIsDeleteModalOpen(false);
      setSelectedApartment(null);
      alert("Apartamento eliminado exitosamente.");
    } catch (error) {
      console.error("Error al eliminar apartamento:", error.message);
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
      {/* Sección del perfil */}
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
            onClick={() => setForm((prevForm) => ({ ...prevForm, stars: index + 1 }))}
          >
            ★
          </motion.span>
        ))}
      </div>

      {/* Formulario de edición */}
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

      {/* Botón de guardar */}
      <motion.button
        onClick={handleSave}
        className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Guardar Cambios
      </motion.button>

      {/* Sección de apartamentos creados */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Apartamentos creados:</h2>
        {apartments.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {apartments.map((apartment) => (
              <div 
                key={apartment.id} 
                className="bg-gray-100 p-4 rounded-lg shadow cursor-pointer hover:bg-gray-200 transition"
                onClick={() => handleApartmentSelect(apartment)}
              >
                <h3 className="text-lg font-semibold text-gray-700">{apartment.direccion}</h3>
                <p className="text-sm text-gray-600">{apartment.descripcion}</p>
                <p className="text-sm text-gray-500">{apartment.precio}</p>
                <div className="flex justify-between mt-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditModal(apartment);
                    }}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      openDeleteModal(apartment);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No hay apartamentos registrados con tu cédula.</p>
        )}
      </div>

      {/* Selected Apartment Preview Modal */}
      {selectedApartment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">{selectedApartment.direccion}</h2>
            <p className="text-gray-700 mb-2">{selectedApartment.descripcion}</p>
            <p className="text-gray-600 font-semibold">Precio: {selectedApartment.precio}</p>
            <button 
              onClick={() => setSelectedApartment(null)}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Edit Apartment Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Editar Apartamento</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Dirección:</label>
                <input
                  type="text"
                  name="direccion"
                  value={editApartmentForm.direccion}
                  onChange={handleEditApartmentChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Descripción:</label>
                <textarea
                  name="descripcion"
                  value={editApartmentForm.descripcion}
                  onChange={handleEditApartmentChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Precio:</label>
                <input
                  type="text"
                  name="precio"
                  value={editApartmentForm.precio}
                  onChange={handleEditApartmentChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="flex space-x-4 mt-4">
              <button 
                onClick={saveEditedApartment}
                className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              >
                Guardar Cambios
              </button>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Delete Apartment Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-red-600">Eliminar Apartamento</h2>
            <p className="text-gray-700 mb-4">
              Estás a punto de eliminar el apartamento: {selectedApartment.direccion}
            </p>
            <p className="text-gray-600 mb-2">
              Escribe "Confirmar" para eliminar definitivamente este apartamento:
            </p>
            <input
              type="text"
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="Confirmar"
            />
            <div className="flex space-x-4 mt-4">
              <button 
                onClick={deleteApartment}
                disabled={deleteConfirmation !== "Confirmar"}
                className={`flex-1 py-2 rounded-md ${
                  deleteConfirmation === "Confirmar" 
                    ? "bg-red-500 text-white hover:bg-red-600" 
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Eliminar Definitivamente
              </button>
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default UserProfile;