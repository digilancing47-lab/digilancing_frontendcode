import React from "react";
import { motion } from "framer-motion";
import Section60 from "../assets/section60.png";
import Section61 from "../assets/section61.png";
import Section62 from "../assets/section62.png";
import Arrowup from "../assets/Arrowup.svg";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.12 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const card = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 90, damping: 16 }
  }
};

const Section6 = () => {
  return (
    <motion.section
      className="bg-[#F4FAFF] font-outfit w-full py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      {/* Centered Header */}
      <motion.h2
        className="text-4xl md:text-5xl font-semibold text-center py-4 bg-gradient-to-r from-[#5E4BDA] to-[#2C71A1] bg-clip-text text-transparent font-[Outfit] leading-[120%] tracking-normal"
        variants={fadeUp}
      >
        Edulance Events & Announcements
      </motion.h2>

      {/* Centered Sub-header */}
      <motion.p
        className="text-center text-[#797979] mb-10 px-4 max-w-2xl mx-auto font-normal text-[18px] md:text-[20px] leading-[130%]"
        variants={fadeUp}
      >
        Stay informed about the latest happenings, launches, and learning
        opportunities at Edulance
      </motion.p>

      <div className="flex flex-col max-w-screen-2xl mx-auto lg:flex-row justify-center items-stretch gap-6 md:gap-8 px-4 md:px-20">
        {/* Left Side Container */}
        <motion.div
          className="w-full bg-white border-2 border-gray-300 flex flex-col rounded-2xl md:rounded-4xl overflow-hidden p-2"
          variants={card}
          whileHover={{ y: -6, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
        >
          <motion.img
            src={Section60}
            alt="Left"
            className="w-full h-auto object-cover block"
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 18 }}
            whileInView={{ opacity: 1 }}
          />
          {/* Text + Button Responsive Layout */}
          <div className="flex flex-col md:flex-row px-2 md:px-6 pb-4 md:py-5 items-start md:items-center justify-between gap-3 mt-3 w-full">
            <p className="font-semibold text-[16px] md:text-lg lg:text-xl text-left">
              On Demand on Master Class Mastering Career Growth with Edulancing.
            </p>
            <motion.button
              className="border border-blue-500 text-blue-500 px-3 md:px-4 py-1 md:py-2 rounded-2xl text-[12px] hover:bg-blue-50 whitespace-nowrap text-sm md:text-base mt-2 md:mt-0"
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="inline-flex items-center gap-2">
                Watch Now
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* Right Side Container */}
        <div className="w-full flex flex-col gap-6">
          {/* Top Right Container */}
          <motion.div
            className="flex flex-1 gap-3 flex-row bg-white border-2 border-gray-300 rounded-2xl md:rounded-4xl items-start overflow-hidden p-2 h-full"
            variants={card}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
          >
            <motion.div className="h-full">
              <img
                src={Section61}
                alt="Top Right"
                className="w-full h-full block rounded-2xl"
              />
            </motion.div>
            <div className="flex flex-col lg:gap-3 items-start md:ml-4 mt-3 w-full md:w-1/2">
              <p className="font-semibold text-left max-w-[600px] text-sm md:text-base">
                On Demand on Master Class Mastering Career Growth with
                Edulancing.
              </p>
              <motion.button
                className="border border-blue-500 text-blue-500 px-3 md:px-4 py-1 md:py-2 rounded-2xl text-[12px] hover:bg-blue-50 whitespace-nowrap text-sm md:text-base mt-4 md:mt-0"
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Watch Now
              </motion.button>
            </div>
          </motion.div>

          {/* Bottom Right Container */}
          <motion.div
            className="flex flex-1 flex-row gap-3 bg-white border-2 border-gray-300 rounded-2xl md:rounded-4xl items-start overflow-hidden p-2 h-full"
            variants={card}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
          >
            <motion.div className="h-full">
              <img
                src={Section62}
                alt="Bottom Right"
                className="w-full h-full block rounded-2xl"               
              />
            </motion.div>
            <div className="flex flex-col lg:gap-3 items-start md:ml-4 mt-3 w-full md:w-1/2">
              <p className="font-semibold text-left max-w-[600px] text-sm md:text-base">
                On Demand on Master Class Mastering Career Growth with
                Edulancing.
              </p>
              <motion.button
                className="border border-blue-500 text-blue-500 px-3 md:px-4 py-1 md:py-2 rounded-2xl text-[12px] hover:bg-blue-50 whitespace-nowrap text-sm md:text-base mt-4 md:mt-0"
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Watch Now
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* See All Events Button */}
      <div className="flex py-10 justify-center mt-6">
        <motion.button
          className="bg-[#0183FF] py-3 flex items-center justify-center px-8 text-[18px] rounded-xl text-white"
          whileHover={{ y: -2, scale: 1.04, boxShadow: "0 8px 24px rgba(1,131,255,0.35)" }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
        >
          <span>See all Events</span>
          <motion.img
            src={Arrowup}
            alt="Arrow Up"
            className="ml-4"
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.button>
      </div>
    </motion.section>
  );
};

export default Section6;
