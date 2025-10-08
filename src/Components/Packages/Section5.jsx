import React, { useState } from "react";
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

const Section5 = () => {
  const [openIndex, setOpenIndex] = useState(0); // first one open by default

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full font-outfit py-16 md:py-20 bg-white flex flex-col items-center px-4 sm:px-6">
    

      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-center mb-4 px-2">
        Frequently Asked Questions
      </h2>

     

      {/* FAQ Container */}
      <div className="w-full max-w-full sm:max-w-3xl md:max-w-5xl border border-[#B6BEC9] rounded-3xl py-3 px-4 sm:px-10">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 last:border-b-0">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between cursor-pointer items-center py-4 sm:py-6 text-left font-medium text-base sm:text-lg md:text-xl"
            >
              <span className="pr-4">{faq.question}</span>
              <motion.span
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="ml-2"
              >
                <FiChevronDown className="w-6 h-6" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="bg-[#E8F6FF] text-gray-700 text-sm sm:text-base md:text-lg p-4 sm:p-6 mb-4 sm:mb-6 rounded-md leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

     
    </div>
  );
};

export default Section5;
