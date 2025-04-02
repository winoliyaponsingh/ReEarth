import React, { useState, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";

const ImageAnalyzer = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Handle file change when user uploads an image
  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "colored",
        transition: Bounce,
      });
      return;
    }

    // Check file size (max 4MB)
    if (file.size > 4 * 1024 * 1024) {
      toast.error("Image size should be less than 4MB", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "colored",
        transition: Bounce,
      });
      return;
    }

    setImage(file);

    // Create a preview URL for the image
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Show success toast
    toast.success("Image uploaded successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      theme: "colored",
      transition: Bounce,
    });

    // Analyze the image with Gemini AI
    await analyzeImage(file);
  };

  // Convert file to base64
  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]); // Extract base64
      reader.onerror = (error) => reject(error);
    });
  };

  // Analyze image using Gemini AI
  const analyzeImage = async (file) => {
    setLoading(true);
    setDescription("");

    try {
      // Convert file to base64 for AI analysis
      const base64Image = await toBase64(file);
      const API_KEY = "AIzaSyDfOtMvSSG6HFNtTAnrx7KOn-MppQKjK9w"; // Use environment variable

      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt =
        "What type of waste is this - please categorize it and tell me how do i recycle/decompose it in my locality.";
      const image = {
        inlineData: {
          data: base64Image,
          mimeType: file.type,
        },
      };

      // Get AI response
      const result = await model.generateContent([prompt, image]);
      const responseText = result.response.text();
      setDescription(responseText);
    } catch (error) {
      console.error("Error analyzing image:", error);
      setDescription("Failed to analyze image. Please try again.");

      toast.error("Error analyzing image", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "colored",
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  // Trigger file input click
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="min-h-screen bg-green-50 ">
      <ToastContainer />
      <Navbar />

      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden my-5 mx-5">
          <div className="p-6 bg-green-700 text-white">
            <h2 className="text-xl font-semibold">
              Upload an image for AI analysis
            </h2>
            <p className="text-green-100">
              Our AI will generate a detailed description of your image
            </p>
          </div>

          {/* Removed fixed height constraint to ensure all content is visible */}
          <div className="p-6">
            {!imagePreview ? (
              <div
                onClick={handleUploadClick}
                className="border-2 border-dashed border-green-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-green-50 transition-colors"
              >
                <svg
                  className="w-16 h-16 text-green-500 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-green-800 font-medium mb-2">
                  Click to upload an image
                </p>
                <p className="text-green-600 text-sm">or drag and drop</p>
                <p className="text-green-500 text-xs mt-2">
                  Images only (MAX. 4MB)
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            ) : (
              <div className="flex flex-col md:flex-row gap-8">
                {/* Image preview */}
                <div className="w-full md:w-1/2">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Uploaded preview"
                        className="rounded-lg object-contain w-full max-h-96"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <p className="text-green-700 text-sm truncate max-w-[70%]">
                        {image?.name}
                      </p>
                      <button
                        onClick={handleUploadClick}
                        className="text-green-700 text-sm hover:text-green-900"
                      >
                        Change image
                      </button>
                    </div>
                  </div>
                </div>

                {/* Description - removed fixed height and made scrollable if needed */}
                <div className="w-full md:w-1/2">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-green-800 font-medium mb-3">
                      AI Description
                    </h3>
                    {loading ? (
                      <div className="flex flex-col items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
                        <p className="mt-4 text-green-700">
                          Analyzing image...
                        </p>
                      </div>
                    ) : description ? (
                      <div className="prose prose-green max-w-none">
                        <p className="text-green-700 whitespace-pre-line max-h-96 overflow-y-auto">
                          {description}
                        </p>
                      </div>
                    ) : (
                      <p className="text-green-500 italic">
                        Description will appear here
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {imagePreview && (
            <div className="px-6 pb-6">
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => {
                    setImage(null);
                    setImagePreview(null);
                    setDescription("");
                  }}
                  className="bg-transparent text-green-700 hover:text-green-900 mr-4"
                >
                  Clear
                </button>
                <button
                  onClick={() => analyzeImage(image)}
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
                  disabled={loading}
                >
                  {loading ? "Analyzing..." : "Re-analyze"}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 text-center text-green-600 text-sm">
          <p>
            Note: All images are processed securely using Google's Gemini AI
            model.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageAnalyzer;