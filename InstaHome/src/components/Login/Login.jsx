import React, { useState, useEffect } from 'react';
import { IoLogoGoogleplus } from "react-icons/io";
import { 
  registerWithEmail, 
  signInWithGoogle, 
  onAuthStateChanged,
  getCurrentUser 
} from '../../Firebase/Firebase'; 
import { motion } from 'framer-motion'; 

const Login = ({ onLoginSuccess }) => {
  const [isActive, setIsActive] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  // Check authentication state on component mount
  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          // User is already logged in
          setUser(currentUser);
          // Store user info in local storage
          localStorage.setItem('user', JSON.stringify(currentUser));
          onLoginSuccess();
        }
      } catch (error) {
        console.error("Error checking auth state:", error);
      }
    };

    checkAuthState();

    // Set up auth state listener
    const unsubscribe = onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [onLoginSuccess]);

  // Efecto para limpiar los inputs cada vez que cambia entre Sign Up y Sign In
  useEffect(() => {
    setEmail('');
    setPassword('');
  }, [isActive]);

  const handleManualLogin = async (e) => {
    e.preventDefault();
    try {
      await registerWithEmail(email, password);
      onLoginSuccess();
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      onLoginSuccess();
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-200 to-blue-200"
      initial={{ opacity: 0, scale: 0.9 }} // Estado inicial
      animate={{ opacity: 1, scale: 1 }} // Estado final
      exit={{ opacity: 0, scale: 0.9 }} // Al desmontar
      transition={{ duration: 0.5, ease: "easeInOut" }} // Control de la duración
    >
        <div className="relative w-full max-w-4xl min-h-[480px] bg-white shadow-lg overflow-hidden rounded-lg">
          <div className="absolute inset-0 flex transition-transform duration-700 ease-in-out">
            {/* Sign-Up Form */}
            <div className={`w-1/2 flex flex-col items-center justify-center px-10 bg-white transition-all duration-500 ease-in transform ${isActive ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}>
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
            <div className={`w-1/2 flex flex-col items-center justify-center px-10 bg-white transition-all duration-500 ease-in transform ${isActive ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
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
          <div className={`absolute top-0 right-0 h-full w-1/2 transition-transform duration-1000 ease-in-out bg-gradient-to-r from-indigo-600 to-purple-700 text-white ${isActive ? '-translate-x-full' : 'translate-x-0'}`}
            style={{
              borderTopLeftRadius: isActive ? '0' : '120px',
              borderBottomLeftRadius: isActive ? '0' : '120px',
              borderTopRightRadius: isActive ? '120px' : '0',
              borderBottomRightRadius: isActive ? '120px' : '0',
              transition: 'border-radius 0.8s ease' 
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
    </motion.div>
  );
};

export default Login;