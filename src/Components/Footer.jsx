import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import youtubeIcon from '../assets/youtube.svg';
import facebookIcon from '../assets/facebook.svg';
import instagramIcon from '../assets/instagram.svg';

const Footer = () => {
  const prefersReduced = useReducedMotion();

  // Variants
  const container = prefersReduced
    ? { hidden: {}, show: {} }
    : {
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { when: 'beforeChildren', staggerChildren: 0.12 },
        },
      };

  const fadeUp = prefersReduced
    ? { hidden: {}, show: {} }
    : {
        hidden: { opacity: 0, y: 18 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 16 } },
      };

  const slideLeft = prefersReduced
    ? { hidden: {}, show: {} }
    : {
        hidden: { opacity: 0, x: -18 },
        show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 130, damping: 18 } },
      };

  const slideRight = prefersReduced
    ? { hidden: {}, show: {} }
    : {
        hidden: { opacity: 0, x: 18 },
        show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 130, damping: 18 } },
      };

  const hoverScale = prefersReduced ? {} : { scale: 1.06, translateY: -2 };

  return (
    <div className="bg-white px-2 lg:px-10 font-outfit text-white py-6 md:py-12">
      <motion.div
        className="mx-auto px-4 sm:px-16 py-12 md:py-24 bg-[#002B54] text-white rounded-4xl"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Brand + Social */}
          <motion.div
            className="text-center sm:text-left"
            variants={slideLeft}
          >
            <motion.h2
              className="text-3xl sm:text-4xl md:text-4xl font-bold whitespace-nowrap"
              variants={fadeUp}
            >
              DIGILANCING
            </motion.h2>

            <motion.div
              className="border-t border-gray-500 my-4 inline-block w-1/3 mx-auto"
              variants={fadeUp}
            />

            <motion.p
              className="text-sm sm:text-lg px-5 md:px-0 md:w-[80%]"
              variants={fadeUp}
            >
              Empowering you to turn skills into success — DIGILANCING transforms learners into thriving digital freelancers
            </motion.p>

            <motion.div
              className="mt-6 flex justify-center sm:justify-start space-x-2"
              variants={fadeUp}
            >
              {[
                { href: 'https://www.youtube.com', src: youtubeIcon, alt: 'YouTube' },
                { href: 'https://www.facebook.com', src: facebookIcon, alt: 'Facebook' },
                { href: 'https://www.instagram.com', src: instagramIcon, alt: 'Instagram' },
              ].map((item) => (
                <motion.a
                  key={item.alt}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={hoverScale}
                  whileTap={{ scale: 0.96 }}
                  className="rounded-xl focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-[#002B54] p-1"
                >
                  <img src={item.src} alt={item.alt} className="w-8 h-8 sm:w-10 sm:h-10" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Links */}
          <motion.div
            className="flex flex-wrap justify-between px-5 lg:flex-nowrap lg:space-x-12 lg:col-span-1 sm:text-left space-y-8 lg:space-y-0"
            variants={slideRight}
          >
            {/* Quick Links */}
            <motion.div className="w-1/2 space-y-2 flex-1 min-w-[150px]" variants={fadeUp}>
              <h3 className="text-lg sm:text-2xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {[
                  { href: '/AboutUs', label: 'About Us' },
                  { href: '/Contact', label: 'Contact Us' }
                ].map((l) => (
                  <motion.li key={l.href} whileHover={!prefersReduced ? { x: 4 } : {}}>
                    <a href={l.href} className="text-sm sm:text-lg font-normal hover:text-gray-300 transition-colors">
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Packages */}
            <motion.div className="w-1/2 space-y-2 flex-1 min-w-[150px]" variants={fadeUp}>
              <h3 className="text-lg sm:text-2xl font-semibold mb-4">Packages</h3>
              <ul className="space-y-2">
                {[
                  { href: '/BasicPackages', label: 'Basic Package' },
                  { href: '/StandardPackages', label: 'Standard Package' },
                  { href: '/AdvancedPackages', label: 'Advanced Package' },
                  { href: '/PremiumPackages', label: 'Premium Package' },
                  { href: '/UltimatePackages', label: 'Ultimate Package' },
                ].map((l) => (
                  <motion.li key={l.href} whileHover={!prefersReduced ? { x: 4 } : {}}>
                    <a href={l.href} className="text-sm font-normal sm:text-lg hover:text-gray-300 transition-colors">
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Policy */}
            <motion.div className="hidden lg:block space-y-2 flex-1" variants={fadeUp}>
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">Policy</h3>
              <ul className="space-y-2">
                {[
                  { href: '/Disclaimer', label: 'Disclaimer' },
                  { href: '/TermsAndConditions', label: 'Terms and Conditions' },
                  { href: '/PrivacyPolicy', label: 'Privacy Policy' },
                ].map((l) => (
                  <motion.li key={l.href} whileHover={!prefersReduced ? { x: 4 } : {}}>
                    <a href={l.href} className="text-base sm:text-lg font-normal hover:text-gray-300 transition-colors">
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom: Mobile */}
        <motion.div
          className="block lg:hidden mt-6 text-center text-sm space-y-2"
          variants={fadeUp}
        >
          <p>&copy; 2025 DIGILANCING. All Rights Reserved.</p>
          <p className="flex items-center justify-center gap-2">
            <a href="/TermsAndConditions" className="hover:text-gray-300 transition-colors">Terms and Conditions</a>|
            <a href="/PrivacyPolicy" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
          </p>
         
        </motion.div>

        {/* Bottom: Desktop */}
        <motion.div
          className="hidden lg:block text-left text-base sm:text-lg mt-12"
          variants={fadeUp}
        >
          <p>&copy; 2025 DIGILANCING. All Rights Reserved.</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Footer;
