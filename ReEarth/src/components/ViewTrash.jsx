import React, { useState, useEffect } from 'react';
import { User, Mail, Recycle, Weight, MapPin, Truck, Image as ImageIcon, Building2, X, Filter, Check, X as XIcon } from 'lucide-react';
import Navbar from './Navbar';
import { collection, getDocs, doc, updateDoc, getFirestore } from 'firebase/firestore';

function ViewTrash() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    businessEmail: '',
    wasteType: '',
    wasteWeight: 0,
    collectionMethod: 'pickup',
  });
  const [wasteItems, setWasteItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateMessage, setUpdateMessage] = useState('');

  // Initialize Firestore
  const db = getFirestore();

  // Fetch waste data from Firestore
  useEffect(() => {
    const fetchWasteData = async () => {
      try {
        setLoading(true);
        const wasteCollection = collection(db, "UserUploadTrash");
        const wasteSnapshot = await getDocs(wasteCollection);
        const wasteList = wasteSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setWasteItems(wasteList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching waste data:", error);
        setLoading(false);
      }
    };

    fetchWasteData();
  }, []);

  // console.log(localStorage.getItem('email'));

  const handleUpdateStatus = async (itemId, newStatus) => {
    try {
      const wasteDocRef = doc(db, "UserUploadTrash", itemId);
      await updateDoc(wasteDocRef, {
        status: newStatus,
        vendorEmail: localStorage.getItem('email')
      });
      
      // Update local state to reflect the change
      setWasteItems(prevItems => 
        prevItems.map(item => 
          item.id === itemId ? { ...item, status: newStatus } : item
        )
      );

      // Show success message
      setUpdateMessage(`Waste request ${newStatus}`);
      setTimeout(() => setUpdateMessage(''), 3000);
    } catch (error) {
      console.error("Error updating status:", error);
      setUpdateMessage('Failed to update status. Please try again.');
      setTimeout(() => setUpdateMessage(''), 3000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    alert('Request submitted successfully!');
    setShowForm(false);
  };

  // Function to get waste category color
  const getCategoryColor = (category) => {
    if (!category) return 'bg-teal-600';
    
    switch (category.toLowerCase()) {
      case 'recyclable': return 'bg-emerald-600';
      case 'compostable': return 'bg-green-600';
      case 'hazardous': return 'bg-amber-600';
      default: return 'bg-teal-600';
    }
  };

  // Function to get status badge color
  const getStatusColor = (status) => {
    if (!status) return 'bg-gray-500';
    
    switch (status.toLowerCase()) {
      case 'approved': return 'bg-green-600';
      case 'rejected': return 'bg-red-600';
      case 'pending': return 'bg-yellow-600';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-green-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-emerald-800">Available Waste Collection</h1>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow border border-emerald-100">
              <Filter className="w-4 h-4 text-emerald-600" />
              <span className="text-sm">Filter</span>
            </button>
          </div>
        </div>

        {/* Status update message */}
        {updateMessage && (
          <div className="mb-4 p-3 bg-emerald-100 text-emerald-800 rounded-md">
            {updateMessage}
          </div>
        )}
        
        {loading ? (
          <div className="text-center py-10">
            <p className="text-emerald-600">Loading waste collection data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {wasteItems.length > 0 ? wasteItems.map((waste) => (
              <div key={waste.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-200 border border-green-100">
                <div className="relative">
                  <img
                    src={waste.imageUrl || "/api/placeholder/400/250"}
                    alt="Waste"
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute top-2 right-2 flex flex-col gap-2">
                    <span className={`px-2 py-1 ${getCategoryColor(waste.wasteCategory)} text-white text-xs font-medium rounded-md`}>
                      {waste.wasteCategory}
                    </span>
                    <span className={`px-2 py-1 ${getStatusColor(waste.status)} text-white text-xs font-medium rounded-md`}>
                      {waste.status || 'Unknown'}
                    </span>
                  </div>
                </div>
                
                <div className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-emerald-600" />
                      <h3 className="font-bold text-gray-800">{waste.name}</h3>
                    </div>
                    <span className="text-sm text-gray-500">{waste.weight} kg</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                    <div className="flex items-center space-x-1.5 text-gray-600">
                      <Recycle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span className="truncate">{waste.wasteType}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1.5 text-gray-600">
                      <Truck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span className="capitalize truncate">{waste.method}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1.5 text-gray-600">
                      <Mail className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span className="truncate text-xs">{waste.email}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1.5 text-gray-600">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span className="truncate text-xs">{waste.location}</span>
                    </div>
                  </div>
                  
                  {waste.status && waste.status.toLowerCase() === 'pending' ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleUpdateStatus(waste.id, 'approved')}
                        className="flex-1 py-2 bg-emerald-600 text-white text-sm rounded-md hover:bg-emerald-700 transition-colors duration-200 flex items-center justify-center space-x-1.5"
                      >
                        <Check className="w-4 h-4" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(waste.id, 'rejected')}
                        className="flex-1 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors duration-200 flex items-center justify-center space-x-1.5"
                      >
                        <XIcon className="w-4 h-4" />
                        <span>Reject</span>
                      </button>
                    </div>
                  ) : (
                    <div className={`py-2 text-white text-sm rounded-md flex items-center justify-center space-x-1.5 ${waste.status && waste.status.toLowerCase() === 'approved' ? 'bg-emerald-600' : 'bg-red-600'}`}>
                      {waste.status && waste.status.toLowerCase() === 'approved' ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Approved</span>
                        </>
                      ) : (
                        <>
                          <XIcon className="w-4 h-4" />
                          <span>Rejected</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500">No waste collection requests found.</p>
              </div>
            )}
          </div>
        )}

        {/* Modal Form - Improved and more compact */}
        {showForm && (
          <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md border-[0.5px]">
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h2 className="text-lg font-bold text-emerald-800">Waste Collection Request</h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-4 space-y-3">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <Building2 className="w-4 h-4 text-emerald-600" />
                    <label className="text-sm font-medium text-gray-700">Business Name</label>
                  </div>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  />
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <Mail className="w-4 h-4 text-emerald-600" />
                    <label className="text-sm font-medium text-gray-700">Business Email</label>
                  </div>
                  <input
                    type="email"
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                    value={formData.businessEmail}
                    onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Recycle className="w-4 h-4 text-emerald-600" />
                      <label className="text-sm font-medium text-gray-700">Type of Waste</label>
                    </div>
                    <select
                      required
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                      value={formData.wasteType}
                      onChange={(e) => setFormData({ ...formData, wasteType: e.target.value })}
                    >
                      <option value="">Select type</option>
                      <option value="Electronic Waste">Electronic</option>
                      <option value="Plastic">Plastic</option>
                      <option value="Paper">Paper</option>
                      <option value="Metal">Metal</option>
                      <option value="Glass">Glass</option>
                      <option value="Organic">Organic</option>
                      <option value="Chemical">Chemical</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Weight className="w-4 h-4 text-emerald-600" />
                      <label className="text-sm font-medium text-gray-700">Weight (kg)</label>
                    </div>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.1"
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                      value={formData.wasteWeight}
                      onChange={(e) => setFormData({ ...formData, wasteWeight: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <Truck className="w-4 h-4 text-emerald-600" />
                    <label className="text-sm font-medium text-gray-700">Collection Method</label>
                  </div>
                  <div className="flex space-x-4 text-sm">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="collectionMethod"
                        value="pickup"
                        checked={formData.collectionMethod === 'pickup'}
                        onChange={(e) => setFormData({ ...formData, collectionMethod: e.target.value })}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>Pick Up</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="collectionMethod"
                        value="dropoff"
                        checked={formData.collectionMethod === 'dropoff'}
                        onChange={(e) => setFormData({ ...formData, collectionMethod: e.target.value })}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>Drop Off</span>
                    </label>
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-600 text-white py-2 px-4 text-sm rounded-md hover:bg-emerald-700 transition-colors"
                  >
                    Submit Request
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 text-sm rounded-md hover:bg-gray-200 transition-colors"
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

export default ViewTrash;