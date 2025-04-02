import React, { useState, useEffect } from 'react';
import { Building2, Mail, Phone, MapPin, Package, Scale, Calendar, ChevronDown, ChevronUp, Clock, Image as ImageIcon } from 'lucide-react';
import { collection, getDocs, updateDoc, doc, query, where } from 'firebase/firestore';
import { db } from '../../firebase'; // Ensure you have your firebase config properly imported
import Navbar from './Navbar';

const VendorProfileView = () => {
  const [vendorDataList, setVendorDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});
  
  // The email we want to filter by
  const vendorEmail = "vendor@gmail.com";

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        setLoading(true);
        
        // Query the VendorUploadProfile collection where email matches
        const vendorCollectionRef = collection(db, "VendorUploadProfile");
        const q = query(vendorCollectionRef, where("email", "==", vendorEmail));
        
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          setError("No vendors found with email: " + vendorEmail);
          setLoading(false);
          return;
        }
        
        // Process all matching vendors
        const vendors = querySnapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        }));
        
        setVendorDataList(vendors);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching vendor data:", err);
        setError("Failed to fetch vendor data. Please try again.");
        setLoading(false);
      }
    };

    fetchVendorData();
  }, [vendorEmail]);

  const toggleExpand = (vendorId, requestId = null) => {
    setExpandedItems(prev => {
      const newState = { ...prev };
      
      if (requestId === null) {
        // Toggle vendor expansion
        newState[vendorId] = !prev[vendorId];
      } else {
        // Toggle request expansion within a vendor
        const key = `${vendorId}_${requestId}`;
        newState[key] = !prev[key];
      }
      
      return newState;
    });
  };

  const handleRequestAction = async (vendorId, requestId, action) => {
    try {
      // Find the vendor in our list
      const vendorIndex = vendorDataList.findIndex(v => v.id === vendorId);
      if (vendorIndex === -1) {
        setError("Vendor not found");
        return;
      }
      
      // Create a copy of the current vendor data list
      const updatedVendorList = [...vendorDataList];
      const vendor = updatedVendorList[vendorIndex];
      
      // Update the status of the specific request
      if (vendor.requests && vendor.requests[requestId]) {
        const newStatus = action === 'accept' ? 'approved' : 'denied';
        
        // Reference to the vendor document
        const vendorDocRef = doc(db, "VendorUploadProfile", vendorId);
        
        // Update the request status in Firestore
        await updateDoc(vendorDocRef, {
          [`requests.${requestId}.status`]: newStatus
        });
        
        // Update local state
        vendor.requests[requestId].status = newStatus;
        setVendorDataList(updatedVendorList);
      }
    } catch (err) {
      console.error(`Error ${action === 'accept' ? 'accepting' : 'denying'} request:`, err);
      setError(`Failed to ${action === 'accept' ? 'accept' : 'deny'} request. Please try again.`);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'text-green-700 bg-green-100';
      case 'pending':
        return 'text-amber-600 bg-amber-50';
      case 'denied':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500';
      case 'pending':
        return 'bg-amber-400';
      case 'denied':
        return 'bg-red-400';
      default:
        return 'bg-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-green-700 text-lg font-medium">Loading vendor profiles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6 flex items-center justify-center">
        <div className="bg-white border-l-4 border-red-500 rounded-lg p-8 max-w-md shadow-lg">
          <h2 className="text-xl font-bold text-red-800 mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Error
          </h2>
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  if (vendorDataList.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6 flex items-center justify-center">
        <div className="bg-white border-l-4 border-green-500 rounded-lg p-8 max-w-md shadow-lg">
          <h2 className="text-xl font-bold text-green-800 mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            No Data
          </h2>
          <p className="text-green-700">No vendor profiles found for this email.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl font-bold text-green-800 mb-3">Vendor Profiles</h1>
          <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm">
            <Mail className="w-4 h-4 text-green-600 mr-2" />
            <span className="text-green-700">{vendorEmail}</span>
            <span className="mx-2 text-green-300">•</span>
            <span className="text-green-600 font-medium">{vendorDataList.length} vendor(s)</span>
          </div>
        </div>
        
        {/* List of Vendor Profiles */}
        <div className="space-y-8">
          {vendorDataList.map((vendor) => {
            const isPending = vendor.status === "pending";
            const hasRequests = vendor.requests && Object.keys(vendor.requests).length > 0;
            const isVendorExpanded = expandedItems[vendor.id] === true;
            
            return (
              <div key={vendor.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border-t border-green-100 transition-all duration-300 hover:shadow-xl">
                {/* Vendor Header - Always visible */}
                <div 
                  className={`p-6 cursor-pointer transition-colors duration-200 ${isVendorExpanded ? 'bg-green-50' : 'bg-white hover:bg-green-50'} flex items-center justify-between`}
                  onClick={() => toggleExpand(vendor.id)}
                >
                  <div className="flex items-center">
                    <div className="bg-green-100 p-3 rounded-lg mr-4">
                      <Building2 className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-green-800">{vendor.businessName}</h2>
                      <p className="text-green-600 text-sm">{vendor.businessType}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor(vendor.status)}`}>
                      {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
                    </span>
                    <div className="bg-green-100 p-1.5 rounded-full transition-transform duration-200 transform">
                      {isVendorExpanded ? (
                        <ChevronUp className="w-5 h-5 text-green-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Vendor Details - Shown when expanded */}
                {isVendorExpanded && (
                  <div className="px-6 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      <div className="bg-green-50 rounded-xl p-4">
                        <h3 className="text-green-800 font-semibold mb-3 border-b border-green-100 pb-2">Contact Information</h3>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <Mail className="w-4 h-4 text-green-500" />
                            <span className="text-green-700">{vendor.email}</span>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <Phone className="w-4 h-4 text-green-500" />
                            <span className="text-green-700">{vendor.phone}</span>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <MapPin className="w-4 h-4 text-green-500" />
                            <span className="text-green-700">{vendor.location}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 rounded-xl p-4">
                        <h3 className="text-green-800 font-semibold mb-3 border-b border-green-100 pb-2">Waste Management</h3>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <Package className="w-4 h-4 text-green-500 mt-1" />
                            <span className="text-green-700">
                              Collection method: {vendor.collectionMethod || "Not specified"}
                            </span>
                          </div>
                          
                          <div className="flex items-start space-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <div>
                              <span className="text-green-700 block">
                                Waste types: {Array.isArray(vendor.wasteTypes) 
                                  ? vendor.wasteTypes.join(', ') 
                                  : vendor.wasteTypes 
                                    ? Object.keys(vendor.wasteTypes).join(', ')
                                    : "None specified"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {vendor.description && (
                      <div className="mt-6 bg-white rounded-xl p-4 border border-green-100">
                        <h3 className="text-green-800 font-semibold mb-2">About</h3>
                        <p className="text-green-700 leading-relaxed">{vendor.description}</p>
                      </div>
                    )}
                    
                    {/* Requests Section - Only shown when status is approved and requests exist */}
                    {!isPending && hasRequests && (
                      <div className="mt-8">
                        <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          Waste Collection Requests
                        </h3>
                        
                        <div className="space-y-4">
                          {Object.entries(vendor.requests).map(([requestId, request]) => {
                            const isRequestExpanded = expandedItems[`${vendor.id}_${requestId}`] === true;
                            
                            return (
                              <div key={requestId} className="bg-white rounded-xl overflow-hidden border border-green-100 shadow-sm hover:shadow transition-shadow duration-300">
                                <div 
                                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-green-50 transition-colors duration-200"
                                  onClick={() => toggleExpand(vendor.id, requestId)}
                                >
                                  <div className="flex items-center space-x-3">
                                    <div className={`w-3 h-3 rounded-full ${getStatusBgColor(request.status)}`}></div>
                                    <span className="font-semibold text-green-800">{request.name}</span>
                                  </div>
                                  <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                      <Calendar className="w-4 h-4 text-green-500" />
                                      <span className="text-sm text-green-600">
                                        {request.requestDate ? new Date(request.requestDate).toLocaleDateString() : 'No date'}
                                      </span>
                                    </div>
                                    <span className={`text-sm px-3 py-1 rounded-full font-medium ${getStatusColor(request.status)}`}>
                                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                    </span>
                                    {isRequestExpanded ? (
                                      <ChevronUp className="w-5 h-5 text-green-500" />
                                    ) : (
                                      <ChevronDown className="w-5 h-5 text-green-500" />
                                    )}
                                  </div>
                                </div>
                                
                                {isRequestExpanded && (
                                  <div className="p-5 pt-0 border-t border-green-100 bg-green-50">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                      <div className="bg-white p-3 rounded-lg flex items-center space-x-3">
                                        <Mail className="w-4 h-4 text-green-500" />
                                        <div>
                                          <span className="text-xs text-green-500 block">Email</span>
                                          <span className="text-green-700">{request.email}</span>
                                        </div>
                                      </div>
                                      
                                      <div className="bg-white p-3 rounded-lg flex items-center space-x-3">
                                        <Package className="w-4 h-4 text-green-500" />
                                        <div>
                                          <span className="text-xs text-green-500 block">Waste type</span>
                                          <span className="text-green-700">{request.wasteType}</span>
                                        </div>
                                      </div>
                                      
                                      <div className="bg-white p-3 rounded-lg flex items-center space-x-3">
                                        <Scale className="w-4 h-4 text-green-500" />
                                        <div>
                                          <span className="text-xs text-green-500 block">Weight</span>
                                          <span className="text-green-700">{request.weight}</span>
                                        </div>
                                      </div>
                                      
                                      <div className="bg-white p-3 rounded-lg flex items-center space-x-3">
                                        <Calendar className="w-4 h-4 text-green-500" />
                                        <div>
                                          <span className="text-xs text-green-500 block">Date Requested</span>
                                          <span className="text-green-700">
                                            {request.requestDate ? new Date(request.requestDate).toLocaleString() : 'No date available'}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    {request.photoURL && (
                                      <div className="mt-4 flex items-center bg-white p-3 rounded-lg">
                                        <ImageIcon className="w-4 h-4 text-green-500 mr-3" />
                                        <div>
                                          <span className="text-xs text-green-500 block">Photo</span>
                                          <a 
                                            href={request.photoURL} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-green-600 hover:text-green-800 hover:underline font-medium"
                                          >
                                            View attached photo
                                          </a>
                                        </div>
                                      </div>
                                    )}
                                    
                                    {request.status === 'pending' && (
                                      <div className="mt-6 flex space-x-3">
                                        <button 
                                          className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-sm font-medium flex items-center justify-center"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleRequestAction(vendor.id, requestId, 'accept');
                                          }}
                                        >
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                          </svg>
                                          Accept Request
                                        </button>
                                        <button 
                                          className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 shadow-sm font-medium flex items-center justify-center"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleRequestAction(vendor.id, requestId, 'deny');
                                          }}
                                        >
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                          </svg>
                                          Deny Request
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    
                    {isPending && (
                      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5">
                        <div className="flex items-center">
                          <div className="bg-amber-100 p-2 rounded-lg mr-4">
                            <Clock className="w-5 h-5 text-amber-500" />
                          </div>
                          <div>
                            <h4 className="font-medium text-amber-800 mb-1">Pending Approval</h4>
                            <p className="text-amber-700">This vendor profile is awaiting approval. It will be able to receive requests once approved.</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VendorProfileView;