import React from "react";
import MainPagePic from "../assets/waste.png";
import {
  LuLeaf,
  LuUserPlus,
  LuTrash2,
  LuHistory,
  LuAward,
  LuTruck,
} from "react-icons/lu";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const VendorHomePage = () => {
  const navigate = useNavigate();
  const vendorActions = [
    {
      title: "Create Profile",
      icon: <LuUserPlus className="w-6 h-6" />,
      description: "Set up your collection services and business information",
      route : "/vendor-upload-profile",
      color: "bg-emerald-600",
    },
    {
      title: "View Trash",
      icon: <LuTrash2 className="w-6 h-6" />,
      description: "Browse available waste for collection in your area",
      route : "/vendor-view-trash",
      color: "bg-green-600",
    },
    {
      title: "View Transactions",
      icon: <LuHistory className="w-6 h-6" />,
      description: "Track your collection history and payments",
      route : "/vendor-view-transactions",
      color: "bg-teal-600",
    },
    {
      title: "Rewards",
      icon: <LuAward className="w-6 h-6" />,
      description: "Check your earned incentives and certifications",
      route : "/vendor-view-rewards",
      color: "bg-emerald-600",
    },
  ];

  const vendorStats = [
    {
      title: "Collections This Month",
      value: "152",
      color: "border-emerald-500",
    },
    { title: "Waste Processed", value: "3.2 tons", color: "border-green-500" },
    { title: "Sustainability Impact", value: "+15%", color: "border-teal-500" },
    { title: "Reward Points", value: "480", color: "border-blue-500" },
  ];

  return (
    <div className="min-h-screen bg-green-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Vendor Header */}
        {/* <div className="bg-gradient-to-r from-emerald-600 to-green-500 rounded-xl shadow-lg mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between p-6">
            <div className="text-white mb-4 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold">
                Vendor Dashboard
              </h1>
              <p className="mt-2 opacity-90">
                Manage your waste collection business
              </p>
            </div>
            <div className="bg-white px-6 py-3 rounded-lg shadow-md flex items-center">
              <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white mr-3">
                <LuTruck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Logged in as</p>
                <p className="font-semibold text-gray-800">
                  Waste Collection Vendor
                </p>
              </div>
            </div>
          </div>
        </div> */}

        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mt-8">
          {/* Left Section - Welcome and Buttons */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <LuLeaf className="text-emerald-600 w-10 h-10 mr-3" />
                <h1 className="text-4xl font-bold text-emerald-800">
                  Welcome, Vendor!
                </h1>
              </div>

              <p className="text-gray-700 mb-8 text-lg">
                Join our network of recycling professionals making a difference.
                Start collecting and processing waste sustainably today.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vendorActions.map((button, index) => (
                  <button
                    key={index}
                    onClick={() => {navigate(button.route)}}
                    className={`${button.color} hover:bg-gray-800 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4 flex flex-col h-full`}
                  >
                    <div className="flex items-center mb-2">
                      {button.icon}
                      <span className="ml-2 font-semibold text-lg">
                        {button.title}
                      </span>
                    </div>
                    <p className="text-sm opacity-90 text-left">
                      {button.description}
                    </p>
                  </button>
                ))}
              </div>

              <div className="mt-8 p-4 bg-white rounded-lg border border-green-200">
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div>
                  <h3 className="font-semibold text-emerald-800">
                    Business Impact
                  </h3>
                </div>
                <p className="text-gray-600">
                  You've processed 3.2 tons of waste this month, increasing your
                  sustainability score by 15%!
                </p>
              </div>
            </div>
            {/* Stats Section inside left column */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {vendorStats.map((stat, index) => (
                <div
                  key={index}
                  className={`bg-white p-4 rounded-xl shadow-md border-l-4 ${stat.color}`}
                >
                  <h3 className="text-md font-semibold text-gray-800 mb-1">
                    {stat.title}
                  </h3>
                  <p className="text-2xl font-bold text-emerald-600">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Image */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-600 rounded-lg blur-xl opacity-20 animate-pulse"></div>
                <div className="relative bg-white p-6 rounded-lg shadow-xl">
                  <img
                    src={MainPagePic}
                    alt="Waste Management Illustration"
                    className="w-full max-w-md mx-auto"
                  />
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Collection Status
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Capacity Utilization</span>
                    <div className="w-32 bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-emerald-600 h-2.5 rounded-full"
                        style={{ width: "78%" }}
                      ></div>
                    </div>
                    <span className="text-gray-800 font-medium">78%</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Processing Rate</span>
                    <div className="w-32 bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-green-600 h-2.5 rounded-full"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                    <span className="text-gray-800 font-medium">85%</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Customer Satisfaction</span>
                    <div className="w-32 bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: "92%" }}
                      ></div>
                    </div>
                    <span className="text-gray-800 font-medium">92%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-600 to-green-500 rounded-xl shadow-md p-6 text-white">
              <h3 className="font-semibold mb-2">New Opportunities</h3>
              <p className="text-sm opacity-90 mb-4">
                There are 18 new collection requests in your area waiting for
                pickup.
              </p>
              <button className="bg-white text-emerald-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors">
                View Collection Requests
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorHomePage;
