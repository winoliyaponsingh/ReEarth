import React from "react";
import MainPagePic from "../assets/waste.png";
import { LuLeaf, LuUpload, LuStore, LuHistory, LuAward, LuHandshake } from "react-icons/lu";
import Navbar from "./Navbar";

const UserHomePage = () => {
  const actionButtons = [
    {
      title: "Upload Trash",
      icon: <LuUpload className="w-6 h-6" />,
      description: "Submit details about your recyclable waste for collection",
      color: "bg-emerald-600",
    },
    {
      title: "View Vendors",
      icon: <LuStore className="w-6 h-6" />,
      description: "Connect with local recycling vendors and services",
      color: "bg-green-600",
    },
    {
      title: "View Transactions",
      icon: <LuHistory className="w-6 h-6" />,
      description: "Track your recycling history and payments",
      color: "bg-teal-600",
    },
    {
      title: "Rewards",
      icon: <LuAward className="w-6 h-6" />,
      description: "Check your earned points and available rewards",
      color: "bg-emerald-600",
    },
    {
      title: "NGO Collaborations",
      icon: <LuHandshake className="w-6 h-6" />,
      description: "Partner with environmental organizations",
      color: "bg-green-600",
    }
  ];

  return (
    <div className="min-h-screen bg-green-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mt-8">
          {/* Left Section - Welcome and Buttons */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-4xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <LuLeaf className="text-emerald-600 w-10 h-10 mr-3" />
                <h1 className="text-4xl md:text-5xl font-bold text-emerald-800">Welcome, User!</h1>
              </div>
              
              <p className="text-gray-700 mb-8 text-lg">
                Join our community of eco-conscious individuals making a difference. 
                Start your sustainability journey today.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {actionButtons.map((button, index) => (
                  <button 
                    key={index}
                    className={`${button.color} hover:bg-gray-800 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4 flex flex-col h-full`}
                  >
                    <div className="flex items-center mb-2">
                      {button.icon}
                      <span className="ml-2 font-semibold text-lg">{button.title}</span>
                    </div>
                    <p className="text-sm opacity-90 text-left">{button.description}</p>
                  </button>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-white rounded-lg border border-green-200">
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div>
                  <h3 className="font-semibold text-emerald-800">Your Impact</h3>
                </div>
                <p className="text-gray-600">
                  You've recycled 57kg of waste this month, saving approximately 28kg of CO₂ emissions!
                </p>
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
                  alt="Waste Management Illustration"
                  className="w-full max-w-md mx-auto"
                />
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-emerald-600 text-white px-6 py-2 rounded-full shadow-lg">
                <div className="flex items-center">
                  <LuLeaf className="mr-2" />
                  <span>Eco-friendly waste management</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section - Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-emerald-500">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Recycled</h3>
            <p className="text-3xl font-bold text-emerald-600">246 kg</p>
            <p className="text-sm text-gray-500 mt-1">Since you joined</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Reward Points</h3>
            <p className="text-3xl font-bold text-green-600">1,240</p>
            <p className="text-sm text-gray-500 mt-1">Available to redeem</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-teal-500">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Carbon Offset</h3>
            <p className="text-3xl font-bold text-teal-600">108 kg</p>
            <p className="text-sm text-gray-500 mt-1">CO₂ emissions saved</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;