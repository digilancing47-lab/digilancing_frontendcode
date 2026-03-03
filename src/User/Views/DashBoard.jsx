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
    <div className="dashboard-page">
      <div className="flex flex-col lg:flex-row p-2 min-h-screen">
        <LeftNav />
        <div className="flex-1 lg:ml-72 mt-2 md:mt-3.5 p-2 md:p-6 mr-4">
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
            <div className=''>
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
                  {!data ? (
                    // Skeleton Loader
                    Array(3).fill(0).map((_, index) => (
                      <div key={index} className="w-full flex flex-col border border-gray-300 rounded-2xl overflow-hidden bg-white shadow-md">
                        <div className="relative p-2 w-full">
                          <div className="bg-gray-200 rounded-xl w-full aspect-video animate-pulse"></div>
                        </div>
                        <div className="flex flex-col bg-white px-4 pb-3 pt-2">
                          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                          <div className="h-3 bg-gray-200 rounded w-full mt-1 animate-pulse"></div>
                          <div className="h-3 bg-gray-200 rounded w-5/6 mt-1 animate-pulse"></div>
                          <div className="flex gap-2 mt-3">
                            <div className="h-7 bg-gray-200 rounded-full w-24 animate-pulse"></div>
                            <div className="h-9 bg-gray-200 rounded-lg w-28 ml-auto animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    data.courseDetails
                      ?.filter((item, index, self) => 
                        index === self.findIndex(course => course.id === item.id)
                      )
                      .filter(item => item.id !== 64)
                      .map((item, index) => (
                        <motion.div
                          key={index}
                          className="w-full flex flex-col border border-white/20 rounded-2xl overflow-hidden backdrop-blur-md bg-white/30 shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 relative"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                          <div className="relative p-2 w-full">
                            <img
                              src={item.thumbnail_url || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTVlN2ViIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNvdXJzZSBJbWFnZTwvdGV4dD48L3N2Zz4='}
                              alt={item.title}
                              className="object-cover rounded-xl w-full h-full"
                              onError={(e) => {
                                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTVlN2ViIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNvdXJzZSBJbWFnZTwvdGV4dD48L3N2Zz4=';
                              }}
                            />
                          </div>

                          <div className="flex flex-col flex-grow backdrop-blur-sm bg-white/40 px-4 pb-3">
                            <h3 className="font-semibold text-[16px] line-clamp-2 text-gray-900">
                              {item.title}
                            </h3>

                            <div className="flex-grow" />
                            <p className="text-xs text-gray-700 mt-1 line-clamp-2">
                              {item.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-3">
                              <div className="flex items-center px-2 py-0.5 rounded-full border border-white/40 backdrop-blur-sm bg-white/30 w-fit gap-2">
                                <img src={timing_icon} className="w-4" />
                                <p className="text-[12px] font-medium text-gray-700">
                                  {(() => {
                                    if (!item.duration) return 'N/A';
                                    
                                    // Check if duration is already in "X hrs Y mins" format
                                    if (item.duration.includes('hrs') || item.duration.includes('min')) {
                                      return item.duration;
                                    }
                                    
                                    // Parse HH:MM:SS format
                                    const parts = item.duration.split(':');
                                    if (parts.length !== 3) return item.duration;
                                    
                                    const [hours, minutes] = parts.map(Number);
                                    if (isNaN(hours) || isNaN(minutes)) return item.duration;
                                    
                                    const totalMinutes = hours * 60 + minutes;
                                    const hrs = Math.floor(totalMinutes / 60);
                                    const mins = totalMinutes % 60;
                                    return `${hrs} hrs ${mins} mins`;
                                  })()}
                                </p>
                              </div>
                              <button onClick={() => { Navigate('/courses') }} className="bg-gradient-to-br from-[#3b82f6] via-[#3b82f6] to-[#3b82f6] cursor-pointer text-white text-xs ml-auto font-semibold py-2 px-6 rounded-lg hover:bg-blue-500 transition">
                                Continue
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))
                  )}
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
    </div>
  );
};

export default DashBoard;