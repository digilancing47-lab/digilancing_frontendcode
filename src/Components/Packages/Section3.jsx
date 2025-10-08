import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const Section3 = () => {
  const prefersReduced = useReducedMotion();

  const container = prefersReduced
    ? { hidden: {}, show: {} }
    : {
        hidden: {},
        show: { transition: { when: 'beforeChildren', staggerChildren: 0.08, delayChildren: 0.04 } },
      };

  const card = prefersReduced
    ? { hidden: {}, show: {} }
    : {
        hidden: { opacity: 0, y: 16 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.35, ease: 'easeOut' },
        },
      };

  const item = prefersReduced
    ? { hidden: {}, show: {} }
    : {
        hidden: { opacity: 0, y: 8 },
        show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
      };

  return (
    <motion.div
      className="max-w-screen-xl font-outfit mx-auto my-12 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="show"
      variants={container}
    >
      <div className="flex flex-col sm:flex-row justify-between gap-8">
        {/* Course Overview */}
        <motion.div
          className="flex-1 bg-[#003B73] p-8 rounded-2xl text-white will-change-transform transform-gpu"
          variants={card}
        >
          <h3 className="text-xl font-bold mb-4">Course Overview</h3>
          <motion.ul className="list-none pl-0 space-y-4" variants={container}>
            <motion.li className="flex items-start text-base" variants={item}>
              <span className="text-teal-400 mr-2">✔</span>
              Gain lifetime access, certification, and a supportive community to help you grow, earn, and thrive with confidence.
            </motion.li>
            <motion.li className="flex items-start text-base" variants={item}>
              <span className="text-teal-400 mr-2">✔</span>
              This isn’t just another course—it’s a complete ecosystem built for individuals who are serious about mastering real digital skills and achieving measurable results.
            </motion.li>
          </motion.ul>
        </motion.div>

        {/* What You'll Learn */}
        <motion.div
          className="flex-1 bg-[#003B73] p-8 rounded-2xl text-white will-change-transform transform-gpu"
          variants={card}
        >
          <h3 className="text-xl font-bold mb-4">What you’ll learn in this course:</h3>
          <motion.ul className="list-none pl-0 space-y-4" variants={container}>
            {[
              'Build a powerful digital presence on Instagram & LinkedIn that attracts opportunities.',
              'Discover your niche and craft content that truly sells.',
              'Launch your freelancing career with client pitching strategies and location-free earning.',
              'Boost your communication & confidence while shaping a strong personal brand.',
              'Leverage AI tools for automation, productivity, and smarter content creation.',
              'Unlock multiple income streams with proven, practical strategies.',
            ].map((text, i) => (
              <motion.li key={i} className="flex items-start text-base" variants={item}>
                <span className="text-teal-400 mr-2">✔</span>
                {text}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Section3;
