import React from 'react';
<<<<<<< HEAD

const Navbar = ({ setActiveSection, onLoginClick }) => {
    const handleNavClick = (section) => {
        setActiveSection(section);
    };

    return (
        <nav className="bg-white shadow-md py-4">
            <div className="container mx-auto flex justify-between items-center px-6">
                <div className="text-2xl font-bold text-primary cursor-pointer" onClick={() => handleNavClick('home')}>
                    Insta<span className="text-secondary">Home</span>
                </div>
                <ul className="flex space-x-8">
                    <li>
                        <a 
                            href="#"
                            onClick={() => handleNavClick('home')}
                            className="inline-block py-2 px-3 text-gray-600 font-semibold transition duration-300 hover:text-primary hover:border-b-2 hover:border-primary"
                        >
                            Home
                        </a>
                    </li>
                    <li>
                        <a 
                            href="#"
                            onClick={() => handleNavClick('howItWorks')}
                            className="inline-block py-2 px-3 text-gray-600 font-semibold transition duration-300 hover:text-primary hover:border-b-2 hover:border-primary"
                        >
                            How It Works
                        </a>
                    </li>
                    <li>
                        <a 
                            href="#"
                            onClick={() => handleNavClick('help')}
                            className="inline-block py-2 px-3 text-gray-600 font-semibold transition duration-300 hover:text-primary hover:border-b-2 hover:border-primary"
                        >
                            Help
                        </a>
                    </li>
                    <li>
                        <a 
                            href="#"
                            onClick={() => handleNavClick('profile')}
                            className="inline-block py-2 px-3 text-gray-600 font-semibold transition duration-300 hover:text-primary hover:border-b-2 hover:border-primary"
                        >
                            Profile
                        </a>
                    </li>
                </ul>
                <button
                    onClick={onLoginClick}
                    className="bg-primary text-white font-semibold py-2 px-4 rounded hover:bg-secondary transition duration-300"
                >
                    Login
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
=======
import { NavbarMenu } from '../../mockData/data';
import { CiSearch } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";
import { IoMenuOutline } from "react-icons/io5";
import ResponsiveMenu from './ResponsiveMenu';

const Navbar = ({ setActiveSection, onLoginClick }) => {
    const [open, setOpen] = React.useState(false);
    
    const handleNavClick = (section) => {
        setActiveSection(section);
        setOpen(false); // Cierra el menú móvil al seleccionar una opción
    };

    return (
        <>
            <nav className="bg-white shadow">
                <div className='container flex justify-between items-center py-4'>
                    {/* Logo section */}
                    <div className='text-2xl flex items-center gap-2 font-bold'>
                        <IoHomeSharp className="text-primary" />
                        <span className='text-gray-800'>Insta</span>
                        <span className='text-secondary'>Home</span>
                    </div>
                    
                    {/* Menu section */}
                    <div className='hidden md:block'>
                        <ul className='flex items-center gap-6 text-gray-600'>
                            {NavbarMenu.map((item) => (
                                <li key={item.id}>
                                    <a 
                                        href='#' // Cambiar a "#" para evitar scroll
                                        onClick={() => handleNavClick(item.title === 'How it works' ? 'howItWorks' : 'home')}
                                        className='inline-block py-2 px-3 text-gray-600 font-semibold transition duration-300 hover:text-primary hover:border-b-2 hover:border-primary'
                                    >
                                        {item.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    {/* Icons section */}
                    <div className="flex items-center gap-4">
                        <button 
                            className="text-2xl hover:bg-primary hover:text-white rounded-full p-2 duration-200"
                            aria-label="Search"
                        >
                            <CiSearch className="text-gray-600" />
                        </button>
                        <button 
                            onClick={onLoginClick} // Llama a la función para abrir el login
                            className="hover:bg-primary text-primary font-semibold 
                            hover:text-white rounded-md border-2 border-primary px-7 py-2 
                            duration-200 shadow-md hover:shadow-lg transition-all"
                        >
                            Login
                        </button>
                    </div>
                    
                    {/* Mobile Menu Icon */}
                    <div 
                        className='md:hidden' 
                        onClick={() => setOpen(!open)} 
                        aria-expanded={open}
                    >
                        <IoMenuOutline className='text-4xl text-gray-600' />
                    </div>
                </div>
            </nav>
            {/* Mobile menu */}
            <ResponsiveMenu open={open} />
        </>
    );
};

export default Navbar;
>>>>>>> 8c65e0683790c76e4b93d09c612b7ae2809a6b65
