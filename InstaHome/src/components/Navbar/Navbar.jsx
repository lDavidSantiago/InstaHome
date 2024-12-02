import React, { useState } from 'react';
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";
import { FaPhoneAlt } from "react-icons/fa";

const Navbar = ({ setActiveSection, onLoginClick, onLogout, isLoggedIn }) => {
    const [open, setOpen] = useState(false);

    const handleNavClick = (section) => {
        setActiveSection(section);
        setOpen(false);
    };

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <header className="w-full shadow-md">
            {/* Sección superior */}
            <div className="bg-sky-950 py-4">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-[3.5fr_2fr_0.1fr] items-center px-4 md:px-16 gap-4 text-white">
                    <div className="flex justify-center md:justify-start">
                        <div
                            className="text-3xl font-bold cursor-pointer"
                            onClick={() => handleNavClick('home')}
                        >
                            Insta<span className="text-secondary">Home</span>
                        </div>
                    </div>
                    <div className="text-center md:text-left text-sm">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                            <div className="flex items-center gap-2">
                                <SiGooglemaps className="text-3xl mt-1" />
                                <div>
                                    <span>Carrera 28A # 14b-16</span>
                                    <br />
                                    <span className="text-gray-300">Tulúa, Valle del Cauca, Colombia</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaPhoneAlt className="text-2xl mt-1" />
                                <div>
                                    <span>2328594</span>
                                    <br />
                                    <span className="text-gray-300">InstaHome@gmail.com</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center md:items-end justify-center md:justify-end mt-4 md:mt-0">
                        <p className="font-semibold mb-2 text-center md:text-right">Síguenos:</p>
                        <div className="flex space-x-4">
                            <a 
                                href="https://www.instagram.com/inst4_home/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                <FaInstagram className="text-2xl cursor-pointer" />
                            </a>
                            <a 
                                href="https://www.facebook.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                <FaFacebook className="text-2xl cursor-pointer" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>


        <nav className="container mx-auto flex items-center justify-between py-2 px-8">
            {/* Contenedor del menú de navegación centrado */}
            <ul className="flex space-x-8 justify-center mx-auto">
                {['home', 'howItWorks', 'help'].map((section) => (
                <li key={section}>
                    <a
                    href="#"
                    onClick={() => handleNavClick(section)}
                    className="inline-block py-2 px-3 text-gray-600 font-bold transition duration-300 hover:text-primary hover:border-b-2 hover:border-primary"
                    >
                    {section.charAt(0).toUpperCase() + section.slice(1).replace(/([A-Z])/g, ' $1')}
                    </a>
                </li>
                ))}
            </ul>

            {/* Botón Login o Menú desplegable alineado a la derecha */}
            <div className="flex items-center">
                {isLoggedIn ? (
                <div className="relative">
                    <button
                    onClick={handleClick}
                    className="bg-white rounded-full shadow-lg p-2 hover:bg-gray-200 transition-colors"
                    >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                        />
                    </svg>
                    </button>
                    {open && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-2xl py-2 z-50">
                        <a
                        href="#"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => handleNavClick('profile')}
                        >
                        Profile
                        </a>
                        <a
                        href="#"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => handleNavClick('RegisterHome')}
                        >
                        RegisterHome
                        </a>
                        <a
                        href="#"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={onLogout}
                        >
                        Logout
                        </a>
                    </div>
                    )}
                </div>
                ) : (
                <button
                    onClick={onLoginClick}
                    className="bg-sky-900 text-white font-semibold py-2 px-4 rounded hover:bg-secondary transition duration-300"
                >
                    Login
                </button>
                )}
            </div>
            </nav>

    </header>
    );
};

export default Navbar;