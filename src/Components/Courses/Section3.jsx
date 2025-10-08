import React, { use } from 'react';
import { motion } from 'framer-motion';
import Banner from '../../assets/Banner.svg';
import Banner_mobile from '../../assets/Banner_mobile.svg';
import { useNavigate } from 'react-router-dom';
const fadeUp = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 140, damping: 18, mass: 0.6 }
  }
};

const Section3 = () => {
  const navigate = useNavigate()

  const user = JSON.parse(sessionStorage.getItem("user") || "null");


  return (
    <motion.div
      className={`${user?.guide_code == null ? 'flex justify-center max-w-screen-xl px-5 mx-auto items-center lg:mt-16 ':'hidden'} `}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
    >
      {/* Desktop banner */}
      <motion.img
        src={Banner}
        alt="Banner"
        className="w-full h-auto max-w-screen-xl hidden md:block object-contain cursor-pointer"
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 180, damping: 14 }}
        animate={{ y: [0, -2, 0] }}
        onClick={()=>{navigate('/Register')}}
        transition={{
          repeat: Infinity,
          repeatType: 'mirror',
          duration: 6,
          ease: 'easeInOut'
        }}
      />

      {/* Mobile banner */}
      <motion.img
        src={Banner_mobile}
        alt="Banner"
        className="w-full h-auto max-w-screen-xl md:hidden object-contain cursor-pointer"
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 180, damping: 14 }}
        animate={{ y: [0, -2, 0] }}
        onClick={()=>{navigate('/Register')}}
        transition={{ 
          repeat: Infinity,
          repeatType: 'mirror',
          duration: 6,
          ease: 'easeInOut'
        }}
      />
    </motion.div>
  );
};

export default Section3;
