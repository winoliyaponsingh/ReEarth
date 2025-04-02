import React from 'react';
import { Award, Download, Leaf, TreePine } from 'lucide-react';

export function VendorRewards({ 
  certificateData = { weight: "0.0", id: "ECO-0000-0000" },
  vendorName = "EcoRewards",
  title = "Certificate of Achievement",
  subtitle = "for Environmental Contribution",
  message = "Thank you for contributing to a cleaner environment",
  metricLabel = "Waste Collected",
  metricUnit = "kg",
  downloadLabel = "Download Certificate",
  onDownload = () => console.log("Download requested")
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="flex items-center justify-center space-x-2 text-green-600">
          <TreePine size={32} />
          <h1 className="text-3xl font-bold">{vendorName}</h1>
        </div>
        
        <div className="text-center space-y-2">
          <Award className="w-16 h-16 mx-auto text-green-500" />
          <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
          <p className="text-gray-600">{subtitle}</p>
        </div>
        
        <div className="bg-green-50 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-green-200 pb-4">
            <span className="text-gray-600">{metricLabel}</span>
            <span className="text-2xl font-bold text-green-700">{certificateData.weight} {metricUnit}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Certificate ID</span>
            <span className="text-green-700 font-mono">{certificateData.id}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-2">
          <Leaf className="text-green-500" />
          <p className="text-sm text-gray-600">{message}</p>
        </div>
        
        <button
          onClick={onDownload}
          className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 w-full"
        >
          <Download size={20} />
          {downloadLabel}
        </button>
      </div>
    </div>
  );
}