import React, { useState, useEffect } from "react";
import RegisterHome from "../../Firebase/RegisterHome";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import jsPDF from "jspdf";

const ApartmentModal = ({ apartment, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [contractGenerated, setContractGenerated] = useState(false);

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
    doc.setFont("helvetica", "normal");
  
    // Título del contrato
    doc.setFontSize(18);
    doc.text("CONTRATO DE ARRENDAMIENTO", 20, 20);
    doc.setFontSize(12);
    
    // Información sobre el apartamento
    doc.text(`Apartamento: ${apartment.direccion}`, 20, 30);
    doc.text(`Descripción: ${apartment.descripcion}`, 20, 40);
    doc.text(`Precio de arrendamiento: ${apartment.precio}`, 20, 50);
    doc.text(`Habitaciones: ${apartment.bedrooms}`, 20, 60);
    doc.text(`Baños: ${apartment.bathrooms}`, 20, 70);
    doc.text(`Metros cuadrados: ${apartment.m2} m²`, 20, 80);
    
    doc.text("------------------------------------------------------------------------", 20, 90);
  
    // Detalles de los arrendadores e inquilinos
    doc.text("Partes del contrato:", 20, 100);
    doc.text("Arrendador: ___________________________", 20, 110);
    doc.text("Inquilino: ___________________________", 20, 120);
  
    // Detalles de la duración y condiciones
    doc.text("Duración del contrato:", 20, 130);
    doc.text("La duración del contrato es de 12 meses, comenzando desde la firma del contrato.", 20, 140);
  
    // Condiciones de pago
    doc.text("Condiciones de pago:", 20, 150);
    doc.text(
      `El precio de arrendamiento mensual es de ${apartment.precio}. El pago se realizará el primer día de cada mes a través de transferencia bancaria.`,
      20,
      160
    );
  
    // Obligaciones de las partes
    doc.text("Obligaciones del arrendador:", 20, 170);
    doc.text("- Entregar el apartamento en condiciones habitables.", 20, 180);
    doc.text("- Mantener el apartamento libre de vicios o defectos.", 20, 190);
    
    doc.text("Obligaciones del inquilino:", 20, 200);
    doc.text("- Pagar el arrendamiento en tiempo y forma.", 20, 210);
    doc.text("- No subarrendar el apartamento sin consentimiento del arrendador.", 20, 220);
  
    // Firma
    doc.text("Firmas:", 20, 230);
    doc.text("Arrendador: ___________________________", 20, 240);
    doc.text("Inquilino: ___________________________", 20, 250);
  
    // Fecha y lugar
    doc.text(`Fecha: ___________________________`, 20, 260);
    doc.text(`Lugar: ___________________________`, 20, 270);
  
    // Guardar el contrato como archivo PDF
    doc.save(`Contrato_Arrendamiento_${apartment.direccion}.pdf`);
    setContractGenerated(true);  // Marcar el contrato como generado
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

const ApartmentSection = () => {
  const [isRegisterHomeVisible, setIsRegisterHomeVisible] = useState(false);
  const [apartments, setApartments] = useState([]);
  const [allApartments, setAllApartments] = useState([]); // Guardar todos los apartamentos para restaurar
  const [filters, setFilters] = useState({ minPrice: "", maxPrice: "", location: "" });
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState(null); // Estado para el modal de apartamento
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
        setAllApartments(apartmentsData); // Guardar la lista completa
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
    setAllApartments(newApartmentsList); // Mantener todos los apartamentos actualizados
  };

  const applyFilters = () => {
    let filteredApartments = allApartments; // Usar todos los apartamentos almacenados

    // Filtrar por precio mínimo si se proporciona
    if (filters.minPrice) {
      const min = parseInt(filters.minPrice) || 0;
      filteredApartments = filteredApartments.filter((apartment) => {
        const price = parseInt(apartment.precio.replace(/[^0-9]/g, ""));
        return price >= min;
      });
    }

    // Filtrar por precio máximo si se proporciona
    if (filters.maxPrice) {
      const max = parseInt(filters.maxPrice) || Infinity;
      filteredApartments = filteredApartments.filter((apartment) => {
        const price = parseInt(apartment.precio.replace(/[^0-9]/g, ""));
        return price <= max;
      });
    }

    // Filtrar por ubicación si se proporciona
    if (filters.location) {
      filteredApartments = filteredApartments.filter((apartment) =>
        apartment.direccion.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    setApartments(filteredApartments); // Actualizar apartamentos filtrados
    setIsFilterModalVisible(false);
  };

  const clearFilters = () => {
    setFilters({ minPrice: "", maxPrice: "", location: "" }); // Limpiar filtros
    setApartments(allApartments); // Restaurar todos los apartamentos
    setIsFilterModalVisible(false);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <>
      {/* Sección de apartamentos */}
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
            {/* Botones de filtros */}
            <button
              onClick={() => setIsFilterModalVisible(true)}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
            >
              Filtros
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Mapeo de apartamentos */}
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
            <div className="flex justify-between mt-6">
              <button
                onClick={clearFilters}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 mr-2"
              >
                Limpiar Filtros
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