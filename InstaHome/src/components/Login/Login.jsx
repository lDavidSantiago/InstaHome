import React, { useState, useEffect } from 'react';
import { IoLogoGoogleplus } from "react-icons/io";
import { registerWithEmail, signInWithGoogle } from '../../Firebase/Firebase'; // Importar las funciones de autenticación

const Login = ({ onLoginSuccess }) => {
  const [isActive, setIsActive] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Efecto para limpiar los inputs cada vez que cambia entre Sign Up y Sign In
  useEffect(() => {
    setEmail('');
    setPassword('');
  }, [isActive]);

  const handleManualLogin = async (e) => {
    e.preventDefault();
    await registerWithEmail(email, password,name);
    onLoginSuccess();
  };

  const handleGoogleLogin = async () => {
    await signInWithGoogle();
    onLoginSuccess();
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-200 to-blue-200">
      <div className="relative w-full max-w-4xl min-h-[480px] bg-white shadow-lg overflow-hidden rounded-lg">
        <div className="absolute inset-0 flex transition-transform duration-700 ease-in-out">
          {/* Sign-Up Form */}
          <div className={`w-1/2 flex flex-col items-center justify-center px-10 bg-white transition-all duration-700 ease-in-out transform ${isActive ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}>
            <h1 className="text-2xl font-bold">Create Account</h1>
            <div className="flex mt-4 space-x-2">
              <button onClick={handleGoogleLogin} className="flex items-center justify-center w-10 h-10 border rounded-full border-gray-300">
                <IoLogoGoogleplus />
              </button>
            </div>
            <span className="text-sm mt-4">or use your email for registration</span>
            <form onSubmit={handleManualLogin} className="w-full flex flex-col items-center">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mt-2 text-sm bg-gray-200 rounded-lg outline-none"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mt-2 text-sm bg-gray-200 rounded-lg outline-none"
                required
              />
              <button type="submit" className="px-12 py-3 mt-4 text-sm font-semibold text-white uppercase bg-purple-700 rounded-lg">
                Sign Up
              </button>
            </form>
          </div>

          {/* Sign-In Form */}
          <div className={`w-1/2 flex flex-col items-center justify-center px-10 bg-white transition-all duration-700 ease-in-out transform ${isActive ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
            <h1 className="text-2xl font-bold">Sign In</h1>
            <div className="flex mt-4 space-x-2">
              <button onClick={handleGoogleLogin} className="flex items-center justify-center w-10 h-10 border rounded-full border-gray-300">
                <IoLogoGoogleplus />
              </button>
            </div>
            <span className="text-sm mt-4">or use your email and password</span>
            <form onSubmit={handleManualLogin} className="w-full flex flex-col items-center">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mt-2 text-sm bg-gray-200 rounded-lg outline-none"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mt-2 text-sm bg-gray-200 rounded-lg outline-none"
                required
              />
              <a href="#" className="mt-3 text-sm text-gray-600">
                Forgot Your Password?
              </a>
              <button type="submit" className="px-12 py-3 mt-4 text-sm font-semibold text-white uppercase bg-purple-700 rounded-lg">
                Sign In
              </button>
            </form>
          </div>
        </div>

        {/* Toggle Panels */}
        <div className={`absolute top-0 right-0 h-full w-1/2 transition-transform duration-700 ease-in-out bg-gradient-to-r from-indigo-600 to-purple-700 text-white ${isActive ? '-translate-x-full' : 'translate-x-0'}`}
          style={{
            borderTopLeftRadius: isActive ? '0' : '120px',
            borderBottomLeftRadius: isActive ? '0' : '120px',
            borderTopRightRadius: isActive ? '120px' : '0',
            borderBottomRightRadius: isActive ? '120px' : '0',
            transition: 'border-radius 1.5s ease' // Transición lenta para borderRadius
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center px-10">
            <div className="text-center">
              {isActive ? (
                <>
                  <h1 className="text-2xl font-bold">Hello, Friend!</h1>
                  <p className="mt-4 text-sm">Register with your details to use all site features</p>
                  <button onClick={() => setIsActive(false)} className="px-10 py-3 mt-6 text-sm font-semibold text-white uppercase border rounded-lg border-white">
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  <h1 className="text-2xl font-bold">Welcome Back!</h1>
                  <p className="mt-4 text-sm">Enter your details to use all site features</p>
                  <button onClick={() => setIsActive(true)} className="px-10 py-3 mt-6 text-sm font-semibold text-white uppercase border rounded-lg border-white">
                    Sign In
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;