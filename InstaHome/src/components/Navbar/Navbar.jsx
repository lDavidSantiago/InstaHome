import React from 'react';

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
