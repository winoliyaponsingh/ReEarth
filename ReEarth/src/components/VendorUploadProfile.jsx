import React, { useState } from 'react';
import { Building2, MapPin } from 'lucide-react';
import Navbar from './Navbar';

export function VendorUploadProfile() {
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    wasteTypes: [],
    location: '',
    email: '',
    collectionMethod: ''
  });

  const handleWasteTypeChange = (type) => {
    if (type === 'all') {
      setFormData(prev => ({
        ...prev,
        wasteTypes: prev.wasteTypes.length === 5 ? [] : ['plastic', 'glass', 'e-waste', 'organic', 'paper']
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        wasteTypes: prev.wasteTypes.includes(type)
          ? prev.wasteTypes.filter(t => t !== type)
          : [...prev.wasteTypes, type]
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Panel */}
          <div className="p-8 bg-lime-100">
            <div className="mb-8">
              <h1 className="text-5xl font-bold text-[rgb(13,184,117)]">ReEarth.</h1>
              <p className="mt-4 text-gray-700">Join our network of sustainable waste management partners!</p>
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80"
                alt="Environmental"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Right Panel */}
          <div className="p-8 bg-[rgb(13,184,117)]">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-3xl font-bold text-white mb-6">Vendor Profile</h2>

              <div>
                <label className="block text-white font-semibold mb-2">Business Name</label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-2 pl-10 rounded-xl bg-lime-100 border-0 focus:ring-2 focus:ring-white"
                    value={formData.businessName}
                    onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    required
                  />
                  <Building2 className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Business Type</label>
                <select
                  className="w-full px-4 py-2 rounded-xl bg-lime-100 border-0 focus:ring-2 focus:ring-white"
                  value={formData.businessType}
                  onChange={(e) => setFormData({...formData, businessType: e.target.value})}
                  required
                >
                  <option value="">Select Business Type</option>
                  <option value="recycling">Recycling Facility</option>
                  <option value="collection">Waste Collection Center</option>
                  <option value="hazardous">Hazardous Waste Handler</option>
                  <option value="composting">Composting</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Waste Types Accepted</label>
                <div className="space-y-2 bg-lime-100 p-4 rounded-xl">
                  {['plastic', 'glass', 'e-waste', 'organic', 'paper'].map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.wasteTypes.includes(type)}
                        onChange={() => handleWasteTypeChange(type)}
                        className="mr-2"
                      />
                      <span className="capitalize">{type}</span>
                    </label>
                  ))}
                  <label className="flex items-center border-t border-lime-200 pt-2 mt-2">
                    <input
                      type="checkbox"
                      checked={formData.wasteTypes.length === 5}
                      onChange={() => handleWasteTypeChange('all')}
                      className="mr-2"
                    />
                    <span>All of the above</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Location</label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-2 pl-10 rounded-xl bg-lime-100 border-0 focus:ring-2 focus:ring-white"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Enter your business location"
                    required
                  />
                  <MapPin className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-xl bg-lime-100 border-0 focus:ring-2 focus:ring-white"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Collection Method</label>
                <div className="grid grid-cols-3 gap-4">
                  {['pickup', 'dropoff', 'both'].map((method) => (
                    <label key={method} className="flex items-center bg-lime-100 p-3 rounded-xl cursor-pointer hover:bg-lime-200">
                      <input
                        type="radio"
                        name="method"
                        value={method}
                        checked={formData.collectionMethod === method}
                        onChange={(e) => setFormData({...formData, collectionMethod: e.target.value})}
                        className="mr-2"
                      />
                      <span className="capitalize">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors"
              >
                Register as Vendor
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}