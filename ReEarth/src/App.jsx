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



const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;

//rgb(13,184,117)-green
//rgb(115,124,228)-blue
