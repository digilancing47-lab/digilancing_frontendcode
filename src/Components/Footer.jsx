import React from 'react';
import { motion } from 'framer-motion';
import youtubeIcon from '../assets/youtube.svg';
import facebookIcon from '../assets/facebook.svg';
import instagramIcon from '../assets/instagram.svg';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white font-outfit">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <motion.img
              src="/white.svg"
              alt="Digilancing"
              className="h-10 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            />
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Empowering you to turn skills into success — transforming learners into thriving digital freelancers.
            </p>
            <div className="flex gap-3">
              {[
                { href: 'https://www.youtube.com', src: youtubeIcon, alt: 'YouTube' },
                { href: 'https://www.facebook.com', src: facebookIcon, alt: 'Facebook' },
                { href: 'https://www.instagram.com', src: instagramIcon, alt: 'Instagram' },
              ].map((social) => (
                <motion.a
                  key={social.alt}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-700/50 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img src={social.src} alt={social.alt} className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/AboutUs', label: 'About Us' },
                { href: '/Contact', label: 'Contact Us' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Packages */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Packages
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/BasicPackages', label: 'Basic' },
                { href: '/StandardPackages', label: 'Standard' },
                { href: '/AdvancedPackages', label: 'Advanced' },
                { href: '/PremiumPackages', label: 'Premium' },
                { href: '/UltimatePackages', label: 'Ultimate' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Legal
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/Disclaimer', label: 'Disclaimer' },
                { href: '/TermsAndConditions', label: 'Terms & Conditions' },
                { href: '/PrivacyPolicy', label: 'Privacy Policy' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              &copy; 2025 DIGILANCING. All Rights Reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="/TermsAndConditions" className="text-slate-400 hover:text-white transition-colors">
                Terms
              </a>
              <a href="/PrivacyPolicy" className="text-slate-400 hover:text-white transition-colors">
                Privacy
              </a>
              <a href="/Disclaimer" className="text-slate-400 hover:text-white transition-colors">
                Disclaimer
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
