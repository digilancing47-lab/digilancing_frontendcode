import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

const Card = ({
  icon,
  title,
  description,
  price,
  features,
  iconImage,
  buttonGradient,
  setCurrentStep,
  setSelectedPackage,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();
  const isRegisterPage = location.pathname === "/Register";
  const isHomePage = location.pathname === "/";
  const isUpgradePage = location.pathname === "/Upgrade";
  const navigate = useNavigate();

  // close popup on ESC
  useEffect(() => {
    if (!showPopup) return;
    const onKey = (e) => e.key === "Escape" && setShowPopup(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showPopup]);

  // lock scroll when popup is open
  useEffect(() => {
    if (!showPopup) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [showPopup]);

  const handleGetStarted = () => {
    if (isRegisterPage) {
      setSelectedPackage({ title, description, price, features });
      setCurrentStep(2);
    } else if (isHomePage) {
      navigate('/Register')
    }
    // Do nothing on Upgrade page or others
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div 
        className={`relative font-outfit cursor-default shadow-xl border rounded-3xl p-6 flex flex-col w-full h-full transition-all duration-500 ${
          isHovered 
            ? 'bg-[#0183FF] border-[#0183FF] shadow-2xl' 
            : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image on top-left */}
        <div className={`mb-4 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
          isHovered ? 'bg-white/20' : 'bg-gradient-to-br from-[#06b6d4]/10 to-[#3b82f6]/10'
        }`}>
          <img src={icon} alt={title} className="w-10 h-10 object-contain" />
        </div>

        {/* Title & Description */}
        <h3 className={`text-2xl font-bold mb-2 text-left transition-all duration-500 ${
          isHovered ? 'text-white' : 'bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] bg-clip-text text-transparent'
        }`}>{title}</h3>
        <p className={`text-sm mb-4 text-left transition-colors duration-500 min-h-[2.5rem] ${
          isHovered ? 'text-white' : 'text-gray-600'
        }`}>{description}</p>

        {/* Price */}
        <p className={`text-3xl font-bold mb-4 text-left transition-colors duration-500 ${
          isHovered ? 'text-white' : 'text-gray-900'
        }`}>
          ₹{price} <span className={`text-sm font-normal transition-colors duration-500 ${
            isHovered ? 'text-white/80' : 'text-gray-500'
          }`}>/ lifetime</span>
        </p>

        {/* Features */}
        <ul className="space-y-3 flex-1 text-left">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <FaCheck className={`w-4 h-4 mr-3 mt-0.5 flex-shrink-0 transition-colors duration-500 ${
                isHovered ? 'text-white' : 'text-[#06b6d4]'
              }`} />
              <span className={`text-sm transition-colors duration-500 ${
                isHovered ? 'text-white' : 'text-gray-700'
              }`}>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Get Started Button */}
        <button
          className={`mt-6  px-6 py-3 cursor-pointer rounded-xl font-semibold w-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 ${
            isHovered ? 'bg-white text-[#0183FF]' : 'bg-gradient-to-r text-white from-[#06b6d4] to-[#3b82f6] hover:from-[#0891b2] hover:to-[#2563eb]'
          }`}
          onClick={handleGetStarted}
        >
          Get Started
        </button>
      </div>
    </>
  );
};

export default Card;
