import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import ApartmentSection from './components/Apartments/ApartmentSection';
import HowItWorks from './components/HowItWorks/HowItWorks';

import './App.css';

function App() {
  // Estado para controlar la sección activa
  const [activeSection, setActiveSection] = useState('home');

  return (
    <>
      <div className='overflow-x-hidden'>
        <Navbar setActiveSection={setActiveSection} />
        {/* Mostrar la sección correspondiente según el estado */}
        {activeSection === 'home' && <ApartmentSection />}
        {activeSection === 'howItWorks' && <HowItWorks />}
      </div>
    </>
  );
}

export default App;
