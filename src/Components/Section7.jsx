import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

const faqs = [
  {
    question: "What exactly is the “Premium Plus” package?",
    answer:
      "The Premium Plus package includes everything from the Pro, Supreme, and Premium tiers, along with exclusive expert masterclasses, deeper industry insights, and access to advanced training in areas like dropshipping, VFX, Python, fitness, and Print on Demand.",
  },
  {
    question: "Who is this package best suited for?",
    answer:
      "This package is designed for individuals who want advanced-level training, hands-on projects, and mentorship to accelerate their career or business growth.",
  },
  {
    question: "Do I get lifetime access to the course content?",
    answer:
      "Yes! Once enrolled, you get lifetime access to all course content, updates, and resources included in your package.",
  },
  {
    question: "Can I upgrade to a higher package later if I'm already enrolled?",
    answer:
      "Absolutely. You can upgrade anytime by paying the difference between your current package and the higher-tier package.",
  },
];

// Motion variants
const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};
const rowVariant = {
  hidden: { opacity: 0, y: 12, scale: 0.995 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 110, damping: 18 } },
};

const Section7 = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const itemRefs = useRef([]);

  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

  // Auto-scroll opened item into view (nice on mobile)
  useEffect(() => {
    const el = itemRefs.current[openIndex];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [openIndex]);

  return (
    <motion.section
      className="w-full font-outfit py-16 md:py-20 bg-white flex flex-col items-center px-4 sm:px-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      {/* Badge */}
      <motion.span
        className="bg-gradient-to-r from-[#5E4BDA] to-[#2C71A1] text-white text-sm sm:text-base px-4 sm:px-6 py-1 sm:py-2 rounded-full mb-6 font-normal"
        variants={fadeUp}
      >
        FAQ
      </motion.span>

      {/* Heading */}
      <motion.h2
        className="text-2xl sm:text-3xl md:text-5xl font-semibold text-center mb-4 px-2"
        variants={fadeUp}
      >
        Frequently Asked Questions
      </motion.h2>

      {/* Subheading */}
      <motion.p
        className="text-gray-600 text-center max-w-xl sm:max-w-3xl text-sm sm:text-base md:text-lg mb-10 sm:mb-12 px-2"
        variants={fadeUp}
      >
        Ask everything you need to know about our products and services.
      </motion.p>

      {/* FAQ Container */}
      <motion.div
        className="w-full max-w-full sm:max-w-3xl md:max-w-5xl border border-[#B6BEC9] rounded-3xl py-3 px-4 sm:px-10"
        variants={fadeUp}
      >
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const contentId = `faq-panel-${index}`;
          const buttonId = `faq-button-${index}`;
          return (
            <motion.div
              key={index}
              className={`border-b border-gray-200 last:border-b-0`}
              variants={rowVariant}
              ref={(el) => (itemRefs.current[index] = el)}
            >
              <button
                id={buttonId}
                aria-controls={contentId}
                aria-expanded={isOpen}
                onClick={() => toggleFAQ(index)}
                className={`w-full flex justify-between items-center py-4 sm:py-6 text-left font-medium text-base sm:text-lg md:text-xl group focus:outline-none`}
              >
                <span className="pr-4">
                  {faq.question}
                </span>

                {/* Icon with rotate and subtle hover lift */}
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="ml-2 shrink-0"
                >
                  <FiChevronDown className="w-6 h-6 transition-transform group-hover:-translate-y-0.5" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={contentId}
                    aria-labelledby={buttonId}
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <motion.div
                      className="bg-[#F1F5F9] text-gray-700 text-sm sm:text-base md:text-lg p-4 sm:p-6 mb-4 sm:mb-6 rounded-md leading-relaxed"
                      initial={{ y: -6 }}
                      animate={{ y: 0 }}
                      exit={{ y: -6 }}
                      transition={{ type: "spring", stiffness: 140, damping: 20 }}
                    >
                      {faq.answer}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>

      {/* CTA button */}

      {/* <motion.div
        className="flex py-10 justify-center mt-6"
        variants={fadeUp}
      >
        <motion.button
          className="bg-[#0183FF] py-3 flex items-center justify-center px-8 text-[18px] rounded-xl text-white shadow-sm"
          whileHover={{ y: -2, scale: 1.04, boxShadow: "0 10px 24px rgba(1,131,255,0.25)" }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
        >
          <span>View All</span>
          <FiChevronDown className="ml-4 w-6 h-6" />
        </motion.button>
      </motion.div> */}

    </motion.section>
  );
};

export default Section7;
