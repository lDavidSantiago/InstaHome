// src/components/HelpSection/HelpSection.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com'; // Importa EmailJS

// Inicializa EmailJS
(function() {
  emailjs.init("beyEpuaGTYDor1lsH"); // Reemplaza con tu USER_ID de EmailJS
})();

const HelpSection = () => {
  const [activeSection, setActiveSection] = useState('faq');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Función para enviar correo
  const sendEmail = (e) => {
    e.preventDefault(); // Evita que se recargue la página

    const templateParams = {
      to_name: 'Soporte',
      from_name: email,
      message: message
    };

    emailjs.send('service_1zuassb', 'template_6t9yoki', templateParams)
      .then((response) => {
        console.log('Correo enviado con éxito:', response.status, response.text);
        alert('Mensaje enviado exitosamente');
      }, (error) => {
        console.error('Error al enviar el correo:', error);
        alert('Hubo un error al enviar el correo');
      });
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'faq':
        return (
          <div className="text-left">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Preguntas Frecuentes</h3>
            <ul className="list-disc pl-5">
              <li className="mb-2">
                <strong>¿Cómo puedo arrendar una propiedad?</strong>
                <p>Para arrendar una propiedad, puedes navegar por nuestra lista de propiedades disponibles y enviar una solicitud a través de nuestra plataforma.</p>
              </li>
              <li className="mb-2">
                <strong>¿Qué documentos necesito para arrendar?</strong>
                <p>Generalmente, necesitarás una identificación válida, comprobante de ingresos y referencias personales. Puedes revisar los requisitos específicos en cada anuncio.</p>
              </li>
              <li className="mb-2">
                <strong>¿Puedo ver la propiedad antes de arrendar?</strong>
                <p>Sí, te recomendamos programar una visita para conocer la propiedad en persona antes de tomar una decisión.</p>
              </li>
              <li className="mb-2">
                <strong>¿Qué debo hacer si tengo problemas con el arrendamiento?</strong>
                <p>Si enfrentas problemas, contáctanos a través de nuestra sección de soporte, y estaremos encantados de ayudarte.</p>
              </li>
              <li className="mb-2">
                <strong>¿Puedo cancelar mi arrendamiento?</strong>
                <p>Las políticas de cancelación varían según el arrendador. Te recomendamos leer los términos antes de finalizar el contrato.</p>
              </li>
            </ul>
          </div>
        );
      case 'contact':
        return (
          <div className="text-left">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Contacto Directo con Soporte</h3>
            <form onSubmit={sendEmail}>
              <div className="mb-4">
                <label className="block text-gray-600" htmlFor="email">Correo Electrónico:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  placeholder="tu_correo@ejemplo.com"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600" htmlFor="message">Mensaje:</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  rows="4"
                  placeholder="Escribe tu mensaje aquí..."
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Enviar
              </button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="bg-gray-100 py-12 mt-8 min-h-screen flex items-start justify-center">
      <motion.div
        className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg text-center p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-3xl font-semibold text-gray-700 mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Bienvenido. ¿Cómo podemos ayudarte?
        </motion.h2>

        <motion.p
          className="text-gray-600 text-lg mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Aquí podrás ponerte en contacto con nosotros para soporte técnico y ayudarte con tus sueños.
          También facilitaremos el contacto con nuestros arrendatarios y clientes para una mejor comunicación.
        </motion.p>

        <div className="flex justify-center gap-6 mb-6">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setActiveSection('faq')}
          >
            Preguntas Frecuentes
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => setActiveSection('contact')}
          >
            Contacto Soporte
          </button>
        </div>

        <div className="text-left">
          {renderContent()}
        </div>
      </motion.div>
    </section>
  );
};

export default HelpSection;