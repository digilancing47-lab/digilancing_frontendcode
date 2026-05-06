import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import AfLeftNav from "./AfLeftNav";
import CustomAlert from "./CustomAlert";

const Loader = () => (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-md bg-black/30">
    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const AfHeader = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const dropdownRef = useRef(null);

  const user = JSON.parse(sessionStorage.getItem("user") || "null");
  const name = user?.fullname;
  const email = user?.email;
  const image = user?.customer_image;

  const handleLogoutClick = () => {
    setIsDropdownOpen(false);
    setShowLogoutAlert(true);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutAlert(false);
    setLoading(true);
    setTimeout(() => {
      sessionStorage.clear();
      navigate("/");
    }, 2000);
  };

  const handleLogoutCancel = () => {
    setShowLogoutAlert(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <>
      {/* Fixed Mobile Header */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white px-4 py-2 flex items-center justify-between lg:hidden shadow-sm">
        {/* Company Logo */}
        <div>
          <img 
            src="/Logo_Black.svg" 
            alt="Digilancing" 
            className="h-6 w-auto"
          />
        </div>

        {/* Profile Avatar and Hamburger Menu */}
        <div className="flex items-center justify-center gap-2">
          {/* Profile Avatar */}
          <div>
            <button
              onClick={() => navigate('/Profile')}
              className="focus:outline-none"
            >
              {image ? (
                <img
                  src={image}
                  alt="Profile"
                  className="w-8 h-8 mt-2 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 mt-2 rounded-full flex items-center justify-center bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#06b6d4] text-white font-bold text-xs uppercase">
                  {name?.slice(0, 2)}
                </div>
              )}
            </button>
          </div>

          {/* Hamburger Icon */}
          <button
            onClick={() => setIsSidebarOpen(prev => !prev)}
            className="inline-flex items-center p-2 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="w-full top-0 px-1 py-1 flex items-center justify-between hidden lg:flex">
        <h1 className="text-lg sm:text-xl md:text-xl font-bold text-gray-900 truncate"></h1>
        <div className="px-4 flex items-center py-4 rounded-xl bg-white w-full space-x-4">
          <div className="flex w-full">
            {image ? (
              <img
                src={image}
                alt="Profile"
                onClick={()=>{navigate('/Profile')}}
                className="w-10 h-10 cursor-pointer rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#06b6d4] text-white font-bold text-lg uppercase" 
               onClick={() => navigate("/Profile")}
                style={{cursor:"pointer"}}>
                {name?.slice(0, 2)}
              </div>
            )}
            <div onClick={()=>{navigate('/Profile')}} className="flex cursor-pointer px-2 flex-col">
              <span className="bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent font-semibold text-base capitalize">
                Hello! {name}
              </span>
              <span className="text-gray-400 text-sm">
                Welcome back to your Overview
              </span>
            </div>
            <div className="flex items-center gap-5 pr-5 ml-auto justify-end">
              <a href="/DashBoard" className="text-gray-600 hover:text-gray-900 transition">
                Dashboard
              </a>
              <a href="/courses" className="text-gray-600 hover:text-gray-900 transition">
                Courses
              </a>
              <h1
                onClick={handleLogoutClick}
                className="text-red-600 cursor-pointer hover:text-red-800 transition"
              >
                Logout
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <AfLeftNav isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Custom Alert */}
      <CustomAlert
        isOpen={showLogoutAlert}
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
        title="Confirm Logout"
        message="Are you sure you want to logout? You will need to sign in again to access your account."
      />

      {/* Loader */}
      {loading && ReactDOM.createPortal(<Loader />, document.body)}
    </>
  );
};

export default AfHeader;
