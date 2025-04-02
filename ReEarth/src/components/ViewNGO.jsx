import React, { useState } from 'react';
import { Building2, Mail, Users, MapPin, Link as LinkIcon, Package, ExternalLink } from 'lucide-react';

function ViewNGO() {
  const [showVolunteerForm, setShowVolunteerForm] = useState(false);
  const [showResourceForm, setShowResourceForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    availability: '',
    skills: '',
    interests: '',
  });

  const sampleNGO = {
    name: "Green Earth Foundation",
    ngoType: "Environmental Conservation",
    location: "456 Earth Avenue, Green City",
    email: "contact@greenearthfoundation.org",
    volunteerOpportunities: [
      "Tree Planting Drive",
      "Beach Cleanup",
      "Environmental Education",
      "Community Outreach"
    ],
    volunteerFormLink: "https://forms.greenearthfoundation.org/volunteer",
    resourcesNeeded: [
      "Gardening Tools",
      "Educational Materials",
      "Office Supplies",
      "Transportation"
    ],
    resourceFormLink: "https://forms.greenearthfoundation.org/donate"
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Request submitted successfully!');
    setShowVolunteerForm(false);
    setShowResourceForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 bg-green-50">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <Building2 className="w-6 h-6 text-green-600" />
                <h3 className="text-xl font-bold text-gray-800">{sampleNGO.name}</h3>
              </div>
              <span className="px-3 py-1 bg-green-600 text-white text-sm rounded-full">
                {sampleNGO.ngoType}
              </span>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="flex items-center space-x-2 text-gray-600">
              <Mail className="w-5 h-5 text-green-600" />
              <span>{sampleNGO.email}</span>
            </div>

            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin className="w-5 h-5 text-green-600" />
              <span>{sampleNGO.location}</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-600">
                <Users className="w-5 h-5 text-green-600" />
                <span className="font-semibold">Volunteer Opportunities</span>
              </div>
              <ul className="list-disc list-inside space-y-1 pl-4">
                {sampleNGO.volunteerOpportunities.map((opportunity, index) => (
                  <li key={index} className="text-gray-600">{opportunity}</li>
                ))}
              </ul>
              <a
                href={sampleNGO.volunteerFormLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 mt-2"
              >
                <LinkIcon className="w-4 h-4" />
                <span>Volunteer Application Form</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-600">
                <Package className="w-5 h-5 text-green-600" />
                <span className="font-semibold">Resources Needed</span>
              </div>
              <ul className="list-disc list-inside space-y-1 pl-4">
                {sampleNGO.resourcesNeeded.map((resource, index) => (
                  <li key={index} className="text-gray-600">{resource}</li>
                ))}
              </ul>
              <a
                href={sampleNGO.resourceFormLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 mt-2"
              >
                <LinkIcon className="w-4 h-4" />
                <span>Resource Donation Form</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Volunteer Form Modal */}
        {showVolunteerForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
              <div className="p-6 bg-green-100 relative">
                <h2 className="text-2xl font-bold text-gray-800">Volunteer Application</h2>
                <button
                  onClick={() => setShowVolunteerForm(false)}
                  className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                >
                  <ExternalLink className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="font-semibold text-gray-700">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-semibold text-gray-700">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-semibold text-gray-700">Availability</label>
                  <select
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  >
                    <option value="">Select availability</option>
                    <option value="weekdays">Weekdays</option>
                    <option value="weekends">Weekends</option>
                    <option value="both">Both</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="font-semibold text-gray-700">Skills</label>
                  <textarea
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    rows={3}
                    placeholder="List your relevant skills..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-semibold text-gray-700">Areas of Interest</label>
                  <textarea
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    value={formData.interests}
                    onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                    rows={3}
                    placeholder="What areas are you interested in volunteering for?"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Submit Application
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowVolunteerForm(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Resource Donation Form Modal */}
        {showResourceForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
              <div className="p-6 bg-green-100 relative">
                <h2 className="text-2xl font-bold text-gray-800">Resource Donation</h2>
                <button
                  onClick={() => setShowResourceForm(false)}
                  className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                >
                  <ExternalLink className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="font-semibold text-gray-700">Resource Type</label>
                  <select
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  >
                    {sampleNGO.resourcesNeeded.map((resource, index) => (
                      <option key={index} value={resource.toLowerCase()}>{resource}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="font-semibold text-gray-700">Quantity</label>
                  <input
                    type="number"
                    required
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-semibold text-gray-700">Condition</label>
                  <select
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  >
                    <option value="new">New</option>
                    <option value="like-new">Like New</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="font-semibold text-gray-700">Additional Notes</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    rows={3}
                    placeholder="Any additional information about the resources..."
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Submit Donation
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowResourceForm(false)}
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

export default ViewNGO;