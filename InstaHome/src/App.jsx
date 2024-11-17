import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import ApartmentSection from './components/Apartments/ApartmentSection';
import HowItWorks from './components/HowItWorks/HowItWorks';
import LoginTab from './components/Login/Login';
import Help from './components/Help/Help';
import Profile from './components/Profile/Profile'; // Importar el nuevo componente Profile

import './App.css';

function App() {
    const [activeSection, setActiveSection] = useState('home');

    const handleLoginSuccess = () => {
        setActiveSection('home'); // Cuando inicie sesión, regresa a 'home'
    };

    const handleShowLogin = () => {
        setActiveSection('login'); // Cambia la sección activa a 'login'
    };

    return (
        <div className="overflow-x-hidden">
            <Navbar setActiveSection={setActiveSection} onLoginClick={handleShowLogin} />
            {activeSection === 'login' ? (
                <LoginTab onLoginSuccess={handleLoginSuccess} />
            ) : (
                <>
                    {activeSection === 'home' && <ApartmentSection />}
                    {activeSection === 'howItWorks' && <HowItWorks />}
                    {activeSection === 'help' && <Help />}
                    {activeSection === 'profile' && <Profile />}
                </>
            )}
        </div>
    );
}

export default App;
