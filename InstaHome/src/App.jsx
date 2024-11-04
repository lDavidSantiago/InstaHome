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
    const [showLogin, setShowLogin] = useState(false);

    const handleLoginSuccess = () => {
        setShowLogin(false);
        setActiveSection('home');
    };

    const handleShowLogin = () => {
        setShowLogin(true);
        setActiveSection('');
    };

    return (
        <div className="overflow-x-hidden">
            <Navbar setActiveSection={setActiveSection} onLoginClick={handleShowLogin} />
            {showLogin ? (
                <LoginTab onLoginSuccess={handleLoginSuccess} />
            ) : (
                <>
                    {activeSection === 'home' && <ApartmentSection />}
                    {activeSection === 'howItWorks' && <HowItWorks />}
                    {activeSection === 'help' && <Help />}
                    {activeSection === 'profile' && <Profile />} {/* Mostrar Profile */}
                </>
            )}
        </div>
    );
}

export default App;
