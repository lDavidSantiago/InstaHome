import React, { useState, useEffect } from 'react';
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

const Favorites = () => {
        const [favorites, setFavorites] = useState([]);

        useEffect(() => {
                // Dummy data for favorite apartments
                const favoriteApartments = [
                {
                        id: 1,
                        direccion: 'Luxury Apartment',
                        descripcion: 'Downtown',
                        img: 'https://via.placeholder.com/150',
                        precio: '$2000',
                        habitaciones: 3,
                        banos: 2,
                        metrosCuadrados: 120,
                },
                {
                        id: 2,
                        direccion: 'Cozy Studio',
                        descripcion: 'Uptown',
                        img: 'https://via.placeholder.com/150',
                        precio: '$1500',
                        habitaciones: 1,
                        banos: 1,
                        metrosCuadrados: 50,
                },
                {
                        id: 3,
                        direccion: 'Modern Loft',
                        descripcion: 'Midtown',
                        img: 'https://via.placeholder.com/150',
                        precio: '$1800',
                        habitaciones: 2,
                        banos: 1,
                        metrosCuadrados: 80,
                },
                ];
                setFavorites(favoriteApartments);
        }, []);

        return (
                <div className="container mx-auto px-4 py-8">
                        <h2 className="text-3xl flex font-extrabold  text-gray-800 mb-8">
                                Favorite Apartments
                        </h2>
                        <hr className="border-gray-300 mb-8" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {favorites.map((apartment, index) => (
                                        <div
                                                key={apartment.id}
                                                className="bg-white rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-xl transform hover:scale-105 transition animate-fade-in-up opacity-0"
                                                style={{ animationDelay: `${index * 100}ms` }}
                                        >
                                                <img
                                                        src={apartment.img}
                                                        alt="Imagen del apartamento"
                                                        className="w-full h-32 object-cover rounded-t-lg"
                                                />
                                                <h3 className="text-lg font-bold mt-2">{apartment.direccion}</h3>
                                                <p className="text-gray-600 text-sm">{apartment.descripcion}</p>
                                                <p className="text-blue-500 font-bold mt-2">{apartment.precio}</p>
                                                <div className="flex space-x-2 text-red-500 mt-2">
                                                        <IoMdHeart size={24} className="text-red-500" />
                                                        <p>Agregado a favoritos!</p>
                                                </div>
                                        </div>
                                ))}
                        </div>
                </div>
        );
};

export default Favorites;