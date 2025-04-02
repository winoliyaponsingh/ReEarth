import React from 'react'
import MainPagePic from "../assets/waste.png";
import { LuLeaf } from "react-icons/lu";
import Navbar from "./Navbar";

const VendorHomePage = () => {
  return (
    <>
      <Navbar />
      <div>
        <div className="flex flex-row justify-center items-center h-140 ">
          <div className="w-150 h-100  justify-center items-center  mt-20  mr-20 rounded-lg grid grid-row-2 gap-1 bg-lime-200">
            <div className=" justify-left flex  ">
              <h1 className="text-6xl font-bold text-gray-900 ml-3">Welcome Vendor !</h1>
            </div>

            <div className="grid grid-rows-2 grid-flow-col ml-5 gap-3">
              <div>
                <button className="border-0 p-2 w-50 h-15 rounded-lg text-xl font-semibold px-2 cursor-pointer bg-[rgb(13,184,117)] text-gray-900 hover:bg-gray-900 hover:text-white">
                  Create Profile
                </button>
              </div>
              <div>
              <button className="border-0 p-2 w-50 h-15 rounded-lg text-xl font-semibold px-2 cursor-pointer bg-[rgb(13,184,117)] text-gray-900 hover:bg-gray-900 hover:text-white">
                  View Trash
                </button>
              </div>
              <div>
              <button className="border-0 p-2 w-50 h-15 rounded-lg text-xl font-semibold px-2 cursor-pointer bg-[rgb(13,184,117)] text-gray-900 hover:bg-gray-900 hover:text-white">
                  View Transactions
                </button>
              </div>
              <div>
              <button className="border-0 p-2 w-50 h-15 rounded-lg text-xl font-semibold px-2 cursor-pointer bg-[rgb(13,184,117)] text-gray-900 hover:bg-gray-900 hover:text-white">
                  Rewards
                </button>
              </div>
             
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

export default VendorHomePage
