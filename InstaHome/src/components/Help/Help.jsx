import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';

(function() {
  emailjs.init("beyEpuaGTYDor1lsH");
})();

const HelpSection = () => {
  const [activeSection, setActiveSection] = useState('faq');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

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
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Preguntas Frecuentes</h3>
            <ul className="list-disc pl-5 space-y-4">
              <li>
                <strong>¿Cómo puedo arrendar una propiedad?</strong>
                <p>Para arrendar una propiedad, puedes navegar por nuestra lista de propiedades disponibles y enviar una solicitud a través de nuestra plataforma.</p>
              </li>
              <li>
                <strong>¿Qué documentos necesito para arrendar?</strong>
                <p>Generalmente, necesitarás una identificación válida, comprobante de ingresos y referencias personales. Puedes revisar los requisitos específicos en cada anuncio.</p>
              </li>
              <li>
                <strong>¿Puedo ver la propiedad antes de arrendar?</strong>
                <p>Sí, te recomendamos programar una visita para conocer la propiedad en persona antes de tomar una decisión.</p>
              </li>
              <li>
                <strong>¿Qué debo hacer si tengo problemas con el arrendamiento?</strong>
                <p>Si enfrentas problemas, contáctanos a través de nuestra sección de soporte, y estaremos encantados de ayudarte.</p>
              </li>
              <li>
                <strong>¿Puedo cancelar mi arrendamiento?</strong>
                <p>Las políticas de cancelación varían según el arrendador. Te recomendamos leer los términos antes de finalizar el contrato.</p>
              </li>
            </ul>
          </div>
        );
      case 'contact':
        return (
          <div className="text-left">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Contacto Directo con Soporte</h3>
            <form onSubmit={sendEmail} className="space-y-4">
              <div>
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
              <div>
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
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
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
    <section className="relative bg-gray-100 py-12 min-h-screen flex items-start justify-center">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 py-16"></div>
      <motion.div
        className="relative max-w-3xl mx-auto bg-white shadow-lg rounded-lg text-center p-8"
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
            className={`px-4 py-2 rounded transition duration-300 ${activeSection === 'faq' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setActiveSection('faq')}
          >
            Preguntas Frecuentes
          </button>
          <button
            className={`px-4 py-2 rounded transition duration-300 ${activeSection === 'contact' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
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
