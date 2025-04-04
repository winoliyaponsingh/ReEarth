import React, { useState, useEffect } from 'react';
import { Building2, Mail, Users, MapPin, Link as LinkIcon, Package, ExternalLink } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'; // Adjust the import path to your Firebase config
import Navbar from './Navbar';

function ViewNGO() {
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNGOs = async () => {
      try {
        setLoading(true);
        const ngoCollectionRef = collection(db, 'NGOProfiles');
        const querySnapshot = await getDocs(ngoCollectionRef);
        
        const ngoData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setNgos(ngoData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching NGO data:", err);
        setError("Failed to load NGO profiles. Please try again later.");
        setLoading(false);
      }
    };

    fetchNGOs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading NGO profiles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Nonprofit Organizations</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover nonprofit organizations that are making a difference. Connect with them to volunteer your time or donate resources.
          </p>
        </div>
        
        {ngos.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md mx-auto">
            <h2 className="text-xl font-medium text-gray-800 mb-2">No NGOs Found</h2>
            <p className="text-gray-600">There are currently no nonprofit organizations in our database.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {ngos.map((ngo) => (
              <div 
                key={ngo.id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="p-6 bg-green-50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Building2 className="w-6 h-6 text-green-600" />
                      <h3 className="text-xl font-bold text-gray-800">{ngo.ngoName}</h3>
                    </div>
                    <span className="px-3 py-1 bg-green-600 text-white text-sm rounded-full font-medium">
                      {ngo.ngoType}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Mail className="w-5 h-5 text-green-600" />
                    <span>{ngo.email}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-5 h-5 text-green-600" />
                    <span>{ngo.location}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Users className="w-5 h-5 text-green-600" />
                      <span className="font-semibold">Volunteer Opportunities</span>
                    </div>
                    <ul className="grid grid-cols-2 gap-2 mt-2">
                      {ngo.volunteeringOpportunities && ngo.volunteeringOpportunities.slice(0, 4).map((opportunity, index) => (
                        <li key={index} className="px-3 py-1 text-sm rounded-full border border-green-200 bg-green-50 text-gray-700">
                          {opportunity}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Package className="w-5 h-5 text-green-600" />
                      <span className="font-semibold">Resources Needed</span>
                    </div>
                    <ul className="grid grid-cols-2 gap-2 mt-2">
                      {ngo.resourceNeeds && ngo.resourceNeeds.slice(0, 4).map((resource, index) => (
                        <li key={index} className="px-3 py-1 text-sm rounded-full border border-green-200 bg-green-50 text-gray-700">
                          {resource}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a 
                      href={ngo.volunteerFormLink}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                    >
                      <Users className="w-4 h-4" />
                      <span>Volunteer</span>
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                    <a 
                      href={ngo.resourceFormLink}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                    >
                      <Package className="w-4 h-4" />
                      <span>Donate</span>
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewNGO;