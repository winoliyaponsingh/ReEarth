import React, { useState } from 'react';
import { UserCircle2, Building2, Users, Heart } from 'lucide-react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const JoinUs = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('user');
  const navigate = useNavigate();


  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-lime-200 rounded-xl flex">
        {/* Left Panel */}
        <div className="w-1/3 p-8">
          <div className="font-bold text-[rgb(13,184,117)] text-5xl">ReEarth.</div>
          <div className="text-gray-900 text-sm mt-4">
            Join our mission to create a sustainable future. Together, let's ReEarth for a Greener Tomorrow!
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-2/3 bg-[rgb(13,184,117)] rounded-r-xl p-8">
          <div className="mb-8">
            <h2 className="font-bold text-gray-900 text-3xl">
              {isLogin ? 'Welcome Back!' : 'Join ReEarth'}
            </h2>
            <p className="text-gray-900">
              {isLogin ? 'Sign in to continue' : 'Create your account'}
            </p>
          </div>

          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => setRole('user')}
              className={`flex items-center p-4 rounded-xl ${
                role === 'user' ? 'bg-gray-900 text-lime-200' : 'bg-lime-200 text-gray-900'
              }`}
            >
              <UserCircle2 className="mr-2" />
              User
            </button>
            <button
              onClick={() => setRole('admin')}
              className={`flex items-center p-4 rounded-xl ${
                role === 'admin' ? 'bg-gray-900 text-lime-200' : 'bg-lime-200 text-gray-900'
              }`}
            >
              <Building2 className="mr-2" />
              Admin
            </button>
            <button
              onClick={() => setRole('vendor')}
              className={`flex items-center p-4 rounded-xl ${
                role === 'vendor' ? 'bg-gray-900 text-lime-200' : 'bg-lime-200 text-gray-900'
              }`}
            >
              <Users className="mr-2" />
              Vendor
            </button>
            <button
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
          <form className="space-y-4">
            {!isLogin && (
              <div>
                <label className="font-bold text-gray-900 block mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full outline-0 text-gray-900 h-10 px-4 bg-lime-200 rounded-xl"
                  placeholder="Enter your full name"
                />
              </div>
            )}
            
            <div>
              <label className="font-bold text-gray-900 block mb-2">Email Address</label>
              <input
                type="email"
                className="w-full outline-0 text-gray-900 h-10 px-4 bg-lime-200 rounded-xl"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="font-bold text-gray-900 block mb-2">Password</label>
              <input
                type="password"
                className="w-full outline-0 text-gray-900 h-10 px-4 bg-lime-200 rounded-xl"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              onClick={() => {
                if(role == 'user') {
                  navigate('/user-home')
                } else if(role == 'admin'){
                  navigate('/admin-home')
                }
                else if(role == 'ngo'){
                  navigate('/ngo-home')
                }
                else if(role == 'vendor'){
                  navigate('/vendor-home')
                }
              }}
              className="w-full font-bold text-lime-200 bg-gray-900 h-12 rounded-xl cursor-pointer mt-6"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>

            <p className="text-center text-gray-900 mt-4">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="font-bold underline"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default JoinUs;