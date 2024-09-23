import React from 'react'
import { NavbarMenu } from '../../mockData/data'
import { CiSearch } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";
import { IoMenuOutline } from "react-icons/io5";
import ResponsiveMenu from './ResponsiveMenu';


const Navbar = () => {
    const [open, setOpen] = React.useState(false);
    return (
    <>
    <nav>
        <div className='container flex justify-between items-center py-8'>
            {/*Logo seection*/}
            <div className='text-2xl flex items-center 
            gap-2 font-bold py-8 '>
                <IoHomeSharp />
                <p>Insta</p>
                <p className='text-secondary'>Home</p>
            </div>
            {/*Menu section*/}
            <div className='hidden md:block'>
                <ul className='flex items-center gap-6 text-gray-600'>
                   {NavbarMenu.map((item) => {
                          return <li key={item.id}>
                            <a href={item.link} className='inline-block py-1 px-3 hover:text-primary font-semibold'>{item.title}</a>
                          </li>;
                   })}
                </ul>
            </div>
            {/*Icons section*/}
            <div className="flex items-center gap-4">
                <button className="text-2xl hover:bg-primary hover:text-white rounded-full p-2 duration-200">
                    <CiSearch className="text-2xl text-gray-600"/>
                </button>
                <button className="hover:bg-primary text-primary font-semibold 
                hover:text-white rounded-md border-2 border-primary px-7 py-2
                duration-200 hidden md:block">
                    Login
                </button>
            </div>
            {/*Mobile*/}
            <div className='md:hidden' onClick={() => setOpen(!open)}>
                <IoMenuOutline className='text-4xl'/>
            </div>
        </div>
    </nav>
            {/*Mobile menu*/}
            <ResponsiveMenu open={open}/>
    </>
  )
}

export default Navbar