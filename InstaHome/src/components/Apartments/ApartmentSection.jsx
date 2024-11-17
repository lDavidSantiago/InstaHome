import React, { useState, useEffect } from "react";
import RegisterHome from "../../Firebase/RegisterHome";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const ApartmentModal = ({ apartment, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [apartment]);

  if (!apartment) return null;

  const handleNextImage = () => {
    setCurrentImageIndex(
      (currentImageIndex + 1) % (apartment.imgArray?.length || 1)
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      currentImageIndex === 0
        ? (apartment.imgArray?.length || 1) - 1
        : currentImageIndex - 1
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
            {currentImageIndex + 1} / {apartment.imgArray?.length || 1}
          </div>

          <button
            onClick={handlePrevImage}
            className="absolute left-2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
          >
            <IoIosArrowBack size={24} />
          </button>
          <img
            src={apartment.imgArray?.[currentImageIndex] || apartment.img}
            alt={apartment.direccion}
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
          <h3 className="text-2xl font-bold mb-4">{apartment.direccion}</h3>
          <p className="text-gray-700 text-lg mb-4">{apartment.descripcion}</p>

          <div className="space-y-2 text-gray-600">
            <p>
              <strong>Habitaciones:</strong> {apartment.bedrooms || "N/A"}
            </p>
            <p>
              <strong>Baños:</strong> {apartment.bathrooms || "N/A"}
            </p>
            <p>
              <strong>Metros cuadrados:</strong> {apartment.m2 || "N/A"} m²
            </p>
          </div>

          <p className="text-xl font-semibold text-[#1E90FF] mt-6">
            {apartment.precio}
          </p>

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
  const [apartments, setApartments] = useState([]);
  const [allApartments, setAllApartments] = useState([]);
  const [filters, setFilters] = useState({ minPrice: "", maxPrice: "", location: "" });
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState(null); // Estado para el modal
  const db = getFirestore();

  useEffect(() => {
    const loadApartments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "actuCasa"));
        const apartmentsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setApartments(apartmentsData);
        setAllApartments(apartmentsData);
      } catch (error) {
        console.error("Error al cargar apartamentos:", error);
      }
    };

    loadApartments();
  }, []);

  const handleHomeAdded = (newHome) => {
    const newApartmentsList = [
      ...apartments,
      {
        id: newHome.id,
        description: newHome.descripcion,
        address: newHome.direccion,
        price: newHome.precio,
        img: newHome.img,
        details: newHome.details,
        m2: newHome.m2,
        bedrooms: newHome.bedrooms,
        bathrooms: newHome.bathrooms,
      },
    ];
    setApartments(newApartmentsList);
    setAllApartments(newApartmentsList);
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

          <div className="flex justify-between mb-6">
            <button
              onClick={() => setIsFilterModalVisible(true)}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
            >
              Filtros
            </button>
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
                onClick={() => setSelectedApartment(apartment)} // Abrir modal al hacer clic
              >
                <img
                  src={apartment.img}
                  alt="Imagen del apartamento"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <h3 className="text-xl font-bold mt-4">{apartment.direccion}</h3>
                <p className="text-gray-600">{apartment.descripcion}</p>
                <p className="text-blue-500 font-bold mt-2">{apartment.precio}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <RegisterHome
        isVisible={isRegisterHomeVisible}
        onClose={() => setIsRegisterHomeVisible(false)}
        onHomeAdded={handleHomeAdded}
      />

      {selectedApartment && (
        <ApartmentModal
          apartment={selectedApartment}
          onClose={() => setSelectedApartment(null)}
        />
      )}
    </>
  );
};

export default ApartmentSection;
