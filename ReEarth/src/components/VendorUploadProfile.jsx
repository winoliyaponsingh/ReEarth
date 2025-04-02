import React, { useState } from 'react';
import { Building2, MapPin, Leaf, Mail, CheckCircle } from 'lucide-react';
import Navbar from './Navbar';

export function VendorUploadProfile() {
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    wasteTypes: [],
    location: '',
    email: '',
    phone: '',
    description: '',
    collectionMethod: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          businessName: '',
          businessType: '',
          wasteTypes: [],
          location: '',
          email: '',
          phone: '',
          description: '',
          collectionMethod: ''
        });
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Panel - Info Section */}
            <div className="w-full lg:w-1/3 bg-gradient-to-br from-lime-50 to-emerald-100 p-6 lg:p-8">
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-emerald-600">
                  Re<span className="text-emerald-500">Earth</span>
                </h1>
                <p className="mt-4 text-gray-700 font-medium">
                  Join our network of sustainable waste management partners!
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm">
                  <div className="flex items-center mb-3">
                    <Leaf className="h-5 w-5 text-emerald-600 mr-2" />
                    <h3 className="font-semibold text-gray-800">Why Join ReEarth?</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    As a ReEarth vendor, you'll connect with environmentally conscious users
                    and contribute to sustainable waste management in your community.
                  </p>
                </div>
                
                <div className="p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2" />
                    <h3 className="font-semibold text-gray-800">Benefits</h3>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-emerald-500 mt-1.5 mr-2"></span>
                      Increased visibility to eco-conscious customers
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-emerald-500 mt-1.5 mr-2"></span>
                      Streamlined waste collection management
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-emerald-500 mt-1.5 mr-2"></span>
                      Be part of the solution for a greener planet
                    </li>
                  </ul>
                </div>
                
                <div className="relative mt-4 rounded-xl overflow-hidden h-44 bg-white/30">
                  <div className="flex flex-col items-center justify-center h-full text-emerald-800 p-4 text-center">
                    <Building2 className="h-8 w-8 mb-3 text-emerald-600" />
                    <h3 className="font-semibold">Become a Verified Vendor</h3>
                    <p className="text-sm mt-2">Complete your profile to get started today</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Panel - Form Section */}
            <div className="w-full lg:w-2/3 bg-white p-6 lg:p-8">
              {submitSuccess ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
                    <p className="text-gray-600">Thank you for joining ReEarth as a vendor partner.</p>
                    <p className="text-gray-600 mt-2">Our team will review your application and get in touch soon.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Vendor Registration</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Business Name Field */}
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-medium mb-1 text-sm">Business Name</label>
                      <div className="relative">
                        <input
                          type="text"
                          className="w-full px-4 py-2 pl-10 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          value={formData.businessName}
                          onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                          placeholder="Your Business Name"
                          required
                        />
                        <Building2 className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                      </div>
                    </div>
                    
                    {/* Business Type Field */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-1 text-sm">Business Type</label>
                      <select
                        className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        value={formData.businessType}
                        onChange={(e) => setFormData({...formData, businessType: e.target.value})}
                        required
                      >
                        <option value="">Select Business Type</option>
                        <option value="recycling">Recycling Facility</option>
                        <option value="collection">Waste Collection Center</option>
                        <option value="hazardous">Hazardous Waste Handler</option>
                        <option value="composting">Composting Facility</option>
                        <option value="upcycling">Upcycling Business</option>
                        <option value="repair">Repair & Refurbishment</option>
                      </select>
                    </div>
                    
                    {/* Email Field */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-1 text-sm">Email</label>
                      <div className="relative">
                        <input
                          type="email"
                          className="w-full px-4 py-2 pl-10 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="contact@business.com"
                          required
                        />
                        <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                      </div>
                    </div>
                    
                    {/* Phone Field */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-1 text-sm">Phone Number</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="(123) 456-7890"
                      />
                    </div>
                    
                    {/* Location Field */}
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-medium mb-1 text-sm">Business Location</label>
                      <div className="relative">
                        <input
                          type="text"
                          className="w-full px-4 py-2 pl-10 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          value={formData.location}
                          onChange={(e) => setFormData({...formData, location: e.target.value})}
                          placeholder="Full address of your business"
                          required
                        />
                        <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Waste Types Accepted Field */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-1 text-sm">Waste Types Accepted</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      {['plastic', 'glass', 'e-waste', 'organic', 'paper'].map((type) => (
                        <label key={type} className="flex items-center py-1">
                          <input
                            type="checkbox"
                            checked={formData.wasteTypes.includes(type)}
                            onChange={() => handleWasteTypeChange(type)}
                            className="mr-2 text-emerald-600 focus:ring-emerald-500"
                          />
                          <span className="capitalize text-gray-700">{type}</span>
                        </label>
                      ))}
                      <label className="flex items-center py-1 md:col-span-3 border-t border-gray-200 mt-2 pt-2">
                        <input
                          type="checkbox"
                          checked={formData.wasteTypes.length === 5}
                          onChange={() => handleWasteTypeChange('all')}
                          className="mr-2 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-gray-700 font-medium">All of the above</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Business Description Field */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-1 text-sm">Business Description</label>
                    <textarea
                      className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Tell us about your business and services..."
                      rows={3}
                    />
                  </div>
                  
                  {/* Collection Method Field */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-1 text-sm">Collection Method</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['pickup', 'dropoff', 'both'].map((method) => (
                        <label key={method} className={`flex items-center p-3 rounded-lg cursor-pointer border border-gray-200 transition-colors ${formData.collectionMethod === method ? 'bg-emerald-50 border-emerald-200' : 'hover:bg-gray-50'}`}>
                          <input
                            type="radio"
                            name="method"
                            value={method}
                            checked={formData.collectionMethod === method}
                            onChange={(e) => setFormData({...formData, collectionMethod: e.target.value})}
                            className="mr-2 text-emerald-600 focus:ring-emerald-500"
                          />
                          <span className="capitalize text-gray-700">{method}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-emerald-600 text-white font-medium py-3 rounded-lg hover:bg-emerald-700 transition-colors ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Registering...' : 'Register as Vendor'}
                  </button>
                  
                  <p className="text-xs text-gray-500 text-center mt-4">
                    By registering, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}