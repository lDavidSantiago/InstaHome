import React, { useState } from "react";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { IoMdClose } from "react-icons/io";

const RegisterHome = ({ isVisible, onClose, onHomeAdded }) => {
  const [formData, setFormData] = useState({
    descripcion: "",
    direccion: "",
    precio: "",
    img: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const db = getFirestore();

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
        timestamp: serverTimestamp(),
      });

      // Agregar el nuevo hogar a la lista en la página
      onHomeAdded({
        id: docRef.id,
        description: formData.descripcion,
        address: formData.direccion,
        price: formData.precio,
        img: formData.img,
      });

      setMessage("¡Hogar registrado con éxito!");
      setFormData({ descripcion: "", direccion: "", precio: "", img: "" });
      onClose(); // Cierra el modal
    } catch (error) {
      console.error("Error al registrar el hogar: ", error);
      setMessage("Ocurrió un error. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-600"
        >
          <IoMdClose size={24} />
        </button>
        <h2 className="text-2xl font-bold text-center mb-4">Registrar un Hogar</h2>
        {message && <p className="text-center text-green-500 mb-4">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Dirección</label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Precio</label>
            <input
              type="number"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Imagen (URL)</label>
            <input
              type="url"
              name="img"
              value={formData.img}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
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
