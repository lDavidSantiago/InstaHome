import React, { useState } from 'react';
import { IoLogoGoogleplus } from "react-icons/io";
import { registerWithEmail, signInWithGoogle } from '../../Firebase/Firebase'; // Importar funciones de autenticaciÃ³n

const Login = ({ onLoginSuccess }) => {
  const [isActive, setIsActive] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerWithEmail(email, password);
      onLoginSuccess();
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      onLoginSuccess();
    } catch (error) {
      console.error("Error with Google login:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-200 to-blue-200">
      <div className={`relative overflow-hidden bg-white shadow-lg w-[768px] max-w-full min-h-[480px] transition-transform duration-700 ease-in-out ${isActive ? 'translate-x-0' : ''}`}>
        
        {/* Sign-Up Form */}
        <div className={`absolute top-0 left-0 h-full w-1/2 transition-opacity duration-700 ease-in-out ${isActive ? 'opacity-0' : 'opacity-100'}`}>
          <div className="flex flex-col items-center justify-center h-full px-10 bg-white">
            <h1 className="text-2xl font-bold">Create Account</h1>
            <div className="flex mt-4 space-x-2">
              <button onClick={handleGoogleLogin} className="flex items-center justify-center w-10 h-10 border rounded-full border-gray-300">
                <IoLogoGoogleplus />
              </button>
            </div>
            <span className="text-sm mt-4">or use your email for registration</span>
            <form onSubmit={handleRegister} className="w-full flex flex-col items-center">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-3 mt-2 text-sm bg-gray-200 rounded-lg outline-none"
                required
              />
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
        </div>

        {/* Sign-In Form */}
        <div className={`absolute top-0 left-0 h-full w-1/2 transition-opacity duration-700 ease-in-out ${isActive ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-col items-center justify-center h-full px-10 bg-white">
            <h1 className="text-2xl font-bold">Sign In</h1>
            <div className="flex mt-4 space-x-2">
              <button onClick={handleGoogleLogin} className="flex items-center justify-center w-10 h-10 border rounded-full border-gray-300">
                <IoLogoGoogleplus />
              </button>
            </div>
            <span className="text-sm mt-4">or use your email and password</span>
            <form onSubmit={handleRegister} className="w-full flex flex-col items-center">
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
        <div className="absolute top-0 right-0 h-full w-1/2 transition-transform duration-700 ease-in-out bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
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