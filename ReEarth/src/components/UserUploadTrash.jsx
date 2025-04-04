import React, { useState } from 'react';
import { Upload, MapPin, Trash2, AlertCircle } from 'lucide-react';
import Navbar from './Navbar';
import { db, storage } from "../../firebase"; // Import your firebase configuration
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export function UserUploadTrash() {


  function generateRandomString(length = 8) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      randomString += charset[randomIndex];
    }
    
    return randomString;
  }


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    wasteType: '',
    wasteCategory: '',
    weight: '',
    image: null,
    location: '',
    method: ''
  });
  
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFormData({...formData, image: file});
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      let downloadURL = null;
      
      // Upload image to Firebase Storage if an image is selected
      if (formData.image) {
        const imageRef = ref(storage, `UserUploadTrash/${generateRandomString()}`);
        await uploadBytes(imageRef, formData.image);
        downloadURL = await getDownloadURL(imageRef);
      }
      
      // Create a new form data object with the image URL
      const wasteData = {
        name: formData.name,
        email: localStorage.getItem('email'),
        wasteType: formData.wasteType,
        wasteCategory: formData.wasteCategory,
        weight: formData.weight,
        location: formData.location,
        method: formData.method,
        imageUrl: downloadURL,
        timestamp: new Date(),
        status: "pending"
      };
      
      // Add data to Firestore
      const wasteCollectionRef = collection(db, "UserUploadTrash");
      await addDoc(wasteCollectionRef, wasteData);
      
      console.log('Form submitted:', wasteData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          name: '',
          email: '',
          wasteType: '',
          wasteCategory: '',
          weight: '',
          image: null,
          location: '',
          method: ''
        });
        setPreviewImage(null);
      }, 3000);
    } catch (error) {
      console.error("Error submitting waste report:", error);
      alert("Failed to submit waste report. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Panel - Info Section */}
            <div className="w-full lg:w-1/3 bg-gradient-to-br from-lime-50 to-emerald-100 p-6 lg:p-8">
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-emerald-600">
                  Re<span className="text-emerald-500">Earth</span>
                </h1>
                <p className="mt-4 text-gray-700 font-medium">
                  Together, Let's ReEarth for a Greener Tomorrow!
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm">
                  <div className="flex items-center mb-3">
                    <Trash2 className="h-5 w-5 text-emerald-600 mr-2" />
                    <h3 className="font-semibold text-gray-800">Why Report Waste?</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    By reporting waste, you help us identify hotspots and allocate resources efficiently. 
                    Your contribution makes a real difference!
                  </p>
                </div>
                
                <div className="p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm">
                  <div className="flex items-center mb-3">
                    <AlertCircle className="h-5 w-5 text-emerald-600 mr-2" />
                    <h3 className="font-semibold text-gray-800">What Happens Next?</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Our team will evaluate your submission and arrange proper disposal
                    based on your preferred collection method.
                  </p>
                </div>
                
                {/* Preview Image */}
                {previewImage ? (
                  <div className="mt-4 relative rounded-xl overflow-hidden h-44 bg-gray-100">
                    <img 
                      src={previewImage}
                      alt="Waste preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="mt-4 relative rounded-xl overflow-hidden h-44 bg-gray-100">
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <span>Image preview will appear here</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Right Panel - Form Section */}
            <div className="w-full lg:w-2/3 bg-white p-6 lg:p-8">
              {submitSuccess ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
                    <p className="text-gray-600">Your waste report has been submitted successfully.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Waste Details</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Name Field */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-1 text-sm">Full Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                        placeholder="John Doe"
                      />
                    </div>
                    
                    {/* Email Field */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-1 text-sm">Email</label>
                      <input
                        type="email"
                        className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        disabled
                        placeholder= {localStorage.getItem('email')}
                      />
                    </div>
                    
                    {/* Waste Type Field */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-1 text-sm">Waste Type</label>
                      <select
                        className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        value={formData.wasteType}
                        onChange={(e) => setFormData({...formData, wasteType: e.target.value})}
                        required
                      >
                        <option value="">Select Type</option>
                        <option value="plastic">Plastic</option>
                        <option value="metal">Metal</option>
                        <option value="paper">Paper</option>
                        <option value="organic">Organic</option>
                        <option value="e-waste">E-Waste</option>
                        <option value="glass">Glass</option>
                        <option value="textile">Textile</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    {/* Category Field */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-1 text-sm">Category</label>
                      <select
                        className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        value={formData.wasteCategory}
                        onChange={(e) => setFormData({...formData, wasteCategory: e.target.value})}
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="recyclable">Recyclable</option>
                        <option value="hazardous">Hazardous</option>
                        <option value="general">General Waste</option>
                        <option value="compostable">Compostable</option>
                      </select>
                    </div>
                    
                    {/* Weight Field */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-1 text-sm">Approximate Weight (kg)</label>
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        value={formData.weight}
                        onChange={(e) => setFormData({...formData, weight: e.target.value})}
                        required
                        placeholder="0.0"
                      />
                    </div>
                    
                    {/* Image Upload Field */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-1 text-sm">Upload Image</label>
                      <div className="relative">
                        <input
                          type="file"
                          className="hidden"
                          id="waste-image"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                        <label
                          htmlFor="waste-image"
                          className="flex items-center justify-center w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
                        >
                          <Upload className="w-4 h-4 mr-2 text-gray-500" />
                          <span className="text-gray-600">{formData.image ? formData.image.name : 'Choose Image'}</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  {/* Location Field */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-1 text-sm">Location</label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full px-4 py-2 pl-10 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        placeholder="Enter your location"
                        required
                      />
                      <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                  
                  {/* Collection Method Field */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-1 text-sm">Collection Method</label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="flex items-center border border-gray-200 p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <input
                          type="radio"
                          name="method"
                          value="pickup"
                          checked={formData.method === 'pickup'}
                          onChange={(e) => setFormData({...formData, method: e.target.value})}
                          className="mr-2 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-gray-700">Pick Up</span>
                      </label>
                      <label className="flex items-center border border-gray-200 p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <input
                          type="radio"
                          name="method"
                          value="dropoff" 
                          checked={formData.method === 'dropoff'}
                          onChange={(e) => setFormData({...formData, method: e.target.value})}
                          className="mr-2 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-gray-700">Drop Off</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-emerald-600 text-white font-medium py-3 rounded-lg hover:bg-emerald-700 transition-colors ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Waste Report'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}