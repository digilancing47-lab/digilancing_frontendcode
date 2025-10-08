import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import SearchIcon from '../../assets/SearchIcon.svg';

const makeVariants = (prefersReduced) => {
  const base = prefersReduced ? { opacity: 1, y: 0 } : undefined;

  return {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          when: "beforeChildren",
          staggerChildren: 0.06,
          delayChildren: 0.03,
        },
      },
      ...base && { hidden: base, visible: base },
    },
    fadeUp: {
      hidden: { opacity: 0, y: 14 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, ease: "easeOut" },
      },
      ...base && { hidden: base, visible: base },
    },
  };
};

const Section1 = () => {
  const prefersReduced = useReducedMotion();
  const location = useLocation();
  const { container, fadeUp } = makeVariants(prefersReduced);

  let buttonText = "Our Courses";
  let heading = "Designed by Experts Trusted by Learners";
  let subheading =
    "Every course is crafted with care to give you a clear, confident path to success. Grow your career with courses that focus on hands-on experience, certifications, and success.";

  if (location.pathname === "/Certificates") {
    buttonText = "Certificates";
    heading = "Quizzes That Shape Success";
    subheading =
      "Explore courses, take quizzes, and track your progress toward mastery.";
  }

  return (
    <motion.section
      className="text-center font-outfit py-16 px-4 bg-[#f5f8fa] mt-[70px] will-change-transform transform-gpu"
      initial="hidden"
      animate="visible"
      variants={container}
    >
      {/* Button */}
      <motion.div className="flex justify-center mb-4" variants={fadeUp}>
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="text-[#000000] font-semibold border border-[#919191] px-6 py-2 rounded-full hover:bg-[#6c63ff] hover:text-white transition duration-300 ease-in-out"
        >
          {buttonText}
        </motion.button>
      </motion.div>

      {/* Heading */}
      <motion.h2
        className="text-[34px] md:text-4xl lg:text-5xl font-semibold font-['Outfit'] leading-snug bg-gradient-to-r from-[#5E4BDA] to-[#2C71A1] bg-clip-text text-transparent"
        variants={fadeUp}
      >
        {heading}
      </motion.h2>

      {/* Subheading */}
      <motion.p
        className="mt-4 text-[12px] max-w-screen-lg mx-auto sm:text-base md:text-lg font-light text-[#828282]"
        variants={fadeUp}
      >
        {subheading}
      </motion.p>

      {/* Search Bar */}
      <motion.div className="mt-8 flex justify-center" variants={fadeUp}>
        <div className="relative w-full max-w-[550px]">
          <input
            type="text"
            placeholder="Search Support"
            className="p-4 w-full border border-[#70C4FD] rounded-full pl-6 pr-12 focus:outline-none focus:ring-2 text-lg focus:ring-[#6c63ff]"
          />
          <motion.img
            src={SearchIcon}
            alt=""
            className="w-12 h-12 absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
            animate={prefersReduced ? undefined : { scale: [1, 1.08, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ rotate: 20, scale: 1.2 }}
          />
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Section1;
