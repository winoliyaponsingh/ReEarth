import React, { useState, useEffect } from 'react';
import { Award, Download, Leaf, TreePine, AlertCircle, Building } from 'lucide-react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'; // Adjust this import based on your firebase config
import jsPDF from 'jspdf';
import Navbar from './Navbar';

export default function VendorRewards({ 
  title = "Certificate of Partnership",
  subtitle = "for Environmental Contribution",
  message = "Thank you for your dedication to environmental sustainability",
  metricLabel = "Total Waste Collected",
  metricUnit = "kg",
  downloadLabel = "Download Certificate"
}) {
  const [vendorData, setVendorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [vendorEmail, setVendorEmail] = useState('');

  useEffect(() => {
    // Get vendor email from localStorage
    const email = localStorage.getItem('email');
    if (email) {
      setVendorEmail(email);
    } else {
      setError("Vendor email not found in local storage");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Only fetch data if we have a valid email
    if (!vendorEmail) return;

    const fetchVendorRewards = async () => {
      try {
        setLoading(true);
        console.log(vendorEmail);
        // Create a query against the VendorRewards collection for the specific email
        const q = query(collection(db, "Rewards"), where("email", "==", vendorEmail));
        
        // Execute the query
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          setError("No rewards data found for this vendor");
        } else {
          // We're assuming email is unique and taking the first match
          const doc = querySnapshot.docs[0];
          console.log(doc.data());
          setVendorData({ 
            id: doc.id, 
            ...doc.data() 
          });
        }
      } catch (err) {
        console.error("Error fetching vendor rewards:", err);
        setError("Failed to load vendor rewards data");
      } finally {
        setLoading(false);
      }
    };

    fetchVendorRewards();
  }, [vendorEmail]);



  console.log(vendorData);
  const handleDownload = () => {
    if (!vendorData || !vendorData.isActive) return;
    
    // Create a new PDF document
    const doc = new jsPDF();
    
    // Set font and text color
    doc.setFont("helvetica", "bold");
    doc.setTextColor(39, 124, 60);
    
    // Add title
    doc.setFontSize(24);
    doc.text(title, 105, 30, { align: "center" });
    
    // Add subtitle
    doc.setFontSize(16);
    doc.text(subtitle, 105, 40, { align: "center" });
    
    // Add certificate ID
    doc.setFontSize(12);
    doc.text(`Certificate ID: ${generateRandomString()}`, 105, 55, { align: "center" });
    
    // Add vendor name
    doc.setFontSize(18);
    doc.setTextColor(39, 124, 60);
    doc.text(`Partner: ${vendorData.email || "ReEarth Partner"}`, 105, 70, { align: "center" });
    
    // Add message
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(14);
    doc.text(vendorData.message || message, 105, 85, { align: "center" });
    
    // Add total collection information
    doc.setFont("helvetica", "bold");
    doc.setTextColor(39, 124, 60);
    doc.setFontSize(18);
    doc.text(`${metricLabel}: ${vendorData.weight || 0} ${metricUnit}`, 105, 100, { align: "center" });
    
    
    // Add issuer information
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Issued by ReEarth Rewards", 105, 130, { align: "center" });
    doc.text(new Date().toLocaleDateString(), 105, 140, { align: "center" });
    
    // Save the PDF
    doc.save(`ReEarthRewards_Vendor_Certificate_${vendorData.id || 'certificate'}.pdf`);
  };

  // Generate a random string for certificate ID if needed
  function generateRandomString(length = 8) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      randomString += charset[randomIndex];
    }
    
    return randomString;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex justify-center items-center">
        {loading ? (
          <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 m-5 flex justify-center">
            <p className="text-gray-600">Loading your partner rewards...</p>
          </div>
        ) : error ? (
          <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 m-5">
            <div className="flex items-center justify-center space-x-2 text-red-600">
              <AlertCircle size={32} />
              <h1 className="text-xl font-semibold">{error}</h1>
            </div>
          </div>
        ) : vendorData && vendorData.giveReward ? (
          <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 space-y-6 m-5">
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <Building size={32} />
              <h1 className="text-3xl font-bold">{vendorData.name || "ReEarth Partner"}</h1>
            </div>
            
            <div className="text-center space-y-2">
              <Award className="w-16 h-16 mx-auto text-green-500" />
              <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
              <p className="text-gray-600">{subtitle}</p>
            </div>
            
            <div className="bg-green-50 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-green-200 pb-4">
                <span className="text-gray-600">{metricLabel}</span>
                <span className="text-2xl font-bold text-green-700">{vendorData.weight || 0} {metricUnit}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Certificate ID</span>
                <span className="text-green-700 font-mono">{generateRandomString()}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-2">
              <Leaf className="text-green-500" />
              <p className="text-sm text-gray-600">{vendorData.text || message}</p>
            </div>
            
            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 w-full"
            >
              <Download size={20} />
              {downloadLabel}
            </button>
          </div>
        ) : (
          <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 space-y-6 m-5">
            <div className="flex items-center justify-center space-x-2 text-yellow-600">
              <AlertCircle size={32} />
              <h1 className="text-2xl font-semibold">No Partner Rewards Available</h1>
            </div>
            
            <div className="text-center p-4">
              <p className="text-gray-600">
                Your partnership status is currently inactive or no rewards data is available. Please contact support for more information.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}