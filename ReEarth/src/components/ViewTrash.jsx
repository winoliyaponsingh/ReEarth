import React, { useState } from 'react';
import { User, Mail, Recycle, Weight, MapPin, Truck, Image as ImageIcon, Building2, X, Filter } from 'lucide-react';
import Navbar from './Navbar';

function ViewTrash() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    businessEmail: '',
    wasteType: '',
    wasteWeight: 0,
    collectionMethod: 'pickup',
  });

  // Sample waste data array
  const sampleWastes = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      wasteCategory: "Recyclable",
      wasteType: "Electronic Waste",
      wasteWeight: 5.2,
      location: "123 Green Street, Eco City",
      collectionMethod: "scheduled pickup",
      wasteImage: "/api/placeholder/400/250"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      wasteCategory: "Compostable",
      wasteType: "Organic",
      wasteWeight: 3.5,
      location: "456 Leaf Avenue, Green Town",
      collectionMethod: "drop off",
      wasteImage: "/api/placeholder/400/250"
    },
    {
      id: 3,
      name: "Alex Johnson",
      email: "alex@example.com",
      wasteCategory: "Hazardous",
      wasteType: "Chemical",
      wasteWeight: 2.7,
      location: "789 Pine Road, Eco Village",
      collectionMethod: "scheduled pickup",
      wasteImage: "/api/placeholder/400/250"
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    alert('Request submitted successfully!');
    setShowForm(false);
  };

  // Function to get waste category color
  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'recyclable': return 'bg-emerald-600';
      case 'compostable': return 'bg-green-600';
      case 'hazardous': return 'bg-amber-600';
      default: return 'bg-teal-600';
    }
  };

  return (
    <div className="min-h-screen bg-green-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-emerald-800">Available Waste Collection</h1>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow border border-emerald-100">
              <Filter className="w-4 h-4 text-emerald-600" />
              <span className="text-sm">Filter</span>
            </button>
          </div>
        </div>
        
        {/* More compact grid layout for waste cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sampleWastes.map((waste) => (
            <div key={waste.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-200 border border-green-100">
              <div className="relative">
                <img
                  src={waste.wasteImage}
                  alt="Waste"
                  className="w-full h-32 object-cover"
                />
                <span className={`absolute top-2 right-2 px-2 py-1 ${getCategoryColor(waste.wasteCategory)} text-white text-xs font-medium rounded-md`}>
                  {waste.wasteCategory}
                </span>
              </div>
              
              <div className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-emerald-600" />
                    <h3 className="font-bold text-gray-800">{waste.name}</h3>
                  </div>
                  <span className="text-sm text-gray-500">{waste.wasteWeight} kg</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                  <div className="flex items-center space-x-1.5 text-gray-600">
                    <Recycle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span className="truncate">{waste.wasteType}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1.5 text-gray-600">
                    <Truck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span className="capitalize truncate">{waste.collectionMethod}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1.5 text-gray-600 col-span-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span className="truncate text-xs">{waste.location}</span>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowForm(true)}
                  className="w-full py-2 bg-emerald-600 text-white text-sm rounded-md hover:bg-emerald-700 transition-colors duration-200 flex items-center justify-center space-x-1.5"
                >
                  <Truck className="w-4 h-4" />
                  <span>Request Collection</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Form - Improved and more compact */}
        {showForm && (
          <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md border-[0.5px]">
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h2 className="text-lg font-bold text-emerald-800">Waste Collection Request</h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-4 space-y-3">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <Building2 className="w-4 h-4 text-emerald-600" />
                    <label className="text-sm font-medium text-gray-700">Business Name</label>
                  </div>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  />
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <Mail className="w-4 h-4 text-emerald-600" />
                    <label className="text-sm font-medium text-gray-700">Business Email</label>
                  </div>
                  <input
                    type="email"
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                    value={formData.businessEmail}
                    onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Recycle className="w-4 h-4 text-emerald-600" />
                      <label className="text-sm font-medium text-gray-700">Type of Waste</label>
                    </div>
                    <select
                      required
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                      value={formData.wasteType}
                      onChange={(e) => setFormData({ ...formData, wasteType: e.target.value })}
                    >
                      <option value="">Select type</option>
                      <option value="Electronic Waste">Electronic</option>
                      <option value="Plastic">Plastic</option>
                      <option value="Paper">Paper</option>
                      <option value="Metal">Metal</option>
                      <option value="Glass">Glass</option>
                      <option value="Organic">Organic</option>
                      <option value="Chemical">Chemical</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Weight className="w-4 h-4 text-emerald-600" />
                      <label className="text-sm font-medium text-gray-700">Weight (kg)</label>
                    </div>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.1"
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                      value={formData.wasteWeight}
                      onChange={(e) => setFormData({ ...formData, wasteWeight: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <Truck className="w-4 h-4 text-emerald-600" />
                    <label className="text-sm font-medium text-gray-700">Collection Method</label>
                  </div>
                  <div className="flex space-x-4 text-sm">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="collectionMethod"
                        value="pickup"
                        checked={formData.collectionMethod === 'pickup'}
                        onChange={(e) => setFormData({ ...formData, collectionMethod: e.target.value })}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>Pick Up</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="collectionMethod"
                        value="dropoff"
                        checked={formData.collectionMethod === 'dropoff'}
                        onChange={(e) => setFormData({ ...formData, collectionMethod: e.target.value })}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>Drop Off</span>
                    </label>
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-600 text-white py-2 px-4 text-sm rounded-md hover:bg-emerald-700 transition-colors"
                  >
                    Submit Request
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 text-sm rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewTrash;