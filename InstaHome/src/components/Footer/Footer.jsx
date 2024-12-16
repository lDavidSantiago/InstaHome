import React from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = ({setActiveSection}) => {
    return (
        <footer className="w-full bg-sky-950 py-8 text-white">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 md:px-8">
                {/* Sección: Quiénes somos */}
                <div>
                    <h3 className="text-lg font-bold mb-4 relative after:content-[''] after:block after:w-full after:h-1 after:bg-blue-600 after:mt-2">QUIÉNES SOMOS</h3>
                    <p className="text-sm">
                        Empresa inmobiliaria que brinda soluciones a interesados en Renta, Administración de inmuebles, entre otros en la ciudad de Tuluá.
                    </p>    
                </div>

                {/* Sección: Ubicación y Contacto */}
                <div>
                    <h3 className="text-lg font-bold mb-4 relative after:content-[''] after:block after:w-full after:h-1 after:bg-blue-600 after:mt-2">UBICACIÓN Y CONTACTO</h3>
                    <p className="text-sm mb-2">
                        <strong>Ubicación:</strong> Carrera 28A # 14b-16 <br />
                        Tuluá - Valle del Cauca - Colombia
                    </p>
                    <p className="text-sm mb-2">
                        <strong>Móvil:</strong> +573162239971
                    </p>
                    <p className="text-sm mb-2">
                        <strong>Teléfono:</strong> 2328594
                    </p>
                    <p className="text-sm">
                        <strong>Email:</strong> InstaHome@gmail.com
                    </p>
                    <p className="flex space-x-4 mt-4">
                        <a 
                            href="https://www.instagram.com/inst4_home/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <FaInstagram className="text-2xl cursor-pointer" />
                        </a>
                        <a 
                            href="https://www.facebook.com/profile.php?id=61569414017866" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <FaFacebook className="text-2xl cursor-pointer" />
                        </a>
                    </p>
                </div>

                {/* Sección: Información */}
                <div>
                    <h3 className="text-lg font-bold mb-4 relative after:content-[''] after:block after:w-full after:h-1 after:bg-blue-600 after:mt-2">INFORMACIÓN</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <button 
                                className="hover:underline" 
                                onClick={() => setActiveSection('home')}
                            >
                                Inicio
                            </button>
                        </li>
                        <li>
                            <button 
                                className="hover:underline" 
                                onClick={() => setActiveSection('howItWorks')}
                            >
                                How it Works
                            </button>
                        </li>
                        <li>
                            <button 
                                className="hover:underline" 
                                onClick={() => setActiveSection('help')}
                            >
                                Contáctenos
                            </button>
                        </li>
                    </ul>
                </div>
                {/* Sección: Ofertar */}
                <div className="flex flex-col items-center md:items-end">
                    <h3 className="text-lg font-bold mb-4">Oferte su inmueble con nosotros</h3>
                    <a href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjDh6Dtx6uKAxWnSTABHYf_AJ0QFnoECBYQAQ&url=https%3A%2F%2Fco.mileroticos.com%2Fescorts%2Fvalle-del-cauca%2Ftulua%2F&usg=AOvVaw1yW-K4LVqw55vmIEMIF7gn&opi=89978449v" className="bg-blue-600 text-white font-bold py-2 px-6 rounded-md hover:bg-blue-700 transition">
                        OFERTAR
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
