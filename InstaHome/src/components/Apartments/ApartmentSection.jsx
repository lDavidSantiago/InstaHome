import React, { useState, useEffect } from "react";
import RegisterHome from "../../Firebase/RegisterHome";
import apartamento1 from "./Images/Apartamento1.jpg";
import apartamento2 from "./Images/Apartamento2.jpg";
import apartamento3 from "./Images/Apartamento3.jpg";
import apartamento4 from "./Images/Apartamento4.jpg";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion"; // Importa motion

const initialApartments = [
  {
    id: "1",
    imagesArray: [apartamento1, apartamento2, apartamento3, apartamento4],
    price: "$1200/mes",
    location: "Madrid",
    description: "Hermoso apartamento en el centro de Madrid.",
    rooms: "3",
    bathrooms: "2",
    m2: "120",
  },
  {
    id: "2",
    imagesArray: [apartamento2, apartamento1, apartamento3, apartamento4],
    price: "$1500/mes",
    location: "Barcelona",
    description: "Apartamento moderno cerca de la playa.",
    rooms: "2",
    bathrooms: "1",
    m2: "80",
  },
  {
    id: "3",
    imagesArray: [apartamento3, apartamento2, apartamento1, apartamento4],
    price: "$1800/mes",
    location: "Valencia",
    description: "Amplio apartamento con vistas al mar.",
    rooms: "4",
    bathrooms: "3",
    m2: "150",
  },
  {
    id: "4",
    imagesArray: [apartamento4, apartamento2, apartamento3, apartamento1],
    price: "$2000/mes",
    location: "Sevilla",
    description: "Acogedor apartamento en el corazón de Sevilla.",
    rooms: "1",
    bathrooms: "1",
    m2: "60",
  },
];

const ApartmentModal = ({ apartment, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [apartment]);

  if (!apartment) return null;

  const handleNextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % apartment.imagesArray.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      currentImageIndex === 0 ? apartment.imagesArray.length - 1 : currentImageIndex - 1
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="relative bg-white rounded-lg p-6 shadow-lg w-full max-w-4xl flex">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-red-600">
          <IoMdClose size={24} />
        </button>

        <div className="w-3/5 relative flex items-center">
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
            {currentImageIndex + 1} / {apartment.imagesArray.length}
          </div>

          <button
            onClick={handlePrevImage}
            className="absolute left-2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
          >
            <IoIosArrowBack size={24} />
          </button>
          <img
            src={apartment.imagesArray[currentImageIndex]}
            alt={apartment.location}
            className="w-full h-80 object-cover rounded-l-lg"
          />
          <button
            onClick={handleNextImage}
            className="absolute right-2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
          >
            <IoIosArrowForward size={24} />
          </button>
        </div>

        <div className="w-2/5 p-6">
          <h3 className="text-2xl font-bold mb-4">{apartment.location}</h3>
          <p className="text-gray-700 text-lg mb-4">{apartment.description}</p>

          <div className="space-y-2 text-gray-600">
            <p>
              <strong>Habitaciones:</strong> {apartment.rooms}
            </p>
            <p>
              <strong>Baños:</strong> {apartment.bathrooms}
            </p>
            <p>
              <strong>Metros cuadrados:</strong> {apartment.m2} m²
            </p>
          </div>

          <p className="text-xl font-semibold text-[#1E90FF] mt-6">{apartment.price}</p>

          <button className="mt-4 bg-[#1E90FF] text-white px-4 py-2 rounded-lg hover:bg-[#007acc] hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-out cursor-pointer">
            Contacto Directo
          </button>
        </div>
      </div>
    </div>
  );
};

const ApartmentSection = () => {
  const [isRegisterHomeVisible, setIsRegisterHomeVisible] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [apartments, setApartments] = useState(initialApartments);

  const handleHomeAdded = (newHome) => {
    setApartments((prev) => [
      ...prev,
      {
        id: `${Date.now()}`,
        imagesArray: [newHome.img],
        price: `$${newHome.price}/mes`,
        location: newHome.address,
        description: newHome.description,
        rooms: "Desconocido",
        bathrooms: "Desconocido",
        m2: "Desconocido",
      },
    ]);
  };

  return (
    <>
      <motion.section
        className="py-12 bg-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
            Available Apartments
          </h2>
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setIsRegisterHomeVisible(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Registrar Hogar
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {apartments.map((apartment) => (
              <div
                key={apartment.id}
                className="bg-white rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-xl transform hover:scale-105 transition"
                onClick={() => setSelectedApartment(apartment)}
              >
                <img
                  src={apartment.imagesArray[0]}
                  alt="Imagen del apartamento"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <h3 className="text-xl font-bold mt-4">{apartment.location}</h3>
                <p className="text-gray-600">{apartment.description}</p>
                <p className="text-blue-500 font-bold mt-2">{apartment.price}</p>
              </div>
            ))}
          </div>
        </div>
        <ApartmentModal
          apartment={selectedApartment}
          onClose={() => setSelectedApartment(null)}
        />
      </motion.section>

      <RegisterHome
        isVisible={isRegisterHomeVisible}
        onClose={() => setIsRegisterHomeVisible(false)}
        onHomeAdded={handleHomeAdded}
      />
    </>
  );
};

export default ApartmentSection;
