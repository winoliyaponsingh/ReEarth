import React, { useState, useRef, useEffect } from 'react';
import { Building2, MapPin, Mail, Recycle, X, Filter, Search, Leaf, ArrowRight } from 'lucide-react';
import Navbar from './Navbar';

export function ViewVendors() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const modalRef = useRef(null);
  const initialFocusRef = useRef(null);

  // Sample vendor data - in a real app, this would come from an API
  const vendors = [
    {
      id: 1,
      businessName: "EcoRecycle Solutions",
      businessType: "Recycling Center",
      wasteTypes: ["Paper", "Plastic", "Electronics"],
      location: "123 Green Street, Eco City",
      email: "contact@ecorecycle.com",
      collectionMethod: "drop-off",
      rating: 4.8,
      successRate: "96%"
    },
    {
      id: 2,
      businessName: "Green Earth Recyclers",
      businessType: "Waste Management",
      wasteTypes: ["Metal", "Glass", "Organic"],
      location: "456 Sustainability Ave, Green Valley",
      email: "info@greenearth.org",
      collectionMethod: "pickup",
      rating: 4.5,
      successRate: "92%"
    },
    {
      id: 3,
      businessName: "Urban Composters",
      businessType: "Organic Recycling",
      wasteTypes: ["Food Waste", "Garden Waste", "Organic"],
      location: "789 Compost Lane, Urban District",
      email: "hello@urbancomposters.net",
      collectionMethod: "both",
      rating: 4.7,
      successRate: "94%"
    },
    {
      id: 4,
      businessName: "Tech Waste Solutions",
      businessType: "E-Waste",
      wasteTypes: ["Electronics", "Batteries", "Appliances"],
      location: "321 Circuit Road, Tech Park",
      email: "service@techwaste.com",
      collectionMethod: "drop-off",
      rating: 4.9,
      successRate: "97%"
    },
    {
      id: 5,
      businessName: "Paper Recycling Co.",
      businessType: "Paper Processing",
      wasteTypes: ["Paper", "Cardboard", "Magazines"],
      location: "555 Pulp Street, Paper Town",
      email: "recycle@paperco.com",
      collectionMethod: "pickup",
      rating: 4.3,
      successRate: "89%"
    },
    {
      id: 6,
      businessName: "Metal Scrappers Inc.",
      businessType: "Metal Recycling",
      wasteTypes: ["Metal", "Aluminum", "Steel"],
      location: "777 Iron Way, Steel City",
      email: "info@metalscrappers.com",
      collectionMethod: "both",
      rating: 4.6,
      successRate: "93%"
    }
  ];

  // Get all waste types for filter dropdown
  const allWasteTypes = ['All', ...new Set(vendors.flatMap(vendor => vendor.wasteTypes))];

  // Filtered vendors based on search and filter
  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vendor.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'All' || vendor.wasteTypes.includes(filterType);
    return matchesSearch && matchesFilter;
  });

  const openModal = (vendor) => {
    setSelectedVendor(vendor);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    const formData = new FormData(e.currentTarget);
    
    try {
      // Replace this with your actual API call
      console.log('Form submitted with data:', {
        name: formData.get('name'),
        email: formData.get('email'),
        wasteType: formData.get('wasteType'),
        weight: formData.get('weight'),
        photo: formData.get('wastePhoto'),
        vendorId: selectedVendor.id
      });
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setIsModalOpen(false);
      // Add success message toast here in a real implementation
    } catch (error) {
      setSubmitError('Failed to submit request. Please try again.');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isModalOpen && initialFocusRef.current) {
      initialFocusRef.current.focus();
    }
  }, [isModalOpen]);

  // Handle keyboard events for modal
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsModalOpen(false);
    }
    
    if (e.key === 'Tab' && isModalOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      if (e.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  };

  // Close on click outside
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsModalOpen(false);
    }
  };

  // Get collection method badge color
  const getCollectionBadgeColor = (method) => {
    switch (method) {
      case 'pickup': return 'bg-emerald-500';
      case 'drop-off': return 'bg-green-500';
      case 'both': return 'bg-teal-500';
      default: return 'bg-gray-500';
    }
  };

  // Function to get business type color class
  const getBusinessTypeColor = (type) => {
    switch (type) {
      case 'Recycling Center': return 'bg-emerald-100 text-emerald-700';
      case 'Waste Management': return 'bg-green-100 text-green-700';
      case 'Organic Recycling': return 'bg-teal-100 text-teal-700';
      case 'E-Waste': return 'bg-emerald-100 text-emerald-700';
      case 'Paper Processing': return 'bg-green-100 text-green-700';
      case 'Metal Recycling': return 'bg-teal-100 text-teal-700';
      default: return 'bg-green-100 text-green-700';
    }
  };

  return (
    <div className="min-h-screen bg-green-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center sm:items-end mb-3">
            <div className="bg-green-200 p-3 rounded-full mb-2 sm:mb-0 sm:mr-4">
              <Leaf className="text-green-600 w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-green-800">Recycling Vendors</h1>
          </div>
          <p className="text-gray-700 mt-2 max-w-2xl mx-auto sm:mx-0">Connect with trusted recycling vendors to dispose of your waste responsibly and contribute to a greener planet</p>
        </div>
        
        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-green-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-green-500" />
              </div>
              <input
                type="text"
                placeholder="Search vendors by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full border border-green-200 rounded-lg py-3 focus:ring-2 focus:ring-green-400 focus:border-transparent"
              />
            </div>
            
            <div className="md:w-64 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-green-500" />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="pl-10 w-full border border-green-200 rounded-lg py-3 focus:ring-2 focus:ring-green-400 focus:border-transparent appearance-none"
              >
                {allWasteTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        
        {/* Vendor grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map((vendor) => (
            <div 
              key={vendor.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-200 hover:shadow-xl hover:-translate-y-1 border border-green-100"
            >
              <div className="p-5 bg-green-400">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-white p-2 rounded-full shadow-md">
                      <Building2 className="w-6 h-6 text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{vendor.businessName}</h3>
                  </div>
                  <span className={`px-3 py-1 ${getBusinessTypeColor(vendor.businessType)} text-sm font-medium rounded-full`}>
                    {vendor.businessType}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="bg-yellow-50 text-yellow-700 rounded-full px-2 py-1 text-sm font-medium flex items-center border border-yellow-100">
                      <span className="text-yellow-500">★</span> <span className="ml-1">{vendor.rating}</span>
                    </div>
                    <span className="mx-2 text-gray-300">•</span>
                    <div className="text-sm text-gray-500">Success: {vendor.successRate}</div>
                  </div>
                  <span className={`px-3 py-1 ${getCollectionBadgeColor(vendor.collectionMethod)} text-white text-sm rounded-full capitalize`}>
                    {vendor.collectionMethod === 'both' ? 'Pickup & Drop-off' : vendor.collectionMethod}
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 text-gray-700">
                    <div className="mt-1">
                      <Recycle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    </div>
                    <div>
                      <p className="font-medium">Waste Types Accepted:</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {vendor.wasteTypes.map((type) => (
                          <span key={type} className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full border border-green-200">
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 text-gray-700">
                    <MapPin className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{vendor.location}</span>
                  </div>

                  <div className="flex items-center space-x-3 text-gray-700">
                    <Mail className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{vendor.email}</span>
                  </div>

                  <div className="pt-4 mt-2">
                    <button
                      onClick={() => openModal(vendor)}
                      className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-colors flex items-center justify-center shadow-md"
                      aria-label={`Send request to ${vendor.businessName}`}
                    >
                      <span className="font-medium">Send Request</span>
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredVendors.length === 0 && (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center border border-green-100">
            <div className="bg-green-50 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Recycle className="w-10 h-10 text-green-400" />
            </div>
            <p className="text-gray-600 text-lg">No vendors found matching your search criteria</p>
            <button 
              onClick={() => {setSearchTerm(''); setFilterType('All');}}
              className="mt-4 text-green-600 hover:text-green-700 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedVendor && (
        <div 
          className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={handleBackdropClick}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div 
            ref={modalRef}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md relative animate-fadeIn border border-green-200 h-[80%] overflow-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-t-2xl flex items-center px-6">
              <h2 id="modal-title" className="text-xl font-bold text-white flex items-center">
                <Recycle className="w-6 h-6 mr-2" />
                Request to {selectedVendor.businessName}
              </h2>
            </div>
            
            <div className="absolute right-4 top-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-white hover:bg-gray-100 rounded-full p-2 text-gray-500 hover:text-gray-700 transition-colors shadow-md"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-6">Fill out the form to send your recycling request</p>
              
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
                    className="w-full px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
                    placeholder="Enter your full name"
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
                    className="w-full px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="wasteType" className="block text-sm font-medium text-gray-700 mb-1">
                    Type of Waste
                  </label>
                  <div className="relative">
                    <select
                      id="wasteType"
                      name="wasteType"
                      required
                      className="w-full px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent appearance-none"
                    >
                      {selectedVendor.wasteTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
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
                    className="w-full px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
                    placeholder="e.g. 5.5"
                  />
                </div>

                <div>
                  <label htmlFor="wastePhoto" className="block text-sm font-medium text-gray-700 mb-1">
                    Waste Photo
                  </label>
                  <div className="border-2 border-dashed border-green-200 rounded-lg p-4 text-center hover:bg-green-50 transition-colors">
                    <input
                      type="file"
                      id="wastePhoto"
                      name="wastePhoto"
                      accept="image/*"
                      required
                      className="hidden"
                    />
                    <label htmlFor="wastePhoto" className="cursor-pointer">
                      <div className="flex flex-col items-center justify-center">
                        <svg className="w-8 h-8 text-green-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <span className="text-green-600 font-medium">Upload a photo</span>
                        <span className="text-xs text-gray-500 mt-1">Click to browse or drag & drop</span>
                      </div>
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Please upload a clear image of your waste (max 5MB)</p>
                </div>

                {submitError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                    {submitError}
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 text-white rounded-lg transition-colors font-medium shadow-md ${
                      isSubmitting ? 'bg-green-300 cursor-not-allowed' : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
                    }`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                  </button>
                  <p className="text-xs text-center text-gray-500 mt-2">
                    By submitting, you agree to share your contact information with the vendor
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewVendors;