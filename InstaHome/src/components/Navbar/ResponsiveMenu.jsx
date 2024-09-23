import React from 'react'
import { AnimatePresence, motion } from 'framer-motion';

const ResponsiveMenu = ({ open }) => {
  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial={{ opacity: 0 ,y: -100}}
          animate={{ opacity: 1 ,y: 0}}
          exit={{ opacity: 0 ,y: -100}}
        transition={{ duration: 0.5 }}
          className='absolute top-20 left-0 w-full h-screen z-20'
        >
         <div className='text-xl font-semibold uppercase bg-blue-300 text-white py-5 m-6 rounded-3xl'>
            <ul className='flex flex-col justify-center items-center gap-6'>
                <li>Home</li>
                <li>About</li>
                <li>Program</li>
                <li>Profile</li>
            </ul>
         </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveMenu;