import React, { useState } from "react";
import { FaBullhorn } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";

const LinkGenerator = () => {
  // example static fallback guide_code if sessionStorage missing
  const user = JSON.parse(sessionStorage.getItem("user") || "null");
  const [guide_code] = useState(user?.guide_code || "197371902102920"); // keep as constant since it's non-editable
  const [selectedPackage, setSelectedPackage] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [popup, setPopup] = useState(false);
  const [linkPopup, setLinkPopup] = useState(false);


  const packages = [
    { id: "DIGI0001", name: "Basic Package" },
    { id: "DIGI0002", name: "Standard Package" },
    { id: "DIGI0003", name: "Advanced Package" },
    { id: "DIGI0004", name: "Premium Package" },
    { id: "DIGI0005", name: "Ultimate Package" }
  ];

  const generateReferralLink = () => {
    if (!selectedPackage) {
      alert("Please select a package first.");
      return;
    }
    const url = `https://www.digilancing.com/ShareReferral/${encodeURIComponent(
      guide_code
    )}?PlanId=${encodeURIComponent(selectedPackage)}`;
    setGeneratedLink(url);
  };

  // Copy Referral Code (guide_code)
  const handleCopyCode = () => {
    navigator.clipboard.writeText(guide_code).then(() => {
      setPopup(true);
      setTimeout(() => setPopup(false), 2000);
    });
  };

  // Copy generated link
  const handleCopyLink = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink).then(() => {
      setLinkPopup(true);
      setTimeout(() => setLinkPopup(false), 2000);
    });
  };

  return (
  <div className="flex-1 bg-white  rounded-3xl backdrop-blur-xl border border-white/10 p-3 relative">
      <div className="relative w-full cursor-default text-white text-center h-[200px] sm:h-[300px] rounded-2xl sm:rounded-4xl mb-3 overflow-hidden">
             <img src='/LinkGenerator.avif' alt="Link Generator Background" className="absolute inset-0 w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a]/70 via-[#3b82f6]/50 to-[#06b6d4]/60" />
             <div className="relative flex flex-col items-center justify-center h-full">
                <div className="w-20 h-20 mx-auto rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center mb-4">
                   <FaBullhorn className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white">Link Generator</h1>
                <p className="text-white/70 mt-2 max-w-md text-sm">
                   Generate and share your referral links
                </p>
              </div>
           </div>

           {/* access code section */}
      <div className="w-full p-4 sm:p-6 rounded-2xl relative">
        <div className="mb-4 sm:mb-6">
         <div className="mb-5">
           <label className="block font-medium text-black  text-[22px]">My Access code</label>
           <p className="text-black/40">Share your unique referral link through social media or send it directly to your contacts</p>
         </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <input 
              type="text" 
              value={guide_code} 
              disabled  
              className="flex-1 px-5 py-4 rounded-2xl font-semibold text-black border border-gray-300 text-sm sm:text-base"
            />
            <button 
              onClick={handleCopyCode} 
              className="bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] text-white cursor-pointer w-full max-w-[150px] py-2 rounded-2xl font-semibold text-sm sm:text-base whitespace-nowrap hover:bg-gray-100 transition-colors"
            >
              Share Code
            </button>
          </div>
        </div>
        
        {/* Access Link Section */}
        <div>
          
          <div className="mb-5">
           <label className="block font-medium text-black  text-[22px]">Access Link</label>
           <p className="text-black/40">Share your unique referral link through social media or send it directly to your contacts</p>
         </div>
          {/* Package Selection */}
          <div className="mb-3 relative">
            <select
              value={selectedPackage}
              onChange={(e) => setSelectedPackage(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl text-black bg-white/10 border border-gray-300 text-sm sm:text-base appearance-none pr-12"
            >
              <option value="">-- Select package --</option>
              {packages.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.name}
                </option>
              ))}
            </select>
            <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-black pointer-events-none text-xl" />
          </div>
          
          {/* Generated Link and Actions */}
          <div className="space-y-3">
            <input
              type="text"
              value={generatedLink}
              readOnly
              placeholder="Generated referral link will appear here"
              className="w-full px-5 py-4  border border-gray-300 rounded-2xl text-black bg-white text-sm sm:text-base"
            />

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={generateReferralLink}
                className="bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] text-white cursor-pointer w-full max-w-[150px] py-2 rounded-2xl font-semibold text-sm sm:text-base whitespace-nowrap hover:bg-gray-100 transition-colors"
            >
                Generate Link
              </button>

              <button
                onClick={handleCopyLink}
                className="flex-1 sm:flex-none bg-gradient-to-r from-[#12ed42] to-[#09d406] text-white cursor-pointer w-full max-w-[150px] py-2 rounded-2xl font-semibold text-sm sm:text-base whitespace-nowrap hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!generatedLink}
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>

        {/* Success Notifications */}
        {popup && (
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg shadow text-xs sm:text-sm z-10">
            Access code copied!
          </div>
        )}

        {linkPopup && (
          <div className="absolute top-12 sm:top-16 right-2 sm:right-4 bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg shadow text-xs sm:text-sm z-10">
            Link copied!
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkGenerator;
