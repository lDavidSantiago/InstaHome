import React, { useState } from "react";
import RegisterHome from "../../Firebase/RegisterHome";
import apartamento1 from "./Images/Apartamento1.jpg";
import apartamento2 from "./Images/Apartamento2.jpg";
import apartamento3 from "./Images/Apartamento3.jpg";
import apartamento4 from "./Images/Apartamento4.jpg";
import { motion } from "framer-motion";

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

const ApartmentSection = () => {
  const [isRegisterHomeVisible, setIsRegisterHomeVisible] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [apartments, setApartments] = useState(initialApartments);
  const [filters, setFilters] = useState({ minPrice: "", maxPrice: "", location: "" });

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

  const applyFilters = () => {
    const min = parseInt(filters.minPrice) || 0;
    const max = parseInt(filters.maxPrice) || Infinity;

    const filtered = initialApartments.filter((apartment) => {
      const price = parseInt(apartment.price.replace(/[^0-9]/g, ""));
      const matchesLocation =
        !filters.location || apartment.location.toLowerCase().includes(filters.location.toLowerCase());
      return price >= min && price <= max && matchesLocation;
    });

    setApartments(filtered);
    setIsFilterModalVisible(false); 
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
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
      </motion.section>

      {isFilterModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Filtrar Apartamentos</h3>
            <div className="space-y-4">
              <input
                type="number"
                name="minPrice"
                placeholder="Precio mínimo ($)"
                className="w-full p-2 border rounded"
                value={filters.minPrice}
                onChange={handleFilterChange}
              />
              <input
                type="number"
                name="maxPrice"
                placeholder="Precio máximo ($)"
                className="w-full p-2 border rounded"
                value={filters.maxPrice}
                onChange={handleFilterChange}
              />
              <input
                type="text"
                name="location"
                placeholder="Ciudad"
                className="w-full p-2 border rounded"
                value={filters.location}
                onChange={handleFilterChange}
              />
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setIsFilterModalVisible(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={applyFilters}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Aplicar Filtros
              </button>
            </div>
          </div>
        </div>
      )}

      <RegisterHome
        isVisible={isRegisterHomeVisible}
        onClose={() => setIsRegisterHomeVisible(false)}
        onHomeAdded={handleHomeAdded}
      />
    </>
  );
};

export default ApartmentSection;
