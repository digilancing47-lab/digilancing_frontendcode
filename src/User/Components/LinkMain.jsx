import React, { useState } from "react";

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
  <div className="min-h-screen rounded-4xl bg-[#ffffff] overflow-y-auto cursor-default flex flex-col items-center p-3 sm:p-6">
      <div className="relative w-full cursor-default text-white text-center h-[200px] sm:h-[300px] rounded-2xl sm:rounded-4xl mb-3 overflow-hidden">
             <img src='/LinkGenerator.avif' alt="Link Generator Background" className="absolute inset-0 w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a]/70 via-[#3b82f6]/50 to-[#06b6d4]/60" />
             <div className="relative flex flex-col items-center justify-center h-full px-4">
               <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-wide">LINK GENERATOR</h1>
               <p className="text-white/80 text-sm mt-2">Generate and share your referral links</p>
             </div>
           </div>
      <div className="w-full max-w-4xl bg-gradient-to-br from-[#1e3a8a] via-[#2563eb] to-[#06b6d4] p-4 sm:p-6 rounded-2xl shadow-lg relative mt-3 sm:mt-5">
        <h2 className="text-base sm:text-lg font-semibold mb-4 text-white">Affiliate Link Generator</h2>
        <hr className="border-gray-500 mb-4 sm:mb-6" />
        
        {/* Access Code Section */}
        <div className="mb-4 sm:mb-6">
          <label className="block mb-2 font-medium text-white text-sm sm:text-base">My Access code:</label>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <input 
              type="text" 
              value={guide_code} 
              disabled  
              className="flex-1 px-3 py-2 rounded-md text-black bg-white text-sm sm:text-base"
            />
            <button 
              onClick={handleCopyCode} 
              className="bg-white text-black cursor-pointer px-4 py-2 rounded-lg shadow font-semibold text-sm sm:text-base whitespace-nowrap hover:bg-gray-100 transition-colors"
            >
              Share Code
            </button>
          </div>
        </div>
        
        {/* Access Link Section */}
        <div>
          <label className="block mb-2 font-medium text-white text-sm sm:text-base">Access Link:</label>
          
          {/* Package Selection */}
          <div className="mb-3">
            <select
              value={selectedPackage}
              onChange={(e) => setSelectedPackage(e.target.value)}
              className="w-full px-3 py-2 rounded-md text-white bg-white/10 border border-white/20 text-sm sm:text-base"
            >
              <option value="">-- Select package --</option>
              {packages.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Generated Link and Actions */}
          <div className="space-y-3">
            <input
              type="text"
              value={generatedLink}
              readOnly
              placeholder="Generated referral link will appear here"
              className="w-full px-3 py-2 rounded-md text-black bg-white text-sm sm:text-base"
            />

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={generateReferralLink}
                className="flex-1 sm:flex-none bg-white/15 border border-white/20 text-white px-4 py-2 rounded-lg shadow font-semibold text-sm sm:text-base hover:bg-white/25 transition-colors"
              >
                Generate Link
              </button>

              <button
                onClick={handleCopyLink}
                className="flex-1 sm:flex-none bg-white text-black px-4 py-2 rounded-lg shadow font-semibold text-sm sm:text-base hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
            ✅ Access code copied!
          </div>
        )}

        {linkPopup && (
          <div className="absolute top-12 sm:top-16 right-2 sm:right-4 bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg shadow text-xs sm:text-sm z-10">
            ✅ Link copied!
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkGenerator;
