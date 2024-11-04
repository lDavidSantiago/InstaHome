import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import ApartmentSection from './components/Apartments/ApartmentSection';
import HowItWorks from './components/HowItWorks/HowItWorks';
import LoginTab from './components/Login/Login.jsx'; // Asegúrate de que la ruta sea correcta

import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home'); // Sección inicial
  const [showLogin, setShowLogin] = useState(false); // Controlar el estado de login

  // Función para manejar el login exitoso
  const handleLoginSuccess = () => {
    setShowLogin(false); // Ocultar el login
    setActiveSection('home'); // Cambiar a la sección principal
  };

  // Función para mostrar el login
  const handleShowLogin = () => {
    setShowLogin(true);
    setActiveSection(''); // Limpiar la sección activa
  };

  return (
    <div className="overflow-x-hidden">
      <Navbar setActiveSection={setActiveSection} onLoginClick={handleShowLogin} />
      {showLogin ? (
        <LoginTab onLoginSuccess={handleLoginSuccess} />
      ) : (
        // Mostrar las secciones según el estado
        <>
          {activeSection === 'home' && <ApartmentSection />}
          {activeSection === 'howItWorks' && <HowItWorks />}
        </>
      )}
    </div>
  );
}

export default App;