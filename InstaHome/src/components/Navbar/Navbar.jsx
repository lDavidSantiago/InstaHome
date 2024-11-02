import React from 'react';
import { NavbarMenu } from '../../mockData/data';
import { CiSearch } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";
import { IoMenuOutline } from "react-icons/io5";
import ResponsiveMenu from './ResponsiveMenu';

const Navbar = ({ setActiveSection }) => {
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
