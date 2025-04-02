import React from 'react';
import Navbar from './Navbar';
import MainPagePic from "../assets/waste.png";
import { 
  LuClipboardList, 
  LuTicket, 
  LuUsers, 
  LuShield
} from "react-icons/lu";
import { useNavigate } from 'react-router-dom';

const AdminHomePage = () => {

  const navigate = useNavigate()
  const adminStats = [
    { title: "Active Users", value: "1,457", icon: <LuUsers />, color: "bg-blue-500" },
    { title: "Waste Collected", value: "24.6 tons", icon: <LuShield />, color: "bg-emerald-500" },
    { title: "Pending Requests", value: "28", icon: <LuClipboardList />, color: "bg-amber-500" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
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
          {/* Left Section - Single Call to Action Button */}
          <div className="w-full lg:w-3/5">
            <div className="bg-white rounded-xl shadow-md p-6 h-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Admin Controls
              </h2>
              
              <div className="flex justify-center mb-6">
                <button 
                  onClick={() => {navigate('/admin-give-rewards')}}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-lg transition-all duration-300 py-4 px-6 flex items-center justify-center text-lg font-semibold w-full md:w-3/4 mx-auto"
                >
                  <LuTicket className="w-6 h-6 mr-3" />
                  Assign Coupons and Certificates
                </button>
              </div>

              <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-lg text-center">
                <p className="text-emerald-800 mb-3">
                  Distribute rewards to users based on their recycling efforts and environmental contributions
                </p>
                <p className="text-sm text-gray-600">
                  You can assign coupons, certificates, and special rewards to recognize users who have achieved outstanding waste management milestones.
                </p>
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