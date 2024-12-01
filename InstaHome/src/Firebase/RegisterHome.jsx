import React, { useState } from "react";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import images from "/src/assets/images/backgroundRegister.jpg";

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

      onHomeAdded({
        id: docRef.id,
        description: formData.descripcion,
        address: formData.direccion,
        price: formData.precio,
        img: formData.img,
      });

      setMessage("¡Hogar registrado con éxito!");
      setFormData({ descripcion: "", direccion: "", precio: "", img: "" });
      onClose(); 
    } catch (error) {
      console.error("Error al registrar el hogar: ", error);
      setMessage("Ocurrió un error. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-start">
      <div className="relative w-1/2 h-full flex flex-col">
        <img src={images} alt="background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black opacity-50">
          </div>
          <div className="absolute top-[20%] left-[10%] flex flex-col">
            <h1 className="text-4xl text-white font-bold my-4">Success begins with a determined step!</h1>
            <p className="text-xl text-white font-normal">Make your apartment reach the ideal people!</p>
        </div>      
      </div>
      <div className= "w-1/2 h-full bg-white flex flex-col p-20 !p-0justify-between">
        <h1 className= "text-2xl font-semibold mb-10">Registrar Un Hogar</h1>
        {message && (
          <p className={`mb-2 text-center ${message.includes("éxito") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}
      <form onSubmit={handleSubmit} >
      <div className="w-full flex flex-col mt-2">
        <label htmlFor="descripcion" className="text-lg font-medium text-gray-700 mb-2">
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
        <label htmlFor="direccion" className="text-lg font-medium text-gray-700 mb-2">
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
        <label htmlFor="precio" className="text-lg font-medium text-gray-700 mb-2">
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
        <label htmlFor="img" className="text-lg font-medium text-gray-700 mb-2">
          Imagen
        </label>
        <input
          type="url"
          id="img"
          name="img"
          value={formData.img}
          onChange={handleChange}
          className="mb-20 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
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
