import React from 'react'
import Navbar from './Navbar'
import MainPagePic from "../assets/waste.png"

const NGOHomePage = () => {
  return (
    <>
      <Navbar />
      <div>
        <div className="flex flex-row justify-center items-center h-140 ">
          <div className="w-150 h-100  justify-center items-center  mt-10  mr-20 rounded-lg grid grid-row-2 gap-1 bg-lime-200">
            <div className=" justify-left flex  ">
              <h1 className="text-5xl font-bold text-gray-900 ml-3">Welcome NGO !</h1>
            </div>

        

              <div>
              <button className="border-0 p-2 w-50 h-25 ml-20 rounded-lg text-xl font-semibold px-2 cursor-pointer bg-[rgb(13,184,117)] text-gray-900 hover:bg-gray-900 hover:text-white">
                  Create Profile
                </button>
              </div>
              
             
           
          </div>

          <div className="w-150 h-100 mb-40 rounded-lg">
            <img
              src={MainPagePic}
              alt="MainPagePic"
              className="size-150 ml-10 mb-200"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default NGOHomePage
