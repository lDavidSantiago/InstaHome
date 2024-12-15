import React, { useState, useEffect } from "react";
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import images from "/src/assets/images/backgroundRegister.jpg";

const RegisterHome = ({ isVisible, onClose, onHomeAdded }) => {
  const [formData, setFormData] = useState({
    descripcion: "",
    direccion: "",
    precio: "",
    img: "",
    banos: "",
    habitaciones: "",
    metrosCuadrados: "",
  });
  const [cedula, setCedula] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const fetchCedula = async () => {
      const user = auth.currentUser; // Usuario autenticado
      if (user) {
        const userQuery = query(
          collection(db, "users"),
          where("email", "==", user.email) // Suponiendo que el email es único
        );
        const querySnapshot = await getDocs(userQuery);
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setCedula(userData.cedula); // Guarda la cédula
        } else {
          console.error("Usuario no encontrado en la colección 'users'.");
        }
      } else {
        console.error("No hay un usuario autenticado.");
      }
    };

    fetchCedula();
  }, [auth, db]);

  if (!isVisible) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const docRef = await addDoc(collection(db, "actuCasa"), {
        descripcion: formData.descripcion,
        direccion: formData.direccion,
        estado: true,
        idCasa: `${Date.now()}`,
        img: formData.img,
        precio: formData.precio,
        banos: formData.banos,
        habitaciones: formData.habitaciones,
        metrosCuadrados: formData.metrosCuadrados,
        timestamp: serverTimestamp(),
        cedula, // Agrega la cédula del usuario
      });

      setMessage("¡Hogar registrado con éxito!");
      setFormData({ descripcion: "", direccion: "", precio: "", img: "", banos: "", habitaciones: "", metrosCuadrados: "" });
      onClose();
    } catch (error) {
      console.error("Error al registrar el hogar: ", error);
      setMessage("Ocurrió un error. Inténtalo de nuevo.");
    } finally { 
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[90vh] flex flex-col sm:flex-row">
      {/* Sección izquierda */}
      <div className="relative w-full sm:w-1/2 flex-shrink-0 flex flex-col">
        <img
          src={images}
          alt="background"
          className="w-full h-64 sm:h-auto object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute top-[20%] left-[10%] flex flex-col">
          <h1 className="text-2xl sm:text-4xl text-white font-bold my-4">
            Success begins with a determined step!
          </h1>
          <p className="text-base sm:text-xl text-white font-normal">
            Make your apartment reach the ideal people!
          </p>
        </div>
      </div>

      {/* Sección derecha */}
      <div className="w-full sm:w-1/2 bg-slate-50 flex flex-col p-6 sm:p-20">
        <h1 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-10">
          Registrar Un Hogar
        </h1>
        {message && (
          <p
            className={`mb-2 text-center ${
              message.includes("éxito") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-start"
        >
          <div>
            <div className="w-full flex flex-col mt-2">
              <label
                htmlFor="descripcion"
                className="text-base sm:text-lg font-medium text-gray-700 mb-2"
              >
                Descripción
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                rows="3"
                required
              ></textarea>
            </div>

            <div className="w-full flex flex-col mt-4">
              <label
                htmlFor="direccion"
                className="text-base sm:text-lg font-medium text-gray-700 mb-2"
              >
                Dirección
              </label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="w-full flex flex-col mt-4">
              <label
                htmlFor="precio"
                className="text-base sm:text-lg font-medium text-gray-700 mb-2"
              >
                Precio
              </label>
              <input
                type="number"
                id="precio"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="w-full flex flex-col mt-4">
              <label
                htmlFor="img"
                className="text-base sm:text-lg font-medium text-gray-700 mb-2"
              >
                Imagen
              </label>
              <input
                type="url"
                id="img"
                name="img"
                value={formData.img}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div className="w-full flex flex-col mt-4">
            <label htmlFor="banos" className="text-base sm:text-lg font-medium text-gray-700 mb-2">
              Cantidad de Baños
            </label>
            <input
              type="number"
              id="banos"
              name="banos"
              value={formData.banos}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="w-full flex flex-col mt-4">
            <label htmlFor="habitaciones" className="text-base sm:text-lg font-medium text-gray-700 mb-2">
              Cantidad de Habitaciones
            </label>
            <input
              type="number"
              id="habitaciones"
              name="habitaciones"
              value={formData.habitaciones}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="w-full flex flex-col mt-4">
            <label htmlFor="metrosCuadrados" className="text-base sm:text-lg font-medium text-gray-700 mb-2">
              Metros Cuadrados
            </label>
            <input
              type="number"
              id="metrosCuadrados"
              name="metrosCuadrados"
              value={formData.metrosCuadrados}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-10 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterHome;