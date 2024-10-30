import React from 'react';
import apartamento1 from './Images/Apartamento1.jpg';
import apartamento2 from './Images/Apartamento2.jpg'; 
import apartamento3 from './Images/Apartamento3.jpg';
import apartamento4 from './Images/Apartamento4.jpg';

// Array of apartments
// Each apartment has an id(key), image, price, location, description, number of rooms, number of bathrooms, and square meters
const apartments = [
  { id: '1', image: apartamento1, price: '$1200/mes', location: 'Madrid', description: 'Hermoso apartamento en el centro de Madrid.', rooms: '3', bathrooms: '2', m2: '120' },
  { id: '2', image: apartamento2, price: '$1500/mes', location: 'Barcelona', description: 'Apartamento moderno cerca de la playa.', rooms: '2', bathrooms: '1', m2: '80' },
  { id: '3', image: apartamento3, price: '$1800/mes', location: 'Valencia', description: 'Amplio apartamento con vistas al mar.', rooms: '4', bathrooms: '3', m2: '150' },
  { id: '4', image: apartamento4, price: '$2000/mes', location: 'Sevilla', description: 'Acogedor apartamento en el corazón de Sevilla.', rooms: '1', bathrooms: '1', m2: '60' },
];

const ApartmentModal = ({ apartment, onClose }) => {
  if (!apartment) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ease-in-out opacity-100">
      <div className="bg-white rounded-lg p-6 shadow-lg transition-transform duration-300 ease-in-out transform translate-y-0">
        <h3 className="text-xl font-bold">{apartment.location}</h3>
        <img src={apartment.image} alt={apartment.location} className="w-full h-48 object-cover mb-4" />
        <p className="text-gray-600">{apartment.description}</p>
        <p className="text-gray-600">Habitaciones: {apartment.rooms}</p>
        <p className="text-gray-600">Baños: {apartment.bathrooms}</p>
        <p className="text-gray-600">Metros cuadrados: {apartment.m2}</p>
        <p className="text-lg font-semibold mt-2">{apartment.price}</p>
        <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:scale-105 transition duration-300 ease-out cursor-pointer">
          Cerrar
        </button>
      </div>
    </div>
  );
};

const ApartmentSection = () => {
  const [selectedApartment, setSelectedApartment] = React.useState(null);

  const openModal = (apartment) => {
    setSelectedApartment(apartment);
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Available apartments
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {apartments.map((apartment) => (
            <div
            
              key={apartment.id}
              onClick={() => openModal(apartment)}
              className="apartment-card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-out cursor-pointer"
            >
              <div className="relative">
                <img
                  src={apartment.image}
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
                  <button className="bg-[#1E90FF] text-white px-4 py-2 rounded-md transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-xl">
                    Contacto Directo
                  </button>
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
