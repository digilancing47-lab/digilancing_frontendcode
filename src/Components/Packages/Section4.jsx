import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Banner from '../../assets/Banner.svg';
import Banner_mobile from '../../assets/Banner_mobile.svg';
import { useNavigate } from 'react-router-dom';

const Section4 = () => {
  const prefersReduced = useReducedMotion();
  const navigate = useNavigate()

  const container = prefersReduced
    ? { hidden: {}, show: {} }
    : {
        hidden: {},
        show: { transition: { when: 'beforeChildren', staggerChildren: 0.06 } },
      };

  const fadeUp = prefersReduced
    ? { hidden: {}, show: {} }
    : {
        hidden: { opacity: 0, y: 16 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.35, ease: 'easeOut' },
        },
      };

  return (
    <motion.div
      className="flex justify-center max-w-screen-xl px-5 mx-auto items-center lg:mt-16 will-change-transform transform-gpu"
      initial="hidden"
      animate="show"
      variants={container}
    >
      {/* Desktop Banner */}
      <motion.img
        src={Banner}
        alt="Banner"
        onClick={()=>{navigate('/Register')}}
        variants={fadeUp}
        className="w-full h-auto max-w-screen-xl hidden md:block object-contain cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
        draggable={false}
      />

      {/* Mobile Banner */}
      <motion.img
        src={Banner_mobile}
        alt="Banner"
        variants={fadeUp}
        onClick={()=>{navigate('/Register')}}
        className="w-full h-auto max-w-screen-xl md:hidden object-contain cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
        draggable={false}
      />
    </motion.div>
  );
};

export default Section4;
