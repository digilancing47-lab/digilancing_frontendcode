import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Headset, Package, Home, ArrowUpCircle, Award, Network, LogOut, X, Briefcase } from 'lucide-react';
import CustomAlert from './CustomAlert';

const LeftNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
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
      case '/Careers':
        return 'careers';
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

  const handleLogoutClick = () => {
    setShowLogoutAlert(true);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutAlert(false);
    sessionStorage.clear();
    Navigate("/");
  };

  const handleLogoutCancel = () => {
    setShowLogoutAlert(false);
  };

  const navItems = [
    { to: '/DashBoard', label: 'Dashboard', icon: LayoutDashboard, key: 'DashBoard', fillIcon: true },
    { to: '/Courses', label: 'Courses', icon: Package, key: 'courses' },
    { to: '/Certificates', label: 'Certificates', icon: Award, key: 'certificates', fillIcon: true },
    { to: '/AffiliatePanel', label: 'Affiliate Panel', icon: Network, key: 'affiliate' },
    { to: '/Contact', label: 'Support', icon: Headset, key: 'support' },
    { to: '/Upgrade', label: 'Upgrade Package', icon: ArrowUpCircle, key: 'upgrade' },
    { to: '/Careers', label: 'Careers', icon: Briefcase, key: 'careers' }
  ];

  return (
    <>
      {/* Toggle Button for Sidebar */}
     
  <button
        onClick={toggleSidebar}
        type="button"
        className="inline-flex w-fit items-center p-2 mt-2 ms-3 text-sm text-white bg-gradient-to-r from-[#3b82f6] via-[#3b82f6] to-[#3b82f6] rounded-lg lg:hidden hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
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
    w-[60vw] max-w-sm
  `}
        aria-label="Sidebar"
      >


        <div className="h-full bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#06b6d4] shadow-xl flex flex-col p-2 lg:rounded-3xl rounded-none lg:w-72 lg:h-full lg:relative lg:flex-shrink-0 transition-all duration-300 ease-in-out overflow-auto">
          {/* Logo Section */}
          <div className="flex items-center justify-between pr-3 pt-3 h-16">
           <span
  className="text-xl font-bold text-[#2B3FF5] flex items-center gap-2"
  style={{ fontFamily: "Finance" }}
>
 
  <img
    src="/white.svg"   // 👉 replace this with your actual path (e.g., /assets/white_logo.png)
    alt="Digilancing Logo"
    className="w-34 ml-2 h-7 object-contain"
  />
</span>

            <button
              onClick={() => setIsOpen(false)} // Close the sidebar on clicking "X"
              className="text-white lg:hidden"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-grow mt-4">
            <ul>
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.key} className="md-1 md:mb-2">
                    <Link
                      to={item.to}
                      className={`flex items-center text-[16px] py-3 px-3 font-semibold transition-all duration-300 ${activeMenu === item.key ? 'bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-xl shadow-lg' : 'text-white hover:bg-white/5 rounded-md'}`}
                    >
                      <Icon className={`w-5 h-5 mr-3 ${item.fillIcon ? 'fill-[#3b82f6]' : ''}`} />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            
            {/* Logout Button */}
            <button
              onClick={handleLogoutClick}
              className={`flex items-center text-[16px] py-3 px-3 font-semibold transition-all duration-300 ${activeMenu === 'logout' ? 'bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-xl shadow-lg' : 'text-white hover:bg-white/5 rounded-md'} w-full mt-2`}
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
          <div 
            onClick={() => Navigate('/Careers')} 
            className="relative bg-white/10 backdrop-blur-sm border border-white/30 rounded-3xl mt-12 p-6 sm:p-8 md:p-10 text-white w-full flex flex-col items-center justify-center overflow-visible shadow-lg cursor-pointer hover:bg-white/15 transition-all duration-300">

            {/* Top circle (arrow) */}
            <div className='absolute -top-6 left-1/2 transform -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-[#06b6d4] border-[0.5px] border-white backdrop-blur-sm flex items-center justify-center rounded-full z-10 shadow-lg'>
              <h1 className='text-base sm:text-lg md:text-2xl text-white'>→</h1>
            </div>

            {/* Title */}
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-center z-0 whitespace-nowrap text-white">
              Freelance career!
            </h2>


            {/* Image */}
            <div className="w-full flex justify-center">
              <img
                src='/Freelance.png'
                alt='Freelance career'
                className='w-4/5 sm:w-3/4 md:w-2/3 lg:w-1/2 h-auto object-contain'
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
      
      {/* Custom Alert */}
      <CustomAlert
        isOpen={showLogoutAlert}
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
        title="Confirm Logout"
        message="Are you sure you want to logout? You will need to sign in again to access your account."
      />
    </>
  );
};

export default LeftNav;
