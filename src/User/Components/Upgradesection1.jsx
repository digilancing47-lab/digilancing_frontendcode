import React from 'react';
import { motion } from 'framer-motion';
import upgradeBook from "../../User/Assets/upgradeBook.svg";

const Upgradesection1 = () => {
  return (
    <div className="mt-25 px-3 sm:px-4 lg:max-w-6xl lg:mx-auto">
      {/* Image Container */}
      <div className="bg-[#F1F3F2] text-white sm:h-64 md:h-80 rounded-3xl w-full flex items-center justify-center">
        <motion.img
          src={upgradeBook}
          alt="Books"
          loading="eager"
          fetchPriority="high"
          decoding="sync"
          className="h-[100%] w-auto object-contain"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>

      {/* Text below the container */}
      <div className="mt-10 text-center">
        <p className="text-sm text-gray-500 tracking-wide">DIGILANCING</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-black mt-1">
          UPGRADE PACKAGE
        </h2>
        <div className="w-16 h-0.5 bg-black mx-auto mt-2"></div> {/* underline */}
      </div>
    </div>
  );
};

export default Upgradesection1;
