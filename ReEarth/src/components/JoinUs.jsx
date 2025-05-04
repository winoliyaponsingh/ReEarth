import React, { useState } from 'react';
import { UserCircle2, Building2, Users, Heart } from 'lucide-react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase'; // Make sure you have this file with your Firebase configuration
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify'; // Make sure to install react-toastify

const JoinUs = () => {
  const [role, setRole] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Get the collection name based on role
  const getCollectionName = (userRole) => {
    switch (userRole) {
      case 'user': return 'UserLoginDetails';
      case 'admin': return 'AdminLoginDetails';
      case 'vendor': return 'VendorLoginDetails';
      case 'ngo': return 'NGOLoginDetails';
      default: return 'UserLoginDetails';
    }
  };

  // Function to handle navigation based on role
  const navigateToHome = (userRole) => {
    switch (userRole) {
      case 'user': navigate('/user-home'); break;
      case 'admin': navigate('/admin-home'); break;
      case 'vendor': navigate('/vendor-home'); break;
      case 'ngo': navigate('/ngo-home'); break;
      default: navigate('/user-home');
    }
  };

  // Function to store user data in localStorage
  const storeUserData = (userRole, userEmail) => {
    localStorage.setItem('role', userRole);
    localStorage.setItem('email', userEmail);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log(role, email, password);
      const collectionName = getCollectionName(role);

      // First check if user already exists
      const q = query(
        collection(db, collectionName),
        where('email', '==', email)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        // User exists, check password
        const userDoc = querySnapshot.docs[0].data();
        if (userDoc.password === password) {
          // Login successful
          toast.success('Welcome back!');
          storeUserData(role, email);
          navigateToHome(role);
        } else {
          // Wrong password
          toast.error('Invalid password');
        }
      } else {
        // User doesn't exist, create new user
        await addDoc(collection(db, collectionName), {
          email,
          password,
          createdAt: new Date()
        });
        
        toast.success('Account created successfully! Redirecting...');
        storeUserData(role, email);
        // Add 5 second delay before navigation for new accounts
        setTimeout(() => {
          navigateToHome(role);
        }, 5000);
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-lime-200 rounded-xl flex flex-col md:flex-row">
          {/* Left Panel */}
          <div className="w-full md:w-1/3 p-8">
            <div className="font-bold text-[rgb(13,184,117)] text-5xl">ReEarth.</div>
            <div className="text-gray-900 text-sm mt-4">
              Join our mission to create a sustainable future. Together, let's ReEarth for a Greener Tomorrow!
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-full md:w-2/3 bg-[rgb(13,184,117)] rounded-b-xl md:rounded-b-none md:rounded-r-xl p-8">
            <div className="mb-8">
              <h2 className="font-bold text-gray-900 text-3xl">
                Join ReEarth
              </h2>
              <p className="text-gray-900">
                Enter your details to continue
              </p>
            </div>

            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                type="button"
                onClick={() => setRole('user')}
                className={`flex items-center p-4 rounded-xl ${
                  role === 'user' ? 'bg-gray-900 text-lime-200' : 'bg-lime-200 text-gray-900'
                }`}
              >
                <UserCircle2 className="mr-2" />
                User
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`flex items-center p-4 rounded-xl ${
                  role === 'admin' ? 'bg-gray-900 text-lime-200' : 'bg-lime-200 text-gray-900'
                }`}
              >
                <Building2 className="mr-2" />
                Admin
              </button>
              <button
                type="button"
                onClick={() => setRole('vendor')}
                className={`flex items-center p-4 rounded-xl ${
                  role === 'vendor' ? 'bg-gray-900 text-lime-200' : 'bg-lime-200 text-gray-900'
                }`}
              >
                <Users className="mr-2" />
                Vendor
              </button>
              <button
                type="button"
                onClick={() => setRole('ngo')}
                className={`flex items-center p-4 rounded-xl ${
                  role === 'ngo' ? 'bg-gray-900 text-lime-200' : 'bg-lime-200 text-gray-900'
                }`}
              >
                <Heart className="mr-2" />
                NGO
              </button>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              
              
              <div>
                <label className="font-bold text-gray-900 block mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full outline-0 text-gray-900 h-10 px-4 bg-lime-200 rounded-xl"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="font-bold text-gray-900 block mb-2">Password</label>
                <input
                  type="password"
                  className="w-full outline-0 text-gray-900 h-10 px-4 bg-lime-200 rounded-xl"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full font-bold text-lime-200 bg-gray-900 h-12 rounded-xl cursor-pointer mt-6 disabled:opacity-70"
              >
                {isLoading ? 'Please wait...' : 'Join Us'}
              </button>
            </form>
          </div>
        </div>
        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
    </>
  );
};

export default JoinUs;