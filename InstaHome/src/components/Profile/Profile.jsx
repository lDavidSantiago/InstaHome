import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserCircle, FaStar } from 'react-icons/fa';

const Profile = () => {
    // Estado inicial de los datos de usuario
    const [userData, setUserData] = useState({
        name: 'Juan Pérez',
        cedula: '12345678',
        phone: '123-456-7890',
        city: 'Bogotá',
        stars: 4,
        description: 'Amante de los apartamentos modernos y céntricos.'
    });

    const [isEditing, setIsEditing] = useState(false); // Estado para el modo de edición
    const [editableData, setEditableData] = useState({ ...userData }); // Datos editables

    // Función para manejar el cambio en los campos editables
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Si el campo es "stars", aseguramos que el valor esté entre 1 y 5
        if (name === 'stars') {
            const newValue = value === '' ? 1 : Math.max(1, Math.min(5, parseInt(value, 10)));
            setEditableData((prev) => ({
                ...prev,
                [name]: newValue,
            }));
        } else {
            setEditableData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    // Función para guardar los cambios
    const handleSave = () => {
        setUserData(editableData);
        setIsEditing(false);
    };

    return (
        <motion.section
            className="bg-gray-100 py-12 flex justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
                <div className="flex items-center justify-center mb-6">
                    <FaUserCircle className="text-gray-500 text-8xl" />
                </div>

                <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">{userData.name}</h2>
                <p className="text-center text-gray-500 mb-4">Cédula: {userData.cedula}</p>

                <div className="space-y-4">
                    {/* Teléfono */}
                    <div>
                        <label className="block text-gray-700 font-semibold">Teléfono:</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="phone"
                                value={editableData.phone}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded p-2"
                            />
                        ) : (
                            <p className="text-gray-600">{userData.phone}</p>
                        )}
                    </div>

                    {/* Ciudad */}
                    <div>
                        <label className="block text-gray-700 font-semibold">Ciudad:</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="city"
                                value={editableData.city}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded p-2"
                            />
                        ) : (
                            <p className="text-gray-600">{userData.city}</p>
                        )}
                    </div>

                    {/* Puntaje de estrellas */}
                    <div>
                        <label className="block text-gray-700 font-semibold">Puntaje:</label>
                        {isEditing ? (
                            <div className="flex space-x-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => setEditableData((prev) => ({ ...prev, stars: star }))}
                                        className={`w-8 h-8 rounded-full ${editableData.stars === star ? 'bg-yellow-400' : 'bg-gray-300'}`}
                                    >
                                        <FaStar className={`text-xl ${editableData.stars === star ? 'text-white' : 'text-gray-500'}`} />
                                    </button>
                                ))}
                                <input
                                    type="number"
                                    name="stars"
                                    value={editableData.stars}
                                    onChange={handleChange}
                                    className="w-16 border border-gray-300 rounded p-2"
                                    min="1"
                                    max="5"
                                />
                            </div>
                        ) : (
                            <div className="flex items-center">
                                {[...Array(userData.stars)].map((_, i) => (
                                    <FaStar key={i} className="text-yellow-400" />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Descripción */}
                    <div>
                        <label className="block text-gray-700 font-semibold">Descripción:</label>
                        {isEditing ? (
                            <textarea
                                name="description"
                                value={editableData.description}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded p-2"
                            />
                        ) : (
                            <p className="text-gray-600">{userData.description}</p>
                        )}
                    </div>
                </div>

                <div className="flex justify-center mt-6">
                    {isEditing ? (
                        <button
                            onClick={handleSave}
                            className="bg-blue-500 text-white font-semibold py-2 px-6 rounded hover:bg-blue-600 transition duration-300"
                        >
                            Guardar
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-blue-500 text-white font-semibold py-2 px-6 rounded hover:bg-blue-600 transition duration-300"
                        >
                            Editar
                        </button>
                    )}
                </div>
            </div>
        </motion.section>
    );
};

export default Profile;
