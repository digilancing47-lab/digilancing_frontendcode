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
      className="w-full container  mx-auto pt-12 "
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={container}
    >
      <div className="mx-auto flex font-outfit flex-col lg:flex-row items-center px-3 pt-16 lg:pt-32 gap-10">
        {/* Left Side */}
        <div className="text-center flex-1 px-1 lg:text-left">
          <motion.h1
            className="text-2xl sm:text-4xl md:text-4xl lg:text-4xl 2xl:text-5xl font-bold text-white mb-2.5"
            variants={fadeUp}
          ><motion.span
              className="inline-block bg-gradient-to-r from-[#63b4ff] to-[#2c99ff] bg-clip-text text-transparent pb-6 text-5xl md:text-5xl lg:text-6xl xl:text-7xl"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
            >
              DIGILANCING
            </motion.span><br/>
            <span className="mt-3">Skills Over Degrees.{" "}Create Your Own Career Path.</span>
          </motion.h1>

          <motion.p
            className="text-white mb-6 text-[14px] px-5 md:px-0 md:text-lg lg:text-xl"
            variants={fadeUp}
          >
           Learn practical digital skills, build real projects, and unlock freelance & remote opportunities worldwide.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
            <motion.button
              className="bg-gradient-to-r from-[#FFA80B] to-[#ffe6b8] cursor-pointer text-black px-10 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg"
              variants={fadeUp}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/Register')}
            >
              Register Now
            </motion.button>

            <motion.button
              className="bg-white/10 backdrop-blur-sm border border-white/30 cursor-pointer text-white px-10 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:bg-white/20"
              variants={fadeUp}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/Courses')}
            >
              Explore Courses
            </motion.button>
          </div>

          <motion.div
            className="hidden py-3  pt-10 lg:flex items-center gap-2"
            variants={fadeUp}
            transition={{ delay: 0.1 }}
          >
            <img src={Lock} alt="" className="w-6" />
            <p className="text-white text-[14px]">
              Secure Learning • Expert Mentors • Global Opportunities
            </p>
          </motion.div>
        </div>

        {/* Right Side */}
        <motion.div className="flex justify-center" variants={slideRight}>
          <motion.img
            src={section1}
            alt="Hero"
            className="w-full max-w-3xl"
            // gentle float & tilt for liveliness
            animate={{ y: [0, -10, 0], rotate: [0, 1.2, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.02 }}
          />
        </motion.div>
      </div>

      {/* Mobile trust row */}
      <motion.div
        className="block pb-10 lg:hidden"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className="flex items-center gap-1 justify-center">
          <img src={Lock} alt="" className="w-6" />
          <p className="text-white mt-1 text-[12px]">
            Safe and Secure Platform | Trusted by 1,000+ Learners
          </p>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Section1;
