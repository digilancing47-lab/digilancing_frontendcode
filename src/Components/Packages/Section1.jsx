import React from 'react';
import { motion } from 'framer-motion';
import line from '../../assets/line.svg';
import { useNavigate } from 'react-router-dom';

const wrapperVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

const Section1 = ({ packageName, price, promoPrice, description, buttonText, image }) => {
  const navigate = useNavigate()
  return (
    <div className='px-2'>
      <motion.div
      className="flex flex-col font-outfit lg:flex-row items-center bg-[#002B54] rounded-4xl shadow-xl max-w-6xl mx-auto mt-30 px-8 py-12 md:py-0 sm:px-6 lg:px-0 lg:pl-12"
      initial="hidden"
      animate="show"
      variants={wrapperVariants}
    >
      {/* Left Section: Text Content */}
      <motion.div 
        className="flex-1 text-white mb-8 lg:mb-0"
        variants={wrapperVariants}
      >
        <h2 className="text-5xl font-semibold mb-4 flex items-center">
          {packageName}
        </h2>

        <p className="text-xl mt-4 mb-2">MRP - ₹{price}</p>

        <p className="text-2xl mb-4">
          With Promocode{' '}
          <span className="rounded px-4 font-semibold py-1.5 text-2xl bg-[rgba(253,219,93,0.25)]">
            ₹{promoPrice}
          </span>
        </p>

        <p className="text-base mt-10 mb-6 max-w-prose">{description}</p>

        <motion.button
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={()=>{navigate('/Register')}}
          className="bg-[#FDDB5D] text-black px-6 py-2 rounded-lg font-semibold cursor-pointer"
        >
          {buttonText}
        </motion.button>
      </motion.div>

      {/* Right Section: Image */}
      <motion.div 
        className="flex-1 mb-8 lg:mb-0"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <img
          src="https://storage.googleapis.com/digilancing_storage/Banners/banner_Digilancing.avif"
          alt="Package Books"
          loading="eager"
          fetchpriority="high"
          decoding="sync"
          className="w-full h-auto object-cover rounded-4xl lg:rounded-r-4xl lg:rounded-l-none"
        />
      </motion.div>
    </motion.div>
    </div>
  );
};

export default Section1;
