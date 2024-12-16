import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { 
    getFirestore, 
    collection, 
    getDocs, 
    query, 
    where 
} from "firebase/firestore";
import { motion } from "framer-motion";

const Favorites = () => {
        const [favorites, setFavorites] = useState([]);
        const auth = getAuth();
        const db = getFirestore();

        useEffect(() => {
                const fetchFavorites = async (userId) => {
                        const q = query(collection(db, "favorites"), where("userId", "==", userId));
                        const querySnapshot = await getDocs(q);
                        const favs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                        setFavorites(favs);
                };

                onAuthStateChanged(auth, (user) => {
                        if (user) {
                                fetchFavorites(user.uid);
                        }
                });
        }, [auth, db]);

        return (
                <div className="col-span-2 space-y-6 mt-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                                <span>Favoritos</span>
                        </h2>
                        <hr className="mb-6 border-gray-300" />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {favorites.map(apartment => (
                                        <motion.div 
                                                key={apartment.id} 
                                                className="bg-white p-4 rounded-lg shadow-md"
                                                whileHover={{ scale: 1.05 }}
                                        >
                                                <h3 className="text-xl font-semibold">{apartment.name}</h3>
                                                <p className="text-gray-600">{apartment.description}</p>
                                                <p className="text-gray-800 font-bold">{apartment.price}</p>
                                        </motion.div>
                                ))}
                        </div>
                </div>
        );
};

export default Favorites;