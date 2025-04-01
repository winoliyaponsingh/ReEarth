import React from 'react'
import { RiRecycleLine } from "react-icons/ri";
import { PiDotOutlineFill } from "react-icons/pi";
import { FaTrash } from "react-icons/fa";



const Navbar = () => {
  return (
    <div>
          <div>
      <div className=" flex mx-auto justify-around sticky top-0">
        <div className="container  w-auto h-16 flex items-center justify-center px-10">
      <RiRecycleLine className="text-3xl text-[rgb(13,184,117)]" />
      <span className="text-2xl font-bold ">Re</span>
      <span className="text-2xl font-bold ">Earth</span>
        </div>

        <div className=" flex justify-center pt-5 gap-2">
          <button className="cursor-pointer h-8 w-auto px-5  border-solid border-1 border-gray-300 rounded-xl hover:border-gray-700 ease-in-out transition bg-[rgb(13,184,117)]">
            Home
          </button>
          
          <PiDotOutlineFill className='h-8 text-[rgb(172,215,156)]' />
          <button className="cursor-pointer h-8 w-auto px-5  border-solid border-1 border-gray-300 rounded-xl hover:border-gray-700 ease-in-out transition">
            Join ReEarth Now
          </button>

          <PiDotOutlineFill className='h-8 text-[rgb(172,215,156)]' />
          <button className="cursor-pointer h-8 w-auto px-5  border-solid border-1 border-gray-300 rounded-xl hover:border-gray-700 ease-in-out transition">
            Discover Waste Insights
            
          </button>
          
        </div>

        <div className=" w-auto p-5 pt-3.5 h-16 grid grid-cols-2">
          
          <button
            className="cursor-pointer w-40 h-8 bg-black text-white font-medium border-solid border-1 rounded-lg 
            transition duration-500 ease-in-out hover:translate-0.5  hover:scale-105 "
          >
            Contact us
          </button>

          
        </div>
      </div>

      <hr className="bg-gray-200 w-full h-0.5 border-0"></hr>
    </div>
    </div>
  )
}

export default Navbar
