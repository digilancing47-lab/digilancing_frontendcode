import React from 'react';
import { motion } from 'framer-motion';
import section2 from '../assets/section2.png';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.12
    }
  }
};

const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 80, damping: 18 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

const slideRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 80, damping: 18 }
  }
};

const Section2 = () => {
  return (
    <motion.section
      className="bg-[#F4FAFF] w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={container}
    >
      <div className="max-w-screen-xl font-outfit mx-auto flex flex-col lg:flex-row items-center gap-12 px-6 lg:px-5 py-10 lg:py-24">

        {/* Left Side */}
        <motion.div className="lg:w-1/2 text-center lg:text-left" variants={slideLeft}>
          {/* About Us Button */}
          <motion.button
            className="bg-gradient-to-r from-[#5C4CD8] to-[#3D64B5] text-white px-6 py-2 rounded-full font-semibold transition shadow-md mb-6"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            About Us
          </motion.button>

          <motion.h5
            className="mb-6 font-outfit font-semibold text-2xl md:text-4xl"
            variants={fadeUp}
          >
            We're Not Just a Platform - We're a Revolution in Learning & Earning.
          </motion.h5>

          {/* Description */}
          <motion.p
            className="text-[#797979] mb-6 text-[14px] md:text-lg leading-relaxed"
            variants={fadeUp}
          >
            At Edulancing, we empower learners to become doers. Our expertly designed video programs 
            ranging from quick skill boosters to in-depth masterclasses open doors to opportunities 
            in freelancing, digital marketing, automation, and much more. We go beyond courses.
          </motion.p>

          <motion.p
            className="text-[#797979] md:mb-6 text-[14px] md:text-lg leading-relaxed"
            variants={fadeUp}
          >
            With real-world toolkits, live challenges, and a thriving learner-creator community, 
            we ensure you don't just learn, you launch your journey.
          </motion.p>
        </motion.div>

        {/* Right Side */}
        <motion.div className="lg:w-1/2 flex justify-center" variants={slideRight}>
          <motion.img
            src={section2}
            alt="Section 2"
            className="w-full max-w-sm sm:max-w-md lg:max-w-lg"
            // Enters from the right, then gently floats
            initial={false}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.02 }}
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Section2;
