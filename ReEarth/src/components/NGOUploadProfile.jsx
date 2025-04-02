import React, { useState } from 'react';
import { Building2, MapPin, Mail, GraduationCap, Heart, Leaf, Trash2, Users } from 'lucide-react';
import Navbar from './Navbar';

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
  });

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
              <h1 className="text-5xl font-bold text-[rgb(13,184,117)]">NGO Hub.</h1>
              <p className="mt-4 text-gray-700">Join our network of change-makers making a difference in the world!</p>
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b"
                alt="People helping"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Right Panel */}
          <div className="p-8 bg-[rgb(13,184,117)]">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-3xl font-bold text-white mb-6">NGO Profile</h2>

              <div>
                <label className="block text-white font-semibold mb-2">NGO Name</label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-2 pl-10 rounded-xl bg-lime-100 border-0 focus:ring-2 focus:ring-white"
                    value={formData.ngoName}
                    onChange={(e) => setFormData({...formData, ngoName: e.target.value})}
                    required
                  />
                  <Building2 className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">NGO Type</label>
                <select
                  className="w-full px-4 py-2 rounded-xl bg-lime-100 border-0 focus:ring-2 focus:ring-white"
                  value={formData.ngoType}
                  onChange={(e) => setFormData({...formData, ngoType: e.target.value})}
                  required
                >
                  <option value="">Select NGO Type</option>
                  <option value="environment">Environment</option>
                  <option value="health">Health</option>
                  <option value="waste">Waste Management</option>
                  <option value="education">Education</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Location</label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-2 pl-10 rounded-xl bg-lime-100 border-0 focus:ring-2 focus:ring-white"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Enter your NGO location"
                    required
                  />
                  <MapPin className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    className="w-full px-4 py-2 pl-10 rounded-xl bg-lime-100 border-0 focus:ring-2 focus:ring-white"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                  <Mail className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Volunteering Opportunities</label>
                <div className="space-y-2 bg-lime-100 p-4 rounded-xl">
                  {[
                    { label: 'Teaching', icon: GraduationCap },
                    { label: 'Healthcare', icon: Heart },
                    { label: 'Environmental', icon: Leaf },
                    { label: 'Waste Management', icon: Trash2 },
                    { label: 'Community Service', icon: Users }
                  ].map(({ label, icon: Icon }) => (
                    <label key={label} className="flex items-center p-2 hover:bg-lime-200 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.volunteeringOpportunities.includes(label)}
                        onChange={() => handleVolunteeringChange(label)}
                        className="mr-2"
                      />
                      <Icon className="w-5 h-5 mr-2 text-[rgb(13,184,117)]" />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Resource Assistance Needed</label>
                <div className="space-y-2 bg-lime-100 p-4 rounded-xl">
                  {[
                    'Financial Support',
                    'Equipment',
                    'Volunteers',
                    'Training Materials',
                    'Transportation'
                  ].map((resource) => (
                    <label key={resource} className="flex items-center p-2 hover:bg-lime-200 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.resourceNeeds.includes(resource)}
                        onChange={() => handleResourceChange(resource)}
                        className="mr-2"
                      />
                      <span>{resource}</span>
                    </label>
                  ))}
                  <div className="mt-3 pt-3 border-t border-lime-200">
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-xl bg-white border-0 focus:ring-2 focus:ring-[rgb(13,184,117)]"
                      value={formData.customResourceNeed}
                      onChange={(e) => setFormData({...formData, customResourceNeed: e.target.value})}
                      placeholder="Add other resource needs..."
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Volunteer Registration Form Link</label>
                <input
                  type="url"
                  className="w-full px-4 py-2 rounded-xl bg-lime-100 border-0 focus:ring-2 focus:ring-white"
                  value={formData.volunteerFormLink}
                  onChange={(e) => setFormData({...formData, volunteerFormLink: e.target.value})}
                  placeholder="Enter Google Form URL for volunteer registration"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Resource Assistance Form Link</label>
                <input
                  type="url"
                  className="w-full px-4 py-2 rounded-xl bg-lime-100 border-0 focus:ring-2 focus:ring-white"
                  value={formData.resourceFormLink}
                  onChange={(e) => setFormData({...formData, resourceFormLink: e.target.value})}
                  placeholder="Enter Google Form URL for resource assistance"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors"
              >
                Register NGO Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}