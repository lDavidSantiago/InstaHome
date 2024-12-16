import { AiOutlineQuestionCircle } from "react-icons/ai";
import { FaSearchLocation, FaHome, FaHandshake } from "react-icons/fa";
import { motion } from "framer-motion";

const HowItWorks = () => {
    return (
        <section className="bg-gradient-to-r from-blue-100 to-purple-100 py-16">
            <div className="container mx-auto px-6">
                <motion.h2 
                    className="text-4xl font-extrabold text-center text-gray-900 mb-12 flex items-center justify-center space-x-3"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <AiOutlineQuestionCircle className="text-secondary text-5xl" />
                    <span className='text-gray-900'>Insta</span>
                    <span className='text-secondary'>Home</span>
                </motion.h2>
                <motion.p 
                    className="text-center text-gray-700 mb-12 text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    Simplificando el proceso de encontrar el apartamento ideal.
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                    {/* Paso 1 */}
                    <motion.div 
                        className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <FaSearchLocation className="text-secondary text-5xl mx-auto mb-6" />
                        <h3 className="text-2xl font-semibold mb-4">Explora opciones</h3>
                        <p className="text-gray-700">
                            Navega entre una variedad de apartamentos en diferentes ciudades y encuentra el que mejor se adapte a tus necesidades.
                        </p>
                    </motion.div>

                    {/* Paso 2 */}
                    <motion.div 
                        className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <FaHome className="text-secondary text-5xl mx-auto mb-6" />
                        <h3 className="text-2xl font-semibold mb-4">Conoce el apartamento</h3>
                        <p className="text-gray-700">
                            Consulta los detalles de cada apartamento, incluyendo fotos, descripción y características, para tomar una decisión informada.
                        </p>
                    </motion.div>

                    {/* Paso 3 */}
                    <motion.div 
                        className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <FaHandshake className="text-secondary text-5xl mx-auto mb-6" />
                        <h3 className="text-2xl font-semibold mb-4">Conéctate con el arrendador</h3>
                        <p className="text-gray-700">
                            Ponte en contacto directo con el arrendador para aclarar dudas, coordinar visitas y formalizar el alquiler de tu nuevo hogar.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default HowItWorks;
