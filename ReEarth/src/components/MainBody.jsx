import React from "react";
import MainPagePic from "../assets/waste.png";
import { LuLeaf } from "react-icons/lu";

const MainBody = () => {
  return (
    <div >
      <div className="flex flex-row justify-center items-center h-140 mx-5">
        <div className="w-150 h-100  justify-center items-center  mt-20  mr-20 mb-10 rounded-lg grid grid-row-4 gap-2 ">
          <div className="flex justify-center ">
            <h1 className="text-7xl font-bold">
              Let's Take the Smart Way to Sustainability
            </h1>
          </div>

          <div className="flex justify-center w-90 ">
            <h2 className="text-sm">
              ReEarth connects individuals with recycling and reuse vendors,
              making waste management simple, smart, and sustainable.
            </h2>
          </div>

          <div className="flex  px-2 gap-2">
            <button className="border-1 p-2 flex rounded-xl text-sm/5 px-8 cursor-pointer bg-black text-white hover:bg-[rgb(13,184,117)] hover:text-black">
              Join ReEarth Now
              <LuLeaf className="size-5 pl-1.5" />
            </button>
            <button className="border-1 p-2 rounded-xl border-gray-300 text-sm/5 px-8 cursor-pointer hover:border-gray-700">
              About ReEarth
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
  );
};

export default MainBody;
