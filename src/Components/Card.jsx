import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";

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
      setShowPopup(true);
    }
    // Do nothing on Upgrade page or others
  };

  return (
    <>
      <div className="relative font-outfit cursor-default bg-white shadow-lg border border-[#e0e0e0] rounded-2xl p-6 flex flex-col w-full h-full">
        {/* Image on top-left */}
        <div className="mb-4">
          <img src={icon} alt={title} className="w-12 h-12 object-contain" />
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-semibold mb-2 text-left">{title}</h3>
        <p className="text-gray-500 text-sm mb-4 text-left">{description}</p>

        {/* Price */}
        <p className="text-2xl font-bold text-gray-900 mb-4 text-left">
          ₹{price} <span className="text-sm text-gray-500">/ lifetime</span>
        </p>

        {/* Features */}
        <ul className="space-y-2 text-gray-700 flex-1 text-left">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center">
              <img src={iconImage} alt="tick" className="w-5 h-5 mr-2" />
              {feature}
            </li>
          ))}
        </ul>

        {/* Get Started Button */}
        <button
          className="mt-6 text-white px-6 py-2 cursor-pointer rounded-xl font-semibold w-full transition hover:scale-105"
          style={{ background: buttonGradient }}
          onClick={handleGetStarted}
        >
          Get Started
        </button>
      </div>

      {/* Popup on Home Page */}
      {showPopup &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4"
            role="dialog"
            aria-modal="true"
            onClick={() => setShowPopup(false)}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-3 top-3 rounded-full px-2 py-1 text-gray-500 hover:bg-gray-100"
                aria-label="Close"
                onClick={() => setShowPopup(false)}
              >
                ✕
              </button>

              <h2 className="text-xl font-semibold mb-2">🚀 Digilancing</h2>
              <p className="text-gray-600 mb-4">Launching soon... Stay tuned!</p>

              <button
                className="mt-2 px-4 py-2 rounded-lg text-white hover:scale-105 transition"
                style={{
                  background: "linear-gradient(135deg, #A054F5 0%, #5E49E8 100%)",
                }}
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Card;
