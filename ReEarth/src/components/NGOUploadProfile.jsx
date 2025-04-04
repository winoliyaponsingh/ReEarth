import React, { useState } from 'react';
import { Building2, MapPin, Mail, GraduationCap, Heart, Leaf, Trash2, Users, CheckCircle } from 'lucide-react';
import Navbar from './Navbar';

import {  collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';



export function NGOUploadProfile() {
  const [formData, setFormData] = useState({
    ngoName: '',
    ngoType: '',
    location: '',
    email: '',
    volunteeringOpportunities: [],
    resourceNeeds: [],
    volunteerFormLink: '',
    customResourceNeed: '',
    resourceFormLink: '',
    createdAt: new Date(),
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleVolunteeringChange = (opportunity) => {
    setFormData(prev => ({
      ...prev,
      volunteeringOpportunities: prev.volunteeringOpportunities.includes(opportunity)
        ? prev.volunteeringOpportunities.filter(item => item !== opportunity)
        : [...prev.volunteeringOpportunities, opportunity]
    }));
  };

  const handleResourceChange = (resource) => {
    setFormData(prev => ({
      ...prev,
      resourceNeeds: prev.resourceNeeds.includes(resource)
        ? prev.resourceNeeds.filter(item => item !== resource)
        : [...prev.resourceNeeds, resource]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Prepare data for submission
      const dataToSubmit = {
        ...formData,
        // Add customResourceNeed to resourceNeeds array if it's not empty
        resourceNeeds: formData.customResourceNeed 
          ? [...formData.resourceNeeds, formData.customResourceNeed]
          : formData.resourceNeeds,
        createdAt: new Date()
      };
      
      // Remove the customResourceNeed field since we've incorporated it into resourceNeeds
      delete dataToSubmit.customResourceNeed;
      
      // Add the document to Firestore
      const docRef = await addDoc(collection(db, "NGOProfiles"), dataToSubmit);
      
      console.log("Document written with ID: ", docRef.id);
      setSubmitSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          ngoName: '',
          ngoType: '',
          location: '',
          email: '',
          volunteeringOpportunities: [],
          resourceNeeds: [],
          volunteerFormLink: '',
          customResourceNeed: '',
          resourceFormLink: '',
          createdAt: new Date(),
        });
      }, 3000);
    } catch (error) {
      console.error("Error adding document: ", error);
      setSubmitError("Failed to submit form. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Panel - Info Section */}
            <div className="w-full lg:w-1/3 bg-gradient-to-br from-green-300 to-green-400 p-6 lg:p-8">
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-black">
                  NGO <span className="text-black">Hub</span>
                </h1>
                <p className="mt-4 text-gray-700 font-medium">
                  Join our network of change-makers making a difference in the world!
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm">
                  <div className="flex items-center mb-3">
                    <Heart className="h-5 w-5 text-[rgb(13,184,117)] mr-2" />
                    <h3 className="font-semibold text-gray-800">Why Join NGO Hub?</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    As an NGO Hub partner, you'll connect with dedicated volunteers
                    and receive resources to amplify your impact in the community.
                  </p>
                </div>
                
                <div className="p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="h-5 w-5 text-[rgb(13,184,117)] mr-2" />
                    <h3 className="font-semibold text-gray-800">Benefits</h3>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-[rgb(13,184,117)] mt-1.5 mr-2"></span>
                      Connect with passionate volunteers
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-[rgb(13,184,117)] mt-1.5 mr-2"></span>
                      Access resources to grow your impact
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-[rgb(13,184,117)] mt-1.5 mr-2"></span>
                      Network with like-minded organizations
                    </li>
                  </ul>
                </div>
                
                <div className="relative mt-4 rounded-xl overflow-hidden h-48">
                  <img 
                    src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b"
                    alt="People helping"
                    className="object-cover w-full h-full rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col items-center justify-end p-4 text-center">
                    <h3 className="font-semibold text-white">Make A Difference Today</h3>
                    <p className="text-sm mt-1 text-white/90">Complete your profile to get started</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Panel - Form Section */}
            <div className="w-full lg:w-2/3 bg-white p-6 lg:p-8">
              {submitSuccess ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-[rgb(13,184,117)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
                    <p className="text-gray-600">Thank you for joining NGO Hub as a partner organization.</p>
                    <p className="text-gray-600 mt-2">Our team will review your application and get in touch soon.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">NGO Profile Registration</h2>
                  
                  {submitError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                      {submitError}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* NGO Name Field */}
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-medium mb-1 text-sm">NGO Name</label>
                      <div className="relative">
                        <input
                          type="text"
                          className="w-full px-4 py-2 pl-10 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgb(13,184,117)] focus:border-transparent"
                          value={formData.ngoName}
                          onChange={(e) => setFormData({...formData, ngoName: e.target.value})}
                          placeholder="Your Organization Name"
                          required
                        />
                        <Building2 className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                      </div>
                    </div>
                    
                    {/* NGO Type Field */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-1 text-sm">NGO Type</label>
                      <select
                        className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgb(13,184,117)] focus:border-transparent"
                        value={formData.ngoType}
                        onChange={(e) => setFormData({...formData, ngoType: e.target.value})}
                        required
                      >
                        <option value="">Select NGO Type</option>
                        <option value="environment">Environment</option>
                        <option value="health">Health</option>
                        <option value="waste">Waste Management</option>
                        <option value="education">Education</option>
                        <option value="community">Community Development</option>
                        <option value="animal">Animal Welfare</option>
                      </select>
                    </div>
                    
                    {/* Email Field */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-1 text-sm">Email</label>
                      <div className="relative">
                        <input
                          type="email"
                          className="w-full px-4 py-2 pl-10 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgb(13,184,117)] focus:border-transparent"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="contact@organization.org"
                          required
                        />
                        <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                      </div>
                    </div>
                    
                    {/* Location Field */}
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-medium mb-1 text-sm">Location</label>
                      <div className="relative">
                        <input
                          type="text"
                          className="w-full px-4 py-2 pl-10 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgb(13,184,117)] focus:border-transparent"
                          value={formData.location}
                          onChange={(e) => setFormData({...formData, location: e.target.value})}
                          placeholder="Full address of your organization"
                          required
                        />
                        <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Volunteering Opportunities Field */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-1 text-sm">Volunteering Opportunities</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      {[
                        { label: 'Teaching', icon: GraduationCap },
                        { label: 'Healthcare', icon: Heart },
                        { label: 'Environmental', icon: Leaf },
                        { label: 'Waste Management', icon: Trash2 },
                        { label: 'Community Service', icon: Users }
                      ].map(({ label, icon: Icon }) => (
                        <label key={label} className="flex items-center p-2 hover:bg-lime-50 rounded-lg cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.volunteeringOpportunities.includes(label)}
                            onChange={() => handleVolunteeringChange(label)}
                            className="mr-2 text-[rgb(13,184,117)] focus:ring-[rgb(13,184,117)]"
                          />
                          <Icon className="w-4 h-4 mr-2 text-[rgb(13,184,117)]" />
                          <span className="text-sm">{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Resource Assistance Needed Field */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-1 text-sm">Resource Assistance Needed</label>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          'Financial Support',
                          'Equipment',
                          'Volunteers',
                          'Training Materials',
                          'Transportation'
                        ].map((resource) => (
                          <label key={resource} className="flex items-center p-2 hover:bg-lime-50 rounded-lg cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.resourceNeeds.includes(resource)}
                              onChange={() => handleResourceChange(resource)}
                              className="mr-2 text-[rgb(13,184,117)] focus:ring-[rgb(13,184,117)]"
                            />
                            <span className="text-sm">{resource}</span>
                          </label>
                        ))}
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <input
                          type="text"
                          className="w-full px-4 py-2 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgb(13,184,117)] focus:border-transparent"
                          value={formData.customResourceNeed}
                          onChange={(e) => setFormData({...formData, customResourceNeed: e.target.value})}
                          placeholder="Add other resource needs..."
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Volunteer Registration Form Link */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-1 text-sm">Volunteer Registration Form Link</label>
                      <input
                        type="url"
                        className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgb(13,184,117)] focus:border-transparent"
                        value={formData.volunteerFormLink}
                        onChange={(e) => setFormData({...formData, volunteerFormLink: e.target.value})}
                        placeholder="Google Form URL for volunteers"
                        required
                      />
                    </div>
                    
                    {/* Resource Assistance Form Link */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-1 text-sm">Resource Assistance Form Link</label>
                      <input
                        type="url"
                        className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgb(13,184,117)] focus:border-transparent"
                        value={formData.resourceFormLink}
                        onChange={(e) => setFormData({...formData, resourceFormLink: e.target.value})}
                        placeholder="Google Form URL for resources"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-[rgb(13,184,117)] text-white font-medium py-3 rounded-lg hover:bg-lime-700 transition-colors ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Registering...' : 'Register NGO Profile'}
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