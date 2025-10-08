import React, { useState, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  {
    label: 'Packages',
    dropdown: [
      { title: 'Basic Package', desc: 'Smart choice upgrade', link: '/BasicPackages' },
      { title: 'Standard Package', desc: 'Advance with focus', link: '/StandardPackages' },
      { title: 'Advanced Package', desc: 'Master advanced skills', link: '/AdvancedPackages' },
      { title: 'Premium Package', desc: 'All-in-one learning', link: '/PremiumPackages' },
      { title: 'Ultimate Package', desc: 'Everything unlocked', link: '/UltimatePackages' },
    ],
  }
];


const dropdownVariants = {
  hidden: { opacity: 0, y: -10, pointerEvents: 'none', transition: { duration: 0.2 } },
  visible: { opacity: 1, y: 0, pointerEvents: 'auto', transition: { duration: 0.3 } },
};

const Header = ({ isDarkMode }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedDropdownItem, setSelectedDropdownItem] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const toggleSection = (label) => {
    setExpandedSection(expandedSection === label ? null : label);
  };

  React.useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const isRegisterPage = location.pathname === '/Register';
  const isLoginPage = location.pathname === '/login';
  const isForgotPassword = location.pathname === '/ForgotPassword';
  const isVerifyOtp = location.pathname === '/VerifyOtp';
  const isResetPassword = location.pathname === '/ResetPassword';
  useEffect(() => {
    const token = sessionStorage.getItem("authToken");

    setIsLoggedIn(!!token);
  }, []);

  
  const user = JSON.parse(sessionStorage.getItem("user") || "null");

  const [name, setName] = useState(user?.fullname || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    setMobileOpen(false);
    setName("");
    setEmail("");
    navigate("/");
  };
  return (
    <>
      {isRegisterPage ? (
        <motion.div
          initial={false}
          animate={{
            backgroundColor: scrolled
              ? "rgba(255,255,255,0.95)"
              : "rgba(255,255,255,0)",
            boxShadow: scrolled
              ? "0 2px 10px rgba(0,0,0,0.1)"
              : "0px 0px 0px rgba(0,0,0,0)",
          }}

          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="cursor-default py-3 lg:py-0 px-2  fixed top-0 w-full z-50 backdrop-blur-sm"
        >

          <div className="px-3 max-w-screen-xl mx-auto flex justify-between items-center h-full">
            {/* Logo */}
            <div className="flex items-center overflow-hidden gap-2 pr-2">
              <h1 onClick={() => { navigate('/') }} className={`font-outfit text-2xl cursor-pointer mt-2.5 md:mt-0 font-bold ${scrolled || isDarkMode ? 'text-black' : 'text-white'}`}>DIGILANCING</h1>
            </div>

            {/* Main Navigation */}
            <div className="flex-1  hidden lg:flex flex-row ">
              <div className="px-5 py-5">
                <div
                  style={{
                    width: "2.5px",
                    height: "40px",
                    backgroundColor: scrolled || isDarkMode ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.4)",
                    transition: "background-color 0.3s ease"
                  }}
                ></div>

              </div>

              <ul className="flex text-[#111111] font-outfit justify-left  items-center gap-6 relative">
                <li className={`text-[16px] py-4 cursor-pointer flex items-center gap-2 relative ${scrolled || isDarkMode ? 'text-black' : 'text-white'} `}>
                  <span onClick={() => navigate('/Register')}>REGISTRATION</span>
                </li>
              </ul>
            </div>

            {/* Right Buttons */}
            <div className="w-full max-w-[320px] items-center justify-end hidden lg:flex">
              <div className="flex items-center gap-3">
                <Link to="/Contact" className={`${scrolled || isDarkMode ? 'bg-[#0183FF]' : 'bg-[#0183FF]'} py-2.5 font-outfit flex items-center justify-center px-10 text-[16px] cursor-pointer rounded-xl text-white`}>
                  <span>Support</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      ) : isLoginPage ? (
        <motion.div
          initial={false}
          animate={{
            backgroundColor: scrolled
              ? "rgba(255,255,255,0.95)" // white on scroll
              : "rgba(255,255,255,0)",   // transparent at top
            boxShadow: scrolled
              ? "0 2px 10px rgba(0,0,0,0.1)"
              : "0px 0px 0px rgba(0,0,0,0)",
          }}

          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="cursor-default py-3 lg:py-0 px-2  fixed top-0 w-full z-50 backdrop-blur-sm"
        >
          <div className="px-3 max-w-screen-xl mx-auto flex justify-between items-center h-full">
            {/* Logo */}
            <div className="flex items-center overflow-hidden gap-2 pr-2">
              <h1 onClick={() => { navigate('/') }} className={`font-outfit text-2xl cursor-pointer mt-2.5 md:mt-0 font-bold ${scrolled || isDarkMode ? 'text-black' : 'text-white'}`}>DIGILANCING</h1>
            </div>

            {/* Main Navigation */}
            <div className="flex-1  hidden lg:flex flex-row ">
              <div className="px-5 py-5">
                <div
                  style={{
                    width: "2.5px",
                    height: "40px",
                    backgroundColor: scrolled || isDarkMode ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.4)",
                    transition: "background-color 0.3s ease"
                  }}
                ></div>

              </div>

              <ul className="flex text-[#111111] font-outfit justify-left  items-center gap-6 relative">
                <li className={`text-[16px] py-4 cursor-pointer flex items-center gap-2 relative ${scrolled || isDarkMode ? 'text-black' : 'text-white'} `}>
                  <span onClick={() => navigate('/login')}>LOGIN</span>
                </li>
              </ul>
            </div>

            {/* Right Buttons */}
            <div className="w-full max-w-[320px] items-center justify-end hidden lg:flex">
              <div className="flex items-center gap-3">
                <Link to="/Contact" className={`${scrolled || isDarkMode ? 'bg-[#0183FF]' : 'bg-[#0183FF]'} py-2.5 font-outfit flex items-center justify-center px-10 text-[16px] cursor-pointer rounded-xl text-white`}>
                  <span>Support</span>
                </Link>

              </div>
            </div>


          </div>
        </motion.div>
      ) : isForgotPassword ? (
        <motion.div
          initial={false}
          animate={{
            backgroundColor: scrolled
              ? "rgba(255,255,255,0.95)" // white on scroll
              : "rgba(255,255,255,0)",   // transparent at top
            boxShadow: scrolled
              ? "0 2px 10px rgba(0,0,0,0.1)"
              : "0px 0px 0px rgba(0,0,0,0)",
          }}

          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="cursor-default py-3 lg:py-0 px-2  fixed top-0 w-full z-50 backdrop-blur-sm"
        >
          <div className="px-3 max-w-screen-xl mx-auto flex justify-between items-center h-full">
            {/* Logo */}
            <div className="flex items-center overflow-hidden gap-2 pr-2">
              <h1 onClick={() => { navigate('/') }} className={`font-outfit text-2xl cursor-pointer mt-2.5 md:mt-0 font-bold ${scrolled || isDarkMode ? 'text-black' : 'text-white'}`}>DIGILANCING</h1>
            </div>

            {/* Main Navigation */}
            <div className="flex-1  hidden lg:flex flex-row ">
              <div className="px-5 py-5">
                <div
                  style={{
                    width: "2.5px",
                    height: "40px",
                    backgroundColor: scrolled || isDarkMode ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.4)",
                    transition: "background-color 0.3s ease"
                  }}
                ></div>

              </div>

              <ul className="flex text-[#111111] font-outfit justify-left  items-center gap-6 relative">
                <li className={`text-[16px] py-4 cursor-pointer flex items-center gap-2 relative ${scrolled || isDarkMode ? 'text-black' : 'text-white'} `}>
                  <span onClick={() => navigate('/login')}>FORGOT PASSWORD</span>
                </li>
              </ul>
            </div>

            {/* Right Buttons */}
            <div className="w-full max-w-[320px] items-center justify-end hidden lg:flex">
              <div className="flex items-center gap-3">
                <Link to="/Contact" className={`${scrolled || isDarkMode ? 'bg-[#0183FF]' : 'bg-[#0183FF]'} py-2.5 font-outfit flex items-center justify-center px-10 text-[16px] cursor-pointer rounded-xl text-white`}>
                  <span>Support</span>
                </Link>

              </div>
            </div>
          </div>
        </motion.div>
      ) : isVerifyOtp ? (
        <motion.div
          initial={false}
          animate={{
            backgroundColor: scrolled
              ? "rgba(255,255,255,0.95)" // white on scroll
              : "rgba(255,255,255,0)",   // transparent at top
            boxShadow: scrolled
              ? "0 2px 10px rgba(0,0,0,0.1)"
              : "0px 0px 0px rgba(0,0,0,0)",
          }}

          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="cursor-default py-3 lg:py-0 px-2  fixed top-0 w-full z-50 backdrop-blur-sm"
        >
          <div className="px-3 max-w-screen-xl mx-auto flex justify-between items-center h-full">
            {/* Logo */}
            <div className="flex items-center overflow-hidden gap-2 pr-2">
              <h1 onClick={() => { navigate('/') }} className={`font-outfit text-2xl cursor-pointer mt-2.5 md:mt-0 font-bold ${scrolled || isDarkMode ? 'text-black' : 'text-white'}`}>DIGILANCING</h1>
            </div>

            {/* Main Navigation */}
            <div className="flex-1  hidden lg:flex flex-row ">
              <div className="px-5 py-5">
                <div
                  style={{
                    width: "2.5px",
                    height: "40px",
                    backgroundColor: scrolled || isDarkMode ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.4)",
                    transition: "background-color 0.3s ease"
                  }}
                ></div>

              </div>

              <ul className="flex text-[#111111] font-outfit justify-left  items-center gap-6 relative">
                <li className={`text-[16px] py-4 cursor-pointer flex items-center gap-2 relative ${scrolled || isDarkMode ? 'text-black' : 'text-white'} `}>
                  <span onClick={() => navigate('/VerifyOtp')}>VERIFY OTP</span>
                </li>
              </ul>
            </div>

            {/* Right Buttons */}
            <div className="w-full max-w-[320px] items-center justify-end hidden lg:flex">
              <div className="flex items-center gap-3">
                <Link to="/Contact" className={`${scrolled || isDarkMode ? 'bg-[#0183FF]' : 'bg-[#0183FF]'} py-2.5 font-outfit flex items-center justify-center px-10 text-[16px] cursor-pointer rounded-xl text-white`}>
                  <span>Support</span>
                </Link>

              </div>
            </div>


          </div>
        </motion.div>
      ) : isResetPassword ? (
        <motion.div
          initial={false}
          animate={{
            backgroundColor: scrolled
              ? "rgba(255,255,255,0.95)" // white on scroll
              : "rgba(255,255,255,0)",   // transparent at top
            boxShadow: scrolled
              ? "0 2px 10px rgba(0,0,0,0.1)"
              : "0px 0px 0px rgba(0,0,0,0)",
          }}

          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="cursor-default py-3 lg:py-0 px-2  fixed top-0 w-full z-50 backdrop-blur-sm"
        >
          <div className="px-3 max-w-screen-xl mx-auto flex justify-between items-center h-full">
            {/* Logo */}
            <div className="flex items-center overflow-hidden gap-2 pr-2">
              <h1 onClick={() => { navigate('/') }} className={`font-outfit text-2xl cursor-pointer mt-2.5 md:mt-0 font-bold ${scrolled || isDarkMode ? 'text-black' : 'text-white'}`}>DIGILANCING</h1>
            </div>

            {/* Main Navigation */}
            <div className="flex-1  hidden lg:flex flex-row ">
              <div className="px-5 py-5">
                <div
                  style={{
                    width: "2.5px",
                    height: "40px",
                    backgroundColor: scrolled || isDarkMode ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.4)",
                    transition: "background-color 0.3s ease"
                  }}
                ></div>

              </div>
              <ul className="flex text-[#111111] font-outfit justify-left  items-center gap-6 relative">
                <li className={`text-[16px] py-4 cursor-pointer flex items-center gap-2 relative ${scrolled || isDarkMode ? 'text-black' : 'text-white'} `}>
                  <span onClick={() => navigate('/ResetPassword')}>RESET PASSWORD</span>
                </li>
              </ul>
            </div>
            <div className="w-full max-w-[320px] items-center justify-end hidden lg:flex">
              <div className="flex items-center gap-3">
                <Link to="/Contact" className={`${scrolled || isDarkMode ? 'bg-[#0183FF]' : 'bg-[#0183FF]'} py-2.5 font-outfit flex items-center justify-center px-10 text-[16px] cursor-pointer rounded-xl text-white`}>
                  <span>Support</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={false}
          animate={{
            backgroundColor: scrolled
              ? "rgba(255,255,255,0.95)"
              : "rgba(255,255,255,0)",
            boxShadow: scrolled
              ? "0 2px 10px rgba(0,0,0,0.1)"
              : "0px 0px 0px rgba(0,0,0,0)",
          }}

          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="cursor-default py-3 lg:py-0 px-2  fixed top-0 w-full z-50 backdrop-blur-sm"
        >

          <div className="px-3 max-w-screen-xl mx-auto flex justify-between items-center h-full">
            {/* Logo */}
            <div className="flex items-center overflow-hidden gap-2 pr-2">
              <h1 onClick={() => { navigate('/') }} className={`font-outfit text-2xl cursor-pointer mt-2.5 md:mt-0 font-bold ${scrolled || isDarkMode ? 'text-black' : 'text-white'}`}>DIGILANCING</h1>
            </div>

            {/* Main Navigation */}
            <div className="flex-1  hidden lg:flex flex-row ">
              <div className="px-5 py-5">
                <div
                  style={{
                    width: "2.5px",
                    height: "40px",
                    backgroundColor: scrolled || isDarkMode ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.4)",
                    transition: "background-color 0.3s ease"
                  }}
                ></div>

              </div>

              <ul className="flex text-[#111111] font-outfit justify-left  items-center gap-6 relative">
                <li className={`text-[16px] py-4 cursor-pointer flex items-center gap-2 relative ${scrolled || isDarkMode ? 'text-black' : 'text-white'} `}>
                  <span onClick={() => navigate('/Courses')}>Courses</span>
                </li>



                {isLoggedIn ? (
                  <>
                    <li className={`text-[16px] py-4 cursor-pointer ${scrolled || isDarkMode ? 'text-black' : 'text-white'}`}
                      onClick={() => navigate('/DashBoard')}>
                      Dashboard
                    </li>
                    <li className={`text-[16px] py-4 cursor-pointer ${scrolled || isDarkMode ? 'text-black' : 'text-white'}`}
                      onClick={() => navigate('/AffiliatePanel')}>
                      Affiliate Panel
                    </li>
                  </>
                ) : (
                  <>
                    {menuItems.map(({ label, dropdown }) => (
                      <li
                        key={label}
                        className={`text-[16px] py-4 cursor-pointer flex items-center gap-2 relative ${scrolled || isDarkMode ? 'text-black' : 'text-white'}`}
                        onMouseEnter={() => setOpenDropdown(label)}
                        onMouseLeave={() => setOpenDropdown(null)}
                      >
                        <span>{label}</span>
                        <FaChevronDown
                          className={`w-3 h-3 stroke-[1.5] transition-transform duration-300 ${openDropdown === label ? 'rotate-180' : 'rotate-0'
                            } ${scrolled || isDarkMode ? 'text-black' : 'text-white'}`}
                        />

                        {/* Dropdown with Framer Motion */}
                        <AnimatePresence>
                          {openDropdown === label && (
                            <motion.ul
                              initial="hidden"
                              animate="visible"
                              exit="hidden"
                              variants={dropdownVariants}
                              className="absolute font-outfit  top-full left-0 text-[16px] z-50 bg-white  overflow-hidden rounded-lg shadow-lg w-65 border border-[#ebf0f5] text-black font-normal"

                            >
                              {dropdown.map(({ title, desc, link }) => (
                                <li
                                  key={title}
                                  className={`group px-4 py-2.5 text-lg cursor-pointer hover:bg-[#52abff] hover:text-white ${selectedDropdownItem === title ? 'bg-[#F4FAFF] text-black' : ''
                                    }`}
                                  onClick={() => {
                                    navigate(link);
                                    window.scrollTo(0, 0);
                                  }}
                                >
                                  {title}
                                  <p
                                    className={`text-[14px] ${selectedDropdownItem === title
                                      ? 'text-black group-hover:text-white'
                                      : 'text-[#5c5c5c] group-hover:text-white'
                                      }`}
                                  >
                                    {desc}
                                  </p>
                                </li>

                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </li>
                    ))}
                    <li className={`text-[16px] py-4 cursor-pointer ${scrolled || isDarkMode ? 'text-black' : 'text-white'}`}
                      onClick={() => navigate('/AboutUs')}>
                      About Us
                    </li>
                    <li className={`text-[16px] py-4 cursor-pointer ${scrolled || isDarkMode ? 'text-black' : 'text-white'}`}
                      onClick={() => navigate('/Contact')}>
                      Contact Us
                    </li>
                  </>
                )}

              </ul>
            </div>

            {/* Right Buttons */}
            <div className="w-full max-w-[320px] items-center justify-end hidden lg:flex">
              <div className="flex items-center gap-3">
                {!isLoggedIn ? (
                  <>
                    <Link
                      to="/login"
                      className={`text-[16px] font-outfit hover:bg-white hover:text-black px-8 border border-[#a8a8a8] py-2.5 rounded-xl ${scrolled || isDarkMode ? 'text-black' : 'text-white'}`}
                    >
                      Login
                    </Link>
                    <Link
                      to="/Register"
                      className={`${scrolled || isDarkMode ? 'bg-[#0183FF]' : 'bg-[#0183FF]'} py-2.5 font-outfit flex items-center justify-center px-10 text-[16px] cursor-pointer rounded-xl text-white`}
                    >
                      <span>Register</span>
                    </Link>
                  </>
                ) : (
                  <div className="flex items-center gap-3  px-3 py-2 rounded-xl">
                    {/* Profile Icon */}
                    <div className="w-10 h-10 flex items-center justify-center bg-[#0183FF] text-white font-bold rounded-full">
                      {/* First letter of name */}
                      {name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-500 text-[14px]">{name}</span>
                      <span className="text-[12px] text-gray-500">{email}</span>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
                        aria-label="Logout"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-gray-700"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Mobile Hamburger Icon */}
            <div className="bg-[#F4FAFF] lg:hidden p-2 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`cursor-pointer ${scrolled || isDarkMode ? 'text-black' : 'text-black'}`}
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                onClick={() => {
                  setMobileOpen(true);
                  window.scrollTo(0, 0);
                }}
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </div>
          </div>

          {/* Mobile Fullscreen Menu */}
          {mobileOpen && isSmallScreen && (
            <div className="fixed inset-0 border border-white h-screen bg-white p-3 sm:p-4 z-50 flex flex-col">
              {/* Top Bar */}
              <div className="px-3 w-full mx-auto flex justify-between items-center">
                <div className="flex items-center gap-2 xl:w-full xl:max-w-[320px]">
                  <h1 className="font-outfit text-xl sm:text-2xl font-bold text-black">
                    DIGILANCING
                  </h1>
                </div>

                {/* Close Icon */}
                <div className="lg:hidden flex items-center">
                  <div className="bg-[#F4FAFF] p-2 rounded-2xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="cursor-pointer"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      onClick={() => setMobileOpen(false)}
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Mobile Menu + Auth Section */}
              <div className="flex-1 flex flex-col gap-2 overflow-y-auto pt-6 p-2">

                {/* Always visible links */}
                <div
                  className="flex justify-between items-center px-4 py-4 rounded-2xl bg-[#F4FAFF] cursor-pointer"
                  onClick={() => {
                    navigate('/');
                    setMobileOpen(false);
                  }}
                >
                  <span className="text-base sm:text-lg font-semibold">Home</span>
                </div>
                <div
                  className="flex justify-between items-center px-4 py-4 rounded-2xl bg-[#F4FAFF] cursor-pointer"
                  onClick={() => {
                    navigate('/Courses');
                    setMobileOpen(false);
                  }}
                >
                  <span className="text-base sm:text-lg font-semibold">Courses</span>
                </div>

                {/* Conditional Links */}
                {isLoggedIn ? (
                  <>
                    <div
                      className="flex justify-between items-center px-4 py-4 rounded-2xl bg-[#F4FAFF] cursor-pointer"
                      onClick={() => {
                        navigate('/DashBoard');
                        setMobileOpen(false);
                      }}
                    >
                      <span className="text-base sm:text-lg font-semibold">Dashboard</span>
                    </div>
                    <div
                      className="flex justify-between items-center px-4 py-4 rounded-2xl bg-[#F4FAFF] cursor-pointer"
                      onClick={() => {
                        navigate('/AffiliatePanel');
                        setMobileOpen(false);
                      }}
                    >
                      <span className="text-base sm:text-lg font-semibold">Affiliate Panel</span>
                    </div>
                  </>
                ) : (
                  <>
                    {/* If not logged in, show dropdown sections and other links */}
                    {menuItems.map(({ label, dropdown }) => (
                      <div key={label}>
                        <div
                          className={`flex justify-between items-center px-4 py-4 bg-[#F4FAFF] cursor-pointer ${expandedSection === label ? 'rounded-t-xl' : 'rounded-xl'}`}
                          onClick={() => toggleSection(label)}
                        >
                          <span className="text-base sm:text-lg font-semibold">{label}</span>
                          <FaChevronDown
                            className={`transition-transform duration-300 ${expandedSection === label ? 'rotate-180' : ''}`}
                          />
                        </div>
                        {expandedSection === label && (
                          <ul className="pb-6 bg-gray-50 px-5 rounded-b-2xl space-y-2">
                            {dropdown.map(({ title, link }) => (
                              <li
                                key={title}
                                className="text-sm sm:text-[16px] cursor-pointer hover:text-[#00C2CC]"
                                onClick={() => {
                                  navigate(link);
                                  setMobileOpen(false);
                                }}
                              >
                                {title}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}

                    <div
                      className="flex justify-between items-center px-4 py-4 rounded-2xl bg-[#F4FAFF] cursor-pointer"
                      onClick={() => {
                        navigate('/AboutUs');
                        setMobileOpen(false);
                      }}
                    >
                      <span className="text-base sm:text-lg font-semibold">About us</span>
                    </div>
                    <div
                      className="flex justify-between items-center px-4 py-4 rounded-2xl bg-[#F4FAFF] cursor-pointer"
                      onClick={() => {
                        navigate('/Contact');
                        setMobileOpen(false);
                      }}
                    >
                      <span className="text-base sm:text-lg font-semibold">Contact Us</span>
                    </div>
                  </>
                )}
                <div className="flex flex-col gap-4 border-t pt-4 px-2">
                  {isLoggedIn ? (
                    <>
                      {/* Profile Card */}
                      <div className="flex items-center gap-3 bg-[#F4FAFF] px-3 py-2 rounded-xl">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-[#0183FF] text-white font-bold rounded-full text-sm sm:text-base">
                          {name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-black text-[14px] sm:text-[15px]">{name}</span>
                          <span className="text-[12px] sm:text-[13px] text-gray-500">{email}</span>
                        </div>
                      </div>

                      {/* Logout Button */}
                      <button
                       onClick={handleLogout}
                        className="w-full bg-[#0183FF] text-white py-2 rounded-xl font-semibold text-sm sm:text-base"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <div className="flex gap-2">
                      <Link
                        to="/login"
                        className="flex-1 text-center text-sm sm:text-[16px] font-outfit hover:bg-white hover:text-black px-4 sm:px-6 border border-[#a8a8a8] py-2.5 rounded-xl text-black"
                        onClick={() => setMobileOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/Register"
                        className="flex-1 text-center bg-[#0183FF] py-2.5 font-outfit rounded-xl text-white text-sm sm:text-[16px]"
                        onClick={() => setMobileOpen(false)}
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}



        </motion.div>
      )}

    </>
  );
};

export default Header;
