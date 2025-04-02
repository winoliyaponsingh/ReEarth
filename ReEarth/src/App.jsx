import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoTrash } from "react-icons/go";
import HomePage from "./components/HomePage";
import ContactUs from "./components/ContactUs";
import JoinUs from "./components/JoinUs";
import UserHomePage from "./components/UserHomePage";
import VendorHomePage from "./components/VendorHomePage";
import AdminHomePage from "./components/AdminHomePage";
import NGOHomePage from "./components/NGOHomePage";
import { UserUploadTrash } from "./components/UserUploadTrash";
import { VendorUploadProfile } from "./components/VendorUploadProfile";
import { NGOUploadProfile } from "./components/NGOUploadProfile";
import { ViewVendors } from "./components/ViewVendors";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageAnalyzer from "./components/ImageAnalyser";
import ViewTrash from "./components/ViewTrash";
import ViewNGO from "./components/ViewNGO";
import UserViewTransactions from './components/UserViewTransactions'
import VendorViewTransactions from "./components/VendorViewTransactions";
import UserRewards from './components/UserRewards'
import VendorRewards from './components/VendorRewards'
import AdminGiveReward from "./components/AdminGiveReward";




const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/admin-home" element={<AdminHomePage />} />
          <Route path="/ngo-home" element={<NGOHomePage />} />
          <Route path="/vendor-home" element={<VendorHomePage />} />
          <Route path="/join-us" element={<JoinUs />} />
          <Route path="/waste-analyser" element={<ImageAnalyzer />} />
          <Route path="/user-home" element={<UserHomePage />} />
          <Route path="/join-us" element={<JoinUs />} />
          <Route path="/user-view-ngo" element={<ViewNGO />} />
          <Route path="/user-upload-trash" element={<UserUploadTrash />} />
          <Route path="/user-view-vendors" element={<ViewVendors />} />
          <Route path="/vendor-upload-profile" element={<VendorUploadProfile />} />
          <Route path="/vendor-view-trash" element={<ViewTrash />} />
          <Route path="/ngo-upload-profile" element={<NGOUploadProfile />} />
          <Route path="/user-view-transaction" element={<UserViewTransactions />} />
          <Route path="/vendor-view-transactions" element={<VendorViewTransactions />} />
          <Route path="/user-rewards" element={<UserRewards />} />
          <Route path="/vendor-rewards" element={<VendorRewards />} />
          <Route path="/admin-give-rewards" element={<AdminGiveReward />} />



        </Routes>
      </Router>
    </>
  );
};

export default App;

//rgb(13,184,117)-green
//rgb(115,124,228)-blue
