import React from "react";
import section1 from '/Bgimage.avif';
import Lock from '../assets/Lock.svg';
import { motion } from "framer-motion";
import { useNavigate} from 'react-router-dom';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.12 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" }
  }
};

const slideRight = {
  hidden: { opacity: 0, x: 40, rotate: -2 },
  visible: {
    opacity: 1, x: 0, rotate: 0,
    transition: { type: "spring", stiffness: 80, damping: 18 }
  }
};

const Section1 = () => {
   const navigate = useNavigate();
   
  return (
    <motion.section
      className="w-full container mx-auto md:min-h-screen flex items-center lg:items-end"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={container}
    >
      <div className="mx-auto flex font-outfit flex-col-reverse pt-24 lg:flex-row items-center px-4 sm:px-6 py-12 sm:py-16 lg:py-0 gap-8 lg:gap-12 w-full">
        {/* Left Side */}
        <div className="text-center flex-1 lg:text-left">
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-white mb-4"
            variants={fadeUp}
          ><motion.span
              className="inline-block bg-gradient-to-r from-[#63b4ff] to-[#2c99ff] bg-clip-text text-transparent pb-4 sm:pb-6 text-3xl sm:text-3xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
            >
              DIGILANCING
            </motion.span><br/>
            <span className="block mt-2 sm:mt-3">Skills Over Degrees.{" "}Create Your Own Career Path.</span>
          </motion.h1>

          <motion.p
            className="text-white mb-6 sm:mb-8 text-sm sm:text-base md:text-lg lg:text-base xl:text-lg px-4 sm:px-0 max-w-2xl mx-auto lg:mx-0"
            variants={fadeUp}
          >
           Learn practical digital skills, build real projects, and unlock freelance & remote opportunities worldwide.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center lg:justify-start w-full sm:w-auto">
            <motion.button
              className="bg-gradient-to-r from-[#FFA80B] to-[#ffe6b8] cursor-pointer text-black px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg w-full sm:w-auto text-sm sm:text-base"
              variants={fadeUp}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/Register')}
            >
              Register Now
            </motion.button>

            <motion.button
              className="bg-white/10 backdrop-blur-sm border border-white/30 cursor-pointer text-white px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:bg-white/20 w-full sm:w-auto text-sm sm:text-base"
              variants={fadeUp}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/Courses')}
            >
              Explore Courses
            </motion.button>
          </div>

          <motion.div
            className="hidden py-3 pt-8 lg:pt-10 lg:flex items-center gap-2"
            variants={fadeUp}
            transition={{ delay: 0.1 }}
          >
            <img src={Lock} alt="" className="w-5 xl:w-6" />
            <p className="text-white text-xs xl:text-sm">
              Secure Learning • Expert Mentors • Global Opportunities
            </p>
          </motion.div>
        </div>

        {/* Right Side */}
        <motion.div className="flex justify-center flex-1 w-full" variants={slideRight}>
          <motion.img
            src={section1}
            alt="Hero"
            className="w-full "
            animate={{ y: [0, -10, 0], rotate: [0, 1.2, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.02 }}
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Section1;
