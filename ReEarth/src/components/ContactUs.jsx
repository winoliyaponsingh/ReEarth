import React from "react";
import Navbar from "./Navbar";

const ContactUs = () => {
  return (
    <>
      <Navbar />

      <div className=" h-140 w-250 mt-10 ml-65 bg-lime-200 rounded-xl flex  grid-cols-2 ">
        <div className=" h-130 w-60 mt-5 ml-5 bg-lime-200 rounded-xl"></div>
        <div className=" h-130 w-175 mt-5 ml-5 bg-[rgb(13,184,117)] rounded-xl">
          <div>
            <p className="font-bold text-gray-900 text-3xl ml-4 mt-3">
              Contact Us.
            </p>
            <p className=" text-gray-900  ml-5 ">Get in Touch with Us!</p>
          </div>

          <div className="flex grid-cols-2">
            <div>
              <h3 className="font-bold text-gray-900  ml-4 mt-3">Name:-</h3>
              <input
                type="text"
                className=" text-gray-900 text-3xl ml-4 mt-3 bg-lime-200 rounded-xl"
              />
            </div>
          </div>

          
          <div className="flex grid-cols-2">
            <div>
              <h3 className="font-bold text-gray-900  ml-4 mt-3">Email Address:-</h3>
              <input
                type="text"
                className=" text-gray-900 text-3xl ml-4 mt-3 bg-lime-200 rounded-xl"
              />
            </div>
          </div>

          
          <div className="flex grid-cols-2">
            <div>
              <h3 className="font-bold text-gray-900  ml-4 mt-3">Subject:-</h3>
              <input
                type="text"
                className=" text-gray-900 text-3xl ml-4 mt-3 bg-lime-200 rounded-xl"
              />
            </div>
          </div>

          
          <div className="flex grid-cols-2">
            <div>
              <h3 className="font-bold text-gray-900  ml-4 mt-3">Message:-</h3>
              <input
                type="text"
                className=" text-gray-900 text-3xl ml-4 mt-3 h-20 bg-lime-200 rounded-xl"
              />
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default ContactUs;
