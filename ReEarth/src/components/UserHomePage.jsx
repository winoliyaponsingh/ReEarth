import React from "react";
import MainPagePic from "../assets/waste.png";
import { LuLeaf } from "react-icons/lu";
import Navbar from "./Navbar";

const UserHomePage = () => {
  return (
    <>
      <Navbar />
      <div>
        <div className="flex flex-row justify-center items-center h-140 ">
          <div className="w-150 h-100  justify-center items-center  mt-20  mr-20 rounded-lg grid grid-row-2 gap-1 bg-lime-200">
            <div className=" justify-left flex  ">
              <h1 className="text-7xl font-bold text-gray-900 ml-3">Welcome User !</h1>
            </div>

            <div className="grid grid-rows-3 grid-flow-col  gap-3">
              <div>
                <button className="border-0 p-2 w-50 h-15 rounded-lg text-xl font-semibold px-2 cursor-pointer bg-[rgb(13,184,117)] text-gray-900 hover:bg-gray-900 hover:text-white">
                  Upload Trash
                </button>
              </div>
              <div>
              <button className="border-0 p-2 w-50 h-15 rounded-lg text-xl font-semibold px-2 cursor-pointer bg-[rgb(13,184,117)] text-gray-900 hover:bg-gray-900 hover:text-white">
                  View Vendors
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
              <div>
              <button className="border-0 p-2 w-50 h-15 rounded-lg text-xl font-semibold px-2 cursor-pointer bg-[rgb(13,184,117)] text-gray-900 hover:bg-gray-900 hover:text-white">
                  NGO Collabrations
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
  );
};

export default UserHomePage;
