import React, { useState, useEffect } from 'react';
import { IoMdHeart, IoMdHeartDislike } from "react-icons/io";
import ApartmentModal from './ApartmentSection';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        // Dummy data for favorite apartments
        const favoriteApartments = [
            {
                id: 1,
                direccion: 'Nuevo Principe',
                descripcion: 'Pequeño apartamento',
                img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFgJk4DB5j5htH9lYBvA5n_3DWEqcprEOPyw&shttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFgJk4DB5j5htH9lYBvA5n_3DWEqcprEOPyw&s',
                precio: '$1200000',
                habitaciones: 2,
                banos: 1,
                metrosCuadrados: 75,
            },
            {
                id: 2,
                direccion: 'Sajonia',
                descripcion: 'casa vista al Lago',
                img: 'https://hips.hearstapps.com/hmg-prod/images/casa-caracol-1526458370.jpeg?crop=0.669xw:1.00xh;0.331xw,0&resize=640:*',
                precio: '$580000',
                habitaciones: 1,
                banos: 3,
                metrosCuadrados: 50,
            },
            {
                id: 3,
                direccion: 'Victoria',
                descripcion: 'casa bonita cabaña',
                img: 'https://images.homify.com/c_fill,f_auto,h_500,q_auto,w_1280/v1461736282/p/photo/image/1478928/mv_chontay_02.jpg',
                precio: '$500000',
                habitaciones: 2,
                banos: 2,
                metrosCuadrados: 20,
            },
        ];
        setFavorites(favoriteApartments);
    }, []);

    const [selectedApartment, setSelectedApartment] = useState(null);

    // Función para eliminar un apartamento de favoritos
    const removeFromFavorites = (apartmentId) => {
        setFavorites(favorites.filter(apartment => apartment.id !== apartmentId));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
                Apartamentos Favoritos
            </h2>
            <hr className="border-gray-300 mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((apartment, index) => (
                    <div
                        key={apartment.id}
                        className="bg-white rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-xl transform hover:scale-105 transition duration-500 ease-in-out"
                        style={{ animationDelay: `${index * 100}ms` }}
                        onClick={() => setSelectedApartment(apartment)}
                    >
                        <img
                            src={apartment.img}
                            alt="Imagen del apartamento"
                            className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-bold mt-2">{apartment.direccion}</h3>
                            <p className="text-gray-600 text-sm">{apartment.descripcion}</p>
                            <p className="text-blue-500 font-bold mt-2">{apartment.precio}</p>
                            <div className="flex justify-between items-center mt-2">
                                <div className="flex items-center space-x-2 text-red-500">
                                    <IoMdHeart size={24} className="text-red-500" />
                                    <p>Agregado a favoritos</p>
                                </div>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevenir que se abra el modal
                                        removeFromFavorites(apartment.id);
                                    }}
                                    className="text-red-500 hover:bg-red-100 p-2 rounded-full transition duration-300"
                                >
                                    <IoMdHeartDislike size={24} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favorites;