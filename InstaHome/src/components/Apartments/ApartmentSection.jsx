import React from 'react';
import apartamento1 from './Images/Apartamento1.jpg';
import apartamento2 from './Images/Apartamento2.jpg'; 
import apartamento3 from './Images/Apartamento3.jpg';
import apartamento4 from './Images/Apartamento4.jpg';
const ApartmentSection = () => {
  return (
    <section className="py-10">
      {/* Contenedor responsivo que permite un mejor ajuste */}
      <div className="px-4">
        {/* Grid que ajusta columnas según el tamaño de pantalla */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Primer apartamento */}
          <div className="apartment-card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition duration-300 cursor-pointer">
            <img
              src={apartamento1}
              alt="Imágenes Hogar"
              className="w-full h-48 object-cover"
            />
            <div className="apartment-info p-6">
              <h3 className="text-lg font-semibold mb-2">Precio: $1200/mes</h3>
              <p className="text-gray-700">Información Importante</p>
              <p className="text-gray-700">Tipo de local: Apartamento</p>
              <p className="text-gray-700 mb-4">Ubicación: Madrid</p>
              <div className="contact flex items-center justify-between">
                <p className="text-secondary font-semibold">Arrendador</p>
                <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition duration-200">
                  Contacto Directo
                </button>
              </div>
            </div>
          </div>
          {/* Agregando mas apartamentos de prueba, se muestra buena responsividad de la pagina*/}
          {/* Segundo apartamento */}
          <div className="apartment-card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition duration-300 cursor-pointer">
            <img
              src={apartamento2} // Cambia la fuente de la imagen para el segundo apartamento
              alt="Imágenes Hogar"
              className="w-full h-48 object-cover"
            />
            <div className="apartment-info p-6">
              <h3 className="text-lg font-semibold mb-2">Precio: $1500/mes</h3>
              <p className="text-gray-700">Información Importante</p>
              <p className="text-gray-700">Tipo de local: Apartamento</p>
              <p className="text-gray-700 mb-4">Ubicación: Barcelona</p>
              <div className="contact flex items-center justify-between">
                <p className="text-secondary font-semibold">Arrendador</p>
                <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition duration-200">
                  Contacto Directo
                </button>
              </div>
            </div>
          </div>
          {/* Tercer apartamento */}
          <div className="apartment-card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition duration-300 cursor-pointer">
            <img
              src={apartamento3} // Cambia la fuente de la imagen para el tercer apartamento
              alt="Imágenes Hogar"
              className="w-full h-48 object-cover"
            />
            <div className="apartment-info p-6">
              <h3 className="text-lg font-semibold mb-2">Precio: $1800/mes</h3>
              <p className="text-gray-700">Información Importante</p>
              <p className="text-gray-700">Tipo de local: Apartamento</p>
              <p className="text-gray-700 mb-4">Ubicación: Valencia</p>
              <div className="contact flex items-center justify-between">
                <p className="text-secondary font-semibold">Arrendador</p>
                <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition duration-200">
                  Contacto Directo
                </button>
              </div>
            </div>
          </div>
          {/* Cuarto apartamento */}
          <div className="apartment-card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition duration-300 cursor-pointer">
            <img
              src={apartamento4} // Cambia la fuente de la imagen para el cuarto apartamento
              alt="Imágenes Hogar"
              className="w-full h-48 object-cover"
            />
            <div className="apartment-info p-6">
              <h3 className="text-lg font-semibold mb-2">Precio: $2000/mes</h3>
              <p className="text-gray-700">Información Importante</p>
              <p className="text-gray-700">Tipo de local: Apartamento</p>
              <p className="text-gray-700 mb-4">Ubicación: Sevilla</p>
              <div className="contact flex items-center justify-between">
                <p className="text-secondary font-semibold">Arrendador</p>
                <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition duration-200">
                  Contacto Directo
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ApartmentSection;
