import React, { useState, useRef } from 'react';
import { Building2, MapPin, Mail, Recycle, X } from 'lucide-react';
import Navbar from './Navbar';

export function ViewVendors() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const modalRef = useRef(null);
  const initialFocusRef = useRef(null);


  const vendor = {
    businessName: "EcoRecycle Solutions",
    businessType: "Recycling Center",
    wasteTypes: ["Paper", "Plastic", "Electronics"],
    location: "123 Green Street, Eco City",
    email: "contact@ecorecycle.com",
    collectionMethod: "drop-off"
  };
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    const formData = new FormData(e.currentTarget);
    
    try {
      // Replace this with your actual API call
      // Example: await api.submitWasteRequest(formData);
      console.log('Form submitted with data:', {
        name: formData.get('name'),
        email: formData.get('email'),
        wasteType: formData.get('wasteType'),
        weight: formData.get('weight'),
        photo: formData.get('wastePhoto'),
      });
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setIsModalOpen(false);
      // You might want to show a success message here
    } catch (error) {
      setSubmitError('Failed to submit request. Please try again.');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEscapeKey = (e) => {
    if (e.key === 'Escape') {
      setIsModalOpen(false);
    }
  };

  // Focus trap for the modal
  const handleTabKey = (e) => {
    if (!isModalOpen || !modalRef.current) return;
    
    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey) { // Shift + Tab
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else { // Tab
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  };

  // Handle keyboard events
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') handleEscapeKey(e);
    if (e.key === 'Tab') handleTabKey(e);
  };

  // Close on click outside
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsModalOpen(false);
    }
  };

  return (
    <>
    <Navbar/>
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mx-5 my-5">
        <div className="p-6 bg-lime-100">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <Building2 className="w-6 h-6 text-emerald-500" />
              <h3 className="text-xl font-bold text-gray-800">{vendor.businessName}</h3>
            </div>
            <span className="px-3 py-1 bg-emerald-500 text-white text-sm rounded-full">
              {vendor.businessType}
            </span>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <Recycle className="w-5 h-5 text-emerald-500" />
            <div>
              <p className="font-semibold">Waste Types Accepted:</p>
              <p>{vendor.wasteTypes.join(', ')}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-gray-600">
            <MapPin className="w-5 h-5 text-emerald-500" />
            <span>{vendor.location}</span>
          </div>

          <div className="flex items-center space-x-2 text-gray-600">
            <Mail className="w-5 h-5 text-emerald-500" />
            <span>{vendor.email}</span>
          </div>

          <div className="pt-4 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Collection Method: <span className="font-semibold capitalize">{vendor.collectionMethod}</span>
              </span>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors"
                aria-label={`Send request to ${vendor.businessName}`}
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal with accessibility improvements */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-transparent backdrop-blur-lg bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={handleBackdropClick}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div 
            ref={modalRef}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-6">
              <h2 id="modal-title" className="text-2xl font-bold text-gray-800 mb-4">
                Request to {vendor.businessName}
              </h2>
              
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    ref={initialFocusRef}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="wasteType" className="block text-sm font-medium text-gray-700 mb-1">
                    Type of Waste
                  </label>
                  <select
                    id="wasteType"
                    name="wasteType"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    {vendor.wasteTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                    Waste Weight (kg)
                  </label>
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    min="0.1"
                    step="0.1"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="wastePhoto" className="block text-sm font-medium text-gray-700 mb-1">
                    Waste Photo
                  </label>
                  <input
                    type="file"
                    id="wastePhoto"
                    name="wastePhoto"
                    accept="image/*"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                {submitError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-4 py-2 text-white rounded-xl transition-colors mt-6 ${
                    isSubmitting ? 'bg-emerald-300 cursor-not-allowed' : 'bg-emerald-500 hover:bg-emerald-600'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}