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

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-green-700">Loading vendor profiles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-green-50 p-6 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md shadow-md">
          <h2 className="text-lg font-semibold text-red-800 mb-2">Error</h2>
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  if (vendorDataList.length === 0) {
    return (
      <div className="min-h-screen bg-green-50 p-6 flex items-center justify-center">
        <div className="bg-green-100 border border-green-200 rounded-lg p-6 max-w-md shadow-md">
          <h2 className="text-lg font-semibold text-green-800 mb-2">No Data</h2>
          <p className="text-green-700">No vendor profiles found for this email.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-green-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-5 py-8">
        <h1 className="text-2xl font-bold text-green-800 mb-2">Vendor Profiles</h1>
        <p className="text-green-700 mb-6">Showing {vendorDataList.length} vendor(s) with email: {vendorEmail}</p>
        
        {/* List of Vendor Profiles */}
        <div className="space-y-6">
          {vendorDataList.map((vendor) => {
            const isPending = vendor.status === "pending";
            const hasRequests = vendor.requests && Object.keys(vendor.requests).length > 0;
            const isVendorExpanded = expandedItems[vendor.id] === true;
            
            return (
              <div key={vendor.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-green-100 hover:shadow-lg transition-shadow duration-300">
                {/* Vendor Header - Always visible */}
                <div 
                  className="p-6 flex items-center justify-between cursor-pointer bg-white border-x-1 border-y-1 rounded-xl border-gray-500"
                  onClick={() => toggleExpand(vendor.id)}
                >
                  <div className="flex items-center space-x-3">
                    <Building2 className="w-6 h-6 text-green-600" />
                    <h2 className="text-xl font-semibold text-green-800">{vendor.businessName}</h2>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(vendor.status)}`}>
                      {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
                    </span>
                    {isVendorExpanded ? (
                      <ChevronUp className="w-5 h-5 text-green-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                </div>
                
                {/* Vendor Details - Shown when expanded */}
                {isVendorExpanded && (
                  <div className="px-6 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="flex items-center space-x-2">
                        <Package className="w-4 h-4 text-green-500" />
                        <span className="text-green-700">{vendor.businessType}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-green-500" />
                        <span className="text-green-700">{vendor.email}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-green-500" />
                        <span className="text-green-700">{vendor.phone}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-green-500" />
                        <span className="text-green-700">{vendor.location}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex items-start space-x-2">
                        <Package className="w-4 h-4 text-green-500 mt-1" />
                        <div>
                          <span className="text-green-700 block mb-1">
                            Collection method: {vendor.collectionMethod || "Not specified"}
                          </span>
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
                    
                    <div className="mt-4 pt-4 border-t border-green-100">
                      <p className="text-green-700">{vendor.description || "No description available"}</p>
                    </div>
                    
                    {/* Requests Section - Only shown when status is approved and requests exist */}
                    {!isPending && hasRequests && (
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold text-green-800 mb-4">Waste Collection Requests</h3>
                        
                        <div className="space-y-4">
                          {Object.entries(vendor.requests).map(([requestId, request]) => {
                            const isRequestExpanded = expandedItems[`${vendor.id}_${requestId}`] === true;
                            
                            return (
                              <div key={requestId} className="bg-green-50 rounded-lg overflow-hidden border border-green-100">
                                <div 
                                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-green-100 transition-colors duration-200"
                                  onClick={() => toggleExpand(vendor.id, requestId)}
                                >
                                  <div className="flex items-center space-x-3">
                                    <div className={`w-3 h-3 rounded-full ${
                                      request.status === 'pending' 
                                        ? 'bg-amber-400' 
                                        : request.status === 'approved' 
                                        ? 'bg-green-500' 
                                        : request.status === 'denied'
                                        ? 'bg-red-400'
                                        : 'bg-gray-400'
                                    }`}></div>
                                    <span className="font-medium text-green-800">{request.name}</span>
                                  </div>
                                  <div className="flex items-center space-x-4">
                                    <span className={`text-sm px-2 py-1 rounded-full ${getStatusColor(request.status)}`}>
                                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                    </span>
                                    <span className="text-sm text-green-600">
                                      {request.requestDate ? new Date(request.requestDate).toLocaleDateString() : 'No date'}
                                    </span>
                                    {isRequestExpanded ? (
                                      <ChevronUp className="w-5 h-5 text-green-500" />
                                    ) : (
                                      <ChevronDown className="w-5 h-5 text-green-500" />
                                    )}
                                  </div>
                                </div>
                                
                                {isRequestExpanded && (
                                  <div className="p-4 pt-0 border-t border-green-200">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                      <div className="flex items-center space-x-2">
                                        <Mail className="w-4 h-4 text-green-500" />
                                        <span className="text-green-700">{request.email}</span>
                                      </div>
                                      
                                      <div className="flex items-center space-x-2">
                                        <Package className="w-4 h-4 text-green-500" />
                                        <span className="text-green-700">Waste type: {request.wasteType}</span>
                                      </div>
                                      
                                      <div className="flex items-center space-x-2">
                                        <Scale className="w-4 h-4 text-green-500" />
                                        <span className="text-green-700">Weight: {request.weight}</span>
                                      </div>
                                      
                                      <div className="flex items-center space-x-2">
                                        <Calendar className="w-4 h-4 text-green-500" />
                                        <span className="text-green-700">
                                          {request.requestDate ? new Date(request.requestDate).toLocaleString() : 'No date available'}
                                        </span>
                                      </div>
                                    </div>
                                    
                                    {request.photoURL && (
                                      <div className="mt-4 flex items-center space-x-2">
                                        <ImageIcon className="w-4 h-4 text-green-500" />
                                        <a 
                                          href={request.photoURL} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="text-green-600 hover:underline"
                                        >
                                          View attached photo
                                        </a>
                                      </div>
                                    )}
                                    
                                    {request.status === 'pending' && (
                                      <div className="mt-4 flex space-x-2">
                                        <button 
                                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-sm"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleRequestAction(vendor.id, requestId, 'accept');
                                          }}
                                        >
                                          Accept Request
                                        </button>
                                        <button 
                                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 shadow-sm"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleRequestAction(vendor.id, requestId, 'deny');
                                          }}
                                        >
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
                      <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-5 h-5 text-amber-500" />
                          <p className="text-amber-700">This vendor profile is pending approval. It will be able to receive requests once approved.</p>
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