import React, { useState, useEffect } from "react";
import RegisterHome from "../../Firebase/RegisterHome";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import imagenStart from '/src/assets/images/imagenStart.jpg';
import jsPDF from "jspdf";
import Start from "../Start/Start";

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.2 } },
};

const ApartmentModal = ({ apartment, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [contractGenerated, setContractGenerated] = useState(false);
  const [favorites, setFavorites] = useState({});

  const handleToggleFavorite = (apartmentId) => {
    setFavorites(prevFavorites => ({
      ...prevFavorites,
      [apartmentId]: !prevFavorites[apartmentId],
    }));
  };

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

  const generateContract = () => {
    const doc = new jsPDF();
    doc.setFont("times", "normal");

    doc.setFontSize(22);
    doc.text("CONTRATO DE ARRENDAMIENTO", 105, 20, null, null, "center");
    doc.setFontSize(14);

    doc.text(`Apartamento: ${apartment.direccion}`, 20, 40);
    doc.text(`Descripción: ${apartment.descripcion}`, 20, 50);
    doc.text(`Precio de arrendamiento: ${apartment.precio}`, 20, 60);
    doc.text(`Habitaciones: ${apartment.bedrooms}`, 20, 70);
    doc.text(`Baños: ${apartment.bathrooms}`, 20, 80);
    doc.text(`Metros cuadrados: ${apartment.m2} m²`, 20, 90);

    doc.text("------------------------------------------------------------------------", 20, 100);

    doc.text("Partes del contrato:", 20, 110);
    doc.text("Arrendador: ___________________________", 20, 120);
    doc.text("Inquilino: ___________________________", 20, 130);

    doc.text("Duración del contrato:", 20, 140);
    doc.text("La duración del contrato es de 12 meses, comenzando desde la firma del contrato.", 20, 150);

    doc.text("Condiciones de pago:", 20, 160);
    doc.text(
      `El precio de arrendamiento mensual es de ${apartment.precio}. El pago se realizará el primer día de cada mes a través de transferencia bancaria.`,
      20,
      170
    );

    doc.text("Obligaciones del arrendador:", 20, 180);
    doc.text("- Entregar el apartamento en condiciones habitables.", 20, 190);
    doc.text("- Mantener el apartamento libre de vicios o defectos.", 20, 200);

    doc.text("Obligaciones del inquilino:", 20, 210);
    doc.text("- Pagar el arrendamiento en tiempo y forma.", 20, 220);
    doc.text("- No subarrendar el apartamento sin consentimiento del arrendador.", 20, 230);

    doc.text("Firmas:", 20, 240);
    doc.text("Arrendador: ___________________________", 20, 250);
    doc.text("Inquilino: ___________________________", 20, 260);

    doc.text(`Fecha: ___________________________`, 20, 270);
    doc.text(`Lugar: ___________________________`, 20, 280);

    doc.save(`Contrato_Arrendamiento_${apartment.direccion}.pdf`);
    setContractGenerated(true);
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
          <span onClick={() => handleToggleFavorite(apartment.id)} className="cursor-pointer">
            {favorites[apartment.id] ? (
              <div className="flex space-x-2 text-red-500">
                <IoMdHeart size={24} className="text-red-500 " />
                <p>Agregado a favoritos!</p>
              </div>
            ) : (
              <div className="flex space-x-2 text-grey-400">
                <IoMdHeartEmpty size={24} className="text-red-500" />
                <p>Agregar a favoritos</p>
              </div>
            )}
          </span>
          <p className="text-gray-700 text-lg mb-4">{apartment.descripcion}</p>
          <div className="space-y-2 text-gray-600">
            <p>
              <strong>Habitaciones:</strong> {apartment.habitaciones || "N/A"}
            </p>
            <p>
              <strong>Baños:</strong> {apartment.banos || "N/A"}
            </p>
            <p>
              <strong>Metros cuadrados:</strong> {apartment.metrosCuadrados || "N/A"} m²
            </p>
          </div>
          <p className="text-xl font-semibold text-[#1E90FF] mt-6">
            {apartment.precio}
          </p>
          <button
            className="mt-4 bg-[#1E90FF] text-white px-4 py-2 rounded-lg hover:bg-[#007acc] hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-out cursor-pointer"
            onClick={generateContract}
          >
            Alquilar y Generar Contrato
          </button>
          {contractGenerated && (
            <p className="mt-4 text-green-500">¡Contrato generado con éxito!</p>
          )}
        </div>
      </div>
    </div>
  );
};

const ApartmentSection = ({ setActiveSection }) => {
  const [isRegisterHomeVisible, setIsRegisterHomeVisible] = useState(false);
  const [apartments, setApartments] = useState([]);
  const [allApartments, setAllApartments] = useState([]);
  const [filters, setFilters] = useState({ minPrice: "", maxPrice: "", location: "" , filterHabitaciones: "", fiterBanos: "", filterMetrosCuadrados: ""});
  const [selectedApartment, setSelectedApartment] = useState(null);
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
        m2: newHome.metrosCuadrados,
        bedrooms: newHome.habitaciones,
        bathrooms: newHome.banos,
      },
    ];
    setApartments(newApartmentsList);
    setAllApartments(newApartmentsList);
  };

  const applyFilters = () => {
    let filteredApartments = allApartments;

    if (filters.minPrice) {
      const min = parseInt(filters.minPrice) || 0;
      filteredApartments = filteredApartments.filter((apartment) => {
        const price = parseInt(apartment.precio.replace(/[^0-9]/g, ""));
        return price >= min;
      });
    }

    if (filters.maxPrice) {
      const max = parseInt(filters.maxPrice) || Infinity;
      filteredApartments = filteredApartments.filter((apartment) => {
        const price = parseInt(apartment.precio.replace(/[^0-9]/g, ""));
        return price <= max;
      });
    }

    if (filters.location) {
      filteredApartments = filteredApartments.filter((apartment) =>
        apartment.direccion.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    if (filters.habitaciones) {
      const habitaciones = parseInt(filters.habitaciones) || 0;
      filteredApartments = filteredApartments.filter((apartment) => {
        const bedroomss = parseInt(apartment.habitaciones);
        return bedroomss == habitaciones;  
      });
    }
    if (filters.banos) {
      const banos = parseInt(filters.banos) || 0;
      filteredApartments = filteredApartments.filter((apartment) => {
        const banosFilter = parseInt(apartment.banos);
        return banosFilter == banos; 
      });
    }
    if (filters.metrosCuadrados) {
      const M2 = parseInt(filters.metrosCuadrados) || 0;
      filteredApartments = filteredApartments.filter((apartment) => {
        const metrosCuadrados = parseInt(apartment.metrosCuadrados);
        return metrosCuadrados == M2; 
      });
    }
      
        
    setApartments(filteredApartments);
  };

  const clearFilters = () => {
    setFilters({ minPrice: "", maxPrice: "", location: "" ,habitaciones: "", banos: "", metrosCuadrados: ""});
    setApartments(allApartments);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <>
      <motion.section
        className="py-8 bg-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
            Apartamentos Disponibles
          </h2>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Filtros</h3>
          <hr className="mb-4 border-gray-300" />
          <div className="flex flex-wrap justify-between mb-4 space-y-2 sm:space-y-0">
            <div className="flex flex-wrap space-x-2">
              <input
                type="number"
                name="minPrice"
                placeholder="Precio mínimo ($)"
                className="p-2 border rounded-lg"
                value={filters.minPrice}
                onChange={handleFilterChange}
              />
              <input
                type="number"
                name="maxPrice"
                placeholder="Precio máximo ($)"
                className="p-2 border rounded-lg"
                value={filters.maxPrice}
                onChange={handleFilterChange}
              />
              <input
                type="text"
                name="location"
                placeholder="Barrio"
                className="p-2 border rounded-lg"
                value={filters.location}
                onChange={handleFilterChange}
              />
              <input
                type="number"
                name="habitaciones"
                placeholder="Habitaciones"
                className="p-2 border rounded-lg"
                value={filters.habitaciones}
                onChange={handleFilterChange}
              />
              <input
                type="number"
                name="banos"
                placeholder="Baños"
                className="p-2 border rounded-lg"
                value={filters.banos}
                onChange={handleFilterChange}
              />
              <input
                type="number"
                name="metrosCuadrados"
                placeholder="Metros Cuadrados"
                className="p-2 border rounded-lg"
                value={filters.metrosCuadrados}
                onChange={handleFilterChange}
              />
              <button
                onClick={applyFilters}
                className="bg-sky-900 text-white py-2 px-4 rounded-lg hover:bg-secondary transition ease-in-out duration-300"
              >
                Aplicar Filtros
              </button>
              <button
                onClick={clearFilters}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
              >
                Limpiar Filtros
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {apartments.map((apartment, index) => (
              <div
                key={apartment.id}
                className="bg-white rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-xl transform hover:scale-105 transition animate-fade-in-up opacity-0"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedApartment(apartment)}
              >
                <img
                  src={apartment.img}
                  alt="Imagen del apartamento"
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <h3 className="text-lg font-bold mt-2">{apartment.direccion}</h3>
                <p className="text-gray-600 text-sm">{apartment.descripcion}</p>
                <p className="text-blue-500 font-bold mt-2">{apartment.precio}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

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