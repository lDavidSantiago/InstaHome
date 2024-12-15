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
  const [editingApartment, setEditingApartment] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [editApartmentForm, setEditApartmentForm] = useState({
    direccion: "",
    descripcion: "",
    precio: "",
    banos: "",
    habitaciones: "",
    metrosCuadrados: "",
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

  const handleEditApartmentChange = (e) => {
    const { name, value } = e.target;
    setEditApartmentForm((prevForm) => ({
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

  const handleDeleteApartment = async () => {
    try {
      await deleteDoc(doc(db, "actuCasa", editingApartment.id));
      setApartments((prevApartments) =>
        prevApartments.filter((apartment) => apartment.id !== editingApartment.id)
      );
      setIsDeleteModalOpen(false);
      alert("Apartamento eliminado exitosamente.");
    } catch (error) {
      console.error("Error al eliminar apartamento:", error.message);
    }
  };

  const handleEditApartment = (apartment) => {
    setEditingApartment(apartment);
    setEditApartmentForm({
      direccion: apartment.direccion,
      descripcion: apartment.descripcion,
      precio: apartment.precio,
      banos : apartment.banos,
      habitaciones : apartment.habitaciones,
      metrosCuadrados : apartment.metrosCuadrados,

    });
    setIsEditModalOpen(true);
  };

  const saveEditedApartment = async () => {
    try {
      const apartmentDocRef = doc(db, "actuCasa", editingApartment.id);
      await updateDoc(apartmentDocRef, {
        direccion: editApartmentForm.direccion,
        descripcion: editApartmentForm.descripcion,
        precio: editApartmentForm.precio,
        banos: editApartmentForm.banos,
        habitaciones: editApartmentForm.habitaciones,
        metrosCuadrados: editApartmentForm.metrosCuadrados,
      });
      setApartments((prevApartments) =>
        prevApartments.map((apartment) =>
          apartment.id === editingApartment.id ? { ...apartment, ...editApartmentForm } : apartment
        )
      );
      setIsEditModalOpen(false);
      alert("Apartamento actualizado exitosamente.");
    } catch (error) {
      console.error("Error al actualizar apartamento:", error.message);
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
      className="container mx-auto p-6 mt-10 grid grid-cols-1 md:grid-cols-3 gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Sección del perfil */}
      <motion.div
        className="col-span-1 bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
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
        <h1 className="text-center text-2xl font-bold text-gray-800 mb-2">
          {user.name || "Usuario"}
        </h1>
        <p className="text-center text-gray-600 mb-4">
          {user.email || "Correo no disponible"}
        </p>

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

        <motion.button
          onClick={handleSave}
          className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Guardar Cambios
        </motion.button>
      </motion.div>

      {/* Sección de Apartamentos */}
      <div className="col-span-2 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <span>Apartamentos creados</span>
          <span className="ml-2 text-sm bg-blue-500 text-white px-2 py-1 rounded-full">
            {apartments.length}
          </span>
        </h2>
        <hr className="mb-6 border-gray-300" />      
        {apartments.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {apartments.map((apartment) => (
              <div
                key={apartment.id}
                className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition bg-white"
              >
                <img
                  src={apartment.imgArray?.[0] || apartment.img || "/default-image.jpg"}
                  alt={apartment.direccion}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {apartment.direccion}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{apartment.descripcion}</p>
                  <p className="text-sm font-bold text-gray-700">
                    Precio: ${apartment.precio}
                  </p>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleEditApartment(apartment)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => {
                        setEditingApartment(apartment);
                        setIsDeleteModalOpen(true);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No tienes apartamentos registrados.</p>
        )}
      </div>

      {/* Modal para edición de apartamento */}
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
                <label className="block text-sm font-medium text-gray-700">Habitaciones:</label>
                <input
                  type="text"
                  name="habitaciones"
                  value={editApartmentForm.habitaciones}
                  onChange={handleEditApartmentChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Baños:</label>
                <input
                  type="text"
                  name="banos"
                  value={editApartmentForm.banos}
                  onChange={handleEditApartmentChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Metros Cuadrados:</label>
                <input
                  type="text"
                  name="metrosCuadrados"
                  value={editApartmentForm.metrosCuadrados}
                  onChange={handleEditApartmentChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
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

      {/* Modal para confirmación de eliminación */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">¿Seguro que deseas eliminar este apartamento?</h3>
            <div className="mt-4 flex justify-between">
              <button
                onClick={handleDeleteApartment}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              >
                Eliminar
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
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
