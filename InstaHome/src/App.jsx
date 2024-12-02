// src/App.jsx
import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import ApartmentSection from './components/Apartments/ApartmentSection';
import HowItWorks from './components/HowItWorks/HowItWorks';
import LoginTab from './components/Login/Login';
import Help from './components/Help/Help';
import Profile from './components/Profile/Profile'; // Importar el nuevo componente Profile
import { logout } from './Firebase/Firebase'; // Importar la función de logout
import RegisterHome from "./Firebase/RegisterHome";

// Importa el componente Start
import Start from './components/Start/Start';

import './index.css';

function App() {
    const [activeSection, setActiveSection] = useState('home');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para saber si el usuario está logueado

    // Maneja el cambio de la sección activa
    const handleNavClick = (section) => {
        setActiveSection(section); // Cambia la sección activa cuando se hace clic
    };

    const handleLoginSuccess = () => {
        setIsLoggedIn(true); // Cuando el login sea exitoso
        setActiveSection('home'); // Cambiar a la sección home
    };

    const handleShowLogin = () => {
        setActiveSection('login'); // Cambiar la sección activa a 'login'
    };

    const handleLogout = async () => {
        await logout(); // Llamar a la función logout
        setIsLoggedIn(false); // Actualizar el estado a no logueado
        setActiveSection('home'); // Regresar a la sección 'home' después de logout
    };

    return (
        <div className="overflow-x-hidden">
            <Navbar 
                setActiveSection={setActiveSection} 
                onLoginClick={handleShowLogin} 
                onLogout={handleLogout}
                handleNavClick={handleNavClick} // Pasar handleNavClick al Navbar
                isLoggedIn={isLoggedIn} // Pasar el estado de autenticación al Navbar
            />
            {activeSection === 'login' ? (
                <LoginTab onLoginSuccess={handleLoginSuccess} />
            ) : (
                <>
                    {activeSection === 'home' && (
                        <>
                            <Start 
                                setActiveSection={setActiveSection} 
                                onLoginClick={handleShowLogin} 
                            /> 
                            <ApartmentSection />
                        </>
                    )}
                    {activeSection === 'howItWorks' && <HowItWorks />}
                    {activeSection === 'help' && <Help />}
                    {activeSection === 'profile' && <Profile />}
                    {activeSection === "RegisterHome" && (
                        <RegisterHome
                            isVisible={true}
                            onClose={() => setActiveSection("home")} // Regresar a Home después del cierre
                        />
                    )}
                </>
            )}
        </div>
    );
}

export default App;
