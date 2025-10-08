import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import AfLeftNav from "./AfLeftNav";

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
  const dropdownRef = useRef(null);

  const user = JSON.parse(sessionStorage.getItem("user") || "null");
  const name = user?.fullname;
  const email = user?.email;
  const image = user?.customer_image;

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      sessionStorage.clear();
      navigate("/");
    }, 2000);
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
      <div className="fixed top-0 left-0 w-full z-50 bg-[#002B54] px-4 py-2 flex items-center justify-between lg:hidden ">
        {/* Hamburger Icon */}
        <button
          onClick={() => setIsSidebarOpen(prev => !prev)}
          className="inline-flex items-center p-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002B54]"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            />
          </svg>
        </button>

        {/* Profile Avatar */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(prev => !prev)}
            className="focus:outline-none"
          >
            {image ? (
              <img
                src={image}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-indigo-500 to-indigo-300 text-white font-bold text-lg uppercase">
                {name?.slice(0, 2)}
              </div>
            )}
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg z-50">
              <div className="px-4 py-2 border-b">
                <p className="text-sm font-semibold text-gray-800">{name}</p>
                <p className="text-xs text-gray-500 truncate">{email}</p>
              </div>
              <a
                href="/DashBoard"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                 style={{cursor:"pointer"}}
              >
                Dashboard
              </a>
              <a
                href="/courses"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                 style={{cursor:"pointer"}}
              >
                Courses
              </a>
              <a
                href="/Profile"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                style={{cursor:"pointer"}}
              >
                Profile
              </a>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Header */}
      <div className="w-full top-0 bg-[#002B54] px-1 py-1 flex items-center justify-between hidden lg:flex">
        <h1 className="text-lg sm:text-xl md:text-xl font-bold text-white truncate"></h1>
        <div className="px-4 flex items-center py-4 rounded-xl bg-white w-full space-x-4">
          <div className="flex w-full">
            {image ? (
              <img
                src={image}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-indigo-500 to-indigo-300 text-white font-bold text-lg uppercase" 
               onClick={() => navigate("/Profile")}
                style={{cursor:"pointer"}}>
                {name?.slice(0, 2)}
              </div>
            )}
            <div className="flex px-2 flex-col">
              <span className="bg-gradient-to-r from-indigo-500 to-indigo-300 bg-clip-text text-transparent font-semibold text-base capitalize">
                Hello! {name}
              </span>
              <span className="text-gray-400 text-sm">
                Welcome back to your Overview
              </span>
            </div>
            <div className="flex items-center gap-5 pr-5 ml-auto justify-end">
              <a href="/DashBoard" className="text-gray-400 hover:text-gray-600 transition">
                Dashboard
              </a>
              <a href="/courses" className="text-gray-400 hover:text-gray-600 transition">
                Courses
              </a>
               
              <h1
                onClick={handleLogout}
                className="text-gray-400 cursor-pointer hover:text-gray-600 transition"
              >
                Logout
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <AfLeftNav isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Loader */}
      {loading && ReactDOM.createPortal(<Loader />, document.body)}
    </>
  );
};

export default AfHeader;
