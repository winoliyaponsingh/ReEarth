import React, { useState } from 'react';
import { Building2, Mail, Package, Scale, Truck, Clock, Check, X, AlertCircle, Image as ImageIcon } from 'lucide-react';

function UserViewTransactions() {
  const [activeTab, setActiveTab] = useState('received');

  const receivedRequests = [
    {
      id: 1,
      businessName: "EcoTech Solutions",
      email: "contact@ecotech.com",
      wasteType: "Electronic Waste",
      weight: "500kg",
      collectionMethod: "Pickup",
      status: "pending"
    },
    {
      id: 2,
      businessName: "Green Manufacturing Co",
      email: "waste@greenmanufacturing.com",
      wasteType: "Industrial Plastic",
      weight: "1000kg",
      collectionMethod: "Dropoff",
      status: "complete"
    },
    {
      id: 3,
      businessName: "Bio Research Labs",
      email: "disposal@biolabs.com",
      wasteType: "Chemical Waste",
      weight: "200kg",
      collectionMethod: "Pickup",
      status: "incomplete"
    }
  ];

  const sentRequests = [
    {
      id: 1,
      name: "Waste Management Inc",
      email: "processing@wastemanagement.com",
      wasteType: "Metal Scrap",
      weight: "750kg",
      photo: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80",
      status: "pending"
    },
    {
      id: 2,
      name: "RecycleTech Industries",
      email: "intake@recycletech.com",
      wasteType: "Electronic Components",
      weight: "300kg",
      photo: "https://images.unsplash.com/photo-1623625434462-e5e42318ae49?auto=format&fit=crop&q=80",
      status: "pending"
    }
  ];

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'complete':
        return 'bg-green-100 text-green-800';
      case 'incomplete':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (requestId, newStatus) => {
    console.log(`Changing status of request ${requestId} to ${newStatus}`);
    // Here you would typically update the status in your backend
  };

  const handleRequestAction = (requestId, action) => {
    console.log(`${action} request ${requestId}`);
    // Here you would typically handle the accept/deny action in your backend
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Transaction Management</h1>
        
        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'received'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('received')}
          >
            Received Requests
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'sent'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('sent')}
          >
            Sent Requests
          </button>
        </div>

        {/* Received Requests */}
        {activeTab === 'received' && (
          <div className="space-y-4">
            {receivedRequests.map((request) => (
              <div key={request.id} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center space-x-3">
                      <Building2 className="w-5 h-5 text-gray-400" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        {request.businessName}
                      </h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{request.email}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Package className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{request.wasteType}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Scale className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{request.weight}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Truck className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{request.collectionMethod}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-3">
                    {/* Accept/Deny Buttons */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleRequestAction(request.id, 'accept')}
                        className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-1"
                      >
                        <Check className="w-4 h-4" />
                        <span>Accept</span>
                      </button>
                      <button
                        onClick={() => handleRequestAction(request.id, 'deny')}
                        className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center space-x-1"
                      >
                        <X className="w-4 h-4" />
                        <span>Deny</span>
                      </button>
                    </div>

                    {/* Status Selection */}
                    <select
                      value={request.status}
                      onChange={(e) => handleStatusChange(request.id, e.target.value)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium border ${getStatusBadgeColor(request.status)}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="complete">Complete</option>
                      <option value="incomplete">Incomplete</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Sent Requests */}
        {activeTab === 'sent' && (
          <div className="space-y-4">
            {sentRequests.map((request) => (
              <div key={request.id} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center space-x-3">
                      <Building2 className="w-5 h-5 text-gray-400" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        {request.name}
                      </h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{request.email}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Package className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{request.wasteType}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Scale className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{request.weight}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <ImageIcon className="w-4 h-4 text-gray-400" />
                        <a
                          href={request.photo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          View Photo
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-yellow-500" />
                    <span className="text-yellow-600 font-medium">Request Pending</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserViewTransactions;