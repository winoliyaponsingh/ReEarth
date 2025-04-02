import React from "react";
import MainPagePic from "../assets/waste.png";
import { LuLeaf, LuHandshake, LuUsers, LuShield } from "react-icons/lu";
import Navbar from "./Navbar";

const NGOHomePage = () => {
  const ngoStats = [
    { title: "Waste Recycled", value: "18.3 tons", icon: <LuLeaf />, color: "bg-emerald-500" },
    { title: "Partner Organizations", value: "42", icon: <LuHandshake />, color: "bg-green-500" },
    { title: "Communities Impacted", value: "16", icon: <LuUsers />, color: "bg-teal-500" }
  ];

  return (
    <div className="min-h-screen bg-green-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mt-8">
          {/* Left Section - Welcome and Button */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <LuHandshake className="text-emerald-600 w-10 h-10 mr-3" />
                <h1 className="text-4xl md:text-5xl font-bold text-emerald-800">Welcome, NGO!</h1>
              </div>
              
              <p className="text-gray-700 mb-8 text-lg">
                Join our eco-friendly platform to collaborate on sustainable initiatives and 
                connect with environmentally conscious individuals and organizations.
              </p>
              
              <div className="flex justify-center mb-8">
                <button className="bg-emerald-600 hover:bg-gray-800 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 px-8 py-4 text-xl font-semibold flex items-center">
                  <LuShield className="w-6 h-6 mr-2" />
                  Create Profile
                </button>
              </div>
              
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-emerald-800 mb-2 flex items-center">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div>
                  NGO Benefits
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2"></div>
                    Access to a network of eco-conscious individuals and businesses
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2"></div>
                    Collaborate on community recycling initiatives
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2"></div>
                    Receive support for environmental campaigns and projects
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Right Section - Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full blur-xl opacity-20 animate-pulse"></div>
              <div className="relative bg-white p-6 rounded-full shadow-xl">
                <img
                  src={MainPagePic}
                  alt="NGO Sustainability Illustration"
                  className="w-full max-w-md mx-auto"
                />
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-emerald-600 text-white px-6 py-2 rounded-full shadow-lg">
                <div className="flex items-center">
                  <LuLeaf className="mr-2" />
                  <span>Sustainable community partnerships</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section - Impact Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {ngoStats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
              <div className="flex items-center mb-2">
                <div className={`${stat.color} w-10 h-10 rounded-lg flex items-center justify-center text-white mr-3`}>
                  {stat.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{stat.title}</h3>
              </div>
              <p className="text-3xl font-bold text-emerald-600">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">Platform-wide impact</p>
            </div>
          ))}
        </div>
        
        {/* Call to Action Section */}
        <div className="mt-8 bg-gradient-to-br from-emerald-600 to-green-500 rounded-xl shadow-md p-6 text-white">
          <h3 className="font-semibold text-xl mb-2">Join Our Environmental Mission</h3>
          <p className="opacity-90 mb-4">Create your NGO profile today and help us build a more sustainable future together.</p>
          <div className="flex justify-end">
            <button className="bg-white text-emerald-700 px-6 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGOHomePage;