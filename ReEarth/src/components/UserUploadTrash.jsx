import React, { useState } from 'react';
import { Upload, MapPin } from 'lucide-react';
import Navbar from './Navbar';

export function UserUploadTrash() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    wasteType: '',
    wasteCategory: '',
    weight: '',
    image: null,
    location: '',
    method: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
  <>
  <Navbar/>
    <div className="min-h-screen bg-gradient-to-br   p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Panel */}
          <div className="p-8 bg-lime-100">
            <div className="mb-8">
              <h1 className="text-5xl font-bold text-[rgb(13,184,117)]">ReEarth.</h1>
              <p className="mt-4 text-gray-700">Together, Let's ReEarth for a Greener Tomorrow!</p>
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
              <h2 className="text-3xl font-bold text-white mb-6">Upload Waste</h2>

              <div>
                <label className="block text-white font-semibold mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-xl bg-lime-100 border-0 focus:ring-2 focus:ring-white"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-semibold mb-2">Waste Type</label>
                  <select
                    className="w-full px-4 py-2 rounded-xl bg-lime-100 border-0 focus:ring-2 focus:ring-white"
                    value={formData.wasteType}
                    onChange={(e) => setFormData({...formData, wasteType: e.target.value})}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="plastic">Plastic</option>
                    <option value="metal">Metal</option>
                    <option value="paper">Paper</option>
                    <option value="organic">Organic</option>
                    <option value="e-waste">E-Waste</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Category</label>
                  <select
                    className="w-full px-4 py-2 rounded-xl bg-lime-100 border-0 focus:ring-2 focus:ring-white"
                    value={formData.wasteCategory}
                    onChange={(e) => setFormData({...formData, wasteCategory: e.target.value})}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="recyclable">Recyclable</option>
                    <option value="hazardous">Hazardous</option>
                    <option value="general">General Waste</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Weight (kg)</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 rounded-xl bg-lime-100 border-0 focus:ring-2 focus:ring-white"
                  value={formData.weight}
                  onChange={(e) => setFormData({...formData, weight: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Upload Image</label>
                <div className="relative">
                  <input
                    type="file"
                    className="hidden"
                    id="waste-image"
                    accept="image/*"
                    onChange={(e) => setFormData({...formData, image: e.target.files?.[0] || null})}
                  />
                  <label
                    htmlFor="waste-image"
                    className="flex items-center justify-center w-full px-4 py-2 rounded-xl bg-lime-100 cursor-pointer hover:bg-lime-200 transition-colors"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Choose Image
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
                    placeholder="Enter your location"
                    required
                  />
                  <MapPin className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Collection Method</label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center bg-lime-100 p-3 rounded-xl cursor-pointer hover:bg-lime-200">
                    <input
                      type="radio"
                      name="method"
                      value="pickup"
                      checked={formData.method === 'pickup'}
                      onChange={(e) => setFormData({...formData, method: e.target.value})}
                      className="mr-2"
                    />
                    Pick Up
                  </label>
                  <label className="flex items-center bg-lime-100 p-3 rounded-xl cursor-pointer hover:bg-lime-200">
                    <input
                      type="radio"
                      name="method"
                      value="dropoff"
                      checked={formData.method === 'dropoff'}
                      onChange={(e) => setFormData({...formData, method: e.target.value})}
                      className="mr-2"
                    />
                    Drop Off
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </div></>
  );
}