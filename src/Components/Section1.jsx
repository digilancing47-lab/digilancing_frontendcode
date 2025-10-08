import React from "react";
import section1 from '../assets/Main_image.svg';
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
      className="w-full max-w-screen-xl mx-auto pt-12 bg-[#002B54]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={container}
    >
      <div className="mx-auto flex font-outfit flex-col lg:flex-row items-center px-3 pt-16 lg:pt-32 gap-10">
        {/* Left Side */}
        <div className="text-center flex-1 px-1 lg:text-left">
          <motion.h1
            className="text-2xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-white mb-2.5"
            variants={fadeUp}
          >
            Turn skills into Success With{" "}
            <motion.span
              className="inline-block bg-gradient-to-r from-[#0078FF] to-[#ffffff] bg-clip-text text-transparent text-5xl md:text-5xl lg:text-6xl xl:text-7xl"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
            >
              DIGILANCING
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-white mb-6 text-[14px] px-5 md:px-0 md:text-lg lg:text-xl"
            variants={fadeUp}
          >
            Learn from Experts, grow your digital skills and start earning on your own terms
          </motion.p>

          <motion.button
            className="bg-[#FDDB5D] hover:scale-105 hover:bg-[#FCCC4D] cursor-pointer text-black px-8 py-3 rounded-xl font-semibold transition-transform duration-300 shadow-md mb-4"
            variants={fadeUp}
            whileHover={{ y: -2, scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
             onClick={() => navigate('/Register')}
          >
            Start Learning Today
          </motion.button>

          <motion.div
            className="hidden py-3 lg:flex items-center gap-2"
            variants={fadeUp}
            transition={{ delay: 0.1 }}
          >
            <img src={Lock} alt="" className="w-6" />
            <p className="text-white text-[14px]">
              Safe and Secure Platform | Trusted by 1,000+ Learners
            </p>
          </motion.div>
        </div>

        {/* Right Side */}
        <motion.div className="flex justify-center" variants={slideRight}>
          <motion.img
            src={section1}
            alt="Hero"
            className="w-full"
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
