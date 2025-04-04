import React, { useState, useEffect } from 'react';
import { Mail, Package, Scale, Truck, Clock, AlertCircle, Calendar, MapPin, User, Triangle } from 'lucide-react';
import Navbar from './Navbar';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'; // Adjust the import path based on your project structure

function UserViewTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fixed email for now - will be replaced with dynamic auth user email later
  const userEmail = localStorage.getItem('email');


  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "No date available";
    
    // Check if the timestamp is a Firestore timestamp object
    if (timestamp.seconds && timestamp.nanoseconds) {
      try {
        // Convert Firestore timestamp to JavaScript Date
        const date = new Date(timestamp.seconds * 1000);
        return date.toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      } catch (err) {
        console.error("Error formatting timestamp:", err);
        return "Invalid date";
      }
    }
    
    // If it's already a string, just return it
    return timestamp.toString();
  };


  useEffect(() => {
    async function fetchUserTransactions() {
      try {
        setLoading(true);
        
        // Create a query against the "UserUploadTrash" collection
        const q = query(
          collection(db, "UserUploadTrash"), 
          where("email", "==", userEmail)
        );
        
        const querySnapshot = await getDocs(q);
        const fetchedTransactions = [];
        
        querySnapshot.forEach((doc) => {
          fetchedTransactions.push({
            id: doc.id,
            ...doc.data()
          });
        });

        
        setTransactions(fetchedTransactions);
        setError(null);
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError("Failed to load your transactions. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    
    fetchUserTransactions();
  }, [userEmail]);

  const getStatusBadgeColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
      case 'complete':
      case 'completed':
        return 'bg-emerald-100 text-emerald-800';
      case 'rejected':
      case 'cancelled':
      case 'incomplete':
        return 'bg-red-100 text-red-800';
      case 'pending':
      case 'processing':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getWasteCategoryIcon = (category) => {
    if (category?.toLowerCase() === 'hazardous') {
      return <Triangle className="w-5 h-5 text-red-500" />;
    }
    return <Package className="w-5 h-5 text-emerald-600" />;
  };

  return (
    <div className="min-h-screen bg-green-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-emerald-800">My Waste Transactions</h1>
          <p className="text-gray-600 mt-2">
            Track the status of all your waste disposal requests
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-emerald-600 border-r-2"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
            <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
            <span className="text-red-700">{error}</span>
          </div>
        ) : transactions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
              <Package className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No transactions found</h3>
            <p className="text-gray-600">
              You haven't submitted any waste disposal requests yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {transactions.map((transaction) => (
              <div 
                key={transaction.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-emerald-500 hover:shadow-lg transition-shadow duration-200"
              >
                {transaction.imageUrl && (
                  <div className="relative h-48 bg-gray-100">
                    <img 
                      src={transaction.imageUrl} 
                      alt="Waste image" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/api/placeholder/400/250";
                        e.target.alt = "Image not available";
                      }}
                    />
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div className="flex items-center space-x-3 mb-3 md:mb-0">
                      <div className={`p-2 rounded-full ${transaction.wasteCategory?.toLowerCase() === 'hazardous' ? 'bg-red-100' : 'bg-emerald-100'}`}>
                        {getWasteCategoryIcon(transaction.wasteCategory)}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">
                          {transaction.wasteType || "Unknown Waste Type"}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="font-medium">{transaction.wasteCategory || "General"}</span>
                          {transaction.wasteCategory?.toLowerCase() === 'hazardous' && (
                            <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-800 rounded-full text-xs">
                              Hazardous
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <span 
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(transaction.status)}`}
                      >
                        {transaction.status ? 
                          transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1) : 
                          "Unknown Status"
                        }
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    {transaction.name && (
                      <div className="flex items-center space-x-2">
                        <User className="w-5 h-5 text-emerald-600" />
                        <div>
                          <p className="text-xs text-gray-500">Contact Name</p>
                          <p className="text-gray-700">{transaction.name}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2">
                      <Mail className="w-5 h-5 text-emerald-600" />
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="text-gray-700">{transaction.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Scale className="w-5 h-5 text-emerald-600" />
                      <div>
                        <p className="text-xs text-gray-500">Weight (kg)</p>
                        <p className="text-gray-700">{transaction.weight || "Not specified"}</p>
                      </div>
                    </div>
                    
                    {transaction.method && (
                      <div className="flex items-center space-x-2">
                        <Truck className="w-5 h-5 text-emerald-600" />
                        <div>
                          <p className="text-xs text-gray-500">Collection Method</p>
                          <p className="text-gray-700 capitalize">{transaction.method}</p>
                        </div>
                      </div>
                    )}
                    
                    {transaction.location && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-5 h-5 text-emerald-600" />
                        <div>
                          <p className="text-xs text-gray-500">Location</p>
                          <p className="text-gray-700">{transaction.location}</p>
                        </div>
                      </div>
                    )}
                    
                    {transaction.timestamp && (
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-5 h-5 text-emerald-600" />
                        <div>
                          <p className="text-xs text-gray-500">Timestamp</p>
                          <p className="text-gray-700">{formatTimestamp(transaction.timestamp)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {transaction.status?.toLowerCase() === 'pending' && (
                    <div className="flex items-center justify-center space-x-2 mt-4 py-2 bg-amber-50 rounded-lg border border-amber-100">
                      <Clock className="w-5 h-5 text-amber-600" />
                      <span className="text-amber-700 font-medium">
                        Awaiting Response - We'll update you soon
                      </span>
                    </div>
                  )}
                  
                  {transaction.status?.toLowerCase() === 'approved' && (
                    <div className="flex items-center justify-center space-x-2 mt-4 py-2 bg-emerald-50 rounded-lg border border-emerald-100">
                      <Clock className="w-5 h-5 text-emerald-600" />
                      <span className="text-emerald-700 font-medium">
                        Your request has been approved
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserViewTransactions;