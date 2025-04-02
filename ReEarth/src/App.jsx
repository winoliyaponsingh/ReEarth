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



const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/admin-home" element={<AdminHomePage />} />
          <Route path="/join-us" element={<JoinUs />} />
          <Route path="/waste-analyser" element={<ImageAnalyzer />} />
          <Route path="/view-vendors" element={<ViewVendors />} />
          <Route path="/view-trash" element={<ViewTrash />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;

//rgb(13,184,117)-green
//rgb(115,124,228)-blue
