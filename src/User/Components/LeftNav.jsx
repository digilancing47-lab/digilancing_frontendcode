import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Headset, Package, Home, ArrowUpCircle, Award, Network, LogOut, X } from 'lucide-react';

const LeftNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const Navigate = useNavigate();
  // Using useLocation to track the current path
  const location = useLocation();

  const getActiveMenu = () => {
    switch (location.pathname) {
      case '/DashBoard':
        return 'DashBoard';
      case '/Certificates':
        return 'certificates';
      case '/AffiliatePanel':
        return 'affiliate';
      case '/Upgrade':
        return 'upgrade';
      case '/Support':
        return 'support';
      case '/LogOut':
        return 'logout';
      default:
        return 'UserHome';
    }
  };

  const [activeMenu, setActiveMenu] = useState(getActiveMenu); // Initially set based on the current path

  useEffect(() => {
    // Update active menu when the location changes
    setActiveMenu(getActiveMenu());

    // Disable/Enable body scroll when sidebar is open/closed
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = 'auto'; // Enable scrolling
    }

    // Cleanup on component unmount or isOpen change
    return () => {
      document.body.style.overflow = 'auto'; // Ensure scrolling is enabled when component unmounts
    };
  }, [isOpen, location]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Toggle Button for Sidebar */}
      <button
        onClick={toggleSidebar}
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        aria-controls="sidebar"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>


      <aside
        id="sidebar"
        className={`fixed top-0 left-0 z-40 h-screen transition-transform transform
    ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
    lg:top-[2vh] lg:left-2 lg:w-64 lg:h-[96vh] lg:translate-x-0
    ${isOpen ? 'rounded-none' : 'lg:rounded-3xl'} lg:rounded-3xl
    w-[50vw] max-w-sm
  `}
        aria-label="Sidebar"
      >


        <div className="h-full bg-[#F3F5F2] shadow-xl flex flex-col p-2 lg:rounded-3xl rounded-none lg:w-72 lg:h-full lg:relative lg:flex-shrink-0 transition-all duration-300 ease-in-out overflow-auto">
          {/* Logo Section */}
          <div className="flex items-center justify-between  h-16">
            <span className="text-xl font-bold text-[#002B54]">DIGILANCING</span>
            <button
              onClick={() => setIsOpen(false)} // Close the sidebar on clicking "X"
              className="text-gray-500 hover:text-gray-700 lg:hidden"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-grow">
            <ul>
              <li className="mb-2">
                <Link
                  to="/DashBoard"
                  className={`flex items-center text-[16px]  py-3 px-3 font-semibold  ${activeMenu === 'DashBoard' ? 'border-l-4 border-[#003B73] text-[#003B73]' : 'text-gray-700 hover:bg-[#003B73] hover:rounded-md hover:text-white'}`}
                >
                  <LayoutDashboard className="w-5 h-5 mr-3 fill-[#002B54]" />
                  Dashboard
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/Courses"
                  className={`flex items-center text-[16px] py-3 px-3 font-semibold  ${activeMenu === 'courses' ? 'border-l-4 border-[#003B73] text-[#003B73] ' : 'text-gray-700 hover:bg-[#003B73] hover:rounded-md hover:text-white'}`}
                >
                  <Package className="w-5 h-5 mr-3" />
                  Courses
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/Certificates"
                  className={`flex items-center text-[16px]  py-3 px-3 font-semibold  ${activeMenu === 'certificates' ? 'border-l-4 border-[#003B73] text-[#003B73]' : 'text-gray-700 hover:bg-[#003B73] hover:rounded-md hover:text-white'}`}
                >
                  <Award className="w-5 h-5 mr-3 fill-[#002B54]" />
                  Certificates
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/AffiliatePanel"
                  className={`flex items-center text-[16px]  py-3 px-3 font-semibold p-2  ${activeMenu === 'affiliate' ? 'border-l-4 border-[#003B73] text-[#003B73]' : 'text-gray-700 hover:bg-[#003B73] hover:rounded-md hover:text-white'}`}
                >
                  <Network className="w-5 h-5 mr-3" />
                  Affiliate Panel
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/Contact"
                  className={`flex items-center text-[16px] py-3 px-3 font-semibold ${activeMenu === 'support' ? 'border-l-4 border-[#003B73] text-[#003B73]' : 'text-gray-700 hover:bg-[#003B73] hover:rounded-md hover:text-white'}`}
                >
                  <Headset className="w-5 h-5 mr-3" />
                  Support
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/Upgrade"
                  className={`flex items-center text-[16px] py-3 px-3 font-semibold ${activeMenu === 'support' ? 'border-l-4 border-[#003B73] text-[#003B73]' : 'text-gray-700 hover:bg-[#003B73] hover:rounded-md hover:text-white'}`}
                >
                  <ArrowUpCircle className="w-5 h-5 mr-3" />
                  Upgrade Package
                </Link>
              </li>
            </ul>
          </div>
          <div className="relative bg-[#dce8ff] rounded-3xl mt-12 p-6 sm:p-8 md:p-10 text-black w-full flex flex-col items-center justify-center overflow-visible">

            {/* Top circle (arrow) */}
            <div className='absolute -top-6 left-1/2 transform -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-[#3976FB] flex items-center justify-center rounded-full z-10 shadow-lg'>
              <h1 className='text-base sm:text-lg md:text-xl text-white'>→</h1>
            </div>

            {/* Title */}
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-center z-0 whitespace-nowrap">
              Freelance career!
            </h2>


            {/* Image */}
            <div className="w-full flex justify-center">
              <img
                src='/Freelance.png'
                alt='Freelance career'
                className='w-4/5 sm:w-3/4 md:w-2/3 lg:w-1/2 h-auto object-contain'
                onClick={() => Navigate('/Freelancer')}
              />
            </div>
          </div>






        </div>
      </aside>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          id="overlay"
          className="fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default LeftNav;
