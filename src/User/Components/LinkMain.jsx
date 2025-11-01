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
  <div className="min-h-screen rounded-4xl bg-[#ffffff] overflow-y-auto cursor-default flex flex-col items-center p-6">
      <div className="relative w-full cursor-default text-[#ffffff] text-center  h-[300px] rounded-4xl mb-3 overflow-hidden">
             <img src='/LinkGenerator.avif' alt="Webinar Background" className="absolute inset-0 w-full h-full object-cover" />
             <div className="relative flex flex-col items-center justify-center h-full">
               <h1 className="text-2xl sm:text-3xl font-bold tracking-wide">LINK GENERATOR</h1>
             </div>
           </div>
      <div className="w-full bg-[#0b3b70] p-6 rounded-2xl shadow-lg relative mt-5">
        <h2 className="text-lg font-semibold mb-4 text-white">Affiliate Link Generator</h2>
        <hr className="border-gray-500 mb-6" />
        <div className="mb-6">
          <label className="block mb-2 font-medium text-white">My Access code:</label>
          <div className="flex gap-3">
            <input type="text" value={guide_code} disabled  className="flex-1 px-3 py-2 rounded-md text-black bg-white"/>
            <button onClick={handleCopyCode} className="bg-white text-black cursor-pointer px-4 py-2 rounded-lg shadow font-semibold">
              Share code
            </button>
          </div>
        </div>
        <div>
          <label className="block mb-2 font-medium text-white">Access Link:</label>
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={selectedPackage}
              onChange={(e) => setSelectedPackage(e.target.value)}
              className="flex-1 px-3 py-2 rounded-md text-white bg-[#00335B]"
            >
              <option value="">-- Select package --</option>
              {packages.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              value={generatedLink}
              readOnly
              placeholder="Referral Link"
              className="flex-1 px-3 py-2 rounded-md text-black bg-white"
            />

            <div className="flex gap-2">
              <button
                onClick={generateReferralLink}
                className="bg-[#00335B] text-white px-4 py-2 rounded-lg shadow font-semibold"
              >
                Generate Link
              </button>

              <button
                onClick={handleCopyLink}
                className="bg-white text-black px-4 py-2 rounded-lg shadow font-semibold"
                disabled={!generatedLink}
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>

        {popup && (
          <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow">
            ✅ Access code copied!
          </div>
        )}

        {linkPopup && (
          <div className="absolute top-16 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow">
            ✅ Access code Link copied!
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkGenerator;
