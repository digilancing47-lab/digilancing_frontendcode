import React from "react";
import { motion } from "framer-motion";
import AfLeftNav from "../Components/AfLeftNav";
import AfHeader from "../Components/AfHeader";
import OffersContainer from "../Components/OffersContainer";

const Offers = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        type: "spring",
        stiffness: 50
      }
    })
  };

  const text = "Offers Coming Soon!".split("");

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#002B54]">
      <AfLeftNav />
      <div className="flex-1 px-3 py-4">
        <div className="lg:ml-64 mb-2">
          <AfHeader />
        </div>
        <div className="lg:ml-66 lg:mt-2 mt-20 py-0.5 rounded-3xl bg-white p-6">
          <OffersContainer />
          <div className="flex flex-col items-center h-[50vh] text-center">
            <img src="/offers.png" alt="" className="w-[230px]"/>
            <div className="flex text-4xl font-bold text-black">
              {text.map((char, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char} 
                </motion.span>
              ))}
            </div>
            <p className="text-gray-400 text-lg">
              Stay tuned for exciting offers and deals!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;
