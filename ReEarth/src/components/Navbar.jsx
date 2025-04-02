import React, { useState } from 'react';
import { RiRecycleLine, RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { PiDotOutlineFill } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      {/* Desktop and Mobile Navbar */}
      <div className="sticky top-0 z-50 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center"
            
            onClick={()=> navigate('/')}>
              <RiRecycleLine className="text-3xl text-[rgb(13,184,117)]" />
              <span className="text-2xl font-bold">Re</span>
              <span className="text-2xl font-bold">Earth</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2" onClick={()=> navigate('/')}>
              <button className="cursor-pointer h-8 px-5 rounded-xl bg-[rgb(13,184,117)] text-white hover:bg-[rgb(11,156,99)] transition">
                Home
              </button>
              
              <PiDotOutlineFill className='h-8 text-[rgb(172,215,156)]' />
              
              <button className="cursor-pointer h-8 px-5 border border-gray-300 rounded-xl hover:border-gray-700 transition"
                onClick={() => {navigate('/join-us')}}
              >
                Join ReEarth Now
              </button>

              <PiDotOutlineFill className='h-8 text-[rgb(172,215,156)]' />
              
              <button
                onClick={() => { navigate('/waste-analyser')}}
                className="cursor-pointer h-8 px-5 border border-gray-300 rounded-xl hover:border-gray-700 transition">
                Discover Waste Insights
              </button>
            </div>

            {/* Contact button for medium screens and up */}
            <div className="hidden md:block">
              <button 
                onClick={() => { navigate('/contact')}}
                className="cursor-pointer w-32 h-8 bg-black text-white font-medium rounded-lg transition duration-500 ease-in-out hover:scale-105">
                Contact us
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none"
              >
                {isMenuOpen ? (
                  <RiCloseLine className="block h-6 w-6" />
                ) : (
                  <RiMenu3Line className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        <hr className="bg-gray-200 w-full h-0.5 border-0" />
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden absolute z-40 w-full bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button className="cursor-pointer w-full text-left px-3 py-2 block rounded-md bg-[rgb(13,184,117)] text-white">
              Home
            </button>
            <button className="cursor-pointer w-full text-left px-3 py-2 block rounded-md border border-gray-200">
              Join ReEarth Now
            </button>
            <button className="cursor-pointer w-full text-left px-3 py-2 block rounded-md border border-gray-200">
              Discover Waste Insights
            </button>
            <button className="cursor-pointer w-full text-left px-3 py-2 block rounded-md bg-black text-white">
              Contact us
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;