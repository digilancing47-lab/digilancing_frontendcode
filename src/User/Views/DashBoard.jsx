import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

import LeftNav from "../../User/Components/LeftNav";
import GreetingSection from '../../User/Components/GreetingSection';
import RecentlyQualified from '../../User/Components/RecentlyQualified';
import TimeSpendingChart from '../../User/Components/TimeSpendingChart';
import packagesData from '../../Data/packagesData';
import BestInstructors from '../../User/Components/BestInstructors';
import SupportSystem from '../../User/Components/SupportSystem';
import { useNavigate } from "react-router-dom";
import timing_icon from "../../assets/timing_icon.svg";

import { API_BASE } from '../../apiBase';

const DashBoard = () => {
  const Navigate = useNavigate()
  let parsedUser = null;
  try {
    parsedUser = JSON.parse(sessionStorage.getItem("user") || "null");
  } catch (e) {
    parsedUser = sessionStorage.getItem("user") || null;
  }
  const user = parsedUser;

  const packageid = sessionStorage.getItem("packageId") || null;

  const [currentPackage, setCurrentPackage] = useState(null);
  const [guide_code, setguide_code] = useState(user?.guide_code || "");
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/api/v_1/Dashboard/${guide_code}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await res.json();
        console.log("API Response:", result);
        setData(result);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      }
    };

    if (guide_code) fetchDashboard();
  }, [guide_code]);

  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: 'easeOut'
      }
    })
  };

  useEffect(() => {
    const packageId = sessionStorage.getItem("packageId");
    if (!packageId) return;

    const matchedPackage = Object.values(packagesData).find(
      (pkg) => pkg.id === packageId
    );

    setCurrentPackage(matchedPackage || null);
  }, []);

  const packages = [
    { id: "DIGI0001", name: "Basic Package" },
    { id: "DIGI0002", name: "Standard Package" },
    { id: "DIGI0003", name: "Advanced Package" },
    { id: "DIGI0004", name: "Premium Package" },
    { id: "DIGI0005", name: "Ultimate Package" }
  ];

  return (
    <div className="flex flex-col lg:flex-row p-2 bg-gray-50 min-h-screen">
      <LeftNav />
      <div className="flex-1 lg:ml-72 mt-5 p-6 mr-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

          <div className="flex items-center justify-end gap-2 w-full">
            <div className="relative w-full max-w-[400px]">
              <input
                type="text"
                placeholder="Search Support"
                className="w-full rounded-full bg-white border border-gray-300 px-4 py-2.5 pl-10 text-[14px] text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="p-2 rounded-full cursor-pointer bg-gray-200 hover:bg-gray-300 focus:outline-none transition"
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
          <motion.div
            className="lg:col-span-3"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <div className='pb-10'>
              <GreetingSection />
            </div>
            <div className='mt-5'>
              <div className="flex justify-between items-center mb-4 max-w-screen-xl mx-auto px-2">
                <h3 className="text-xl font-semibold text-gray-800">
                  {packages.find(pkg => pkg.id === packageid)?.name || currentPackage?.name || "Unknown Package"}
                </h3>
                <button onClick={() => { Navigate('/courses') }} className="text-sm text-blue-600 hover:underline transition">
                  View All
                </button>
              </div>
              <div>
                <div className="grid max-w-screen-xl mx-auto gap-2 md:grid-cols-3">
                  {data?.courseDetails.map((item, index) => (
                    <motion.div
                      key={index}
                      className="w-full flex flex-col border border-gray-300 rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-transform transform hover:scale-105 relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <div className="relative p-2 w-full">
                        <img
                          src={item.thumbnail_url}
                          alt={item.title}
                          className="object-cover rounded-xl w-full h-full"
                        />
                      </div>

                      <div className="flex flex-col flex-grow bg-white px-4 pb-3">
                        <h3 className="font-semibold text-[16px] line-clamp-2 text-gray-900">
                          {item.title}
                        </h3>

                        <div className="flex-grow" />
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {item.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-3">
                          <div className="flex items-center px-2 py-0.5 rounded-full border border-gray-300 w-fit gap-2">
                            <img src={timing_icon} className="w-4" />
                            <p className="text-[12px] font-medium text-gray-500">
                              {item.duration}
                            </p>
                          </div>
                          <button onClick={() => { Navigate('/courses') }} className="bg-blue-600 cursor-pointer text-white text-xs ml-auto font-semibold py-2 px-6 rounded-lg hover:bg-blue-500 transition">
                            Continue
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="col-span-1"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <div className="flex flex-col md:flex-row lg:flex-col gap-4">
              <motion.div className="flex-1 w-full" variants={fadeIn} custom={1.2}>
                <RecentlyQualified />
              </motion.div>
              <motion.div className="flex-1 w-full" variants={fadeIn} custom={1.4}>
                <TimeSpendingChart />
              </motion.div>
            </div>
          </motion.div>
        </div>
        <motion.div
          className="col-span-1 lg:col-span-4 mt-8 flex justify-start"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          <BestInstructors topInstructors={data?.topInstructors} />
        </motion.div>


        <motion.div
          className="lg:col-span-4"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={2.2}
        >
          <SupportSystem />
        </motion.div>
      </div>
    </div>
  );
};

export default DashBoard;
