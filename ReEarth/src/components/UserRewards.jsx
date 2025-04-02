import React, { useState } from 'react';
import { Copy, CheckCircle } from 'lucide-react';

export function UserRewards({
  code,
  discount,
  description,
  points,
  validUntil,
  partner,
  onCopy,
  category = "General"
}) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    if (onCopy) {
      onCopy(code);
    } else {
      // Fallback copy functionality
      navigator.clipboard.writeText(code).catch(err => {
        console.error('Failed to copy: ', err);
      });
    }
    
    // Show copied indicator
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Calculate if coupon is expiring soon (within 3 days)
  const isExpiringSoon = () => {
    const today = new Date();
    const expiry = new Date(validUntil);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-emerald-100 hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-2xl font-bold text-emerald-700">{discount}</h2>
            <span className="text-sm px-2 py-1 bg-emerald-100 text-emerald-600 rounded-full">
              {points} points
            </span>
          </div>
          <p className="text-emerald-600">{description}</p>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm text-emerald-500">at {partner}</p>
            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
              {category}
            </span>
          </div>
          {isExpiringSoon() ? (
            <p className="text-xs text-red-500 font-medium mt-1">Expires soon: {validUntil}</p>
          ) : (
            <p className="text-xs text-emerald-400 mt-1">Valid until {validUntil}</p>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 px-4 py-2 rounded-lg transition-colors"
          aria-label="Copy coupon code"
        >
          <span className="font-mono font-medium">{code}</span>
          {copied ? (
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}