import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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



const Section7 = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="relative bg-gradient-to-b from-white via-orange-50/30 to-white py-20 px-6 lg:px-20 font-outfit overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-orange-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span  className="bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#06b6d4] text-white px-6 py-2 rounded-full font-semibold transition shadow-md ">
            Got Questions?
          </span>
          <h2 className="text-4xl pt-7 lg:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-lg">
            Everything you need to know about our packages
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <motion.svg
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    className="w-5 h-5 text-gray-500 shrink-0 ml-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-gray-600">{faq.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 p-8 bg-gradient-to-r from-white-500/20 to-white-500/20 rounded-2xl border border-blue-200">
          <p className="text-gray-700 mb-4 text-lg">
            Still have questions? We're here to help!
          </p>
          <button className="bg-gradient-to-r from-[#FFA80B] to-[#ffe6b8]  text-black cursor-pointer font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default Section7;
