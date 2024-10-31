import React, { useState, useEffect } from 'react';
import apartamento1 from './Images/Apartamento1.jpg';
import apartamento2 from './Images/Apartamento2.jpg'; 
import apartamento3 from './Images/Apartamento3.jpg';
import apartamento4 from './Images/Apartamento4.jpg';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const apartments = [
  { id: '1', imagesArray: [apartamento1, apartamento2, apartamento3, apartamento4], price: '$1200/mes', location: 'Madrid', description: 'Hermoso apartamento en el centro de Madrid.', rooms: '3', bathrooms: '2', m2: '120' },
  { id: '2', imagesArray: [apartamento2, apartamento1, apartamento3, apartamento4], price: '$1500/mes', location: 'Barcelona', description: 'Apartamento moderno cerca de la playa.', rooms: '2', bathrooms: '1', m2: '80' },
  { id: '3', imagesArray: [apartamento3, apartamento2, apartamento1, apartamento4], price: '$1800/mes', location: 'Valencia', description: 'Amplio apartamento con vistas al mar.', rooms: '4', bathrooms: '3', m2: '150' },
  { id: '4', imagesArray: [apartamento4, apartamento2, apartamento3, apartamento1], price: '$2000/mes', location: 'Sevilla', description: 'Acogedor apartamento en el corazón de Sevilla.', rooms: '1', bathrooms: '1', m2: '60' },
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
        {/* Botón de cierre */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-red-600">
          <IoMdClose size={24} />
        </button>
        
        {/* Sección de la imagen */}
        <div className="w-3/5 relative flex items-center">
          {/* Contador de imágenes en la parte inferior derecha */}
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
            {currentImageIndex + 1} / {apartment.imagesArray.length}
          </div>

          <button
            onClick={handlePrevImage}
            className="absolute left-2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
          >
            <FaArrowAltCircleLeft size={24} />
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
            <FaArrowAltCircleRight size={24} />
          </button>
        </div>

        {/* Sección de detalles */}
        <div className="w-2/5 p-6">
          <h3 className="text-2xl font-bold mb-4">{apartment.location}</h3>
          <p className="text-gray-700 text-lg mb-4">{apartment.description}</p>
          
          <div className="space-y-2 text-gray-600">
            <p><strong>Habitaciones:</strong> {apartment.rooms}</p>
            <p><strong>Baños:</strong> {apartment.bathrooms}</p>
            <p><strong>Metros cuadrados:</strong> {apartment.m2} m²</p>
          </div>
          
          <p className="text-xl font-semibold text-[#1E90FF] mt-6">{apartment.price}</p>

          <button className="mt-4 bg-[#1E90FF] text-white px-4 py-2 rounded-lg transition-all duration-300 hover:bg-[#007acc]">
            Contacto Directo
          </button>
        </div>
      </div>
    </div>
  );
};

const ApartmentSection = () => {
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [hoveredIndexMap, setHoveredIndexMap] = useState({});

  const handleMouseEnter = (apartmentId) => {
    setHoveredIndexMap((prev) => ({ ...prev, [apartmentId]: 0 }));

    const intervalId = setInterval(() => {
      setHoveredIndexMap((prev) => ({
        ...prev,
        [apartmentId]: (prev[apartmentId] + 1) % apartments.find((apt) => apt.id === apartmentId).imagesArray.length,
      }));
    }, 1000);

    setHoveredIndexMap((prev) => ({
      ...prev,
      [`${apartmentId}_interval`]: intervalId,
    }));
  };

  const handleMouseLeave = (apartmentId) => {
    clearInterval(hoveredIndexMap[`${apartmentId}_interval`]);
    setHoveredIndexMap((prev) => ({ ...prev, [apartmentId]: 0 }));
  };

  const openModal = (apartment) => {
    setSelectedApartment(apartment);
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Available Apartments
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {apartments.map((apartment) => (
            <div
              key={apartment.id}
              onClick={() => openModal(apartment)}
              onMouseEnter={() => handleMouseEnter(apartment.id)}
              onMouseLeave={() => handleMouseLeave(apartment.id)}
              className="apartment-card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-out cursor-pointer"
            >
              <div className="relative">
                <img
                  src={apartment.imagesArray[hoveredIndexMap[apartment.id] || 0]}
                  alt="Imagen del apartamento"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <span className="absolute top-4 right-4 bg-[#1E90FF] text-white text-sm font-semibold px-3 py-1 rounded-full shadow-lg">
                  {apartment.price}
                </span>
              </div>
              
              <div className="apartment-info p-6">
                <h3 className="text-lg font-semibold mb-1 text-gray-800">
                  {apartment.location}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Ubicación deseada, cerca de todos los servicios y transporte público.
                </p>
                
                <div className="contact flex items-center justify-between">
                  <p className="text-[#1E90FF] font-semibold text-sm">Arrendador</p>
              
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ApartmentModal apartment={selectedApartment} onClose={() => setSelectedApartment(null)} />
    </section>
  );
};

export default ApartmentSection;
