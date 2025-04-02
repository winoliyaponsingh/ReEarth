import React, { useState } from 'react';
import { User, Mail, Recycle, Weight, MapPin, Truck, Image as ImageIcon, Building2, X } from 'lucide-react';
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

  // Sample waste data array with 3 items for demonstration
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
      
      <div className="container mx-auto px-4 py-8">        
        {/* 3-column grid layout for waste cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleWastes.map((waste) => (
            <div key={waste.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-5 bg-green-100">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <User className="w-6 h-6 text-emerald-600" />
                    <h3 className="text-xl font-bold text-gray-800">{waste.name}</h3>
                  </div>
                  <span className={`px-3 py-1 ${getCategoryColor(waste.wasteCategory)} text-white text-sm rounded-full`}>
                    {waste.wasteCategory}
                  </span>
                </div>
              </div>
              
              <div className="p-5 space-y-3">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="truncate">{waste.email}</span>
                </div>

                <div className="flex items-start space-x-2 text-gray-600">
                  <Recycle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Waste Type:</p>
                    <p>{waste.wasteType}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-gray-600">
                  <Weight className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span>{waste.wasteWeight} kg</span>
                </div>

                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="truncate">{waste.location}</span>
                </div>

                <div className="flex items-center space-x-2 text-gray-600">
                  <Truck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="capitalize">{waste.collectionMethod}</span>
                </div>

                <div className="pt-3 border-t border-green-100">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <ImageIcon className="w-5 h-5 text-emerald-600" />
                      <span className="font-semibold">Waste Image</span>
                    </div>
                    <img
                      src={waste.wasteImage}
                      alt="Waste"
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-green-100">
                  <button
                    onClick={() => setShowForm(true)}
                    className="w-full py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <Truck className="w-5 h-5" />
                    <span>Send Request</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
              <div className="p-6 bg-emerald-100 relative">
                <h2 className="text-2xl font-bold text-emerald-800">Waste Collection Request</h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Building2 className="w-5 h-5 text-emerald-600" />
                    <label className="font-semibold text-gray-700">Business Name</label>
                  </div>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-5 h-5 text-emerald-600" />
                    <label className="font-semibold text-gray-700">Business Email</label>
                  </div>
                  <input
                    type="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                    value={formData.businessEmail}
                    onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Recycle className="w-5 h-5 text-emerald-600" />
                    <label className="font-semibold text-gray-700">Type of Waste</label>
                  </div>
                  <select
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                    value={formData.wasteType}
                    onChange={(e) => setFormData({ ...formData, wasteType: e.target.value })}
                  >
                    <option value="">Select waste type</option>
                    <option value="Electronic Waste">Electronic Waste</option>
                    <option value="Plastic">Plastic</option>
                    <option value="Paper">Paper</option>
                    <option value="Metal">Metal</option>
                    <option value="Glass">Glass</option>
                    <option value="Organic">Organic</option>
                    <option value="Chemical">Chemical</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Weight className="w-5 h-5 text-emerald-600" />
                    <label className="font-semibold text-gray-700">Waste Weight (kg)</label>
                  </div>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                    value={formData.wasteWeight}
                    onChange={(e) => setFormData({ ...formData, wasteWeight: Number(e.target.value) })}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Truck className="w-5 h-5 text-emerald-600" />
                    <label className="font-semibold text-gray-700">Collection Method</label>
                  </div>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="collectionMethod"
                        value="pickup"
                        checked={formData.collectionMethod === 'pickup'}
                        onChange={(e) => setFormData({ ...formData, collectionMethod: e.target.value })}
                        className="text-emerald-600 focus:ring-emerald-600"
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
                        className="text-emerald-600 focus:ring-emerald-600"
                      />
                      <span>Drop Off</span>
                    </label>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Submit Request
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
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