import React from 'react';
import Navbar from './Navbar';
import MainPagePic from "../assets/waste.png";
import { 
  LuClipboardList, 
  LuTicket, 
  LuUsers, 
  // LuBarChart2,
  LuShield, 
  LuSettings 
} from "react-icons/lu";

const AdminHomePage = () => {
  const adminStats = [
    { title: "Active Users", value: "1,457", icon: <LuUsers />, color: "bg-blue-500" },
    { title: "Waste Collected", value: "24.6 tons", icon: <LuShield />, color: "bg-emerald-500" },
    { title: "Pending Requests", value: "28", icon: <LuClipboardList />, color: "bg-amber-500" }
  ];

  const adminActions = [
    { 
      title: "View Transactions Status", 
      description: "Monitor and manage all user waste collection transactions",
      icon: <LuClipboardList className="w-6 h-6" />,
      color: "bg-blue-600"
    },
    { 
      title: "Assign Coupons/Certificates", 
      description: "Distribute rewards to users based on their recycling efforts",
      icon: <LuTicket className="w-6 h-6" />,
      color: "bg-emerald-600"
    },
    { 
      title: "System Configuration", 
      description: "Adjust platform settings and parameters",
      icon: <LuSettings className="w-6 h-6" />,
      color: "bg-indigo-600"
    },
    { 
      title: "Security Controls", 
      description: "Manage access and security policies",
      icon: <LuShield className="w-6 h-6" />,
      color: "bg-teal-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        {/* Admin Header Section */}
        {/* <div className="bg-gradient-to-r from-emerald-600 to-green-500 rounded-xl shadow-lg mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between p-6">
            <div className="text-white mb-4 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold">Admin Dashboard</h1>
              <p className="mt-2 opacity-90">Waste management system control panel</p>
            </div>
            <div className="bg-white px-6 py-3 rounded-lg shadow-md flex items-center">
              <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white mr-3">
                <LuShield className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Logged in as</p>
                <p className="font-semibold text-gray-800">System Administrator</p>
              </div>
            </div>
          </div>
        </div> */}

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {adminStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 flex items-center">
              <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mr-4`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Section - Admin Actions */}
          <div className="w-full lg:w-3/5">
            <div className="bg-white rounded-xl shadow-md p-6 h-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <LuSettings className="mr-2 text-emerald-600" /> 
                Admin Controls
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {adminActions.map((action, index) => (
                  <button 
                    key={index} 
                    className={`${action.color} hover:bg-gray-800 text-white rounded-lg shadow transition-all duration-300 p-4 flex flex-col h-full text-left`}
                  >
                    <div className="flex items-center mb-2">
                      {action.icon}
                      <span className="ml-2 font-semibold">{action.title}</span>
                    </div>
                    <p className="text-sm opacity-90">{action.description}</p>
                  </button>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">System Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <p className="text-sm text-gray-700">All systems operational</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                    <p className="text-sm text-gray-700">5 new transactions awaiting approval</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Section - Image and Quick Stats */}
          <div className="w-full lg:w-2/5">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-600/20 rounded-lg blur-sm"></div>
                <img
                  src={MainPagePic}
                  alt="Admin Dashboard Illustration"
                  className="relative w-full rounded-lg"
                />
              </div>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-3">System Overview</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">System Health</span>
                  <div className="w-32 bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{width: '95%'}}></div>
                  </div>
                  <span className="text-gray-800 font-medium">95%</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Storage Usage</span>
                  <div className="w-32 bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '68%'}}></div>
                  </div>
                  <span className="text-gray-800 font-medium">68%</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">User Activity</span>
                  <div className="w-32 bg-gray-200 rounded-full h-2.5">
                    <div className="bg-emerald-600 h-2.5 rounded-full" style={{width: '82%'}}></div>
                  </div>
                  <span className="text-gray-800 font-medium">82%</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-600 to-green-500 rounded-xl shadow-md p-6 text-white">
              <h3 className="font-semibold mb-2">Today's Highlights</h3>
              <p className="text-sm opacity-90 mb-4">Weekly recycling volume has increased by 18% compared to last week.</p>
              <button className="bg-white text-emerald-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors">
                View Full Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;