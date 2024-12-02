import React from 'react';
import { motion } from 'framer-motion';
import imagenStart from '/src/assets/images/imagenStart.jpg';

const Start = ({ onLoginClick,isLoggedIn,handleNavClick }) => {
 


  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.2 } },
  };

  return (
    <div className="relative h-[80vh]">
      {/* Imagen de fondo */}
      <img
        src={imagenStart}
        alt="Background"
        className="w-full h-full object-cover"
      />
      {/* Contenedor de texto y botón con animaciones */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4 text-center"
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
        >
          Encuentra tu hogar ideal
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl mb-6 text-center"
          initial="hidden"
          animate="visible"
          variants={{
            ...fadeInVariants,
            visible: { ...fadeInVariants.visible, transition: { duration: 1, delay: 0.4 } },
          }}
        >
          Descubre apartamentos y casas que se adaptan a tus necesidades.
        </motion.p>
        <motion.button
            className="bg-sky-900 text-white font-semibold py-3 px-8 rounded-lg hover:bg-secondary transition duration-300"
            initial="hidden"
            animate="visible"
            variants={{
            ...fadeInVariants,
            visible: { ...fadeInVariants.visible, transition: { duration: 1, delay: 0.6 } },
        }}
            // Si el usuario está logueado, redirige a la sección de publicar hogar
            // Si no, muestra la sección de login
        >
          
          {isLoggedIn ? (
            <span onClick={() => handleNavClick('RegisterHome')}>Publicar hogar</span>
          ) : (
            <span onClick={onLoginClick}>Inicia sesión</span>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default Start;
