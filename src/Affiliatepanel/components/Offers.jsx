import React from "react";
import { FaTrophy } from "react-icons/fa";
const Offers = () => {
  return (
    <div className="flex-1 bg-white  rounded-3xl backdrop-blur-xl border border-white/10 p-3 relative">
      <div className="bg-gradient-to-r from-[#1e3a8a] via-[#3b82f6] to-[#06b6d4] text-white text-center text-lg sm:text-3xl md:text-5xl font-medium h-56 sm:h-64 md:h-72 rounded-3xl w-full flex items-center justify-center relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-60 h-60 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div>
               <div className="w-20 h-20 mx-auto rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center mb-4">
                  <FaTrophy className="h-8 w-8 text-white" />
               </div>
               <h1 className="text-3xl font-bold text-white">Your Offers</h1>
               <p className="text-white/70 mt-2 max-w-md text-sm">
                  Exclusive deals and rewards await you
               </p>
            </div>
        </div>
      <div className="flex flex-col items-center h-[50vh] text-center">
        <img src="/offers.png" alt="" className="w-[230px]"/>
        <h2 className="text-4xl font-bold text-black">Offers Coming Soon!</h2>
        <p className="text-gray-300 mt-2 text-lg">
          Stay tuned for exciting offers and deals!
        </p>
      </div>
    </div>
  );
};

export default Offers;
